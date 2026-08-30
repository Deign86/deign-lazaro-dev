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
  const pendingTimeRef = useRef<number | null>(null);

  // Direct video seek executed smoothly
  const performSeek = useCallback((targetTime: number) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) {
      return;
    }

    const duration = video.duration;
    const clampedTime = Math.max(0, Math.min(duration - 0.005, targetTime));

    if (video.seeking) {
      pendingTimeRef.current = clampedTime;
      return;
    }

    if (Math.abs(video.currentTime - clampedTime) > 0.005) {
      try {
        if ('fastSeek' in video && typeof (video as HTMLVideoElement & { fastSeek?: (t: number) => void }).fastSeek === 'function') {
          (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(clampedTime);
        } else {
          video.currentTime = clampedTime;
        }
      } catch {
        // Safe catch if seeking is temporarily busy on iOS WebKit
      }
    }
  }, []);

  const scheduleSeek = useCallback(() => {
    rafIdRef.current = null;
    performSeek(targetTimeRef.current);
  }, [performSeek]);

  // Synchronize scroll progress value to video time
  const handleProgressUpdate = useCallback(
    (p: number) => {
      const clamped = Math.max(0, Math.min(1, p));
      const video = videoRef.current;

      if (!video || !video.duration || Number.isNaN(video.duration)) {
        targetTimeRef.current = clamped * 10;
        return;
      }

      targetTimeRef.current = clamped * video.duration;

      if (rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(scheduleSeek);
      }
    },
    [scheduleSeek]
  );

  // Subscribe to Framer Motion's progress MotionValue
  useEffect(() => {
    if (reduceMotion || !progress) return;

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

  // Handle seeked event to drain any queued seeks on iOS WebKit
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        performSeek(nextTime);
      }
    };

    video.addEventListener('seeked', handleSeeked);
    return () => {
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [performSeek]);

  // iOS Safari / WebKit Initialization & Decoder Priming
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Critical imperative properties for iOS WebKit inline playback
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    const primeDecoder = async () => {
      try {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          video.pause();
          setIsLoaded(true);
          if (progress) {
            performSeek(progress.get() * (video.duration || 10));
          }
        }
      } catch {
        // Autoplay policy fallback: will prime on first user touch/scroll gesture
      }
    };

    primeDecoder();

    const handleUserGestureUnlock = () => {
      if (video.paused && !isLoaded) {
        video
          .play()
          .then(() => {
            video.pause();
            setIsLoaded(true);
            if (progress) {
              performSeek(progress.get() * (video.duration || 10));
            }
          })
          .catch(() => {});
      }
    };

    window.addEventListener('touchstart', handleUserGestureUnlock, { once: true, passive: true });
    window.addEventListener('scroll', handleUserGestureUnlock, { once: true, passive: true });
    window.addEventListener('click', handleUserGestureUnlock, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', handleUserGestureUnlock);
      window.removeEventListener('scroll', handleUserGestureUnlock);
      window.removeEventListener('click', handleUserGestureUnlock);
    };
  }, [progress, isLoaded, performSeek]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setIsLoaded(true);

    if (progress) {
      targetTimeRef.current = progress.get() * (video.duration || 10);
      performSeek(targetTimeRef.current);
    }
  }, [progress, performSeek]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-mono-950 ${className}`}
      aria-hidden="true"
    >
      {/* Video Canvas */}
      <div className="relative h-full w-full">
        <video
          ref={videoRef}
          src="/video/liquid-metal-scrub.mp4"
          muted
          playsInline
          autoPlay={false}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          poster="/video/liquid-metal-poster.jpg"
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleLoadedMetadata}
          onLoadedData={handleLoadedMetadata}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-90' : 'opacity-70'
          }`}
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>

      {/* Atmospheric Editorial Scrims */}
      <div className="pointer-events-none absolute inset-0 bg-mono-950/20" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-mono-950/40 to-mono-950/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mono-950/70 via-transparent to-mono-950/90" />
    </div>
  );
}
