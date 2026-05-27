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

// Live deployments configuration - maps repo names (lowercase) to their URLs
const LIVE_DEPLOYMENTS: Record<string, { url: string; tags: string[] }> = {
  'digital-classroom-assignment-for-plv-ceit-bldg--with-backend-': {
    url: 'https://digital-classroom-reservation-for-plv.vercel.app',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
  },
  'v-serve-arta-feedback-analytics': {
    url: 'https://v-serve-arta-feedback.vercel.app',
    tags: ['Flutter', 'Dart', 'Firebase'],
  },
  'mathpulse-ai': {
    url: 'https://deign86-mathpulse-ai.static.hf.space',
    tags: ['Next.js', 'TypeScript', 'FastAPI'],
  },
  'zhi-wei-zai': {
    url: 'https://zhi-wei-zai.vercel.app',
    tags: ['HTML', 'Tailwind', 'Firebase'],
  },
  'gamecon-system': {
    url: 'https://playverse-ops.vercel.app/',
    tags: ['Vite', 'React', 'Firebase'],
  },
};

// Categorize repos based on language and topics
function categorizeRepo(repo: GitHubRepo): ProcessedRepo['category'] {
  // Check for manual category override first (case-insensitive)
  const normalizedName = repo.name.toLowerCase();
  if (CUSTOM_CATEGORIES[normalizedName]) {
    return CUSTOM_CATEGORIES[normalizedName];
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

// Custom descriptions for repos that need better context (keys are lowercase)
const CUSTOM_DESCRIPTIONS: Record<string, string> = {
  'cinesense': 'An intelligent movie recommendation system built with Django, featuring ML-powered recommendations, IMDB/Letterboxd integrations, and a beautiful dark-themed UI.',
  'mathpulse-ai': 'An AI-powered mathematics learning platform designed to help teachers monitor student progress and provide personalized intervention strategies.',
  'digital-classroom-assignment-for-plv-ceit-bldg--with-backend-': 'Full-stack digital classroom management system for PLV CEIT Building with real-time scheduling and room assignment features.',
  'v-serve-arta-feedback-analytics': 'Centralized platform for collecting, analyzing, and reporting feedback on government service transactions through the ARTA Client Satisfaction Measurement initiative.',
  'zhi-wei-zai': 'A modern restaurant website for Zhi Wei Zai featuring menu browsing, shopping cart, user authentication, and reservations. Built with HTML/CSS and Firebase backend.',
  'gamecon-system': 'Operations dashboard for IT GameCon 2026 with live headcounts, staffing shifts, tasking, and budget/incident tracking built as a Firebase-backed PWA.',
};

// Custom display names for repos (keys are lowercase)
const CUSTOM_DISPLAY_NAMES: Record<string, string> = {
  'cinesense': 'CineSense',
  'mathpulse-ai': 'MathPulse AI',
  'digital-classroom-assignment-for-plv-ceit-bldg--with-backend-': 'Digital Classroom PLV',
  'zhi-wei-zai': 'Zhi Wei Zai',
  'v-serve-arta-feedback-analytics': 'V-Serve ARTA Analytics',
  'gamecon-system': 'GameCon System',
};

// Custom demo URLs to override GitHub homepage field (keys are lowercase)
const CUSTOM_DEMO_URLS: Record<string, string> = {
  'digital-classroom-assignment-for-plv-ceit-bldg--with-backend-': 'https://digital-classroom-reservation-for-plv.vercel.app',
  'gamecon-system': 'https://playverse-ops.vercel.app/',
};

// Custom category overrides for repos that are miscategorized by auto-detection (keys are lowercase)
const CUSTOM_CATEGORIES: Record<string, ProcessedRepo['category']> = {
  'digital-classroom-assignment-for-plv-ceit-bldg--with-backend-': 'fullstack',
  'zhi-wei-zai': 'fullstack',
  'gamecon-system': 'fullstack',
};

// Featured projects that should ALWAYS appear FIRST in lists
// These are pinned to the top regardless of timestamp
const FEATURED_PROJECTS = new Set([
  'mathpulse-ai',
]);

// Old/legacy projects that should ALWAYS appear at the END of lists
// These are kept for portfolio history but are less relevant
const OLD_PROJECTS = new Set([
  'zhi-wei-zai',
]);

// Repos to exclude from the portfolio
const EXCLUDED_REPOS = [
  'comlec-assignment-for-kisch',
  'deign-lazaro-dev',
  'des-encryption',
  'des-simulation',
  'mathpulse-api',
  'mathpulse-ai-prototype',
  'rcbc-debt-tracker',
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
  // Check for custom display name first (case-insensitive)
  const normalizedName = name.toLowerCase();
  if (CUSTOM_DISPLAY_NAMES[normalizedName]) {
    return CUSTOM_DISPLAY_NAMES[normalizedName];
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
  const normalizedName = repo.name.toLowerCase();
  const customDesc = CUSTOM_DESCRIPTIONS[normalizedName];
  if (customDesc) return customDesc;
  
  if (repo.description) {
    return removeEmojis(repo.description);
  }
  
  return 'A project built with ' + (repo.language || 'code') + '.';
}

// Build basic tags for deployment cards when custom tags are not provided
function getRepoTags(repo: ProcessedRepo): string[] {
  const tags = new Set<string>();
  
  if (repo.language && repo.language !== 'Unknown') {
    tags.add(repo.language);
  }
  
  repo.topics.slice(0, 3).forEach(topic => {
    if (topic.trim()) {
      tags.add(topic);
    }
  });
  
  return Array.from(tags);
}

// Process raw GitHub repo data
export function processRepo(repo: GitHubRepo): ProcessedRepo {
  const normalizedName = repo.name.toLowerCase();
  return {
    id: repo.id,
    name: repo.name,
    displayName: formatRepoName(repo.name),
    description: getDescription(repo),
    url: repo.html_url,
    demoUrl: CUSTOM_DEMO_URLS[normalizedName] || repo.homepage || null,
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
    const url = deploymentConfig?.url || repo.demoUrl;
    if (!url) continue;
    
    deployments.push({
      name: repo.name,
      title: repo.displayName,
      url,
      description: repo.description,
      tags: deploymentConfig?.tags || getRepoTags(repo),
      updatedAt: repo.updatedAt,
      createdAt: repo.createdAt,
      isOldProject: OLD_PROJECTS.has(repo.name.toLowerCase()),
    });
  }
  
  // Sort: featured first, old projects last, then by updatedAt (most recent first)
  return deployments.sort((a, b) => {
    // Featured projects always come first (case-insensitive)
    const aIsFeatured = FEATURED_PROJECTS.has(a.name.toLowerCase());
    const bIsFeatured = FEATURED_PROJECTS.has(b.name.toLowerCase());
    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;
    
    // Old projects always go to the end
    if (a.isOldProject && !b.isOldProject) return 1;
    if (!a.isOldProject && b.isOldProject) return -1;
    
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
  const processedRepos = new Set<string>();
  
  const deployments: DeploymentInfo[] = vercelDeployments.map(deployment => {
    // Try to find matching GitHub repo
    const repoName = deployment.repoName?.toLowerCase() || deployment.projectName.toLowerCase();
    const matchingRepo = repoMap.get(repoName) || 
      Array.from(repoMap.values()).find(r => 
        r.name.toLowerCase().includes(deployment.projectName.toLowerCase()) ||
        deployment.projectName.toLowerCase().includes(r.name.toLowerCase().slice(0, 10))
      );
    
    // Track which repos we've processed
    if (matchingRepo) processedRepos.add(matchingRepo.name.toLowerCase());
    
    // Get tags from custom config if exists, otherwise infer from framework
    const customConfig = LIVE_DEPLOYMENTS[matchingRepo?.name?.toLowerCase() || ''];
    const tags = customConfig?.tags || getFrameworkTags(deployment.framework);
    
    // Use custom URL if available (e.g., Hugging Face for MathPulse AI)
    const url = customConfig?.url || deployment.url;
    
    return {
      name: matchingRepo?.name || deployment.projectName,
      title: matchingRepo?.displayName || deployment.displayName,
      url,
      description: matchingRepo?.description || `A ${deployment.framework || 'web'} project deployed on Vercel.`,
      tags,
      updatedAt: deployment.updatedAt,
      createdAt: deployment.createdAt,
      isOldProject: OLD_PROJECTS.has(deployment.projectName.toLowerCase()),
    };
  });
  
  // Add repos that have LIVE_DEPLOYMENTS config but weren't in Vercel deployments
  for (const repo of repos) {
    const normalizedName = repo.name.toLowerCase();
    if (processedRepos.has(normalizedName)) continue;
    
    const deploymentConfig = LIVE_DEPLOYMENTS[normalizedName];
    if (!deploymentConfig) continue;
    
    deployments.push({
      name: repo.name,
      title: repo.displayName,
      url: deploymentConfig.url,
      description: repo.description,
      tags: deploymentConfig.tags,
      updatedAt: repo.updatedAt,
      createdAt: repo.createdAt,
      isOldProject: OLD_PROJECTS.has(normalizedName),
    });
  }
  
  // Sort: featured first, old projects last, then by updatedAt (most recent first)
  return deployments.sort((a, b) => {
    // Featured projects always come first (case-insensitive)
    const aIsFeatured = FEATURED_PROJECTS.has(a.name.toLowerCase());
    const bIsFeatured = FEATURED_PROJECTS.has(b.name.toLowerCase());
    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;
    
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
    
    // Filter out forks, archived repos, and excluded repos (case-insensitive)
    const excludedLower = EXCLUDED_REPOS.map(r => r.toLowerCase());
    const filtered = repos.filter(repo => 
      !repo.fork && 
      !repo.archived && 
      !excludedLower.includes(repo.name.toLowerCase())
    );
    
    // Sort: featured first, old projects last, everything else by updated date (most recent first)
    return filtered.sort((a, b) => {
      // Featured projects always come first (case-insensitive)
      const aIsFeatured = FEATURED_PROJECTS.has(a.name.toLowerCase());
      const bIsFeatured = FEATURED_PROJECTS.has(b.name.toLowerCase());
      if (aIsFeatured && !bIsFeatured) return -1;
      if (!aIsFeatured && bIsFeatured) return 1;
      
      const aIsOld = OLD_PROJECTS.has(a.name.toLowerCase());
      const bIsOld = OLD_PROJECTS.has(b.name.toLowerCase());
      
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
