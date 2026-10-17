import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Fragment, type CSSProperties } from 'react';
import { TransitionLink } from '@/components/transition/TransitionLink';
import { before, company, hero, ledger, stage, stageCopy, stageMidpoint, stageStills } from '@/data/alpha-premier';
import { Ledger } from './Ledger';
import { StageMedia, type StageChapter, type StageFilm, type StagePreview } from './StageMedia';

// The split stage: the reading column (hero sheet, the "before" paragraphs, the ledger) scrolls on the
// left while the right half stays put and changes chapter with the block being read.
// Reading block to stage chapter: hero → arrival, intro → climb, ledger top → floor,
// ledger middle → dark (only when its still exists), ledger end → lit.

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const inPublic = (src: string) => fs.existsSync(path.join(PUBLIC_DIR, src));

const FILM = '/alpha-premier/film/film.mp4';
const FILM_MOBILE = '/alpha-premier/film/film-mobile.mp4';

/** The film is optional: without public/alpha-premier/film/film.mp4 the stage crossfades its stills only. */
function findFilm(): StageFilm | null {
  if (!inPublic(FILM)) return null;
  return { src: FILM, mobileSrc: inPublic(FILM_MOBILE) ? FILM_MOBILE : undefined };
}

/** The maquette keyframes where they exist, the found photographs where they do not. */
function findChapters(): StageChapter[] {
  const chapters: StageChapter[] = stage.map((chapter) => {
    const still = stageStills[chapter.id];
    return still && inPublic(still.src) ? { ...chapter, still: still.src, alt: still.alt } : { ...chapter };
  });
  if (inPublic(stageMidpoint.still)) {
    const lit = chapters.findIndex((chapter) => chapter.id === 'lit');
    chapters.splice(lit < 0 ? chapters.length : lit, 0, { ...stageMidpoint });
  }
  return chapters;
}

const at = (i: number) => ({ '--i': i }) as CSSProperties;

export function SplitStage() {
  const film = findFilm();
  const chapters = findChapters();
  const ids = chapters.map((chapter) => chapter.id);
  // The ledger runs from the floor chapter to the end of the stage.
  const ledgerChapters = ids.slice(Math.max(0, ids.indexOf('floor')));
  const previews: StagePreview[] = Array.from(
    new Map(ledger.flatMap((group) => group.rows).map((row) => [row.image, { image: row.image, alt: row.alt }])).values()
  );

  return (
    <div className="ap-stage" data-split-stage>
      <div className="ap-stage__read">
        <header className="ap-hero" data-chapter="arrival">
          <nav className="ap-hero__top" aria-label="Site">
            <TransitionLink href={stageCopy.portfolio.href} direction="out" className="ap-hero__link">
              {stageCopy.portfolio.label}
            </TransitionLink>
            <p className="ap-wordmark">
              <Image src="/alpha-premier/brand/peacock.png" alt="" width={40} height={40} loading="eager" />
              <span>{stageCopy.wordmark}</span>
            </p>
            <a href={stageCopy.contact.href} className="ap-hero__link">
              {stageCopy.contact.label}
            </a>
          </nav>

          <div className="ap-hero__body">
            <h1 className="ap-hero__title">
              {hero.headline.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 && <br />}
                  <span className="ap-hero__line" data-rise style={at(i)}>
                    {line}
                  </span>
                </Fragment>
              ))}
            </h1>
            <p className="ap-hero__sentence" data-rise style={at(hero.headline.length)}>
              {hero.sentence}
            </p>
            <div className="ap-hero__action" data-rise style={at(hero.headline.length + 1)}>
              <a className="ap-button" href={hero.action.href}>
                {hero.action.label}
              </a>
            </div>
          </div>
        </header>

        <section className="ap-before" aria-labelledby="ap-before-title" data-chapter="climb">
          <h2 id="ap-before-title" className="ap-sr-only">
            {stageCopy.beforeHeading}
          </h2>
          <div className="ap-before__column">
            {before.map((paragraph, i) => (
              <p key={i} data-reveal style={at(i)}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <Ledger title={stageCopy.ledgerHeading} groups={ledger} rowHref={hero.action.href} chapters={ledgerChapters} />
      </div>

      <StageMedia chapters={chapters} office={company.office} previews={previews} film={film} />
    </div>
  );
}
