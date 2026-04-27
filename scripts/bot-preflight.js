require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const MENTOR_PROVIDER = (process.env.MENTOR_PROVIDER || 'ollama').trim().toLowerCase();
const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434').trim().replace(/\/+$/, '');
const OLLAMA_MODEL = (process.env.OLLAMA_MODEL || 'llama3.2:3b').trim();
const OLLAMA_REQUEST_TIMEOUT_MS = parseInt(process.env.OLLAMA_REQUEST_TIMEOUT_MS || '45000', 10);
const DATABASE_URL = String(process.env.DATABASE_URL || '').trim();

const discordWebsiteKeys = [
  'DISCORD_CLIENT_ID',
  'DISCORD_CLIENT_SECRET',
  'DISCORD_REDIRECT_URI'
];

const discordBotKeys = [
  'DISCORD_BOT_TOKEN',
  'DISCORD_GUILD_ID',
  'DISCORD_ROLE_MEMBER_ID'
];

function isFilled(name) {
  const value = String(process.env[name] || '').trim();
  if (!value) return false;
  if (/replace[-_ ]?me/i.test(value)) return false;
  if (/discord_(client_secret|bot_token)_here/i.test(value)) return false;
  return true;
}

function printGroup(title, keys) {
  console.log(`\n${title}`);
  for (const key of keys) {
    console.log(`- ${key}: ${isFilled(key) ? 'set' : 'missing'}`);
  }
}

async function checkOllama() {
  if (MENTOR_PROVIDER !== 'ollama') {
    console.log(`\nMentor provider: ${MENTOR_PROVIDER || 'fallback'}`);
    console.log('- External AI checks skipped because Ollama is not the active provider.');
    return { ok: true };
  }

  console.log('\nMentor provider: ollama');
  console.log(`- OLLAMA_BASE_URL: ${OLLAMA_BASE_URL || 'missing'}`);
  console.log(`- OLLAMA_MODEL: ${OLLAMA_MODEL || 'missing'}`);

  if (!OLLAMA_BASE_URL || !OLLAMA_MODEL) {
    return { ok: false, reason: 'missing_ollama_env' };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Math.min(OLLAMA_REQUEST_TIMEOUT_MS, 8000));

  try {
    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      signal: controller.signal
    });
    const data = await res.json().catch(() => ({}));
    const models = Array.isArray(data?.models) ? data.models : [];
    const hasModel = models.some((item) => item?.name === OLLAMA_MODEL);

    console.log('- Ollama reachable: yes');
    console.log(`- Model available locally: ${hasModel ? 'yes' : 'no'}`);
    if (!hasModel) {
      console.log(`- Next step: run "ollama pull ${OLLAMA_MODEL}"`);
    }
    return { ok: hasModel, reason: hasModel ? null : 'missing_local_model' };
  } catch (err) {
    const message = err?.name === 'AbortError'
      ? 'timed out while reaching Ollama'
      : err?.message || 'unable to reach Ollama';
    console.log(`- Ollama reachable: no (${message})`);
    console.log('- Next step: start Ollama locally, then run this check again.');
    return { ok: false, reason: 'ollama_unreachable' };
  } finally {
    clearTimeout(timeout);
  }
}

function summarizeDatabaseUrl(url) {
  if (!url) return { host: 'missing', looksValid: false };
  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname || 'missing',
      port: parsed.port || '5432',
      looksValid: Boolean(parsed.hostname)
    };
  } catch (_) {
    return { host: 'unparseable', looksValid: false };
  }
}

async function checkDatabase() {
  const summary = summarizeDatabaseUrl(DATABASE_URL);
  console.log('\nDatabase');
  console.log(`- Host: ${summary.host}`);
  if (summary.port) console.log(`- Port: ${summary.port}`);

  if (!DATABASE_URL || !summary.looksValid) {
    console.log('- Database URL: invalid or missing');
    return { ok: false, reason: 'invalid_database_url' };
  }

  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log('- Database reachable: yes');
    return { ok: true, reason: null };
  } catch (err) {
    console.log(`- Database reachable: no (${err?.message || err})`);
    return { ok: false, reason: 'database_unreachable' };
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}

async function main() {
  console.log('Break the Cycle bot preflight');

  printGroup('Discord website connection', discordWebsiteKeys);
  printGroup('Discord bot runtime', discordBotKeys);

  const missingWebsiteKeys = discordWebsiteKeys.filter((key) => !isFilled(key));
  const missingBotKeys = discordBotKeys.filter((key) => !isFilled(key));
  const ollamaStatus = await checkOllama();
  const databaseStatus = await checkDatabase();

  const hasBlockingIssues = missingWebsiteKeys.length > 0 || missingBotKeys.length > 0 || !ollamaStatus.ok || !databaseStatus.ok;

  console.log('\nSummary');
  if (!hasBlockingIssues) {
    console.log('- Ready: Discord + mentor config looks good.');
    process.exit(0);
  }

  if (missingWebsiteKeys.length) {
    console.log(`- Missing Discord website keys: ${missingWebsiteKeys.join(', ')}`);
  }
  if (missingBotKeys.length) {
    console.log(`- Missing Discord bot keys: ${missingBotKeys.join(', ')}`);
  }
  if (!ollamaStatus.ok) {
    console.log(`- Mentor setup still needs attention: ${ollamaStatus.reason}`);
  }
  if (!databaseStatus.ok) {
    console.log(`- Database setup still needs attention: ${databaseStatus.reason}`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error('Preflight failed:', err?.message || err);
  process.exit(1);
});
