'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import type { RecordRow } from '@/data/alpha-premier';

const WIDE = '(min-width: 768px)';
const i = (n: number) => ({ '--i': n }) as CSSProperties;

// Blueprint "Sticky photograph, active list". On a wide screen the active row (hovered, focused,
// or nearest the middle of the viewport) is in full ink, shows its description and its picture.
// On a phone, scrolling only changes the pinned picture; a row opens when it is tapped.
// State goes on data-* attributes, never className: RevealOnScroll adds .is-in to these elements.
export function RecordList({ rows }: { rows: RecordRow[] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);
  const uid = useId();
  const mediaRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const activate = (index: number, tapped = false) => {
    const wide = window.matchMedia(WIDE).matches;
    setActive(index);
    if (wide) setOpen(index);
    else if (tapped) setOpen((current) => (current === index ? -1 : index));
  };

  // Scrolling a row to the reading line makes it active. Only listens while the list is on screen.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !('IntersectionObserver' in window)) return;
    const heads = Array.from(list.querySelectorAll<HTMLElement>('[data-row-head]'));
    let frame = 0;
    let listening = false;

    const pick = () => {
      frame = 0;
      const wide = window.matchMedia(WIDE).matches;
      const band = mediaRef.current?.getBoundingClientRect();
      // the middle of the viewport; on a phone, just under the pinned picture
      const line = wide || !band ? window.innerHeight / 2 : band.bottom + 48;
      const box = list.getBoundingClientRect();
      if (box.top > line || box.bottom < line) return;
      let best = 0;
      let distance = Infinity;
      heads.forEach((head, index) => {
        const r = head.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - line);
        if (d < distance) {
          distance = d;
          best = index;
        }
      });
      setActive(best);
      if (wide) setOpen(best);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(pick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener('scroll', onScroll, { passive: true });
        listening = true;
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener('scroll', onScroll);
        listening = false;
      }
    });
    io.observe(list);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={mediaRef} className="ap-record__media" data-reveal style={i(1)}>
        {rows.map((row, index) => (
          <Image
            key={row.name}
            className="ap-record__img"
            data-on={index === active}
            src={row.image}
            alt={index === active ? row.alt : ''}
            fill
            sizes="(max-width: 767px) 100vw, 34vw"
            style={row.position ? { objectPosition: row.position } : undefined}
          />
        ))}
      </div>
      <ol ref={listRef} className="ap-record__list">
        {rows.map((row, index) => {
          const isOpen = index === open;
          const panel = `${uid}-panel-${index}`;
          return (
            <li
              key={row.name}
              className="ap-record__item"
              data-active={index === active}
              data-open={isOpen}
              data-reveal
              style={i(index + 3)}
              onPointerMove={(event) => {
                if (event.pointerType === 'mouse' && index !== active) activate(index);
              }}
            >
              <button
                type="button"
                className="ap-record__row"
                data-row-head
                aria-expanded={isOpen}
                aria-controls={panel}
                onFocus={() => activate(index)}
                onClick={() => activate(index, true)}
              >
                <span className="ap-record__name">{row.name}</span>
                <span className="ap-record__period">{row.period}</span>
              </button>
              <div id={panel} className="ap-record__panel" aria-hidden={!isOpen}>
                <div>
                  <p>{row.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
