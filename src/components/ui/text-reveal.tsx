'use client';

import { motion, Variants, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  blur?: boolean;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

// Letter by letter reveal with blur effect
export function BlurredTextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.02,
  blur = true,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 20,
      ...(blur && !reduceMotion && { filter: 'blur(8px)' }),
    },
    visible: {
      opacity: 1,
      y: 0,
      ...(blur && !reduceMotion && { filter: 'blur(0px)' }),
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
  <motion.span
  ref={ref}
  variants={container}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
  className={cn('inline-block', className)}
  aria-label={text}
  >
  {text.split('').map((char, index) => (
  <motion.span
  key={`${char}-${index}`}
  variants={letterVariants}
  className="inline-block"
  aria-hidden="true"
  >
  {char === ' ' ? '\u00A0' : char}
  </motion.span>
  ))}
  </motion.span>
  );
}

// Word by word reveal
interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  staggerDelay = 0.08,
  once = true,
}: WordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      // Reduced motion: opacity-only fade (no blur/rotate/offset per fixing-motion-performance §7)
      y: reduceMotion ? 0 : 40,
      rotateX: reduceMotion ? 0 : -90,
      filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('inline-flex flex-wrap gap-x-2', className)}
      aria-label={text}
    >
      {text.split(' ').map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className={cn('inline-block', wordClassName)}
          style={{ transformOrigin: 'bottom center' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
