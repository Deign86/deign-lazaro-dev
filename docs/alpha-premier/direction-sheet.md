# DIRECTION SHEET — The split stage
seed 868077917 · drawn 2026-10-17 · sector real-estate · tone editorial
Brief: IT intern's case study for a Philippine real estate brokerage that had no IT department

| | |
| --- | --- |
| Direction | The split stage |
| Hero | Menu column, sticky photograph |
| Type | Bodoni Moda / Jost |
| Colour | Stone and blueprint |
| Sections | intro (Narrow column, empty field) → about (Founder's letter) → work (Quiet ledger, side preview) → showcase (Square plate, spare text) → gallery (Drag row of mixed modules) → stats (Photograph with figure tiles) → list (Sticky photograph, active list) → footer (Name across the last photograph) |
| Motion | Slow crossfade |
| Photographs | the "Architecture" set, as atmosphere |

This is the direction for this build. Adopt it. Do not blend it with the layout you would have made anyway,
and do not redraw because it is unfamiliar: unfamiliar is the point. Redraw a slot only when it conflicts
with a stated brand constraint or needs an asset that does not exist, and say why in your report.

The parts of this sheet were written separately and will disagree in small ways. Settle every disagreement in this order:
**house rules** (including type no smaller than 13px and body text of 16px or more) → **the direction** (the idea, the composition habits, where the
one accent goes) → **the type system and the palette** (which face does which job, the five size steps, which colour is the ground and where the
accent goes) → **the hero blueprint** → **the section blueprints**. Under each blueprint below, "Adjusted for this page" lists where it disagrees.
In practice: take geometry from blueprints (columns, proportions, what sits where) and take everything else from above them. Map every size a
blueprint names onto one of your five type steps instead of adding a sixth. Use one button shape, one corner radius and one pair of page margins on
the whole page, whatever individual blueprints say. If a blueprint names a kind of typeface (a light serif, a heavy grotesk), use the dealt face.

## 1. The idea
Half the screen never moves. One side is a fixed photograph (or object, or product view) that stays in place for the whole visit; the other side is a calm scrolling column with everything you need to read. The fixed half keeps the feeling present while the reader gets on with the facts, like sitting in the room while reading the menu. As sections pass, the fixed image may quietly change to the one that matches.

Before anything else, write one sentence in your notes: "On this page, <the subject's own material> becomes <the device>."
Fill the first blank from your inventory of what only this client has (its name and what it means, its street, its numbers, its
constraint), then put the nearest competitor in the sentence: if it still works, the idea is the category's, not the client's.
Then name the one live thing the visitor can do on the page (SKILL.md step 4).

## 2. Composition
Desktop: a two-column page, 50/50 or 45/55. One column is `position: sticky; top: 0; height: 100svh` and holds a single photograph filling it edge to edge, or the object centred on a flat field. The other column scrolls and holds all content in a single narrow measure (max 46ch) with comfortable padding (48–72px): name and one-line description first, then sections separated by generous space, then contact and footer. Headings in the scrolling column are modest (32–44px). The column grounds differ: photograph on one side, flat paper colour on the other, meeting at a clean vertical edge. On a phone the fixed half becomes a 60svh image at the top that stays sticky behind the first section, then releases.

## 3. Type — Bodoni Moda / Jost
A true didone with hairline serifs and vertical stress over a light geometric sans, the classic fashion-magazine pairing. Suits luxury property, jewellery, fragrance and fashion.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,500;1,500&family=Jost:wght@400;500&display=swap" rel="stylesheet">
```
- Display: **Bodoni Moda** — weight 500 with optical sizing on · tracking -0.02em · leading 0.95 · uppercase or sentence case; italic for a whole line, never for one word
- Text: **Jost** — 400 for body, 500 for emphasis · leading 1.6 · tracking 0.01em
```css
:root {
  --step-small: clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem);
  --step-body: clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem);
  --step-lead: clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem);
  --step-head: clamp(2rem, 1.3rem + 3.2vw, 4rem);
}
```
A text-first setting: a readable serif or a calm sans at 17–19px, with one display size for the name. Left-aligned throughout.
The direction decides sizes and how many of them; the type system decides how this face is set. Where the two give different tracking or leading, use the values of the type system: they are tuned to this face.
The display size itself comes from the hero blueprint below.

## 4. Colour — Stone and blueprint
```css
:root {
  --bg: #dfdedb;
  --surface: #d3d2ce;
  --ink: #26251e;
  --muted: #5f5d55;
  --accent: #2456d6;
  --accent-ink: #ffffff;
}
```
Stone paper carries the whole page with near-black and grey text. One image at a time is printed in the accent blue as its only ink, and the same blue fills the single button.
The paper colour of the reading column is chosen against the photograph: a tone taken from its shadows or its lightest area. One ink, optionally one accent ink for links and the action.

## 5. Imagery
**Use the images that belong to the project in every picture slot.** For slots they cannot fill, real pictures of the subject's world from the open collections come next (start with `node C:/Users/APG/Downloads/deign-lazaro-dev/.claude/skills/design-taste-frontend/scripts/assets.mjs "estate brokerage"`, then queries from your inventory (its street, its materials, its trade's tools and history); credit them on the page), then the dealt photographs.

One excellent portrait-orientation photograph for the fixed half, plus three or four more that crossfade in as their sections arrive. Small inline photographs in the reading column are optional and should be few.

**Floor (the inspector checks it):** at least four real pictures on the page, usually six to twelve; SVG drawings do not count. One moving picture where an honest clip exists: `node <skill>/scripts/assets.mjs --video "<query>"`, used as a muted loop with a poster frame. Whatever this direction says about pictures, it is carried out with real ones.

Photographs dealt for this build, from the "Architecture" set (structure, lines, bridges, facades and building interiors)
Order of preference for imagery: (1) the project's own photographs and product shots; (2) images you generate, if an image tool is
available; (3) real pictures of the subject's world found in the open collections (assets.mjs, downloaded and credited on the page);
(4) drawings of the subject in code; (5) these. They are real photographs (Unsplash licence, served by picsum.photos) of places, light and
texture. They are atmosphere, never a stand-in for a specific product, dish, person or interface. List the ones you use in your report so
they can be replaced.
- `https://picsum.photos/id/1081/1600/1000` — Stepped white modern building corner rising into a pale blue sky · light tone · white, pale blue, soft grey · calm area: top · native landscape · photo: Julien Moreau
- `https://picsum.photos/id/887/1600/1000` — White apartment block facade with repeating balconies and windows · light tone · white, pale grey, soft red · native landscape · photo: Roman Kraft
- `https://picsum.photos/id/942/1600/1000` — White angular concrete building against a black sky · dark tone · black, white, pale grey · black-and-white · calm area: top · native landscape · photo: Carl Nenzen Loven
- `https://picsum.photos/id/618/1600/1000` — Curving glass and steel lattice roof in black and white · light tone · white, grey, black · black-and-white · native landscape · photo: Mika Ruusunen
- `https://picsum.photos/id/508/1600/1000` — Tall pointed vaults and pale columns of a church interior · light tone · cream, warm grey, soft orange · native portrait · photo: Jeff Sheldon
- `https://picsum.photos/id/693/1600/1000` — Red suspension bridge tower rising from fog above rugged cliffs · mid tone · rust red, grey, dark teal · calm area: left · native landscape · photo: Rob Bye
- `https://picsum.photos/id/620/1600/1000` — White arched bridge spanning grey water under a pale sky · light tone · white, pale grey, charcoal · black-and-white · calm area: bottom · native landscape · photo: Matthew Wiebe
- `https://picsum.photos/id/855/1600/1000` — Small figure walking past a huge bright yellow wall · light tone · bright yellow, black · calm area: left · native landscape · photo: Rodion Kutsaev
The last two path numbers are width and height: request the exact crop you render (`/1200/1500` for a 4:5 portrait, `/2400/1350` for a hero) and
add `?grayscale` to desaturate. Use three to six of them, not all eight. Always set `width`, `height`, `alt` and `loading="lazy"` (not on the hero image).
Other sets that fit this brief: fog-and-quiet, coast, city-day, interior-and-table — `node draw.mjs --photos <set>` prints one in full; `--photos list` shows all sets. Taking photographs from another set is your call and is not a redraw; keep them to one light and one treatment.

