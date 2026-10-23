'use client';

import Image from 'next/image';
import type { CSSProperties, PointerEvent } from 'react';
import type { LedgerRow } from '@/data/alpha-premier';
import { previewOnStage, SPLIT_MEDIA } from './StageMedia';

type LedgerGroup = { month: string; rows: LedgerRow[] };

type LedgerProps = {
  title: string;
  groups: LedgerGroup[];
  /** Where every row leads. */
  rowHref: string;
  /** Stage chapters this ledger walks through, top to end (for example floor, dark, lit). */
  chapters: string[];
};

/** On a phone there is no stage beside the ledger, so the first rows carry their own picture. */
const INLINE_SHOTS = 3;
// Full column width under the stage panel, capped at the ledger's 40rem measure (stage.css).
const SHOT_SIZES = `${SPLIT_MEDIA} 1px, (min-width: 704px) 640px, calc(100vw - 64px)`;

const at = (i: number) => ({ '--i': i }) as CSSProperties;

const showOnPointer = (src: string) => (event: PointerEvent<HTMLAnchorElement>) => {
  if (event.pointerType === 'mouse') previewOnStage(src);
};
const clearPreview = () => previewOnStage(null);

export function Ledger({ title, groups, rowHref, chapters }: LedgerProps) {
  const offsets = groups.map((_, g) => groups.slice(0, g).reduce((sum, group) => sum + group.rows.length, 0));
  const total = groups.reduce((sum, group) => sum + group.rows.length, 0) || 1;
  // Spread the chapters over the rows: each month takes the chapter its middle row falls in.
  const chapterOf = (g: number) => {
    const middle = offsets[g] + groups[g].rows.length / 2;
    return chapters[Math.min(chapters.length - 1, Math.floor((middle / total) * chapters.length))];
  };

  return (
    <section className="ap-ledger" aria-labelledby="ap-ledger-title">
      <h2 id="ap-ledger-title" className="ap-ledger__title" data-reveal style={at(0)} data-chapter={chapters[0]}>
        {title}
      </h2>

      {groups.map((group, g) => (
        <div key={group.month} className="ap-ledger__group" data-chapter={chapterOf(g)}>
          <p id={`ap-ledger-month-${g}`} className="ap-sr-only">
            {group.month}
          </p>
          <ul className="ap-ledger__rows" aria-labelledby={`ap-ledger-month-${g}`}>
            {group.rows.map((row, r) => (
              <li key={row.name} className="ap-ledger__item" data-reveal style={at(r + 1)}>
                {offsets[g] + r < INLINE_SHOTS && (
                  <div className="ap-ledger__shot">
                    <Image src={row.image} alt={row.alt} fill sizes={SHOT_SIZES} />
                  </div>
                )}
                <a
                  className="ap-row"
                  href={rowHref}
                  onPointerEnter={showOnPointer(row.image)}
                  onPointerLeave={clearPreview}
                  onFocus={() => previewOnStage(row.image)}
                  onBlur={clearPreview}
                >
                  <span className="ap-row__name">{row.name}</span>
                  <span className="ap-row__kind">{row.kind}</span>
                  <span className="ap-row__month">{row.month}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
