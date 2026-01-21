// GitHub API types and fetching utilities

export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
  email: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

export interface ProcessedRepo {
  id: number;
  name: string;
  displayName: string;
  description: string;
  url: string;
  demoUrl: string | null;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';
}

// Deployment data for live preview
export interface DeploymentInfo {
  name: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  updatedAt: string;
  createdAt: string;
  isOldProject?: boolean; // For projects that should always be at the end
}

// Live deployments configuration - maps repo names to their Vercel URLs
const LIVE_DEPLOYMENTS: Record<string, { url: string; tags: string[] }> = {
  'Digital-Classroom-Assignment-for-PLV-CEIT-Bldg--with-backend-': {
    url: 'https://digital-classroom-reservation-for-plv.vercel.app',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
  },
  'V-Serve-ARTA-Feedback-Analytics': {
    url: 'https://v-serve-arta-feedback.vercel.app',
    tags: ['Flutter', 'Dart', 'Firebase'],
  },
  'rcbc-debt-tracker': {
    url: 'https://rcbc-debt-tracker.vercel.app',
    tags: ['React', 'PWA', 'Tailwind'],
  },
  'mathpulse-ai': {
    url: 'https://mathpulse-ai.vercel.app',
    tags: ['Next.js', 'TypeScript', 'FastAPI'],
  },
  'zhi-wei-zai': {
    url: 'https://zhi-wei-zai.vercel.app',
    tags: ['HTML', 'Tailwind', 'Firebase'],
  },
};

// Categorize repos based on language and topics
function categorizeRepo(repo: GitHubRepo): ProcessedRepo['category'] {
  // Check for manual category override first
  if (CUSTOM_CATEGORIES[repo.name]) {
    return CUSTOM_CATEGORIES[repo.name];
  }
  
  const lang = repo.language?.toLowerCase() || '';
  const topics = repo.topics.map(t => t.toLowerCase());
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  
  const frontendIndicators = ['react', 'vue', 'angular', 'svelte', 'nextjs', 'next', 'frontend', 'tailwind', 'css', 'html', 'ui'];
  const backendIndicators = ['django', 'fastapi', 'express', 'node', 'api', 'backend', 'server', 'database', 'python'];
  const mobileIndicators = ['flutter', 'dart', 'react-native', 'ios', 'android', 'mobile', 'swift', 'kotlin'];
  const fullstackIndicators = ['fullstack', 'full-stack', 'mern', 'mean'];
  
  const allText = `${lang} ${topics.join(' ')} ${name} ${desc}`;
  
  if (fullstackIndicators.some(i => allText.includes(i))) return 'fullstack';
  if (mobileIndicators.some(i => allText.includes(i))) return 'mobile';
  if (frontendIndicators.some(i => allText.includes(i)) && backendIndicators.some(i => allText.includes(i))) return 'fullstack';
  if (frontendIndicators.some(i => allText.includes(i))) return 'frontend';
  if (backendIndicators.some(i => allText.includes(i))) return 'backend';
  
  // Language-based fallback
  if (['typescript', 'javascript'].includes(lang)) return 'frontend';
  if (['python', 'go', 'rust', 'java'].includes(lang)) return 'backend';
  if (['dart', 'swift', 'kotlin'].includes(lang)) return 'mobile';
  
  return 'other';
}

// Custom descriptions for repos that need better context
const CUSTOM_DESCRIPTIONS: Record<string, string> = {
  'cinesense': 'An intelligent movie recommendation system built with Django, featuring ML-powered recommendations, IMDB/Letterboxd integrations, and a beautiful dark-themed UI.',
  'rcbc-debt-tracker': 'Mobile-first PWA for tracking RCBC credit card debt repayment with an interactive payment simulator and progress visualization.',
  'mathpulse-api': 'MathPulse AI Backend - FastAPI-powered ML educational API for personalized math learning analytics.',
  'mathpulse-ai': 'An AI-powered mathematics learning platform designed to help teachers monitor student progress and provide personalized intervention strategies.',
  'Digital-Classroom-Assignment-for-PLV-CEIT-Bldg--with-backend-': 'Full-stack digital classroom management system for PLV CEIT Building with real-time scheduling and room assignment features.',
  'V-Serve-ARTA-Feedback-Analytics': 'Centralized platform for collecting, analyzing, and reporting feedback on government service transactions through the ARTA Client Satisfaction Measurement initiative.',
  'zhi-wei-zai': 'A modern restaurant website for Zhi Wei Zai featuring menu browsing, shopping cart, user authentication, and reservations. Built with HTML/CSS and Firebase backend.',
};

