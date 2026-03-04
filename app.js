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
  const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:${PORT}`;
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
  const STRIPE = STRIPE_SECRET_KEY ? stripeLib(STRIPE_SECRET_KEY) : null;
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
  const posthog = process.env.POSTHOG_API_KEY ? new PostHog(process.env.POSTHOG_API_KEY, { host: process.env.POSTHOG_HOST || 'https://us.i.posthog.com' }) : null;
  const SESSION_TTL_HOURS = parseInt(process.env.SESSION_TTL_HOURS || '720', 10);

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

  // Attach user if session cookie present
  app.use(async (req, _res, next) => {
    const token = req.cookies.session_token;
    if (!token) return next();
    try {
      const session = await prisma.session.findUnique({ where: { token } });
      if (session && session.expiresAt > new Date()) {
        req.user = await prisma.user.findUnique({ where: { id: session.userId } });
      } else if (session) {
        await prisma.session.delete({ where: { id: session.id } });
      }
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
      if (!STRIPE || !STRIPE_PRICE_ID) {
        return res.status(500).json({ error: 'Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.' });
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

      const session = await STRIPE.checkout.sessions.retrieve(sessionId);
      const paid = session?.payment_status === 'paid';
      if (paid) setPaidCookie(res);

      res.json({ paid, status: session?.payment_status || 'unknown' });
    } catch (err) {
      console.error('verify-session error', err);
      res.status(500).json({ error: 'Unable to verify session.' });
    }
  });

  // Email subscribe with double opt-in
  const subscribeSchema = z.object({ email: z.string().email() });
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
      res.redirect('/quiz.html');
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
