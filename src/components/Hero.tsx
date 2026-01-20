'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { SpotlightCursor } from './ui/spotlight-cursor';
import { BlurredTextReveal } from './ui/text-reveal';
import { EtherealShadow } from './ui/ethereal-shadow';

// Mobile detection hook
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                     'ontouchstart' in window ||
                     navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  
  // Disable heavy parallax on mobile
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Simplified transforms for mobile, full effects for desktop
  const y1 = useTransform(scrollYProgress, [0, 1], ['0px', isMobile ? '50px' : '200px']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0px', isMobile ? '100px' : '400px']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0px', isMobile ? '30px' : '100px']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.95 : 0.9]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Silk-like animated background - disabled on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <EtherealShadow
            color="rgba(80, 80, 80, 1)"
            animation={{ scale: 100, speed: 40 }}
            noise={{ opacity: 0.6, scale: 1.0 }}
            sizing="fill"
            className="dark:opacity-100 opacity-20"
          />
        </div>
      )}

      {/* Spotlight cursor effect - already handles mobile detection */}
      <SpotlightCursor className="z-[1]" />

      {/* Parallax background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        {/* Large circle */}
        <motion.div
          style={{ y: isMobile ? undefined : y1, willChange: isMobile ? 'auto' : 'transform' }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full border border-mono-200 dark:border-mono-800 opacity-40"
        />
        
        {/* Medium circle */}
        <motion.div
          style={{ y: isMobile ? undefined : y2, willChange: isMobile ? 'auto' : 'transform' }}
          className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full bg-mono-100 dark:bg-mono-900 opacity-50"
        />
        
        {/* Small accent shapes */}
        <motion.div
          style={{ y: isMobile ? undefined : y3, willChange: isMobile ? 'auto' : 'transform' }}
          className="absolute bottom-32 right-1/4 w-32 h-32 rotate-45 border-2 border-mono-300 dark:border-mono-700"
        />
        
        {/* Grid lines - reduced opacity on mobile */}
        <div className={isMobile ? "absolute inset-0 opacity-[0.02]" : "absolute inset-0 opacity-[0.03]"}>
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
        style={{ opacity: isMobile ? undefined : opacity, scale: isMobile ? undefined : scale, willChange: isMobile ? 'auto' : 'opacity, transform' }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.2 }}
          className="text-mono-500 dark:text-mono-400 text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase mb-8 px-4"
        >
          {isMobile || prefersReducedMotion ? (
            "Full-Stack Developer & AI Enthusiast"
          ) : (
            <BlurredTextReveal text="Full-Stack Developer & AI Enthusiast" delay={0.3} blur={true} />
          )}
        </motion.p>

        {/* Main logo with simple fade-in animation */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0.6 }}
          className="flex justify-center items-center"
          style={{ willChange: isMobile ? 'auto' : 'opacity, transform' }}
        >
          <Image
            src="/logo.svg"
            alt="Deign"
            width={800}
            height={460}
            className="w-[80vw] md:w-[60vw] lg:w-[50vw] max-w-[800px] text-mono-950 dark:text-mono-50"
            priority
          />
        </motion.div>

        {/* Subtitle with word reveal */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.8 : 1.0 }}
          className="mt-8 text-lg md:text-xl text-mono-600 dark:text-mono-400 max-w-2xl mx-auto leading-relaxed"
          style={{ willChange: isMobile ? 'auto' : 'opacity, transform' }}
        >
          Building modern web apps with Python, TypeScript & AI integrations.{' '}
          <br className="hidden md:block" />
          From concept to deployment—clean code, thoughtful design.
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
