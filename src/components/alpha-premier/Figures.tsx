import Image from 'next/image';
import type { CSSProperties } from 'react';
import { closing, closingPhotos, figures } from '@/data/alpha-premier';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// Keep a number and its unit together ("15 min").
const keepUnit = (value: string) => value.replace(/(\d) (\S)/g, '$1 $2');

// Blueprint "Photograph with figure tiles": one photograph on the left two-thirds, two flat
// colour tiles stacked on the right third, touching, no gutters. Never a third tile.
export function Figures() {
  const tiles = figures.slice(0, 2);

  return (
    <section id="figures" className="ap-figures" aria-labelledby="ap-figures-title">
      <h2 id="ap-figures-title" className="ap-head ap-figures__title" data-reveal style={i(0)}>
        {closing.figuresHeading}
      </h2>
      <div className="ap-figures__mosaic">
        <div className="ap-figures__photo" data-reveal style={i(1)}>
          <Image
            src={closingPhotos.figures.src}
            alt={closingPhotos.figures.alt}
            fill
            sizes="(max-width: 767px) 100vw, 67vw"
          />
        </div>
        {tiles.map((figure, k) => (
          <div
            key={figure.value}
            className={`ap-figures__tile ${k === 0 ? 'ap-figures__tile--accent' : 'ap-figures__tile--ink'}`}
          >
            <p className="ap-figures__value ap-display ap-nums" data-reveal style={i(2 + k * 2)}>
              {keepUnit(figure.value)}
            </p>
            <p className="ap-figures__caption" data-reveal style={i(3 + k * 2)}>
              {figure.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
