'use client';

import { motion, MotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';

interface KineticFrameProps {
  progress?: MotionValue<number>;
}

export function KineticFrame({ progress: externalProgress }: KineticFrameProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const defaultProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  const progress = externalProgress || defaultProgress;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Top Reading Progress Line */}
      <motion.div
        className="fixed left-0 right-0 top-0 h-[2px] origin-left bg-mono-100 shadow-[0_0_8px_rgba(255,255,255,0.8)] z-50"
        style={{ scaleX: reduceMotion ? 1 : progress }}
      />
    </div>
  );
}
