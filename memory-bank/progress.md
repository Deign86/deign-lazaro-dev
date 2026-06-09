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
* [2026-05-28 00:12:00] - ✅ Completed: Fixed iframe embedding for MathPulse AI - changed to static HF Space URL and added hf.space to embed proxy allowlist
* [2026-05-28 00:12:00] - ✅ Completed: Updated GameCon System URL from gamecon-system.vercel.app (404) to playverse-ops.vercel.app
* [2026-05-28 00:12:00] - ✅ Completed: Fixed display cards UI - added grayscale overlay to bottom card for consistent grey look
* [2026-05-28 00:12:00] - ✅ Completed: Normalized project card left borders to border-l-mono-800
* [2026-05-28 00:12:00] - ✅ Completed: Fixed fullscreen button to use requestFullscreen() API
* [2026-05-28 00:12:00] - ✅ Completed: Updated hero text to focus on web apps, agentic coding, and AI automation tools
* [2026-05-28 00:12:00] - ✅ Completed: Added tech stack inference from project descriptions
* [2026-05-28 00:12:00] - ✅ Completed: Fixed tech stack tag spacing
* [2026-05-28 02:29:10] - ✅ Completed: Configured agentmemory MCP for deign-lazaro-dev with basic memory operations (save/recall/search). LLM-backed features disabled due to no supported provider with credits.
* [2026-05-28 18:34:09] - ✅ Completed: Fixed broken CV download by removing Puppeteer PDF generation (failed on Vercel) and replacing with static cv.html file. Button now opens in new tab and triggers download.
* [2026-05-28 19:13:47] - ✅ Completed: Updated CV download button to generate PDF client-side using html2pdf.js. Button now opens CV in new tab and downloads PDF simultaneously.
* [2026-05-28 19:18:25] - ✅ Completed: Fixed blank PDF generation by using iframe approach instead of temporary div for proper style rendering with html2pdf.js
* [2026-05-28 19:50:53] - ✅ Completed: Switched CV download from html2pdf.js to browser print functionality for pixel-perfect PDF generation
* [2026-05-28 19:59:15] - ✅ Completed: Simplified CV download to serve static PDF file directly instead of client-side generation
* [2026-06-02 17:28:55] - ✅ Completed: Fixed display-cards stacking so MathPulse AI is always the topmost visual card. Added post-reverse logic to find mathpulse-ai by repoName (case-insensitive) and move it to index 0 of reversedDeployments before slicing.
* [2026-06-02 17:39:26] - ✅ Completed: Fixed MathPulse AI iframe not loading. HuggingFace `.static.hf.space` root URL returns 302 redirect to `/index.html` but embed proxy uses `redirect: 'error'`, causing a 502. Appended `/index.html` to the URL.

## Current Tasks

* None active

## Next Steps

* None at the moment unless the user requests follow-up changes.

## Git History

* [2026-05-27 22:59:11] - fi: finalize portfolio cleanup and case-insensitive project matching
  - Removed excluded projects from portfolio and deployments
  - Made all config map lookups case-insensitive for GitHub uppercase names
  - Fixed MathPulse AI visibility in deployments section
  - Added fallback border colors and uniform card heights
* [2026-05-28 00:12:00] - fix: iframe embedding, URL updates, UI consistency, fullscreen, tech stack
  - Fixed MathPulse AI iframe embedding (static HF Space URL + embed proxy allowlist)
  - Updated GameCon System URL to playverse-ops.vercel.app
  - Added grayscale overlay to bottom display card
  - Normalized project card left borders to mono-800
  - Fixed fullscreen button to use requestFullscreen() API
  - Updated hero text for web apps, agentic coding, AI automation
  - Added tech stack inference from project descriptions
  - Fixed tech stack tag spacing

