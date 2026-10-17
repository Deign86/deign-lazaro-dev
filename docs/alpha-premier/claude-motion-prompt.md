# Claude Motion prompt: "Lights On at 3104"

A 16:9, 58-second, fast-paced motion graphic about Deign Lazaro's IT Administrator internship at Alpha Premier Realty (Alpha Premier Group of Companies OPC).

**There are two deliverables:**
1. **Two transition stings** of 3–4 s each ("Lights on" and "Lights off"). They play full screen when you switch between your portfolio and the company page. Build these first.
2. **The full reel** (58 s), for the page and for presentations.

**How to use it**
1. Set up one of the two stacks in **Links → Motion stack**. Path A is recommended.
2. Open a Claude session in that project folder.
3. Paste everything inside **THE PROMPT** below.
4. Copy the finished stings from `out/stings/` into `deign-lazaro-dev/public/alpha-premier/stings/`. The site's transition layer picks them up from there.

The prompt is self-contained. Every asset it needs is linked as a public GitHub raw URL, with your local path as a fallback.

---

## Links

### The four projects (the subject of the video)

| Project | Repo | Live |
|---|---|---|
| Alpha Premier Attendance (RFID kiosk + payroll) | https://github.com/Deign86/alpha-premier-attendance | Desktop app (Releases) |
| Alpha Premier Group website | https://github.com/Deign86/apg-website | https://alphapremiergroup.com |
| Alpha Premier Realty Branding Studio | https://github.com/Deign86/Alpha_Branding | Desktop app (Releases) |
| Viber MCP (Windows background backend + APG workflows) | https://github.com/Deign86/viber-mcp | MCP server, no UI |
| Deign's portfolio (where the reel will live) | https://github.com/Deign86/deign-lazaro-dev | https://deign-lazaro-dev.vercel.app/alpha-premier |

### Motion stack (pick ONE path; check each repo before installing)
Checked 2026-10-17: every repo below exists and is active.

**Path A, recommended: Remotion + claude-motion**
- https://github.com/whaleyxbt/claude-motion (MIT, ★451)
  - The engine: Remotion, a frame-by-frame review loop, and sound effects generated in code.
  - `git clone`, `npm install`, `npm run studio`.
  - Needs Node 20+, Python 3 and ffmpeg (all already on this PC).
- https://github.com/remotion-dev/remotion: the official Remotion framework. Free for individuals; companies above a size threshold need a company licence.
- https://github.com/remotion-dev/skills: the official Remotion agent skills. Add them to `.claude/skills/`.
- https://github.com/LottieFiles/motion-design-skill (MIT, ★2.2k): engine-agnostic motion principles (timing, easing, choreography).

**Path B, alternative: HyperFrames** (the same HTML→MP4 engine as your APG launch video in `apg-website/promo-video/`)
- https://github.com/heygen-com/hyperframes (Apache-2.0): HTML/GSAP compositions rendered to MP4. Run `npx skills add heygen-com/hyperframes`.
- https://github.com/Sunwood-ai-labs/hyperframes-motion-reel-skill (MIT): a HyperFrames showreel synced to **120 BPM**, the same grid as this beat sheet.
- https://github.com/greensock/gsap-skills (MIT): official GSAP skills. Run `npx skills add greensock/gsap-skills`.
- https://github.com/greensock/GSAP: the timeline engine.

**Optional extras from your list** (useful but not required):

| Repo | Use it for | Licence |
|---|---|---|
| https://github.com/howseen-ai/claude-motion-design | Videos from HTML + Playwright + FFmpeg, no Remotion | MIT |
| https://github.com/charlie947/motion-graphics-skills | 13 product-launch video skills | MIT |
| https://github.com/haidrrrry/claude-remotion-skill | Prompt-driven Remotion editor: captions, B-roll, sound | MIT |
| https://github.com/t3knobox/klik-anim-skill-creation | Animation principles + camera direction | **No licence: reference only, don't copy** |
| https://github.com/AbubakrChan/product-launch-motion | Launch films: VO, camera moves, colour grading | MIT |
| https://github.com/cth9191/animate | Storyboard → a short animation in one canvas file | MIT |
| https://github.com/iart-ai/motion-design-skills | Timing, colour, type, logos, Remotion workflows | MIT |
| https://github.com/nateherkai/herk-edit-kit | Formerly "hyperframes-student-kit": 14 skills + 406 reference cards | No assertion: check before use |
| https://github.com/frankxai/awesome-motion-design-agent-skills | Index of GSAP / Remotion / Lottie / Rive skills | CC0 |
| https://github.com/Barty-Bart/motion-graphics | B-roll from a transcript | No assertion: check before use |
| https://github.com/199-biotechnologies/motion-dev-animations-skill | Web animations with Motion (not video) | MIT |
| https://github.com/motiondivision/motion and https://motion.dev | Motion (formerly Framer Motion) | MIT |
| https://github.com/airbnb/lottie-web | Lottie playback on the web | MIT |