## 6. Hero — Menu column, sticky photograph
The viewport is two panels of equal width with a 12px gap between them and 12px outer margins, both with a 20px radius. Right panel: one photograph of the place filling it edge to edge (object-fit: cover), set to position: sticky; top: 12px; height: calc(100svh - 24px), so it stays put while the left side scrolls. A solid bar in the paper colour, 56px tall, lies across the photograph's bottom edge inside the panel and carries opening hours on the left and the address on the right at 15px. Left panel: a filled paper-colour sheet set like a menu card, everything centred. Its top row holds the wordmark, about 300px wide, in the centre with one text link either side. Below, at 34% of the height, the headline in a light serif at clamp(40px, 3.6vw, 56px) on two lines in the accent ink, max 18ch per line. Under it one sentence at 17px, max 40ch, then the single action as a solid rectangle in the accent ink. The lower quarter of the sheet is empty before the first section begins.

On a phone: The photograph comes first as a rounded panel 56svh tall on 12px margins, sticky at the top so the paper sheet slides up over its lower part. The hours bar stays on the photograph's bottom edge. The sheet holds the wordmark centred at 46% of the width, the headline at 9vw on two lines, the sentence and a full-width action.
Headline: A warm 3-6 word line in a light serif, at most 34 characters, centred on two lines.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.
- It names its own corners: use the one radius of this page (square unless the direction says otherwise) and one button shape.
- It names a kind of typeface: use the dealt faces (display Bodoni Moda, text Jost) and their settings; capitals only where the type system sets them.

