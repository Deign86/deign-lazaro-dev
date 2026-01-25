# Flashy Portfolio - AI Assistant Guidelines

## Project Overview

Modern portfolio site built with **Next.js 16 + React 19 + TypeScript**, featuring dynamic GitHub project integration and custom UI/UX animations. Uses **Tailwind CSS v4** with a strict monochromatic (B&W) design system.

**Key Features:**
- Server-side GitHub API integration fetching real projects
- Custom animation components using Framer Motion
- Integrated UI/UX design intelligence system (`skills/ui-ux-pro-max/`)
- React Compiler enabled for automatic optimization

## AI Assistant Tools (CRITICAL - Use Always)

### Context7 Library Documentation
**ALWAYS query Context7 for up-to-date library documentation** before working with any library or framework:

```bash
# Step 1: Resolve library ID first (required before getting docs)
resolve-library-id "framer-motion"  # Returns Context7 ID like /framer/motion

# Step 2: Get documentation with the resolved ID
get-library-docs "/framer/motion" --topic "scroll animations" --mode code

# For conceptual/architectural questions, use mode=info
get-library-docs "/vercel/next.js" --topic "server components" --mode info
```

**When to use:**
- Before implementing animations (Framer Motion patterns)
- When working with Next.js App Router features
- For Tailwind CSS v4 syntax (new API differences)
- Any time you're unsure about API usage or best practices

### Serena Semantic Coding Tools
**ALWAYS use Serena for intelligent code navigation** instead of reading entire files:

```bash
# Find symbols by name pattern (faster than grep)
find_symbol "fetchGitHubRepos" --include-body true

# Get symbol overview without bodies (understand structure first)
find_symbol "Projects" --depth 1 --include-body false

# Find all references to a symbol
find_referencing_symbols "processRepo"

# Search for patterns when symbol name is unclear
search_for_pattern "CUSTOM_DESCRIPTIONS" --relative-path "lib/"
```

**Workflow:**
1. Use `find_symbol` to locate and understand code structure
2. Read symbol bodies ONLY when needed (not entire files)
3. Use `find_referencing_symbols` before modifying functions/classes
4. Use `search_for_pattern` for flexible text/regex searches

**Memory management:**
- Read project memories with `read_memory` before starting work
- Write important decisions to memories with `write_memory`

## Architecture

### Data Flow
1. **Server Components** (`page.tsx`): Fetch GitHub data at build/request time (ISR: 1 hour)
2. **GitHub Service** (`lib/github.ts`): Processes raw repos → categorized projects with custom descriptions
3. **Client Components**: Animated sections using Framer Motion with scroll-based parallax

```
GitHub API → fetchGitHubRepos → processRepo → <Projects repos={...} />
                ↓
          extractTechStack → <About techStack={...} />
```

### Component Architecture
- **Page Components** (src/components/*.tsx): Hero, About, Resume, Projects, Contact, Deployments
- **UI Primitives** (src/components/ui/*.tsx): Reusable animated components
  - `text-reveal.tsx`: Staggered text blur/fade effects
  - `scroll-reveal.tsx`: Scroll-triggered animations with IntersectionObserver
  - `spotlight-card.tsx`: Interactive hover spotlight effect
- **Barrel Export** (`components/index.ts`): All page components exported for clean imports

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (Next.js config)
```

## Design System

### Monochromatic Palette
**Strict B&W only** - no accent colors. Uses CSS variables in `globals.css`:
- Mono palette: `--mono-50` (lightest) to `--mono-950` (darkest)
- **Dark mode permanently locked** - no light mode variants, consistent across all devices
- Apply via Tailwind: `bg-mono-100`, `text-mono-900`, `border-mono-200`

```tsx
// ✅ Correct
<div className="bg-mono-50 text-mono-950 border-mono-200">

// ❌ Never use colors outside the mono palette
<div className="bg-blue-500 text-red-600">
```

### UI/UX Design Intelligence
Located in `skills/ui-ux-pro-max/` - a searchable design guide with 50+ styles, 97 palettes, 57 font pairings, 99 UX guidelines across 9 tech stacks.

**Search Design Patterns:**
```bash
# Get design recommendations for specific contexts
python skills/ui-ux-pro-max/scripts/search.py "portfolio developer creative flashy animated modern" --design-system -p "Flashy Portfolio"

# Search specific domains: style, color, chart, landing, product, ux, typography
python skills/ui-ux-pro-max/scripts/search.py "glassmorphism dark mode" --domain style

# Stack-specific guidelines (react, nextjs, html-tailwind, vue, svelte, etc.)
python skills/ui-ux-pro-max/scripts/search.py "button hover animation" --stack nextjs
```

**Design System Persistence:**
- Use `--persist` flag to save design system to `design-system/MASTER.md`
- Use `--page <name>` to create page-specific overrides in `design-system/pages/`

## Code Conventions

### Animation Patterns
All animations use **Framer Motion**. Common patterns:

```tsx
// Scroll-based parallax
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start start', 'end start']
});
const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

// Staggered reveals (use scroll-reveal.tsx)
<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id} direction="up" blur={true}>
      {/* content */}
    </StaggerItem>
  ))}
</StaggerContainer>
```

### GitHub Integration Patterns
**Custom data in `lib/github.ts`:**
- `CUSTOM_DESCRIPTIONS`: Override repo descriptions for better context
- `CUSTOM_DISPLAY_NAMES`: Format repo names for display (e.g., "cinesense" → "CineSense")
- `EXCLUDED_REPOS`: Hide specific repos from portfolio
- Categorization: Repos auto-categorized as frontend/backend/fullstack/mobile/other

### Component Patterns
```tsx
// ✅ Use 'use client' only when needed (animations, interactivity)
'use client';

// ✅ Import from component barrel
import { Hero, About, Projects } from '@/components';

// ✅ Path aliases configured (@/ → ./src/)
import { cn } from '@/lib/utils';
```

## TypeScript Configuration
- **Strict mode enabled** (no implicit any)
- **JSX mode:** `react-jsx` (no React import needed)
- **Path alias:** `@/*` → `src/*`
- **Target:** ES2017 (Next.js handles transpilation)

## Critical Files
- `src/app/page.tsx`: Main entry point, server-side data fetching
- `src/lib/github.ts`: GitHub API types, repo processing, categorization logic
- `src/app/globals.css`: Monochromatic design system CSS variables
- `src/components/ui/`: Reusable animated primitives
- `skills/ui-ux-pro-max/SKILL.md`: Complete design guide reference
- `next.config.ts`: React Compiler enabled

## Integration Notes
- **ISR:** Page revalidates every hour (`revalidate = 3600`)
- **GitHub API:** Unauthenticated requests (60/hour rate limit)
- **React 19:** Uses new JSX transform, React Compiler optimizations
- **Tailwind CSS v4:** Uses new `@import "tailwindcss"` syntax, `@theme inline` for custom properties

## Common Tasks

### Adding New Animated Components
1. Create in `src/components/ui/` with Framer Motion
2. Mark as `'use client'` if interactive
3. Use existing patterns (scroll-reveal, text-reveal, spotlight-card)
4. Follow B&W design system strictly

### Customizing GitHub Projects
1. Edit `CUSTOM_DESCRIPTIONS` in `lib/github.ts` for better descriptions
2. Add to `EXCLUDED_REPOS` to hide from portfolio
3. Modify `categorizeRepo()` logic to adjust project categorization

### Querying Design Guidelines
1. Run `search.py` with relevant query and domain/stack
2. Apply recommended patterns to components
3. Reference `skills/ui-ux-pro-max/SKILL.md` for complete guide
