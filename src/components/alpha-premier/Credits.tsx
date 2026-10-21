import type { CSSProperties } from 'react';
import { credits } from '@/data/alpha-premier';

const i = (n: number) => ({ '--i': n }) as CSSProperties;

// Permission and credits in small type under the letter, so the footer can stay the photograph alone.
export function Credits() {
  return (
    <section id="credits" className="ap-credits" aria-labelledby="ap-credits-title">
      <h2 id="ap-credits-title" className="ap-credits__title" data-reveal style={i(0)}>
        {credits.heading}
      </h2>
      <div className="ap-credits__lines ap-small ap-muted" data-reveal style={i(1)}>
        {credits.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </section>
  );
}
