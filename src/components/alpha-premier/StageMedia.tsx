'use client';

import { useScroll } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrubFilm } from './ScrubFilm';

/** Ledger rows announce hover and focus with this window event; `detail` is an image src or null. */
export const STAGE_PREVIEW_EVENT = 'ap:stage-preview';

export function previewOnStage(src: string | null) {
  window.dispatchEvent(new CustomEvent<string | null>(STAGE_PREVIEW_EVENT, { detail: src }));
}

export type StageChapter = { id: string; floor: string; still: string; alt: string };
export type StagePreview = { image: string; alt: string };
export type StageFilm = { src: string; mobileSrc?: string };

type StageMediaProps = {
  /** In scroll order. A reading block carrying `data-chapter={id}` switches the stage to that chapter. */
  chapters: readonly StageChapter[];
  /** Right side of the bottom bar. */
  office: string;
  /** Images a ledger row can call onto the stage. */
  previews: readonly StagePreview[];
  /** Set by SplitStage only when public/alpha-premier/film/film.mp4 exists. */
  film: StageFilm | null;
};

// The reading line sits at 75% of the viewport height. The stage shows the latest chapter among the
// blocks whose top has passed it, so the last ledger group still lands before the sticky stage releases.
const READING_LINE = '0px 0px -25% 0px';
const SPLIT_STAGE = '[data-split-stage]';
/** When the stage sits beside the reading column; otherwise it is a full-width panel above it (stage.css). */
export const SPLIT_MEDIA = '(orientation: landscape) and (min-width: 560px)';
const STILL_SIZES = `${SPLIT_MEDIA} 50vw, 100vw`;
const PLATE_SIZES = `${SPLIT_MEDIA} 44vw, 1px`;

export function StageMedia({ chapters, office, previews, film }: StageMediaProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  // Preview plates mount once the reader leaves the first screen, so they load before the ledger arrives.
  const [armed, setArmed] = useState(false);

  // One observer for every [data-chapter] block in the reading column.
  useEffect(() => {
    const root = panelRef.current?.closest(SPLIT_STAGE);
    if (!root || !('IntersectionObserver' in window)) return;

    const ids = chapters.map((chapter) => chapter.id);
    const blocks = Array.from(root.querySelectorAll<HTMLElement>('[data-chapter]'));
    const inView = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = ids.indexOf((entry.target as HTMLElement).dataset.chapter ?? '');
          if (index < 0) continue;
          if (entry.isIntersecting) inView.set(entry.target, index);
          else inView.delete(entry.target);
        }
        if (inView.size === 0) return; // between blocks: hold the current chapter
        const next = Math.max(...inView.values());
        setActive(next);
        if (next > 0) setArmed(true);
      },
      { rootMargin: READING_LINE, threshold: 0 }
    );
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [chapters]);

  // Ledger hover and focus. Clearing waits a beat so moving between rows does not flash the chapter.
  useEffect(() => {
    let clearTimer: number | undefined;
    const onPreview = (event: Event) => {
      const src = (event as CustomEvent<string | null>).detail;
      window.clearTimeout(clearTimer);
      if (src) {
        setArmed(true);
        setPreview(src);
      } else {
        clearTimer = window.setTimeout(() => setPreview(null), 90);
      }
    };
    window.addEventListener(STAGE_PREVIEW_EVENT, onPreview);
    return () => {
      window.removeEventListener(STAGE_PREVIEW_EVENT, onPreview);
      window.clearTimeout(clearTimer);
    };
  }, []);

  const chapter = chapters[active] ?? chapters[0];
  const previewing = preview !== null;

  // The rail is the sticky panel's containing block: the whole reading column on desktop,
  // only the stage row and the hero sheet on a phone (a sticky grid item would hold for the whole grid).
  return (
    <div className="ap-stage__rail">
      <div ref={panelRef} className="ap-stage__media">
        <div className="ap-stage__frame">
          {/* Layers stack in scroll order and every layer up to the active one is opaque,
              so going forward fades the next still in on top and going back fades the upper ones out. */}
          {chapters.map((item, index) => (
            <div
              key={item.id}
              className="ap-stage__layer"
              data-on={index <= active || undefined}
              aria-hidden={index !== active || previewing || undefined}
            >
              <Image
                src={item.still}
                alt={item.alt}
                fill
                sizes={STILL_SIZES}
                preload={index === 0}
                draggable={false}
                className="ap-stage__still"
              />
            </div>
          ))}

          {/* ScrubFilm renders nothing under reduced motion (no poster passed), leaving the stills. */}
          {film && <FilmLayer film={film} />}

          {armed &&
            previews.map((item) => (
              <div
                key={item.image}
                className="ap-stage__preview"
                data-on={item.image === preview || undefined}
                aria-hidden="true"
              >
                <div className="ap-stage__plate">
                  <Image src={item.image} alt={item.alt} fill sizes={PLATE_SIZES} draggable={false} />
                </div>
              </div>
            ))}
        </div>

        <div className="ap-stage__bar">
          <span key={chapter.id} className="ap-stage__floor">
            {chapter.floor}
          </span>
          <span className="ap-stage__office">{office}</span>
        </div>
      </div>
    </div>
  );
}

/** The scrubbed film, driven by scroll progress over the whole split stage. Mounted only when the file exists. */
function FilmLayer({ film }: { film: StageFilm }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  // Declared before useScroll so the target is in place when its layout effect reads it.
  useLayoutEffect(() => {
    stageRef.current = layerRef.current?.closest<HTMLElement>(SPLIT_STAGE) ?? null;
  }, []);

  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start start', 'end end'] });

  // No poster: the chapter stills underneath are the poster and the fallback.
  return (
    <div ref={layerRef} className="ap-stage__film">
      <ScrubFilm src={film.src} mobileSrc={film.mobileSrc} progress={scrollYProgress} />
    </div>
  );
}
