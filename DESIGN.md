---
name: Persistence Chiropractic
description: A warm, flat, segment-built clinical system — one gold voice, one slate field, everything else hairlines and daylight.
colors:
  background: "#faf8f4"
  foreground: "#212121"
  brand-gold: "#e8c111"
  brand-gold-ink: "#7d6407"
  brand-slate: "#2b5672"
  brand-slate-deep: "#17364a"
  brand-slate-soft: "#93b4c8"
  brand-aqua: "#dff0f3"
  ink: "#212121"
  ink-muted: "#414141"
  line: "#e5dfd4"
  white: "#ffffff"
  signal-tension: "#c2412d"
  signal-tension-ink: "#8f2a1c"
  platform-whatsapp: "#25D366"
  platform-google-blue: "#4285F4"
  platform-google-red: "#EA4335"
  platform-google-yellow: "#FBBC05"
  platform-google-green: "#34A853"
  platform-google-star: "#FBBC04"
typography:
  display:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.4rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3.5vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  body-small:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  prose:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  prose-heading:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  prose-subheading:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.02em"
rounded:
  pill: "9999px"
  card: "1.5rem"
  panel: "0.75rem"
  item: "0.5rem"
  badge: "1rem"
  bone: "9px"
  focus: "2px"
  bar: "1.5px"
spacing:
  gutter: "1rem"
  container: "72rem"
  card-pad: "1.75rem"
  card-pad-lg: "2rem"
  section: "4rem"
  section-lg: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-gold}"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "#d4b00d"
    textColor: "{colors.ink}"
  button-ghost:
    textColor: "{colors.brand-slate}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-ghost-light:
    textColor: "{colors.white}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-contrast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.body-small}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-pad}"
  page-hero:
    backgroundColor: "{colors.brand-slate-deep}"
    textColor: "{colors.white}"
    padding: "3.5rem 1rem"
  cta-band:
    backgroundColor: "{colors.brand-gold}"
    textColor: "{colors.ink}"
    padding: "3rem 1rem"
  nav-panel:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.panel}"
    padding: "0.5rem"
    width: "16rem"
---

# Design System: Persistence Chiropractic

## Overview

**Creative North Star: "The Segment"**

Everything in this system derives from a single vertebra. The clinic practises Gonstead —
a technique that finds the one restricted segment rather than treating the whole back at
once — and the interface is built the same way: stacked units, addressed one at a time,
tapering in emphasis. The signature mark is four bone-shaped bars in a vertical column
(`.vertebrae`), lifted from the spine in the clinic's own logo, and it prefixes every
section label on the site. It is not decoration. It describes the method.

That logic scales up. Pages are a stack of full-bleed bands, each one a segment: slate
field, then bone ground, then white, then aqua tint, then the gold conversion band at the
foot. Bands are separated by a 1px warm hairline rather than shadow or gap, so the page
reads as one continuous column of clearly-jointed sections. The preloader is the same idea
made literal — a backbone of four bones pulses, then the page is revealed *through* the
bone shapes.

The atmosphere is warm, flat and daylit, not clinical-white. Every neutral is sampled from
the clinic's actual room: the walls are warm cream, the reception desk is aqua glass, and
there is a live plant wall in nearly every photograph. Gold appears rarely and only where a
decision is being asked for. The confirmed anti-reference is the site this replaces — the
old Wix build, which mixed five stock typefaces with no system and used photography as
filler. Two faces is the entire scale here, and every image is of this clinic, these
practitioners, this room.

**Key Characteristics:**
- Four-bar vertebral mark on every section eyebrow — the system's one recurring signature
- Warm cream ground, never pure white page background
- Exactly one gold element per view, always the booking action
- Flat surfaces separated by warm 1px hairlines; depth is tonal, not shadowed
- Full-bleed horizontal bands, centred 72rem container inside
- Two typefaces: Montserrat for structure, Source Sans 3 for reading
- No dark mode — the clinic has no dark identity, and gold inverts badly

## Colors

A warm neutral ground with one cool family and one saturated accent — the palette is
sampled from the clinic's own photography rather than invented, so the site and the room
match.

### Primary
- **Brand Gold** (`#e8c111`): The conversion colour and nothing else. It fills the booking
  button, the sitewide CTA band, the check glyphs on trust lists, and the focus ring. It
  never carries body text and never appears twice in one decision.
