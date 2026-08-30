'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ScrollReveal } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';

interface TechStackProps {
  frontend: string[];
  backend: string[];
  mobile: string[];
  tools: string[];
}

export function About({ techStack, liveDeployCount }: { techStack: TechStackProps; liveDeployCount: number }) {
  const ref = useRef<HTMLElement>(null);

  const categories = [
    { name: 'Frontend', items: techStack.frontend, icon: '◧' },
    { name: 'Backend', items: techStack.backend, icon: '◨' },
    { name: 'Mobile', items: techStack.mobile, icon: '◩' },
    { name: 'Tools & DevOps', items: techStack.tools, icon: '◪' },
  ].filter((cat) => cat.items.length > 0);

  const signalStrip = [
    { value: 'BSIT', label: '4th year' },
    { value: 'PLV', label: 'Valenzuela' },
    { value: `${liveDeployCount}`, label: 'live deploys' },
    { value: 'AI', label: 'automation' },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="relative px-6 py-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
            <span className="text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">
              02 / Profile
            </span>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-mono-50 md:text-6xl drop-shadow">
                <WordReveal text="Builder Profile" />
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mono-200 font-light md:text-lg">
                Engineering at the intersection of modern product design, robust system architecture, and autonomous AI tooling.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Portrait & Leadership Narrative */}
          <ScrollReveal direction="up" blur={true} delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative h-44 w-36 flex-shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-mono-900 shadow-2xl">
                    <Image
                      src="/profile.jpg"
                      alt="Deign Lazaro"
                      fill
                      className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                      sizes="144px"
                      priority
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-mono-50">Deign Grey Lazaro</h3>
                    <p className="text-sm leading-relaxed text-mono-200 font-light">
                      4th-year BSIT student at <span className="text-mono-50 font-semibold underline decoration-white/30">Pamantasan ng Lungsod ng Valenzuela</span>, creating scalable software with autonomous AI tooling.
                    </p>
                    <p className="text-xs leading-relaxed text-mono-300">
                      With a background in academic leadership and student council, I pair technical precision with clear communication.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 border-t border-white/10 pt-6">
                  {signalStrip.map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-mono-900/60 p-3 text-center">
                      <span className="text-xl font-bold text-mono-50">{item.value}</span>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-mono-400 font-mono mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Tech Capability Matrix */}
          <ScrollReveal direction="up" blur={true} delay={0.2}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl">
              <h3 className="text-xs uppercase tracking-[0.3em] text-mono-300 font-mono font-medium mb-6">Technical Capabilities</h3>
              <div className="space-y-5">
                {categories.map((cat) => (
                  <div key={cat.name} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-mono-400 text-xs">{cat.icon}</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-mono-200 font-mono font-medium">{cat.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-mono-900/90 px-3 py-1 text-xs text-mono-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
