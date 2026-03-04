require('dotenv').config();

const express = require('express');
const path = require('path');
const stripeLib = require('stripe');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:${PORT}`;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;
const stripe = STRIPE_SECRET_KEY ? stripeLib(STRIPE_SECRET_KEY) : null;

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve the existing static site
app.use(express.static(path.join(__dirname)));

const setPaidCookie = (res) => {
  res.cookie('quiz_paid', 'true', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
  });
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true, paid: req.cookies.quiz_paid === 'true' });
});

app.get('/api/payment/status', (req, res) => {
  const paid = req.cookies.quiz_paid === 'true';
  res.json({ paid });
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!stripe || !STRIPE_PRICE_ID) {
      return res.status(500).json({ error: 'Stripe is not configured. Set STRIPE_SECRET_KEY and STRIPE_PRICE_ID.' });
    }

    const successUrl = `${FRONTEND_URL}/quiz.html?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${FRONTEND_URL}/index.html`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1
        }
      ],
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
    if (!stripe) {
      return res.status(500).json({ error: 'Stripe is not configured. Set STRIPE_SECRET_KEY.' });
    }

    const sessionId = req.body?.session_id;
    if (!sessionId) {
      return res.status(400).json({ error: 'session_id is required.' });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session?.payment_status === 'paid';

    if (paid) {
      setPaidCookie(res);
    }

    res.json({ paid, status: session?.payment_status || 'unknown' });
  } catch (err) {
    console.error('verify-session error', err);
    res.status(500).json({ error: 'Unable to verify session.' });
  }
});

app.listen(PORT, () => {
  console.log(`Break the Cycle server listening on http://localhost:${PORT}`);
});