- **Deep Gold Ink** (`#7d6407`): The same hue darkened until it is legible as type on the
  cream ground. Exists solely because brand gold as text is unreadable. Use for gold-voiced
  text; never as a fill.

### Secondary
- **Slate Blue** (`#2b5672`): The brand's supplied blue. Links, ghost-button strokes and
  labels on light grounds. Too light to carry small white text — that is what the deep
  variant is for.
- **Deep Slate** (`#17364a`): The field colour. Every hero, the utility bar and the footer
  sit on it. The same hue as brand slate, darkened until white body text clears AA
  comfortably.
- **Soft Slate** (`#93b4c8`): The pale blue from the logo wordmark. Secondary type on the
  deep slate field only — eyebrow labels, supporting lines. Never on light backgrounds.

### Tertiary
- **Pale Aqua** (`#dff0f3`): The reception desk glass. A section tint, usually at 40%
  opacity, used to set a band apart without introducing a border. **Never type, never a
  fill behind small text.**

### Signal
- **Tension Red** (`#c2412d`) and **Tension Ink** (`#8f2a1c`): A diagnostic signal, not a
  brand colour. It exists only inside the concern illustrations, where it marks tension at
  its peak, and it is only ever reached *through animation* from the gold marker — the
  resting drawing is always gold. A clay red rather than an alarm red: these are diagrams of
  a tight muscle, not warnings.

### Neutral
- **Warm Cream** (`#faf8f4`): The page ground. Warmer than white on purpose — pure white
  reads cold against gold and does not match the clinic's walls.
- **White** (`#ffffff`): Card and panel surfaces, and the accreditation strip. White is the
  *raised* surface here; cream is the floor.
- **Ink** (`#212121`): Headings and primary body text.
- **Muted Ink** (`#414141`): Long-form paragraphs, supporting copy, list bodies.
- **Warm Hairline** (`#e5dfd4`): Every border, divider and rule on the site. A neutral grey
  rule reads cold against the cream ground; this one does not.

### Named Rules

**The One Gold Decision Rule.** A gold *fill* marks the action being asked for, and there is
one per view. If a screen has two gold-filled elements — two buttons, a button plus a band —
one of them is wrong; demote it to the ghost button or plain slate text. Its rarity is what
makes it read as a decision rather than as branding.

The rule governs fills, not the mark. The vertebral glyph and the check glyph render in gold
throughout the site as a small accent at ~8px, and that is the established convention across
a dozen templates. A glyph is not a call to action and does not compete with one. What it may
not do is grow: gold on any element large enough to read as a surface is a fill, and the rule
applies.

**The Warm Neutral Rule.** No cool grey enters this system. Borders are `#e5dfd4`, the
ground is `#faf8f4`. If a neutral looks grey next to the gold, it is the wrong neutral.

**The Tint-Not-Type Rule.** Pale Aqua and Brand Gold are surfaces. Deep Gold Ink, Slate
Blue and Soft Slate are voices. Crossing them — gold text on cream, aqua text anywhere —
fails contrast every time.

**The Diagnostic Signal Rule.** Tension Red is a *state*, never a colour in the palette. It
may only appear inside a diagram, only on the element the diagram is about, and only as the
peak of an animation that begins and ends on gold. That is what keeps it out of the resting
page: a visitor with reduced motion, or a screenshot, sees gold. Gold → red is a thermal
ramp, which is also what the clinic's nervoscope reads either side of the spine — so the
colour is describing the instrument's own output, not borrowing an alarm.

It may not become a border, a background, a text colour, a badge, or an error state. If
something genuinely needs a red UI state later, that is a separate decision and a separate
token.

**The Platform Mark Exception.** Third-party marks keep their own colours, because a
recoloured platform logo stops functioning as proof. Three are licensed, and only these:
WhatsApp green (`#25D366`), Google's four-colour set (`#4285F4`, `#EA4335`, `#FBBC05`,
`#34A853`) in the review widget's wordmark and glyph, and Google's review-star amber
(`#FBBC04`). They are quotations, not palette — they may not spread to any element that
isn't the platform's own mark, and nothing new joins this list without the same
justification.

They carry a `platform-` prefix in the frontmatter so a reader can tell at a glance that
they are borrowed rather than owned. Recording them there rather than suppressing the
warning is deliberate: a suppression hides the fact that a foreign colour is in the
codebase, and the next foreign colour then arrives unnoticed.

## Typography

