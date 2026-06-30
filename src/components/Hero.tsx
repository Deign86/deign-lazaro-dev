'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SpotlightCursor } from './ui/spotlight-cursor';
import { BlurredTextReveal } from './ui/text-reveal';
import { EtherealShadowVideo } from './ui/ethereal-shadow-video';
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

  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', reduceMotion ? '0px' : '96px']);
  const markY = useTransform(scrollYProgress, [0, 1], ['0px', reduceMotion ? '0px' : '-72px']);
  const opacity = useTransform(scrollYProgress, [0, 0.82], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.94]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden px-5 pb-10 pt-28 sm:px-8 lg:px-10"
    >
      <h1 className="sr-only">Deign Lazaro - Full-stack developer and AI automation builder</h1>

      <div className="absolute inset-0 z-0 isolation-isolate" style={{ contain: 'layout paint' }}>
        <EtherealShadowVideo
          videoSrc="/ethereal-shadow"
          availableFps={[60]}
          noise={{ opacity: 0.26, scale: 1 }}
          sizing="fill"
          className="opacity-80 grayscale contrast-125"
          fallbackColor="rgba(28, 28, 28, 1)"
        />
        <div className="absolute inset-0 bg-mono-950/55" />
      </div>

      <SpotlightCursor className="z-[2]" />

      <motion.div
        style={{ opacity, scale, y: contentY, willChange: 'opacity, transform' }}
        className="relative z-10 mx-auto grid min-h-[calc(100dvh-9.5rem)] max-w-[1500px] grid-rows-[auto_1fr_auto] gap-8"
      >
        <div className="flex flex-col gap-4 border-y border-mono-700/50 py-4 text-[10px] uppercase tracking-[0.36em] text-mono-400 md:flex-row md:items-center md:justify-between">
          <span>KINETIC PORTFOLIO</span>
          <span>Deign Grey Lazaro / Valenzuela PH</span>
          <span>2026 edition</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <aside className="order-2 grid gap-8 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="max-w-md text-xl leading-relaxed text-mono-300 md:text-2xl"
            >
              I build sharp, deployable software where product craft and AI automation meet.
            </motion.p>

            <div className="grid gap-3">
              {disciplines.map((discipline, index) => (
                <motion.div
                  key={discipline}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.62, delay: 0.35 + index * 0.08 }}
                  className="group flex items-center justify-between border-b border-mono-800 py-3 text-sm uppercase tracking-[0.24em] text-mono-500"
                >
                  <span className="text-mono-600 tabular-nums">0{index + 1}</span>
                  <span className="transition-colors group-hover:text-mono-100">{discipline}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="pointer-events-auto flex flex-wrap gap-4"
            >
              <GlassButton
                size="lg"
                className="group"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                contentClassName="flex items-center gap-3"
              >
                <span>View selected builds</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </GlassButton>
              <a
                href="#contact"
                className="inline-flex items-center border-b border-mono-600 px-1 text-sm uppercase tracking-[0.25em] text-mono-400 transition-colors hover:border-mono-100 hover:text-mono-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
              >
                Start a project
              </a>
            </motion.div>
          </aside>

          <motion.div
            className="order-1 flex flex-col items-start lg:order-2"
            style={{ y: markY, willChange: 'transform' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.28 }}
              className="w-full"
            >
              <Image
                src="/logo.svg"
                alt="Deign"
                width={980}
                height={560}
                className="w-full max-w-[980px] brightness-125 contrast-125"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.9 }}
              className="mt-4 max-w-3xl text-4xl font-semibold leading-[0.95] text-mono-100 sm:text-6xl lg:text-7xl"
            >
              <BlurredTextReveal text="Systems with pulse." delay={0.1} blur />
            </motion.div>
          </motion.div>
        </div>

        <div className="grid gap-4 border-t border-mono-800 pt-5 sm:grid-cols-3">
          {heroMetrics.map(([value, label], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1 + index * 0.08 }}
              className="flex items-end justify-between gap-4"
            >
              <span className="kinetic-type text-4xl font-bold text-mono-100 md:text-5xl">{value}</span>
              <span className="max-w-[8rem] text-right text-xs uppercase tracking-[0.25em] text-mono-500">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-5 right-5 z-10 hidden text-[10px] uppercase tracking-[0.4em] text-mono-600 md:block"
        aria-hidden="true"
      >
        Scroll
      </motion.div>
    </section>
  );
}
