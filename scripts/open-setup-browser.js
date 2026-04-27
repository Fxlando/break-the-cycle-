const os = require('os');
const path = require('path');
const { chromium } = require('playwright');

const PROFILE_ROOT = path.join(os.homedir(), 'AppData', 'Local', 'BreakTheCycleAutomation', 'playwright-profile');
const START_URLS = [
  'https://supabase.com/dashboard/projects',
  'https://vercel.com/dashboard'
];

async function ensurePages(context) {
  const pages = context.pages();
  const existingUrls = new Set(pages.map((page) => page.url()));

  if (!pages.length) {
    const page = await context.newPage();
    await page.goto(START_URLS[0], { waitUntil: 'domcontentloaded' }).catch(() => {});
    existingUrls.add(page.url());
  }

  for (const url of START_URLS) {
    if (Array.from(existingUrls).some((current) => current.startsWith(url))) continue;
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
  }
}

async function main() {
  const context = await chromium.launchPersistentContext(PROFILE_ROOT, {
    headless: false,
    viewport: { width: 1440, height: 960 }
  });

  await ensurePages(context);

  console.log('Break the Cycle setup browser is open.');
  console.log(`Profile dir: ${PROFILE_ROOT}`);
  console.log('Log into Supabase and Vercel in this browser, then come back here.');

  const shutdown = async () => {
    await context.close().catch(() => {});
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  await new Promise(() => {});
}

main().catch((err) => {
  console.error('Failed to open setup browser:', err?.message || err);
  process.exit(1);
});
