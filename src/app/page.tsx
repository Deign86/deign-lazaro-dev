import { Hero, About, Resume, Projects, Deployments, Contact, Navbar } from '@/components';
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
      <main>
        <Hero />
        <About techStack={techStack} />
        <Resume />
        <Deployments />
        <Projects repos={repos} />
        <Contact />
      </main>
    </div>
  );
}
