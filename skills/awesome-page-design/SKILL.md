---
name: awesome-page-design
description: Use this skill as a page design assistant whenever the user is designing, building, reviewing, or improving a website, web app, dashboard, landing page, admin panel, product page, docs portal, ecommerce console, CRM workspace, analytics screen, portfolio, onboarding flow, or UI component that needs visual direction. It helps choose and apply color systems, typography, spacing, surfaces, borders, radius, shadows, glass/metal/soft material effects, component tone, interaction states, information density, image direction, and page mood. Trigger it even if the user only says the page should look better, more elegant, more professional, less generic, less AI-generated, more playful, more futuristic, more minimal, or closer to a named visual reference. Before final implementation, guide the user to preview the included visual style gallery and choose one style unless they explicitly delegate the choice.
---

# Awesome Page Design

Use this skill to make deliberate page design decisions before and during UI implementation.

## Core Rule

This is a visual direction library, not a copy-paste template library. Reuse the selected visual language, then design the actual page structure around the user's product, content priority, workflow, and device needs.

The bundled HTML previews are richer clickable examples so the user can judge the style. They are not production layouts to clone.

## Required Workflow

Follow `references/workflow.md` for the full workflow. The short version is:

1. Understand the page design task: product type, page/screen type, primary workflow, audience, density, mood, light/dark preference, and image needs.
2. If the user has not already chosen a visual style, run the preview selection gate before final implementation.
3. Read `references/usage-principles.md`.
4. Read `references/style-index.md` to select or validate candidates.
5. After a style is chosen, read the matching file in `references/styles/`.
6. Apply the chosen color, typography, spacing, surface, border, radius, shadow/glow/material, component, imagery, and state guidance to the user's real product.
7. Redesign page structure around the actual content and workflow; do not copy preview HTML or sample content.
8. Before finishing implementation, check the verification checklist in `references/workflow.md`.

## Preview Selection Gate

When the user describes a UI request but has not already chosen a visual style, pause before implementing the final UI. First help the user select from the preview gallery.

Use this gate for complete pages, app screens, dashboards, landing pages, admin panels, product pages, docs portals, ecommerce consoles, CRM workspaces, analytics pages, portfolios, onboarding flows, and any task where visual direction is still undecided.

Required flow:

1. Summarize the user's request as a short selection brief:
   - product type
   - primary workflow or page type
   - desired mood
   - expected information density
   - light, dark, or mixed preference when known
   - whether images/photography are useful
2. Open or provide the preview gallery URL using the instructions in `Previewing The Included HTML`.
3. Ask the user to choose by copying one style prompt from the gallery.
4. Do not implement the final UI until the user has selected a style or has explicitly delegated the choice to the agent.
5. If the user says the agent should choose, recommend 2-3 style candidates, explain the differences briefly, apply the similarity guardrails, and ask for confirmation before final implementation unless the user explicitly says to proceed.
6. If the client cannot open local previews, provide text candidates from `references/style-index.md` as the fallback selection surface.

Only skip this gate when the user has already named a specific style, asks only for analysis/review, asks for a tiny component that does not need page-level direction, or explicitly says to choose and proceed without confirmation.

## Reference Navigation

- `references/workflow.md`: required design, preview selection, implementation, and verification workflow.
- `references/style-index.md`: concise index of the 21 visual styles, numbered continuously from Style 01 to Style 21.
- `references/usage-principles.md`: rules for using the library correctly.
- `references/styles/*.md`: full style manuals with tokens and application guidance.
- `assets/styles/`: visual style HTML and PNG preview assets.
- `assets/previews/index.html`: preview gallery for the 21 visual styles.

## Current Style Set

