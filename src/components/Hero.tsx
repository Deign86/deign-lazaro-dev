'use client';

import { useRef } from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { GlassButton } from './ui/apple-tahoe-liquid-glass-button';

const disciplines = [
  'Full-stack systems',
  'AI automation',
  'Agentic tooling',
  'Production UI',
];

const heroMetrics = [
  ['04+', 'years coding'],
  ['10+', 'builds shipped'],
  ['AI', 'first workflow'],
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between px-6 pb-12 pt-28 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-mono-950/50 px-5 py-3 text-[10px] uppercase tracking-[0.38em] text-mono-300 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between shadow-xl">
          <span className="font-semibold text-mono-100">KINETIC PORTFOLIO</span>
          <span className="text-mono-300">Deign Grey Lazaro / Valenzuela PH</span>
          <span className="text-mono-400 font-mono">2026 edition</span>
        </div>
      </div>

      <div className="mx-auto my-auto max-w-5xl text-center py-6">
        <div className="mb-5 inline-block rounded-full border border-white/15 bg-mono-950/60 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.35em] text-mono-300 backdrop-blur-md shadow-lg">
          01 / Creative Developer & AI Engineer
        </div>

        <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-mono-50 sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
          Powering the <span className="font-serif italic font-normal text-mono-100 underline decoration-white/20 underline-offset-8">next</span>
          <br />
          generation of systems.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-mono-200 sm:text-base md:text-lg font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Crafting scalable full-stack web applications and autonomous agent tooling with physical aesthetic precision.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('hire-me'));
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-mono-50 px-8 py-3.5 text-xs font-mono uppercase tracking-[0.24em] font-semibold text-mono-950 shadow-2xl transition-all hover:bg-mono-200 hover:scale-105 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <GlassButton
            size="lg"
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Selected Builds
          </GlassButton>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {disciplines.map((d, i) => (
            <span
              key={d}
              className="rounded-full border border-white/15 bg-mono-950/60 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-mono-300 backdrop-blur-md shadow-md"
            >
              0{i + 1} {d}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-4 rounded-2xl border border-white/10 bg-mono-950/50 p-4 backdrop-blur-md sm:grid-cols-4 shadow-xl">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-mono-300">
            <span>Scroll down</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-mono-200" />
          </div>
          {heroMetrics.map(([val, lbl]) => (
            <div key={lbl} className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-2 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <span className="text-xl font-bold tracking-tight text-mono-50 md:text-2xl">{val}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-mono-400">{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
