// Vercel API integration for fetching live deployments

export interface VercelProject {
  id: string;
  name: string;
  framework: string | null;
  createdAt: number;
  updatedAt: number;
  latestDeployments?: VercelDeployment[];
  domains?: string[]; // Production domain aliases
  link?: {
    type: string;
    repo: string;
    repoId: number;
    org: string;
  };
}

export interface VercelDeployment {
  uid: string;
  name: string;
  url: string | null;
  state: 'BUILDING' | 'ERROR' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'CANCELED';
  target: 'production' | 'preview' | null;
  createdAt: number;
  buildingAt?: number;
  ready?: number;
  source?: string;
  meta?: {
    githubCommitRef?: string;
    githubCommitMessage?: string;
    githubCommitSha?: string;
    githubRepo?: string;
    githubOrg?: string;
  };
}

export interface LiveDeployment {
  projectId: string;
  projectName: string;
  displayName: string;
  url: string;
  framework: string | null;
  repoName: string | null;
  createdAt: string;
  updatedAt: string;
  state: VercelDeployment['state'];
}

// Custom display names for Vercel projects
const PROJECT_DISPLAY_NAMES: Record<string, string> = {
  'plv-ceit-classroom': 'Digital Classroom PLV',
  'digital-classroom-reservation-for-plv': 'Digital Classroom PLV',
  'v-serve-arta-feedback': 'V-Serve ARTA Analytics',
  'rcbc-debt-tracker': 'RCBC Debt Tracker',
  'mathpulse-ai': 'MathPulse AI',
  'zhi-wei-zai': 'Zhi Wei Zai',
  'deign-lazaro-dev': 'Portfolio',
};

// Custom production URLs for projects with non-standard domains
const CUSTOM_PRODUCTION_URLS: Record<string, string> = {
  'plv-ceit-classroom': 'digital-classroom-reservation-for-plv.vercel.app',
};

// Projects to exclude from the deployments list (like this portfolio itself)
const EXCLUDED_PROJECTS = new Set([
  'deign-lazaro-dev',
  'backend',
  'comlec-assignment-for-kisch',
]);

// Old/legacy projects that should appear at the end
const OLD_PROJECTS = new Set([
  'zhi-wei-zai',
]);

