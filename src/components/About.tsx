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
    { name: 'Tools', items: techStack.tools, icon: '◪' },
  ].filter(cat => cat.items.length > 0);

  const signalStrip = [
    { value: 'BSIT', label: '3rd year' },
    { value: 'PLV', label: 'Valenzuela' },
    { value: `${liveDeployCount}`, label: 'live deploys' },
    { value: 'AI', label: 'automation' },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="relative px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="grid gap-8 border-t border-mono-800 pt-8 lg:grid-cols-[0.45fr_1fr]">
            <span className="text-sm uppercase tracking-[0.3em] text-mono-600">
              02 / Profile
            </span>
            <div>
              <h2 className="text-5xl font-bold tracking-tight text-mono-50 md:text-7xl">
                <WordReveal text="Builder profile" />
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mono-400">
                A full-stack student builder working at the edge of product, automation, and practical AI tooling.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" blur={true} delay={0.1}>
          <div className="mt-12 grid border-y border-mono-800 sm:grid-cols-4">
            {signalStrip.map((item) => (
              <div key={item.label} className="flex items-end justify-between gap-4 border-mono-800 py-5 sm:border-r sm:px-5 last:border-r-0">
                <span className="text-4xl font-bold text-mono-100 md:text-5xl">{item.value}</span>
                <span className="max-w-[7rem] text-right text-[10px] uppercase tracking-[0.28em] text-mono-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-20 grid gap-16 md:gap-24 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Profile Picture + Bio */}
          <ScrollReveal direction="left" blur={true} delay={0.2}>
            {/* Profile Picture + First paragraph in horizontal layout */}
            <div className="mb-8 flex items-start gap-6 md:gap-8">
              {/* Profile Picture */}
              <motion.div
                className="group relative flex-shrink-0 cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Outer rotating ring on hover */}
                <motion.div 
                  className="absolute -inset-3 rounded-[2rem] border border-mono-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Static decorative ring */}
                <div className="absolute -inset-1.5 rounded-[1.55rem] border border-mono-700" />
                
                {/* Image container */}
                <div className="relative h-36 w-28 overflow-hidden rounded-[1.4rem] shadow-xl shadow-mono-950/30 md:h-48 md:w-36">
                  <Image
                    src="/profile.jpg"
                    alt="Deign Lazaro"
                    fill
                    className="object-cover object-[65%_65%] scale-[1.05] transition-transform duration-500 group-hover:scale-[1.1]"
                    sizes="(max-width: 768px) 128px, 160px"
                    priority
                  />
                  
                  {/* Subtle gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mono-950/10 via-transparent to-transparent" />
                  
                  {/* Inner border */}
                  <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
                </div>
              </motion.div>
              
              {/* First paragraph beside image */}
              <p className="max-w-prose pt-2 text-lg leading-relaxed text-mono-300 md:text-xl">
                I&apos;m a 3rd-year BSIT student at Pamantasan ng Lungsod ng Valenzuela, passionate about building impactful software that solves real problems.
              </p>
            </div>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-mono-400">
              From crafting elegant frontend experiences to architecting robust backend systems and integrating AI solutions, 
              I bring a full-stack perspective to every project. A consistent honor student with proven leadership experience 
              from years of student council participation.
            </p>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-mono-400">
              I specialize in Python, TypeScript, and modern frameworks like Next.js, Django, and FastAPI—with growing expertise 
               in AI/ML integration using Hermes Agent, open-source AI tooling, and the OpenAI/Claude APIs.
            </p>

            {/* Stats with staggered animation */}
            <StaggerContainer className="mt-12 flex flex-wrap gap-8 md:gap-12" staggerDelay={0.15}>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-mono-50">4+</span>
                  <p className="mt-2 text-sm text-mono-500 uppercase tracking-wider">Years Coding</p>
                </div>
              </StaggerItem>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-mono-50">10+</span>
                  <p className="mt-2 text-sm text-mono-500 uppercase tracking-wider">Projects</p>
                </div>
              </StaggerItem>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-mono-50">{liveDeployCount}</span>
                  <p className="mt-2 text-sm text-mono-500 uppercase tracking-wider">Live Deploys</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </ScrollReveal>

          {/* Tech Stack Cloud with stagger */}
          <ScrollReveal direction="right" blur={true} delay={0.3}>
            <div className="space-y-8 border-l border-mono-800 pl-6 md:pl-10">
              <h3 className="text-sm uppercase tracking-[0.3em] text-mono-400">
                Tech Stack
              </h3>

              {categories.map((category) => (
                <StaggerContainer key={category.name} staggerDelay={0.05}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl text-mono-400">{category.icon}</span>
                    <span className="text-mono-400 font-medium">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((tech) => (
                      <StaggerItem key={tech} direction="up" blur={true} scale={true}>
                        <motion.span
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="inline-block px-4 py-2 bg-mono-800 text-mono-300 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-mono-700 select-none"
                        >
                          {tech}
                        </motion.span>
                      </StaggerItem>
                    ))}
                  </div>
                </StaggerContainer>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
