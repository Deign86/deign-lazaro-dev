"use client";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface DeploymentCardProps {
  className?: string;
  icon?: React.ReactNode;
  title: string;
  url: string;
  repoName: string;
  lastCommit?: string;
  date?: string;
}

function DeploymentCard({
  className,
  icon,
  title,
  url,
  repoName,
  lastCommit,
  date,
}: DeploymentCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex h-32 sm:h-40 w-[16rem] sm:w-[22rem] select-none flex-col justify-between rounded-xl border border-mono-800 bg-mono-900/80 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 transition-all duration-500",
        "hover:border-mono-600 hover:bg-mono-800/90 hover:shadow-lg hover:shadow-mono-950/50 cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mono-400 focus-visible:ring-offset-2 focus-visible:ring-offset-mono-950 focus-visible:border-mono-600",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[14rem] sm:after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] after:pointer-events-none",
        className
      )}
      style={{ transform: 'skewY(-8deg)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 relative z-10">
        <span className="inline-flex items-center justify-center rounded-full bg-mono-800 p-2 ring-1 ring-mono-700">
          {icon || <ExternalLink className="size-4 text-mono-300" />}
        </span>
        <div className="flex flex-col">
          <p className="text-base font-semibold text-mono-100 group-hover:text-white transition-colors">
            {title}
          </p>
          <p className="text-xs text-mono-500 truncate max-w-[140px] sm:max-w-[200px]">{url.replace('https://', '')}</p>
        </div>
      </div>

      {/* Repo link */}
      <div className="flex items-center gap-2 relative z-10">
        <svg className="w-4 h-4 text-mono-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        <span className="text-sm text-mono-400 truncate">{repoName}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between relative z-10">
        <p className="text-xs text-mono-500 truncate max-w-[120px] sm:max-w-[180px]" title={lastCommit}>
          {lastCommit || 'Latest deployment'}
        </p>
        <p className="text-xs text-mono-600">{date}</p>
      </div>

      {/* Hover arrow */}
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <ExternalLink className="size-4 text-mono-400" />
      </div>
    </a>
  );
}

export interface DeploymentData {
  title: string;
  url: string;
  repoName: string;
  lastCommit?: string;
  date?: string;
  icon?: React.ReactNode;
}

interface DisplayCardsProps {
  deployments: DeploymentData[];
}

export default function DisplayCards({ deployments }: DisplayCardsProps) {
  // Pre-defined card positions for the stacked effect
  // Note: In CSS grid stacking, later elements appear on TOP
  // So we reverse the array so that the first item (most important) appears on top
  // and old projects (at the end of the array) appear at the bottom of the stack
  const reversedDeployments = [...deployments].reverse();
  
  // Mobile-first card positions: smaller offsets on mobile, larger on sm+
  const cardStyles = [
    "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-mono-800 before:h-full before:content-[''] before:bg-blend-overlay before:bg-mono-950/60 grayscale-[60%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0 before:pointer-events-none",
    "[grid-area:stack] translate-x-6 sm:translate-x-12 translate-y-6 sm:translate-y-10 hover:-translate-y-1 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-mono-800 before:h-full before:content-[''] before:bg-blend-overlay before:bg-mono-950/60 grayscale-[60%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0 before:pointer-events-none",
    "[grid-area:stack] translate-x-12 sm:translate-x-24 translate-y-12 sm:translate-y-20 hover:translate-y-10 before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-mono-800 before:h-full before:content-[''] before:bg-blend-overlay before:bg-mono-950/40 grayscale-[30%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0 before:pointer-events-none",
    "[grid-area:stack] translate-x-[4.5rem] sm:translate-x-36 translate-y-[4.5rem] sm:translate-y-[7.5rem] hover:translate-y-[5rem] before:absolute before:w-full before:outline-1 before:rounded-xl before:outline-mono-800 before:h-full before:content-[''] before:bg-blend-overlay before:bg-mono-950/30 grayscale-[20%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0 before:pointer-events-none",
    "[grid-area:stack] translate-x-24 sm:translate-x-48 translate-y-24 sm:translate-y-[10rem] hover:translate-y-[7.5rem]",
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid [grid-template-areas:'stack'] place-items-center"
    >
      {reversedDeployments.slice(0, 5).map((deployment, index) => (
        <DeploymentCard
          key={deployment.url}
          className={cardStyles[index] || cardStyles[cardStyles.length - 1]}
          title={deployment.title}
          url={deployment.url}
          repoName={deployment.repoName}
          lastCommit={deployment.lastCommit}
          date={deployment.date}
          icon={deployment.icon}
        />
      ))}
    </motion.div>
  );
}
