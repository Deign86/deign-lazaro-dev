import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Jost } from 'next/font/google';
import { RevealOnScroll } from '@/components/alpha-premier/RevealOnScroll';
import './styles/tokens.css';
import './styles/stage.css';
import './styles/systems.css';
import './styles/closing.css';

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const title = 'Lights on at Unit 3104 | Deign Lazaro at Alpha Premier Realty';
const description =
  'How Alpha Premier Realty, a brokerage in Ortigas with no IT department, got four systems of its own from its 2026 IT Administrator intern.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/alpha-premier' },
  openGraph: {
    title,
    description,
    url: '/alpha-premier',
    type: 'article',
    images: [{ url: '/alpha-premier/og.jpg', width: 1200, height: 630, alt: 'Lights on at Unit 3104' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/alpha-premier/og.jpg'] },
};

export const viewport: Viewport = {
  themeColor: '#dfdedb',
};

export default function AlphaPremierLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`ap-root ${bodoni.variable} ${jost.variable}`}>
      {children}
      <RevealOnScroll />
    </div>
  );
}
