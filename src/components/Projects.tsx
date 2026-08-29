'use client';

import { useRef } from 'react';
import { ProjectCard } from './ProjectCard';
import { PINNED_PROJECTS } from '@/data/projects';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const workIndex = PINNED_PROJECTS.map((project) => ({
    id: project.id,
    number: String(project.order).padStart(2, '0'),
    name: project.title,
    language: project.tags[0] || 'Web',
  }));

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden px-6 py-28 md:py-36"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="mb-10 grid gap-8 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
            <span className="text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">
              05 / Work
            </span>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-mono-50 md:text-6xl drop-shadow">
                <WordReveal text="Selected Builds" />
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mono-200 font-light md:text-lg">
                Production web apps, intelligent automation platforms, and open-source tools crafted with meticulous frontend and backend architecture.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-[0.3fr_1fr]">
          {/* Sticky Left Editorial Index */}
          <ScrollReveal direction="left" blur={true} delay={0.1}>
            <aside className="sticky top-28 hidden rounded-3xl border border-white/10 bg-mono-950/60 p-6 backdrop-blur-md shadow-2xl lg:block">
              <p className="mb-4 text-[10px] uppercase tracking-[0.34em] text-mono-300 font-mono font-semibold">
                Index Navigation
              </p>
              <div className="border-t border-white/10">
                {workIndex.map((item) => (
                  <a
                    key={item.id}
                    href={`#project-${item.id}`}
                    className="group grid grid-cols-[2.5rem_1fr] gap-2 border-b border-white/5 py-3.5 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-300"
                  >
                    <span className="text-xs font-mono text-mono-400 transition-colors group-hover:text-mono-50">
                      {item.number}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-mono-200 transition-colors group-hover:text-mono-50">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] uppercase tracking-[0.24em] text-mono-400 font-mono">
                        {item.language}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </aside>
          </ScrollReveal>

          {/* Editorial Project Showcase Stream */}
          <StaggerContainer className="grid gap-6 md:grid-cols-2" staggerDelay={0.1}>
            {PINNED_PROJECTS.map((project, index) => (
              <StaggerItem
                key={project.id}
                direction="up"
                blur={true}
                scale={true}
                className={index === 0 ? 'h-full md:col-span-2' : 'h-full'}
              >
                <div id={`project-${project.id}`} className="scroll-mt-28 h-full">
                  <ProjectCard project={project} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* View all repositories on GitHub */}
        <ScrollReveal direction="up" blur={true} delay={0.2}>
          <div className="mt-16 text-center">
            <a
              href="https://github.com/Deign86?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-mono-950/60 px-8 py-3.5 text-xs uppercase tracking-[0.24em] font-mono text-mono-200 backdrop-blur-md shadow-xl transition-all hover:bg-mono-50 hover:text-mono-950 cursor-pointer"
            >
              <span>Explore All Repositories on GitHub</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
