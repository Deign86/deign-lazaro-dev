'use client';

import { useRef } from 'react';
import { Brain, Building2, ClipboardCheck, Gamepad2, Utensils, Globe } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { PINNED_PROJECTS } from '@/data/projects';

const ICONS: Record<string, React.ReactNode> = {
  'mathpulse-ai': <Brain className="size-5 text-mono-200" />,
  'v-serve-arta-feedback-analytics': <ClipboardCheck className="size-5 text-mono-200" />,
  'gamecon-system': <Gamepad2 className="size-5 text-mono-200" />,
  'digital-classroom-assignment': <Building2 className="size-5 text-mono-200" />,
  'zhi-wei-zai': <Utensils className="size-5 text-mono-200" />,
  'apg-website': <Globe className="size-5 text-mono-200" />,
};

export function Deployments() {
  const ref = useRef<HTMLElement>(null);

  const galleryData = PINNED_PROJECTS.map((project) => ({
    id: project.id,
    title: project.title,
    url: project.liveUrlCandidates[0],
    githubUrl: project.githubRepo ? `https://github.com/${project.githubRepo}` : null,
    thumbnail: project.thumbnail,
    description: project.description,
    icon: ICONS[project.id] || <Globe className="size-4 text-mono-200" />,
    tags: project.tags,
  }));

  return (
    <section ref={ref} id="deployments" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
            <span className="text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">
              04 / Live
            </span>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-mono-50 md:text-6xl drop-shadow">
                <WordReveal text="Deployed & Running" />
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mono-200 font-light md:text-lg">
                Production web applications actively serving users — screenshot gallery with live deployment links.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Live Metrics */}
        <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-3" staggerDelay={0.1}>
          <StaggerItem direction="up" blur={true}>
            <div className="rounded-2xl border border-white/10 bg-mono-950/60 p-5 backdrop-blur-sm shadow-xl">
              <span className="text-2xl font-bold text-mono-50">6 / 6</span>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mono-300 font-mono">
                Live Deployments
              </p>
            </div>
          </StaggerItem>
          <StaggerItem direction="up" blur={true}>
            <div className="rounded-2xl border border-white/10 bg-mono-950/60 p-5 backdrop-blur-sm shadow-xl">
              <span className="text-2xl font-bold text-mono-50">99.9%</span>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mono-300 font-mono">
                Average Uptime
              </p>
            </div>
          </StaggerItem>
          <StaggerItem direction="up" blur={true}>
            <div className="rounded-2xl border border-white/10 bg-mono-950/60 p-5 backdrop-blur-sm shadow-xl">
              <span className="text-2xl font-bold text-mono-50">&lt; 200ms</span>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mono-300 font-mono">
                TTFB Response
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Screenshot gallery (static previews — no live iframes) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {galleryData.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-mono-950/60 shadow-xl backdrop-blur-sm transition-colors hover:border-white/25"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-mono-900">
                {project.thumbnail ? (
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-mono-400">
                    Screenshot coming soon
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center rounded-lg bg-mono-800 p-2 ring-1 ring-mono-700">
                    {project.icon}
                  </span>
                  <h3 className="truncate text-lg font-semibold text-mono-100">{project.title}</h3>
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-light text-mono-300">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-mono-700 bg-mono-800 px-2 py-0.5 text-[11px] font-medium text-mono-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-mono-50 px-3 py-2 text-sm font-medium text-mono-950 transition-colors hover:bg-white"
                  >
                    Visit live <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source on GitHub`}
                      className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-mono-900 px-3 py-2 text-mono-200 transition-colors hover:bg-mono-800"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
