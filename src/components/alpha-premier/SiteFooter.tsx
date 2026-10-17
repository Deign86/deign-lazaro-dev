import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Fragment, type CSSProperties } from 'react';
import { TransitionLink } from '@/components/transition/TransitionLink';
import { closing, closingPhotos, credits } from '@/data/alpha-premier';

type PhotoCredit = { credit: string; page: string };
type FooterLink = { label: string; href: string };

const i = (n: number) => ({ '--i': n }) as CSSProperties;

/** The credit lines saved by the assets script, public/alpha-premier/found/credits.json. */
function readPhotoCredits(): PhotoCredit[] {
  try {
    const file = path.join(process.cwd(), 'public', 'alpha-premier', 'found', 'credits.json');
    const entries: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(entries)) return [];
    return entries.flatMap((entry: unknown) => {
      const { credit, page } = (entry ?? {}) as { credit?: unknown; page?: unknown };
      return typeof credit === 'string' && typeof page === 'string' && page.startsWith('https://')
        ? [{ credit, page }]
        : [];
    });
  } catch {
    return [];
  }
}

function FooterAnchor({ link }: { link: FooterLink }) {
  // Internal links lead back to the portfolio, so they play the "lights off" sting.
  return link.href.startsWith('/') ? (
    <TransitionLink className="ap-link ap-footer__link" href={link.href} direction="out">
      {link.label}
    </TransitionLink>
  ) : (
    <a className="ap-link ap-footer__link" href={link.href}>
      {link.label}
    </a>
  );
}

// Blueprint "Name across the last photograph": the photograph is the footer. Links along the top,
// the middle left to the picture, the wordmark and the credits along the bottom.
export function SiteFooter() {
  const photoCredits = readPhotoCredits();

  return (
    <footer id="contact" className="ap-footer">
      <div className="ap-footer__photo" data-reveal style={i(0)}>
        <Image src={closingPhotos.footer.src} alt={closingPhotos.footer.alt} fill sizes="100vw" />
      </div>

      <div className="ap-footer__top">
        <nav aria-label="Elsewhere" data-reveal style={i(1)}>
          <ul className="ap-footer__links">
            {closing.links.map((link) => (
              <li key={link.label}>
                <FooterAnchor link={link} />
              </li>
            ))}
          </ul>
        </nav>
        <ul className="ap-footer__links ap-footer__contact" aria-label="Contact" data-reveal style={i(2)}>
          {closing.contact.map((link) => (
            <li key={link.label}>
              <FooterAnchor link={link} />
            </li>
          ))}
        </ul>
      </div>

      <div className="ap-footer__bottom">
        <p className="ap-footer__wordmark ap-display" data-reveal style={i(3)}>
          {closing.wordmark}
        </p>
        <div className="ap-footer__legal ap-small" data-reveal style={i(4)}>
          <ul className="ap-footer__credits">
            {credits.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {photoCredits.length > 0 && (
            <p>
              {closing.photoCreditsLead}{' '}
              {photoCredits.map((photo, k) => (
                <Fragment key={photo.page}>
                  <a className="ap-link" href={photo.page}>
                    {photo.credit}
                  </a>
                  {k < photoCredits.length - 1 ? '; ' : '.'}
                </Fragment>
              ))}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