**Display Font:** Montserrat (with system-ui, sans-serif)
**Body Font:** Source Sans 3 (with system-ui, sans-serif)
**Label Font:** Montserrat, at 11px / 0.16em tracking / uppercase — a third voice from the
second face rather than a third family

**Character:** Montserrat is geometric and confident and goes loose at display sizes, so
all headings pull tracking in to `-0.02em`. Source Sans 3 was drawn for sustained reading,
which is exactly what condition and service pages demand, and it is warmer than a default
grotesque. Two faces is the whole scale — the site this replaces used five.

### Hierarchy
- **Display** (800, clamps 2.25rem → 3.4rem, 1.08 line-height): The page `h1`. One per
  page, always. On hero sections it sits on the deep slate field in white.
- **Headline** (800, 1.875rem → 2.25rem, 1.25): Section `h2`. Sets the top of each band,
  usually preceded by an eyebrow.
- **Title** (700, 1.25rem, 1.4): Card and sub-section `h3`.
- **Body** (400, 1.125rem, 1.625): Standard paragraph. Long-form prose is constrained to a
  readable measure (roughly 65–75 characters) — full-width clinical prose is not readable.
- **Body Small** (400, 0.875rem, 1.5): Buttons, captions, utility bar, metadata bylines.
- **Label** (600, 0.6875rem, 0.16em tracking, uppercase): Eyebrows and data labels. Always
  paired with the vertebral mark when it opens a section.

### The blog prose ramp

Blog post bodies run on their own slightly larger, looser ramp (`.post-body` in
`globals.css`) because MDX files carry bare prose with no classes and because sustained
reading wants more air than a marketing page does:

- **Prose** (400, 1.0625rem, 1.75 line-height, muted ink): post body text.
- **Prose Heading** (700, 1.5rem) and **Prose Subheading** (700, 1.2rem): `h2` and `h3`
  inside a post, with 2.75rem and 2rem of space above them respectively.

This ramp is deliberately *not* the marketing ramp. A handful of element rules covers every
post, which is why `@tailwindcss/typography` isn't a dependency here.

### Named Rules

**The Tightened Display Rule.** Every `h1`/`h2`/`h3` carries `letter-spacing: -0.02em` and
`text-wrap: wrap`. Both are set globally in `@layer base` — do not restate them
per-component, and do not let a heading ship without them.

`wrap`, not `balance`, and not `pretty`. Balance ends the first line of a two-line heading
early so both lines come out the same length, which leaves a wide gap of empty space to its
right. Readers take that gap for a line break someone typed in rather than for wrapping.
The client asked for lines to fill first, 2026-08-30. A heading that wraps badly is a
heading that is too long for its container: shorten it, or raise the container's cap. Do
not reach for balance again.

**The Base-Layer Rule.** Heading colour lives inside `@layer base`. Unlayered CSS beats
every layered Tailwind utility regardless of specificity, so an unlayered `color` on `h1`
silently overrides `text-white` and renders the hero heading near-black on navy. If you add
global element styling, it goes in a layer.

**The Eyebrow Rule.** A section label is never bare text. It is `<Eyebrow>` — the vertebral
mark plus a tracked-caps label — which is what makes a scroll down the page read as a
sequence of segments.

## Layout

A single centred column of full-bleed horizontal bands. Each band spans the viewport and
carries its own background (cream, white, aqua tint, deep slate, or gold); inside, content
is constrained to a **72rem** container with a **1rem** gutter. Nothing is full-width except
the background itself.

Vertical rhythm is two steps: **4rem** of section padding on small screens, **6rem** from
`lg` up. Conversion bands and utility strips run tighter (2–3.5rem). Bands are separated by
a 1px warm hairline (`border-t`/`border-y`), never by whitespace alone — the joint between
segments should be visible.

Content grids are asymmetric by default rather than evenly split: the homepage hero runs
`1.05fr 1fr`, its intro block `0.9fr 1.1fr` (label column narrower than prose column). Card
grids are 2-up at `md`, 3-up at `lg`, with a 1.5rem gap.

Breakpoints are Tailwind's defaults — 640 / 768 / 1024 / 1280. The meaningful ones here are
`md` (the desktop utility bar appears; card grids go 2-up) and `lg` (nav becomes horizontal,
section padding steps to 6rem, the mobile sticky CTA disappears).

