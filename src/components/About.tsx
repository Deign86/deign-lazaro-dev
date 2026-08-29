'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/scroll-reveal';
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

        {/* Signal Strip Metrics */}
        <ScrollReveal direction="up" blur={true} delay={0.1}>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {signalStrip.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between rounded-2xl border border-white/10 bg-mono-950/60 p-6 backdrop-blur-md shadow-xl"
              >
                <span className="text-3xl font-bold tracking-tight text-mono-50 md:text-4xl">
                  {item.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.24em] text-mono-300 font-mono font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Main Content: Bio & Tech Architecture */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Column: Portrait & Narrative */}
          <ScrollReveal direction="left" blur={true} delay={0.2}>
            <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Profile Portrait with Luxury Editorial Frame */}
                <motion.div
                  className="group relative flex-shrink-0"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-44 w-36 overflow-hidden rounded-2xl border border-white/20 bg-mono-900 shadow-2xl">
                    <Image
                      src="/profile.jpg"
                      alt="Deign Lazaro"
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="144px"
                      priority
                    />
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-mono-100 font-light md:text-xl">
                    4th-year BSIT student at <span className="text-mono-50 font-semibold underline decoration-white/30">Pamantasan ng Lungsod ng Valenzuela</span>, creating scalable software that turns complex workflows into effortless interfaces.
                  </p>
                  <p className="text-sm leading-relaxed text-mono-300">
                    With a background in academic leadership and student council, I pair technical precision with clear communication.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-mono-300 font-light border-t border-white/10 pt-5 md:text-base">
                <p>
                  Specializing in Python, TypeScript, Next.js, FastAPI, and Django—integrating modern LLM workflows, agent frameworks, and reactive client architectures into production-ready platforms.
                </p>
              </div>

              {/* Staggered Experience Counters */}
              <StaggerContainer className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5" staggerDelay={0.1}>
                <StaggerItem direction="up" blur={true} scale={true}>
                  <div className="rounded-xl border border-white/10 bg-mono-900/60 p-4 text-center">
                    <span className="text-2xl font-bold text-mono-50 md:text-3xl">4+</span>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mono-400 font-mono">Years Coding</p>
                  </div>
                </StaggerItem>
                <StaggerItem direction="up" blur={true} scale={true}>
                  <div className="rounded-xl border border-white/10 bg-mono-900/60 p-4 text-center">
                    <span className="text-2xl font-bold text-mono-50 md:text-3xl">10+</span>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mono-400 font-mono">Projects</p>
                  </div>
                </StaggerItem>
                <StaggerItem direction="up" blur={true} scale={true}>
                  <div className="rounded-xl border border-white/10 bg-mono-900/60 p-4 text-center">
                    <span className="text-2xl font-bold text-mono-50 md:text-3xl">{liveDeployCount}</span>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-mono-400 font-mono">Live Deploys</p>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </ScrollReveal>

          {/* Right Column: Tech Capability Matrix */}
          <ScrollReveal direction="right" blur={true} delay={0.3}>
            <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl">
              <h3 className="text-xs uppercase tracking-[0.3em] text-mono-300 font-mono font-medium">
                Technical Capabilities
              </h3>

              <div className="space-y-5">
                {categories.map((category) => (
                  <div key={category.name} className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-mono-400 text-sm">{category.icon}</span>
                      <span className="text-xs uppercase tracking-[0.2em] text-mono-200 font-medium font-mono">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border border-white/10 bg-mono-900/90 px-3 py-1 text-xs text-mono-200 font-medium transition-colors hover:border-white/30 hover:text-mono-50"
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
