'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import type { ProcessedRepo } from '@/lib/github';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';

interface ProjectsProps {
  repos: ProcessedRepo[];
}

export function Projects({ repos }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
    >
      {/* Parallax background element */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full border border-mono-200 dark:border-mono-800 opacity-20 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with text reveal */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="mb-20">
            <span className="text-mono-400 dark:text-mono-600 text-sm tracking-[0.3em] uppercase">
              03 — Work
            </span>
            <h2 className="mt-4 text-4xl md:text-6xl font-bold text-mono-950 dark:text-mono-50 tracking-tight">
              <WordReveal text="Selected Builds" />
            </h2>
            <p className="mt-4 text-lg text-mono-600 dark:text-mono-400 max-w-xl">
              A collection of projects I&apos;ve built, from full-stack applications to experiments with new technologies.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects grid with staggered animations */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" staggerDelay={0.1}>
          {repos.map((repo, index) => (
            <StaggerItem key={repo.id} direction="up" blur={true} scale={true}>
              <ProjectCard repo={repo} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View all link */}
        <ScrollReveal direction="up" blur={true} delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href="https://github.com/Deign86?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-mono-600 dark:text-mono-400 hover:text-mono-900 dark:hover:text-mono-100 transition-colors cursor-pointer"
            >
              <span className="text-lg">View all repositories on GitHub</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
