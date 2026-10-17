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
// wait: flat start colour while the video loads · video: the rendered sting · css: in-code fallback
type Mode = 'wait' | 'video' | 'css';

const EVENT = 'ap:transition';
const COVER_MS = { in: 2000, out: 1500 } as const; // when the screen is fully covered and it is safe to navigate
const CSS_TOTAL_MS = { in: 1900, out: 1500 } as const;
const START_TIMEOUT_MS = 1200; // how long to hold the flat cover for the video before using the CSS version

export function requestTransition(href: string, direction: StingDirection) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { href, direction } }));
}

// Only 16:9 stings exist; on portrait screens the video is cropped to fill (object-fit: cover).
export function stingSrc(direction: StingDirection) {
  return `/alpha-premier/stings/sting-${direction}-16x9.mp4`;
}

export function stingAudioSrc(direction: StingDirection) {
  return `/alpha-premier/stings/sting-${direction}-audio.m4a`;
}

export function TransitionLayer() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('idle');
  const [direction, setDirection] = useState<StingDirection>('in');
  const [mode, setMode] = useState<Mode>('wait');
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
      setMode('wait');
      setPhase('cover');

      const video = videoRef.current;
      let settled = false;
      const startCssFallback = () => {
        if (settled) return;
        settled = true;
        video?.pause();
        setMode('css');
        timers.current.push(window.setTimeout(navigate, CSS_TOTAL_MS[dir] * 0.55));
        timers.current.push(window.setTimeout(finish, CSS_TOTAL_MS[dir]));
      };

      if (!video) {
        startCssFallback();
        return;
      }
      video.src = stingSrc(dir);
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0;
      video.onended = finish;
      video.onerror = startCssFallback;
      video
        .play()
        .then(() => {
          if (settled) {
            video.pause();
            return;
          }
          settled = true;
          setMode('video');
          timers.current.push(window.setTimeout(navigate, COVER_MS[dir]));
          // Still inside the click's user activation, so the sting's sound may play with the picture.
          const audio = new Audio(stingAudioSrc(dir));
          audio.volume = 0.7;
          audio.play().catch(() => {});
          audioRef.current = audio;
        })
        .catch(startCssFallback);
      // Hold the flat cover while the video loads; on a slow connection use the CSS version instead.
      timers.current.push(window.setTimeout(startCssFallback, START_TIMEOUT_MS));
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
      data-mode={mode}
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
