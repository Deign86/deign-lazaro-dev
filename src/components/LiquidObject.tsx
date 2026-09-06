'use client';

import { MotionValue, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';

const DESKTOP_SEEK_INTERVAL_MS = 24;
const MOBILE_SEEK_INTERVAL_MS = 50;
const MOBILE_MEDIA_QUERY = '(pointer: coarse), (hover: none), (max-width: 767px)';

interface LiquidObjectProps {
  progress?: MotionValue<number>;
  className?: string;
}

export function LiquidObject({ progress, className = '' }: LiquidObjectProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMedia, setIsMobileMedia] = useState<boolean | null>(null);
  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastSeekTimeRef = useRef(-DESKTOP_SEEK_INTERVAL_MS);
  const pendingTimeRef = useRef<number | null>(null);
  const decoderPrimedRef = useRef(false);
  const showStaticPoster = reduceMotion === true || isMobileMedia === null;
  const videoSrc = isMobileMedia
    ? '/video/liquid-metal-mobile.mp4'
    : '/video/liquid-metal-scrub.mp4';
  const seekIntervalMs = isMobileMedia ? MOBILE_SEEK_INTERVAL_MS : DESKTOP_SEEK_INTERVAL_MS;

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updatePreference = () => setIsMobileMedia(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  // Direct video seek executed smoothly
  const performSeek = useCallback((targetTime: number) => {
    const video = videoRef.current;
    if (document.hidden || !video || !video.duration || Number.isNaN(video.duration)) {
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

  const scheduleSeek = useCallback(
    function runScheduledSeek(timestamp: number) {
      if (document.hidden) {
        rafIdRef.current = null;
        return;
      }

      if (timestamp - lastSeekTimeRef.current < seekIntervalMs) {
        rafIdRef.current = requestAnimationFrame(runScheduledSeek);
        return;
      }

      rafIdRef.current = null;
      lastSeekTimeRef.current = timestamp;
      performSeek(targetTimeRef.current);
    },
    [performSeek, seekIntervalMs]
  );

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

      if (!document.hidden && rafIdRef.current === null) {
        rafIdRef.current = requestAnimationFrame(scheduleSeek);
      }
    },
    [scheduleSeek]
  );

  // Subscribe to Framer Motion's progress MotionValue
  useEffect(() => {
    if (showStaticPoster || !progress) return;

    const syncProgress = () => {
      if (document.hidden) {
        if (rafIdRef.current !== null) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        return;
      }

      handleProgressUpdate(progress.get());
    };

    syncProgress();
    const unsubscribe = progress.on('change', handleProgressUpdate);
    document.addEventListener('visibilitychange', syncProgress);

    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', syncProgress);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [progress, showStaticPoster, handleProgressUpdate]);

  // Handle seeked event to drain any queued seeks on iOS WebKit
  useEffect(() => {
    const video = videoRef.current;
    if (showStaticPoster || !video) return;

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
      pendingTimeRef.current = null;
    };
  }, [videoSrc, showStaticPoster, performSeek]);

  // iOS Safari / WebKit Initialization & Decoder Priming
  useEffect(() => {
    const video = videoRef.current;
    if (showStaticPoster || !video) return;

    decoderPrimedRef.current = false;
    let cancelled = false;

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
          if (cancelled) return;
          video.pause();
          decoderPrimedRef.current = true;
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
      if (video.paused && !decoderPrimedRef.current) {
        video
          .play()
          .then(() => {
            if (cancelled) return;
            video.pause();
            decoderPrimedRef.current = true;
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
      cancelled = true;
      window.removeEventListener('touchstart', handleUserGestureUnlock);
      window.removeEventListener('scroll', handleUserGestureUnlock);
      window.removeEventListener('click', handleUserGestureUnlock);
      decoderPrimedRef.current = false;
    };
  }, [progress, videoSrc, showStaticPoster, performSeek]);

  const handleLoadStart = useCallback(() => {
    setIsLoaded(false);
    pendingTimeRef.current = null;
    lastSeekTimeRef.current = -seekIntervalMs;
  }, [seekIntervalMs]);

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    if (progress) {
      targetTimeRef.current = progress.get() * (video.duration || 10);
      performSeek(targetTimeRef.current);
    }
  }, [progress, performSeek]);

  const handleLoadedData = useCallback(() => setIsLoaded(true), []);

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-mono-950 ${className}`}
      aria-hidden="true"
    >
      {/* Video Canvas */}
      <div className="relative h-full w-full">
        <Image
          src="/video/liquid-metal-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          preload
          draggable={false}
          className="object-cover opacity-70"
        />
        {!showStaticPoster && (
          <video
            key={videoSrc}
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            autoPlay={false}
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            preload="metadata"
            poster="/video/liquid-metal-poster.jpg"
            onLoadStart={handleLoadStart}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={handleLoadedData}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              isLoaded ? 'opacity-90' : 'opacity-0'
            }`}
            style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          />
        )}
      </div>

      {/* Atmospheric Editorial Scrims */}
      <div className="pointer-events-none absolute inset-0 bg-mono-950/20" />
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-mono-950/40 to-mono-950/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-mono-950/70 via-transparent to-mono-950/90" />
    </div>
  );
}
