import { Hero, About, Resume, Projects, Deployments, Contact, Navbar, AppLogos } from '@/components';
import { fetchGitHubRepos, processRepo, extractTechStack, getLiveDeployments, mergeDeploymentsWithRepos } from '@/lib/github';
import { fetchVercelProjects } from '@/lib/vercel';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch GitHub and Vercel data in parallel at build/request time
  const [rawRepos, vercelDeployments] = await Promise.all([
    fetchGitHubRepos('Deign86'),
    fetchVercelProjects(),
  ]);
  
  const repos = rawRepos.map(processRepo);
  const techStack = extractTechStack(rawRepos);
  
  // Use Vercel API deployments if available, otherwise fallback to hardcoded config
  const liveDeployments = vercelDeployments.length > 0
    ? mergeDeploymentsWithRepos(vercelDeployments, repos)
    : getLiveDeployments(repos);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About techStack={techStack} liveDeployCount={liveDeployments.length} />
        <AppLogos />
        <Resume />
        <Deployments deployments={liveDeployments} />
        <Projects repos={repos} />
        <Contact />
      </main>
    </div>
  );
}
