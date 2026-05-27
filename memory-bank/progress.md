# Progress

This file tracks the project's progress using a task list format.
2026-05-27 10:06:14 - Log of updates made.

*

## Completed Tasks

* [2026-05-27 10:06:14] - Completed initial portfolio-content investigation and mapped all relevant source files for the requested changes.
* [2026-05-27 10:15:53] - ✅ Completed: Added FEATURED_PROJECTS mechanism to pin MathPulse AI first in all sort functions across github.ts and vercel.ts
* [2026-05-27 10:13:38] - ✅ Completed: Removed RCBC Debt Tracker references from github.ts, vercel.ts, and Deployments.tsx
* [2026-05-27 10:21:45] - ✅ Completed: Added Hugging Face, DeepSeek, and Hermes Agent logos to the spinning tools carousel in app-logos.tsx
* [2026-05-27 20:04:31] - ✅ Completed: Fixed card sizing - added `h-full` to `StaggerItem` wrapper and `ProjectCard` outer `motion.div` to ensure uniform card heights in grid layout
* [2026-05-27 22:02:12] - ✅ Completed: Removed projects from portfolio (des-simulation, mathpulse-api, mathpulse-ai-prototype, rcbc-debt-tracker, deign-lazaro-dev). Synced exclusion lists between github.ts and vercel.ts. Made all repo name comparisons case-insensitive to handle GitHub's uppercase repo names (e.g., MATHPULSE-AI). Added fallback border color for project cards.
* [2026-05-27 22:10:45] - ✅ Completed: Added 'des-encryption-app' to EXCLUDED_PROJECTS in vercel.ts to remove Des Encryption App from deployments. MathPulse AI now appears as featured first project.
* [2026-05-27 22:15:30] - ✅ Completed: Fixed MathPulse AI not showing in live projects. Updated mergeDeploymentsWithRepos to include repos with LIVE_DEPLOYMENTS config even if not in Vercel. Converted all config map keys to lowercase for case-insensitive lookups.

## Current Tasks

* None active

## Next Steps

* None at the moment unless the user requests follow-up changes.