// Custom display names for repos
const CUSTOM_DISPLAY_NAMES: Record<string, string> = {
  'cinesense': 'CineSense',
  'rcbc-debt-tracker': 'RCBC Debt Tracker',
  'mathpulse-api': 'MathPulse API',
  'mathpulse-ai': 'MathPulse AI',
  'Digital-Classroom-Assignment-for-PLV-CEIT-Bldg--with-backend-': 'Digital Classroom PLV',
  'zhi-wei-zai': 'Zhi Wei Zai',
  'V-Serve-ARTA-Feedback-Analytics': 'V-Serve ARTA Analytics',
};

// Custom demo URLs to override GitHub homepage field (fixes typos in repo settings)
const CUSTOM_DEMO_URLS: Record<string, string> = {
  'Digital-Classroom-Assignment-for-PLV-CEIT-Bldg--with-backend-': 'https://digital-classroom-reservation-for-plv.vercel.app',
};

// Custom category overrides for repos that are miscategorized by auto-detection
const CUSTOM_CATEGORIES: Record<string, ProcessedRepo['category']> = {
  'Digital-Classroom-Assignment-for-PLV-CEIT-Bldg--with-backend-': 'fullstack',
  'zhi-wei-zai': 'fullstack',
};

// Old/legacy projects that should ALWAYS appear at the END of lists
// These are kept for portfolio history but are less relevant
const OLD_PROJECTS = new Set([
  'zhi-wei-zai',
]);

// Repos to exclude from the portfolio
const EXCLUDED_REPOS = [
  'comlec-assignment-for-kisch',
];

// Remove emojis from text
function removeEmojis(text: string): string {
  return text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[\u{2600}-\u{26FF}]/gu, '')
    .replace(/[\u{2700}-\u{27BF}]/gu, '')
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
    .trim();
}

