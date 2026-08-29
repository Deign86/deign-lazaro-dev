import { Hero, About, Resume, Projects, Deployments, Contact, Navbar, AppLogos, KineticFrame, LiquidObject } from '@/components';

export const revalidate = 3600;

export default function Home() {
  const techStack = {
    frontend: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    backend: ['Python', 'FastAPI', 'Django', 'Firebase'],
    mobile: ['Dart', 'Flutter'],
    tools: ['Git', 'Vercel', 'Docker'],
  };

  return (
    <div className="site-shell relative min-h-screen bg-background text-foreground">
      <KineticFrame />
      <LiquidObject />
      <div className="noise-overlay" />
      <Navbar />
      <main id="main-content" className="relative z-10">
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
