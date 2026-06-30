'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, MouseEvent, KeyboardEvent } from 'react';
import type { ProcessedRepo } from '@/lib/github';

interface ProjectCardProps {
  repo: ProcessedRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    
    // Spotlight position
    setSpotlightPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardClick = () => {
    window.open(repo.url, '_blank', 'noopener,noreferrer');
  };

  const handleCardKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <motion.article
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Open ${repo.displayName} on GitHub`}
      className="group relative h-full cursor-pointer rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
    >
      {/* Spotlight effect layer */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[1.5rem] transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(460px circle at ${spotlightPosition.x}px ${spotlightPosition.y}px, rgba(255, 255, 255, 0.08), transparent 44%)`,
        }}
      />
      
      <div
        className="relative h-full overflow-hidden rounded-[1.5rem] border border-mono-800 bg-mono-950/70 p-6 transition-all duration-500 hover:border-mono-500 hover:bg-mono-900/80 hover:shadow-2xl hover:shadow-mono-950/50 md:p-8"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mono-300/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-[10px] uppercase tracking-[0.32em] text-mono-500">
            Repository / {repo.category}
          </span>

          {/* External links */}
          <div className="flex items-center gap-2">
            {repo.demoUrl && (
              <a
                href={repo.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg p-2 text-mono-400 transition-colors hover:bg-mono-800 hover:text-mono-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
                aria-label="View live demo"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-lg p-2 text-mono-400 transition-colors hover:bg-mono-800 hover:text-mono-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
              aria-label="View on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-4 max-w-2xl text-2xl font-bold tracking-tight text-mono-100 transition-colors group-hover:text-mono-50 md:text-4xl">
          {repo.displayName}
        </h3>

        {/* Description */}
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-mono-400 md:text-base">
          {repo.description}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-mono-800 pt-4">
          {/* Tech tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-mono-800 px-3 py-1 text-xs font-medium text-mono-300">
              {repo.language}
            </span>
            {repo.topics.slice(0, 2).map((topic) => (
              <span
                key={topic}
                className="rounded-md border border-mono-700 bg-mono-850 px-3 py-1 text-xs text-mono-400"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Stars */}
          {repo.stars > 0 && (
            <div className="flex items-center gap-1 text-mono-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-sm">{repo.stars}</span>
            </div>
          )}
        </div>

        {/* Hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-transparent to-transparent transition-all duration-500 group-hover:from-mono-800/40 group-hover:to-mono-950/40" />
      </div>
    </motion.article>
  );
}