## 7. Sections, in order
Each is a composition to rebuild with this project's content. Keep the geometry; change the subject. Re-order or drop a
section when the argument of the page needs it (see references/copy.md), never to fall back to a card grid.

### 1. intro — Narrow column, empty field (stack)
A single text column 300–340px wide, its left edge at 15% of the viewport width, starting 64px below the section top. It holds four or five short paragraphs at 15–16px with leading 1.5 and one blank line between them; the first paragraph is in medium weight and full ink, the rest in regular weight and the soft ink. No heading, no image, no button; one underlined text link may end the last paragraph. The remaining three-quarters of the 1440 screen is untouched ground, and the section is only as tall as the text plus 160px of padding below. The column's left edge must match a line used elsewhere on the page (the wordmark's left edge or a later column). Where the page has a large object or a fixed photograph, this column is the small text beside it. Holds 90–150 words comfortably.
On a phone: The column becomes 78% of the width, left-aligned at the 20px margin, so a strip of empty ground remains on the right as a deliberate margin. Text stays at 15–16px with the first paragraph in medium weight. Padding is 72px above and 96px below.

### 2. about — Founder's letter (stack)
A letter in a centred column 520px wide with at least 160px of empty ground above and below. At the column's top-left, a round portrait 44px across. 28px below it, four or five short paragraphs at 16–17px with leading 1.55, each two to four lines and separated by one blank line, written in the first person. No heading. The sign-off is the writer's name at 22px in the text face's italic, with the role at 14px in the soft ink beneath it. One phrase in the letter may carry a flat marker-colour background. Variant for a page built as an object: the letter sits on a filled paper-colour sheet 640px wide with 60px padding on a contrasting ground, square corners, its bottom edge cut into small scallops with `clip-path`, and below a row of 5px round dots a tear-off strip 72px tall that carries the email address.
On a phone: The column takes the full width with 24px margins; text at 16px, portrait 40px. In the sheet variant the sheet spans edge to edge with 24px padding and keeps its shaped bottom edge; the tear-off strip stacks the email above a full-width button.

Adjusted for this page:
- It names a kind of typeface: use the dealt faces (display Bodoni Moda, text Jost) and their settings; capitals only where the type system sets them.

### 3. work — Quiet ledger, side preview (list)
A plain ledger in one column 560px wide whose left edge sits at 22% of the viewport width. A heading of two or three words at 24–28px in medium weight, then 32px of space, then one row per project, 44px tall: the name at 16px in full ink at the left, the kind of work at 14px in the soft ink starting at 55% of the column, and the year right-aligned with tabular figures. Nothing is drawn between rows; the three fixed starts make the columns. Hovering or focusing a row keeps it in full ink, drops the others to the soft ink, and shows that project's image in the empty area right of the column: a 4:3 frame 300px wide, `position: absolute`, its top aligned to the hovered row, 64px from the column's right edge, appearing with a 150ms fade. Holds 6–20 rows; group by year with 28px of extra space.
On a phone: The column fills the width with 20px margins. Rows are 52px tall: name at the left, year at the right, kind of work on a second line at 13px. There is no hover preview; instead the first three projects each show a 16:10 image at full column width above their row.

