import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SITES = [
  { id: 'mathpulse-ai', url: 'https://mathpulse-ai-2026.web.app/' },
  { id: 'v-serve-arta-feedback-analytics', url: 'https://v-serve-arta-feedback.vercel.app' },
  { id: 'gamecon-system', url: 'https://playverse-ops.vercel.app' },
  { id: 'digital-classroom-assignment', url: 'https://digital-classroom-reservation-for-plv.vercel.app' },
  { id: 'zhi-wei-zai', url: 'https://zhi-wei-zai.vercel.app' },
  { id: 'apg-website', url: 'https://apg-website-alpha-gamma.vercel.app' },
];

const root = process.cwd();
const videoDir = path.join(root, 'public', 'preview', 'systems');
const shotDir = path.join(root, 'public', 'screenshots', 'projects');
const tmpDir = path.join(root, '.tmp-record');
fs.mkdirSync(videoDir, { recursive: true });
fs.mkdirSync(shotDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const results = [];
const browser = await chromium.launch({ headless: true });

for (const site of SITES) {
  const entry = { id: site.id, url: site.url, status: 'captured', reason: '' };
  let context = null;
  try {
    context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      recordVideo: { dir: tmpDir, size: { width: 1280, height: 800 } },
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();
    try {
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
    } catch (e) {
      entry.reason = `goto non-fatal: ${String(e).split('\n')[0]}`;
      // fall through to still capture
    }
    await page.waitForTimeout(3000); // hydration
    // gentle scroll to show liveliness for video
    try {
      await page.evaluate(async () => {
        window.scrollTo({ top: 0 });
        await new Promise(r => setTimeout(r, 800));
        const h = Math.min(document.body.scrollHeight - 800, 1200);
        if (h > 0) window.scrollTo({ top: h / 2, behavior: 'smooth' });
      });
      await page.waitForTimeout(2500);
      await page.evaluate(() => window.scrollTo({ top: 0 }));
      await page.waitForTimeout(1500);
    } catch { /* static pages fine */ }
    const title = await page.title().catch(() => '');
    entry.title = title;
    const shotPath = path.join(shotDir, `${site.id}.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    entry.screenshot = shotPath;
    const video = page.video();
    const tmpVideoPath = video ? await video.path().catch(() => null) : null;
    await context.close();
    context = null;
    const dest = path.join(videoDir, `${site.id}.webm`);
    if (tmpVideoPath && fs.existsSync(tmpVideoPath)) {
      fs.copyFileSync(tmpVideoPath, dest);
      try { fs.unlinkSync(tmpVideoPath); } catch {}
      const size = fs.statSync(dest).size;
      entry.video = dest;
      entry.videoBytes = size;
      if (size < 5000) {
        entry.status = 'screenshot-fallback';
        entry.reason += (entry.reason ? ' | ' : '') + 'video file suspiciously small';
      }
    } else {
      entry.status = 'screenshot-fallback';
      entry.reason += (entry.reason ? ' | ' : '') + 'no video file produced';
    }
    // detect auth wall / blank
    const bodyText = await (async () => {
      try {
        const b2 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
        const p2 = await b2.newPage();
        await p2.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
        await p2.waitForTimeout(2000);
        const t = await p2.evaluate(() => document.body?.innerText?.slice(0, 500) ?? '');
        await b2.close();
        return t;
      } catch { return ''; }
    })();
    if (/recaptcha|sign in to continue|log in|verify you are human/i.test(bodyText || '') && bodyText.length < 600) {
      entry.status = 'screenshot-fallback';
      entry.reason += (entry.reason ? ' | ' : '') + 'possible auth/bot wall detected';
    }
  } catch (e) {
    entry.status = 'blocked';
    entry.reason = String(e).split('\n')[0];
    try { if (context) await context.close(); context = null; } catch {}
    // last-resort plain screenshot without video
    try {
      const c2 = await browser.newContext({ viewport: { width: 1280, height: 800 } });
      const p2 = await c2.newPage();
      await p2.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(() => {});
      await p2.waitForTimeout(3000);
      const shotPath = path.join(shotDir, `${site.id}.png`);
      await p2.screenshot({ path: shotPath });
      entry.screenshot = shotPath;
      entry.status = 'screenshot-fallback';
      await c2.close();
    } catch {}
  }
  results.push(entry);
  console.log(JSON.stringify(entry));
}

await browser.close();
fs.writeFileSync(path.join(tmpDir, 'results.json'), JSON.stringify(results, null, 2));
console.log('DONE');
