'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { GlassButton } from './ui/apple-tahoe-liquid-glass-button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0.85, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Profile', href: '#about' },
    { name: 'Archive', href: '#resume' },
    { name: 'Live', href: '#deployments' },
    { name: 'Work', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.header
        style={{ opacity }}
        className="fixed top-4 left-4 right-4 z-50 pointer-events-auto"
      >
        <nav
          className={`mx-auto max-w-6xl px-6 py-3.5 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'bg-mono-950/80 backdrop-blur-md border border-mono-800/80 shadow-2xl shadow-mono-950/80'
              : 'bg-mono-950/30 backdrop-blur-sm border border-mono-800/40'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Minimal Logo / Monogram */}
            <a
              href="#"
              className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-mono text-mono-200 hover:text-mono-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 rounded-sm"
              aria-label="Deign Lazaro - Top of Page"
            >
              <span className="font-bold text-mono-50">D.</span>
              <span className="hidden sm:inline text-mono-500">LAZARO</span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.24em] font-mono text-mono-400 hover:text-mono-100 transition-colors px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 rounded-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <GlassButton
                  size="sm"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    window.dispatchEvent(new CustomEvent('hire-me'));
                  }}
                >
                  Hire Me
                </GlassButton>
              </div>

              <a
                href="https://github.com/Deign86"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-mono-400 hover:text-mono-100 transition-colors"
                aria-label="GitHub Profile"
              >
                <span>GitHub</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-mono-300 hover:text-mono-50 transition-colors rounded-lg"
                aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-mono-950/90 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-4 right-4 z-50 bg-mono-950 border border-mono-800 rounded-3xl p-6 shadow-2xl md:hidden"
            >
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-base font-mono uppercase tracking-[0.2em] text-mono-300 hover:text-mono-50 hover:bg-mono-900 rounded-xl transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-mono-850 flex flex-col gap-3">
                <GlassButton
                  size="default"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      window.dispatchEvent(new CustomEvent('hire-me'));
                    }, 150);
                  }}
                >
                  Hire Me
                </GlassButton>
                <a
                  href="https://github.com/Deign86"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-2 text-xs font-mono uppercase tracking-[0.24em] text-mono-400"
                >
                  View GitHub
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
