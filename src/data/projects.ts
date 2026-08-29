export interface PinnedProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubRepo?: string;
  liveUrlCandidates: string[];
  thumbnail?: string;
  featured: true;
  order: number;
}

// This array is the single source of truth for the public Projects section. Edit it manually to add or remove a showcased project.
export const PINNED_PROJECTS: PinnedProject[] = [
  {
    id: 'mathpulse-ai',
    title: 'MathPulse AI',
    description: 'An AI-powered mathematics learning platform for monitoring student progress and delivering personalized intervention strategies.',
    tags: ['Next.js', 'TypeScript', 'FastAPI'],
    githubRepo: 'Deign86/mathpulse-ai',
    liveUrlCandidates: [
      'https://deign86-mathpulse-ai.static.hf.space/index.html',
      'https://mathpulse-ai.vercel.app',
    ],
    thumbnail: '/profile.jpg',
    featured: true,
    order: 1,
  },
  {
    id: 'v-serve-arta-feedback-analytics',
    title: 'VServe',
    description: 'A platform for collecting, analyzing, and reporting feedback on government service transactions.',
    tags: ['Flutter', 'Dart', 'Firebase'],
    githubRepo: 'Deign86/v-serve-arta-feedback-analytics',
    liveUrlCandidates: [
      'https://v-serve-arta-feedback.vercel.app',
      'https://v-serve-arta-feedback-analytics.vercel.app',
    ],
    thumbnail: '/profile.jpg',
    featured: true,
    order: 2,
  },
  {
    id: 'gamecon-system',
    title: 'GameCon System',
    description: 'An operations dashboard for live headcounts, staffing shifts, tasking, and budget and incident tracking.',
    tags: ['Vite', 'React', 'Firebase'],
    githubRepo: 'Deign86/gamecon-system',
    liveUrlCandidates: [
      'https://playverse-ops.vercel.app',
      'https://gamecon-system.vercel.app',
    ],
    thumbnail: '/profile.jpg',
    featured: true,
    order: 3,
  },
  {
    id: 'digital-classroom-assignment',
    title: 'Digital Classroom Assignment',
    description: 'A full-stack classroom management system with real-time scheduling and room assignment features.',
    githubRepo: 'Deign86/digital-classroom-assignment-for-plv-ceit-bldg--with-backend-',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
    liveUrlCandidates: [
      'https://digital-classroom-reservation-for-plv.vercel.app',
      'https://plv-ceit-classroom.vercel.app',
    ],
    thumbnail: '/profile.jpg',
    featured: true,
    order: 4,
  },
  {
    id: 'zhi-wei-zai',
    title: 'Zhi Wei Zai',
    description: 'A modern restaurant website with menu browsing, shopping cart, authentication, and reservations.',
    tags: ['HTML', 'Tailwind', 'Firebase'],
    githubRepo: 'Deign86/zhi-wei-zai',
    liveUrlCandidates: [
      'https://zhi-wei-zai.vercel.app',
      'https://zhi-wei-zai.vercel.app/',
    ],
    thumbnail: '/profile.jpg',
    featured: true,
    order: 5,
  },
  {
    id: 'apg-website',
    title: 'APG Website',
    description: 'A focused website experience for APG, designed around clear information and practical navigation.',
    tags: ['HTML', 'CSS'],
    githubRepo: 'Deign86/apg-website',
    liveUrlCandidates: [
      'https://apg-website-alpha-gamma.vercel.app',
      'https://apg-website.vercel.app',
      'https://apg-website-git-main-deign86.vercel.app',
    ],
    thumbnail: '/profile.jpg',
    featured: true,
    order: 6,
  },
];
