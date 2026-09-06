import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// Slow LINEAR full-page descent — constant velocity so no fast middle.
// 30s top-to-bottom reads as a calm tour instead of a whip.
const TARGET_URL = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const ROOT_DIR = process.cwd();
const PREVIEW_DIR = path.join(ROOT_DIR, 'public', 'preview');
const SCROLL_MS = parseInt(process.env.SCROLL_MS || '30000', 10);

fs.mkdirSync(PREVIEW_DIR, { recursive: true });

console.log(`Slow-scroll recording: ${TARGET_URL} over ${SCROLL_MS}ms (linear)`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  colorScheme: 'dark',
  reducedMotion: 'no-preference',
  recordVideo: { dir: PREVIEW_DIR, size: { width: 1280, height: 800 } },
});
const page = await context.newPage();

await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(3500);

// Linear descent: constant px/sec, no easing spike in the middle.
await page.evaluate((ms) => {
  return new Promise((resolve) => {
    const start = performance.now();
    const getMax = () => document.documentElement.scrollHeight - window.innerHeight;
    const tick = (now) => {
      const t = Math.min((now - start) / ms, 1);
      window.scrollTo(0, t * getMax());
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}, SCROLL_MS);

await page.waitForTimeout(1500);

const video = page.video();
await context.close();
await browser.close();

if (video) {
  const videoPath = await video.path();
  const finalPath = path.join(PREVIEW_DIR, 'portfolio-hero-smooth.webm');
  if (videoPath !== finalPath) fs.renameSync(videoPath, finalPath);
  const stat = fs.statSync(finalPath);
  console.log(`Saved: ${path.relative(ROOT_DIR, finalPath)} (${(stat.size / 1024).toFixed(1)} KB)`);
} else {
  console.log('No video object captured');
}
