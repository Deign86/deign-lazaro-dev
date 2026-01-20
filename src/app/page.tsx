import { Hero, About, Resume, Projects, Deployments, Contact, Navbar, AppLogos } from '@/components';
import { fetchGitHubRepos, processRepo, extractTechStack } from '@/lib/github';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  // Fetch GitHub data at build/request time
  const rawRepos = await fetchGitHubRepos('Deign86');
  const repos = rawRepos.map(processRepo);
  const techStack = extractTechStack(rawRepos);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main id="main-content">
        <Hero />
        <About techStack={techStack} />
        <AppLogos />
        <Resume />
        <Deployments />
        <Projects repos={repos} />
        <Contact />
      </main>
    </div>
  );
}