### Assets (public raw URLs; local copies live in `C:\Users\APG\Downloads\<repo>\`)

**Brand**
- Peacock mark, transparent: https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/assets/logo_phoenix.png
- Peacock mark + "ALPHA PREMIER": https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/assets/logo%20w%20name.png
- Horizontal group logo (1600×478): https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/img/logo-horizontal.png
- Peacock (large): https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/img/peacock.png
- Realty mark: https://raw.githubusercontent.com/Deign86/apg-website/main/public/images/realty-banner-logo.png
- Enterprise logos: `https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/<name>-176.webp`
  - `<name>` is one of `realty`, `luxe-prime`, `construction`, `swiftclear`, `88prime`, `alta-venture`, `dynamic-tree`.

**Attendance kiosk** (screens use demo interns only)
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/kiosk.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/kiosk-scan-success.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/live-attendance.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/admin-payroll.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/bathroom-kiosk.png

**Website**
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/home.jpg (full-page capture, for a vertical pan)
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/enterprises.jpg
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/realty.jpg
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/careers.jpg
- https://raw.githubusercontent.com/Deign86/apg-website/main/.github/assets/screenshot-admin.png

**Branding Studio**
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/assets/app-screenshot-main.png
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/assets/app-screenshot-crop-editor.png
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/assets/app-screenshot-results.png
- The official frame (2938×2463): https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/img/alpha_branding.png
- Branded outputs: https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/manual/images/output_01.jpg (also `output_02.jpg`, `output_03.jpg`)

**Viber MCP:** there are no screenshots. Build its UI in code (see block D).

