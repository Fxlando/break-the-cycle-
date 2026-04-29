require('dotenv').config();
const stripeLib = require('stripe');

const REQUIRED_KEYS = [
  'FRONTEND_URL',
  'STRIPE_SECRET_KEY',
  'STRIPE_MEMBERSHIP_PRICE_ID',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'DISCORD_CLIENT_ID',
  'DISCORD_CLIENT_SECRET',
  'DISCORD_REDIRECT_URI',
  'DISCORD_BOT_TOKEN',
  'DISCORD_GUILD_ID',
  'DISCORD_ROLE_MEMBER_ID'
];

function getValue(name) {
  return String(process.env[name] || '').trim();
}

function isMissing(name) {
  const value = getValue(name);
  if (!value) return true;
  if (/replace[-_ ]?me/i.test(value)) return true;
  if (/discord_(client_secret|bot_token)_here/i.test(value)) return true;
  return false;
}

function summarizeUrl(raw) {
  try {
    const url = new URL(raw);
    return {
      ok: true,
      protocol: url.protocol,
      host: url.hostname,
      pathname: url.pathname
    };
  } catch (_) {
    return { ok: false };
  }
}

function isLocalHost(host) {
  return /^(localhost|127(?:\.\d{1,3}){3}|\[::1\]|::1)$/i.test(String(host || ''));
}

function samePath(a, b) {
  return String(a || '').replace(/\/+$/, '') === String(b || '').replace(/\/+$/, '');
}

function getStripeKeyMode(secretKey) {
  if (/^sk_live_/i.test(String(secretKey || ''))) return 'live';
  if (/^sk_test_/i.test(String(secretKey || ''))) return 'test';
  return null;
}

async function main() {
  console.log('Break the Cycle Vercel env check');

  const missing = REQUIRED_KEYS.filter(isMissing);
  const frontend = summarizeUrl(getValue('FRONTEND_URL'));
  const redirect = summarizeUrl(getValue('DISCORD_REDIRECT_URI'));
  const externalApiOrigin = summarizeUrl(getValue('EXTERNAL_API_ORIGIN'));
  const db = summarizeUrl(getValue('DATABASE_URL'));
  const stripeSecretKey = getValue('STRIPE_SECRET_KEY');
  const stripePriceId = getValue('STRIPE_PRICE_ID');
  const stripeMembershipPriceId = getValue('STRIPE_MEMBERSHIP_PRICE_ID');
  const issues = [];
  const usingExternalOrigin = externalApiOrigin.ok;

  if (missing.length) {
    issues.push(`Missing required variables: ${missing.join(', ')}`);
  }

  console.log(`- Backend mode: ${usingExternalOrigin ? 'proxy to external origin' : 'direct on Vercel'}`);

  if (!frontend.ok) {
    issues.push('FRONTEND_URL is missing or invalid.');
  } else {
    console.log(`- FRONTEND_URL host: ${frontend.host}`);
    if (frontend.protocol !== 'https:') {
      issues.push('FRONTEND_URL should use https on Vercel.');
    }
    if (isLocalHost(frontend.host)) {
      issues.push('FRONTEND_URL cannot point at localhost for the live Vercel site.');
    }
  }

  if (!redirect.ok) {
    issues.push('DISCORD_REDIRECT_URI is missing or invalid.');
  } else {
    console.log(`- DISCORD_REDIRECT_URI host: ${redirect.host}`);
    if (isLocalHost(redirect.host)) {
      issues.push('DISCORD_REDIRECT_URI cannot point at localhost for the live Vercel site.');
    }
    if (frontend.ok) {
      const expectedPath = '/api/discord/callback';
      if (redirect.host !== frontend.host || !samePath(redirect.pathname, expectedPath)) {
        issues.push(`DISCORD_REDIRECT_URI should be https://${frontend.host}${expectedPath}`);
      }
    }
  }

  if (usingExternalOrigin) {
    console.log(`- EXTERNAL_API_ORIGIN host: ${externalApiOrigin.host}`);
    if (externalApiOrigin.protocol !== 'https:') {
      issues.push('EXTERNAL_API_ORIGIN should use https.');
    }
    if (isLocalHost(externalApiOrigin.host)) {
      issues.push('EXTERNAL_API_ORIGIN cannot point at localhost for the live Vercel site.');
    }
  } else if (!db.ok) {
    issues.push('DATABASE_URL is missing or invalid.');
  } else {
    console.log(`- DATABASE_URL host: ${db.host}`);
    if (isLocalHost(db.host)) {
      issues.push('DATABASE_URL cannot point at localhost for the live Vercel site.');
    }
  }

  if (!isMissing('STRIPE_MEMBERSHIP_PRICE_ID') && stripePriceId && stripeMembershipPriceId === stripePriceId) {
    issues.push('STRIPE_MEMBERSHIP_PRICE_ID must not match STRIPE_PRICE_ID.');
  }

  if (!isMissing('STRIPE_SECRET_KEY') && !isMissing('STRIPE_MEMBERSHIP_PRICE_ID')) {
    try {
      const stripe = stripeLib(stripeSecretKey);
      const price = await stripe.prices.retrieve(stripeMembershipPriceId);
      console.log(`- STRIPE_MEMBERSHIP_PRICE_ID type: ${price.type}`);
      console.log(`- STRIPE_MEMBERSHIP_PRICE_ID mode: ${price.livemode ? 'live' : 'test'}`);

      if (!price.active) {
        issues.push('STRIPE_MEMBERSHIP_PRICE_ID must be active.');
      }
      const expectedMode = getStripeKeyMode(stripeSecretKey);
      if (expectedMode === 'live' && !price.livemode) {
        issues.push('STRIPE_MEMBERSHIP_PRICE_ID must be a live price for the live Stripe key.');
      } else if (expectedMode === 'test' && price.livemode) {
        issues.push('STRIPE_MEMBERSHIP_PRICE_ID must be a test price for the test Stripe key.');
      }

      if (price.type !== 'recurring' || !price.recurring) {
        issues.push('STRIPE_MEMBERSHIP_PRICE_ID must be a recurring monthly price.');
      } else if (price.recurring.interval !== 'month' || Number(price.recurring.interval_count || 1) !== 1) {
        issues.push('STRIPE_MEMBERSHIP_PRICE_ID must recur monthly.');
      }
    } catch (err) {
      issues.push(`Could not load STRIPE_MEMBERSHIP_PRICE_ID from Stripe: ${err?.message || err}`);
    }
  }

  console.log('\nSummary');
  if (!issues.length) {
    console.log('- Ready: this env shape fits the Vercel web app.');
    process.exit(0);
  }

  for (const issue of issues) {
    console.log(`- ${issue}`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error(err?.message || err);
  process.exit(1);
});
