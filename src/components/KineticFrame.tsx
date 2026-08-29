'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export function KineticFrame() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Subtle architectural hairline grid */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:clamp(80px,9vw,160px)_clamp(80px,9vw,160px)] opacity-[0.14]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,transparent_0,rgba(10,10,10,0.3)_40%,rgba(10,10,10,0.92)_100%)]" />

      {/* Top Reading Progress Line */}
      <motion.div
        className="fixed left-0 right-0 top-0 h-[2px] origin-left bg-mono-100 z-50"
        style={{ scaleX: reduceMotion ? 1 : progress }}
      />
    </div>
  );
}
