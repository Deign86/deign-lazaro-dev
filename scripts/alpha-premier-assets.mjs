// Builds public/alpha-premier/* from the Alpha Premier repos checked out next to this one
// (C:\Users\APG\Downloads\<repo>) and from _intake/alpha-premier/ (internship photos).
// Every output is re-encoded with sharp, which drops EXIF/GPS metadata.
// Usage: node scripts/alpha-premier-assets.mjs [--photos-only]

import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const downloads = path.resolve(root, '..');
const out = path.join(root, 'public', 'alpha-premier');
const photosOnly = process.argv.includes('--photos-only');

const repo = (name, ...parts) => path.join(downloads, name, ...parts);

/** [source, output (relative to public/alpha-premier), max width] */
const jobs = [
  // Attendance kiosk (demo interns only)
  [repo('alpha-premier-attendance', 'docs/screenshots/kiosk.png'), 'ui/attendance-kiosk.webp', 1600],
  [repo('alpha-premier-attendance', 'docs/screenshots/kiosk-scan-success.png'), 'ui/attendance-scan.webp', 1600],
  [repo('alpha-premier-attendance', 'docs/screenshots/live-attendance.png'), 'ui/attendance-live.webp', 1600],
  [repo('alpha-premier-attendance', 'docs/screenshots/admin-payroll.png'), 'ui/attendance-payroll.webp', 1600],
  [repo('alpha-premier-attendance', 'docs/screenshots/admin-attendance.png'), 'ui/attendance-admin.webp', 1600],
  [repo('alpha-premier-attendance', 'docs/screenshots/admin-forgot-pin.png'), 'ui/attendance-pin.webp', 1600],
  [repo('alpha-premier-attendance', 'docs/screenshots/bathroom-kiosk.png'), 'ui/attendance-restroom.webp', 1600],
  // Group website
  [repo('apg-website', 'promo-video/assets/pages/home.jpg'), 'ui/website-home.webp', 1600],
  [repo('apg-website', 'promo-video/assets/pages/enterprises.jpg'), 'ui/website-enterprises.webp', 1600],
  [repo('apg-website', 'promo-video/assets/pages/realty.jpg'), 'ui/website-realty.webp', 1600],
  [repo('apg-website', 'promo-video/assets/pages/careers.jpg'), 'ui/website-careers.webp', 1600],
  [repo('apg-website', '.github/assets/screenshot-home.png'), 'ui/website-home-fold.webp', 1600],
  [repo('apg-website', '.github/assets/screenshot-admin.png'), 'ui/website-admin.webp', 1600],
  // Branding Studio
  [repo('Alpha_Branding', 'docs/assets/app-screenshot-main.png'), 'ui/branding-main.webp', 1600],
  [repo('Alpha_Branding', 'docs/assets/app-screenshot-crop-editor.png'), 'ui/branding-crop.webp', 1600],
  [repo('Alpha_Branding', 'docs/assets/app-screenshot-results.png'), 'ui/branding-results.webp', 1600],
  [repo('Alpha_Branding', 'docs/assets/app-screenshot-update-dialog.png'), 'ui/branding-update.webp', 1600],
  [repo('Alpha_Branding', 'docs/manual/images/output_01.jpg'), 'ui/branding-output-1.webp', 1400],
  [repo('Alpha_Branding', 'docs/manual/images/output_02.jpg'), 'ui/branding-output-2.webp', 1400],
  [repo('Alpha_Branding', 'docs/manual/images/output_03.jpg'), 'ui/branding-output-3.webp', 1400],
  // Brand marks (keep alpha)
  [repo('Alpha_Branding', 'assets/logo_phoenix.png'), 'brand/peacock.png', 500],
  [repo('apg-website', 'promo-video/assets/img/logo-horizontal.png'), 'brand/logo-horizontal.png', 1600],
  // Generated maquette keyframes (Google Flow, Nano Banana Pro), the film's chapter stills
  [path.join(root, '_intake/flow/k1-aerial-a.jpg'), 'stills/k1-aerial.webp', 2400],
  [path.join(root, '_intake/flow/k2-street.jpg'), 'stills/k2-street.webp', 2400],
  [path.join(root, '_intake/flow/k3-window.jpg'), 'stills/k3-window.webp', 2400],
  [path.join(root, '_intake/flow/k4-office-dark.jpg'), 'stills/k4-office-dark.webp', 2400],
  [path.join(root, '_intake/flow/k5-office-lit.jpg'), 'stills/k5-office-lit.webp', 2400],
];

async function encode(src, dest, width) {
  const target = path.join(out, dest);
  mkdirSync(path.dirname(target), { recursive: true });
  const pipeline = sharp(src).rotate().resize({ width, withoutEnlargement: true });
  if (dest.endsWith('.png')) await pipeline.png({ compressionLevel: 9 }).toFile(target);
  else await pipeline.webp({ quality: 82 }).toFile(target);
  const meta = await sharp(target).metadata();
  console.log(`${dest}  ${meta.width}×${meta.height}`);
}

if (!photosOnly) {
  for (const [src, dest, width] of jobs) {
    if (!existsSync(src)) {
      console.warn(`missing: ${src}`);
      continue;
    }
    await encode(src, dest, width);
  }
  // Social card: the lit miniature office, cropped to 1200×630
  const og = path.join(root, '_intake/flow/k5-office-lit.jpg');
  if (existsSync(og)) {
    await sharp(og).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 86, mozjpeg: true }).toFile(path.join(out, 'og.jpg'));
    console.log('og.jpg  1200×630');
  }
}

// Footer photo: the team at a birthday in the conference room. The ID card on the front
// lanyard (source pixels 240–340 × 955–1095) is blurred before encoding.
const team = path.join(root, '_intake', 'closing', 'team.jpg');
if (existsSync(team)) {
  const badge = { left: 240, top: 955, width: 100, height: 140 };
  const blurred = await sharp(team).rotate().extract(badge).blur(14).toBuffer();
  const source = await sharp(team).rotate().composite([{ input: blurred, left: badge.left, top: badge.top }]).toBuffer();
  await encode(source, 'photos/team.webp', 2400);
}

// Internship photos: _intake/alpha-premier/* → photos/photo-NN.webp (EXIF/GPS stripped)
const intake = path.join(root, '_intake', 'alpha-premier');
if (existsSync(intake)) {
  const files = readdirSync(intake).filter((f) => /\.(jpe?g|png|heic|webp)$/i.test(f)).sort();
  for (const [i, file] of files.entries()) {
    await encode(path.join(intake, file), `photos/photo-${String(i + 1).padStart(2, '0')}.webp`, 2400);
  }
  if (!files.length) console.log('no photos in _intake/alpha-premier yet');
} else {
  console.log('no _intake/alpha-premier folder yet');
}