### 4. showcase — Square plate, spare text (split)
One flat field split 50/50, at least 88svh tall. Left half: a single square photograph filling the half's width minus 40px margins, vertically centred, square corners. A large simple shape may be laid over it to turn the photograph into the object it stands for: a ring 86% of its width with a 6px stroke and a small solid dot at the centre makes a record; a notch cut by clip-path makes a ticket stub. Right half, a flex column with space-between: at the top a row of three plain text tabs at 18px (editions, years, variants), the active one in full ink and the others at 40%; in the middle the title, two to four words at 32–40px bold, with a 34ch description 48px below; along the bottom two filled rectangular cells side by side, each half the column wide and 72px tall, acting as the two actions, one in ink and one a tone off the field.
On a phone: The square photograph comes first at full width with 16px margins. The tabs sit under it as one row at 17px. Then the title at 28px, the description, and the two action cells stacked, each full width and 60px tall.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 5. gallery — Drag row of mixed modules (carousel)
One horizontal row, 68svh tall, running off both viewport edges with 12px gaps, draggable and scrollable sideways (`overflow-x: auto`, `scroll-snap-type: x proximity`, scrollbar hidden). The row is built from three module types: a tall single image at 3:4 filling the row height; a column of two stacked 4:3 images sharing the height with a 12px gap; and a wide 16:10 landscape at full height. Sequence for nine photographs: tall, stacked pair, wide, stacked pair, tall, wide. The row starts 6vw in from the left, so the first module is whole and the last visible one is cut by the right edge. A heading of two or three words at 28–36px sits 32px above the row's left start; the count of photographs sits at the right margin on the same baseline. No captions and no arrows. Inside a narrow reading column the same row runs 300px tall and is cut by the column's edge.
On a phone: The row is 62svh tall with 8px gaps and starts 20px in. Modules are sized so one and a third are visible: tall images 72vw wide, stacked pairs 64vw wide, landscapes 88vw wide at reduced height and centred vertically. Scroll snapping aligns each module to the left margin.

### 6. stats — Photograph with figure tiles (mosaic)
A mosaic without gutters spanning the full width, about 66vw tall in total. A single photograph fills the left two-thirds at roughly 1:1 with object-fit: cover and square corners. The right third is split into two stacked flat colour tiles of equal height, in two palette colours that differ clearly in lightness as well as hue. Each tile carries one figure at clamp(56px, 5.6vw, 96px) in its top-left corner, 28px in from the edges, with a two-line caption at 17px directly beneath it; the rest of the tile is empty colour, which is the point. Photograph and tiles touch, with no gaps and no rounding. The heading, two to four words at 32–40px, sits above the mosaic's left edge with 40px beneath, or is left out when the section follows a text page whose title already introduces it. Never add a third tile; with three figures choose another layout.
On a phone: The photograph comes first, full-bleed at 4:3. The two colour tiles follow side by side as squares, each 50vw, with the figure at 13vw top-left and the caption at 15px beneath. No gaps between any of the three pieces.

### 7. list — Sticky photograph, active list (split)
Two columns. The left, columns 1–5, is `position: sticky; top: 12vh` and holds one photograph or object at 4:5, 34vw wide, unframed on the ground. The right, columns 7–11, holds a vertical list of five to nine names (treatments, rooms, courses, services) at clamp(20px, 1.6vw, 24px), each row 58px tall with the name at the left and a price or duration right-aligned at 15px in the soft ink. The active row is full ink; the others rest at 40% opacity. Hovering, focusing or scrolling a row to the middle of the viewport makes it active, crossfades the left photograph to that item's image over 300ms, and opens a three-line description at 15px, 34ch wide, directly under the name, pushing later rows down. A heading of two or three words at clamp(32px, 3.4vw, 48px) sits above the list, aligned to its left edge, 48px above the first row.
On a phone: The photograph becomes a 4:3 band pinned to the top of the screen at 38svh while the list scrolls beneath it; the heading sits above the first row. Rows are 56px tall and the description opens on tap. The image changes with the row nearest the band.

Adjusted for this page:
- It fades text: anything a visitor reads, inactive items of a list included, is `--ink` or `--muted` at full strength (contrast 4.5:1 or more). The active item is told apart by `--ink` against `--muted`, weight or the accent, not by fading the rest.

### 8. footer — Name across the last photograph (full-bleed)
The footer is the page's last photograph, full-bleed at 100vw by 100svh, darkened evenly with `filter: brightness(0.62)` so paper-coloured type reads everywhere on it. Three layers of text sit on the image. Top row, 32px from the edge: a short link list at 16px at the left margin and contact details at the right margin, each no wider than three columns. Mid-height is left to the photograph. Along the bottom, the wordmark runs the full width in the paper colour, letters about 12–20vw tall depending on the name's length, baseline 56px above the edge; under it one line of legal text at 13px. Choose an image whose interest is in its middle band, since the top and bottom carry text. No panel, no box and no colour block separates the footer from the image: the photograph is the footer.
On a phone: The photograph is 100vw by 88svh, cropped to its strongest vertical slice. Links stack at the top-left at 16px, contact beneath them. The wordmark is fitted to the width along the bottom, with the legal line under it at 12px.

