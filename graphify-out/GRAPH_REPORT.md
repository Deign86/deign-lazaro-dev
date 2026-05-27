# Graph Report - .  (2026-05-27)

## Corpus Check
- 75 files · ~144,629 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 371 nodes · 488 edges · 34 communities (18 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.79)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Design System Generator|Design System Generator]]
- [[_COMMUNITY_Deployments Component|Deployments Component]]
- [[_COMMUNITY_GitHub Integration|GitHub Integration]]
- [[_COMMUNITY_Dependencies|Dependencies]]
- [[_COMMUNITY_Page Components|Page Components]]
- [[_COMMUNITY_CLI Commands|CLI Commands]]
- [[_COMMUNITY_SearchExplore|Search/Explore]]
- [[_COMMUNITY_UI Components|UI Components]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_BM25 Search Engine|BM25 Search Engine]]
- [[_COMMUNITY_Hero Section|Hero Section]]
- [[_COMMUNITY_Vercel Integration|Vercel Integration]]
- [[_COMMUNITY_Layout & Routing|Layout & Routing]]
- [[_COMMUNITY_Config Files|Config Files]]
- [[_COMMUNITY_Animation System|Animation System]]
- [[_COMMUNITY_Contact Form|Contact Form]]
- [[_COMMUNITY_API Routes|API Routes]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_Agent Config|Agent Config]]
- [[_COMMUNITY_Design Tokens|Design Tokens]]
- [[_COMMUNITY_OpenGraph|OpenGraph]]
- [[_COMMUNITY_Error Handling|Error Handling]]
- [[_COMMUNITY_CV Generator|CV Generator]]
- [[_COMMUNITY_Video Capture|Video Capture]]
- [[_COMMUNITY_Skill System|Skill System]]
- [[_COMMUNITY_Context Engineering|Context Engineering]]
- [[_COMMUNITY_Profile Photo|Profile Photo]]
- [[_COMMUNITY_Font Loading|Font Loading]]
- [[_COMMUNITY_Carousel|Carousel]]
- [[_COMMUNITY_Display Cards|Display Cards]]
- [[_COMMUNITY_Live Preview|Live Preview]]
- [[_COMMUNITY_Spotlight Effects|Spotlight Effects]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 20 edges
2. `compilerOptions` - 16 edges
3. `str` - 16 edges
4. `DesignSystemGenerator` - 11 edges
5. `adapters` - 10 edges
6. `_search_csv()` - 9 edges
7. `generate_design_system()` - 9 edges
8. `servers` - 8 edges
9. `BM25` - 7 edges
10. `ScrollReveal()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `UI/UX Pro Max Design Intelligence` --conceptually_related_to--> `Monochromatic Design System`  [INFERRED]
  skills/ui-ux-pro-max/SKILL.md → README.md
- `Typography Guidelines` --conceptually_related_to--> `Monochromatic Design System`  [INFERRED]
  skills/ui-ux-pro-max/SKILL.md → README.md
- `_search_csv()` --calls--> `str`  [INFERRED]
  skills/ui-ux-pro-max/scripts/core.py → skills/ui-ux-pro-max/scripts/design_system.py
- `Animation Best Practices` --conceptually_related_to--> `Animation System`  [EXTRACTED]
  skills/ui-ux-pro-max/SKILL.md → README.md
- `lean-ctx Integration` --references--> `Context Engineering Layer`  [EXTRACTED]
  AGENTS.md → .hermes.md

## Communities (34 total, 16 thin omitted)

### Community 0 - "Design System Generator"
Cohesion: 0.09
Nodes (29): bool, DesignSystemGenerator, _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system() (+21 more)

### Community 1 - "Deployments Component"
Cohesion: 0.09
Nodes (27): Deployments(), DeploymentsProps, formatDate(), formatRelativeTime(), ICON_MAP, ICON_MAP_LARGE, DeploymentInfo, cn() (+19 more)

### Community 2 - "GitHub Integration"
Cohesion: 0.09
Nodes (30): Home(), categorizeRepo(), CUSTOM_CATEGORIES, CUSTOM_DEMO_URLS, CUSTOM_DESCRIPTIONS, CUSTOM_DISPLAY_NAMES, EXCLUDED_REPOS, extractTechStack() (+22 more)

### Community 3 - "Dependencies"
Cohesion: 0.06
Nodes (33): dependencies, class-variance-authority, clsx, embla-carousel-auto-scroll, embla-carousel-react, framer-motion, lucide-react, next (+25 more)

### Community 4 - "Page Components"
Cohesion: 0.11
Nodes (24): About(), TechStackProps, Contact(), contactOptions, socialLinks, Navbar(), ProjectCard(), ProjectCardProps (+16 more)

### Community 5 - "CLI Commands"
Cohesion: 0.06
Nodes (31): args, command, type, args, command, env, type, REPOSITORY_PATH (+23 more)

### Community 6 - "Search/Explore"
Cohesion: 0.06
Nodes (30): explore, github, health, history, map, plan, refs, search (+22 more)

### Community 7 - "UI Components"
Cohesion: 0.11
Nodes (18): AppLogo, appLogos, AppLogosProps, Button, ButtonProps, buttonVariants, Carousel, CarouselApi (+10 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 9 - "BM25 Search Engine"
Cohesion: 0.15
Nodes (15): BM25, detect_domain(), _load_csv(), BM25 ranking algorithm for text search, Lowercase, split, remove punctuation, filter short words, Build BM25 index from documents, Score all documents against query, Load CSV and return list of dicts (+7 more)

### Community 10 - "Hero Section"
Cohesion: 0.19
Nodes (10): Hero(), EtherealShadowVideo(), EtherealShadowVideoProps, NoiseConfig, useRefreshRate(), SpotlightConfig, SpotlightCursor(), SpotlightCursorProps (+2 more)

### Community 11 - "Vercel Integration"
Cohesion: 0.22
Nodes (6): education, projects, Resume(), skillCategories, SkillCategory, TimelineItem

### Community 12 - "Layout & Routing"
Cohesion: 0.29
Nodes (6): hooks, PostToolUse, PreCompact, PreToolUse, Stop, UserPromptSubmit

### Community 13 - "Config Files"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 14 - "Animation System"
Cohesion: 0.40
Nodes (4): chat.mcp.autoInvoke, dev-agent-deb, io.github.ups, serena

### Community 16 - "API Routes"
Cohesion: 0.67
Nodes (3): Monochromatic Design System, Typography Guidelines, UI/UX Pro Max Design Intelligence

## Knowledge Gaps
- **168 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+163 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Deployments Component` to `Hero Section`, `Page Components`, `UI Components`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `str` connect `Design System Generator` to `BM25 Search Engine`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `_search_csv()` connect `BM25 Search Engine` to `Design System Generator`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `str` (e.g. with `.tokenize()` and `_search_csv()`) actually correct?**
  _`str` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _203 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Design System Generator` be split into smaller, more focused modules?**
  _Cohesion score 0.08771929824561403 - nodes in this community are weakly interconnected._
- **Should `Deployments Component` be split into smaller, more focused modules?**
  _Cohesion score 0.08739495798319327 - nodes in this community are weakly interconnected._