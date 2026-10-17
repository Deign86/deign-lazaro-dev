// Screen-records the portfolio → company-portfolio journey as a 1080p60 MP4 with sound.
// Captures the browser's own composited frames (CDP screencast) instead of Playwright's
// low-bitrate recordVideo, then assembles them with their real timestamps via ffmpeg.
// Uses Microsoft Edge so the H.264 films and stings can play (bundled Chromium lacks the codec).
//
// Headless capture has no audio, so the page logs the moment each sound starts (the stings'
// audio, the reel when it plays) and the same files are laid onto the video at those times.
//
// Usage: node scripts/record-alpha-premier-tour.mjs [baseUrl] [outFile]
//   defaults: http://localhost:3001  C:\Users\APG\Downloads\alpha-premier-portfolio-tour.mp4
//   Record against a production build (npm run build && npm run start -- -p 3001).

import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const BASE = process.argv[2] || 'http://localhost:3001';
const OUT = process.argv[3] || path.join(os.homedir(), 'Downloads', 'alpha-premier-portfolio-tour.mp4');
const PUBLIC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const W = 1920;
const H = 1080;
const frameDir = path.join(os.tmpdir(), `ap-tour-${Date.now()}`);
mkdirSync(frameDir, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
const page = await context.newPage();

await context.addInitScript(() => {
  // A small cursor ring so the clicks read on video (recording aid only, not part of the site).
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

  // Sound log. Detached Audio() objects (the stings) are caught by wrapping play(); media in
  // the page (the reel) by capture listeners. Muted media (films, sting pictures) is ignored.
  window.__tourSound = [];
  const log = (kind, el) => {
    const src = el.currentSrc || el.src || '';
    if (el.muted || !src) return;
    const r = el.isConnected ? el.getBoundingClientRect() : null;
    window.__tourSound.push({
      kind, src, at: el.currentTime, volume: el.volume, t: Date.now(),
      rect: r && { x: r.x, y: r.y, w: r.width, h: r.height },
    });
  };
  const play = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function (...args) {
    const result = play.apply(this, args);
    if (!this.isConnected) Promise.resolve(result).then(() => log('play', this)).catch(() => {});
    return result;
  };
  document.addEventListener('playing', (e) => log('play', e.target), true);
  document.addEventListener('pause', (e) => log('pause', e.target), true);
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
  await page.mouse.move(x, y, { steps: 40 });
  await page.waitForTimeout(450);
  await page.mouse.down();
  await page.waitForTimeout(90);
  await page.mouse.up();
}

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

// --- warm both pages off camera so the films, stings, reel and lazy images are cached --------
const URL_AP = `${BASE}/alpha-premier`;
await page.goto(URL_AP, { waitUntil: 'networkidle' });
const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < fullHeight; y += H * 0.8) {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.waitForTimeout(140);
}
await page.evaluate(() =>
  Promise.all(
    ['/alpha-premier/stings/sting-in-16x9.mp4', '/alpha-premier/stings/sting-in-audio.m4a',
      '/alpha-premier/stings/sting-out-16x9.mp4', '/alpha-premier/stings/sting-out-audio.m4a',
      '/alpha-premier/reel/reel.mp4'].map((u) => fetch(u).then((r) => r.arrayBuffer()).catch(() => null))
  )
);
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

// 1. Open on the main portfolio: its hero arrives, the cursor finds the way in.
await page.goto(BASE, { waitUntil: 'domcontentloaded' });
await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 80, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
await page.waitForLoadState('networkidle');
await page.mouse.move(W * 0.5, H * 0.32);
await page.waitForTimeout(3200);
await hover(page.locator('nav a[href="/alpha-premier"]').first(), 1400);

// 2. "Lights on": the hero card plays the sting, and the company portfolio arrives under it.
await moveAndClick(page.locator('a[href="/alpha-premier"]').filter({ hasText: 'company portfolio' }).first());
await page.waitForURL('**/alpha-premier', { timeout: 10000 });
await page.waitForFunction(() => document.querySelector('.sting')?.dataset.phase === 'idle', null, { timeout: 10000 });
await page.mouse.move(W * 0.62, H * 0.55, { steps: 20 });
await page.waitForTimeout(3200);

// 3. A slow, even scroll scrubs the maquette film: Ortigas at night, street level, up the
//    facade, through the 31st-floor window into the dark office.
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

// 8. The reel, with its sound: from the build into the lights-on hit, through the first system.
const reelTop = await topOf('#reel', H * 0.04);
if (reelTop !== null) {
  await smoothScroll(reelTop, 2800);
  await page.waitForTimeout(1500);
  const reel = page.locator('#reel video');
  await reel.evaluate((v) => new Promise((resolve) => {
    v.preload = 'auto';
    v.addEventListener('seeked', resolve, { once: true });
    v.currentTime = 5.5;
  })).catch(() => {});
  await page.waitForTimeout(800);
  await moveAndClick(reel);
  await page.waitForTimeout(400);
  if (await reel.evaluate((v) => v.paused)) await reel.evaluate((v) => v.play());
  await page.mouse.move(W - 30, H * 0.62, { steps: 18 });
  await page.waitForTimeout(11800);
  await reel.evaluate((v) => v.pause());
  await page.waitForTimeout(600);
}

// 9. The thank-you letter, held long enough to read.
await smoothScroll((await topOf('#thanks', H * 0.02)) ?? 0, 3000);
await page.waitForTimeout(5500);

// 10. The footer: the name across the team photo.
const bottom = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
await smoothScroll(bottom, 3400);
await page.waitForTimeout(3500);

// 11. "Lights off": back to the main portfolio through the outgoing sting.
await moveAndClick(page.locator('footer#contact').getByRole('link', { name: 'Portfolio' }));
await page.waitForURL((url) => !url.pathname.startsWith('/alpha-premier'), { timeout: 10000 });
await page.waitForFunction(() => document.querySelector('.sting')?.dataset.phase === 'idle', null, { timeout: 10000 });
await page.mouse.move(W * 0.5, H * 0.32, { steps: 20 });
await page.waitForTimeout(3000);

const sounds = await page.evaluate(() => window.__tourSound);
await cdp.send('Page.stopScreencast');
await page.waitForTimeout(300);
await browser.close();

// --- assemble: variable-rate frames → constant 60 fps H.264 ----------------------------------
await Promise.all(writes);
if (frames.length < 2) throw new Error('no frames captured');
const t0 = frames[0].ts;
const list = frames
  .map((f, k) => {
    const next = frames[k + 1];
    const dur = next ? Math.max(0.001, next.ts - f.ts) : 0.5;
    return `file '${f.file.replace(/\\/g, '/')}'\nduration ${dur.toFixed(4)}`;
  })
  .join('\n');
const listFile = path.join(frameDir, 'frames.txt');
writeFileSync(listFile, `ffconcat version 1.0\n${list}\nfile '${frames.at(-1).file.replace(/\\/g, '/')}'\n`);
const silentVideo = path.join(frameDir, 'video.mp4');
execFileSync('ffmpeg', [
  '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', listFile,
  '-vf', `scale=${W}:${H}:flags=lanczos,fps=60,format=yuv420p`,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-movflags', '+faststart', silentVideo,
], { stdio: 'inherit' });
const seconds = frames.at(-1).ts - t0 + 0.5;

// --- sound: each logged play becomes a clip at its moment, until its pause (or its end) -------
// The page clock and the captured frames drift apart by up to half a second, differently for
// each source, so every clip is placed where its picture actually shows in the recording: the
// picture's brightness curve (the sting's video for a sting's audio, the reel for the reel) is
// matched against the recorded frames within a few seconds of the logged moment.
const LUMA_W = 64;
const LUMA_H = 36;
function luma(file, start, dur, crop) {
  const vf = `${crop ? `crop=${crop},` : ''}fps=60,scale=${LUMA_W}:${LUMA_H},format=gray`;
  const raw = execFileSync('ffmpeg', ['-v', 'error', '-ss', String(Math.max(0, start)), '-t', String(dur), '-i', file,
    '-vf', vf, '-f', 'rawvideo', '-'], { maxBuffer: 1 << 28 });
  const px = LUMA_W * LUMA_H;
  return Array.from({ length: Math.floor(raw.length / px) }, (_, k) => {
    let sum = 0;
    for (let i = k * px; i < (k + 1) * px; i++) sum += raw[i];
    return sum / px;
  });
}
function bestLag(a, b) {
  const mean = (v) => v.reduce((s, x) => s + x, 0) / v.length;
  const ma = mean(a);
  let best = { lag: 0, r: -1 };
  for (let lag = 0; lag + a.length <= b.length; lag++) {
    const seg = b.slice(lag, lag + a.length);
    const mb = mean(seg);
    let num = 0, da = 0, db = 0;
    for (let i = 0; i < a.length; i++) {
      num += (a[i] - ma) * (seg[i] - mb);
      da += (a[i] - ma) ** 2;
      db += (seg[i] - mb) ** 2;
    }
    const r = num / (Math.sqrt(da * db) || 1);
    if (r > best.r) best = { lag, r };
  }
  return best;
}
function placeByPicture(clip, picture, rect) {
  const span = Math.min(6, clip.duration ?? 6);
  const reach = 1.5;
  const crop = rect && `${Math.round(rect.w)}:${Math.round(Math.min(rect.h, H - rect.y))}:${Math.round(rect.x)}:${Math.round(Math.max(0, rect.y))}`;
  const source = luma(picture, clip.from, span, rect && `iw:ih*${(Math.min(rect.h, H - rect.y) / rect.h).toFixed(4)}:0:${(Math.max(0, -rect.y) / rect.h).toFixed(4)}*ih`);
  const windowStart = Math.max(0, clip.start - reach);
  const recorded = luma(silentVideo, windowStart, span + 2 * reach, crop);
  const { lag, r } = bestLag(source, recorded);
  if (r >= 0.8) {
    clip.shift = windowStart + lag / 60 - clip.start;
    clip.start += clip.shift;
  }
  clip.match = r;
}

const clips = [];
const playing = new Set(); // a 'playing' after a buffering stall is not a new start
for (const [k, s] of sounds.entries()) {
  if (s.kind === 'pause') playing.delete(s.src);
  if (s.kind !== 'play' || playing.has(s.src)) continue;
  const stop = sounds.slice(k + 1).find((e) => e.kind === 'pause' && e.src === s.src);
  if (stop) playing.add(s.src);
  const file = path.join(PUBLIC, decodeURIComponent(new URL(s.src).pathname));
  const clip = {
    file, from: s.at, start: s.t / 1000 - t0, volume: s.volume,
    duration: stop ? Math.max(0, stop.at - s.at) : null, label: path.basename(file), shift: 0, match: null,
  };
  // A sting's sound is a separate file; its picture is the sting video shown full screen.
  const picture = /-audio\.m4a$/.test(file) ? file.replace(/-audio\.m4a$/, '-16x9.mp4') : file;
  placeByPicture(clip, picture, s.rect);
  clips.push(clip);
}
const inputs = ['-i', silentVideo];
const chains = [];
clips.forEach((c, k) => {
  inputs.push('-i', c.file);
  const trim = c.duration !== null ? `atrim=start=${c.from.toFixed(3)}:duration=${c.duration.toFixed(3)}` : `atrim=start=${c.from.toFixed(3)}`;
  const delay = Math.max(0, Math.round(c.start * 1000));
  chains.push(`[${k + 1}:a]aresample=48000,aformat=channel_layouts=stereo,${trim},asetpts=PTS-STARTPTS,volume=${c.volume.toFixed(2)},adelay=${delay}|${delay}[s${k}]`);
});
if (clips.length) {
  const mix = `${chains.join(';')};${clips.map((_, k) => `[s${k}]`).join('')}amix=inputs=${clips.length}:normalize=0:dropout_transition=0,apad[a]`;
  execFileSync('ffmpeg', [
    '-v', 'error', '-y', ...inputs, '-filter_complex', mix, '-map', '0:v', '-map', '[a]',
    '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', seconds.toFixed(3), '-movflags', '+faststart', OUT,
  ], { stdio: 'inherit' });
} else {
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silentVideo, '-c', 'copy', OUT], { stdio: 'inherit' });
}

for (const c of clips) {
  const placed = c.match === null ? '' : c.match >= 0.8 ? `, placed by picture ${c.shift >= 0 ? '+' : ''}${c.shift.toFixed(3)} s, r=${c.match.toFixed(3)}` : `, picture match too weak (r=${c.match.toFixed(3)}), kept at the logged time`;
  console.log(`  sound ${c.label} at ${c.start.toFixed(2)} s (from ${c.from.toFixed(2)} s${c.duration !== null ? `, ${c.duration.toFixed(2)} s long` : ''}, volume ${c.volume}${placed})`);
}
console.log(`Saved ${OUT} (${frames.length} frames over ${seconds.toFixed(1)} s, captured ~${(frames.length / seconds).toFixed(1)} fps, encoded 1920x1080 @ 60 fps)`);
rmSync(frameDir, { recursive: true, force: true });