Adjusted for this page:
- It sets text at 12px: use your small step (13px or more) instead.

## 8. Motion — Slow crossfade
The principal photograph quietly changes: three or four images of the same framing crossfade over about 1.6 seconds, holding five to six seconds each, or the fixed image changes when its matching section arrives. It should feel like light shifting in a room. Pause when the tab is hidden; under reduced motion show only the first image.
This is the signature move, the one loud moment. Around it the page still needs the rest of the motion layer (SKILL.md step 9): an entrance for the parts of every section, feedback on every control, and one moving picture. The inspector fails a page that barely moves. Recipes: references/motion.md.

## 9. Where the richness comes from
A full-height photograph always in view, against a quiet, well-set column of text.

## 10. How this direction goes wrong
The reading column must be genuinely well typeset, since it is half the page. Do not put cards or grids in it. Check that the fixed image crops well at short viewport heights. In blind tests the commonest complaint was monotony: several screens of the same split with only the text changing. Change what the reading half holds from section to section (a list, a large figure, a table, a full-colour panel, a drawing) and let at least one section break the split and run full width.

## 11. Real references
Studied sites that work this way. Take the principle, never the specifics: no names, copy, images or signature assets of theirs.
- **Rafael Derolez** (One Page Love, studied score 7.3) `opl-rafael-derolez-2026`
  Idea: A portfolio as a phone carousel: a fixed text rail on the left narrates whichever phone-shaped screen is centred on the right.
  Hero: Dark charcoal page split by a vertical hairline at 30% width. Left rail: a 55px header row with name, slash and current section as a breadcrumb in 16px sans, plus a small cobalt ticket-shaped hire button with a perforated divider and arrow; below a hairline, four short paragraphs of 16px grey text with white links, top-aligned, leaving the lower 40% of the rail empty. Right 70%: three phone-proportioned frames with large rounded corners in a row; the centre one upright, full brightness and about 680px tall, the outer two smaller, dimmed and rotated in perspective toward the centre.
  Worth taking: Use a breadcrumb (name / current item) as the only heading and update its last word as the content changes.
- **Flowjam** (One Page Love, studied score 6.8) `opl-flowjam-2`
  Idea: A persistent frosted sidebar card holds the pitch and buttons while a soft-serif content column scrolls past it; beyond that there is no idea stronger than proof by logos and videos.
  Hero: Grainy off-white page. A tall rounded card about 26% of the viewport wide is pinned at the left and runs off the bottom; frosted over blurred pink and yellow flowers, it holds the logo, a two-line serif tagline, a short blurb and two pill buttons in hot pink and charcoal. The main column starts 32% from the left: a hot-pink pill badge, a three-line serif headline at 4.2vw, then a paragraph whose first sentence is grey and the rest black. A lone charcoal pill button floats far right at mid-height. Below: a heart icon with a proof line, then the top of a four-column logo grid with dotted borders.
  Worth taking: Pin a narrow card with logo, one-line pitch and both actions beside the scrolling content, so the call to action never leaves the screen and no top nav is needed.
- **ERA Residence** (Awwwards Site of the Day, studied score 7.6) `aww-era-residence`
  Idea: One continuous 3D render of the estate that the scroll flies through, titled like a perfume label with condensed didone capitals and an overlapping script signature.
  Hero: The captured first viewport is an intro curtain: a deep aubergine field with a hairline frame inset 22px and chamfered corners. At centre, a two-line title in tall condensed didone caps at about 6vw, with a thin script place-name overlapping its lower edge at an upward angle. On the same line, two wide-letterspaced caps words sit a third of the way in from each side. A ghost script word, barely lighter than the field, spans the full width behind. Flower mark top-centre; a 90px vertical hairline and two lines of tiny extended caps bottom-centre. It opens onto a full-bleed render with the same lockup at 12vw across the sky.
  Worth taking: Overlap a thin script word across the bottom edge of condensed didone capitals, angled upward, like a signature on a label.
Full notes on any of them: `node draw.mjs --site <id>`.

## Always
Headlines two lines or fewer at every width. No eyebrow labels, no monospace, no 01/02/03, no thin rules, no gradients, no shadows at rest,
no cream-and-terracotta, no violet. `inspect.mjs` measures all of it.

Saved to C:/Users/APG/Downloads/deign-lazaro-dev/.taste-skill/direction.json · reprint with `node draw.mjs --show`
