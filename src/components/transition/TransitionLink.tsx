'use client';

import Link from 'next/link';
import type { ComponentProps, MouseEvent } from 'react';
import { requestTransition, type StingDirection } from './TransitionLayer';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string; direction: StingDirection };

// A plain link that plays the sting first. Modified clicks (new tab, etc.) behave normally.
export function TransitionLink({ href, direction, onClick, onMouseEnter, ...rest }: Props) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    requestTransition(href, direction);
  };
  const warm = (event: MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(event);
    const portrait = window.matchMedia('(orientation: portrait)').matches;
    const preload = document.createElement('link');
    preload.rel = 'prefetch';
    preload.href = `/alpha-premier/stings/sting-${direction}-${portrait ? '9x16' : '16x9'}.mp4`;
    document.head.appendChild(preload);
  };
  return <Link href={href} onClick={handleClick} onMouseEnter={warm} {...rest} />;
}
