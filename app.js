require('dotenv').config();

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const stripeLib = require('stripe');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const { PrismaClient, Prisma, Role, SubscriberStatus, Mode, MembershipStatus, MemberTrack } = require('@prisma/client');
const { Resend } = require('resend');
const { PostHog } = require('posthog-node');
const {
  toMembershipStatus,
  isMembershipActive,
  normalizeTrack,
  trackLabel,
  inferTracksFromQuiz,
  inferPrimaryTrack,
  membershipSnapshotFromSubscription
} = require('./membership-service');
const {
  hasDiscordOAuthConfig,
  buildDiscordAuthUrl,
  exchangeDiscordCode,
  fetchDiscordIdentity,
  joinGuildMember,
  syncDiscordMemberRoles,
  buildDiscordAvatarUrl,
  getDiscordConfig
} = require('./discord-service');

const prisma = new PrismaClient();

function buildApp() {
  const app = express();

  const PORT = process.env.PORT || 3000;
  const normalizeFrontendUrl = (value) => {
    const raw = String(value || '').trim().replace(/\/+$/, '');
    if (!raw) return `http://localhost:${PORT}`;
    if (/^https?:\/\//i.test(raw)) return raw;
    if (/^(localhost|127(?:\.\d{1,3}){3}|\[::1\])(?::\d+)?$/i.test(raw)) {
      return `http://${raw}`;
    }
    return `https://${raw}`;
  };
  const FRONTEND_URL = normalizeFrontendUrl(
    process.env.FRONTEND_URL ||
    (process.env.VERCEL && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${PORT}`)
  );
  const STRIPE_SECRET_KEY = (process.env.STRIPE_SECRET_KEY || '').trim();
  const STRIPE_ACCOUNT_ID = process.env.STRIPE_ACCOUNT_ID;
  const STRIPE_PRICE_ID = (process.env.STRIPE_PRICE_ID || '').trim();
  const STRIPE_MEMBERSHIP_PRICE_ID = (process.env.STRIPE_MEMBERSHIP_PRICE_ID || STRIPE_PRICE_ID || '').trim();
  const STRIPE_PAYMENT_LINK = (process.env.STRIPE_PAYMENT_LINK || '').trim();
  const RESEND_API_KEY = (process.env.RESEND_API_KEY || '').trim();
  const DEFAULT_EMAIL_FROM = 'onboarding@resend.dev';
  const EMAIL_FROM = process.env.EMAIL_FROM || DEFAULT_EMAIL_FROM;
  const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO;
  const hasResendApiKey = !!RESEND_API_KEY && !/^re_x+$/i.test(RESEND_API_KEY);
  const STRIPE = STRIPE_SECRET_KEY
    ? stripeLib(STRIPE_SECRET_KEY, STRIPE_ACCOUNT_ID ? { stripeAccount: STRIPE_ACCOUNT_ID } : undefined)
    : null;
  const resend = hasResendApiKey
    ? new Resend(RESEND_API_KEY)
    : null;
  const posthog = process.env.POSTHOG_API_KEY ? new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST || 'https://us.i.posthog.com' }) : null;
  const SESSION_TTL_HOURS = parseInt(process.env.SESSION_TTL_HOURS || '720', 10);
  const ACCESS_CODE_LENGTH = parseInt(process.env.ACCESS_CODE_LENGTH || '10', 10);
  const SESSION_LOOKUP_TIMEOUT_MS = parseInt(process.env.SESSION_LOOKUP_TIMEOUT_MS || '1200', 10);
  const DISABLE_SESSION_LOOKUP = process.env.DISABLE_SESSION_LOOKUP === '1';
  const ACCESS_CODE_DB_TIMEOUT_MS = parseInt(process.env.ACCESS_CODE_DB_TIMEOUT_MS || '1200', 10);
  const API_REQUEST_TIMEOUT_MS = parseInt(process.env.API_REQUEST_TIMEOUT_MS || '12000', 10);
  const DB_OPERATION_TIMEOUT_MS = parseInt(process.env.DB_OPERATION_TIMEOUT_MS || '8000', 10);
  const EMAIL_SEND_TIMEOUT_MS = parseInt(process.env.EMAIL_SEND_TIMEOUT_MS || '10000', 10);
  const MEMBERSHIP_SYNC_TTL_MS = parseInt(process.env.MEMBERSHIP_SYNC_TTL_MS || '300000', 10);
  const DISCORD_STATE_COOKIE = 'discord_oauth_state';
  const DISCORD_STATE_TTL_MS = parseInt(process.env.DISCORD_STATE_TTL_MS || '900000', 10);
  const buildMemberReturnUrl = (params = {}) => {
    const url = new URL(`${FRONTEND_URL}/quiz.html`);
    url.searchParams.set('view', 'member');
    for (const [key, value] of Object.entries(params)) {
      if (value == null || value === '') continue;
      url.searchParams.set(key, String(value));
    }
    return url.toString();
  };
  const MEMBER_DASHBOARD_RETURN = buildMemberReturnUrl();
  const redactSecrets = (value) => String(value || '')
    .replace(/sk_(live|test)_[A-Za-z0-9]+/g, 'sk_$1_***')
    .replace(/rk_(live|test)_[A-Za-z0-9]+/g, 'rk_$1_***');

  const cspDirectives = {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
    scriptSrcAttr: ["'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "data:"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    connectSrc: ["'self'", FRONTEND_URL, "https://api.stripe.com", "https://js.stripe.com", "https://us.i.posthog.com"],
  };

  app.use(helmet({
    contentSecurityPolicy: { useDefaults: true, directives: cspDirectives }
  }));

  app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
  }));

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // On Vercel, rewrites send /api/foo/bar to /api?path=foo/bar; restore path so Express can route
  if (process.env.VERCEL) {
    app.use((req, _res, next) => {
      const pathSeg = req.query.path;
      if (pathSeg != null && typeof pathSeg === 'string') {
        delete req.query.path;
        const qs = Object.keys(req.query).length ? '?' + new URLSearchParams(req.query).toString() : '';
        req.url = '/api/' + pathSeg + qs;
      }
      next();
    });
  }

  app.use('/api', rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false
  }));

  app.use('/api', (req, res, next) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(504).json({ error: 'Request timed out while waiting on a dependency.' });
      }
    }, API_REQUEST_TIMEOUT_MS);
    if (typeof timer.unref === 'function') timer.unref();
    const clear = () => clearTimeout(timer);
    res.once('finish', clear);
    res.once('close', clear);
    next();
  });

  // Serve static when running standalone; Vercel will serve statics separately
  if (!process.env.VERCEL) {
    app.use(express.static(path.join(__dirname)));
  }

  const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
  const randomToken = () => crypto.randomBytes(32).toString('hex');
  const sessionExpiry = () => new Date(Date.now() + SESSION_TTL_HOURS * 60 * 60 * 1000);
  const generateAccessCode = () => {
    let code = '';
    for (let i = 0; i < ACCESS_CODE_LENGTH; i += 1) {
      code += crypto.randomInt(0, 10).toString();
    }
    return code;
  };

  const TIMEOUT_SENTINEL = Symbol('timeout');

  const runWithTimeout = async (promise, timeoutMs) => {
    let timeout;
    const guard = new Promise((resolve) => {
      timeout = setTimeout(() => resolve(TIMEOUT_SENTINEL), timeoutMs);
    });
    const result = await Promise.race([
      promise,
      guard
    ]);
    clearTimeout(timeout);
    return result;
  };

  const runWithTimeoutOrThrow = async (promise, timeoutMs, { message, code, statusCode = 504 }) => {
    const result = await runWithTimeout(promise, timeoutMs);
    if (result !== TIMEOUT_SENTINEL) return result;
    const timeoutError = new Error(message);
    timeoutError.code = code;
    timeoutError.statusCode = statusCode;
    throw timeoutError;
  };

  const createOrGetAccessCode = async (paidSessionId) => {
    if (paidSessionId) {
      const existing = await prisma.accessCode.findUnique({ where: { paidSessionId } });
      if (existing) return existing;
    }

    for (let attempt = 0; attempt < 6; attempt += 1) {
      const code = generateAccessCode();
      try {
        const created = await prisma.accessCode.create({
          data: { code, paidSessionId: paidSessionId || null }
        });
        return created;
      } catch (err) {
        if (err?.code === 'P2002') continue; // Unique constraint, retry
        throw err;
      }
    }

    throw new Error('Unable to generate access code');
  };

  const getAccessCodeFromDb = async (paidSessionId) => {
    try {
      const result = await runWithTimeout(createOrGetAccessCode(paidSessionId), ACCESS_CODE_DB_TIMEOUT_MS);
      if (result === TIMEOUT_SENTINEL) return null;
      return result?.code || null;
    } catch (err) {
      console.error('access code db error', err);
      return null;
    }
  };

  const persistAccessCodeRecord = async (code, paidSessionId = null) => {
    if (!code) return false;
    try {
      const result = await runWithTimeout(
        prisma.accessCode.upsert({
          where: { code },
          update: paidSessionId ? { paidSessionId, revokedAt: null } : { revokedAt: null },
          create: { code, paidSessionId: paidSessionId || null }
        }),
        ACCESS_CODE_DB_TIMEOUT_MS
      );
      if (result === TIMEOUT_SENTINEL) return false;
      return true;
    } catch (err) {
      console.warn('access code db persist failed', err?.message || err);
      return false;
    }
  };

  const getOrCreateStripeAccessCode = async (session) => {
    if (!STRIPE || !session) return null;

    const sessionMetadata = session?.metadata || {};
    if (sessionMetadata?.access_code) return sessionMetadata.access_code;

    const customerId = typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id;

    let customer = typeof session.customer === 'object' ? session.customer : null;
    if (!customer && customerId) {
      try {
        customer = await STRIPE.customers.retrieve(customerId);
      } catch (err) {
        console.warn('stripe customer retrieve failed', err?.message || err);
      }
    }

    if (customer?.metadata?.access_code) return customer.metadata.access_code;

    let paymentIntent = null;
    const paymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id;
    if (paymentIntentId) {
      try {
        paymentIntent = await STRIPE.paymentIntents.retrieve(paymentIntentId);
      } catch (err) {
        console.warn('stripe payment intent retrieve failed', err?.message || err);
      }
    }

    if (paymentIntent?.metadata?.access_code) return paymentIntent.metadata.access_code;

    const code = generateAccessCode();
    const updates = [];

    if (customerId) {
      updates.push(STRIPE.customers.update(customerId, {
        metadata: { ...(customer?.metadata || {}), access_code: code }
      }));
    }

    if (paymentIntentId) {
      updates.push(STRIPE.paymentIntents.update(paymentIntentId, {
        metadata: { ...(paymentIntent?.metadata || {}), access_code: code }
      }));
    }

    if (!updates.length && session?.customer_details?.email) {
      try {
        await STRIPE.customers.create({
          email: session.customer_details.email,
          metadata: { access_code: code }
        });
      } catch (err) {
        console.warn('stripe customer create failed', err?.message || err);
      }
    }

    if (updates.length) {
      await Promise.allSettled(updates);
    }

    try {
      await STRIPE.checkout.sessions.update(session.id, {
        metadata: { ...(sessionMetadata || {}), access_code: code }
      });
    } catch (_) { /* ignore */ }

    return code;
  };

  const findAccessCodeInStripe = async (code) => {
    if (!STRIPE || !code) return null;
    const query = `metadata['access_code']:'${code}'`;

    try {
      const customers = await STRIPE.customers.search({ query, limit: 1 });
      if (customers?.data?.length) return { source: 'customer', paidSessionId: null };
    } catch (err) {
      console.warn('stripe customer search failed', err?.message || err);
    }

    try {
      const intents = await STRIPE.paymentIntents.search({ query, limit: 1 });
      if (intents?.data?.length) return { source: 'payment_intent', paidSessionId: null };
    } catch (err) {
      console.warn('stripe payment intent search failed', err?.message || err);
    }

    try {
      const sessions = await STRIPE.checkout.sessions.search({ query, limit: 1 });
      if (sessions?.data?.length) return { source: 'session', paidSessionId: sessions.data[0]?.id || null };
    } catch (err) {
      console.warn('stripe session search failed', err?.message || err);
    }

    return null;
  };

  const setSessionCookie = (res, token) => {
    res.cookie('session_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_TTL_HOURS * 60 * 60 * 1000
    });
  };

  const setPaidCookie = (res) => {
    res.cookie('quiz_paid', 'true', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30
    });
  };

  const setDiscordStateCookie = (res, state) => {
    res.cookie(DISCORD_STATE_COOKIE, state, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: DISCORD_STATE_TTL_MS
    });
  };

  const clearDiscordStateCookie = (res) => {
    res.clearCookie(DISCORD_STATE_COOKIE);
  };

  const membershipAccessPayload = (membership) => {
    if (!membership) {
      return {
        active: false,
        status: MembershipStatus.INACTIVE,
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
        stripePriceId: null
      };
    }
    return {
      active: isMembershipActive(membership.status),
      status: membership.status,
      currentPeriodEnd: membership.currentPeriodEnd ? membership.currentPeriodEnd.toISOString() : null,
      cancelAtPeriodEnd: Boolean(membership.cancelAtPeriodEnd),
      stripePriceId: membership.stripePriceId || null
    };
  };

  const syncDiscordAccessForUser = async (user, membership) => {
    if (!user?.discordId) return;
    try {
      await syncDiscordMemberRoles({
        discordUserId: user.discordId,
        membershipStatus: membership?.status || MembershipStatus.INACTIVE,
        tracks: user.primaryTrack ? [user.primaryTrack] : []
      });
    } catch (err) {
      console.warn('discord role sync failed', err?.message || err);
    }
  };

  const refreshMembershipRecord = async (membership) => {
    if (!membership || !membership.stripeSubscriptionId || !STRIPE) return membership;
    if (membership.lastSyncedAt && (Date.now() - membership.lastSyncedAt.getTime()) < MEMBERSHIP_SYNC_TTL_MS) {
      return membership;
    }

    const subscription = await STRIPE.subscriptions.retrieve(membership.stripeSubscriptionId);
    const snapshot = membershipSnapshotFromSubscription(subscription);
    const updated = await prisma.membership.update({
      where: { userId: membership.userId },
      data: {
        status: snapshot.status,
        stripeCustomerId: snapshot.stripeCustomerId,
        stripeSubscriptionId: snapshot.stripeSubscriptionId,
        stripePriceId: snapshot.stripePriceId,
        currentPeriodEnd: snapshot.currentPeriodEnd,
        cancelAtPeriodEnd: snapshot.cancelAtPeriodEnd,
        lastSyncedAt: new Date(),
        endedAt: isMembershipActive(snapshot.status) ? null : new Date()
      }
    });
    return updated;
  };

  const getRefreshedMembershipByUserId = async (userId) => {
    const membership = await prisma.membership.findUnique({ where: { userId } });
    if (!membership) return null;
    try {
      return await refreshMembershipRecord(membership);
    } catch (err) {
      console.warn('membership refresh failed', err?.message || err);
      return membership;
    }
  };

  const trackEvent = (userId, name, properties = {}) => {
    if (!posthog) return;
    posthog.capture({
      distinctId: userId || 'anonymous',
      event: name,
      properties
    });
  };

  const sendTransactionalEmail = async ({ to, subject, html, text }) => {
    if (!resend) {
      const configError = new Error('Email delivery is not configured. Set RESEND_API_KEY.');
      configError.code = 'email_not_configured';
      configError.isEmailError = true;
      configError.statusCode = 503;
      throw configError;
    }

    let response;
    try {
      response = await runWithTimeoutOrThrow(
        resend.emails.send({
          from: EMAIL_FROM,
          ...(EMAIL_REPLY_TO ? { reply_to: EMAIL_REPLY_TO } : {}),
          to,
          subject,
          html,
          text
        }),
        EMAIL_SEND_TIMEOUT_MS,
        {
          message: 'Email provider timed out while sending the message.',
          code: 'email_timeout'
        }
      );
    } catch (err) {
      if (err?.code === 'email_timeout') {
        err.isEmailError = true;
      }
      throw err;
    }

    const { data, error } = response;

    if (error) {
      const sendError = new Error(error.message || 'Unable to send email right now.');
      sendError.code = error.name || 'email_delivery_failed';
      sendError.isEmailError = true;
      sendError.statusCode = 502;
      throw sendError;
    }

    return data;
  };

  const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const renderEmailTemplate = ({
    preheader,
    eyebrow,
    title,
    intro,
    bodyHtml = '',
    ctaLabel,
    ctaUrl,
    ctaNote,
    footerNote = 'If you did not request this email, you can safely ignore it.',
    supportLabel = 'Need help? Reply to this email and we will point you in the right direction.'
  }) => {
    const safePreheader = escapeHtml(preheader);
    const safeEyebrow = escapeHtml(eyebrow);
    const safeTitle = escapeHtml(title);
    const safeIntro = escapeHtml(intro);
    const safeFooterNote = escapeHtml(footerNote);
    const safeSupportLabel = escapeHtml(supportLabel);
    const safeSiteUrl = escapeHtml(FRONTEND_URL);
    const safeCtaUrl = ctaUrl ? escapeHtml(ctaUrl) : '';
    const safeCtaLabel = ctaLabel ? escapeHtml(ctaLabel) : '';
    const safeCtaNote = ctaNote ? escapeHtml(ctaNote) : '';

    return `
      <div style="margin:0;padding:0;background-color:#f2ede4;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          ${safePreheader}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;background-color:#f2ede4;">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;border-collapse:collapse;">
                <tr>
                  <td style="padding-bottom:16px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;background-color:#111827;border-radius:28px 28px 0 0;">
                      <tr>
                        <td style="padding:18px 28px;border-bottom:1px solid rgba(255,255,255,0.08);">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td align="left" style="font-family:Arial,sans-serif;font-size:12px;line-height:1.4;letter-spacing:2px;text-transform:uppercase;color:#d1d5db;">
                                ${safeEyebrow}
                              </td>
                              <td align="right" style="font-family:Arial,sans-serif;font-size:12px;line-height:1.4;color:#9ca3af;">
                                ${escapeHtml(new URL(FRONTEND_URL).hostname)}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:40px 32px 32px;">
                          <div style="display:inline-block;padding:8px 14px;border:1px solid rgba(255,255,255,0.16);border-radius:999px;font-family:Arial,sans-serif;font-size:12px;line-height:1.2;letter-spacing:1.6px;text-transform:uppercase;color:#f9fafb;">
                            Private Access
                          </div>
                          <h1 style="margin:18px 0 14px;font-family:Arial,sans-serif;font-size:34px;line-height:1.15;font-weight:700;color:#ffffff;">
                            ${safeTitle}
                          </h1>
                          <p style="margin:0;font-family:Arial,sans-serif;font-size:16px;line-height:1.7;color:#d1d5db;">
                            ${safeIntro}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="background-color:#ffffff;border-radius:0 0 28px 28px;box-shadow:0 20px 50px rgba(17,24,39,0.08);">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <td style="padding:32px;">
                          <div style="font-family:Arial,sans-serif;font-size:16px;line-height:1.75;color:#1f2937;">
                            ${bodyHtml}
                          </div>
                          ${ctaUrl ? `
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;margin-bottom:18px;">
                              <tr>
                                <td align="center" style="border-radius:999px;background-color:#111827;">
                                  <a href="${safeCtaUrl}" style="display:inline-block;padding:15px 28px;font-family:Arial,sans-serif;font-size:15px;line-height:1;font-weight:700;color:#ffffff;text-decoration:none;">
                                    ${safeCtaLabel}
                                  </a>
                                </td>
                              </tr>
                            </table>
                          ` : ''}
                          ${ctaUrl ? `
                            <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:13px;line-height:1.7;color:#6b7280;">
                              ${safeCtaNote || 'If the button does not work, use the secure link below.'}
                            </p>
                            <p style="margin:0 0 26px;font-family:Arial,sans-serif;font-size:13px;line-height:1.7;word-break:break-all;">
                              <a href="${safeCtaUrl}" style="color:#111827;text-decoration:underline;">${safeCtaUrl}</a>
                            </p>
                          ` : ''}
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;margin-top:8px;">
                            <tr>
                              <td style="padding:18px 20px;border:1px solid #e5e7eb;border-radius:18px;background-color:#f9fafb;">
                                <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:12px;line-height:1.4;letter-spacing:1.2px;text-transform:uppercase;color:#6b7280;">
                                  What Happens Next
                                </p>
                                <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#374151;">
                                  ${safeFooterNote}
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 32px 32px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid #e5e7eb;border-collapse:collapse;">
                            <tr>
                              <td style="padding-top:20px;font-family:Arial,sans-serif;font-size:12px;line-height:1.8;color:#6b7280;">
                                <div style="margin-bottom:6px;font-weight:700;color:#111827;">Break The Cycle</div>
                                <div style="margin-bottom:6px;">${safeSupportLabel}</div>
                                <div><a href="${safeSiteUrl}" style="color:#111827;text-decoration:underline;">${safeSiteUrl}</a></div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `;
  };

  const renderMagicLinkPage = ({
    title,
    intro,
    bodyHtml = '',
    submitLabel = '',
    token = '',
    statusCode = 200,
    secondaryLabel = 'Back to Break The Cycle',
    secondaryHref = MEMBER_DASHBOARD_RETURN
  }) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #0b1020;
        --panel: rgba(17, 24, 39, 0.92);
        --panel-border: rgba(255, 255, 255, 0.08);
        --text: #f8fafc;
        --muted: #cbd5e1;
        --button: #f8fafc;
        --button-text: #111827;
        --button-secondary: rgba(255, 255, 255, 0.08);
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background:
          radial-gradient(circle at top, rgba(99, 102, 241, 0.2), transparent 40%),
          linear-gradient(180deg, #0f172a 0%, var(--bg) 100%);
        color: var(--text);
        font-family: Arial, sans-serif;
      }
      .card {
        width: min(100%, 560px);
        background: var(--panel);
        border: 1px solid var(--panel-border);
        border-radius: 24px;
        padding: 32px 28px;
        box-shadow: 0 24px 80px rgba(15, 23, 42, 0.4);
      }
      .eyebrow {
        display: inline-block;
        padding: 8px 12px;
        border-radius: 999px;
        border: 1px solid var(--panel-border);
        color: var(--muted);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-size: 12px;
      }
      h1 {
        margin: 18px 0 12px;
        font-size: clamp(28px, 4vw, 40px);
        line-height: 1.08;
      }
      p {
        margin: 0 0 16px;
        color: var(--muted);
        line-height: 1.7;
        font-size: 16px;
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 28px;
      }
      .btn,
      .btn-secondary {
        appearance: none;
        border: 0;
        border-radius: 999px;
        padding: 14px 18px;
        font-weight: 700;
        font-size: 15px;
        text-decoration: none;
        cursor: pointer;
      }
      .btn {
        background: var(--button);
        color: var(--button-text);
      }
      .btn-secondary {
        background: var(--button-secondary);
        color: var(--text);
      }
      .note {
        margin-top: 20px;
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px solid var(--panel-border);
        background: rgba(255, 255, 255, 0.04);
      }
    </style>
  </head>
  <body>
    <main class="card">
      <div class="eyebrow">Break The Cycle</div>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(intro)}</p>
      ${bodyHtml}
      <div class="actions">
        ${submitLabel && token ? `
          <form method="POST" action="/api/auth/verify" style="margin:0;">
            <input type="hidden" name="token" value="${escapeHtml(token)}" />
            <button class="btn" type="submit">${escapeHtml(submitLabel)}</button>
          </form>
        ` : ''}
        <a class="btn-secondary" href="${escapeHtml(secondaryHref)}">${escapeHtml(secondaryLabel)}</a>
      </div>
      <div class="note">
        <p style="margin:0;">Status: ${escapeHtml(String(statusCode))}</p>
      </div>
    </main>
  </body>
</html>`;

  const sendMagicLinkPage = (res, options) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(options.statusCode || 200).send(renderMagicLinkPage(options));
  };

  const isPrismaOperationalError = (err) =>
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientUnknownRequestError ||
    err instanceof Prisma.PrismaClientRustPanicError;

  const sendSubscriberWelcomeEmail = async (email) => sendTransactionalEmail({
    to: email,
    subject: 'Welcome to Break The Cycle',
    text: [
      'Welcome to Break The Cycle.',
      '',
      'You are officially on the list.',
      'Watch your inbox for future drops, updates, and new releases.',
      '',
      `Visit us anytime: ${FRONTEND_URL}`
    ].join('\n'),
    html: renderEmailTemplate({
      preheader: 'You are officially in.',
      eyebrow: 'Break The Cycle',
      title: 'You are officially in.',
      intro: 'You are now on the list for new drops, updates, and future releases.',
      bodyHtml: `
        <p style="margin:0 0 16px;">Thanks for subscribing to Break The Cycle.</p>
        <p style="margin:0 0 16px;">We will send the sharpest updates only, with clear next steps and no filler.</p>
        <p style="margin:0;">Stay close. More is coming.</p>
      `,
      ctaLabel: 'Visit Break The Cycle',
      ctaUrl: FRONTEND_URL,
      ctaNote: 'You can also open the site directly using the link below.',
      footerNote: 'You are subscribed and will receive future emails when new drops or updates go live.'
    })
  });

  const shouldSkipSessionLookup = (req) => {
    const rawPath = req.path || '';
    const path = rawPath.startsWith('/api/') ? rawPath.slice(4) : rawPath;
    if (!path) return true;
    if (path === '/health') return true;
    if (path === '/payment/status') return true;
    if (path === '/create-checkout-session') return true;
    if (path === '/verify-session') return true;
    if (path === '/access-code/login') return true;
    if (path.startsWith('/subscribe')) return true;
    return false;
  };

  // Attach user if session cookie present
  app.use(async (req, _res, next) => {
    if (DISABLE_SESSION_LOOKUP || shouldSkipSessionLookup(req)) return next();
    const token = req.cookies.session_token;
    if (!token) return next();
    try {
      const lookup = (async () => {
        const session = await prisma.session.findUnique({ where: { token } });
        if (!session) return null;
        if (session.expiresAt <= new Date()) {
          await prisma.session.delete({ where: { id: session.id } });
          return null;
        }
        const user = await prisma.user.findUnique({ where: { id: session.userId } });
        return user ? { user } : null;
      })();

      const timeout = new Promise((resolve) => setTimeout(() => resolve(null), SESSION_LOOKUP_TIMEOUT_MS));
      const result = await Promise.race([lookup, timeout]);
      if (result?.user) req.user = result.user;
    } catch (err) {
      console.error('session lookup error', err);
    }
    next();
  });

  const requireAuth = (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Auth required' });
    next();
  };

  const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== Role.ADMIN) return res.status(403).json({ error: 'Admin only' });
    next();
  };

  app.get('/api/health', async (req, res) => {
    const membership = req.user ? await getRefreshedMembershipByUserId(req.user.id) : null;
    res.json({
      ok: true,
      user: req.user ? req.user.email : null,
      membershipActive: isMembershipActive(membership?.status)
    });
  });

  app.get('/api/payment/status', async (req, res) => {
    const membership = req.user ? await getRefreshedMembershipByUserId(req.user.id) : null;
    res.json({
      paid: isMembershipActive(membership?.status),
      membership: membershipAccessPayload(membership)
    });
  });

  app.post('/api/create-checkout-session', async (req, res) => {
    try {
      if ((!STRIPE || !STRIPE_PRICE_ID) && STRIPE_PAYMENT_LINK) {
        return res.json({ url: STRIPE_PAYMENT_LINK, source: 'payment_link' });
      }
      if (!STRIPE || !STRIPE_PRICE_ID) {
        return res.status(500).json({ error: 'Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID (or STRIPE_PAYMENT_LINK).' });
      }

      const successUrl = `${FRONTEND_URL}/quiz.html?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${FRONTEND_URL}/quiz.html`;

      const session = await STRIPE.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
        success_url: successUrl,
        cancel_url: cancelUrl
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error('create-checkout-session error', err);
      if (STRIPE_PAYMENT_LINK) {
        return res.json({ url: STRIPE_PAYMENT_LINK, source: 'payment_link' });
      }
      res.status(500).json({ error: 'Unable to create checkout session.' });
    }
  });

  app.post('/api/verify-session', async (req, res) => {
    res.setHeader('X-BTC-Handler', 'express-verify-session');
    let stage = 'init';
    try {
      if (!STRIPE) {
        return res.status(500).json({ error: 'Stripe is not configured. Set STRIPE_SECRET_KEY.' });
      }

      const sessionId = req.body?.session_id;
      if (!sessionId) return res.status(400).json({ error: 'session_id is required.' });
      if (sessionId.startsWith('cs_live_') && STRIPE_SECRET_KEY.startsWith('sk_test_')) {
        return res.status(400).json({ error: 'Stripe key mismatch: live session with test key.' });
      }
      if (sessionId.startsWith('cs_test_') && STRIPE_SECRET_KEY.startsWith('sk_live_')) {
        return res.status(400).json({ error: 'Stripe key mismatch: test session with live key.' });
      }

      stage = 'retrieve_session';
      const session = await STRIPE.checkout.sessions.retrieve(sessionId, { expand: ['customer'] });
      const paid = session?.payment_status === 'paid' || session?.status === 'complete' || session?.payment_status === 'no_payment_required';
      let accessCode = null;
      if (paid) {
        stage = 'set_cookie';
        setPaidCookie(res);
        stage = 'db_access_code';
        accessCode = await getAccessCodeFromDb(sessionId);
        if (!accessCode) {
          stage = 'stripe_access_code';
          accessCode = await getOrCreateStripeAccessCode(session);
        }
        if (accessCode) {
          stage = 'persist_access_code';
          await persistAccessCodeRecord(accessCode, sessionId);
        }
      }

      stage = 'respond';
      res.json({ paid, status: session?.payment_status || 'unknown', checkoutStatus: session?.status || 'unknown', accessCode });
    } catch (err) {
      const stripeType = err?.type || err?.raw?.type || null;
      const stripeCode = err?.code || err?.raw?.code || null;
      let safeMessage = 'Unable to verify session.';
      let statusCode = err?.statusCode || err?.raw?.statusCode || 500;

      if (stripeType === 'StripeAuthenticationError') {
        safeMessage = 'Stripe authentication failed. Check STRIPE_SECRET_KEY.';
        statusCode = 401;
      } else if (stripeType === 'StripePermissionError') {
        safeMessage = 'Stripe permission error. Use a full secret key or allow Checkout Sessions read/write.';
        statusCode = 403;
      } else if (stripeType === 'StripeInvalidRequestError' || stripeCode === 'resource_missing' || /No such checkout\\.session/i.test(err?.message || '')) {
        safeMessage = 'Session not found for this Stripe key.';
        statusCode = 404;
      } else if (stripeType === 'StripeRateLimitError') {
        safeMessage = 'Stripe rate limit hit. Please retry.';
        statusCode = 429;
      }

      console.error('verify-session error', { message: err?.message, stripeType, stripeCode, statusCode, stage });
      res.status(statusCode).json({
        error: safeMessage,
        debug: {
          stripeType,
          stripeCode,
          statusCode,
          stage,
          name: err?.name || null,
          message: redactSecrets(err?.message || ''),
          node: process?.version || null,
          keyPrefix: STRIPE_SECRET_KEY ? STRIPE_SECRET_KEY.slice(0, 7) : null,
          stripeAccount: STRIPE_ACCOUNT_ID || null
        }
      });
    }
  });

  const subscribeSchema = z.object({ email: z.string().email() });
  const accessCodeSchema = z.object({ code: z.string().regex(/^\d{6,14}$/) });

  app.post('/api/access-code/login', async (req, res) => {
    try {
      const { code } = accessCodeSchema.parse(req.body);
      let access = null;
      try {
        access = await runWithTimeout(prisma.accessCode.findUnique({ where: { code } }), ACCESS_CODE_DB_TIMEOUT_MS);
      } catch (err) {
        console.warn('access code db lookup failed', err?.message || err);
      }

      if (access && !access.revokedAt) {
        try {
          await prisma.accessCode.update({
            where: { id: access.id },
            data: { lastUsedAt: new Date(), useCount: { increment: 1 } }
          });
        } catch (err) {
          console.warn('access code db update failed', err?.message || err);
        }

        setPaidCookie(res);
        return res.json({ ok: true, source: 'db' });
      }

      const stripeMatch = await findAccessCodeInStripe(code);
      if (stripeMatch) {
        await persistAccessCodeRecord(code, stripeMatch.paidSessionId || null);
        setPaidCookie(res);
        return res.json({ ok: true, source: 'stripe', matchSource: stripeMatch.source });
      }

      return res.status(401).json({ error: 'Invalid access ID.' });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Access ID must be 6-14 digits.' });
      console.error('access code login error', err);
      res.status(500).json({ error: 'Unable to verify access ID.' });
    }
  });

  // Email subscribe with double opt-in
  app.post('/api/subscribe', async (req, res) => {
    try {
      const parsed = subscribeSchema.parse(req.body);
      const email = parsed.email.trim().toLowerCase();
      const token = randomToken();
      const tokenHash = hashToken(token);

      try {
        const existing = await runWithTimeoutOrThrow(
          prisma.subscriber.findUnique({ where: { email } }),
          DB_OPERATION_TIMEOUT_MS,
          {
            message: 'Subscriber lookup timed out.',
            code: 'db_timeout'
          }
        );
        if (existing && existing.status === SubscriberStatus.CONFIRMED) {
          return res.json({ status: 'already_confirmed' });
        }

        const subscriber = existing
          ? await runWithTimeoutOrThrow(
              prisma.subscriber.update({
                where: { email },
                data: { tokenHash, status: SubscriberStatus.PENDING, confirmedAt: null }
              }),
              DB_OPERATION_TIMEOUT_MS,
              {
                message: 'Subscriber update timed out.',
                code: 'db_timeout'
              }
            )
          : await runWithTimeoutOrThrow(
              prisma.subscriber.create({ data: { email, tokenHash } }),
              DB_OPERATION_TIMEOUT_MS,
              {
                message: 'Subscriber creation timed out.',
                code: 'db_timeout'
              }
            );

        const confirmUrl = `${FRONTEND_URL}/api/subscribe/confirm?token=${token}`;
        const emailResult = await sendTransactionalEmail({
          to: email,
          subject: 'Confirm your Break The Cycle subscription',
          text: [
            'Confirm your Break The Cycle subscription.',
            '',
            'Click the secure link below to confirm your email:',
            confirmUrl,
            '',
            'If you did not request this, you can ignore this email.'
          ].join('\n'),
          html: renderEmailTemplate({
            preheader: 'Confirm your email to activate your subscription.',
            eyebrow: 'Break The Cycle',
            title: 'Confirm your email.',
            intro: 'One quick step and you are fully in.',
            bodyHtml: `
              <p style="margin:0 0 16px;">Thanks for joining Break The Cycle.</p>
              <p style="margin:0 0 16px;">Use the button below to confirm your subscription and activate future updates, drops, and releases.</p>
              <p style="margin:0;">This confirmation protects your inbox and makes sure we are sending to the right person.</p>
            `,
            ctaLabel: 'Confirm Subscription',
            ctaUrl: confirmUrl,
            ctaNote: 'If the button does not work, use the secure confirmation link below.',
            footerNote: 'Once confirmed, you will start receiving future Break The Cycle updates in this inbox.'
          })
        });

        return res.json({ status: 'pending', id: subscriber.id, emailId: emailResult?.id || null });
      } catch (err) {
        if (err?.code === 'db_timeout' || isPrismaOperationalError(err)) {
          console.error('subscribe db fallback', {
            code: err?.code || err?.name || 'db_error',
            message: err?.message || 'Unknown database error'
          });
          const emailResult = await sendSubscriberWelcomeEmail(email);
          return res.status(202).json({ status: 'sent_without_tracking', emailId: emailResult?.id || null });
        }
        throw err;
      }
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid email' });
      if (err?.isEmailError) {
        console.error('subscribe email error', { code: err.code, message: err.message });
        return res.status(err.statusCode || 502).json({ error: err.message });
      }
      if (err?.code === 'db_timeout') {
        console.error('subscribe db timeout', { message: err.message });
        return res.status(err.statusCode || 504).json({ error: err.message });
      }
      console.error('subscribe error', err);
      res.status(500).json({ error: 'Unable to subscribe' });
    }
  });

  app.get('/api/subscribe/confirm', async (req, res) => {
    const token = req.query?.token;
    if (!token) return res.status(400).send('Missing token');
    const tokenHash = hashToken(token);
    try {
      const subscriber = await prisma.subscriber.findFirst({ where: { tokenHash } });
      if (!subscriber) return res.status(404).send('Token not found');

      await prisma.subscriber.update({
        where: { id: subscriber.id },
        data: { status: SubscriberStatus.CONFIRMED, confirmedAt: new Date() }
      });
      res.send('Email confirmed! You are on the list.');
    } catch (err) {
      console.error('confirm error', err);
      res.status(500).send('Unable to confirm');
    }
  });

  // Magic link auth
  const authSchema = z.object({ email: z.string().email() });
  app.post('/api/auth/magic-link', async (req, res) => {
    try {
      const parsed = authSchema.parse(req.body);
      const email = parsed.email.trim().toLowerCase();
      const token = randomToken();
      const tokenHash = hashToken(token);
      const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

      let user = await runWithTimeoutOrThrow(
        prisma.user.findUnique({ where: { email } }),
        DB_OPERATION_TIMEOUT_MS,
        {
          message: 'User lookup timed out.',
          code: 'db_timeout'
        }
      );
      if (!user) {
        user = await runWithTimeoutOrThrow(
          prisma.user.create({ data: { email, role: Role.USER } }),
          DB_OPERATION_TIMEOUT_MS,
          {
            message: 'User creation timed out.',
            code: 'db_timeout'
          }
        );
      }

      await runWithTimeoutOrThrow(
        prisma.magicLinkToken.create({
          data: { tokenHash, email, userId: user.id, expiresAt }
        }),
        DB_OPERATION_TIMEOUT_MS,
        {
          message: 'Magic link creation timed out.',
          code: 'db_timeout'
        }
      );

      const verifyUrl = `${FRONTEND_URL}/api/auth/verify?token=${token}`;
      const emailResult = await sendTransactionalEmail({
        to: email,
        subject: 'Your Break The Cycle sign-in link',
        text: [
          'Your Break The Cycle sign-in link is ready.',
          '',
          'Open the secure link below, then tap Continue on the page to finish signing in. It is valid for 30 minutes:',
          verifyUrl,
          '',
          'If you did not request this, you can ignore this email.'
        ].join('\n'),
        html: renderEmailTemplate({
          preheader: 'Your secure sign-in link is ready.',
          eyebrow: 'Secure Sign-In',
          title: 'Your sign-in link is ready.',
          intro: 'Use this secure link to access your Break The Cycle account.',
          bodyHtml: `
            <p style="margin:0 0 16px;">Open the secure link below, then tap Continue on the page to finish signing in.</p>
            <p style="margin:0 0 16px;">That extra confirmation step helps protect your link from phone mail previews and email scanners.</p>
            <p style="margin:0 0 16px;">For security, this link expires in 30 minutes and can only be used once.</p>
            <p style="margin:0;">If this request was not made by you, no action is needed.</p>
          `,
          ctaLabel: 'Sign In Securely',
          ctaUrl: verifyUrl,
          ctaNote: 'If the button does not work, use the secure sign-in link below.',
          footerNote: 'This sign-in link expires in 30 minutes for security reasons.'
        })
      });

      res.json({ status: 'sent', emailId: emailResult?.id || null });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid email' });
      if (err?.isEmailError) {
        console.error('magic-link email error', { code: err.code, message: err.message });
        return res.status(err.statusCode || 502).json({ error: err.message });
      }
      if (err?.code === 'db_timeout') {
        console.error('magic-link db timeout', { message: err.message });
        return res.status(err.statusCode || 504).json({ error: err.message });
      }
      console.error('magic-link error', err);
      res.status(500).json({ error: 'Unable to send magic link' });
    }
  });

  app.get('/api/auth/verify', async (req, res) => {
    const token = String(req.query?.token || '').trim();
    if (!token) {
      return sendMagicLinkPage(res, {
        statusCode: 400,
        title: 'This sign-in link is incomplete.',
        intro: 'Request a fresh sign-in email and try again.',
        bodyHtml: '<p>The link you opened is missing the secure token we need to finish signing you in.</p>'
      });
    }

    try {
      const magic = await prisma.magicLinkToken.findUnique({ where: { tokenHash: hashToken(token) } });
      if (!magic) {
        return sendMagicLinkPage(res, {
          statusCode: 404,
          title: 'This sign-in link is no longer valid.',
          intro: 'Request a fresh sign-in email from Break The Cycle and try again.',
          bodyHtml: '<p>This usually means the link was already used or is no longer active.</p>'
        });
      }
      if (magic.expiresAt < new Date()) {
        return sendMagicLinkPage(res, {
          statusCode: 410,
          title: 'This sign-in link has expired.',
          intro: 'Request a new sign-in email and use it within 30 minutes.',
          bodyHtml: '<p>For security, magic links expire automatically after a short window.</p>'
        });
      }
      if (magic.usedAt) {
        if (req.user?.id && req.user.id === magic.userId) {
          return res.redirect(302, MEMBER_DASHBOARD_RETURN);
        }
        return sendMagicLinkPage(res, {
          statusCode: 409,
          title: 'This sign-in link was already used.',
          intro: 'Request a fresh sign-in email and then tap Continue on the page that opens.',
          bodyHtml: '<p>Some phone mail apps and email scanners can open links early. The new flow protects against that, but this older link cannot be reused.</p>'
        });
      }

      return sendMagicLinkPage(res, {
        statusCode: 200,
        title: 'Ready to sign in?',
        intro: 'Tap Continue to finish signing in to your Break The Cycle member area.',
        bodyHtml: '<p>This extra step helps stop phone mail previews and email scanners from consuming your magic link before you do.</p>',
        submitLabel: 'Continue to Member Area',
        token
      });
    } catch (err) {
      console.error('magic-link confirm page error', err);
      return sendMagicLinkPage(res, {
        statusCode: 500,
        title: 'We could not verify this sign-in link.',
        intro: 'Please request a fresh email and try again.',
        bodyHtml: '<p>Something went wrong while checking the link.</p>'
      });
    }
  });

  app.post('/api/auth/verify', async (req, res) => {
    const token = String(req.body?.token || req.query?.token || '').trim();
    if (!token) {
      return sendMagicLinkPage(res, {
        statusCode: 400,
        title: 'This sign-in link is incomplete.',
        intro: 'Request a fresh sign-in email and try again.',
        bodyHtml: '<p>The secure token was missing when we tried to finish signing you in.</p>'
      });
    }

    try {
      const tokenHash = hashToken(token);
      const magic = await prisma.magicLinkToken.findUnique({ where: { tokenHash } });
      if (!magic) {
        return sendMagicLinkPage(res, {
          statusCode: 404,
          title: 'This sign-in link is no longer valid.',
          intro: 'Request a fresh sign-in email from Break The Cycle and try again.',
          bodyHtml: '<p>This usually means the link was already used or is no longer active.</p>'
        });
      }
      if (magic.expiresAt < new Date()) {
        return sendMagicLinkPage(res, {
          statusCode: 410,
          title: 'This sign-in link has expired.',
          intro: 'Request a new sign-in email and use it within 30 minutes.',
          bodyHtml: '<p>For security, magic links expire automatically after a short window.</p>'
        });
      }
      if (magic.usedAt) {
        if (req.user?.id && req.user.id === magic.userId) {
          return res.redirect(302, MEMBER_DASHBOARD_RETURN);
        }
        return sendMagicLinkPage(res, {
          statusCode: 409,
          title: 'This sign-in link was already used.',
          intro: 'Request a fresh sign-in email and then tap Continue on the page that opens.',
          bodyHtml: '<p>If you opened the link on another device or email app first, that earlier session used this token.</p>'
        });
      }

      const sessionToken = randomToken();
      await prisma.session.create({
        data: { token: sessionToken, userId: magic.userId, expiresAt: sessionExpiry() }
      });
      await prisma.magicLinkToken.update({ where: { id: magic.id }, data: { usedAt: new Date() } });
      setSessionCookie(res, sessionToken);
      return res.redirect(302, MEMBER_DASHBOARD_RETURN);
    } catch (err) {
      console.error('verify magic error', err);
      return sendMagicLinkPage(res, {
        statusCode: 500,
        title: 'We could not finish signing you in.',
        intro: 'Please request a fresh sign-in email and try again.',
        bodyHtml: '<p>Something went wrong while creating your session.</p>'
      });
    }
  });

  const goalSchema = z.object({
    title: z.string().trim().min(3).max(160),
    notes: z.string().trim().max(500).optional().or(z.literal('')),
    track: z.string().optional(),
    targetDate: z.string().datetime().optional().or(z.literal(''))
  });

  const checkInSchema = z.object({
    summary: z.string().trim().min(3).max(600),
    blocker: z.string().trim().max(300).optional().or(z.literal('')),
    win: z.string().trim().max(300).optional().or(z.literal('')),
    momentum: z.string().trim().max(80).optional().or(z.literal('')),
    kind: z.string().trim().max(40).optional().or(z.literal('')),
    track: z.string().optional()
  });

  const loadMemberSnapshot = async (userId, { includeFullResults = false } = {}) => {
    const [membership, goals, checkIns, latestRun] = await Promise.all([
      getRefreshedMembershipByUserId(userId),
      prisma.memberGoal.findMany({
        where: { userId, status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 3
      }),
      prisma.memberCheckIn.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      prisma.quizRun.findFirst({
        where: { userId },
        orderBy: { completedAt: 'desc' }
      })
    ]);

    return {
      membership,
      goals,
      checkIns,
      latestRun: latestRun
        ? {
            id: latestRun.id,
            mode: String(latestRun.mode || '').toLowerCase(),
            completedAt: latestRun.completedAt,
            answers: includeFullResults ? latestRun.answers : undefined,
            results: includeFullResults ? latestRun.results : undefined,
            archetypeKeys: includeFullResults ? latestRun.archetypeKeys : latestRun.archetypeKeys.slice(0, 1)
          }
        : null
    };
  };

  const requireActiveMember = async (req, res, next) => {
    try {
      const membership = await getRefreshedMembershipByUserId(req.user.id);
      if (!isMembershipActive(membership?.status)) {
        return res.status(402).json({ error: 'Active membership required.' });
      }
      req.membership = membership;
      next();
    } catch (err) {
      console.error('member gate error', err);
      res.status(500).json({ error: 'Unable to verify membership.' });
    }
  };

  app.get('/api/auth/me', requireAuth, async (req, res) => {
    try {
      const membership = await getRefreshedMembershipByUserId(req.user.id);
      const discordConfig = getDiscordConfig();
      res.json({
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        discord: {
          connected: Boolean(req.user.discordId),
          id: req.user.discordId || null,
          username: req.user.discordUsername || null,
          avatarUrl: req.user.discordAvatar || null,
          inviteUrl: discordConfig.inviteUrl || null
        },
        membership: membershipAccessPayload(membership),
        primaryTrack: req.user.primaryTrack || null
      });
    } catch (err) {
      console.error('auth me error', err);
      res.status(500).json({ error: 'Unable to load account.' });
    }
  });

  app.get('/api/discord/connect-url', requireAuth, async (req, res) => {
    if (!hasDiscordOAuthConfig()) {
      return res.status(503).json({ error: 'Discord OAuth is not configured yet.' });
    }

    const state = randomToken();
    setDiscordStateCookie(res, state);
    res.json({
      url: buildDiscordAuthUrl({ state }),
      connected: Boolean(req.user.discordId)
    });
  });

  app.get('/api/discord/callback', async (req, res) => {
    const state = String(req.query?.state || '');
    const code = String(req.query?.code || '');
    const storedState = req.cookies[DISCORD_STATE_COOKIE];

    if (!req.user) {
      return res.redirect(302, buildMemberReturnUrl({ discord: 'login_required' }));
    }
    if (!state || !code || !storedState || storedState !== state) {
      return res.redirect(302, buildMemberReturnUrl({ discord: 'invalid_state' }));
    }

    clearDiscordStateCookie(res);

    try {
      const tokenData = await exchangeDiscordCode({ code });
      const identity = await fetchDiscordIdentity(tokenData.access_token);
      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          discordId: identity.id,
          discordUsername: identity.username ? `${identity.username}${identity.discriminator && identity.discriminator !== '0' ? `#${identity.discriminator}` : ''}` : identity.global_name || 'Discord member',
          discordAvatar: buildDiscordAvatarUrl(identity),
          discordConnectedAt: new Date()
        }
      });

      try {
        await joinGuildMember({
          discordUserId: identity.id,
          accessToken: tokenData.access_token
        });
      } catch (err) {
        console.warn('discord guild join failed', err?.message || err);
      }

      const membership = await getRefreshedMembershipByUserId(updatedUser.id);
      await syncDiscordAccessForUser(updatedUser, membership);

      return res.redirect(302, buildMemberReturnUrl({ discord: 'connected' }));
    } catch (err) {
      console.error('discord callback error', err);
      return res.redirect(302, buildMemberReturnUrl({ discord: 'failed' }));
    }
  });

  app.get('/api/membership/status', async (req, res) => {
    if (!req.user) {
      return res.json({
        authenticated: false,
        membership: membershipAccessPayload(null),
        discord: { connected: false },
        primaryTrack: null
      });
    }

    try {
      const membership = await getRefreshedMembershipByUserId(req.user.id);
      res.json({
        authenticated: true,
        membership: membershipAccessPayload(membership),
        discord: {
          connected: Boolean(req.user.discordId),
          username: req.user.discordUsername || null
        },
        primaryTrack: req.user.primaryTrack || null
      });
    } catch (err) {
      console.error('membership status error', err);
      res.status(500).json({ error: 'Unable to load membership status.' });
    }
  });

  app.post('/api/membership/create-checkout-session', requireAuth, async (req, res) => {
    try {
      if (!req.user.discordId) {
        return res.status(400).json({ error: 'Connect Discord before starting membership checkout.' });
      }
      if ((!STRIPE || !STRIPE_MEMBERSHIP_PRICE_ID) && STRIPE_PAYMENT_LINK) {
        return res.json({ url: STRIPE_PAYMENT_LINK, source: 'payment_link' });
      }
      if (!STRIPE || !STRIPE_MEMBERSHIP_PRICE_ID) {
        return res.status(500).json({ error: 'Stripe membership pricing is not configured.' });
      }

      const existingMembership = await getRefreshedMembershipByUserId(req.user.id);
      if (isMembershipActive(existingMembership?.status)) {
        return res.status(409).json({ error: 'Membership is already active.' });
      }

      const successUrl = `${MEMBER_DASHBOARD_RETURN}&membership_session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${FRONTEND_URL}/quiz.html?membership=cancelled`;

      const session = await STRIPE.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: STRIPE_MEMBERSHIP_PRICE_ID, quantity: 1 }],
        allow_promotion_codes: true,
        customer: existingMembership?.stripeCustomerId || undefined,
        customer_email: existingMembership?.stripeCustomerId ? undefined : req.user.email,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId: req.user.id,
          discordId: req.user.discordId || '',
          source: 'break_the_cycle_membership'
        }
      });

      res.json({ url: session.url });
    } catch (err) {
      console.error('membership checkout error', err);
      if (STRIPE_PAYMENT_LINK) {
        return res.json({ url: STRIPE_PAYMENT_LINK, source: 'payment_link' });
      }
      res.status(500).json({ error: 'Unable to start membership checkout.' });
    }
  });

  app.post('/api/membership/verify-session', requireAuth, async (req, res) => {
    try {
      if (!STRIPE) {
        return res.status(500).json({ error: 'Stripe is not configured.' });
      }
      const sessionId = req.body?.session_id;
      if (!sessionId) return res.status(400).json({ error: 'session_id is required.' });

      const session = await STRIPE.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription', 'customer']
      });

      if (session?.metadata?.userId && session.metadata.userId !== req.user.id) {
        return res.status(403).json({ error: 'That checkout session belongs to another account.' });
      }

      const paid = session?.payment_status === 'paid' || session?.status === 'complete';
      const subscription = session?.subscription && typeof session.subscription === 'object'
        ? session.subscription
        : (session?.subscription ? await STRIPE.subscriptions.retrieve(session.subscription) : null);

      const snapshot = membershipSnapshotFromSubscription(subscription);
      const membership = await prisma.membership.upsert({
        where: { userId: req.user.id },
        update: {
          status: paid ? snapshot.status : MembershipStatus.INCOMPLETE,
          stripeCustomerId: snapshot.stripeCustomerId || (typeof session.customer === 'string' ? session.customer : session.customer?.id || null),
          stripeSubscriptionId: snapshot.stripeSubscriptionId,
          stripeCheckoutSessionId: session.id,
          stripePriceId: snapshot.stripePriceId || STRIPE_MEMBERSHIP_PRICE_ID,
          currentPeriodEnd: snapshot.currentPeriodEnd,
          cancelAtPeriodEnd: snapshot.cancelAtPeriodEnd,
          lastSyncedAt: new Date(),
          endedAt: paid && isMembershipActive(snapshot.status) ? null : new Date()
        },
        create: {
          userId: req.user.id,
          status: paid ? snapshot.status : MembershipStatus.INCOMPLETE,
          stripeCustomerId: snapshot.stripeCustomerId || (typeof session.customer === 'string' ? session.customer : session.customer?.id || null),
          stripeSubscriptionId: snapshot.stripeSubscriptionId,
          stripeCheckoutSessionId: session.id,
          stripePriceId: snapshot.stripePriceId || STRIPE_MEMBERSHIP_PRICE_ID,
          currentPeriodEnd: snapshot.currentPeriodEnd,
          cancelAtPeriodEnd: snapshot.cancelAtPeriodEnd,
          lastSyncedAt: new Date(),
          endedAt: paid && isMembershipActive(snapshot.status) ? null : new Date()
        }
      });

      const freshUser = await prisma.user.findUnique({ where: { id: req.user.id } });
      await syncDiscordAccessForUser(freshUser, membership);

      res.json({
        ok: true,
        membership: membershipAccessPayload(membership)
      });
    } catch (err) {
      console.error('membership verify error', err);
      res.status(500).json({ error: 'Unable to verify membership session.' });
    }
  });

  app.post('/api/membership/billing-portal', requireAuth, async (req, res) => {
    try {
      if (!STRIPE) return res.status(500).json({ error: 'Stripe is not configured.' });
      const membership = await getRefreshedMembershipByUserId(req.user.id);
      if (!membership?.stripeCustomerId) {
        return res.status(404).json({ error: 'No Stripe customer found for this account yet.' });
      }

      const portal = await STRIPE.billingPortal.sessions.create({
        customer: membership.stripeCustomerId,
        return_url: MEMBER_DASHBOARD_RETURN
      });

      res.json({ url: portal.url });
    } catch (err) {
      console.error('billing portal error', err);
      res.status(500).json({ error: 'Unable to open billing portal.' });
    }
  });

  app.get('/api/member/dashboard', requireAuth, requireActiveMember, async (req, res) => {
    try {
      const snapshot = await loadMemberSnapshot(req.user.id, { includeFullResults: true });
      res.json({
        user: {
          id: req.user.id,
          email: req.user.email,
          discordUsername: req.user.discordUsername || null,
          primaryTrack: req.user.primaryTrack || null
        },
        membership: membershipAccessPayload(snapshot.membership),
        goals: snapshot.goals,
        checkIns: snapshot.checkIns,
        latestRun: snapshot.latestRun
      });
    } catch (err) {
      console.error('member dashboard error', err);
      res.status(500).json({ error: 'Unable to load member dashboard.' });
    }
  });

  app.post('/api/member/goals', requireAuth, requireActiveMember, async (req, res) => {
    try {
      const parsed = goalSchema.parse(req.body);
      const goal = await prisma.memberGoal.create({
        data: {
          userId: req.user.id,
          title: parsed.title,
          notes: parsed.notes || null,
          track: normalizeTrack(parsed.track) || req.user.primaryTrack || null,
          targetDate: parsed.targetDate ? new Date(parsed.targetDate) : null
        }
      });
      res.json({ ok: true, goal });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid goal payload.' });
      console.error('member goal error', err);
      res.status(500).json({ error: 'Unable to save goal.' });
    }
  });

  app.post('/api/member/checkins', requireAuth, requireActiveMember, async (req, res) => {
    try {
      const parsed = checkInSchema.parse(req.body);
      const checkIn = await prisma.memberCheckIn.create({
        data: {
          userId: req.user.id,
          track: normalizeTrack(parsed.track) || req.user.primaryTrack || null,
          summary: parsed.summary,
          blocker: parsed.blocker || null,
          win: parsed.win || null,
          momentum: parsed.momentum || null,
          kind: parsed.kind || 'manual'
        }
      });
      res.json({ ok: true, checkIn });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid check-in payload.' });
      console.error('member checkin error', err);
      res.status(500).json({ error: 'Unable to save check-in.' });
    }
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('session_token');
    clearDiscordStateCookie(res);
    res.json({ ok: true });
  });

  // Quiz metadata for caching at the edge
  app.get('/api/quiz/meta', async (_req, res) => {
    try {
      const flags = await prisma.featureFlag.findMany({ where: { enabled: true } });
      const questions = await prisma.quizQuestion.findMany({ orderBy: { order: 'asc' } });
      const archetypes = await prisma.archetype.findMany({});
      res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
      res.json({ flags, questions, archetypes });
    } catch (err) {
      console.error('meta error', err);
      res.status(500).json({ error: 'Unable to load metadata' });
    }
  });

  const quizSubmitSchema = z.object({
    mode: z.enum(['career', 'life', 'both']),
    answers: z.record(z.any()),
    results: z.record(z.any()).optional(),
    featureVariant: z.string().optional(),
    archetypeKeys: z.array(z.string()).optional()
  });

  app.post('/api/quiz/submit', requireAuth, async (req, res) => {
    try {
      const data = quizSubmitSchema.parse(req.body);
      const modeMap = { career: Mode.CAREER, life: Mode.LIFE, both: Mode.BOTH };
      const inferredTrack = inferPrimaryTrack({ mode: data.mode, results: data.results || {} });
      const run = await prisma.quizRun.create({
        data: {
          userId: req.user.id,
          mode: modeMap[data.mode],
          answers: data.answers,
          results: data.results || {},
          archetypeKeys: data.archetypeKeys || [],
          featureVariant: data.featureVariant
        }
      });
      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          primaryTrack: inferredTrack ? MemberTrack[inferredTrack] || inferredTrack : undefined
        }
      });
      const membership = await getRefreshedMembershipByUserId(req.user.id);
      await syncDiscordAccessForUser(updatedUser, membership);
      trackEvent(req.user.id, 'quiz_completed', { mode: data.mode });
      res.json({ id: run.id, primaryTrack: inferredTrack, inferredTracks: inferTracksFromQuiz({ mode: data.mode, results: data.results || {} }) });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid payload' });
      console.error('quiz submit error', err);
      res.status(500).json({ error: 'Unable to save quiz' });
    }
  });

  app.get('/api/quiz/result/:id', requireAuth, async (req, res) => {
    try {
      const run = await prisma.quizRun.findUnique({ where: { id: req.params.id } });
      if (!run || run.userId !== req.user.id) return res.status(404).json({ error: 'Not found' });
      res.json(run);
    } catch (err) {
      console.error('result fetch error', err);
      res.status(500).json({ error: 'Unable to load result' });
    }
  });

  app.get('/api/profile', requireAuth, async (req, res) => {
    try {
      const runs = await prisma.quizRun.findMany({
        where: { userId: req.user.id },
        orderBy: { completedAt: 'desc' },
        take: 5
      });
      res.json({ user: { id: req.user.id, email: req.user.email }, runs });
    } catch (err) {
      console.error('profile error', err);
      res.status(500).json({ error: 'Unable to load profile' });
    }
  });

  app.get('/api/flags', async (_req, res) => {
    try {
      const flags = await prisma.featureFlag.findMany({ where: { enabled: true } });
      res.json(flags.map(f => ({ key: f.key, variant: f.variant })));
    } catch (err) {
      console.error('flags error', err);
      res.status(500).json({ error: 'Unable to load flags' });
    }
  });

  // Minimal admin endpoint to upsert questions (protected)
  const questionSchema = z.object({
    slug: z.string(),
    mode: z.enum(['career', 'life', 'both']),
    order: z.number(),
    text: z.string(),
    options: z.record(z.any())
  });

  app.post('/api/admin/questions', requireAuth, requireAdmin, async (req, res) => {
    try {
      const payload = questionSchema.parse(req.body);
      const modeMap = { career: Mode.CAREER, life: Mode.LIFE, both: Mode.BOTH };
      const question = await prisma.quizQuestion.upsert({
        where: { slug: payload.slug },
        update: { text: payload.text, options: payload.options, order: payload.order, mode: modeMap[payload.mode] },
        create: { slug: payload.slug, text: payload.text, options: payload.options, order: payload.order, mode: modeMap[payload.mode] }
      });
      res.json({ ok: true, id: question.id });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid question payload' });
      console.error('admin question error', err);
      res.status(500).json({ error: 'Unable to save question' });
    }
  });

  return app;
}

module.exports = { buildApp, prisma };
