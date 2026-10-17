# /alpha-premier build brief (shared by all build agents)

The route `/alpha-premier` is a company-portfolio case study of Deign Lazaro's 2026 IT Administrator internship at **Alpha Premier Realty** (Alpha Premier Group of Companies OPC, Unit 3104C, Tektite East Tower, Ortigas). The brokerage had no IT department until Deign arrived; Deign built four systems it didn't know it needed: an RFID attendance kiosk, the group website, a Branding Studio for listing photos, and a Viber MCP assistant.

It lives in the personal-portfolio repo (Next.js 16 App Router, React 19 with the React Compiler, TypeScript, Tailwind v4 available, framer-motion 12 installed). It must look **nothing like** the personal site at `/` (dark monochrome, glass, Geist) and **nothing like** alphapremiergroup.com (black and gold, glass, mono captions).

## Read these first
1. `docs/alpha-premier/direction-sheet.md`: the dealt Taste Skill v2 direction, **"The split stage"**. Adopt its geometry exactly. Where it disagrees with itself, the order is house rules → direction → type and palette → hero blueprint → section blueprints.
2. `.claude/skills/design-taste-frontend/SKILL.md` plus `references/motion.md`, `references/copy.md` and `references/imagery.md`. These are the house rules. The inspector measures them.
3. `src/data/alpha-premier.ts`: **all copy and facts come from here.** Don't invent facts, numbers, quotes or names. If you need new copy, add it to the data file in the same plain voice and list it in your report.
4. `src/app/alpha-premier/styles/tokens.css`: the tokens, the type steps, `.ap-button` (the only button shape), `.ap-link`, and the `[data-reveal]` / `[data-rise]` motion helpers. **Use the tokens. Don't add colours, fonts, radii or type sizes.**

## Fixed decisions
- **Palette:** ground `--bg` stone #dfdedb, `--surface`, `--ink`, `--muted`, and one accent `--accent`, a deep Alpha gold that fills the single primary button and is used for at most one thing per screen. `--gold` and `--night` appear only inside dark pictures, the kiosk fragment and the footer photograph.
- **Type:** display is Bodoni Moda 500 (`--font-display`, set on h1/h2/h3); text is Jost (`--font-text`). Only these two families anywhere, including inside `data-ui` fragments. Use only the five steps `--step-small`, `--step-body`, `--step-lead`, `--step-head` and `--step-display` (footer wordmark only). Small is never under 13px; body text is 16px or larger in full `--ink` (or `--muted` at full strength). Never fade text with opacity.
- **Shape:** one radius for the whole page, square (`--radius: 0`). One button shape: `.ap-button`. Page margins are `--margin` (12px), with column padding `--pad`.
- **Class prefix:** `ap-` for every class. Plain CSS in your own stylesheet (listed below); no CSS modules. Tailwind utility classes are allowed for one-off layout, but prefer your stylesheet.
- **Images:** use `next/image` with explicit `sizes`, `alt` from the data file, square corners, `object-fit: cover`. Nothing ever sits on top of a headline. One treatment: untouched.
- **Accessibility:** semantic landmarks, one `h1` on the page (in the hero, owned by agent A), `h2` per section. Every control is keyboard-reachable, has a visible focus ring and a 44px minimum target. Respect `prefers-reduced-motion`.
- **Server components by default.** Mark a component `'use client'` only when it needs state or effects, and keep the client part small.

## Banned (the inspector fails or warns on these)
Eyebrow labels and kickers above headings; pill badges; monospace outside `<pre>`/`<code>`; zero-padded or 01/02/03 numbering; "Step 1"; hairlines, `<hr>`, 1px outlined boxes, dashed or dotted rules, crop marks or visible grid lines; any gradient (except a neutral scrim behind text on a photo) or gradient text; shadows on resting elements; glows; text-shadow; glass or backdrop blur; floating pill navigation; emoji; blobs or decorative shapes; fake dashboards of grey bars; a styled accent word inside a headline; more than two typefaces; headlines longer than **two lines** at 1440, 768 or 390px; text under 13px; more than 72% of text centred; sideways overflow; icon-topped feature-card rows; stock words (unlock, elevate, seamless, effortless, robust, "Get started", "Learn more"); more than 4 em dashes on the page; middot-separated word strings as decoration; "Field notes" style editorial labels.

