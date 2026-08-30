'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowDown,
  Download,
  GraduationCap,
  Code,
  ChevronRight,
  Lightbulb,
  ExternalLink,
  Github,
} from 'lucide-react';
import { LiquidObject } from './LiquidObject';
import { KineticFrame } from './KineticFrame';
import { Navbar } from './Navbar';
import { GlassButton } from './ui/apple-tahoe-liquid-glass-button';
import { ContactForm } from './ui/contact-form';
import { PINNED_PROJECTS } from '@/data/projects';

interface TechStackProps {
  frontend: string[];
  backend: string[];
  mobile: string[];
  tools: string[];
}

interface SpatialPortfolioProps {
  techStack: TechStackProps;
  liveDeployCount: number;
}

export function useSpatialProgress() {
  return {
    progress: { get: () => 0 },
    smoothProgress: { get: () => 0 },
    reduceMotion: false,
  };
}

const disciplines = [
  'Full-stack systems',
  'AI automation',
  'Agentic tooling',
  'Production UI',
];

const heroMetrics = [
  ['04+', 'years coding'],
  ['10+', 'builds shipped'],
  ['AI', 'first workflow'],
];

const education = [
  {
    title: 'Bachelor of Science in Information Technology',
    organization: 'Pamantasan ng Lungsod ng Valenzuela',
    location: 'Valenzuela City, Philippines',
    period: '2023 – Present (4th Year)',
    highlights: ['Full-Stack Development', 'AI & Machine Learning', 'Software Engineering'],
  },
  {
    title: 'Senior High School — ICT Track',
    organization: 'Our Lady of Lourdes College',
    location: 'Valenzuela City, Philippines',
    period: '2020 – 2022',
    highlights: ['Information and Communications Technology', 'Programming Fundamentals'],
  },
  {
    title: 'Junior High School',
    organization: 'St. Louis College of Valenzuela',
    location: 'Valenzuela City, Philippines',
    period: '2016 – 2020',
    highlights: ['Student Council Member', 'Consistent Honor Student'],
  },
];

const initiatives = [
  {
    title: 'AI-Powered Automation Tools',
    organization: 'Personal & Open Source',
    period: 'Ongoing',
    description: [
      'Architecting automation workflows with Python and autonomous agent models',
      'Integrating Claude, OpenAI, Hermes Agent, and custom tool calling',
    ],
  },
  {
    title: 'Full-Stack Web Applications',
    organization: 'Production & Academic',
    period: 'Ongoing',
    description: [
      'Building performant web apps with Next.js, React 19, and Tailwind CSS',
      'Developing cross-platform mobile apps with Flutter and Firebase',
    ],
  },
];

const skillCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Dart', 'SQL'],
  },
  {
    name: 'Frameworks & Libraries',
    skills: ['FastAPI', 'Django', 'Next.js', 'React', 'Flask', 'Tailwind CSS', 'Flutter'],
  },
  {
    name: 'AI, LLM & Tooling',
    skills: ['Claude API', 'OpenAI API', 'Hermes Agent', 'LangChain', 'Hugging Face'],
  },
  {
    name: 'Infrastructure & Tools',
    skills: ['Git', 'Docker', 'Vercel', 'Firebase', 'VS Code', 'Postman'],
  },
];

