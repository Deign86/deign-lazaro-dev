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
  updatedAt: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';
}

// Categorize repos based on language and topics
function categorizeRepo(repo: GitHubRepo): ProcessedRepo['category'] {
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
};

// Custom display names for repos
const CUSTOM_DISPLAY_NAMES: Record<string, string> = {
  'cinesense': 'CineSense',
  'rcbc-debt-tracker': 'RCBC Debt Tracker',
  'mathpulse-api': 'MathPulse API',
  'mathpulse-ai': 'MathPulse AI',
  'Digital-Classroom-Assignment-for-PLV-CEIT-Bldg--with-backend-': 'Digital Classroom PLV',
  'V-Serve-ARTA-Feedback-Analytics': 'V-Serve ARTA Analytics',
};

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
    demoUrl: repo.homepage || null,
    language: repo.language || 'Unknown',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics,
    updatedAt: repo.updated_at,
    category: categorizeRepo(repo),
  };
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
  
  // Add Firebase and Supabase (commonly used in your projects)
  if (!backend.includes('Firebase')) backend.push('Firebase');
  if (!backend.includes('Supabase')) backend.push('Supabase');
  
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
    return repos.filter(repo => 
      !repo.fork && 
      !repo.archived && 
      !EXCLUDED_REPOS.includes(repo.name)
    );
  } catch {
    return [];
  }
}
