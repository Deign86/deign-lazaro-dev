'use client';

import { useState } from 'react';
import { Download, Calendar, MapPin, GraduationCap, Code, ChevronRight, Lightbulb } from 'lucide-react';
import { ScrollReveal } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';

interface TimelineItem {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description?: string[];
  highlights?: string[];
}

const education: TimelineItem[] = [
  {
    title: 'Bachelor of Science in Information Technology',
    organization: 'Pamantasan ng Lungsod ng Valenzuela',
    location: 'Valenzuela City, Philippines',
    period: '2023 – Present (4th Year)',
    highlights: [
      'Full-Stack Development',
      'AI & Machine Learning',
      'Software Engineering',
      'Database Architecture',
    ],
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

const projects: TimelineItem[] = [
  {
    title: 'AI-Powered Automation Tools',
    organization: 'Personal & Open Source',
    period: 'Ongoing',
    description: [
      'Architecting automation workflows with Python and autonomous agent models',
      'Integrating Claude, OpenAI, Hermes Agent, and custom tool calling',
      'Publishing reusable developer utilities and CLI agents',
    ],
  },
  {
    title: 'Full-Stack Web Applications',
    organization: 'Production & Academic',
    period: 'Ongoing',
    description: [
      'Building performant web apps with Next.js, React 19, and Tailwind CSS',
      'Developing cross-platform mobile apps with Flutter and Firebase',
      'Designing RESTful APIs and real-time database schemas',
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

export function Resume() {
  const [activeTab, setActiveTab] = useState<'education' | 'skills'>('education');

  return (
    <section id="resume" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
            <span className="text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">
              03 / Archive
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-mono-50 md:text-6xl drop-shadow">
                  <WordReveal text="Background & Skills" />
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-mono-200 font-light md:text-lg">
                  A structured timeline of education, project leadership, and technical capability.
                </p>
              </div>
              <a
                href="/Lazaro CV.pdf"
                download="Lazaro CV.pdf"
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-mono-900/90 px-7 py-3.5 text-xs uppercase tracking-[0.24em] font-mono text-mono-100 backdrop-blur-md transition-all hover:bg-mono-50 hover:text-mono-950 hover:border-white shadow-xl cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Tab Controls */}
        <div className="mt-12 flex gap-3">
          {[
            { id: 'education', label: 'Timeline & History', icon: GraduationCap },
            { id: 'skills', label: 'Core Competencies', icon: Code },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs uppercase tracking-[0.2em] font-mono transition-all cursor-pointer shadow-lg ${
                activeTab === tab.id
                  ? 'bg-mono-50 text-mono-950 font-bold'
                  : 'border border-white/10 bg-mono-950/60 text-mono-300 hover:text-mono-100 hover:bg-mono-900/70 backdrop-blur-md'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === 'education' ? (
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Education Column */}
              <div className="space-y-4 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.24em] text-mono-200 mb-6">
                  <GraduationCap className="h-4 w-4 text-mono-100" />
                  <span>Academic Trajectory</span>
                </div>

                <div className="space-y-6 border-l border-white/10 pl-6">
                  {education.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-mono-400 ring-4 ring-mono-950 group-hover:bg-mono-50 transition-colors" />
                      <div className="rounded-2xl border border-white/10 bg-mono-900/60 p-5 backdrop-blur-sm transition-colors hover:border-white/20">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-base font-semibold text-mono-50">{item.title}</h4>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-mono-300 bg-mono-950/80 px-2.5 py-1 rounded-md border border-white/10">
                            <Calendar className="h-3 w-3" />
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-mono-300">{item.organization}</p>
                        {item.location && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-mono-400 font-mono">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </p>
                        )}
                        {item.highlights && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.highlights.map((h, i) => (
                              <span key={i} className="rounded bg-mono-950/90 px-2.5 py-0.5 text-[11px] text-mono-300 font-mono border border-white/5">
                                {h}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Column */}
              <div className="space-y-4 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.24em] text-mono-200 mb-6">
                  <Lightbulb className="h-4 w-4 text-mono-100" />
                  <span>Initiatives & Focus</span>
                </div>

                <div className="space-y-6 border-l border-white/10 pl-6">
                  {projects.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-mono-400 ring-4 ring-mono-950 group-hover:bg-mono-50 transition-colors" />
                      <div className="rounded-2xl border border-white/10 bg-mono-900/60 p-5 backdrop-blur-sm transition-colors hover:border-white/20">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="text-base font-semibold text-mono-50">{item.title}</h4>
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-mono-300 bg-mono-950/80 px-2.5 py-1 rounded-md border border-white/10">
                            <Calendar className="h-3 w-3" />
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-mono-300">{item.organization}</p>
                        {item.description && (
                          <ul className="mt-3 space-y-1.5">
                            {item.description.map((d, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-mono-300">
                                <ChevronRight className="h-3.5 w-3.5 text-mono-400 flex-shrink-0 mt-0.5" />
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
            <div className="grid gap-6 sm:grid-cols-2">
              {skillCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl"
                >
                  <h4 className="text-xs font-mono uppercase tracking-[0.24em] text-mono-200 mb-4 font-semibold">
                    {cat.name}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-white/10 bg-mono-900/90 px-3 py-1 text-xs text-mono-200 font-medium transition-colors hover:border-white/30 hover:text-mono-50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
