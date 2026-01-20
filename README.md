# Flashy Portfolio

A modern, animated portfolio website built with Next.js 16, React 19, and TypeScript, featuring dynamic GitHub project integration and stunning UI/UX animations.

## 🚀 Live Demo

**Production**: [https://deign-lazaro-dev.vercel.app](https://deign-lazaro-dev.vercel.app)

**Repository**: [https://github.com/Deign86/deign-lazaro-dev](https://github.com/Deign86/deign-lazaro-dev)

## ✨ Features

- **Dynamic GitHub Integration**: Automatically fetches and displays your latest GitHub projects
- **Smooth Animations**: Custom animations powered by Framer Motion
- **Monochromatic Design**: Strict black & white design system with dark mode support
- **React 19 & Next.js 16**: Built with the latest React and Next.js features
- **TypeScript**: Fully typed for better developer experience
- **Tailwind CSS v4**: Modern styling with CSS variables
- **Auto-Deployment**: Connected to Vercel for automatic deployments from GitHub
- **ISR (Incremental Static Regeneration)**: Fresh GitHub data every hour
- **Responsive Design**: Optimized for all screen sizes

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **UI Library**: [React 19](https://react.dev)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com)
- **API Integration**: GitHub REST API

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Deign86/deign-lazaro-dev.git
cd deign-lazaro-dev
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🎨 Project Structure

```
deign-lazaro-dev/
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── globals.css       # Global styles & design system
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page with server-side data fetching
│   ├── components/           # React components
│   │   ├── Hero.tsx          # Hero section with animations
│   │   ├── About.tsx         # About section
│   │   ├── Projects.tsx      # GitHub projects display
│   │   ├── Resume.tsx        # Resume/experience section
│   │   ├── Contact.tsx       # Contact form/info
│   │   ├── Deployments.tsx   # Deployment information
│   │   └── ui/               # Reusable UI components
│   │       ├── text-reveal.tsx      # Text reveal effects
│   │       ├── scroll-reveal.tsx    # Scroll-triggered animations
│   │       └── spotlight-card.tsx   # Interactive hover cards
│   └── lib/
│       ├── github.ts         # GitHub API integration
│       └── utils.ts          # Utility functions
├── skills/
│   └── ui-ux-pro-max/        # Design system & UI/UX guidelines
└── public/                   # Static assets
```

## 🎯 Key Features Explained

### GitHub Integration

The portfolio automatically fetches your GitHub repositories and displays them with:
- Custom descriptions (configurable in `lib/github.ts`)
- Automatic categorization (Frontend, Backend, Full-stack, Mobile, Other)
- Tech stack extraction from repository languages
- Live stats (stars, forks, etc.)

To customize displayed projects, edit `CUSTOM_DESCRIPTIONS` and `EXCLUDED_REPOS` in `src/lib/github.ts`.

### Animation System

Built with Framer Motion, featuring:
- **Scroll-based parallax**: Smooth scrolling effects
- **Staggered reveals**: Sequential element animations
- **Text effects**: Blur and fade-in animations
- **Interactive elements**: Hover states and spotlight effects

### Design System

Monochromatic (black & white) design with:
- CSS variables for easy theming
- Automatic dark mode support
- Consistent spacing and typography
- Custom Tailwind utilities

## 🚀 Deployment

This project is configured for automatic deployment on Vercel:

1. Push changes to the `main` branch
2. Vercel automatically builds and deploys
3. Live in seconds!

### Manual Deployment

```bash
vercel --prod
```

## 📝 Configuration

### GitHub API

The GitHub integration uses unauthenticated requests (60/hour rate limit). To increase this:

1. Create a GitHub Personal Access Token
2. Add to `.env.local`:
```env
GITHUB_TOKEN=your_token_here
```

### ISR Revalidation

Adjust the revalidation time in `src/app/page.tsx`:
```typescript
export const revalidate = 3600; // seconds (1 hour)
```

## 🎨 Customization

### Colors

Edit CSS variables in `src/app/globals.css`:
```css
:root {
  --mono-50: #fafafa;
  --mono-950: #0a0a0a;
  /* ... */
}
```

### Animations

Modify animation parameters in component files or create new ones in `src/components/ui/`.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Deign Lazaro**

- GitHub: [@Deign86](https://github.com/Deign86)
- Portfolio: [https://deign-lazaro-dev.vercel.app](https://deign-lazaro-dev.vercel.app)

---

Built with ❤️ using Next.js, React, and TypeScript
