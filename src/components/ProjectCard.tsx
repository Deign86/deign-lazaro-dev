'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, MouseEvent, KeyboardEvent } from 'react';
import type { PinnedProject } from '@/data/projects';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: PinnedProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const githubUrl = project.githubRepo ? `https://github.com/${project.githubRepo}` : undefined;
  const primaryUrl = project.liveUrlCandidates[0];
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
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
    window.open(primaryUrl || githubUrl, '_blank', 'noopener,noreferrer');
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
      aria-label={`Open ${project.title}`}
      className="group relative h-full cursor-pointer rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-3xl transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlightPosition.x}px ${spotlightPosition.y}px, rgba(255, 255, 255, 0.12), transparent 45%)`,
        }}
      />

      <div
        className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-mono-950/80 p-7 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-white/30 hover:bg-mono-900/80 md:p-8"
        style={{ transform: 'translateZ(15px)' }}
      >
        <div>
          {/* Editorial Card Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-mono-400">
                #{String(project.order).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-mono-300 font-mono font-medium">
                {project.tags[0] || 'Web Application'}
              </span>
            </div>

            {/* Quick Action Links */}
            <div className="flex items-center gap-2">
              {primaryUrl && (
                <a
                  href={primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg border border-white/10 bg-mono-900/80 p-2 text-mono-300 transition-colors hover:bg-mono-50 hover:text-mono-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
                  aria-label="View live deployment"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg border border-white/10 bg-mono-900/80 p-2 text-mono-300 transition-colors hover:bg-mono-50 hover:text-mono-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
                  aria-label="View source on GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl font-bold tracking-tight text-mono-50 transition-colors group-hover:text-white md:text-3xl">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="mt-3 text-sm leading-relaxed text-mono-300 font-light md:text-base">
            {project.description}
          </p>
        </div>

        {/* Card Footer: Tech Tags & Status */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-mono-900/90 px-2.5 py-1 text-[11px] font-mono text-mono-200 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-mono-400 font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Deployed</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
