'use client';

import { useRef } from 'react';
import DisplayCards, { type DeploymentData } from './ui/display-cards';
import { Brain, Building2, ClipboardCheck, Gamepad2, Utensils, Globe } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';
import { LivePreview, type LivePreviewProject } from './ui/live-preview';
import { PINNED_PROJECTS } from '@/data/projects';

const ICONS: Record<string, React.ReactNode> = {
  'mathpulse-ai': <Brain className="size-5 text-mono-300" />,
  'v-serve-arta-feedback-analytics': <ClipboardCheck className="size-5 text-mono-300" />,
  'gamecon-system': <Gamepad2 className="size-5 text-mono-300" />,
  'digital-classroom-assignment': <Building2 className="size-5 text-mono-300" />,
  'zhi-wei-zai': <Utensils className="size-5 text-mono-300" />,
};

export function Deployments() {
  const ref = useRef<HTMLElement>(null);
  const displayCardsData: DeploymentData[] = PINNED_PROJECTS.map((project) => ({
    title: project.title,
    url: project.liveUrlCandidates[0],
    repoName: project.githubRepo || project.title,
    lastCommit: 'Pinned project',
    icon: ICONS[project.id] || <Globe className="size-4 text-mono-300" />,
  }));
  const livePreviewData: LivePreviewProject[] = PINNED_PROJECTS.map((project) => ({
    id: project.id,
    title: project.title,
    url: project.liveUrlCandidates[0],
    thumbnail: project.thumbnail,
    description: project.description,
    icon: ICONS[project.id],
    tags: project.tags,
  }));

  return (
    <section ref={ref} id="deployments" className="relative py-32 md:py-48 px-6 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full border border-mono-800 opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-mono-900 rounded-full opacity-30 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          <div>
            <ScrollReveal direction="left" blur={true} delay={0}>
              <span className="text-mono-500 text-sm tracking-[0.3em] uppercase">04 / Live</span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-mono-50 tracking-tight leading-tight">
                <WordReveal text="Deployed &" /><br /><span className="text-mono-400"><WordReveal text="Running" delay={0.3} /></span>
              </h2>
              <p className="mt-6 text-lg text-mono-400 max-w-lg leading-relaxed">Live deployments showcasing real-world applications from AI-powered learning platforms to government feedback systems.</p>
            </ScrollReveal>
            <StaggerContainer className="mt-10 flex gap-10" staggerDelay={0.15}>
              <StaggerItem direction="up" blur={true} scale={true}><div><span className="text-3xl md:text-4xl font-bold text-mono-100">{PINNED_PROJECTS.length}</span><p className="mt-1 text-sm text-mono-500 uppercase tracking-wider">Pinned Apps</p></div></StaggerItem>
              <StaggerItem direction="up" blur={true} scale={true}><div><span className="text-3xl md:text-4xl font-bold text-mono-100">99.9%</span><p className="mt-1 text-sm text-mono-500 uppercase tracking-wider">Uptime</p></div></StaggerItem>
            </StaggerContainer>
          </div>
          <ScrollReveal direction="right" blur={true} scale={true} delay={0.2}>
            <div className="hidden lg:flex justify-center lg:justify-end lg:-translate-y-20 lg:-translate-x-52"><DisplayCards deployments={displayCardsData} /></div>
          </ScrollReveal>
        </div>
        <div className="mt-24 lg:mt-32">
          <ScrollReveal direction="up" blur={true} delay={0.1}><div className="text-center mb-10"><span className="text-mono-500 text-sm tracking-[0.2em] uppercase">Interactive Preview</span><h3 className="mt-2 text-2xl md:text-3xl font-bold text-mono-100">Explore Live</h3></div></ScrollReveal>
          <ScrollReveal direction="up" blur={true} scale={true} delay={0.2}><LivePreview projects={livePreviewData} className="max-w-4xl mx-auto" /></ScrollReveal>
        </div>
      </div>
    </section>
  );
}
