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

---

### Decision Record
[2026-06-02 18:39:45] - Switched 1mcp image_analysis tool from opengateway/mimo-v2.5 (unreliable) to NVIDIA NIM with nvidia/nemotron-nano-12b-v2-vl. Pipeline now 100% reliable (21/21 HTTP 200, 0 errors, ~3.3s median latency). Created start-1mcp-now.bat temporary launcher to recover 1mcp after zombie process. Model quality caveat: nemotron is smaller/faster but hallucination-prone; switch to meta/llama-3.2-90b-vision-instruct for accuracy-critical work.

**Decision Background:**
The 1mcp image_analysis MCP tool was originally wired through opengateway.gitlawb.com with model `mimo-v2.5`. In production use it became unreliable — frequent timeouts, sporadic 5xx, and inconsistent response quality. Investigation revealed 1mcp itself had been down (stale node.exe PID 18188 holding port 3050 with no listener), and even when recovered, mimo-v2.5 was the wrong tool. The user wanted a stable, drop-in replacement using the same NVIDIA NIM endpoint already used by opencode/hermes.

**Available Options:**
- Option 1: Keep opengateway + mimo-v2.5
  - Pros: No config change, no new dependency
  - Cons: Continues failing; the mimo-v2.5 path is the original "finicky" behavior the user wanted to escape
- Option 2: Switch to NVIDIA NIM with nvidia/cosmos-reason2-8b
  - Pros: Reasoning-tuned vision model
  - Cons: Account `j66zVWx5Vlr31wRrNvJfRqYcykDMKQDaVvwIKvfyZvU` is not entitled — 404 on every call
- Option 3: Switch to NVIDIA NIM with nvidia/nemotron-nano-12b-v2-vl
  - Pros: 12B VLM, fast (~3.3s median), works on the account, 100% reliability proven in 21-call stress test
  - Cons: Smaller model — shows hallucination on fine detail (2/5 runs of `Notebook Front.jpg` invented content)
- Option 4: Switch to NVIDIA NIM with meta/llama-3.2-90b-vision-instruct
  - Pros: 90B, much more grounded, fewer hallucinations
  - Cons: Slower (expect ~6-8s per call), higher cost

**Final Decision:**
Option 3 (nemotron-nano-12b-v2-vl) as default, with Option 4 documented as the swap path when accuracy matters more than speed. The user's stated goal was reliability first ("make it stable"), and nemotron hits that goal with the best latency on the working models.

**Implementation Plan:**
- Step 1: Edit `C:\Users\Deign\AppData\Roaming\1mcp\mcp.json` image_analysis.env block — set `OPENAI_API_KEY="${NVIDIA_API_KEY}"` (env substitution, not hardcoded), `OPENAI_BASE_URL="https://integrate.api.nvidia.com/v1"`, `OPENAI_MODEL="nvidia/nemotron-nano-12b-v2-vl"`. ✅
- Step 2: Kill stale 1mcp zombie (PID 18168 / 18188) and restart via launcher on port 3050. ✅
- Step 3: Verify env propagation by calling `1mcp_image_analysis_1mcp_get_config_info` — confirmed baseUrl/model/apiKey reflect the new values. ✅
- Step 4: Reliability test: 10 sequential + 5 parallel image_analysis calls, 100% HTTP 200, ~3.3s median. ✅
- Validation Method: Aggregate `C:\Users\Deign\AppData\Roaming\1mcp\logs\manual-launch.log` for `[POST] /mcp completed` lines, count statusCode=200 vs others, observe duration distribution.

**Risks and Mitigation:**
- Risk 1: nemotron hallucination on small details → Mitigation: documented swap to meta/llama-3.2-90b-vision-instruct via single-line edit to `OPENAI_MODEL`; no other config change needed.
- Risk 2: Stale 1mcp zombie reappears after reboot (port 3050 held by dead node.exe) → Mitigation: `start-1mcp-now.bat` launcher kills any existing process on port 3050 first, then restarts; canonical `start-1mcp.bat` (uses `run_hidden.vbs`) is the proper long-term path.
- Risk 3: 60s `requestTimeout` in `serverDefaults` too tight for slow NIM calls → Mitigation: monitor 8.3s tail latency in log; bump to 120000 if timeouts appear.
- Risk 4: Opengateway API key was hardcoded in old config; if user reverts, key may have rotated → Mitigation: documented revert diff in session notes; user must obtain fresh `ogw_live_*` key.