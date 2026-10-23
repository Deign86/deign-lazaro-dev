import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { closing, fieldPhotos, fieldPhotoStandIns, type Picture } from '@/data/alpha-premier';
import { DragRow } from './DragRow';

type Kind = 'tall' | 'pair' | 'wide';
type Module = { kind: Kind; shots: Picture[] };

// Blueprint "Drag row of mixed modules": tall 3:4, a stacked pair of 4:3, a wide 16:10, repeating.
const PATTERN: readonly Kind[] = ['tall', 'pair', 'wide', 'pair', 'tall', 'wide'];

// Frame widths follow the row's height (68svh, 62svh on a phone), so most slots are in vh; a portrait
// phone uses its vw widths and a portrait screen caps the wide frame at 88vw (closing.css).
const SIZES: Record<Kind, string> = {
  tall: '(max-width: 767px) and (orientation: portrait) 72vw, 51vh',
  pair: '(max-width: 767px) and (orientation: portrait) 64vw, 46vh',
  wide: '(orientation: portrait) 88vw, 109vh',
};

// Crops for the stand-ins, chosen by eye. Deign's own photographs use the centre.
const FOCUS: Record<string, string> = {
  '/alpha-premier/ui/attendance-kiosk.webp': '50% 40%',
  '/alpha-premier/ui/website-realty.webp': '50% 0%',
};

const i = (n: number) => ({ '--i': n }) as CSSProperties;

/** The curated gallery photographs that exist on disk (public/alpha-premier/photos/), in slot order. */
function readPhotos(): Picture[] {
  const publicDir = path.join(process.cwd(), 'public');
  return fieldPhotos.filter((photo) => fs.existsSync(path.join(publicDir, photo.src)));
}

function toModules(shots: Picture[]): Module[] {
  const modules: Module[] = [];
  let at = 0;
  for (let step = 0; at < shots.length; step++) {
    const kind = PATTERN[step % PATTERN.length];
    if (kind === 'pair' && shots.length - at >= 2) {
      modules.push({ kind, shots: shots.slice(at, at + 2) });
      at += 2;
    } else {
      modules.push({ kind: kind === 'pair' ? 'tall' : kind, shots: [shots[at]] });
      at += 1;
    }
  }
  return modules;
}

export function FieldPhotos() {
  const photos = readPhotos();
  const own = photos.length > 0;
  const shots = own ? photos : fieldPhotoStandIns;
  const modules = toModules(shots);
  const unit = own ? closing.galleryCount.photos : closing.galleryCount.standIns;

  return (
    <section id="photos" className="ap-gallery" aria-labelledby="ap-gallery-title">
      <div className="ap-gallery__head">
        <h2 id="ap-gallery-title" className="ap-head" data-reveal style={i(0)}>
          {closing.galleryHeading}
        </h2>
        <p className="ap-small ap-muted ap-nums ap-gallery__count" data-reveal style={i(1)}>
          {shots.length} {unit}
        </p>
      </div>
      <DragRow className="ap-gallery__row" label={closing.galleryLabel}>
        {modules.map((module, k) => (
          <div
            key={module.shots[0].src}
            className={`ap-gallery__module ap-gallery__module--${module.kind}`}
            data-reveal
            style={i(k < 4 ? k + 2 : 2)}
          >
            {module.shots.map((shot) => (
              <div key={shot.src} className="ap-gallery__frame">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes={SIZES[module.kind]}
                  draggable={false}
                  style={own ? undefined : { objectPosition: FOCUS[shot.src] ?? '50% 50%' }}
                />
              </div>
            ))}
          </div>
        ))}
      </DragRow>
    </section>
  );
}
