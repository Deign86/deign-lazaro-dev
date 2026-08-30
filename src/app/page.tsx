import { SpatialPortfolio } from '@/components';

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