const contactOptions = [
  {
    name: 'Viber',
    value: '09624180920',
    href: 'viber://chat?number=+639624180920',
    icon: () => (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.63 4.04 1.71 5.66L2.05 22l4.56-1.19c1.57.87 3.36 1.37 5.28 1.37h.01c5.46 0 9.91-4.45 9.91-9.91C21.81 6.45 17.36 2 12.04 2zm4.96 14.16c-.24.67-1.39 1.33-1.93 1.41-.51.08-1.16.11-1.88-.12-.43-.14-1-.35-1.72-.68-3.03-1.32-4.99-4.37-5.13-4.57-.14-.19-1.1-1.46-1.1-2.79 0-1.33.7-1.98.95-2.25.25-.27.55-.34.73-.34.18 0 .36.01.52.01.17 0 .39-.06.61.47.24.55.82 2 .89 2.14.07.15.12.32.02.51-.09.19-.14.31-.28.47-.14.17-.3.38-.43.51-.14.15-.29.31-.12.6.17.29.75 1.24 1.61 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.49.23.56.35.08.13.08.73-.17 1.41z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    value: 'Deign Grey Lazaro',
    href: 'https://www.linkedin.com/in/deign-grey-lazaro-2976a41b6/',
    icon: () => (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    value: '09624180920',
    href: 'https://wa.me/639624180920',
    icon: () => (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Deign86',
    icon: () => (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/deign-grey-lazaro-2976a41b6/',
    icon: () => (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export function SpatialPortfolio({ techStack, liveDeployCount }: SpatialPortfolioProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeResumeTab, setActiveResumeTab] = useState<'education' | 'skills'>('education');
  const [showContactForm, setShowContactForm] = useState(false);

  // Master Global Scroll Runway Progress: 0.0 -> 1.0 spanning entire 700vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.1,
    restDelta: 0.0001,
  });

  // Categories formatted for profile matrix
  const categories = [
    { name: 'Frontend', items: techStack.frontend, icon: '◧' },
    { name: 'Backend', items: techStack.backend, icon: '◨' },
    { name: 'Mobile', items: techStack.mobile, icon: '◩' },
    { name: 'Tools & DevOps', items: techStack.tools, icon: '◪' },
  ].filter((cat) => cat.items.length > 0);

  // Signal metrics
  const signalStrip = [
    { value: 'BSIT', label: '4th year' },
    { value: 'PLV', label: 'Valenzuela' },
    { value: `${liveDeployCount}`, label: 'live deploys' },
    { value: 'AI', label: 'automation' },
  ];

  // Work index
  const workIndex = PINNED_PROJECTS.map((project) => ({
    id: project.id,
    number: String(project.order).padStart(2, '0'),
    name: project.title,
    language: project.tags[0] || 'Web',
  }));

  // =========================================================================
  // SPATIAL SCENE CHOREOGRAPHY CURVES (Synchronized with Reference Interaction)
  // =========================================================================

  // SCENE 1: HERO (0% -> 20%)
  const heroOpacity = useTransform(smoothProgress, [0, 0.14, 0.20, 1], [1, 1, 0, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.20], ['0px', '-140px']);
  const heroScale = useTransform(smoothProgress, [0, 0.20], [1, 1.05]);
  const heroVisibility = useTransform(smoothProgress, (p) => (p <= 0.20 ? 'visible' : 'hidden') as React.CSSProperties['visibility']);
  const heroPointerEvents = useTransform(
    smoothProgress,
    (p) => (p <= 0.20 ? 'auto' : 'none') as React.CSSProperties['pointerEvents']
  );

  // SCENE 2: ABOUT / PROFILE & CAPABILITIES (18% -> 40%)
  const aboutOpacity = useTransform(smoothProgress, [0, 0.18, 0.24, 0.36, 0.40, 1], [0, 0, 1, 1, 0, 0]);
  const aboutLeftX = useTransform(smoothProgress, [0.18, 0.25, 0.36, 0.40], ['-120px', '0px', '0px', '-140px']);
  const aboutRightX = useTransform(smoothProgress, [0.18, 0.25, 0.36, 0.40], ['120px', '0px', '0px', '140px']);
  const aboutY = useTransform(smoothProgress, [0.18, 0.25, 0.36, 0.40], ['40px', '0px', '0px', '-50px']);
  const aboutScale = useTransform(smoothProgress, [0.18, 0.25, 0.36, 0.40], [0.94, 1, 1, 0.94]);
  const aboutVisibility = useTransform(smoothProgress, (p) => (p >= 0.18 && p <= 0.40 ? 'visible' : 'hidden') as React.CSSProperties['visibility']);
  const aboutPointerEvents = useTransform(
    smoothProgress,
    (p) => (p >= 0.18 && p <= 0.40 ? 'auto' : 'none') as React.CSSProperties['pointerEvents']
  );

  // SCENE 3: RESUME & ARCHIVE (38% -> 60%)
  const resumeOpacity = useTransform(smoothProgress, [0, 0.38, 0.44, 0.56, 0.60, 1], [0, 0, 1, 1, 0, 0]);
  const resumeX = useTransform(smoothProgress, [0.38, 0.45, 0.56, 0.60], ['-100px', '0px', '0px', '100px']);
  const resumeY = useTransform(smoothProgress, [0.38, 0.45, 0.56, 0.60], ['50px', '0px', '0px', '-50px']);
  const resumeScale = useTransform(smoothProgress, [0.38, 0.45, 0.56, 0.60], [0.94, 1, 1, 0.94]);
  const resumeVisibility = useTransform(smoothProgress, (p) => (p >= 0.38 && p <= 0.60 ? 'visible' : 'hidden') as React.CSSProperties['visibility']);
  const resumePointerEvents = useTransform(
    smoothProgress,
    (p) => (p >= 0.38 && p <= 0.60 ? 'auto' : 'none') as React.CSSProperties['pointerEvents']
  );

  // SCENE 4: SELECTED BUILDS & DEPLOYMENTS (58% -> 80%)
  const workOpacity = useTransform(smoothProgress, [0, 0.58, 0.64, 0.76, 0.80, 1], [0, 0, 1, 1, 0, 0]);
  const workAsideX = useTransform(smoothProgress, [0.58, 0.65, 0.76, 0.80], ['-100px', '0px', '0px', '-100px']);
  const workCardsY = useTransform(smoothProgress, [0.58, 0.80], ['80px', '-120px']);
  const workVisibility = useTransform(smoothProgress, (p) => (p >= 0.58 && p <= 0.80 ? 'visible' : 'hidden') as React.CSSProperties['visibility']);
  const workPointerEvents = useTransform(
    smoothProgress,
    (p) => (p >= 0.58 && p <= 0.80 ? 'auto' : 'none') as React.CSSProperties['pointerEvents']
  );

  // SCENE 5: CONTACT & FINAL ASCENSION (78% -> 100%)
  const contactOpacity = useTransform(smoothProgress, [0, 0.78, 0.86, 1.00], [0, 0, 1, 1]);
  const contactY = useTransform(smoothProgress, [0.78, 0.88, 1.00], ['60px', '0px', '0px']);
  const contactScale = useTransform(smoothProgress, [0.78, 0.88, 1.00], [0.94, 1, 1]);
  const contactVisibility = useTransform(smoothProgress, (p) => (p >= 0.78 ? 'visible' : 'hidden') as React.CSSProperties['visibility']);
  const contactPointerEvents = useTransform(
    smoothProgress,
    (p) => (p >= 0.78 ? 'auto' : 'none') as React.CSSProperties['pointerEvents']
  );

  // Listen to hire-me custom event to jump straight to Scene 5
  useEffect(() => {
    const handleHireMe = () => {
      setShowContactForm(true);
      const container = containerRef.current;
      if (container) {
        const targetScroll = (container.offsetHeight - window.innerHeight) * 0.92;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    };

    window.addEventListener('hire-me', handleHireMe);
    return () => window.removeEventListener('hire-me', handleHireMe);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[700vh] w-full bg-mono-950 text-foreground"
    >
      {/* Invisible Navigation Anchor Markers mapped along the 700vh runway */}
      <div id="hero-anchor" className="absolute top-0" />
      <div id="about" className="absolute top-[24%]" />
      <div id="resume" className="absolute top-[42%]" />
      <div id="deployments" className="absolute top-[60%]" />
      <div id="projects" className="absolute top-[60%]" />
      <div id="contact" className="absolute top-[78%]" />

      {/* Global Navbar */}
      <Navbar />

      {/* Global Reading Progress Line */}
      <KineticFrame progress={smoothProgress} />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* ========================================================================= */}
      {/* MASTER STAGE (Sticky 100dvh Viewport: 3D Camera Traveling Through Space)  */}
      {/* ========================================================================= */}
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-12">
        {/* Fixed 3D Liquid Metal Scrubber Canvas */}
        <LiquidObject progress={smoothProgress} />

        {/* Global Architectural Hairline Grid */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:clamp(80px,9vw,160px)_clamp(80px,9vw,160px)] opacity-50"
          aria-hidden="true"
        />

        {/* ======================================================================= */}
        {/* SCENE 1: HERO / OPENING CHOREOGRAPHY (0% -> 22%)                        */}
        {/* ======================================================================= */}
        <motion.div
          style={{
            opacity: reduceMotion ? 1 : heroOpacity,
            y: reduceMotion ? '0px' : heroY,
            scale: reduceMotion ? 1 : heroScale,
            visibility: heroVisibility,
            pointerEvents: heroPointerEvents,
            willChange: 'opacity, transform',
          }}
          className="absolute inset-x-0 top-0 flex h-full w-full flex-col justify-between px-4 pb-6 pt-20 sm:px-8 sm:pb-12 sm:pt-28 lg:px-12 z-10 overflow-y-auto no-scrollbar"
        >
          {/* Top Editorial Metadata (Desktop) */}
          <div className="mx-auto w-full max-w-7xl hidden sm:block">
            <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-mono-950/50 px-5 py-3 text-[10px] uppercase tracking-[0.38em] text-mono-300 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between shadow-xl">
              <span className="font-semibold text-mono-100">KINETIC PORTFOLIO</span>
              <span className="text-mono-300">Deign Grey Lazaro / Valenzuela PH</span>
              <span className="text-mono-400 font-mono">2026 edition</span>
            </div>
          </div>

          {/* Centered Headline */}
          <div className="mx-auto my-auto max-w-5xl text-center py-4 sm:py-6">
            <div className="mb-3 sm:mb-5 inline-block rounded-full border border-white/15 bg-mono-950/60 px-3.5 py-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-mono-300 backdrop-blur-md shadow-lg">
              01 / Creative Developer & AI Engineer
            </div>

            <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-mono-50 sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              Powering the <span className="font-serif italic font-normal text-mono-100 underline decoration-white/20 underline-offset-4 sm:underline-offset-8">next</span>
              <br />
              generation of systems.
            </h1>

            <p className="mx-auto mt-3 sm:mt-6 max-w-2xl text-xs sm:text-base md:text-lg leading-relaxed text-mono-200 font-light drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Crafting scalable full-stack web applications and autonomous agent tooling with physical aesthetic precision.
            </p>

            <div className="mt-5 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('hire-me'));
                }}
                className="group inline-flex items-center gap-2 sm:gap-3 rounded-full bg-mono-50 px-6 py-2.5 sm:px-8 sm:py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-semibold text-mono-950 shadow-2xl transition-all hover:bg-mono-200 hover:scale-105 cursor-pointer"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <GlassButton
                size="default"
                onClick={() => {
                  const container = containerRef.current;
                  if (container) {
                    const targetScroll = (container.offsetHeight - window.innerHeight) * 0.72;
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }}
              >
                Explore Selected Builds
              </GlassButton>
            </div>

            <div className="mt-5 sm:mt-8 hidden sm:flex flex-wrap items-center justify-center gap-2">
              {disciplines.map((d, i) => (
                <span
                  key={d}
                  className="rounded-full border border-white/15 bg-mono-950/60 px-4 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-mono-300 backdrop-blur-md shadow-md"
                >
                  0{i + 1} {d}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid items-center gap-2 sm:gap-4 rounded-2xl border border-white/10 bg-mono-950/60 p-2.5 sm:p-4 backdrop-blur-md grid-cols-3 sm:grid-cols-4 shadow-xl">
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.35em] text-mono-300">
                <span>Scroll down</span>
                <ArrowDown className="h-3.5 w-3.5 animate-bounce text-mono-200" />
              </div>
              {heroMetrics.map(([val, lbl]) => (
                <div key={lbl} className="flex flex-col sm:flex-row items-center sm:items-baseline justify-between gap-1 sm:gap-3 border-r sm:border-r-0 sm:border-l border-white/10 last:border-r-0 px-2 sm:pl-4">
                  <span className="text-sm sm:text-xl font-bold tracking-tight text-mono-50 md:text-2xl">{val}</span>
                  <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-[0.16em] text-mono-400 text-center sm:text-left">{lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* SCENE 2: ABOUT / BUILDER PROFILE & TECH MATRIX (18% -> 44%)             */}
        {/* ======================================================================= */}
        <motion.div
          style={{
            opacity: reduceMotion ? 1 : aboutOpacity,
            scale: reduceMotion ? 1 : aboutScale,
            y: reduceMotion ? '0px' : aboutY,
            visibility: aboutVisibility,
            pointerEvents: aboutPointerEvents,
            willChange: 'opacity, transform',
          }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 pb-4 sm:pt-24 sm:pb-8 z-20"
        >
          <div className="mx-auto w-full max-w-7xl max-h-[82vh] overflow-y-auto no-scrollbar pr-1">
            {/* Header */}
            <div className="mb-4 sm:mb-6 grid gap-3 sm:gap-6 rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">02 / Profile</span>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-mono-50 drop-shadow">
                  Builder Profile
                </h2>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-mono-200 font-light md:text-base">
                  Engineering at the intersection of modern product design, robust system architecture, and autonomous AI tooling.
                </p>
              </div>
            </div>

            {/* Columns */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left Column: Portrait & Narrative */}
              <motion.div
                style={{ x: reduceMotion ? '0px' : aboutLeftX }}
                className="flex flex-col gap-4 sm:gap-5 rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <div className="relative h-28 w-24 sm:h-36 sm:w-32 flex-shrink-0 overflow-hidden rounded-2xl border border-white/20 bg-mono-900 shadow-2xl mx-auto sm:mx-0">
                    <Image
                      src="/profile.jpg"
                      alt="Deign Lazaro"
                      fill
                      className="object-cover object-center"
                      sizes="128px"
                      priority
                    />
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-center sm:text-left">
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-mono-100 font-light">
                      4th-year BSIT student at <span className="text-mono-50 font-semibold underline decoration-white/30">Pamantasan ng Lungsod ng Valenzuela</span>, creating scalable software with autonomous AI tooling.
                    </p>
                    <p className="text-[11px] sm:text-xs leading-relaxed text-mono-300">
                      With a background in academic leadership and student council, I pair technical precision with clear communication.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 border-t border-white/10 pt-3 sm:pt-4">
                  {signalStrip.map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-mono-900/60 p-1.5 sm:p-2.5 text-center">
                      <span className="text-sm sm:text-lg font-bold text-mono-50">{item.value}</span>
                      <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.12em] text-mono-400 font-mono mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Tech Capability Matrix */}
              <motion.div
                style={{ x: reduceMotion ? '0px' : aboutRightX }}
                className="flex flex-col gap-3 sm:gap-4 rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl"
              >
                <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-mono-300 font-mono font-medium">Technical Capabilities</h3>
                <div className="space-y-2.5 sm:space-y-3.5">
                  {categories.map((cat) => (
                    <div key={cat.name} className="border-b border-white/10 pb-2 sm:pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <span className="text-mono-400 text-xs">{cat.icon}</span>
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-mono-200 font-mono font-medium">{cat.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {cat.items.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/10 bg-mono-900/90 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs text-mono-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* SCENE 3: RESUME / ARCHIVE & LEADERSHIP (38% -> 64%)                     */}
        {/* ======================================================================= */}
        <motion.div
          style={{
            opacity: reduceMotion ? 1 : resumeOpacity,
            x: reduceMotion ? '0px' : resumeX,
            y: reduceMotion ? '0px' : resumeY,
            scale: reduceMotion ? 1 : resumeScale,
            visibility: resumeVisibility,
            pointerEvents: resumePointerEvents,
            willChange: 'opacity, transform',
          }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 pb-4 sm:pt-24 sm:pb-8 z-20"
        >
          <div className="mx-auto w-full max-w-7xl max-h-[82vh] overflow-y-auto no-scrollbar pr-1">
            {/* Header */}
            <div className="mb-4 sm:mb-6 grid gap-3 sm:gap-6 rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">03 / Archive</span>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-mono-50 drop-shadow">
                    Background & Skills
                  </h2>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-mono-200 font-light md:text-base">
                    A structured timeline of education, project leadership, and technical capability.
                  </p>
                </div>
                <a
                  href="/Lazaro CV.pdf"
                  download="Lazaro CV.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-mono-900/90 px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-mono text-mono-100 backdrop-blur-md transition-all hover:bg-mono-50 hover:text-mono-950 shadow-xl"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Tab Controls */}
            <div className="mb-3 sm:mb-4 flex gap-2">
              {[
                { id: 'education', label: 'Timeline & History', icon: GraduationCap },
                { id: 'skills', label: 'Core Competencies', icon: Code },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveResumeTab(tab.id as typeof activeResumeTab)}
                  className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] font-mono transition-all cursor-pointer ${
                    activeResumeTab === tab.id
                      ? 'bg-mono-50 text-mono-950 font-bold shadow-lg'
                      : 'border border-white/10 bg-mono-950/60 text-mono-300 hover:text-mono-100 backdrop-blur-md'
                  }`}
                >
                  <tab.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeResumeTab === 'education' ? (
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
                <div className="space-y-3 rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.24em] text-mono-200 mb-3 sm:mb-4">
                    <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-mono-100" />
                    <span>Academic Trajectory</span>
                  </div>
                  <div className="space-y-3 sm:space-y-4 border-l border-white/10 pl-4 sm:pl-5">
                    {education.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[23px] sm:-left-[27px] top-1.5 h-2 w-2 rounded-full bg-mono-400 ring-4 ring-mono-950" />
                        <div className="rounded-xl border border-white/10 bg-mono-900/60 p-3 sm:p-3.5 backdrop-blur-sm">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-mono-50">{item.title}</h4>
                            <span className="text-[9px] sm:text-[10px] font-mono text-mono-300 bg-mono-950/80 px-2 py-0.5 rounded border border-white/10">{item.period}</span>
                          </div>
                          <p className="mt-1 text-[11px] sm:text-xs text-mono-300">{item.organization}</p>
                          {item.highlights && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.highlights.map((h, i) => (
                                <span key={i} className="rounded bg-mono-950/90 px-1.5 py-0.5 text-[9px] sm:text-[10px] text-mono-300 font-mono border border-white/5">{h}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.24em] text-mono-200 mb-3 sm:mb-4">
                    <Lightbulb className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-mono-100" />
                    <span>Initiatives & Focus</span>
                  </div>
                  <div className="space-y-3 sm:space-y-4 border-l border-white/10 pl-4 sm:pl-5">
                    {initiatives.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[23px] sm:-left-[27px] top-1.5 h-2 w-2 rounded-full bg-mono-400 ring-4 ring-mono-950" />
                        <div className="rounded-xl border border-white/10 bg-mono-900/60 p-3 sm:p-3.5 backdrop-blur-sm">
                          <div className="flex flex-wrap items-center justify-between gap-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-mono-50">{item.title}</h4>
                            <span className="text-[9px] sm:text-[10px] font-mono text-mono-300 bg-mono-950/80 px-2 py-0.5 rounded border border-white/10">{item.period}</span>
                          </div>
                          <p className="mt-1 text-[11px] sm:text-xs text-mono-300">{item.organization}</p>
                          {item.description && (
                            <ul className="mt-2 space-y-1">
                              {item.description.map((d, i) => (
                                <li key={i} className="flex items-start gap-1 text-[11px] sm:text-xs text-mono-300">
                                  <ChevronRight className="h-3 w-3 text-mono-400 flex-shrink-0 mt-0.5" />
                                  <span>{d}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                {skillCategories.map((cat) => (
                  <div key={cat.name} className="rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
                    <h4 className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.24em] text-mono-200 mb-2 sm:mb-3 font-semibold">{cat.name}</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {cat.skills.map((skill) => (
                        <span key={skill} className="rounded-lg border border-white/10 bg-mono-900/90 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs text-mono-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* SCENE 4: SELECTED BUILDS & STREAMING CARDS (58% -> 84%)                 */}
        {/* ======================================================================= */}
        <motion.div
          style={{
            opacity: reduceMotion ? 1 : workOpacity,
            visibility: workVisibility,
            pointerEvents: workPointerEvents,
            willChange: 'opacity, transform',
          }}
          className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 pt-16 pb-4 sm:pt-24 sm:pb-8 z-20"
        >
          <div className="mx-auto w-full max-w-7xl max-h-[82vh] overflow-y-auto no-scrollbar pr-1">
            {/* Header */}
            <div className="mb-4 sm:mb-6 grid gap-3 sm:gap-6 rounded-3xl border border-white/10 bg-mono-950/70 p-4 sm:p-6 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">04 / Work & Live</span>
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-mono-50 drop-shadow">
                  Selected Builds
                </h2>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-mono-200 font-light md:text-base">
                  Production web applications, intelligent agents, and live platforms streaming alongside the liquid metal ribbons.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-[0.35fr_1fr]">
              {/* Left Aside Index */}
              <motion.div
                style={{ x: reduceMotion ? '0px' : workAsideX }}
                className="hidden rounded-3xl border border-white/10 bg-mono-950/70 p-6 backdrop-blur-md shadow-2xl lg:block"
              >
                <p className="mb-3 text-[10px] uppercase tracking-[0.34em] text-mono-300 font-mono font-semibold">Index Showcase</p>
                <div className="border-t border-white/10">
                  {workIndex.map((item) => (
                    <div key={item.id} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-white/5 py-2.5 last:border-b-0">
                      <span className="text-xs font-mono text-mono-400">{item.number}</span>
                      <div>
                        <span className="block text-xs font-medium text-mono-200">{item.name}</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-mono-400 font-mono">{item.language}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Streaming Project Cards */}
              <motion.div
                style={{ y: reduceMotion ? '0px' : workCardsY }}
                className="grid gap-3 sm:gap-4 sm:grid-cols-2 max-h-[58vh] overflow-y-auto pr-1 no-scrollbar"
              >
                {PINNED_PROJECTS.slice(0, 4).map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-mono-950/80 p-4 sm:p-5 backdrop-blur-md shadow-2xl transition-all hover:border-white/30"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.24em] text-mono-400">
                          #{String(project.order).padStart(2, '0')} {project.tags[0]}
                        </span>
                        <div className="flex items-center gap-2">
                          {project.githubRepo && (
                            <a
                              href={`https://github.com/${project.githubRepo}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-white/10 p-1.5 text-mono-300 hover:bg-mono-50 hover:text-mono-950"
                            >
                              <Github className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.liveUrlCandidates[0] && (
                            <a
                              href={project.liveUrlCandidates[0]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-white/10 p-1.5 text-mono-300 hover:bg-mono-50 hover:text-mono-950"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-mono-50">{project.title}</h4>
                      <p className="mt-1 text-[11px] sm:text-xs text-mono-300 line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 border-t border-white/10 pt-2.5 sm:pt-3">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded bg-mono-900/90 px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-mono-300 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ======================================================================= */}
        {/* SCENE 5: CONTACT & FINAL ASCENSION (78% -> 100%)                        */}
        {/* ======================================================================= */}
        <motion.div
          style={{
            opacity: reduceMotion ? 1 : contactOpacity,
            y: reduceMotion ? '0px' : contactY,
            scale: reduceMotion ? 1 : contactScale,
            visibility: contactVisibility,
            pointerEvents: contactPointerEvents,
            willChange: 'opacity, transform',
          }}
          className="absolute inset-0 flex flex-col justify-between px-4 sm:px-6 pt-16 pb-3 z-30 overflow-y-auto no-scrollbar"
        >
          <div className="mx-auto w-full max-w-5xl my-auto text-center flex flex-col items-center justify-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">05 / Contact</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-mono-50 drop-shadow mt-1">
              Ready to engineer the <span className="font-serif italic font-normal text-mono-100 underline decoration-white/20 underline-offset-4">next</span> era?
            </h2>
            <p className="mx-auto mt-1 max-w-lg text-[11px] sm:text-xs leading-relaxed text-mono-200 font-light drop-shadow">
              Open for full-stack engineering roles, high-impact freelance builds, and technical partnerships.
            </p>

            {/* Toggle Direct Channels vs Form */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => setShowContactForm(false)}
                className={`rounded-full px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer shadow-lg ${
                  !showContactForm
                    ? 'bg-mono-50 text-mono-950 font-bold'
                    : 'border border-white/10 bg-mono-950/60 text-mono-300 hover:text-mono-100 backdrop-blur-md'
                }`}
              >
                Direct Channels
              </button>
              <button
                onClick={() => setShowContactForm(true)}
                className={`rounded-full px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer shadow-lg ${
                  showContactForm
                    ? 'bg-mono-50 text-mono-950 font-bold'
                    : 'border border-white/10 bg-mono-950/60 text-mono-300 hover:text-mono-100 backdrop-blur-md'
                }`}
              >
                Send Message
              </button>
            </div>

            <div className="mt-3 w-full">
              <AnimatePresence mode="wait">
                {showContactForm ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-auto max-w-md rounded-2xl border border-white/10 bg-mono-950/90 p-4 backdrop-blur-md shadow-2xl text-left"
                  >
                    <ContactForm />
                  </motion.div>
                ) : (
                  <motion.div
                    key="channels"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid gap-2.5 sm:grid-cols-3 max-w-2xl mx-auto"
                  >
                    {contactOptions.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <a
                          key={opt.name}
                          href={opt.href}
                          target={opt.href.startsWith('http') ? '_blank' : undefined}
                          rel={opt.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="group rounded-2xl border border-white/10 bg-mono-950/70 p-4 backdrop-blur-md shadow-xl transition-all hover:border-white/30 hover:bg-mono-900/80 text-left"
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="rounded-lg bg-mono-900/90 border border-white/10 p-1.5 text-mono-200 group-hover:bg-mono-50 group-hover:text-mono-950">
                              <Icon />
                            </div>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-mono-300 font-mono">{opt.name}</span>
                          </div>
                          <p className="text-xs font-semibold text-mono-100 group-hover:text-white truncate">{opt.value}</p>
                        </a>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Minimal Resting Footer */}
          <div className="mx-auto w-full max-w-4xl rounded-xl border border-white/10 bg-mono-950/60 px-4 py-2.5 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-mono-400 mt-2">
            <span>© {new Date().getFullYear()} DEIGN LAZARO. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="rounded-full border border-white/10 bg-mono-900/80 p-1 text-mono-300 hover:bg-mono-50 hover:text-mono-950"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
