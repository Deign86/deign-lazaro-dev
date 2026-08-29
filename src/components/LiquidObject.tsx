'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export function LiquidObject() {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay handled by browser policy
      });
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll();

  // Inertial spring for heavy, fluid physical momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    mass: 1.0,
    restDelta: 0.001,
  });

  // Fullscreen viewport transforms across the scroll journey:
  const desktopScale = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1.04, 1.14, 1.08, 1.16, 1.1, 1.05]
  );

  const desktopX = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['0%', '4%', '-3%', '4%', '-3%', '0%']
  );

  const desktopY = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['0%', '-3%', '2%', '-2%', '2%', '0%']
  );

  const desktopRotate = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 2, -1.5, 1.5, -1, 0]
  );

  // Mobile viewport transforms:
  const mobileScale = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1.06, 1.12, 1.08, 1.12, 1.08, 1.04]
  );

  const mobileY = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['0%', '-2%', '2%', '-2%', '1%', '0%']
  );

  const targetScale = reduceMotion ? 1 : isMobile ? mobileScale : desktopScale;
  const targetX = reduceMotion ? '0%' : isMobile ? '0%' : desktopX;
  const targetY = reduceMotion ? '0%' : isMobile ? mobileY : desktopY;
  const targetRotate = reduceMotion ? 0 : isMobile ? 0 : desktopRotate;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden bg-mono-950"
      aria-hidden="true"
    >
      {/* Fullscreen Boomerang Video Canvas */}
      <motion.div
        style={{
          scale: targetScale,
          x: targetX,
          y: targetY,
          rotate: targetRotate,
          willChange: 'transform',
        }}
        className="absolute inset-[-4vw] h-[calc(100%+8vw)] w-[calc(100%+8vw)]"
      >
        <video
          ref={videoRef}
          src="/liquid-metal.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover grayscale contrast-115 brightness-90 opacity-80"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />
      </motion.div>

      {/* Luxury Scrim & Vignette for Maximum Foreground Text Readability */}
      <div className="pointer-events-none absolute inset-0 bg-mono-950/50 backdrop-contrast-125" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-mono-950/50 to-mono-950/90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mono-950/70 via-transparent to-mono-950/80" />
    </div>
  );
}
