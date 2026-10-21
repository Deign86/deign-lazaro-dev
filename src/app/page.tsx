// Import the module itself, not the '@/components' barrel: every client component the barrel
// re-exports (Hero, About, AppLogos + embla...) would otherwise ship in this page's bundle.
import { SpatialPortfolio } from '@/components/SpatialPortfolio';

export const revalidate = 3600;

export default function Home() {
  const techStack = {
    frontend: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'],
    backend: ['Python', 'FastAPI', 'Django', 'Firebase'],
    mobile: ['Dart', 'Flutter'],
    tools: ['Git', 'Vercel', 'Docker'],
  };

  return (
    <SpatialPortfolio techStack={techStack} liveDeployCount={6} />
  );
}

