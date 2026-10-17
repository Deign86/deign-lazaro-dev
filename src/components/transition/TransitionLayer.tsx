'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import './transition.css';

// Full-screen sting that plays when the visitor switches between the portfolio (/) and the
// company portfolio (/alpha-premier). It lives in the root layout, so it survives the client
// navigation that happens underneath it: the route changes while the sting covers the screen,
// and the sting's last frame is the destination's ground colour, so lifting it shows no seam.
//
// Videos (made from docs/alpha-premier/claude-motion-prompt.md) are optional:
//   public/alpha-premier/stings/sting-{in|out}-{16x9|9x16}.mp4 (+ -audio.m4a)
// Without them, a CSS version of the same idea plays instead.

export type StingDirection = 'in' | 'out';
type Phase = 'idle' | 'cover' | 'reveal';

const EVENT = 'ap:transition';
const COVER_MS = { in: 2000, out: 1500 } as const; // when the screen is fully covered and it is safe to navigate
const CSS_TOTAL_MS = { in: 1900, out: 1500 } as const;

export function requestTransition(href: string, direction: StingDirection) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { href, direction } }));
}

function stingSrc(direction: StingDirection) {
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  return `/alpha-premier/stings/sting-${direction}-${portrait ? '9x16' : '16x9'}.mp4`;
}

export function TransitionLayer() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('idle');
  const [direction, setDirection] = useState<StingDirection>('in');
  const [useVideo, setUseVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timers = useRef<number[]>([]);
  const pendingHref = useRef<string | null>(null);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const finish = useCallback(() => {
    clearTimers();
    audioRef.current?.pause();
    setPhase('reveal');
    timers.current.push(window.setTimeout(() => setPhase('idle'), 420));
  }, []);

  const navigate = useCallback(() => {
    if (!pendingHref.current) return;
    router.push(pendingHref.current, { scroll: true });
    pendingHref.current = null;
  }, [router]);

  const skip = useCallback(() => {
    navigate();
    finish();
  }, [navigate, finish]);

  useEffect(() => {
    const onRequest = (event: Event) => {
      const { href, direction: dir } = (event as CustomEvent<{ href: string; direction: StingDirection }>).detail;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href);
        return;
      }
      clearTimers();
      pendingHref.current = href;
      setDirection(dir);
      setPhase('cover');

      const video = videoRef.current;
      const src = stingSrc(dir);
      let started = false;
      const startCssFallback = () => {
        if (started) return;
        started = true;
        setUseVideo(false);
        timers.current.push(window.setTimeout(navigate, CSS_TOTAL_MS[dir] * 0.55));
        timers.current.push(window.setTimeout(finish, CSS_TOTAL_MS[dir]));
      };

      if (!video) {
        startCssFallback();
        return;
      }
      video.src = src;
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0;
      video.onended = finish;
      video.onerror = startCssFallback;
      video
        .play()
        .then(() => {
          if (started) return;
          started = true;
          setUseVideo(true);
          timers.current.push(window.setTimeout(navigate, COVER_MS[dir]));
          // The click that started this is a user gesture, so the sting's sound may play.
          const audio = new Audio(src.replace(/-(16x9|9x16)\.mp4$/, '-audio.m4a'));
          audio.volume = 0.7;
          audio.play().catch(() => {});
          audioRef.current = audio;
        })
        .catch(startCssFallback);
      // If the video has not started within 350ms (missing file, slow network), fall back.
      timers.current.push(window.setTimeout(startCssFallback, 350));
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && pendingHref.current !== null) skip();
    };

    window.addEventListener(EVENT, onRequest);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(EVENT, onRequest);
      window.removeEventListener('keydown', onKey);
      clearTimers();
    };
  }, [router, navigate, finish, skip]);

  return (
    <div
      className="sting"
      data-phase={phase}
      data-direction={direction}
      data-mode={useVideo ? 'video' : 'css'}
      aria-hidden={phase === 'idle'}
    >
      <video ref={videoRef} className="sting__video" muted playsInline preload="none" aria-hidden="true" />
      <div className="sting__css" aria-hidden="true">
        <div className="sting__window" />
        <div className="sting__window" />
        <div className="sting__window" />
        <div className="sting__window" />
        <div className="sting__field" />
      </div>
      {phase === 'cover' && (
        <button type="button" className="sting__skip" onClick={skip}>
          Skip
        </button>
      )}
    </div>
  );
}
