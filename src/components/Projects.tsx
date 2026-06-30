'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
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
  const workIndex = repos.slice(0, 5).map((repo, index) => ({
    id: repo.id,
    number: String(index + 1).padStart(2, '0'),
    name: repo.displayName,
    language: repo.language,
  }));
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-6 py-28 md:py-40"
    >
      {/* Parallax background element */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute right-0 top-1/4 h-[520px] w-[38vw] min-w-[280px] border-y border-l border-mono-800 opacity-20"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header with text reveal */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="mb-16 grid gap-8 border-t border-mono-800 pt-8 lg:grid-cols-[0.45fr_1fr]">
            <span className="text-sm uppercase tracking-[0.3em] text-mono-600">
              05 / Work
            </span>
            <div>
              <h2 className="text-5xl font-bold tracking-tight text-mono-50 md:text-7xl">
                <WordReveal text="Selected builds" />
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mono-400">
                Production apps, automation experiments, and repository work arranged as a living build index.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[0.34fr_1fr]">
          <ScrollReveal direction="left" blur={true} delay={0.1}>
            <aside className="sticky top-28 hidden lg:block">
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-mono-500">Work index</p>
              <div className="border-y border-mono-800">
                {workIndex.map((item) => (
                  <a
                    key={item.id}
                    href={`#project-${item.id}`}
                    className="group grid grid-cols-[3rem_1fr] gap-3 border-b border-mono-850 py-4 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
                  >
                    <span className="text-xs tabular-nums text-mono-600 group-hover:text-mono-100">
                      {item.number}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-mono-300 transition-colors group-hover:text-mono-50">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-mono-600">
                        {item.language}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </aside>
          </ScrollReveal>

          {/* Projects grid with staggered animations */}
          <StaggerContainer className="grid gap-5 md:grid-cols-2 md:gap-6" staggerDelay={0.1}>
            {repos.map((repo, index) => (
              <StaggerItem
                key={repo.id}
                direction="up"
                blur={true}
                scale={true}
                className={index === 0 ? "h-full md:col-span-2" : "h-full"}
              >
                <div id={`project-${repo.id}`} className="scroll-mt-28">
                  <ProjectCard repo={repo} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* View all link */}
        <ScrollReveal direction="up" blur={true} delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href="https://github.com/Deign86?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-mono-400 hover:text-mono-100 transition-colors cursor-pointer"
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