// Format project name for display
function formatProjectName(name: string): string {
  if (PROJECT_DISPLAY_NAMES[name]) {
    return PROJECT_DISPLAY_NAMES[name];
  }
  
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Fetch all Vercel projects with their production deployments
export async function fetchVercelProjects(): Promise<LiveDeployment[]> {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  const teamId = process.env.VERCEL_TEAM_ID || 'team_e08BXKymZI0lnCeyS5LSXDJQ';
  
  if (!token) {
    console.warn('VERCEL_ACCESS_TOKEN not set, falling back to empty deployments');
    return [];
  }
  
  try {
    // Fetch all projects
    const projectsRes = await fetch(
      `https://api.vercel.com/v9/projects?teamId=${teamId}&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 300 }, // Cache for 5 minutes for fresher deployments
      }
    );
    
    if (!projectsRes.ok) {
      console.error('Failed to fetch Vercel projects:', projectsRes.status);
      return [];
    }
    
    const projectsData = await projectsRes.json();
    const projects: VercelProject[] = projectsData.projects || [];
    
    // Fetch project details and latest production deployment for each project
    const deployments: LiveDeployment[] = [];
    
    for (const project of projects) {
      // Skip excluded projects
      if (EXCLUDED_PROJECTS.has(project.name)) {
        continue;
      }
      
      try {
        // Fetch project details to get domains
        const projectDetailRes = await fetch(
          `https://api.vercel.com/v9/projects/${project.id}?teamId=${teamId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 300 }, // Cache for 5 minutes
          }
        );
        
        if (!projectDetailRes.ok) continue;
        
        const projectDetail = await projectDetailRes.json();
        const domains: string[] = projectDetail.targets?.production?.alias || projectDetail.alias || [];
        
        // Get the primary production domain (shortest/cleanest one, usually project-name.vercel.app)
        const productionDomain = getProductionDomain(project.name, domains);
        
        if (!productionDomain) continue;
        
        // Fetch latest production deployment for timing info
        const deploymentsRes = await fetch(
          `https://api.vercel.com/v6/deployments?projectId=${project.id}&teamId=${teamId}&target=production&state=READY&limit=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 300 }, // Cache for 5 minutes
          }
        );
        
        if (!deploymentsRes.ok) continue;
        
        const deploymentsData = await deploymentsRes.json();
        const latestDeployment: VercelDeployment = deploymentsData.deployments?.[0];
        
        if (latestDeployment) {
          deployments.push({
            projectId: project.id,
            projectName: project.name,
            displayName: formatProjectName(project.name),
            url: `https://${productionDomain}`,
            framework: projectDetail.framework || project.framework,
            repoName: projectDetail.link?.repo || project.link?.repo || latestDeployment.meta?.githubRepo || null,
            createdAt: new Date(project.createdAt).toISOString(),
            updatedAt: new Date(latestDeployment.ready || latestDeployment.createdAt).toISOString(),
            state: latestDeployment.state,
          });
        }
      } catch (err) {
        console.error(`Failed to fetch deployments for ${project.name}:`, err);
      }
    }
    
    // Sort: old projects at the end, then by updatedAt (most recent first)
    return deployments.sort((a, b) => {
      const aIsOld = OLD_PROJECTS.has(a.projectName);
      const bIsOld = OLD_PROJECTS.has(b.projectName);
      
      if (aIsOld && !bIsOld) return 1;
      if (!aIsOld && bIsOld) return -1;
      
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  } catch (error) {
    console.error('Error fetching Vercel projects:', error);
    return [];
  }
}

// Get the best production domain from aliases (prefer short, clean URLs)
function getProductionDomain(projectName: string, domains: string[]): string | null {
  // Check for custom production URL override first
  if (CUSTOM_PRODUCTION_URLS[projectName]) {
    return CUSTOM_PRODUCTION_URLS[projectName];
  }
  
  if (!domains || domains.length === 0) {
    // Fallback to standard Vercel domain pattern
    return `${projectName}.vercel.app`;
  }
  
  // Prefer the shortest .vercel.app domain (usually the clean production alias)
  const vercelDomains = domains.filter(d => d.endsWith('.vercel.app'));
  
  // Sort by length (shorter is usually the production alias)
  vercelDomains.sort((a, b) => a.length - b.length);
  
  // Return the cleanest domain, or the first one available
  return vercelDomains[0] || domains[0];
}

// Infer framework tags from Vercel framework field
export function getFrameworkTags(framework: string | null, repoName: string | null): string[] {
  const tags: string[] = [];
  
  // Framework-based tags
  switch (framework) {
    case 'nextjs':
      tags.push('Next.js', 'React', 'TypeScript');
      break;
    case 'vite':
      tags.push('Vite', 'React', 'TypeScript');
      break;
    case 'create-react-app':
      tags.push('React', 'JavaScript');
      break;
    case 'vue':
    case 'nuxtjs':
      tags.push('Vue', 'JavaScript');
      break;
    case 'svelte':
    case 'sveltekit':
    case 'sveltekit-1':
      tags.push('Svelte', 'JavaScript');
      break;
    case 'astro':
      tags.push('Astro', 'TypeScript');
      break;
    case 'remix':
      tags.push('Remix', 'React', 'TypeScript');
      break;
    default:
      // Fallback to generic web tags
      if (framework) {
        tags.push(framework.charAt(0).toUpperCase() + framework.slice(1));
      } else {
        tags.push('Web');
      }
  }
  
  // Add Tailwind for common projects (most Next.js projects use it)
  if (framework === 'nextjs' || framework === 'vite') {
    tags.push('Tailwind');
  }
  
  return tags;
}