// Format repo name for display
function formatRepoName(name: string): string {
  // Check for custom display name first
  if (CUSTOM_DISPLAY_NAMES[name]) {
    return CUSTOM_DISPLAY_NAMES[name];
  }
  
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get description with custom override and emoji removal
function getDescription(repo: GitHubRepo): string {
  const customDesc = CUSTOM_DESCRIPTIONS[repo.name];
  if (customDesc) return customDesc;
  
  if (repo.description) {
    return removeEmojis(repo.description);
  }
  
  return 'A project built with ' + (repo.language || 'code') + '.';
}

// Process raw GitHub repo data
export function processRepo(repo: GitHubRepo): ProcessedRepo {
  return {
    id: repo.id,
    name: repo.name,
    displayName: formatRepoName(repo.name),
    description: getDescription(repo),
    url: repo.html_url,
    demoUrl: CUSTOM_DEMO_URLS[repo.name] || repo.homepage || null,
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    category: categorizeRepo(repo),
  };
}

// Get live deployment info from processed repos (LEGACY - kept for fallback)
export function getLiveDeployments(repos: ProcessedRepo[]): DeploymentInfo[] {
  const deployments: DeploymentInfo[] = [];
  
  for (const repo of repos) {
    const deploymentConfig = LIVE_DEPLOYMENTS[repo.name];
    if (deploymentConfig) {
      deployments.push({
        name: repo.name,
        title: repo.displayName,
        url: deploymentConfig.url,
        description: repo.description,
        tags: deploymentConfig.tags,
        updatedAt: repo.updatedAt,
        createdAt: repo.createdAt,
        isOldProject: OLD_PROJECTS.has(repo.name),
      });
    }
  }
  
  // Sort: old projects at the end, then by updatedAt (most recent first)
  return deployments.sort((a, b) => {
    // Old projects always go to the end
    if (a.isOldProject && !b.isOldProject) return 1;
    if (!a.isOldProject && b.isOldProject) return -1;
    
    // For non-old projects, sort by updatedAt (most recent first)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

// Import types from vercel.ts
import type { LiveDeployment } from './vercel';
import { getFrameworkTags } from './vercel';

// Merge Vercel deployments with GitHub repo data for richer information
export function mergeDeploymentsWithRepos(
  vercelDeployments: LiveDeployment[],
  repos: ProcessedRepo[]
): DeploymentInfo[] {
  const repoMap = new Map(repos.map(r => [r.name.toLowerCase(), r]));
  
  const deployments: DeploymentInfo[] = vercelDeployments.map(deployment => {
    // Try to find matching GitHub repo
    const repoName = deployment.repoName?.toLowerCase() || deployment.projectName.toLowerCase();
    const matchingRepo = repoMap.get(repoName) || 
      Array.from(repoMap.values()).find(r => 
        r.name.toLowerCase().includes(deployment.projectName.toLowerCase()) ||
        deployment.projectName.toLowerCase().includes(r.name.toLowerCase().slice(0, 10))
      );
    
    // Get tags from custom config if exists, otherwise infer from framework
    const customConfig = LIVE_DEPLOYMENTS[matchingRepo?.name || ''];
    const tags = customConfig?.tags || getFrameworkTags(deployment.framework, deployment.repoName);
    
    return {
      name: matchingRepo?.name || deployment.projectName,
      title: matchingRepo?.displayName || deployment.displayName,
      url: deployment.url,
      description: matchingRepo?.description || `A ${deployment.framework || 'web'} project deployed on Vercel.`,
      tags,
      updatedAt: deployment.updatedAt,
      createdAt: deployment.createdAt,
      isOldProject: OLD_PROJECTS.has(deployment.projectName),
    };
  });
  
  // Sort: old projects at the end, then by updatedAt (most recent first)
  return deployments.sort((a, b) => {
    if (a.isOldProject && !b.isOldProject) return 1;
    if (!a.isOldProject && b.isOldProject) return -1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

// Extract tech stack from repos
export function extractTechStack(repos: GitHubRepo[]): {
  frontend: string[];
  backend: string[];
  mobile: string[];
  tools: string[];
} {
  const languages = new Set<string>();
  const allTopics = new Set<string>();
  
  repos.forEach(repo => {
    if (repo.language) languages.add(repo.language);
    repo.topics.forEach(topic => allTopics.add(topic.toLowerCase()));
  });
  
  // Define tech categories with canonical names
  const frontendTech: Record<string, string> = {
    'typescript': 'TypeScript',
    'javascript': 'JavaScript', 
    'react': 'React',
    'nextjs': 'Next.js',
    'next.js': 'Next.js',
    'vue': 'Vue',
    'tailwind': 'Tailwind CSS',
    'tailwindcss': 'Tailwind CSS',
    'html': 'HTML',
    'css': 'CSS',
  };
  
  const backendTech: Record<string, string> = {
    'python': 'Python',
    'django': 'Django',
    'fastapi': 'FastAPI',
    'flask': 'Flask',
    'firebase': 'Firebase',
    'supabase': 'Supabase',
    'postgresql': 'PostgreSQL',
    'mongodb': 'MongoDB',
  };
  
  const mobileTech: Record<string, string> = {
    'dart': 'Dart',
    'flutter': 'Flutter',
    'react-native': 'React Native',
  };
  
  const toolsTech: Record<string, string> = {
    'git': 'Git',
    'docker': 'Docker',
    'vercel': 'Vercel',
  };
  
  const matchTech = (techMap: Record<string, string>): string[] => {
    const matched = new Set<string>();
    const allItems = [
      ...Array.from(languages).map(l => l.toLowerCase()), 
      ...Array.from(allTopics)
    ];
    
    Object.entries(techMap).forEach(([key, displayName]) => {
      if (allItems.some(item => item.includes(key) || key.includes(item))) {
        matched.add(displayName);
      }
    });
    
    return Array.from(matched);
  };
  
  // Build tech stacks with deduplication
  const frontend = matchTech(frontendTech);
  const backend = matchTech(backendTech);
  const mobile = matchTech(mobileTech);
  const tools = matchTech(toolsTech);
  
  // Add detected languages if not already present
  if (languages.has('TypeScript') && !frontend.includes('TypeScript')) frontend.unshift('TypeScript');
  if (languages.has('JavaScript') && !frontend.includes('JavaScript')) frontend.push('JavaScript');
  if (languages.has('Python') && !backend.includes('Python')) backend.unshift('Python');
  if (languages.has('Dart') && !mobile.includes('Dart')) mobile.unshift('Dart');
  
  // Always include HTML & CSS as fundamental web technologies
  if (!frontend.includes('HTML')) frontend.push('HTML');
  if (!frontend.includes('CSS')) frontend.push('CSS');
  
  // Add Firebase (commonly used in your projects)
  if (!backend.includes('Firebase')) backend.push('Firebase');
  
  // Add inferred tools
  if (!tools.includes('Git')) tools.push('Git');
  if (!tools.includes('Vercel') && repos.some(r => r.homepage?.includes('vercel'))) tools.push('Vercel');
  
  return { frontend, backend, mobile, tools };
}

// Fetch GitHub user data
export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Fetch GitHub repos
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    
    // Filter out forks, archived repos, and excluded repos
    const filtered = repos.filter(repo => 
      !repo.fork && 
      !repo.archived && 
      !EXCLUDED_REPOS.includes(repo.name)
    );
    
    // Sort: OLD_PROJECTS always at the end, everything else by updated date (most recent first)
    return filtered.sort((a, b) => {
      const aIsOld = OLD_PROJECTS.has(a.name);
      const bIsOld = OLD_PROJECTS.has(b.name);
      
      // Old projects always go to the end
      if (aIsOld && !bIsOld) return 1;
      if (!aIsOld && bIsOld) return -1;
      
      // Both are old or both are not old: sort by updated date (most recent first)
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
  } catch {
    return [];
  }
}
