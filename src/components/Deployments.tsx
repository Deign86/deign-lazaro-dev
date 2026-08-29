'use client';

import { useRef } from 'react';
import { Brain, Building2, ClipboardCheck, Gamepad2, Utensils, Globe } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';
import { LivePreview, type LivePreviewProject } from './ui/live-preview';
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

  const livePreviewData: LivePreviewProject[] = PINNED_PROJECTS.map((project) => ({
    id: project.id,
    title: project.title,
    url: project.liveUrlCandidates[0],
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
                Production web applications actively serving users, with real-time previewing and live deployment links.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Live Metrics */}
        <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-3" staggerDelay={0.1}>
          <StaggerItem direction="up" blur={true} scale={true}>
            <div className="flex items-baseline justify-between rounded-2xl border border-white/10 bg-mono-950/60 p-6 backdrop-blur-md shadow-xl">
              <span className="text-3xl font-bold tracking-tight text-mono-50 md:text-4xl">
                {PINNED_PROJECTS.length}
              </span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-mono-300 font-mono font-medium">
                Active Builds
              </span>
            </div>
          </StaggerItem>
          <StaggerItem direction="up" blur={true} scale={true}>
            <div className="flex items-baseline justify-between rounded-2xl border border-white/10 bg-mono-950/60 p-6 backdrop-blur-md shadow-xl">
              <span className="text-3xl font-bold tracking-tight text-mono-50 md:text-4xl">
                99.9%
              </span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-mono-300 font-mono font-medium">
                Uptime Target
              </span>
            </div>
          </StaggerItem>
          <StaggerItem direction="up" blur={true} scale={true}>
            <div className="flex items-baseline justify-between rounded-2xl border border-white/10 bg-mono-950/60 p-6 backdrop-blur-md shadow-xl">
              <span className="text-3xl font-bold tracking-tight text-mono-50 md:text-4xl">
                Global
              </span>
              <span className="text-[11px] uppercase tracking-[0.24em] text-mono-300 font-mono font-medium">
                Vercel & HF Edge
              </span>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Interactive Live App Preview */}
        <div className="mt-12">
          <ScrollReveal direction="up" blur={true} scale={true} delay={0.2}>
            <LivePreview projects={livePreviewData} className="mx-auto max-w-5xl" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