**Mobile is the primary case, not a fallback.** The visitor is on a phone. Navigation
collapses to a native `<details>` drawer, the utility bar is hidden so it cannot push the
nav off the fold, and long pages carry a fixed bottom CTA bar that respects
`env(safe-area-inset-bottom)`.

## Elevation & Depth

Depth is **primarily tonal**: the cream ground is the floor, white cards and panels are the
raised plane, deep slate is the recessed field, and pale aqua marks a band as distinct
without any border at all. That four-level tonal stack does most of the work, and 1px warm
hairlines do the rest.

On top of that, a **soft ambient shadow** gives resting cards a little dimension. It is
warm and slate-tinted rather than neutral black — a grey shadow on a cream ground reads as
dirt. Shadows stay low-contrast and wide; nothing in this system should look like it is
floating.

> **Note:** the resting ambient shadow is a deliberate, confirmed expansion of the current
> implementation, which is flat at rest with a single hover shadow on the homepage offer
> cards. Applying it across existing cards is outstanding work, not a documented fact.

### Shadow Vocabulary
- **Ambient rest** (`box-shadow: 0 1px 2px rgba(33,33,33,0.04), 0 8px 24px -12px rgba(23,54,74,0.10)`):
  The default resting state for content cards on the cream ground. Barely visible; you
  should notice its absence, not its presence.
- **Ambient raise** (`box-shadow: 0 2px 4px rgba(33,33,33,0.04), 0 18px 40px -16px rgba(23,54,74,0.18)`):
  Hover on an interactive card. A lift, not a jump.
- **Overlay** (`box-shadow: 0 12px 32px -8px rgba(23,54,74,0.18)`): Things genuinely above
  the page — the nav submenu, the mobile drawer, the sticky booking bar.

### Named Rules

**The Warm Shadow Rule.** Every shadow is tinted with the deep slate (`rgba(23,54,74,…)`),
never neutral black. Pure black shadow on `#faf8f4` reads grey and cold and breaks the
warm-neutral discipline the rest of the palette keeps.

**The Slate Field Is Flat Rule.** Nothing on the deep slate background gets a shadow.
Separation there comes from opacity-stepped white (`text-white/75`, `border-white/25`), and
a shadow on navy is invisible anyway.

## Shapes

Corners are generous and consistent. Buttons are **full pills** (`9999px`) with no
exceptions — primary, ghost, contrast, mobile, sticky, all of them. Content cards are
**24px** (`rounded-3xl`). Floating panels are **12px**, and individual items inside them
**8px**. Avatars and practitioner photographs are circles.

The one expressive shape in the system is the **hero image cut**: the homepage photograph
carries a 2rem radius that opens to 3rem at `lg`, with a single dramatically enlarged
top-left corner (`9rem`). It is built with border-radius rather than an SVG mask so it
survives any aspect ratio. This asymmetric cut is a homepage signature — it should not be
copied onto ordinary cards.

Three micro-radii sit below the component scale and are part of the system, not strays:
**1.5px** on each vertebral bar, **2px** on the global focus ring, and **9px** on the
preloader's bone segments (which are larger than the mark's bars and need the extra
roundness to read as bone rather than as a pill).

The vertebral mark's own geometry: four bars, `0.5rem × 0.3125rem`, 1.5px radius, 2px gap,
tapering in opacity 1 → 0.75 → 0.5 → 0.28. Segment count is fixed at four; it is a mark,
not a data display.

Borders are always 1px and always the warm hairline on light grounds, or white at 15–30%
opacity on the slate field.

## Components

### Buttons
- **Shape:** Full pill (`9999px`), `0.75rem 1.5rem` padding, 0.875rem semibold text, an
  8px gap for optional icons. Colour transitions only.
- **Primary (Gold):** Brand gold fill with ink text; hovers to a deeper gold (`#d4b00d`).
  This is the booking action. Because booking is external (SweetPew), it is always an `<a>`
  — there is no form anywhere in this system.
- **Ghost:** Transparent with a 1px stroke — slate at 30% on light grounds, white at 30% on
  the slate field — hovering to a 5–10% wash of the same colour. Deliberately quiet so it
  never competes with the gold button beside it.
- **Contrast:** Ink fill, white text, hovering to deep slate. Used only inside the gold CTA
  band, where a gold button would vanish.
- **Focus:** A 2px gold outline at 3px offset, applied globally to `:focus-visible`. Gold
  is legible on both the cream ground and the slate field, so one ring serves the whole
  site. This is an accessibility floor, not a style choice — never remove it.

