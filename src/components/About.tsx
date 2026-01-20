'use client';

import { motion, useInView } from 'framer-motion';
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = [
    { name: 'Frontend', items: techStack.frontend, icon: '◧' },
    { name: 'Backend', items: techStack.backend, icon: '◨' },
    { name: 'Mobile', items: techStack.mobile, icon: '◩' },
    { name: 'Tools', items: techStack.tools, icon: '◪' },
  ].filter(cat => cat.items.length > 0);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 md:py-48 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <span className="text-mono-400 dark:text-mono-600 text-sm tracking-[0.3em] uppercase">
            01 — About
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold text-mono-950 dark:text-mono-50 tracking-tight">
            <WordReveal text="Who I Am" />
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 mt-20">
          {/* Profile Picture + Bio */}
          <ScrollReveal direction="left" blur={true} delay={0.2}>
            {/* Profile Picture + First paragraph in horizontal layout */}
            <div className="flex items-start gap-6 md:gap-8 mb-8">
              {/* Profile Picture */}
              <motion.div
                className="relative group cursor-pointer flex-shrink-0"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Outer rotating ring on hover */}
                <motion.div 
                  className="absolute -inset-3 rounded-full border border-mono-300 dark:border-mono-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Static decorative ring */}
                <div className="absolute -inset-1.5 rounded-full border border-mono-200 dark:border-mono-700" />
                
                {/* Image container - circular for symmetry */}
                <div className="relative w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-full shadow-xl shadow-mono-950/10 dark:shadow-mono-950/30">
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
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
                </div>
              </motion.div>
              
              {/* First paragraph beside image */}
              <p className="text-lg md:text-xl text-mono-700 dark:text-mono-300 leading-relaxed pt-2 text-justify">
                I&apos;m a 3rd-year BSIT student at Pamantasan ng Lungsod ng Valenzuela, passionate about building impactful software that solves real problems.
              </p>
            </div>
            <p className="mt-6 text-lg text-mono-600 dark:text-mono-400 leading-relaxed text-justify">
              From crafting elegant frontend experiences to architecting robust backend systems and integrating AI solutions, 
              I bring a full-stack perspective to every project. A consistent honor student with proven leadership experience 
              from years of student council participation.
            </p>
            <p className="mt-6 text-lg text-mono-600 dark:text-mono-400 leading-relaxed text-justify">
              I specialize in Python, TypeScript, and modern frameworks like Next.js, Django, and FastAPI—with growing expertise 
              in AI/ML integration using OpenAI, Claude, and Azure AI services.
            </p>

            {/* Stats with staggered animation */}
            <StaggerContainer className="mt-12 flex flex-wrap gap-8 md:gap-12" staggerDelay={0.15}>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-mono-950 dark:text-mono-50">4+</span>
                  <p className="mt-2 text-sm text-mono-500 uppercase tracking-wider">Years Coding</p>
                </div>
              </StaggerItem>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-mono-950 dark:text-mono-50">10+</span>
                  <p className="mt-2 text-sm text-mono-500 uppercase tracking-wider">Projects</p>
                </div>
              </StaggerItem>
              <StaggerItem direction="up" blur={true} scale={true}>
                <div>
                  <span className="text-4xl md:text-5xl font-bold text-mono-950 dark:text-mono-50">{liveDeployCount}</span>
                  <p className="mt-2 text-sm text-mono-500 uppercase tracking-wider">Live Deploys</p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </ScrollReveal>

          {/* Tech Stack Cloud with stagger */}
          <ScrollReveal direction="right" blur={true} delay={0.3}>
            <div className="space-y-8">
              <h3 className="text-sm tracking-[0.3em] uppercase text-mono-500 dark:text-mono-400">
                Tech Stack
              </h3>

              {categories.map((category, catIndex) => (
                <StaggerContainer key={category.name} staggerDelay={0.05}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl text-mono-400">{category.icon}</span>
                    <span className="text-mono-600 dark:text-mono-400 font-medium">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((tech) => (
                      <StaggerItem key={tech} direction="up" blur={true} scale={true}>
                        <motion.span
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-4 py-2 bg-mono-100 dark:bg-mono-800 text-mono-700 dark:text-mono-300 rounded-full text-sm font-medium cursor-pointer transition-colors hover:bg-mono-200 dark:hover:bg-mono-700 select-none"
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
