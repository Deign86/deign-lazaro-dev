'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, ChevronDown, X } from 'lucide-react';
import { ScrollReveal } from './ui/scroll-reveal';
import { WordReveal } from './ui/text-reveal';

// Social/Contact links data
const contactOptions = [
  {
    name: 'Email',
    value: 'deign86@gmail.com',
    href: 'mailto:deign86@gmail.com',
    icon: Mail,
    color: 'hover:bg-mono-200 dark:hover:bg-mono-700',
  },
  {
    name: 'Phone',
    value: '09624180920',
    href: 'tel:+639624180920',
    icon: Phone,
    color: 'hover:bg-mono-200 dark:hover:bg-mono-700',
  },
  {
    name: 'Facebook',
    value: 'Deigny86',
    href: 'https://www.facebook.com/Deigny86',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-600 dark:hover:text-blue-400',
  },
  {
    name: 'Instagram',
    value: '@deign86',
    href: 'https://www.instagram.com/deign86/',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: 'hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-600 dark:hover:text-pink-400',
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
    color: 'hover:bg-green-50 dark:hover:bg-green-950/30 hover:text-green-600 dark:hover:text-green-400',
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
    name: 'Facebook',
    href: 'https://www.facebook.com/Deigny86',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/deign86/',
    icon: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-mono-100 dark:from-mono-900 to-transparent opacity-50 rounded-t-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section header */}
        <ScrollReveal direction="up" blur={true} delay={0}>
          <span className="text-mono-400 dark:text-mono-600 text-sm tracking-[0.3em] uppercase">
            04 — Contact
          </span>
        </ScrollReveal>

        {/* Main CTA with word reveal */}
        <ScrollReveal direction="up" blur={true} delay={0.1}>
          <h2 className="mt-12 text-4xl md:text-6xl lg:text-7xl font-bold text-mono-950 dark:text-mono-50 tracking-tight leading-tight">
            <WordReveal text="Let's Build" staggerDelay={0.1} />
            <br />
            <span className="text-mono-400 dark:text-mono-500">
              <WordReveal text="Something Great" staggerDelay={0.1} delay={0.3} />
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" blur={true} delay={0.3}>
          <p className="mt-8 text-lg md:text-xl text-mono-600 dark:text-mono-400 max-w-xl mx-auto">
            I&apos;m always interested in hearing about new projects, opportunities, 
            or just having a chat about technology.
          </p>
        </ScrollReveal>

        {/* Expandable Contact Button */}
        <ScrollReveal direction="up" blur={true} scale={true} delay={0.4}>
          <div className="mt-12 flex flex-col items-center relative">
            <div className="relative z-50">
              {/* Main expandable button */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-mono-950 dark:bg-mono-50 text-mono-50 dark:text-mono-950 rounded-full font-medium text-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-mono-950/20 dark:hover:shadow-mono-50/20 cursor-pointer"
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
                <span className="absolute inset-0 bg-mono-800 dark:bg-mono-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.button>

              {/* Expanded contact options */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 sm:w-96 bg-white dark:bg-mono-900 rounded-2xl border border-mono-200 dark:border-mono-800 shadow-2xl shadow-mono-950/20 dark:shadow-mono-950/50 z-[100]"
                  >
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-mono-200 dark:border-mono-800">
                      <p className="text-sm font-medium text-mono-500 dark:text-mono-400 uppercase tracking-wider">
                        Choose how to reach me
                      </p>
                    </div>

                    {/* Contact options */}
                    <div className="pt-2 pb-3">
                      {contactOptions.map((option, index) => {
                        const IconComponent = option.icon;
                        const isLucideIcon = IconComponent === Mail || IconComponent === Phone;
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
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mono-100 dark:bg-mono-800">
                              {isLucideIcon ? (
                                <IconComponent className="w-5 h-5 text-mono-600 dark:text-mono-400" />
                              ) : (
                                <IconComponent />
                              )}
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="text-sm font-medium text-mono-900 dark:text-mono-100">
                                {option.name}
                              </span>
                              <span className="text-xs text-mono-500 dark:text-mono-500">
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
          </div>
        </ScrollReveal>

        {/* Social links row - fades out when dropdown is expanded */}
        <ScrollReveal direction="up" blur={true} delay={0.5}>
          <motion.div 
            className="mt-8 flex items-center justify-center gap-4"
            animate={{ 
              opacity: isExpanded ? 0 : 1,
              y: isExpanded ? -10 : 0,
              pointerEvents: isExpanded ? 'none' : 'auto'
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm text-mono-400 dark:text-mono-600">Or find me on</span>
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
                    className="p-3 rounded-full bg-mono-100 dark:bg-mono-800 text-mono-600 dark:text-mono-400 hover:bg-mono-200 dark:hover:bg-mono-700 hover:text-mono-900 dark:hover:text-mono-100 transition-colors cursor-pointer"
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
              opacity: isExpanded ? 0 : 1,
              pointerEvents: isExpanded ? 'none' : 'auto'
            }}
            transition={{ duration: 0.2 }}
          >
          {/* Email card */}
          <a
            href="mailto:deign86@gmail.com"
            className="group p-6 rounded-2xl bg-mono-50 dark:bg-mono-900/50 border border-mono-200 dark:border-mono-800 hover:border-mono-400 dark:hover:border-mono-600 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-mono-100 dark:bg-mono-800">
                <Mail className="w-5 h-5 text-mono-600 dark:text-mono-400" />
              </div>
              <span className="text-sm font-medium text-mono-500 dark:text-mono-400 uppercase tracking-wider">
                Email
              </span>
            </div>
            <p className="text-mono-900 dark:text-mono-100 font-medium group-hover:text-mono-600 dark:group-hover:text-mono-300 transition-colors">
              deign86@gmail.com
            </p>
          </a>

          {/* Phone card */}
          <a
            href="tel:+639624180920"
            className="group p-6 rounded-2xl bg-mono-50 dark:bg-mono-900/50 border border-mono-200 dark:border-mono-800 hover:border-mono-400 dark:hover:border-mono-600 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-mono-100 dark:bg-mono-800">
                <Phone className="w-5 h-5 text-mono-600 dark:text-mono-400" />
              </div>
              <span className="text-sm font-medium text-mono-500 dark:text-mono-400 uppercase tracking-wider">
                Phone
              </span>
            </div>
            <p className="text-mono-900 dark:text-mono-100 font-medium group-hover:text-mono-600 dark:group-hover:text-mono-300 transition-colors">
              +63 962 418 0920
            </p>
          </a>

          {/* WhatsApp card */}
          <a
            href="https://wa.me/639624180920"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl bg-mono-50 dark:bg-mono-900/50 border border-mono-200 dark:border-mono-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-mono-100 dark:bg-mono-800 group-hover:bg-green-50 dark:group-hover:bg-green-950/30 transition-colors">
                <svg className="w-5 h-5 text-mono-600 dark:text-mono-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <span className="text-sm font-medium text-mono-500 dark:text-mono-400 uppercase tracking-wider">
                WhatsApp
              </span>
            </div>
            <p className="text-mono-900 dark:text-mono-100 font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
              Message me
            </p>
          </a>
          </motion.div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal direction="up" blur={true} delay={0.7}>
          <motion.footer 
            className="mt-32 pt-8 border-t border-mono-200 dark:border-mono-800"
            animate={{ 
              opacity: isExpanded ? 0 : 1,
              pointerEvents: isExpanded ? 'none' : 'auto'
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-mono-500 dark:text-mono-500 text-sm">
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
                      className="text-mono-400 dark:text-mono-600 hover:text-mono-700 dark:hover:text-mono-300 transition-colors cursor-pointer"
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
