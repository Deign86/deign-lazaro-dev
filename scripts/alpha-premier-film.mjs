// Joins the four Google Flow (Veo 3.1) legs into the scroll-scrubbed stage film.
// Each leg was rendered frames-to-video from keyframe N to keyframe N+1, so leg N ends close to
// where leg N+1 begins; a 0.25 s crossfade at each seam hides the small difference.
// Output: public/alpha-premier/film/film.mp4 (1080p, desktop) and film-mobile.mp4 (720p),
// silent, small GOP for smooth seeking, faststart.
// Usage: node scripts/alpha-premier-film.mjs

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const intake = path.join(root, '_intake', 'flow');
const out = path.join(root, 'public', 'alpha-premier', 'film');
const FADE = 0.25;

const legs = [1, 2, 3, 4].map((n) => {
  const hi = path.join(intake, `leg-${n}-1080.mp4`);
  const lo = path.join(intake, `leg-${n}-720.mp4`);
  if (existsSync(hi)) return hi;
  if (existsSync(lo)) return lo;
  throw new Error(`missing leg ${n}: put leg-${n}-1080.mp4 or leg-${n}-720.mp4 in _intake/flow`);
});

const duration = (file) =>
  Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString().trim());

// Build the xfade chain: [0][1]xfade → [a1]; [a1][2]xfade → [a2]; …
let filter = legs.map((_, k) => `[${k}:v]scale=1920:1080:flags=lanczos,setsar=1,fps=24,format=yuv420p[v${k}]`).join(';');
let last = 'v0';
let offset = 0;
for (let k = 1; k < legs.length; k++) {
  offset += duration(legs[k - 1]) - FADE;
  const label = k === legs.length - 1 ? 'film' : `x${k}`;
  filter += `;[${last}][v${k}]xfade=transition=fade:duration=${FADE}:offset=${offset.toFixed(3)}[${label}]`;
  last = label;
}

mkdirSync(out, { recursive: true });
const inputs = legs.flatMap((file) => ['-i', file]);
const encode = (vf, gop, crf, file) =>
  execFileSync('ffmpeg', [
    '-v', 'error', '-y', ...inputs,
    '-filter_complex', `${filter};[film]${vf}[outv]`,
    '-map', '[outv]', '-an',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-pix_fmt', 'yuv420p',
    '-g', String(gop), '-keyint_min', String(gop), '-sc_threshold', '0', '-movflags', '+faststart',
    path.join(out, file),
  ], { stdio: 'inherit' });

encode('unsharp=5:5:0.5:5:5:0.0', 12, 24, 'film.mp4');
encode('scale=960:-2:flags=lanczos', 6, 27, 'film-mobile.mp4');

// Posters: first frame of each leg (also the reel's keyframe references)
legs.forEach((file, k) => {
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', file, '-frames:v', '1', '-vf', 'scale=1920:-2', path.join(out, `leg-${k + 1}.webp`)]);
});

console.log(`film.mp4 + film-mobile.mp4 written (${legs.length} legs, ${(offset + duration(legs.at(-1))).toFixed(2)} s)`);
