// Screen-records the portfolio → company-portfolio journey as a 1080p MP4.
// Captures the browser's own composited frames (CDP screencast) instead of Playwright's
// low-bitrate recordVideo, then assembles them with their real timestamps via ffmpeg.
// Uses Microsoft Edge so the H.264 stage film can play (bundled Chromium lacks the codec).
//
// Usage: node scripts/record-alpha-premier-tour.mjs [baseUrl] [outFile]
//   defaults: http://localhost:3001  C:\Users\APG\Downloads\alpha-premier-tour.mp4

import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3001';
const OUT = process.argv[3] || path.join(os.homedir(), 'Downloads', 'alpha-premier-tour.mp4');
const W = 1920;
const H = 1080;
const frameDir = path.join(os.tmpdir(), `ap-tour-${Date.now()}`);
mkdirSync(frameDir, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
const page = await context.newPage();

// A small cursor ring so the clicks read on video (recording aid only, not part of the site).
await context.addInitScript(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const dot = document.createElement('div');
    dot.id = '__tour-cursor';
    Object.assign(dot.style, {
      position: 'fixed', left: '0', top: '0', width: '22px', height: '22px', marginLeft: '-11px', marginTop: '-11px',
      borderRadius: '50%', border: '2px solid rgba(197,160,89,0.95)', background: 'rgba(197,160,89,0.18)',
      zIndex: '2147483647', pointerEvents: 'none', transition: 'transform 120ms ease', transform: 'translate(-100px,-100px)',
    });
    document.documentElement.appendChild(dot);
    addEventListener('mousemove', (e) => { dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; }, true);
    addEventListener('mousedown', () => { dot.style.scale = '0.75'; }, true);
    addEventListener('mouseup', () => { dot.style.scale = '1'; }, true);
  });
});

// --- frame capture -------------------------------------------------------------------------
const cdp = await context.newCDPSession(page);
const frames = []; // { file, ts }
const writes = [];
cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
  // Ack first so the browser can paint the next frame while this one is written.
  cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  const file = path.join(frameDir, `f${String(frames.length).padStart(6, '0')}.jpg`);
  frames.push({ file, ts: metadata.timestamp });
  writes.push(writeFile(file, Buffer.from(data, 'base64')).catch(() => {}));
});

const smoothScroll = (to, ms) =>
  page.evaluate(
    ([target, duration]) =>
      new Promise((resolve) => {
        const from = window.scrollY;
        const start = performance.now();
        const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          window.scrollTo(0, from + (target - from) * ease(t));
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      }),
    [to, ms]
  );

const linearScroll = (to, ms) =>
  page.evaluate(
    ([target, duration]) =>
      new Promise((resolve) => {
        const from = window.scrollY;
        const start = performance.now();
        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          window.scrollTo(0, from + (target - from) * t);
          if (t < 1) requestAnimationFrame(step);
          else resolve();
        };
        requestAnimationFrame(step);
      }),
    [to, ms]
  );

async function moveAndClick(locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error('target not visible');
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(W * 0.62, H * 0.55);
  await page.mouse.move(x, y, { steps: 40 });
  await page.waitForTimeout(450);
  await page.mouse.down();
  await page.waitForTimeout(90);
  await page.mouse.up();
}

// --- warm the page off camera so the film and every lazy image are cached ------------------
const URL_AP = `${BASE}/alpha-premier`;
await page.goto(URL_AP, { waitUntil: 'networkidle' });
const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < fullHeight; y += H * 0.8) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(140);
}
await page.waitForLoadState('networkidle');

// 1. Open on the company portfolio: the hero's entrance plays as the page arrives.
await page.goto(URL_AP, { waitUntil: 'domcontentloaded' });
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 80, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
await page.waitForLoadState('networkidle');
await page.waitForTimeout(3600);

const topOf = (selector, offset = 0) =>
  page.evaluate(
    ([sel, off]) => {
      const el = document.querySelector(sel);
      return el ? Math.max(0, el.getBoundingClientRect().top + scrollY - off) : null;
    },
    [selector, offset]
  );

async function hover(locator, hold) {
  const box = await locator.boundingBox().catch(() => null);
  if (!box) return;
  await page.mouse.move(box.x + Math.min(box.width * 0.3, 160), box.y + box.height / 2, { steps: 24 });
  await page.waitForTimeout(hold);
}

async function clickIfVisible(locator, hold) {
  if (await locator.isVisible().catch(() => false)) {
    await moveAndClick(locator);
    await page.waitForTimeout(hold);
  }
}

// 3. The hero settles, then a slow, even scroll scrubs the maquette film: Ortigas at night,
//    street level, up the facade, through the 31st-floor window into the dark office.
await page.waitForTimeout(1200);
const ledgerTop = await topOf('.ap-ledger', H * 0.12);
await linearScroll(ledgerTop ?? 0, 22000);
await page.waitForTimeout(1200);

