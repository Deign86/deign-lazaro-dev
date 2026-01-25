'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView, Variant } from 'framer-motion';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  blur?: boolean;
  scale?: boolean;
  once?: boolean;
  amount?: number;
  distance?: number;
}

const generateVariants = (
  direction: Direction,
  distance: number,
  blur: boolean,
  scale: boolean
): { hidden: Variant; visible: Variant } => {
  const getAxis = () => {
    if (direction === 'left' || direction === 'right') return 'x';
    if (direction === 'up' || direction === 'down') return 'y';
    return null;
  };

  const getValue = () => {
    if (direction === 'right' || direction === 'down') return distance;
    if (direction === 'left' || direction === 'up') return -distance;
    return 0;
  };

  const axis = getAxis();
  const value = getValue();

  return {
    hidden: {
      opacity: 0,
      ...(blur && { filter: 'blur(12px)' }),
      ...(scale && { scale: 0.9 }),
      ...(axis && { [axis]: value }),
    },
    visible: {
      opacity: 1,
      ...(blur && { filter: 'blur(0px)' }),
      ...(scale && { scale: 1 }),
      ...(axis && { [axis]: 0 }),
    },
  };
};

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  blur = true,
  scale = false,
  once = true,
  amount = 0.3,
  distance = 40,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const variants = generateVariants(direction, distance, blur, scale);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Staggered container for children animations
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// Stagger item for use inside StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  blur?: boolean;
  scale?: boolean;
  distance?: number;
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
  blur = true,
  scale = false,
  distance = 30,
}: StaggerItemProps) {
  const variants = generateVariants(direction, distance, blur, scale);

  const itemVariants: { hidden: Variant; visible: Variant } = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    } as Variant,
  };

  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
