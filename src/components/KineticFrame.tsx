'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const sections = [
  { number: '01', label: 'Field', href: '#' },
  { number: '02', label: 'Profile', href: '#about' },
  { number: '03', label: 'Archive', href: '#resume' },
  { number: '04', label: 'Live', href: '#deployments' },
  { number: '05', label: 'Work', href: '#projects' },
  { number: '06', label: 'Contact', href: '#contact' },
];

export function KineticFrame() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  const fieldY = useTransform(progress, [0, 1], ['0%', reduceMotion ? '0%' : '-14%']);
  const fieldRotate = useTransform(progress, [0, 1], [0, reduceMotion ? 0 : -8]);
  const tickerX = useTransform(progress, [0, 1], ['0%', reduceMotion ? '0%' : '-28%']);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 top-[-18vh] h-[56vh] border-y border-white/[0.035] opacity-70 md:inset-x-[-18vw]"
        style={{ y: fieldY, rotate: fieldRotate }}
      >
        <div className="kinetic-field h-full w-full" />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:clamp(72px,8vw,140px)_clamp(72px,8vw,140px)] opacity-[0.16]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,transparent_0,rgba(10,10,10,0.22)_42%,rgba(10,10,10,0.9)_100%)]" />

      <motion.div
        className="fixed left-0 right-0 top-0 h-1 origin-left bg-mono-100"
        style={{ scaleX: progress }}
      />

      <div className="fixed bottom-8 left-4 hidden w-[calc(100vh-4rem)] origin-left -rotate-90 items-center gap-6 md:flex">
        <motion.div
          className="flex min-w-max items-center gap-6 text-[10px] font-medium uppercase tracking-[0.44em] text-mono-500"
          style={{ x: tickerX }}
        >
          {Array.from({ length: 2 }).map((_, group) =>
            sections.map((section) => (
              <span key={`${group}-${section.number}`} className="inline-flex items-center gap-3">
                <span className="text-mono-200">{section.number}</span>
                {section.label}
              </span>
            ))
          )}
        </motion.div>
        <div className="h-px flex-1 bg-mono-700" />
      </div>

      <nav className="fixed right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
        {sections.map((section) => (
          <a
            key={section.number}
            href={section.href}
            className="pointer-events-auto group flex items-center justify-end gap-3 text-[10px] uppercase tracking-[0.3em] text-mono-600 transition-colors hover:text-mono-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
          >
            <span className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {section.label}
            </span>
            <span className="tabular-nums">{section.number}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
