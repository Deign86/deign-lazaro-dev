'use client';

import { useRef } from 'react';
import DisplayCards, { type DeploymentData } from './ui/display-cards';
import { Brain, Building2, ClipboardCheck, Utensils, Globe } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';
import { LivePreview, type LivePreviewProject } from './ui/live-preview';
import type { DeploymentInfo } from '@/lib/github';

// Icon mapping for different project types (keys are lowercase)
const ICON_MAP: Record<string, React.ReactNode> = {
  'digital-classroom-assignment-for-plv-ceit-bldg--with-backend-': <Building2 className="size-4 text-mono-300" />,
  'v-serve-arta-feedback-analytics': <ClipboardCheck className="size-4 text-mono-300" />,
  'mathpulse-ai': <Brain className="size-4 text-mono-300" />,
  'zhi-wei-zai': <Utensils className="size-4 text-mono-300" />,
};

const ICON_MAP_LARGE: Record<string, React.ReactNode> = {
  'digital-classroom-assignment-for-plv-ceit-bldg--with-backend-': <Building2 className="size-5 text-mono-300" />,
  'v-serve-arta-feedback-analytics': <ClipboardCheck className="size-5 text-mono-300" />,
  'mathpulse-ai': <Brain className="size-5 text-mono-300" />,
  'zhi-wei-zai': <Utensils className="size-5 text-mono-300" />,
};

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: '2-digit' 
  }).replace(/\//g, '/');
}

// Format relative time
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

// Truncate repo name for display
function truncateRepoName(name: string): string {
  const maxLength = 20;
  if (name.length <= maxLength) return `Deign86/${name}`;
  return `Deign86/${name.slice(0, maxLength)}...`;
}

interface DeploymentsProps {
  deployments: DeploymentInfo[];
}

export function Deployments({ deployments }: DeploymentsProps) {
  const ref = useRef<HTMLElement>(null);

  // Transform deployment data for DisplayCards
  const displayCardsData: DeploymentData[] = deployments.map((d) => ({
    title: d.title,
    url: d.url,
    repoName: truncateRepoName(d.name),
    lastCommit: `Updated ${formatRelativeTime(d.updatedAt)}`,
    date: formatDate(d.updatedAt),
    icon: ICON_MAP[d.name.toLowerCase()] || <Globe className="size-4 text-mono-300" />,
  }));

  // Transform deployment data for LivePreview
  const livePreviewData: LivePreviewProject[] = deployments.map((d) => ({
    title: d.title,
    url: d.url,
    description: d.description,
    icon: ICON_MAP_LARGE[d.name.toLowerCase()] || <Globe className="size-5 text-mono-300" />,
    tags: d.tags,
  }));

  return (
    <section
      ref={ref}
      id="deployments"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full border border-mono-800 opacity-20" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-mono-900 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left side - Text content */}
          <div>
            <ScrollReveal direction="left" blur={true} delay={0}>
              <span className="text-mono-500 text-sm tracking-[0.3em] uppercase">
                04 / Live
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-mono-50 tracking-tight leading-tight">
                <WordReveal text="Deployed &" />
                <br />
                <span className="text-mono-400">
                  <WordReveal text="Running" delay={0.3} />
                </span>
              </h2>
              <p className="mt-6 text-lg text-mono-400 max-w-lg leading-relaxed">
                Live deployments showcasing real-world applications 
                from AI-powered learning platforms to government feedback systems.
              </p>
            </ScrollReveal>

            {/* Stats with staggered animation */}
            <StaggerContainer className="mt-10 flex gap-10" staggerDelay={0.15}>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-mono-100">{deployments.length}</span>
                  <p className="mt-1 text-sm text-mono-500 uppercase tracking-wider">Live Apps</p>
                </div>
              </StaggerItem>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-mono-100">99.9%</span>
                  <p className="mt-1 text-sm text-mono-500 uppercase tracking-wider">Uptime</p>
                </div>
              </StaggerItem>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-mono-100">Edge</span>
                  <p className="mt-1 text-sm text-mono-500 uppercase tracking-wider">Network</p>
                </div>
              </StaggerItem>
            </StaggerContainer>


          </div>

          {/* Right side - Display cards (hidden until lg screens) */}
          <ScrollReveal direction="right" blur={true} scale={true} delay={0.2}>
            <div className="hidden lg:flex justify-center lg:justify-end lg:-translate-y-20 lg:-translate-x-52">
              <DisplayCards deployments={displayCardsData} />
            </div>
          </ScrollReveal>
        </div>

        {/* Live Preview Section */}
        <div className="mt-24 lg:mt-32">
          <ScrollReveal direction="up" blur={true} delay={0.1}>
            <div className="text-center mb-10">
              <span className="text-mono-500 text-sm tracking-[0.2em] uppercase">
                Interactive Preview
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-mono-100">
                Explore Live
              </h3>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="up" blur={true} scale={true} delay={0.2}>
            <LivePreview projects={livePreviewData} className="max-w-4xl mx-auto" />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