- Style 01 - Card Grid: light neutral card grid rhythm for dashboards, catalogs, and overview pages.
- Style 02 - Block Brutalism: warm yellow, hard black borders, blocky controls, and campaign energy.
- Style 03 - Aurora Gradient: dark canvas, aurora color fields, soft glow, and premium AI atmosphere.
- Style 04 - Retro Y2K: candy gradients, neon details, retro display type, and sparkle energy.
- Style 05 - Swiss Editorial: tight editorial grid, red-black hierarchy, rule lines, and disciplined content rhythm.
- Style 06 - Terminal Hacker: black canvas, terminal green, monospace, scanlines, and developer credibility.
- Style 07 - Cute-alism: neon yellow, pink hard shadows, sticker-like objects, and soft-hard contrast.
- Style 08 - Resonant Stark: near-black canvas, thin type, subtle glow, extreme whitespace, and premium restraint.
- Style 09 - Tech Minimal: large whitespace, few colors, single visual focus, modern sans-serif UI.
- Style 10 - Dark Theme: dark background, high contrast, one bright accent.
- Style 11 - Structured Lines: fine line frames, professional structure, clear hierarchy.
- Style 12 - Material Design: layered tonal cards, large radius, orderly surfaces.
- Style 13 - Bento Layout: modular card zones inspired by widget-like composition.
- Style 14 - Neumorphism: soft light, inset depth, rounded tactile controls.
- Style 15 - Liquid Glass: frosted transparency, blur, layered futuristic surfaces.
- Style 16 - Retro Computing: pixel mood, old OS chrome, 80s/early desktop cues.
- Style 17 - Neo-Brutalism: thick lines, strong clashes, giant type, controlled tension.
- Style 18 - Linear Futurism: dark precision, glowing borders, sci-fi SaaS polish.
- Style 19 - Gradient Pop: bright gradients, tech/trend energy, eye-catching hero.
- Style 20 - Soft Pop: friendly playful color, doodle/cartoon mood, elastic rounded forms.
- Style 21 - Acid Design: chrome/metal sheen, laser light, distorted dark sci-fi energy.

## Similarity Guardrails

Do not let nearby styles collapse into the same generic page:

- Style 03, Style 08, Style 10, Style 15, Style 18, and Style 21 can all be dark or atmospheric. Keep them distinct by deciding whether the page needs aurora mood, stark restraint, high-contrast darkness, glass material, product precision, or acid experimentation.
- Style 09, Style 11, and Style 12 can all be professional, but they differ by whitespace, structural linework, and Material-style elevation.
- Style 02 and Style 17 are both brutalist. Use Style 02 for the original warm block campaign style, and Style 17 for stronger collision, giant type, and controlled chaos.
- Style 04 and Style 16 both reference retro culture. Use Style 04 for Y2K neon/candy energy, and Style 16 for pixel/old-operating-system texture.
- Style 07 and Style 20 are both playful. Use Style 07 for neon sticker contrast, and Style 20 for softer friendly pop and doodle/cartoon tone.
- Style 13 is a modular visual composition language. Use its bento card logic without forcing every product into the sample grid.
- Style 02, Style 04, Style 07, Style 16, Style 17, Style 19, Style 20, and Style 21 carry strong personality. Use them only when the product, audience, or campaign can support expressive design.

## Previewing The Included HTML

When the user wants to preview the integrated examples, provide a browser URL rather than only a filesystem path whenever possible.

If running from the source repository, start the local static preview server and give the user the URL:

```bash
npm run preview:serve
```

Then provide:

```text
http://127.0.0.1:<port>/assets/previews/
```

If the skill is installed inside a client, package scripts may not be available. In that case, run the bundled skill-local preview server from the installed `awesome-page-design` skill directory:

```bash
node scripts/serve-preview.js
```

Then provide:

```text
http://127.0.0.1:<port>/assets/previews/
```

Primary preview entry:

- `assets/previews/index.html`: gallery of all visual style previews.

Individual style examples:

- `assets/styles/style-01-card-grid/style-01-card-grid.html`
- `assets/styles/style-18-linear-futurism/style-18-linear-futurism.html`
- Use the same `assets/styles/style-XX-name/style-XX-name.html` pattern for other styles.

Fallback local commands when the client has shell access but cannot start a URL server:

```bash
# From inside the installed awesome-page-design skill directory
open assets/previews/index.html

# Or open a single style example
open assets/styles/style-01-card-grid/style-01-card-grid.html
```

If the client cannot open local files directly, tell the user the exact installed file path and ask them to open it in their browser. These HTML files are static single-file previews. Some examples load remote media; allow a few seconds before screenshotting.

## When Applying A Style

Extract only what is relevant to the current project:

- Color tokens and semantic color roles.
- Font family, font weights, type scale, and text density.
- Border, radius, shadow, glow, glass, metal, soft, or tactile surface treatment.
- Button, tag, card, input, table, navigation, chart, modal, drawer, and empty-state personality.
- Hover, focus, selected, disabled, loading, error, warning, and success states.
- Image direction when the page benefits from photography or rich media. Prefer real product imagery, brand photography, product screenshots, or carefully matched neutral media.
- Motion timing, texture rules, and responsive density.

Avoid treating sample layout details as requirements. If a style manual mentions page structure, read it as an example observation, not as an instruction to reproduce that structure.

## Output Expectations

When explaining a style choice to the user, keep it practical:

- Name the selected style and why it fits.
- Mention the main colors, typography, surfaces, imagery, and interaction tone.
- State that page structure will be adapted to the actual product need.

When coding, translate the selected style into concrete CSS variables, component classes, or framework theme tokens.
