import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function assertIncludes(file, value, message) {
  const source = read(file);
  if (!source.includes(value)) {
    throw new Error(`${file}: ${message}`);
  }
}

function assertNotIncludes(file, value, message) {
  const source = read(file);
  if (source.includes(value)) {
    throw new Error(`${file}: ${message}`);
  }
}

assertIncludes(
  'src/app/page.tsx',
  '<KineticFrame />',
  'home page must mount the kinetic monochrome frame'
);

assertIncludes(
  'src/components/KineticFrame.tsx',
  'useScroll',
  'kinetic frame must bind page motion to scroll progress'
);

assertIncludes(
  'src/components/KineticFrame.tsx',
  'useReducedMotion',
  'kinetic frame must respect reduced-motion preferences'
);

assertIncludes(
  'src/components/Hero.tsx',
  'const disciplines',
  'hero must expose rotating discipline labels'
);

assertIncludes(
  'src/components/Hero.tsx',
  'KINETIC PORTFOLIO',
  'hero must declare the editorial kinetic direction'
);

assertIncludes(
  'src/components/About.tsx',
  'signalStrip',
  'about section must use the new signal strip composition'
);

assertIncludes(
  'src/components/Projects.tsx',
  'workIndex',
  'projects section must use indexed editorial project rhythm'
);

assertIncludes(
  'src/app/globals.css',
  '@media (prefers-reduced-motion: reduce)',
  'global CSS must reduce non-essential animation'
);

assertNotIncludes(
  'src/app/globals.css',
  'gradient orb',
  'monochrome design must avoid generic orb language'
);

console.log('Redesign source checks passed.');
