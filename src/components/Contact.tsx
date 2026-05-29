'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, ChevronDown, X } from 'lucide-react';
import { ScrollReveal } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';
import { ContactForm } from './ui/contact-form';

// Social/Contact links data
const contactOptions = [
  {
    name: 'Viber',
    value: '09624180920',
    href: 'viber://chat?number=+639624180920',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.63 4.04 1.71 5.66L2.05 22l4.56-1.19c1.57.87 3.36 1.37 5.28 1.37h.01c5.46 0 9.91-4.45 9.91-9.91C21.81 6.45 17.36 2 12.04 2zm4.96 14.16c-.24.67-1.39 1.33-1.93 1.41-.51.08-1.16.11-1.88-.12-.43-.14-1-.35-1.72-.68-3.03-1.32-4.99-4.37-5.13-4.57-.14-.19-1.1-1.46-1.1-2.79 0-1.33.7-1.98.95-2.25.25-.27.55-.34.73-.34.18 0 .36.01.52.01.17 0 .39-.06.61.47.24.55.82 2 .89 2.14.07.15.12.32.02.51-.09.19-.14.31-.28.47-.14.17-.3.38-.43.51-.14.15-.29.31-.12.6.17.29.75 1.24 1.61 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.18-.19.74-.87.94-1.17.2-.3.39-.25.66-.15.27.1 1.73.82 2.03.97.29.15.49.23.56.35.08.13.08.73-.17 1.41z"/>
      </svg>
    ),
    color: 'hover:bg-mono-700 hover:text-mono-100',
  },
  {
    name: 'LinkedIn',
    value: 'Deign Grey Lazaro',
    href: 'https://www.linkedin.com/in/deign-grey-lazaro-2976a41b6/',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'hover:bg-mono-700 hover:text-mono-100',
  },
  {
    name: 'WhatsApp',
    value: '09624180920',
    href: 'https://wa.me/639624180920',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: 'hover:bg-mono-700 hover:text-mono-100',
  },
];

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Deign86',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/deign-grey-lazaro-2976a41b6/',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Listen for "hire-me" event from Navbar to auto-show the form
  useEffect(() => {
    const handleHireMe = () => {
      setShowForm(true);
      // Scroll to form after a brief delay for animation
      setTimeout(() => {
        formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    };

    window.addEventListener('hire-me', handleHireMe);
    return () => window.removeEventListener('hire-me', handleHireMe);
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
    // Scroll to form container after a brief delay for animation
    setTimeout(() => {
      formContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 md:py-48 pb-40 md:pb-56 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-mono-900 to-transparent opacity-50 rounded-t-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <span className="text-mono-600 text-sm tracking-[0.3em] uppercase">
            04 — Contact
          </span>
        </ScrollReveal>

        {/* Main CTA with word reveal */}
        <ScrollReveal direction="up" blur={true} delay={0.1}>
          <h2 className="mt-12 text-4xl md:text-6xl lg:text-7xl font-bold text-mono-50 tracking-tight leading-tight balance">
            <WordReveal text="Let's Build" staggerDelay={0.1} />
            <br />
            <span className="text-mono-500">
              <WordReveal text="Something Great" staggerDelay={0.1} delay={0.3} />
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" blur={true} delay={0.3}>
          <p className="mt-8 text-lg md:text-xl text-mono-400 max-w-xl mx-auto">
            Currently looking for internships and freelance work. 
            Have a project in mind or just want to chat? Drop me a message.
          </p>
        </ScrollReveal>

        {/* Contact Form or Quick Contact Options */}
        <ScrollReveal direction="up" blur={true} scale={true} delay={0.4}>
          <div ref={formContainerRef} className="mt-12">
            {/* Toggle buttons */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <motion.button
                onClick={handleShowForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  showForm
                    ? 'bg-mono-50 text-mono-950'
                    : 'bg-mono-800 text-mono-400 hover:bg-mono-700'
                }`}
              >
                Send Message
              </motion.button>
              <motion.button
                onClick={() => setShowForm(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  !showForm
                    ? 'bg-mono-50 text-mono-950'
                    : 'bg-mono-800 text-mono-400 hover:bg-mono-700'
                }`}
              >
                Quick Contact
              </motion.button>
            </div>

            {/* Contact Form */}
            <AnimatePresence mode="wait">
              {showForm ? (
                <ContactForm key="form" />
              ) : (
                <motion.div
                  key="quick-contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col items-center relative"
                >
                  <div className="relative z-50">
                    {/* Main expandable button */}
                    <motion.button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-mono-50 text-mono-950 rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-mono-50/20 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Mail className="relative z-10 w-5 h-5" />
                      <span className="relative z-10">Get in Touch</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10"
                      >
                        {isExpanded ? (
                          <X className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </motion.div>
                      <span className="absolute inset-0 bg-mono-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </motion.button>

              {/* Expanded contact options */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 sm:w-96 bg-mono-900 rounded-2xl border border-mono-800 shadow-2xl shadow-mono-950/50 z-[100]"
                        >
                          {/* Header */}
                          <div className="px-5 py-4 border-b border-mono-800">
                            <p className="text-sm font-medium text-mono-400 uppercase tracking-wider">
                              Choose how to reach me
                            </p>
                          </div>

                          {/* Contact options */}
                          <div className="pt-2 pb-3">
                            {contactOptions.map((option, index) => {
                              const IconComponent = option.icon;
                              return (
                                <motion.a
                                  key={option.name}
                                  href={option.href}
                                  target={option.href.startsWith('http') ? '_blank' : undefined}
                                  rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.05 }}
                                  className={`flex items-center gap-4 px-5 py-3.5 transition-colors cursor-pointer ${option.color}`}
                                >
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mono-800">
                                    <IconComponent />
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium text-mono-100">
                                      {option.name}
                                    </span>
                                    <span className="text-xs text-mono-500">
                                      {option.value}
                                    </span>
                                  </div>
                                </motion.a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>

        {/* Social links row - fades out when dropdown is expanded or form is shown */}
        <ScrollReveal direction="up" blur={true} delay={0.5}>
          <motion.div 
            className="mt-8 flex items-center justify-center gap-4"
            animate={{ 
              opacity: (isExpanded || showForm) ? 0 : 1,
              y: (isExpanded || showForm) ? -10 : 0,
              pointerEvents: (isExpanded || showForm) ? 'none' : 'auto'
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm text-mono-600">Or find me on</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-mono-800 text-mono-400 hover:bg-mono-700 hover:text-mono-100 transition-colors cursor-pointer"
                  >
                    <IconComponent />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Quick contact cards for larger screens */}
        <ScrollReveal direction="up" blur={true} delay={0.6}>
          <motion.div 
            className="mt-16 hidden md:grid grid-cols-3 gap-4"
            animate={{ 
              opacity: (isExpanded || showForm) ? 0 : 1,
              pointerEvents: (isExpanded || showForm) ? 'none' : 'auto'
            }}
            transition={{ duration: 0.2 }}
          >
          {/* Viber card */}
          <a
            href="viber://chat?number=+639624180920"
            className="group p-6 rounded-2xl bg-mono-900/50 border border-mono-800 hover:border-mono-600 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-mono-800 group-hover:bg-mono-700 transition-colors">
                <svg className="w-5 h-5 text-mono-400 group-hover:text-mono-100 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.63 4.04 1.71 5.66L2.05 22l4.56-1.19c1.57.87 3.36 1.37 5.28 1.37h.01c5.46 0 9.91-4.45 9.91-9.91C21.81 6.45 17.36 2 12.04 2zm4.96 14.16c-.24.67-1.39 1.33-1.93 1.41-.51.08-1.16.11-1.88-.12-.43-.14-1-.35-1.72-.68-3.03-1.32-4.99-4.37-5.13-4.57-.14-.19-1.1-1.46-1.1-2.79 0-1.33.7-1.98.95-2.25.25-.27.55-.34.73-.34.18 0 .36.01.52.01.17 0 .39-.06.61.47.24.55.82 2 .89 2.14.07.15.12.32.02.51-.09.19-.14.31-.28.47-.14.17-.3.38-.43.51-.14.15-.29.31-.12.6.17.29.75 1.24 1.61 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.12.63-.07.18-.19.74-.87.94-1.17.2-.3.39-.25.66-.15.27.1 1.73.82 2.03.97.29.15.49.23.56.35.08.13.08.73-.17 1.41z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-mono-400 uppercase tracking-wider">
                Viber
              </span>
            </div>
            <p className="text-mono-100 font-medium group-hover:text-mono-100 transition-colors">
              Message me
            </p>
          </a>

          {/* LinkedIn card */}
          <a
            href="https://www.linkedin.com/in/deign-grey-lazaro-2976a41b6/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-mono-900/50 border border-mono-800 hover:border-mono-600 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-mono-800 group-hover:bg-mono-700 transition-colors">
                <svg className="w-5 h-5 text-mono-400 group-hover:text-mono-100 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-mono-400 uppercase tracking-wider">
                LinkedIn
              </span>
            </div>
            <p className="text-mono-100 font-medium group-hover:text-mono-100 transition-colors">
              Connect with me
            </p>
          </a>

          {/* WhatsApp card */}
          <a
            href="https://wa.me/639624180920"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-mono-900/50 border border-mono-800 hover:border-mono-600 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-mono-800 group-hover:bg-mono-700 transition-colors">
                <svg className="w-5 h-5 text-mono-400 group-hover:text-mono-100 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-mono-400 uppercase tracking-wider">
                WhatsApp
              </span>
            </div>
            <p className="text-mono-100 font-medium group-hover:text-mono-100 transition-colors">
              Message me
            </p>
          </a>
          </motion.div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal direction="up" blur={true} delay={0.7}>
          <motion.footer 
            className="mt-32 pt-8 border-t border-mono-800"
            animate={{ 
              opacity: (isExpanded || showForm) ? 0 : 1,
              pointerEvents: (isExpanded || showForm) ? 'none' : 'auto'
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-mono-500 text-sm">
                © {new Date().getFullYear()} Deign. Built with Next.js & Tailwind CSS.
              </p>
              
              {/* Footer social links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={`footer-${social.name}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-mono-600 hover:text-mono-300 transition-colors cursor-pointer"
                    >
                      <IconComponent />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.footer>
        </ScrollReveal>
      </div>
    </section>
  );
}
