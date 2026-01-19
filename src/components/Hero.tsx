'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SpotlightCursor } from './ui/spotlight-cursor';
import { BlurredTextReveal } from './ui/text-reveal';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spotlight cursor effect */}
      <SpotlightCursor className="z-[1]" />

      {/* Parallax background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle */}
        <motion.div
          style={{ y: y1 }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-mono-200 dark:border-mono-800 opacity-40"
        />
        
        {/* Medium circle */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full bg-mono-100 dark:bg-mono-900 opacity-50"
        />
        
        {/* Small accent shapes */}
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-32 right-1/4 w-32 h-32 rotate-45 border-2 border-mono-300 dark:border-mono-700"
        />
        
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(to right, var(--mono-900) 1px, transparent 1px),
              linear-gradient(to bottom, var(--mono-900) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />
        </div>
      </div>

      {/* Main content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-mono-500 dark:text-mono-400 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 px-4"
        >
          <BlurredTextReveal text="Full-Stack Developer & Student" delay={0.3} />
        </motion.p>

        {/* Main title with letter-by-letter reveal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-bold leading-[0.85] tracking-tighter text-mono-950 dark:text-mono-50"
        >
          <BlurredTextReveal text="DEIGN" delay={0.5} staggerDelay={0.08} />
        </motion.h1>

        {/* Subtitle with word reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 text-lg md:text-xl text-mono-600 dark:text-mono-400 max-w-2xl mx-auto leading-relaxed"
        >
          Building digital experiences with Python, TypeScript & Flutter.
          <br className="hidden md:block" />
          Turning ideas into elegant, functional code.
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pointer-events-auto"
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-mono-950 dark:bg-mono-50 text-mono-50 dark:text-mono-950 rounded-full font-medium text-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="relative z-10">View Selected Builds</span>
            <svg
              className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            
            {/* Hover effect */}
            <span className="absolute inset-0 bg-mono-800 dark:bg-mono-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator - positioned outside main content for proper layering */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-mono-400 dark:border-mono-600 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [1, 0, 1], y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-mono-400 dark:bg-mono-600 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
