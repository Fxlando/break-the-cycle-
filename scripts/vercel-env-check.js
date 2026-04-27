require('dotenv').config();

const REQUIRED_KEYS = [
  'FRONTEND_URL',
  'DATABASE_URL',
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

function main() {
  console.log('Break the Cycle Vercel env check');

  const missing = REQUIRED_KEYS.filter(isMissing);
  const frontend = summarizeUrl(getValue('FRONTEND_URL'));
  const redirect = summarizeUrl(getValue('DISCORD_REDIRECT_URI'));
  const db = summarizeUrl(getValue('DATABASE_URL'));
  const issues = [];

  if (missing.length) {
    issues.push(`Missing required variables: ${missing.join(', ')}`);
  }

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

  if (!db.ok) {
    issues.push('DATABASE_URL is missing or invalid.');
  } else {
    console.log(`- DATABASE_URL host: ${db.host}`);
    if (isLocalHost(db.host)) {
      issues.push('DATABASE_URL cannot point at localhost for the live Vercel site.');
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

main();
