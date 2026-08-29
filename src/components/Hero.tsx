'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', reduceMotion ? '0px' : '90px']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-between overflow-hidden px-6 pb-10 pt-28 sm:px-8 lg:px-12"
    >
      <h1 className="sr-only">Deign Lazaro - Creative Full-Stack Developer and AI Automation Engineer</h1>

      {/* Top Editorial Metadata Bar */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-mono-950/40 px-5 py-3.5 text-[10px] uppercase tracking-[0.38em] text-mono-300 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold text-mono-100">KINETIC PORTFOLIO</span>
          <span className="text-mono-300">Deign Grey Lazaro / Valenzuela PH</span>
          <span className="text-mono-400 font-mono">2026 edition</span>
        </div>
      </div>

      {/* Centerpiece Hero Composition */}
      <motion.div
        style={{ opacity, y: contentY, willChange: 'opacity, transform' }}
        className="relative z-10 mx-auto my-auto w-full max-w-5xl py-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          <div className="inline-block rounded-full border border-white/15 bg-mono-950/60 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.35em] text-mono-300 backdrop-blur-md shadow-lg">
            01 / Creative Developer & AI Engineer
          </div>

          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-mono-50 sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Powering the <span className="font-serif italic font-normal text-mono-100 underline decoration-white/20 underline-offset-8">next</span>
            <br />
            generation of systems.
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-mono-200 sm:text-base md:text-lg font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Crafting scalable full-stack web applications and autonomous agent tooling with physical aesthetic precision.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              window.dispatchEvent(new CustomEvent('hire-me'));
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-mono-50 px-8 py-3.5 text-xs font-mono uppercase tracking-[0.24em] font-semibold text-mono-950 shadow-2xl transition-all hover:bg-mono-200 hover:scale-105 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <GlassButton
            size="lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Selected Builds
          </GlassButton>
        </motion.div>

        {/* Discipline Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {disciplines.map((discipline, idx) => (
            <span
              key={discipline}
              className="rounded-full border border-white/15 bg-mono-950/60 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-mono-300 backdrop-blur-md shadow-md"
            >
              0{idx + 1} {discipline}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Row: Metrics & Scroll Down Indicator */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-4 rounded-2xl border border-white/10 bg-mono-950/50 p-4 backdrop-blur-md sm:grid-cols-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-mono-300">
            <span>Scroll down</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce text-mono-200" />
          </div>

          {heroMetrics.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="flex items-baseline justify-between gap-3 border-t border-white/10 pt-2 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0"
            >
              <span className="text-xl font-bold tracking-tight text-mono-50 md:text-2xl">{value}</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-mono-400">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
