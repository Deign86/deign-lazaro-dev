'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TransitionLink } from './transition/TransitionLink';

export const ALPHA_PREMIER_HREF = '/alpha-premier';
const POSTER = '/alpha-premier/reel/poster.webp';

// Entry points into the company portfolio. The thumbnail is the reel's floor-31 frame:
// grey towers that sit in this site's monochrome, with the one gold floor the sting opens on.
export function AlphaPremierFeature({ variant }: { variant: 'hero' | 'work' }) {
  if (variant === 'hero') {
    return (
      <TransitionLink
        href={ALPHA_PREMIER_HREF}
        direction="in"
        className="group mx-auto mt-4 sm:mt-6 flex w-full max-w-md items-center gap-3 rounded-2xl border border-white/15 bg-mono-950/70 p-2 pr-4 text-left backdrop-blur-md shadow-xl transition-colors hover:border-white/35 hover:bg-mono-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-mono-50"
      >
        <span className="relative h-11 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-mono-900 sm:h-12 sm:w-[5.5rem]">
          <Image src={POSTER} alt="" fill sizes="88px" className="origin-[44%_48%] scale-[2.4] object-cover transition-transform duration-500 group-hover:scale-[2.7]" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] text-mono-400">Internship · 2026</span>
          <span className="block truncate text-xs sm:text-sm font-semibold text-mono-50">Alpha Premier company portfolio</span>
        </span>
        <ArrowRight className="h-4 w-4 flex-shrink-0 text-mono-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-mono-50" />
      </TransitionLink>
    );
  }

  return (
    <TransitionLink
      href={ALPHA_PREMIER_HREF}
      direction="in"
      className="group grid overflow-hidden rounded-2xl border border-white/15 bg-mono-950/80 backdrop-blur-md shadow-2xl transition-colors hover:border-white/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-mono-50 sm:col-span-2 sm:grid-cols-[1.1fr_1fr]"
    >
      <span className="relative block aspect-[16/9] overflow-hidden bg-mono-900 sm:aspect-auto sm:min-h-[11rem]">
        <Image src={POSTER} alt="" fill sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw" className="origin-[44%_48%] scale-[1.35] object-cover transition-transform duration-700 group-hover:scale-[1.45]" />
      </span>
      <span className="flex flex-col justify-between gap-3 p-4 sm:p-5">
        <span>
          <span className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] text-mono-400">Featured · Company portfolio</span>
          <span className="mt-2 block text-base sm:text-lg font-bold text-mono-50">Alpha Premier Realty</span>
          <span className="mt-1 block text-[11px] sm:text-xs leading-relaxed text-mono-300">
            The brokerage had no IT, so I became it: an attendance kiosk, the group website, a Branding Studio and a Viber MCP.
          </span>
        </span>
        <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-mono-50 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-mono-950 transition-colors group-hover:bg-mono-200">
          Open the company portfolio
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </span>
    </TransitionLink>
  );
}