**Internship photos:** `C:\Users\APG\Downloads\deign-lazaro-dev\_intake\alpha-premier\`. Use only photos of people who agreed to appear.

**Fonts** (Google Fonts):
- Bodoni Moda (500, 500 italic): https://fonts.google.com/specimen/Bodoni+Moda
- Jost (400, 500): https://fonts.google.com/specimen/Jost

---

## THE PROMPT

````markdown
You are a senior motion designer and a Remotion/HyperFrames engineer. Build two things,
in this order: (1) two short page-transition stings (section 2b), then (2) a finished
1920×1080, 60fps, 58-second motion graphic. Follow this project's AGENTS.md / skills:
storyboard first, then a timeline JSON where every beat is a named timestamp, then scenes,
then the frame-by-frame review loop, then sound, then render. Do not skip the review loop.

## 1. Brief
Title: "Lights On at 3104".
Subject: Deign Lazaro, IT Administrator intern at Alpha Premier Realty, part of Alpha Premier
Group of Companies OPC, a real estate brokerage group headquartered at Unit 3104C, Tektite East
Tower, Exchange Road, Ortigas Center, Pasig City, Philippines. The brokerage ran without an IT
department, on paper logbooks, hand-made Viber group chats and Google Drive folders. In 2026
Deign built four systems it never knew it needed.
Message (one sentence the viewer must leave with): "A brokerage with no IT got four real
systems from one intern."
Audience: internship evaluators, recruiters and Alpha Premier leadership. Clear, confident,
premium; never cheesy.
Tone: aesthetic, editorial, fast. Fashion-magazine type meets product-launch pacing.
Hero moment (the single most important frame): at 0:08 the windows of Unit 3104 snap on in
gold, exactly on the downbeat, and the whole frame flips from black to warm stone. Everything
before builds to it; everything after is lit.

## 2. Format
- 1920×1080, 60fps, 58.0s (3480 frames). H.264 MP4, yuv420p, AAC 48kHz 320kbps.
- Music grid: 120 BPM, 4/4. 1 beat = 0.5s = 30 frames, 1 bar = 2s = 120 frames.
  29 bars total. Every cut, type entrance and sound hit lands on a beat or an 8th
  (15 frames). Put the BPM grid in the timeline JSON and derive all times from it.
- Title-safe margins 96px; nothing readable within 120px of the bottom edge.
- Also export: poster frame PNG at 0:08.5, and a contact sheet (one frame per shot).

## 2b. Second deliverable: the page-transition stings (build these FIRST)
The site plays a short full-screen sting as a transition layer when the visitor switches
between Deign's personal portfolio (dark, #0A0A0A) and this company portfolio (stone,
#DFDEDB). It is the "wow" moment, so it must be the most polished 4 seconds in the project,
and it must hand off to the page with no visible cut. Build two stings as separate
compositions that reuse the reel's scenes, type and sound:

STING IN, "Lights on" (portfolio → company page), 4.0s = 240 frames at 60fps, 2 bars at 120 BPM
- 0.00–0.50  Frame 0 is flat #0A0A0A (exactly the portfolio's ground, so the cut from the
             portfolio is invisible). The maquette tower fades up out of the black.
- 0.50–2.00  Fast push toward floor 31; the floor counter ticks 01 → 31 on 16ths; riser.
- 2.00       Downbeat: the windows of floor 31 snap on in gold (#C5A059 → #E2C285), impact.
- 2.00–3.25  The gold window grid expands to fill the frame while the frame wipes to stone
             #DFDEDB from the centre (a clean expanding rectangle, no blur, no flash-white).
             The gold peacock mark appears at the centre for one beat.
- 3.25–4.00  The mark leaves; the last 15 frames are flat #DFDEDB, exactly the page's ground,
             so the site can fade the video layer out over the real page.
- No words in the sting except optional "Unit 3104" at 2.00–3.00 in Jost, small. The sting
  must read with sound off.

STING OUT, "Lights off" (company page → portfolio), 3.0s = 180 frames
- Frame 0 flat #DFDEDB. The stone field contracts into a single lit gold window, the window
  goes dark on the downbeat at 1.50, the maquette tower recedes into black, the last 15 frames
  are flat #0A0A0A (the portfolio's ground).

Exports for each sting:
- 16:9: 1920×1080 H.264 MP4, yuv420p, no audio track, crf 18, `-movflags +faststart`
  (the site plays it muted inline), plus a WebM VP9 copy.
- 9:16 for phones: 1080×1920, recomposed (not cropped): the tower centred, the counter
  above it, the same timing.
- A separate sound file per sting (WAV + 128 kbps AAC .m4a, -16 LUFS, true peak < -2 dBFS)
  that the site may play only after a user gesture.
- First and last frame PNGs for each (QA proof that they are flat, exact colours).
- Target size: under 2.5 MB per 16:9 MP4, under 1.8 MB per 9:16 MP4. Keep motion bold and
  surfaces flat so it compresses well.
File names: sting-in-16x9.mp4, sting-in-9x16.mp4, sting-out-16x9.mp4, sting-out-9x16.mp4
(+ .webm, -audio.m4a, -first.png, -last.png). Deliver them to ./out/stings/.

## 3. Brand system (use exactly these)
Dark frames:  ground #0A0A0A · gold #C5A059 · light gold #E2C285 · text #F6F2E9
Light frames: ground #DFDEDB (stone) · surface #D3D2CE · ink #26251E · soft ink #5F5D55 ·
              deep gold #9E7B35 (gold used on light grounds; plain #C5A059 is too faint on stone)
Rule: one gold element per frame. Gold is the light that came on; spend it carefully.
Acts I–II are dark; from the hero moment on, alternate light and dark by block.
Type: Bodoni Moda 500 (display; optical sizing on; tracking -0.02em; leading 0.95) and
Jost 400/500 (labels, UI, numbers with tabular figures). Only these two families.
Display words 140–220px; supporting lines 44–64px; labels 28–32px. Max 7 words on screen
(the thank-you card in S8 is the one exception).
Italic Bodoni only for a whole line, never one accent word.
Logos: the gold peacock mark (logo_phoenix.png, transparent) and the horizontal group logo.
Never recolour, stretch or add effects to the logos.

## 4. Assets
Download all of these into ./public/assets/apg/ before building (all are public):
Brand
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/assets/logo_phoenix.png
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/img/logo-horizontal.png
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/img/peacock.png
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/images/realty-banner-logo.png
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/realty-176.webp
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/luxe-prime-176.webp
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/construction-176.webp
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/swiftclear-176.webp
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/88prime-176.webp
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/alta-venture-176.webp
- https://raw.githubusercontent.com/Deign86/apg-website/main/public/assets/images/logos/dynamic-tree-176.webp
Attendance kiosk (demo data only)
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/kiosk.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/kiosk-scan-success.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/live-attendance.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/admin-payroll.png
- https://raw.githubusercontent.com/Deign86/alpha-premier-attendance/main/docs/screenshots/bathroom-kiosk.png
Website
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/home.jpg
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/enterprises.jpg
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/realty.jpg
- https://raw.githubusercontent.com/Deign86/apg-website/main/promo-video/assets/pages/careers.jpg
- https://raw.githubusercontent.com/Deign86/apg-website/main/.github/assets/screenshot-admin.png
Branding Studio
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/assets/app-screenshot-main.png
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/assets/app-screenshot-crop-editor.png
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/assets/app-screenshot-results.png
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/img/alpha_branding.png
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/manual/images/output_01.jpg
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/manual/images/output_02.jpg
- https://raw.githubusercontent.com/Deign86/Alpha_Branding/main/docs/manual/images/output_03.jpg
Generated maquette film (Google Flow: Nano Banana Pro keyframes + Veo 3.1 Quality legs). This
is the SAME footage the website scrubs on scroll, so the reel and the page share one world:
- Keyframes (2752×1536, 16:9), the five beats of the journey:
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\k1-aerial-a.jpg   (aerial over the model CBD, twin stepped towers)
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\k2-street.jpg     (street level, looking up the east tower)
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\k3-window.jpg     (the dark 31st-floor window, office visible inside)
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\k4-office-dark.jpg (inside the dark miniature office)
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\k5-office-lit.jpg  (the same room, every light on: the HERO MOMENT)
- Film legs, 8 s each, 16:9, one continuous forward camera, each leg ends where the next begins:
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\leg-1-1080.mp4  (k1 → k2: glide down over the district)
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\leg-2-1080.mp4  (k2 → k3: crane up the facade to floor 31)
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\leg-3-1080.mp4  (k3 → k4: through the window into the dark office)
  C:\Users\APG\Downloads\deign-lazaro-dev\_intake\flow\leg-4-1080.mp4  (k4 → k5: the lights come on, row by row)
  (720p originals sit beside them as leg-N-720.mp4; use 1080p when present.)
  Use these for S3 (the maquette) and S4 (the hero moment) instead of building the city in code:
  S3 = leg-1 + leg-2 time-remapped to 4 s (speed ramps, cut on beats), S4 = leg-4's last 2 s, with
  the lights-on frame landing exactly on 0:08.0. The stings (section 2b) use leg-2 → leg-4 too.
  Mute their audio.
Internship photos (EXIF/GPS already stripped), for S6, in this order (the 13-photo reel montage):
  C:\Users\APG\Downloads\Internship Photos\internship_photos_of_deign\ 069, 113, 049, 116, 032, 074,
  110, 152, 155, 121, 119, 073, 126 (files are named NNN_photo_srcXXXX.jpg). 069, 074 and 073 are
  Deign's favourite shots: give 074 the 1 s hold at the end of S6. Web-ready copies of most of
  them are in C:\Users\APG\Downloads\deign-lazaro-dev\public\alpha-premier\photos\photo-NN.webp.
  NEVER use originals 007–012, 029–031, 035–036, 053–055, 063–064, 066, 128–130 or 156–157
  (they show passwords, client chats, IDs or personal data).
Fonts (Google Fonts): Bodoni Moda 500 + 500 italic, Jost 400 + 500.
Screenshots are real product UIs. Show them as flat planes with square corners: no device
mockups, no fake browser chrome, no drop shadows, no glow. Crop to the interesting region.
The attendance screenshots contain demo data only, so they are safe to show.

## 5. Beat sheet (timestamps are mm:ss; bars are 1-indexed)

ACT I · THE DARK (0:00–0:08, bars 1–4) · ground #0A0A0A
S1 0:00–0:01.5 · Bodoni "No IT department." Words land on 8ths (No 0:00 / IT 0:00.25 /
   department. 0:00.5), each masked up from its baseline in 8 frames, expo-out. The full line
   holds 1.0s.
S2 0:01.5–0:04 · Three hard cuts at 0:01.5, 0:02.25 and 0:03.0 (holds 0.75s / 0.75s / 1.0s):
   "Paper logbooks." / "Group chats, by hand." / "Listings in folders." in Jost 500 at 64px,
   left-aligned on the title-safe line, a soft type-tick SFX per line. (These are facts from
   the repos; do not invent others.)
S3 0:04–0:08 · THE MAQUETTE. A white-card architectural scale model of the Ortigas CBD at
   night (build it in code: extruded rectangles in isometric or a three.js scene; matte white
   card, brass edges, warm-black sky; no text on buildings). The camera glides forward toward
   one tower (Tektite East). A Jost tabular floor counter in the corner ticks 01 → 31 on 16th
   notes. Riser builds. If generated film clips are available in ./public/assets/apg/film/
   (leg-1.mp4 … leg-4.mp4), use them here instead and keep the counter.

ACT II · LIGHTS ON (0:08–0:12, bars 5–6)
S4 0:08–0:10 · HERO MOMENT. On the bar-5 downbeat: window grid of floor 31 snaps on gold
   (#C5A059 → #E2C285 bloom of 6 frames, no blur filters, use additive light shapes), then a
   4-frame white-stone flash wipes the frame to #DFDEDB. Impact + sub drop. Bodoni, ink:
   "Then an intern." Jost small under it: "Unit 3104C · Tektite East Tower · Ortigas".
S5 0:10–0:12 · Name card on stone: "Deign Lazaro" (Bodoni 160px) / "IT Administrator Intern,
   Alpha Premier Realty · 2026" (Jost 40px). The peacock mark reveals with a circular mask
   from its crest, in deep gold. Hold ≥ 1.2s readable.

ACT III · FOUR SYSTEMS (0:12–0:44, bars 7–22). Each block is exactly 4 bars (8s):
   bar 1 = title card · bars 2–3 = the product in motion · bar 4 = one proof line + spec strip.
   Spec strip format (Jost 30px, tabular): Built … · Stack … · Releases … (real values below).

A · ATTENDANCE KIOSK (0:12–0:20) · dark frame
   bar 1: Bodoni "Attendance" + Jost "An RFID kiosk for the front desk".
   bar 2: an RFID card (draw it: plain off-white card with a small gold chip) slides in from
   the right on a spring (only overshoot allowed in the film: damping 14) and taps;
   "beep" SFX on the beat; kiosk-scan-success.png snaps in behind with a 6-frame mask wipe.
   bar 3: match-cut to live-attendance.png, slow push 1.00→1.05; then admin-payroll.png
   slides up as a flat plane.
   bar 4: proof line: "Tap a card. See the photo. Done in under a second."
   spec: Built Jul–Oct 2026 · Tauri + Rust + SQLite · 115 releases
   (Other true facts you may use as tiny captions: works offline; syncs intern time records to
   Google Sheets; payroll PDFs; restroom-key log replaced a handwritten one.)

B · ALPHAPREMIERGROUP.COM (0:20–0:28) · light frame
   bar 1: Bodoni "alphapremiergroup.com" (fit width, 1 line) + Jost "One site for eight brands".
   bar 2: home.jpg full-page capture pans vertically at speed (ease-in-out, 2s, motion blur
   off), cut on beat to enterprises.jpg, then realty.jpg.
   bar 3: a Google-Drive-folder-to-listing card animation built in code: a folder icon labelled
   "APR LISTING" emits listing cards into a grid; Jost counter "every 15 minutes".
   Then a number roll: "LCP 6.1s → 1.9s" (Jost tabular, digits roll on 16ths).
   bar 4: proof line: "Launched October 9, 2026."
   spec: Team build · React + PHP + MySQL · 8 subdomains
   (True facts available: Drive→site listing sync every 15 min that copies only approved
   fields and strips photo GPS; AI chat with staff takeover; hiring system; admin CMS;
   JavaScript 349 KB → 243 KB.)

C · BRANDING STUDIO (0:28–0:36) · dark frame
   bar 1: Bodoni "Branding Studio" + Jost "Every listing photo, on brand".
   bar 2: a plain listing photo flies into the official frame (alpha_branding.png) and locks
   at exactly 6:5 with a camera-shutter SFX; cycle output_01 → 02 → 03 on beats.
   bar 3: app-screenshot-crop-editor.png with an animated crop box tightening to 6:5,
   then app-screenshot-results.png.
   bar 4: proof line: "One official frame: 1200 × 1000."
   spec: Built Aug–Oct 2026 · .NET 8 + WPF · 20 releases

D · VIBER MCP (0:36–0:44) · light frame
   Build the UI in code: a neutral chat window (no Viber logo, no purple brand chrome; stone
   surface, ink text, one gold accent).
   bar 1: Bodoni "Viber MCP" + Jost "Claude, working the office inbox".
   bar 2: a client template message appears; it transforms, character by character, into a
   group-chat name in Jost 500: "ANA-OFC-(250SQM, ORTIGAS)" (fictional example; never use a
   real client name). Message-pop SFX per bubble.
   bar 3: a listing document slides in with a dashed line across it; text above the line
   flies into the chat as a sent message; text below the line stays behind, redacted with
   solid ink bars. Caption: "Clients see what's above the line."
   bar 4: proof line: "42 tools. Built in four days."
   spec: Oct 14–17, 2026 · Python + MCP · Windows UI Automation

ACT IV · THE PLACE (0:44–0:50, bars 23–25)
S6 0:44–0:48 · Photo montage of the internship photos, each cropped to 6:5, cut on 8ths
   (15 frames each), ending on one hold of 1s on the strongest office/team photo. If no photos
   are provided, use stone placeholders labelled PHOTO NN so they are obviously stand-ins.
S7 0:48–0:50 · The eight enterprises roll on 8ths, logo + Jost name, one at a time, centred:
   Alpha Premier Realty · Luxe Prime Realty · Alpha Premier Construction · SwiftClear ·
   88 Prime · Alta Venture · Dynamic Tree · Alpha Premier Virtual Office.

ACT V · THANK YOU (0:50–0:54, bars 26–27) · light frame (stone), the film's one slow moment
S8 · The music drops to half-time. Bodoni italic, whole line, ink: "Thank you".
   Then three lines build top to bottom, one per bar-half, so all three are on screen by
   0:52.5 and hold to 0:54 (each line enters with the same 12-frame masked rise):
   0:50.5  Bodoni 72px "Ma'am Beatriz"  +  Jost 40px soft ink "my first work friend, who guided my first days"
   0:51.5  Bodoni 72px "Ma'am Jean"     +  Jost 40px soft ink "HR Supervisor, for the chance to grow in the APG family"
   0:52.5  Bodoni 72px "Sir Mark"       +  Jost 40px soft ink "President & CEO, for the company he built and the freedom to build in it"
   Names in ink, reasons in soft ink; the only gold is a small peacock mark above "Thank you".
   Left-aligned on the title-safe line, generous leading; no photos of these people.

ACT VI · CLOSE (0:54–0:58, bars 28–29) · dark frame
S9 · Gold peacock mark, then Bodoni italic, whole line: "Where Connections Grow Into Success."
   Under it, Jost: "Systems by Deign Lazaro · IT Administrator Intern · 2026" and
   "deign-lazaro-dev.vercel.app/alpha-premier".
   Credits line, Jost 26px soft: "Website built with the APG team: raineer26, sabbie19-design,
   goyaa25, ishixxvi · Branding Studio after Joseph Tanay Amandy's original · viber-mcp after
   Wawi del Mundo's original."
   Hold 2.5s, music tail out. Last frame = clean end card.

## 6. Motion language
- Entrances: expo-out cubic-bezier(0.16, 1, 0.3, 1), 8–14 frames for type, 18–24 for planes.
  Exits: 6–8 frames, quart-in, always faster than entrances.
- Springs (Remotion): { damping: 200 } for UI planes (no bounce). Only the RFID card may
  overshoot ({ damping: 14, mass: 0.6 }).
- Stagger: 3–5 frames between words or rows; never more than 6 elements staggering at once.
- Transitions, in order of preference: hard cut on the beat → rectangular mask wipe from an
  edge (6 frames) → match cut (gold window → gold UI element → gold chip). The one flash is the
  hero moment. No crossfade dissolves, no zoom-blur, no glitch, no spinning, no 3D page flips.
- Camera: push-ins 1.00 → 1.06 over two bars on screenshots; max two parallax layers; no
  rotation beyond 2°.
- Type: on screen on the beat, off on the "and". Every readable line holds at least 0.6s;
  sentences at least 1.2s. No text over a busy part of a screenshot; give type its own field.
- No gradients, glows, drop shadows, lens flares, particles, grain over 2%, or emoji.

## 7. Sound (120 BPM, mastered to -14 LUFS integrated, true peak below -2 dBFS)
Music: minimal, warm four-on-the-floor house/garage pulse at 120 BPM, made in code or from a
royalty-free source you are licensed to use. No copyrighted songs, no vocals.
Cue sheet (every cue on the grid):
- 0:00 low drone in; soft type-ticks under S1–S2 words.
- 0:04–0:08 riser + floor-counter ticks on 16ths.
- 0:08.0 IMPACT + sub drop + bright chime (lights on). Full beat drops in.
- 0:12/0:20/0:28/0:36 whoosh into each block title.
- A: RFID beep on the tap · B: soft UI clicks on cuts, digit-roll ticks · C: camera shutter
  per frame lock · D: message pops per bubble, a paper-slide for the document.
- 0:44 filtered cut-down for the photo montage, shutter-ticks on 8ths.
- 0:50 beat drops to half-time: kick and sub out, a warm pad and soft keys carry the thank-you
  card; one gentle tick as each name lands (0:50.5, 0:51.5, 0:52.5).
- 0:54 full stop, then a single gold chime on the peacock; reverb tail to 0:58.
Do not use the cloned staff voice clips from the attendance repo; no voice-over unless a
VO file is supplied.

## 8. Accuracy and privacy (hard rules)
- Use only the facts in this prompt. Never invent statistics, clients, testimonials or
  awards. Do not use "500+ properties", "EST. 2010", "15+ years" or "1,200+ clients"; they
  are placeholders, not facts.
- No intern names or IDs, no client names, no phone numbers, no emails, no service-account
  details, no addresses beyond the head-office line above. The only staff named anywhere are
  the three people in the thank-you card, written exactly as given there.
- Spell exactly: Alpha Premier Realty · Alpha Premier Group of Companies OPC · Tektite East
  Tower · Ortigas Center · alphapremiergroup.com · Deign Lazaro.
- Keep the thank-you card and the collaborator credits in the end card.

## 9. Review loop (mandatory before render)
Render a contact sheet with one timestamped frame per shot plus the frames at 0:07.9, 0:08.0
and 0:08.2. Check and fix, then repeat until a full pass is clean:
1. Every cut sits on the 120 BPM grid (frame numbers divisible by 15).
2. No text collides with anything, clips at an edge, or breaks the 96px safe area.
3. Every readable line is legible on a phone at 30% size and holds ≥ 0.6s; each thank-you
   line holds ≥ 1.5s.
4. Exactly two typefaces; brand hex values exact; one gold element per frame.
5. The hero moment reads as the single biggest event in the film.
6. No placeholder text remains except intentional PHOTO NN stand-ins.
7. Loudness: -14 LUFS ±1, true peak < -2 dBFS on the final muxed file.
8. Stings: first and last frames are flat and exactly #0A0A0A / #DFDEDB (sample the
   PNGs; every pixel within ±1 of the hex), sizes are under budget, and the 9:16 versions
   are recomposed, not cropped.
Finish with a short report: shots, total frames, any stand-ins, and anything you could not do.
````