// 3b. The ledger: hovering a row swaps the stage to that system's real screen.
for (const name of ['Group website', 'Attendance kiosk', 'Branding Studio', 'Live listings', 'Viber MCP']) {
  await hover(page.locator('.ap-ledger__item a').filter({ hasText: name }).first(), 1500);
}
await page.mouse.move(W - 30, H * 0.5, { steps: 18 });
await page.waitForTimeout(1600);

// 3c. Finish the climb: the room's lights come on as the ledger completes.
const stageEnd = await page.evaluate(() => {
  const el = document.querySelector('.ap-stage');
  return el ? el.offsetTop + el.offsetHeight - innerHeight : 0;
});
await linearScroll(stageEnd, 6500);
await page.waitForTimeout(2200);

// 4. The four systems. The live kiosk: tap in, then tap again inside 10 s to show the guard.
await smoothScroll((await topOf('#systems')) ?? stageEnd + H, 2600);
await page.waitForTimeout(1400);
const card = page.locator('.ap-kiosk-card');
await clickIfVisible(card, 3000);
await clickIfVisible(card, 2600);
// …then each listing sheet in turn; the Viber tab plays its automation.
for (const [tab, hold] of [['Website', 2600], ['Branding', 2600], ['Viber', 5200], ['Attendance', 1600]]) {
  await clickIfVisible(page.getByRole('tab', { name: tab }), hold);
}
await page.mouse.move(W - 30, H * 0.5, { steps: 18 });

// 5. The 31st floor: the photo row, dragged sideways by hand.
await smoothScroll((await topOf('#photos', H * 0.08)) ?? 0, 2800);
await page.waitForTimeout(1600);
const row = page.locator('.ap-gallery__row');
const rowBox = await row.boundingBox().catch(() => null);
if (rowBox) {
  for (const distance of [W * 0.55, W * 0.55, -W * 0.35]) {
    const y = rowBox.y + rowBox.height * 0.5;
    const x = distance > 0 ? W * 0.78 : W * 0.3;
    await page.mouse.move(x, y, { steps: 14 });
    await page.mouse.down();
    await page.mouse.move(x - distance, y, { steps: 70 });
    await page.mouse.up();
    await page.waitForTimeout(1300);
  }
}

// 6. What changed.
await smoothScroll((await topOf('#figures', H * 0.06)) ?? 0, 2600);
await page.waitForTimeout(3000);

// 7. The internship record: open a few rows; the photograph follows the active row.
await smoothScroll((await topOf('#record', H * 0.04)) ?? 0, 2600);
await page.waitForTimeout(2200);
for (const name of ['IT administration', 'Network and printers', 'Attendance and payroll', 'Viber MCP', 'Leading the IT interns']) {
  const rowButton = page.locator('#record button[aria-expanded]').filter({ hasText: name }).first();
  await rowButton.scrollIntoViewIfNeeded().catch(() => {});
  await clickIfVisible(rowButton, 2100);
}
await page.mouse.move(W - 30, H * 0.5, { steps: 18 });

// 8. The thank-you letter, held long enough to read.
await smoothScroll((await topOf('#thanks', H * 0.02)) ?? 0, 3000);
await page.waitForTimeout(5500);

// 9. The footer: the name across Ortigas at night.
const bottom = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
await smoothScroll(bottom, 3400);
await page.waitForTimeout(4500);

await cdp.send('Page.stopScreencast');
await page.waitForTimeout(300);
await browser.close();

// --- assemble: variable-rate frames → constant 60 fps H.264 ----------------------------------
await Promise.all(writes);
if (frames.length < 2) throw new Error('no frames captured');
const list = frames
  .map((f, k) => {
    const next = frames[k + 1];
    const dur = next ? Math.max(0.001, next.ts - f.ts) : 0.5;
    return `file '${f.file.replace(/\\/g, '/')}'\nduration ${dur.toFixed(4)}`;
  })
  .join('\n');
const listFile = path.join(frameDir, 'frames.txt');
writeFileSync(listFile, `ffconcat version 1.0\n${list}\nfile '${frames.at(-1).file.replace(/\\/g, '/')}'\n`);

execFileSync('ffmpeg', [
  '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', listFile,
  '-vf', `scale=${W}:${H}:flags=lanczos,fps=60,format=yuv420p`,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-movflags', '+faststart', OUT,
], { stdio: 'inherit' });

const seconds = frames.at(-1).ts - frames[0].ts;
console.log(`Saved ${OUT} (${frames.length} frames over ${seconds.toFixed(1)} s, captured ~${(frames.length / seconds).toFixed(1)} fps, encoded 1920x1080 @ 60 fps)`);
rmSync(frameDir, { recursive: true, force: true });
