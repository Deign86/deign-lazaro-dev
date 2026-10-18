import Image from 'next/image';
import type { CSSProperties } from 'react';
import { TransitionLink } from '@/components/transition/TransitionLink';
import { closing, closingPhotos } from '@/data/alpha-premier';

type FooterLink = { label: string; href: string };

const i = (n: number) => ({ '--i': n }) as CSSProperties;

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
// the middle left to the picture, the wordmark along the bottom.
export function SiteFooter() {
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
      </div>
    </footer>
  );
}
