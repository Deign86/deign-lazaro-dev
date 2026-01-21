'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  ExternalLink, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  Globe,
  Maximize2
} from 'lucide-react';

export interface LivePreviewProject {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  tags?: string[];
}

interface LivePreviewProps {
  projects: LivePreviewProject[];
  className?: string;
}

export function LivePreview({ projects, className }: LivePreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIndex];

  // Reset loading state when project changes
  useEffect(() => {
    setIsLoading(true);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Browser Window Frame */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect on hover */}
        <div 
          className={cn(
            "absolute -inset-1 bg-gradient-to-r from-mono-700/20 via-mono-500/10 to-mono-700/20 rounded-2xl blur-xl transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )} 
        />

        {/* Browser Frame */}
        <div className="relative rounded-xl overflow-hidden border border-mono-800 bg-mono-950 shadow-2xl shadow-black/50">
          {/* Browser Header / Title Bar */}
          <div className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3 bg-mono-900/80 border-b border-mono-800">
            {/* Traffic Lights (decorative) */}
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5" aria-hidden="true">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
              </div>
              
              {/* Navigation arrows */}
              <div className="flex items-center gap-0.5 sm:gap-1 ml-2 sm:ml-4">
                <button
                  onClick={handlePrev}
                  className="p-0.5 sm:p-1 rounded hover:bg-mono-800 transition-colors text-mono-500 hover:text-mono-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-1 focus-visible:ring-offset-mono-900"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-0.5 sm:p-1 rounded hover:bg-mono-800 transition-colors text-mono-500 hover:text-mono-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-1 focus-visible:ring-offset-mono-900"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  onClick={handleRefresh}
                  className="hidden sm:block p-1 rounded hover:bg-mono-800 transition-colors text-mono-500 hover:text-mono-300 ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-1 focus-visible:ring-offset-mono-900"
                  aria-label="Refresh"
                >
                  <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
                </button>
              </div>
            </div>

            {/* URL Bar */}
            <div className="flex-1 mx-2 sm:mx-4 max-w-xl">
              <a 
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-mono-950 rounded-lg border border-mono-800 hover:bg-mono-900 hover:border-mono-700 transition-colors cursor-pointer group"
                title={activeProject.url.replace('https://', '')}
              >
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-mono-600 flex-shrink-0 group-hover:text-mono-400 transition-colors" />
                <span className="text-[10px] sm:text-xs text-mono-400 truncate font-mono group-hover:text-mono-300 transition-colors">
                  {/* Extract domain and show cleaner URL */}
                  {(() => {
                    const url = activeProject.url.replace('https://', '');
                    // For Vercel apps, show just the subdomain.vercel.app
                    if (url.includes('.vercel.app')) {
                      const subdomain = url.split('.vercel.app')[0];
                      // Truncate very long subdomains
                      const cleanSubdomain = subdomain.length > 20 
                        ? subdomain.slice(0, 18) + '...' 
                        : subdomain;
                      return `${cleanSubdomain}.vercel.app`;
                    }
                    return url;
                  })()}
                </span>
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 sm:p-1.5 rounded hover:bg-mono-800 transition-colors text-mono-500 hover:text-mono-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-1 focus-visible:ring-offset-mono-900"
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href={activeProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:block p-1.5 rounded hover:bg-mono-800 transition-colors text-mono-500 hover:text-mono-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-1 focus-visible:ring-offset-mono-900"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Browser Content / Iframe */}
          <div className="relative aspect-[16/10] bg-mono-950">
            {/* Loading Skeleton */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-mono-950"
                >
                  {/* Animated skeleton */}
                  <div className="w-full h-full p-4 space-y-4">
                    {/* Header skeleton */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-mono-800 animate-pulse" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 bg-mono-800 rounded animate-pulse" />
                        <div className="h-3 w-48 bg-mono-800/60 rounded animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Nav skeleton */}
                    <div className="flex gap-4 pt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-3 w-16 bg-mono-800/50 rounded animate-pulse" />
                      ))}
                    </div>
                    
                    {/* Hero skeleton */}
                    <div className="flex-1 flex items-center justify-center py-12">
                      <div className="text-center space-y-4">
                        <Loader2 className="w-8 h-8 text-mono-600 animate-spin mx-auto" />
                        <p className="text-sm text-mono-500">Loading {activeProject.title}...</p>
                      </div>
                    </div>
                    
                    {/* Content skeleton */}
                    <div className="grid grid-cols-3 gap-4 mt-auto">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-mono-800/40 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actual Iframe */}
            <iframe
              ref={iframeRef}
              src={activeProject.url}
              title={activeProject.title}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />

            {/* Overlay gradient at bottom for fade effect */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-mono-950/80 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Project indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {projects.map((project, index) => (
            <button
              key={project.url}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-2 focus-visible:ring-offset-mono-950",
                index === activeIndex 
                  ? "bg-mono-300 w-6" 
                  : "bg-mono-700 hover:bg-mono-600"
              )}
              aria-label={`View ${project.title}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Project Info Card */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-mono-900/50 border border-mono-800"
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="inline-flex items-center justify-center rounded-lg bg-mono-800 p-2 sm:p-2.5 ring-1 ring-mono-700 flex-shrink-0">
              {activeProject.icon || <Globe className="size-4 sm:size-5 text-mono-300" />}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-mono-100 truncate">{activeProject.title}</h3>
              {activeProject.description && (
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-mono-400 line-clamp-2">{activeProject.description}</p>
              )}
            </div>
          </div>
          <a
            href={activeProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium text-mono-300 bg-mono-800 rounded-lg border border-mono-700 hover:bg-mono-700 hover:text-mono-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-2 focus-visible:ring-offset-mono-950 flex-shrink-0 w-full sm:w-auto"
          >
            Visit
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
        {activeProject.tags && activeProject.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium text-mono-400 bg-mono-800 rounded-md border border-mono-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
