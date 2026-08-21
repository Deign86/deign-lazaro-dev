import { Hero, About, Resume, Projects, Deployments, Contact, Navbar, AppLogos, KineticFrame } from '@/components';

export const revalidate = 3600;

export default function Home() {
  const techStack = {
    frontend: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    backend: ['Python', 'FastAPI', 'Django', 'Firebase'],
    mobile: ['Dart', 'Flutter'],
    tools: ['Git', 'Vercel'],
  };

  return (
    <div className="site-shell relative min-h-screen bg-background text-foreground">
      <KineticFrame />
      <div className="noise-overlay" />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About techStack={techStack} liveDeployCount={6} />
        <AppLogos />
        <Resume />
        <Deployments />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