### Cards / Containers
- **Corner Style:** 24px (`rounded-3xl`)
- **Background:** White on cream or aqua-tinted bands
- **Border:** 1px warm hairline, always
- **Shadow Strategy:** Ambient rest; ambient raise on hover if the card is a link
- **Internal Padding:** 1.75rem standard, 2rem for testimonial and feature cards
- **Distinctive behavior:** Link cards signal by *motion of the arrow*, not colour change —
  the "Learn more" row widens its gap on hover (`gap-1.5` → `gap-2.5`) so the arrow travels.

### Navigation
- **Utility bar:** Deep slate, 0.75rem text, desktop only. Location, hours, phone and
  WhatsApp — the first four things a "near me" visitor checks, kept above the fold on every
  route. Hidden below `md` so it cannot push the nav off the fold.
- **Main bar:** Sticky, cream at 95% with a backdrop blur, bottom hairline. Logo left, links
  right at 0.875rem medium in muted ink, hovering to slate. Gold booking button at the far
  right from `sm` up.
- **Submenus:** CSS-only. A 16rem white panel at 12px radius, revealed by `group-hover` and
  `group-focus-within` so it stays keyboard-reachable with zero JavaScript.
- **Mobile:** A native `<details>` drawer — no state, no bundle. Full-width list divided by
  hairlines, with the booking and call buttons pinned at the bottom of the panel.

### Section Eyebrow — *signature component*
The vertebral mark plus an 11px tracked-caps label, in slate on light grounds or soft slate
on the slate field. It opens essentially every section on the site. This is the single most
recognisable element of the system and the cheapest way to make a new page look like it
belongs.

### Conversion Band — *signature component*
A full-bleed gold band at the foot of every content page: headline and supporting line on
the left, ink "Book now" button and outlined "Call" button on the right, stacking on mobile.
It is the same component everywhere, deliberately — booking is the only thing any of these
pages is ultimately for.

### Mobile Sticky CTA
Fixed bottom bar below `lg`: a full-width gold booking pill plus a WhatsApp button in
WhatsApp's own green (`#25D366`) — the one place a non-palette colour is permitted, because
it is a platform mark, not a brand choice. Respects `env(safe-area-inset-bottom)`.

### Evidence Components
**Reviewed-by byline** (practitioner avatar, name, credentials, review date) and
**References** (numbered citation list) are E-E-A-T components for medical pages. Both
render *nothing* when their data is absent, so an unreviewed page cannot display a
fabricated review date. Preserve that behavior in anything similar you build.

## Do's and Don'ts

### Do:
- **Do** open every section with `<Eyebrow>` — the vertebral mark plus a tracked-caps label.
- **Do** use warm cream (`#faf8f4`) as the page ground and white only for raised surfaces.
- **Do** keep exactly one gold element per view, and make it the booking action.
- **Do** separate bands with a 1px warm hairline (`#e5dfd4`), not with whitespace alone.
- **Do** tint shadows with deep slate (`rgba(23,54,74,…)`), never neutral black.
- **Do** ship interactivity as CSS or native HTML first — `focus-within` submenus,
  `<details>` drawers and accordions. A client bundle for a menu spends the Core Web Vitals
  budget the whole rebuild depends on.
- **Do** give every image explicit width and height, and write alt text that describes what
  is actually in the frame plus a local modifier.
- **Do** let evidence components render nothing when their data is missing.

### Don't:
- **Don't** use `#e8c111` as text or `#dff0f3` as anything but a surface. Use Deep Gold Ink
  (`#7d6407`) when gold needs to speak.
- **Don't** introduce a cool grey. Every neutral in this system is warm.
- **Don't** recolour a third-party mark to fit the palette, and don't borrow a platform's
  colour for anything that isn't its own mark. See The Platform Mark Exception.
- **Don't** add a third typeface. Montserrat and Source Sans 3 are the entire scale — the
  five-face pile-up on the old Wix site is the confirmed anti-reference.
- **Don't** put a shadow on anything sitting on the deep slate field.
- **Don't** copy the homepage hero's asymmetric 9rem corner cut onto ordinary cards. It is
  one signature in one place.
- **Don't** remove or restyle the global gold `:focus-visible` ring.
- **Don't** add a dark-mode block. Inheriting `prefers-color-scheme` inverts the brand
  colours unpredictably against gold, and the clinic has no dark identity.
- **Don't** add a square-cornered button. Pills, without exception.
