const crypto = require('crypto');
const stripeLib = require('stripe');

const ACCESS_CODE_LENGTH = parseInt(process.env.ACCESS_CODE_LENGTH || '10', 10);

function generateAccessCode() {
  let code = '';
  for (let i = 0; i < ACCESS_CODE_LENGTH; i += 1) {
    code += crypto.randomInt(0, 10).toString();
  }
  return code;
}

function setPaidCookie(res) {
  const maxAgeSeconds = 60 * 60 * 24 * 30;
  let cookie = `quiz_paid=true; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    cookie += '; Secure';
  }
  res.setHeader('Set-Cookie', cookie);
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed.' }));
    return;
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Stripe is not configured. Set STRIPE_SECRET_KEY.' }));
    return;
  }

  let payload = {};
  try {
    payload = await readJson(req);
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
    return;
  }

  const sessionId = payload?.session_id;
  if (!sessionId) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'session_id is required.' }));
    return;
  }

  try {
    if (sessionId.startsWith('cs_live_') && STRIPE_SECRET_KEY.startsWith('sk_test_')) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Stripe key mismatch: live session with test key.' }));
      return;
    }
    if (sessionId.startsWith('cs_test_') && STRIPE_SECRET_KEY.startsWith('sk_live_')) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Stripe key mismatch: test session with live key.' }));
      return;
    }

    const stripe = stripeLib(STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['customer', 'payment_intent'] });
    const paid = session?.payment_status === 'paid' ||
      session?.status === 'complete' ||
      session?.payment_status === 'no_payment_required';

    let accessCode = session?.metadata?.access_code || null;

    if (paid && !accessCode) {
      accessCode = generateAccessCode();
      const updates = [];

      const customerId = typeof session.customer === 'string'
        ? session.customer
        : session.customer?.id;
      if (customerId) {
        updates.push(stripe.customers.update(customerId, { metadata: { access_code: accessCode } }));
      }

      const paymentIntentId = typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id;
      if (paymentIntentId) {
        updates.push(stripe.paymentIntents.update(paymentIntentId, { metadata: { access_code: accessCode } }));
      }

      updates.push(stripe.checkout.sessions.update(session.id, {
        metadata: { ...(session?.metadata || {}), access_code: accessCode }
      }));

      await Promise.allSettled(updates);
    }

    if (paid) setPaidCookie(res);

    res.statusCode = 200;
    res.end(JSON.stringify({
      paid,
      status: session?.payment_status || 'unknown',
      checkoutStatus: session?.status || 'unknown',
      accessCode
    }));
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

    console.error('verify-session (serverless) error', {
      message: err?.message,
      stripeType,
      stripeCode,
      statusCode
    });
    res.statusCode = statusCode;
    res.end(JSON.stringify({
      error: safeMessage,
      debug: { stripeType, stripeCode, statusCode }
    }));
  }
};
