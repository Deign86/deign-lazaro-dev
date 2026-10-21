'use client';

import Link from 'next/link';
import { useEffect, useRef, type ComponentProps, type MouseEvent } from 'react';
import { requestTransition, stingAudioSrc, stingSrc, type StingDirection } from './TransitionLayer';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  direction: StingDirection;
  // false: don't fetch the sting when the link scrolls into view. The page calls prefetchSting
  // itself once its own media has loaded, so the two don't compete for bandwidth. Hovering the
  // link still fetches it straight away.
  prefetchOnView?: boolean;
};

const prefetched = new Set<string>();

export function prefetchSting(direction: StingDirection) {
  for (const href of [stingSrc(direction), stingAudioSrc(direction)]) {
    if (prefetched.has(href)) continue;
    prefetched.add(href);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }
}

// A plain link that plays the sting first. Modified clicks (new tab, etc.) behave normally.
// The sting is fetched as soon as the link scrolls into view, so it is ready by the click.
export function TransitionLink({ href, direction, prefetchOnView = true, onClick, onMouseEnter, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!prefetchOnView || !el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          prefetchSting(direction);
          io.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [direction, prefetchOnView]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    requestTransition(href, direction);
  };
  const warm = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(event);
    prefetchSting(direction);
  };
  return <Link ref={ref} href={href} onClick={handleClick} onMouseEnter={warm} {...rest} />;
}
