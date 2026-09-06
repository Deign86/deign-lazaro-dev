import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

// Guided slow tour: glide to each section anchor and linger ~2s on each,
// so the GIF reads as a calm walkthrough instead of a single descent.
// Legs are linear (constant velocity) — no easing whip in the middle.
const TARGET_URL = process.env.PORTFOLIO_URL || 'http://localhost:3000';
const ROOT_DIR = process.cwd();
const PREVIEW_DIR = path.join(ROOT_DIR, 'public', 'preview');
const LEG_MS = parseInt(process.env.LEG_MS || '4000', 10);
const HOLD_MS = parseInt(process.env.HOLD_MS || '1500', 10);
// Fraction-of-max-scroll stops: hero, about, resume, deployments, contact, bottom.
const STOPS = [0, 0.24, 0.42, 0.6, 0.78, 1];

fs.mkdirSync(PREVIEW_DIR, { recursive: true });

console.log(`Guided tour recording: ${TARGET_URL} (${STOPS.length} stops, ${LEG_MS}ms legs, ${HOLD_MS}ms holds)`);

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
await page.waitForTimeout(3500); // fonts / liquid-metal settle; hero hold starts here

for (let i = 1; i < STOPS.length; i++) {
  const frac = STOPS[i];
  // Linear glide from current position to the stop.
  await page.evaluate(
    ({ frac, ms }) => {
      return new Promise((resolve) => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const from = window.scrollY;
        const to = frac * max;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / ms, 1);
          window.scrollTo(0, from + (to - from) * t);
          if (t < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
    },
    { frac, ms: LEG_MS },
  );
  // Linger on the section so viewers can read it.
  await page.waitForTimeout(i === STOPS.length - 1 ? 1500 : HOLD_MS);
}

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
