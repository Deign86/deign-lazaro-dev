import fs from 'node:fs';
import path from 'node:path';
import type { CSSProperties } from 'react';
import { reel } from '@/data/alpha-premier';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// The 58-second motion reel (Claude Motion + the CC0 sound layer), played on request.
// Renders nothing until public/alpha-premier/reel/reel.mp4 exists.
export function Reel() {
  const file = path.join(process.cwd(), 'public', reel.src);
  if (!fs.existsSync(file)) return null;

  return (
    <section id="reel" className="ap-reel" aria-labelledby="ap-reel-title">
      <div className="ap-reel__head">
        <h2 id="ap-reel-title" className="ap-head" data-reveal style={i(0)}>
          {reel.heading}
        </h2>
        <p className="ap-reel__lead" data-reveal style={i(1)}>
          {reel.lead}
        </p>
      </div>
      <div className="ap-reel__frame" data-reveal style={i(2)}>
        <video
          className="ap-reel__video"
          src={reel.src}
          poster={reel.poster}
          controls
          playsInline
          preload="none"
          aria-label={reel.label}
        />
      </div>
    </section>
  );
}
