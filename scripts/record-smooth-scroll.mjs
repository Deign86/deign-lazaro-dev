import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// Smooth full-page scroll recording — mirrors how the motion video plays:
// one continuous ease-in-out descent from top to bottom, no stepped jumps,
// no scroll-back (GIF loops naturally).
const TARGET_URL = process.env.PORTFOLIO_URL || 'https://deign-lazaro-dev.vercel.app';
const ROOT_DIR = process.cwd();
const PREVIEW_DIR = path.join(ROOT_DIR, 'public', 'preview');
const SCROLL_MS = parseInt(process.env.SCROLL_MS || '14000', 10);

fs.mkdirSync(PREVIEW_DIR, { recursive: true });

const startedAt = Date.now();
console.log(`Smooth-scroll recording: ${TARGET_URL} over ${SCROLL_MS}ms`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  colorScheme: 'dark',
  reducedMotion: 'no-preference', // keep motion on — motion-heavy portfolio
  recordVideo: { dir: PREVIEW_DIR, size: { width: 1280, height: 800 } },
});
const page = await context.newPage();

await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(3500); // fonts / liquid-metal / three.js settle

// One continuous smooth descent driven by rAF with easeInOutCubic.
await page.evaluate((ms) => {
  return new Promise((resolve) => {
    const start = performance.now();
    const getMax = () => document.documentElement.scrollHeight - window.innerHeight;
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const tick = (now) => {
      const t = Math.min((now - start) / ms, 1);
      window.scrollTo(0, easeInOutCubic(t) * getMax());
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}, SCROLL_MS);

await page.waitForTimeout(1200); // hold on the bottom frame before cutting

const video = page.video();
await context.close();
await browser.close();

if (video) {
  const videoPath = await video.path();
  const finalPath = path.join(PREVIEW_DIR, 'portfolio-hero-smooth.webm');
  if (videoPath !== finalPath) fs.renameSync(videoPath, finalPath);
  const stat = fs.statSync(finalPath);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`Saved: ${path.relative(ROOT_DIR, finalPath)} (${(stat.size / 1024).toFixed(1)} KB, wall ${elapsed}s)`);
} else {
  console.log('No video object captured');
}
