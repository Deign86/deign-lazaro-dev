'use client';

import { MotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

interface LiquidObjectProps {
  progress?: MotionValue<number>;
  className?: string;
}

export function LiquidObject({ progress, className = '' }: LiquidObjectProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Direct video seek executed exactly once per animation frame
  const applySeek = useCallback(() => {
    rafIdRef.current = null;
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) {
      return;
    }

    const duration = video.duration;
    const targetTime = Math.max(0, Math.min(duration - 0.001, targetTimeRef.current));

    if (Math.abs(video.currentTime - targetTime) > 0.005) {
      try {
        video.currentTime = targetTime;
      } catch {
        // Safe catch if seeking is temporarily unavailable
      }
    }
  }, []);

  // Synchronize scroll progress value to video time
  const handleProgressUpdate = useCallback(
    (p: number) => {
      const clamped = Math.max(0, Math.min(1, p));
      const video = videoRef.current;

      if (!video || !video.duration || Number.isNaN(video.duration)) {
        targetTimeRef.current = clamped * 10; // fallback duration before metadata
        return;
      }

      targetTimeRef.current = clamped * video.duration;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(applySeek);
      }
    },
    [applySeek]
  );

  // Subscribe to Framer Motion's progress MotionValue
  useEffect(() => {
    if (reduceMotion || !progress) return;

    // Apply initial value immediately
    handleProgressUpdate(progress.get());

    const unsubscribe = progress.on('change', (latest) => {
      handleProgressUpdate(latest);
    });

    return () => {
      unsubscribe();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [progress, reduceMotion, handleProgressUpdate]);

  // Handle video metadata loaded
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsLoaded(true);

    if (progress) {
      const currentP = progress.get();
      targetTimeRef.current = currentP * (video.duration || 10);
      applySeek();
    }
  }, [progress, applySeek]);

  // Ensure video stays paused at all times
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    const preventPlay = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    video.addEventListener('play', preventPlay);
    return () => {
      video.removeEventListener('play', preventPlay);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-mono-950 ${className}`}
      aria-hidden="true"
    >
      {/* Video Canvas */}
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/video/liquid-metal-poster.jpg"
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleLoadedMetadata}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-90' : 'opacity-70'
          }`}
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          <source src="/video/liquid-metal-mobile.mp4" media="(max-width: 768px)" type="video/mp4" />
          <source src="/video/liquid-metal-scrub.mp4" type="video/mp4" />
          <source src="/video/liquid-metal-8k-master.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Atmospheric Editorial Scrims - Preserves liquid metal luminance while guaranteeing typography contrast */}
      <div className="pointer-events-none absolute inset-0 bg-mono-950/20" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-mono-950/40 to-mono-950/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mono-950/70 via-transparent to-mono-950/90" />
    </div>
  );
}
