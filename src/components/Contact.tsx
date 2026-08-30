'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ScrollReveal } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';
import { ContactForm } from './ui/contact-form';

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

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleHireMe = () => {
      setShowForm(true);
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 250);
    };

    window.addEventListener('hire-me', handleHireMe);
    return () => window.removeEventListener('hire-me', handleHireMe);
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative px-6 py-28 pb-36 md:py-36"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <div className="grid gap-8 rounded-3xl border border-white/10 bg-mono-950/60 p-8 backdrop-blur-md shadow-2xl lg:grid-cols-[0.4fr_1fr]">
            <span className="text-xs uppercase tracking-[0.34em] text-mono-400 font-mono">
              06 / Contact
            </span>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-mono-50 md:text-6xl drop-shadow">
                <WordReveal text="Initiate Dialogue" />
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mono-200 font-light md:text-lg">
                Open for software engineering roles, high-impact freelance builds, and technical collaborations.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Contact & Message Channel Toggle */}
        <div ref={formContainerRef} className="mt-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setShowForm(false)}
              className={`rounded-full px-6 py-2.5 text-xs font-mono uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg ${
                !showForm
                  ? 'bg-mono-50 text-mono-950 font-bold'
                  : 'border border-white/10 bg-mono-950/60 text-mono-300 hover:text-mono-100 backdrop-blur-md'
              }`}
            >
              Direct Channels
            </button>
            <button
              onClick={() => setShowForm(true)}
              className={`rounded-full px-6 py-2.5 text-xs font-mono uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg ${
                showForm
                  ? 'bg-mono-50 text-mono-950 font-bold'
                  : 'border border-white/10 bg-mono-950/60 text-mono-300 hover:text-mono-100 backdrop-blur-md'
              }`}
            >
              Send Message
            </button>
          </div>

          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-mono-950/70 p-8 backdrop-blur-md shadow-2xl"
              >
                <ContactForm />
              </motion.div>
            ) : (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-4 sm:grid-cols-3"
              >
                {contactOptions.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <a
                      key={opt.name}
                      href={opt.href}
                      target={opt.href.startsWith('http') ? '_blank' : undefined}
                      rel={opt.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="group rounded-3xl border border-white/10 bg-mono-950/70 p-7 backdrop-blur-md shadow-xl transition-all hover:border-white/30 hover:bg-mono-900/80"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="rounded-xl bg-mono-900/90 border border-white/10 p-3 text-mono-200 transition-colors group-hover:bg-mono-50 group-hover:text-mono-950">
                          <Icon />
                        </div>
                        <span className="text-xs uppercase tracking-[0.22em] text-mono-300 font-mono font-medium">
                          {opt.name}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-mono-100 group-hover:text-white">
                        {opt.value}
                      </p>
                    </a>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-24 rounded-2xl border border-white/10 bg-mono-950/60 p-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-mono text-mono-400">
              © {new Date().getFullYear()} DEIGN LAZARO. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="rounded-full border border-white/10 bg-mono-900/80 p-2.5 text-mono-300 transition-colors hover:bg-mono-50 hover:text-mono-950"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
