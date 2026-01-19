'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import DisplayCards, { type DeploymentData } from './ui/display-cards';
import { Rocket, Brain, Building2, ClipboardCheck } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';

// Your Vercel deployments data
const deployments: DeploymentData[] = [
  {
    title: 'MathPulse AI',
    url: 'https://mathpulse-ai.vercel.app',
    repoName: 'Deign86/mathpulse-ai',
    lastCommit: 'Merge pull request #3 from Deign86/vercel-web-analyt...',
    date: '3h ago',
    icon: <Brain className="size-4 text-mono-300" />,
  },
  {
    title: 'PLV CEIT Classroom',
    url: 'https://digital-classroom-reservation-for-plv.vercel.app',
    repoName: 'Deign86/Digital-Classroom...',
    lastCommit: 'Improve audit log details: show relevant fields only...',
    date: '12/16/25',
    icon: <Building2 className="size-4 text-mono-300" />,
  },
  {
    title: 'RCBC Debt Tracker',
    url: 'https://rcbc-debt-tracker.vercel.app',
    repoName: 'Deign86/rcbc-debt-tracker',
    lastCommit: 'fix: Position offline indicator above mobile nav bar',
    date: '11/28/25',
    icon: <Rocket className="size-4 text-mono-300" />,
  },
  {
    title: 'V-Serve ARTA Feedback',
    url: 'https://v-serve-arta-feedback.vercel.app',
    repoName: 'Deign86/V-Serve-ARTA-Fe...',
    lastCommit: 'fix: remove unused local variables in suggestions...',
    date: '12/16/25',
    icon: <ClipboardCheck className="size-4 text-mono-300" />,
  },
];

export function Deployments() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
              <span className="text-mono-500 dark:text-mono-500 text-sm tracking-[0.3em] uppercase">
                Live Projects
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold text-mono-50 tracking-tight leading-tight">
                <WordReveal text="Deployed &" />
                <br />
                <span className="text-mono-400">
                  <WordReveal text="Running" delay={0.3} />
                </span>
              </h2>
              <p className="mt-6 text-lg text-mono-400 max-w-lg leading-relaxed">
                These projects are live on Vercel, showcasing real-world applications 
                from AI-powered learning platforms to government feedback systems.
              </p>
            </ScrollReveal>

            {/* Stats with staggered animation */}
            <StaggerContainer className="mt-10 flex gap-10" staggerDelay={0.15}>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-mono-100">4</span>
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

            {/* Vercel badge */}
            <ScrollReveal direction="up" blur={true} delay={0.4}>
              <div className="mt-10 flex items-center gap-3">
                <span className="text-mono-500 text-sm">Powered by</span>
                <svg className="h-5 text-mono-300" viewBox="0 0 283 64" fill="currentColor">
                  <path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" />
                </svg>
              </div>
            </ScrollReveal>
          </div>

          {/* Right side - Display cards */}
          <ScrollReveal direction="right" blur={true} scale={true} delay={0.2}>
            <div className="flex justify-center lg:justify-end">
              <DisplayCards deployments={deployments} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
