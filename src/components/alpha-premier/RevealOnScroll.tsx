'use client';

import { useEffect } from 'react';

// Reveal [data-reveal] blocks once as they enter the viewport (taste-skill base.js, as a component).
// Content stays visible until this runs, and a safety pass shows anything the observer missed.
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('ap-js');
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.ap-root [data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-in'));
      return () => root.classList.remove('ap-js');
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );
    targets.forEach((el) => io.observe(el));
    const revealOnScreen = () => {
      targets.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
      });
    };
    // The observer's bottom margin leaves a band at the foot of the page that can never be
    // scrolled up into its area, so at the end of the page, show what's on screen.
    const atEnd = () => {
      if (innerHeight + scrollY >= root.scrollHeight - 2) revealOnScreen();
    };
    window.addEventListener('scroll', atEnd, { passive: true });
    atEnd();
    const safety = window.setTimeout(revealOnScreen, 2500);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', atEnd);
      window.clearTimeout(safety);
      root.classList.remove('ap-js');
    };
  }, []);
  return null;
}
