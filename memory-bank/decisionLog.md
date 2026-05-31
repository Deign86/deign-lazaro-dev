# Decision Log

This file records architectural and implementation decisions using a list format.
2026-05-27 10:07:17 - Log of updates made.

* [2026-05-28 18:34:09] - Switched CV download from Puppeteer PDF generation to static HTML file serving
* [2026-05-28 19:13:47] - Added client-side PDF generation using html2pdf.js for CV downloads
* [2026-05-28 19:18:25] - Fixed blank PDF by using iframe approach for proper style rendering
* [2026-05-28 19:50:53] - Switched from html2pdf.js to browser print functionality for pixel-perfect PDF
* [2026-05-28 19:53:10] - Added permanent Context7 MCP rule to AGENTS.md - must always verify library docs before working with any library or framework
* [2026-05-28 19:59:15] - Simplified CV download to serve static PDF file directly
* [2026-05-31 07:50:00] - CRITICAL: Never modify oh-my-openagent.json title agent (lines 193-209). It controls session auto-naming via a hidden built-in `agent=title` that uses `small_model`. Changing its model/fallbacks breaks session auto-renaming.

## Decision

* Replace dynamic PDF generation (Puppeteer) with static HTML file (`public/cv.html`) for CV downloads
* Button opens CV in new tab and triggers file download simultaneously
* Added html2pdf.js for client-side PDF generation to provide PDF download functionality
* Use iframe approach instead of temporary div for proper style rendering in PDF
* Switch to browser print functionality for pixel-perfect PDF generation
* Added permanent Context7 MCP rule to AGENTS.md - must always verify library docs before working with any library or framework
* Simplified to serve static PDF file directly - no client-side generation, no print dialogs

## Rationale 

* Puppeteer fails on Vercel serverless (no Chromium binary, 50MB size limit)
* CV content is static (hardcoded HTML, inline CSS) - no need for runtime PDF generation
* Static file serving has zero runtime overhead, no cold starts, works on Vercel with no config
* Removes heavy dependency (~400MB Puppeteer + Chromium)
* html2pdf.js provides client-side PDF generation without server-side dependencies
* User can view CV in browser (HTML) and download as PDF simultaneously
* Temporary div approach fails because style tags in innerHTML are not executed by the browser
* iframe approach properly loads and renders the HTML with all styles applied
* html2pdf.js still doesn't render styles correctly (produces blank/stripped PDF)
* Browser print functionality gives pixel-perfect results matching what user sees in browser
* User can save as PDF from print dialog (Ctrl+P → Save as PDF)
* Libraries and APIs evolve frequently - Context7 keeps us updated with latest patterns
* Prevents using outdated knowledge or guessing about library behavior
* Simplest solution: serve a pre-generated static PDF file directly
* No client-side generation, no print dialogs, no user interaction required
* Just click button → PDF downloads automatically

## Implementation Details

* Deleted `src/app/api/cv/route.ts` (Puppeteer PDF generation API route)
* Removed `puppeteer-core` and `@sparticuz/chromium-min` dependencies
* Updated `Resume.tsx` button to link to `/cv.html` with onClick handler for download
* Cleaned up `next.config.ts` (removed `serverExternalPackages`)
* Removed `vercel.json` (no longer needed for function config)
* Installed `html2pdf.js` for client-side PDF generation
* Updated button onClick to create hidden iframe, load cv.html, wait for load, then use html2pdf.js to generate PDF from iframe content
* Final implementation: button opens cv.html in new window and calls window.print() after load
* Added Context7 MCP rule to AGENTS.md as permanent instruction for all future work
* Added Context7 MCP rule to global AGENTS.md (~/.config/opencode/AGENTS.md) for all projects
* Final simplification: button links directly to static PDF file (`/Deign-Grey-O-Lazaro-CV.pdf`) with download attribute