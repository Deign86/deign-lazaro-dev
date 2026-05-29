# Active Context

This file tracks the project's current status, including recent changes, current goals, and open questions.
2026-05-27 10:06:14 - Log of updates made.

* Completed initial portfolio-content investigation for project reordering, removals, deployment updates, bio copy updates, and carousel logo additions.

## Current Focus

* Portfolio content updates are complete; verification and build checks are done.

## Recent Changes

* [2026-05-27 10:06:14] - Ran subagent research for Azure, Vercel, MathPulse, RCBC, deployment, and logo references.
* [2026-05-27 10:06:14] - Identified exact source files and line references for the planned portfolio changes.
* [2026-05-27 10:06:14] - Initialized Memory Bank for this project.
* [2026-05-27 10:12:41] - Received user answers: MathPulse uses a Hugging Face Space, the DES repo is `des-encryption`, Vercel should stay in the tools carousel, and Hermes Agent refers to Nous Research's Hermes Agent.
* [2026-05-27 10:12:41] - Launched parallel implementation agents for RCBC removal, MathPulse-first ordering, deployments branding removal, and carousel logo additions.
* [2026-05-27 10:23:18] - Retrieved exact MathPulse deployment URL from README and updated it to `https://huggingface.co/spaces/Deign86/MathPulse-AI`.
* [2026-05-27 10:23:18] - Excluded `mathpulse-ai` from Vercel deployments list to prevent override back to Vercel.
* [2026-05-27 10:23:18] - Completed the remaining Azure replacement edits in Resume.tsx and public/cv.html after the stalled background task.
* [2026-05-27 10:23:18] - Ran clean rebuild and lint verification; build succeeded and lint is clean.
* [2026-05-27 10:13:38] - 🔧 Code refactoring: Removed RCBC Debt Tracker references from github.ts, vercel.ts, and Deployments.tsx - no RCBC strings remain in source
* [2026-05-27 10:15:53] - 🚀 Feature completed: Added FEATURED_PROJECTS mechanism (`FEATURED_PROJECTS` set) to pin MathPulse AI first in all sort functions across github.ts and vercel.ts
* [2026-05-27 10:21:45] - 🚀 Feature completed: Added Hugging Face, DeepSeek, and Hermes Agent logos to the spinning tools carousel in app-logos.tsx
* [2026-05-27 20:04:31] - 🐛 Bug fix: Fixed card sizing by adding `h-full` to `StaggerItem` wrapper and `ProjectCard` outer `motion.div` to ensure uniform card heights in grid layout
* [2026-05-27 22:59:11] - 🔧 Code refactoring: Committed all completed portfolio changes - removed excluded projects, made all config keys case-insensitive, fixed MathPulse AI visibility in deployments, added fallback border colors
* [2026-05-28 00:12:00] - 🐛 Bug fix: Fixed iframe embedding for MathPulse AI - changed to static HF Space URL (deign86-mathpulse-ai.static.hf.space) and added hf.space to embed proxy allowlist
* [2026-05-28 00:12:00] - 🐛 Bug fix: Updated GameCon System URL from gamecon-system.vercel.app (404) to playverse-ops.vercel.app
* [2026-05-28 00:12:00] - 🐛 Bug fix: Added grayscale overlay to bottom display card for consistent grey look across all cards
* [2026-05-28 00:12:00] - 🐛 Bug fix: Normalized all project card left borders to border-l-mono-800 (removed white-looking borders)
* [2026-05-28 00:12:00] - 🐛 Bug fix: Fixed fullscreen button to use requestFullscreen() API instead of opening new tab
* [2026-05-28 00:12:00] - 🚀 Feature: Updated hero text to focus on web apps, agentic coding, and AI automation tools
* [2026-05-28 00:12:00] - 🚀 Feature: Added tech stack inference from project descriptions (Next.js, React, Tailwind, FastAPI, Django, Firebase, Flutter)
* [2026-05-28 00:12:00] - 🐛 Bug fix: Fixed tech stack tag spacing - increased gap from 2 to 3, added inline-block
* [2026-05-28 02:29:10] - 🚀 Feature: Configured agentmemory MCP for deign-lazaro-dev with basic memory operations (save/recall/search). LLM-backed features disabled - agentmemory doesn't support OpenAI-compatible providers for LLM yet.
* [2026-05-28 18:14:27] - 🐛 Bug fix: Fixed turbopack.root to use absolute path (via `path.resolve(__dirname)`) to silence Next.js warning about relative path
* [2026-05-28 18:34:09] - 🐛 Bug fix: Fixed broken CV download by removing Puppeteer PDF generation (failed on Vercel) and replacing with static cv.html file. Button now opens in new tab and triggers download.
* [2026-05-28 19:13:47] - 🚀 Feature completed: Updated CV download button to generate PDF client-side using html2pdf.js. Button now opens CV in new tab and downloads PDF simultaneously.
* [2026-05-28 19:18:25] - 🐛 Bug fix: Fixed blank PDF generation by using iframe approach instead of temporary div for proper style rendering with html2pdf.js
* [2026-05-28 19:50:53] - 🐛 Bug fix: Switched CV download from html2pdf.js to browser print functionality for pixel-perfect PDF generation
* [2026-05-28 19:53:10] - 📋 Important decision: Added permanent Context7 MCP rule to AGENTS.md - must always verify library docs before working with any library or framework
* [2026-05-28 19:55:03] - 📋 Important decision: Added Context7 MCP rule to global AGENTS.md for all projects
* [2026-05-28 19:59:15] - 🐛 Bug fix: Simplified CV download to serve static PDF file directly instead of client-side generation

## Open Questions/Issues

* None remaining.