## Required
Neighbouring sections never share a layout. The idea carries into every section. A staggered entrance on the parts of every section (`data-reveal` with `style={{'--i': n}}`, 60–90ms apart). Feedback on every control (hover, active, focus). Transform and opacity only for motion. A phone layout composed as its own page (check 390px).

**The idea sentence:** "On this page, the ride up to Unit 3104 of Tektite East Tower becomes the fixed half of a split stage: the camera climbs the building while you read, and the room's lights come on as the systems arrive."

## Ownership: write only your own files
| Agent | Files you own | Sections (sheet blueprint) |
|---|---|---|
| **A, stage** | `src/components/alpha-premier/SplitStage.tsx`, `StageMedia.tsx` (client), `ScrubFilm.tsx` (client), `Ledger.tsx` (client if needed); `src/app/alpha-premier/styles/stage.css` | Hero "Menu column, sticky photograph"; intro "Narrow column, empty field" (the `before` paragraphs); work "Quiet ledger, side preview" (the `ledger` rows). The left reading column scrolls; the right half is the sticky stage. |
| **B, systems** | `src/components/alpha-premier/Systems.tsx`, `SystemTabs.tsx` (client), `TapCard.tsx` (client), `ViberFragment.tsx`; `src/app/alpha-premier/styles/systems.css` | showcase "Square plate, spare text": the four systems as tabs. This breaks the split and runs full width. |
| **C, closing** | `src/components/alpha-premier/FieldPhotos.tsx`, `Figures.tsx`, `InternshipRecord.tsx` (+ a client part), `ThanksLetter.tsx`, `SiteFooter.tsx`; `src/app/alpha-premier/styles/closing.css` | gallery "Drag row of mixed modules"; stats "Photograph with figure tiles"; list "Sticky photograph, active list" (the `record`); about "Founder's letter" (the `thanks`); footer "Name across the last photograph" |

Shared files (`tokens.css`, `layout.tsx`, `page.tsx`, `RevealOnScroll.tsx`, `src/data/alpha-premier.ts`) belong to the lead. If you need a change there, put it in your report instead of editing. **Exception:** you may *append* new exported fields to `src/data/alpha-premier.ts`, but never edit existing ones.

## Assets available (`public/alpha-premier/`)
- `ui/*.webp`: real screenshots from Deign's repos. Kiosk screens show demo interns only.
- `found/tektite.webp`, `found/ortigas-dusk.webp`, `found/ortigas-night.webp`: real CC BY-SA photographs. Credits are in `found/credits.json` and must appear in the footer.
- `brand/peacock.png`: the gold peacock mark, transparent, 500². `brand/logo-horizontal.png`: white wordmark for dark grounds.
- Coming later, so design for them and accept missing files gracefully:
  - `film/film.mp4` and `film/film-mobile.mp4`, with posters `film/leg-1.webp` … `film/leg-4.webp`: the generated maquette film, four legs concatenated, 16:9.
  - `stills/*.webp`: generated maquette stills.
  - `photos/photo-NN.webp`: Deign's internship photos. Until they exist, gallery slots show the found photos and UI captures, and the report must say these are stand-ins.

## Verify before reporting
- Run `npx tsc --noEmit -p .` and `npx eslint <your files>`. Both must be clean for your files.
- Run `node .claude/skills/design-taste-frontend/scripts/lint.mjs <your component files> <your css>` and fix every FAIL.
- **Don't** run `next dev` or `next build`; the lead runs the integrated page and the real-browser inspector.
- Report: files written, any data fields you appended, sample copy you added, deviations from the blueprint with a one-line reason, and anything you need from the lead.
