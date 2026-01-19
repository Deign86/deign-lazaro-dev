'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Download, Mail, MapPin, Calendar, GraduationCap, Code, ChevronRight, Lightbulb } from 'lucide-react';

interface TimelineItem {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description?: string[];
  highlights?: string[];
}

interface SkillCategory {
  name: string;
  skills: string[];
}

const education: TimelineItem[] = [
  {
    title: 'Bachelor of Science in Information Technology',
    organization: 'Pamantasan ng Lungsod ng Valenzuela',
    location: 'Valenzuela City, Philippines',
    period: '2023 – Present (3rd Year)',
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

const projects: TimelineItem[] = [
  {
    title: 'AI-Powered Automation Tools',
    organization: 'Personal Projects',
    period: 'Ongoing',
    description: [
      'Building automation tools with Python and AI integrations',
      'Working with Claude, OpenAI, and Azure AI services',
    ],
  },
  {
    title: 'Full-Stack Web Applications',
    organization: 'Academic & Personal',
    period: 'Ongoing',
    description: [
      'Developing web apps with Next.js, React, and modern frameworks',
      'Creating mobile applications with Flutter',
    ],
  },
];

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Dart', 'SQL'],
  },
  {
    name: 'Frameworks',
    skills: ['Django', 'Flask', 'FastAPI', 'Next.js', 'React', 'Tailwind CSS', 'Flutter'],
  },
  {
    name: 'AI & ML',
    skills: ['OpenAI API', 'Claude API', 'LangChain', 'Azure AI', 'Hugging Face'],
  },
  {
    name: 'Tools',
    skills: ['Git', 'Docker', 'VS Code', 'Figma', 'Firebase', 'Supabase'],
  },
];

function TimelineSection({ 
  items, 
  icon: Icon, 
  title,
  delay = 0 
}: { 
  items: TimelineItem[]; 
  icon: typeof GraduationCap; 
  title: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-mono-100 dark:bg-mono-800 ring-1 ring-mono-200 dark:ring-mono-700">
          <Icon className="w-5 h-5 text-mono-600 dark:text-mono-400" />
        </div>
        <h3 className="text-xl font-semibold text-mono-900 dark:text-mono-100">{title}</h3>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 border-l-2 border-mono-200 dark:border-mono-800 space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.1 * (index + 1) }}
            className="relative group"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-mono-300 dark:bg-mono-700 ring-4 ring-background group-hover:bg-mono-500 dark:group-hover:bg-mono-500 transition-colors" />
            
            {/* Content card */}
            <div className="p-5 rounded-xl bg-mono-50 dark:bg-mono-900/50 border border-mono-100 dark:border-mono-800 hover:border-mono-300 dark:hover:border-mono-700 transition-all duration-300 hover:shadow-lg hover:shadow-mono-200/50 dark:hover:shadow-mono-950/50 cursor-default">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h4 className="text-lg font-medium text-mono-900 dark:text-mono-100">
                  {item.title}
                </h4>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-mono-600 dark:text-mono-400 bg-mono-100 dark:bg-mono-800 rounded-full">
                  <Calendar className="w-3 h-3" />
                  {item.period}
                </span>
              </div>
              
              <p className="text-mono-600 dark:text-mono-400 font-medium mb-1">
                {item.organization}
              </p>
              
              {item.location && (
                <p className="inline-flex items-center gap-1 text-sm text-mono-500 dark:text-mono-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </p>
              )}
              
              {item.description && (
                <ul className="mt-3 space-y-1.5">
                  {item.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-mono-600 dark:text-mono-400">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-mono-400 dark:text-mono-600 flex-shrink-0" />
                      {desc}
                    </li>
                  ))}
                </ul>
              )}
              
              {item.highlights && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.highlights.map((highlight, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-mono-100 dark:bg-mono-800 text-mono-600 dark:text-mono-400 rounded"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SkillsGrid({ categories, delay = 0 }: { categories: SkillCategory[]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-mono-100 dark:bg-mono-800 ring-1 ring-mono-200 dark:ring-mono-700">
          <Code className="w-5 h-5 text-mono-600 dark:text-mono-400" />
        </div>
        <h3 className="text-xl font-semibold text-mono-900 dark:text-mono-100">Skills</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.1 * catIndex }}
            className="p-5 rounded-xl bg-mono-50 dark:bg-mono-900/50 border border-mono-100 dark:border-mono-800 hover:border-mono-300 dark:hover:border-mono-700 transition-all duration-300"
          >
            <h4 className="text-sm font-medium text-mono-500 dark:text-mono-500 uppercase tracking-wider mb-4">
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: delay + 0.05 * index + 0.1 * catIndex }}
                  className="px-3 py-1.5 text-sm font-medium bg-mono-100 dark:bg-mono-800 text-mono-700 dark:text-mono-300 rounded-lg hover:bg-mono-200 dark:hover:bg-mono-700 transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<'education' | 'skills'>('education');

  return (
    <section
      ref={sectionRef}
      id="resume"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-mono-100 dark:bg-mono-900 opacity-30 blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-mono-50 dark:bg-mono-900 opacity-40 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-mono-400 dark:text-mono-600 text-sm tracking-[0.3em] uppercase">
            02 — Resume
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-4">
            <h2 className="text-4xl md:text-6xl font-bold text-mono-950 dark:text-mono-50 tracking-tight">
              My Journey
            </h2>
            
            {/* Download CV button */}
            <motion.a
              href="/api/cv"
              download="Deign-Lazaro-CV.pdf"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-mono-900 dark:bg-mono-100 text-mono-50 dark:text-mono-950 rounded-full font-medium hover:bg-mono-800 dark:hover:bg-mono-200 transition-colors cursor-pointer group"
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              Download CV
            </motion.a>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12 p-1.5 bg-mono-100 dark:bg-mono-900 rounded-xl w-fit"
        >
          {[
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'skills', label: 'Skills', icon: Code },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-mono-800 text-mono-900 dark:text-mono-100 shadow-sm'
                  : 'text-mono-500 hover:text-mono-700 dark:hover:text-mono-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="min-h-[400px]">
          {activeTab === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-12"
            >
              <TimelineSection items={education} icon={GraduationCap} title="Education" delay={0.1} />
              <TimelineSection items={projects} icon={Lightbulb} title="Projects" delay={0.2} />
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SkillsGrid categories={skillCategories} delay={0.1} />
            </motion.div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-mono-100 to-mono-50 dark:from-mono-900 dark:to-mono-950 border border-mono-200 dark:border-mono-800 text-center"
        >
          <h3 className="text-2xl font-bold text-mono-900 dark:text-mono-100 mb-3">
            Interested in working together?
          </h3>
          <p className="text-mono-600 dark:text-mono-400 mb-6 max-w-md mx-auto">
            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-mono-900 dark:bg-mono-100 text-mono-50 dark:text-mono-950 rounded-full font-medium hover:bg-mono-800 dark:hover:bg-mono-200 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
