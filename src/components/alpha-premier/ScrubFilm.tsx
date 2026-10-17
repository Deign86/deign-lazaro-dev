'use client';

import { type MotionValue, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

// Scroll-scrubbed film, generalised from src/components/LiquidObject.tsx (left untouched):
// rAF-throttled seeks, seek coalescing while the decoder is busy, iOS decoder priming,
// and a static poster under reduced motion.

const DESKTOP_SEEK_INTERVAL_MS = 24;
const MOBILE_SEEK_INTERVAL_MS = 50;
const MOBILE_MEDIA_QUERY = '(pointer: coarse), (hover: none), (max-width: 767px)';

const subscribeMobileMedia = (onChange: () => void) => {
  const query = window.matchMedia(MOBILE_MEDIA_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getMobileMedia = (): boolean | null => window.matchMedia(MOBILE_MEDIA_QUERY).matches;
const getMobileMediaOnServer = (): boolean | null => null;

type SeekableVideo = HTMLVideoElement & { fastSeek?: (time: number) => void };

export type ScrubFilmProps = {
  /** The film for fine pointers, scrubbed from 0 to its duration by `progress`. */
  src: string;
  /** A lighter encode for coarse pointers and narrow screens. Falls back to `src`. */
  mobileSrc?: string;
  /**
   * Still drawn under the film and shown alone under reduced motion.
   * Leave it out when something underneath already serves as poster and fallback.
   */
  poster?: string;
  /** Scroll progress from 0 to 1, for example `useScroll().scrollYProgress`. */
  progress: MotionValue<number>;
  /** `sizes` for the poster image. */
  sizes?: string;
  className?: string;
};

export function ScrubFilm({ src, mobileSrc, poster, progress, sizes = '100vw', className = '' }: ScrubFilmProps) {
  const reduceMotion = useReducedMotion();
  const isMobileMedia = useSyncExternalStore(subscribeMobileMedia, getMobileMedia, getMobileMediaOnServer);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const targetTimeRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastSeekTimeRef = useRef(-DESKTOP_SEEK_INTERVAL_MS);
  const pendingTimeRef = useRef<number | null>(null);
  const decoderPrimedRef = useRef(false);

  const showStaticPoster = reduceMotion === true || isMobileMedia === null;
  const videoSrc = isMobileMedia && mobileSrc ? mobileSrc : src;
  const seekIntervalMs = isMobileMedia ? MOBILE_SEEK_INTERVAL_MS : DESKTOP_SEEK_INTERVAL_MS;

  const performSeek = useCallback((targetTime: number) => {
    const video = videoRef.current as SeekableVideo | null;
    if (document.hidden || !video || !video.duration || Number.isNaN(video.duration)) return;

    const clampedTime = Math.max(0, Math.min(video.duration - 0.005, targetTime));

    // One seek at a time: while the decoder is busy, keep only the latest target.
    if (video.seeking) {
      pendingTimeRef.current = clampedTime;
      return;
    }

    if (Math.abs(video.currentTime - clampedTime) > 0.005) {
      try {
        if (typeof video.fastSeek === 'function') video.fastSeek(clampedTime);
        else video.currentTime = clampedTime;
      } catch {
        // iOS WebKit can throw while a seek is still settling; the next frame retries.
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

  const handleProgressUpdate = useCallback(
    (value: number) => {
      const clamped = Math.max(0, Math.min(1, value));
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

  // Follow the progress MotionValue; stop seeking while the tab is hidden.
  useEffect(() => {
    if (showStaticPoster) return;

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

  // Drain the queued seek once the decoder reports it has landed.
  useEffect(() => {
    const video = videoRef.current;
    if (showStaticPoster || !video) return;

    const handleSeeked = () => {
      if (pendingTimeRef.current === null) return;
      const nextTime = pendingTimeRef.current;
      pendingTimeRef.current = null;
      performSeek(nextTime);
    };

    video.addEventListener('seeked', handleSeeked);
    return () => {
      video.removeEventListener('seeked', handleSeeked);
      pendingTimeRef.current = null;
    };
  }, [videoSrc, showStaticPoster, performSeek]);

  // iOS Safari / WebKit: inline playback flags, then prime the decoder with play() + pause().
  useEffect(() => {
    const video = videoRef.current;
    if (showStaticPoster || !video) return;

    decoderPrimedRef.current = false;
    let cancelled = false;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x5-playsinline', 'true');

    const markPrimed = () => {
      if (cancelled) return;
      video.pause();
      decoderPrimedRef.current = true;
      setIsLoaded(true);
      performSeek(progress.get() * (video.duration || 10));
    };

    const primeDecoder = async () => {
      try {
        await video.play();
        markPrimed();
      } catch {
        // Autoplay policy: prime on the first touch, scroll or click instead.
      }
    };
    primeDecoder();

    const handleUserGestureUnlock = () => {
      if (!video.paused || decoderPrimedRef.current) return;
      video.play().then(markPrimed).catch(() => {});
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
    targetTimeRef.current = progress.get() * (video.duration || 10);
    performSeek(targetTimeRef.current);
  }, [progress, performSeek]);

  const handleLoadedData = useCallback(() => setIsLoaded(true), []);
  const handleError = useCallback(() => setIsLoaded(false), []);

  return (
    <div className={`ap-film ${className}`} aria-hidden="true">
      {poster && <Image src={poster} alt="" fill sizes={sizes} draggable={false} className="ap-film__poster" />}
      {!showStaticPoster && (
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          poster={poster}
          muted
          playsInline
          autoPlay={false}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          preload="metadata"
          tabIndex={-1}
          onLoadStart={handleLoadStart}
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onError={handleError}
          className="ap-film__video"
          data-loaded={isLoaded || undefined}
        />
      )}
    </div>
  );
}
