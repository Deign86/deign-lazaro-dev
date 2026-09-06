import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const TARGET_URL = process.env.PORTFOLIO_URL || 'https://deign-lazaro-dev.vercel.app';
const ROOT_DIR = process.cwd();
const PREVIEW_DIR = path.join(ROOT_DIR, 'public', 'preview');

fs.mkdirSync(PREVIEW_DIR, { recursive: true });

const startedAt = Date.now();
console.log(`Recording portfolio preview: ${TARGET_URL}`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 1,
  colorScheme: 'dark',
  reducedMotion: 'no-preference', // keep motion on — this is a motion-heavy portfolio
  recordVideo: { dir: PREVIEW_DIR, size: { width: 1280, height: 800 } },
});
const page = await context.newPage();

await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
await page.waitForTimeout(3000); // fonts / three.js shaders settle

// Slow scroll hero -> projects over ~8s to capture motion
const steps = 26;
for (let i = 0; i < steps; i++) {
  await page.evaluate(() => window.scrollBy(0, 160));
  await page.waitForTimeout(300);
}
await page.waitForTimeout(800);
// Scroll back to top for a clean loop point
await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
await page.waitForTimeout(1200);

const video = page.video();
await context.close();
await browser.close();

if (video) {
  const videoPath = await video.path();
  const finalPath = path.join(PREVIEW_DIR, 'portfolio-hero.webm');
  if (videoPath !== finalPath) {
    fs.renameSync(videoPath, finalPath);
  }
  const stat = fs.statSync(finalPath);
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`Saved: ${path.relative(ROOT_DIR, finalPath)} (${(stat.size / 1024).toFixed(1)} KB, wall ${elapsed}s)`);
} else {
  console.log('No video object captured');
}
