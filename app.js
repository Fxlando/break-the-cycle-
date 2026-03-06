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
const { PrismaClient, Role, SubscriberStatus, Mode } = require('@prisma/client');
const { Resend } = require('resend');
const { PostHog } = require('posthog-node');

const prisma = new PrismaClient();

function buildApp() {
  const app = express();

  const PORT = process.env.PORT || 3000;
  const FRONTEND_URL = process.env.FRONTEND_URL ||
    (process.env.VERCEL && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${PORT}`);
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
  const STRIPE_PAYMENT_LINK = process.env.STRIPE_PAYMENT_LINK;
  const STRIPE = STRIPE_SECRET_KEY ? stripeLib(STRIPE_SECRET_KEY) : null;
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const posthog = process.env.POSTHOG_API_KEY ? new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST || 'https://us.i.posthog.com' }) : null;
  const SESSION_TTL_HOURS = parseInt(process.env.SESSION_TTL_HOURS || '720', 10);
  const ACCESS_CODE_LENGTH = parseInt(process.env.ACCESS_CODE_LENGTH || '10', 10);
  const SESSION_LOOKUP_TIMEOUT_MS = parseInt(process.env.SESSION_LOOKUP_TIMEOUT_MS || '1200', 10);
  const DISABLE_SESSION_LOOKUP = process.env.DISABLE_SESSION_LOOKUP === '1';
  const ACCESS_CODE_DB_TIMEOUT_MS = parseInt(process.env.ACCESS_CODE_DB_TIMEOUT_MS || '1200', 10);

  const cspDirectives = {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
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

  const runWithTimeout = async (promise, timeoutMs) => {
    let timeout;
    const guard = new Promise((resolve) => {
      timeout = setTimeout(() => resolve({ timedOut: true }), timeoutMs);
    });
    const result = await Promise.race([
      promise.then((value) => ({ value })),
      guard
    ]);
    clearTimeout(timeout);
    if (result?.timedOut) return null;
    return result.value;
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
      return result?.code || null;
    } catch (err) {
      console.error('access code db error', err);
      return null;
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
    if (!STRIPE || !code) return false;
    const query = `metadata['access_code']:'${code}'`;

    try {
      const customers = await STRIPE.customers.search({ query, limit: 1 });
      if (customers?.data?.length) return true;
    } catch (err) {
      console.warn('stripe customer search failed', err?.message || err);
    }

    try {
      const intents = await STRIPE.paymentIntents.search({ query, limit: 1 });
      if (intents?.data?.length) return true;
    } catch (err) {
      console.warn('stripe payment intent search failed', err?.message || err);
    }

    try {
      const sessions = await STRIPE.checkout.sessions.search({ query, limit: 1 });
      if (sessions?.data?.length) return true;
    } catch (err) {
      console.warn('stripe session search failed', err?.message || err);
    }

    return false;
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

  const trackEvent = (userId, name, properties = {}) => {
    if (!posthog) return;
    posthog.capture({
      distinctId: userId || 'anonymous',
      event: name,
      properties
    });
  };

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

  app.get('/api/health', (req, res) => {
    res.json({ ok: true, paid: req.cookies.quiz_paid === 'true', user: req.user ? req.user.email : null });
  });

  app.get('/api/payment/status', (req, res) => {
    const paid = req.cookies.quiz_paid === 'true';
    res.json({ paid });
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
      const cancelUrl = `${FRONTEND_URL}/index.html`;

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

      const session = await STRIPE.checkout.sessions.retrieve(sessionId, { expand: ['customer'] });
      const paid = session?.payment_status === 'paid' || session?.status === 'complete' || session?.payment_status === 'no_payment_required';
      let accessCode = null;
      if (paid) {
        setPaidCookie(res);
        accessCode = await getAccessCodeFromDb(sessionId);
        if (!accessCode) {
          accessCode = await getOrCreateStripeAccessCode(session);
        }
      }

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

      console.error('verify-session error', { message: err?.message, stripeType, stripeCode, statusCode });
      res.status(statusCode).json({ error: safeMessage, debug: { stripeType, stripeCode, statusCode } });
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
        setPaidCookie(res);
        return res.json({ ok: true, source: 'stripe' });
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
      const { email } = subscribeSchema.parse(req.body);
      const token = randomToken();
      const tokenHash = hashToken(token);

      const existing = await prisma.subscriber.findUnique({ where: { email } });
      if (existing && existing.status === SubscriberStatus.CONFIRMED) {
        return res.json({ status: 'already_confirmed' });
      }

      const subscriber = existing
        ? await prisma.subscriber.update({
            where: { email },
            data: { tokenHash, status: SubscriberStatus.PENDING, confirmedAt: null }
          })
        : await prisma.subscriber.create({ data: { email, tokenHash } });

      const confirmUrl = `${FRONTEND_URL}/api/subscribe/confirm?token=${token}`;
      if (resend) {
        await resend.emails.send({
          from: 'Break The Cycle <no-reply@breakthecycle.app>',
          to: email,
          subject: 'Confirm your email',
          html: `<p>Thanks for joining! Confirm here: <a href="${confirmUrl}">${confirmUrl}</a></p>`
        });
      } else {
        console.log('Confirm URL (no email provider configured):', confirmUrl);
      }

      res.json({ status: 'pending', id: subscriber.id });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid email' });
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
      const { email } = authSchema.parse(req.body);
      const token = randomToken();
      const tokenHash = hashToken(token);
      const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) user = await prisma.user.create({ data: { email, role: Role.USER } });

      await prisma.magicLinkToken.create({
        data: { tokenHash, email, userId: user.id, expiresAt }
      });

      const verifyUrl = `${FRONTEND_URL}/api/auth/verify?token=${token}`;
      if (resend) {
        await resend.emails.send({
          from: 'Break The Cycle <no-reply@breakthecycle.app>',
          to: email,
          subject: 'Your login link',
          html: `<p>Click to sign in: <a href="${verifyUrl}">${verifyUrl}</a> (valid 30 minutes)</p>`
        });
      } else {
        console.log('Magic link URL (no email provider configured):', verifyUrl);
      }

      res.json({ status: 'sent' });
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ error: 'Invalid email' });
      console.error('magic-link error', err);
      res.status(500).json({ error: 'Unable to send magic link' });
    }
  });

  app.get('/api/auth/verify', async (req, res) => {
    const token = req.query?.token;
    if (!token) return res.status(400).send('Missing token');
    const tokenHash = hashToken(token);
    try {
      const magic = await prisma.magicLinkToken.findFirst({ where: { tokenHash, usedAt: null } });
      if (!magic) return res.status(404).send('Token not found');
      if (magic.expiresAt < new Date()) return res.status(410).send('Token expired');

      const sessionToken = randomToken();
      await prisma.session.create({
        data: { token: sessionToken, userId: magic.userId, expiresAt: sessionExpiry() }
      });
      await prisma.magicLinkToken.update({ where: { id: magic.id }, data: { usedAt: new Date() } });
      setSessionCookie(res, sessionToken);
      res.redirect(302, `${FRONTEND_URL}/quiz.html`);
    } catch (err) {
      console.error('verify magic error', err);
      res.status(500).send('Unable to verify');
    }
  });

  app.get('/api/auth/me', requireAuth, (req, res) => {
    res.json({ id: req.user.id, email: req.user.email, role: req.user.role });
  });

  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('session_token');
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
      trackEvent(req.user.id, 'quiz_completed', { mode: data.mode });
      res.json({ id: run.id });
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
