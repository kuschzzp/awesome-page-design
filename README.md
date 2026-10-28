<div align="center">

# Awesome Page Design

**26 distinctive visual style prompts for agent-built websites and web apps.**

Give coding agents stronger visual direction before they start building UI.

[Chinese](./README.zh-CN.md) · [Skill Entry](./skills/awesome-page-design/SKILL.md) · [Preview Gallery](./skills/awesome-page-design/assets/previews/index.html) · [Style Index](./skills/awesome-page-design/references/style-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-26-111827)](./skills/awesome-page-design/assets/styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## What Is Awesome Page Design?

Awesome Page Design is a UI design Skill for agentic coding tools and frontend developers. Its instructions and reference documents are written in Chinese, with standard English component names and API identifiers retained. The README and preview gallery remain bilingual.

It gives an agent a reusable library of 26 web layout-aware visual directions, all presented as a continuous Style 01-26 catalog. The styles cover layout archetypes, information architecture, composition strategy, responsive structure, visual systems, component tone, feedback, interaction states, and density. The workflow also helps new sites feel complete and existing frontends gain features without losing their established component language.

This is **not** a fixed page-template library. The bundled HTML files are richer clickable previews so users can compare visual directions, copy a task-specific prompt, and ask an agent to apply the chosen style to their real product. Agents should reuse the visual language and redesign the actual page structure around the user's content and workflow.

The Skill focuses on layout planning, visual style selection, existing-project feature integration, local UI patching for existing pages, UI primitive enforcement, UI quality review, implementation compliance, implementation polish, and reusable design guidance.

## Install

### Codex

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex
```

### Claude Code

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a claude-code
```

### OpenCode

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a opencode
```

### Multiple Clients

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex -a claude-code -a opencode
```

### Local Checkout

```bash
npx skills add ./ -g --skill awesome-page-design -a codex
```

### Update An Installed Skill

Update the globally installed skill to the latest version:

```bash
npx skills update awesome-page-design -g -y
```

Update the project-installed skill instead:

```bash
npx skills update awesome-page-design -p -y
```

Update all installed global skills:

```bash
npx skills update -g -y
```

### Remove An Installed Skill

Remove the globally installed skill:

```bash
npx skills remove awesome-page-design -g -y
```

Remove the project-installed skill:

```bash
npx skills remove awesome-page-design -y
```

Remove it from one agent only:

```bash
npx skills remove awesome-page-design -g -a codex -y
```

## Quick Start

After installation, give the agent a concrete task:

```text
Use $awesome-page-design to build this product page. Pick a suitable style and proceed.
Use $awesome-page-design to add an approval queue that matches this existing admin frontend.
Use $awesome-page-design to fix only this mobile toolbar; preserve the surrounding page.
Use $awesome-page-design to review this screen for visual and implementation quality.
```

1. **Scope:** distinguish a new page, existing-project feature, local patch, review, or design guide. Inspect existing code before extending it.
2. **Direction:** keep an already chosen style; choose and proceed when directly delegated; show previews only when page-level direction is undecided. Local fixes retain the current system.
3. **Build:** read only the route and component references needed for the task. The [UI primitive contract](skills/awesome-page-design/references/ui-primitive-contract.md) covers finished controls; simple, deliberately styled native selects remain valid. New projects also follow the [shell checklist](skills/awesome-page-design/references/new-project-shell.md) for favicon.ico, title, and metadata.
4. **Verify:** check the changed flow and affected desktop/mobile layouts, then report what was tested and any remaining gaps.

The [Skill entry](skills/awesome-page-design/SKILL.md) lists the minimum reading path for each task; the [workflow](skills/awesome-page-design/references/workflow.md) owns selection, implementation, and completion steps. You do not need to read every reference or choose a new style for a small edit.

## Preview Styles

Start a local preview server from the repository:

```bash
npm run preview:serve
```

Then open the URL printed by the command:

```text
http://127.0.0.1:<port>/assets/previews/
```

The gallery includes all 26 visual styles with English/Chinese switching and desktop/mobile previews inside each style detail. Inspect and copy full/landing/dashboard/admin/mobile prompts, then open an interactive example. Each example includes a return link; explore its interactions directly on the demo page. The gallery remains a standalone, offline-capable HTML file.

When the skill is installed into a client, package scripts may not be available. From the installed `awesome-page-design` skill directory, start the bundled static server:

```bash
node scripts/serve-preview.js
```

Then open:

```text
http://127.0.0.1:<port>/assets/previews/
```

Fallback direct file entry points are still available from the repository root:

```bash
open skills/awesome-page-design/assets/previews/index.html
open skills/awesome-page-design/assets/styles/style-01-card-grid/style-01-card-grid.html
open skills/awesome-page-design/assets/styles/style-09-tech-minimal/style-09-tech-minimal.html
open skills/awesome-page-design/assets/styles/style-18-precision-futurism/style-18-precision-futurism.html
```

Inside an installed skill, the same files live under `assets/`:

```bash
open assets/previews/index.html
open assets/styles/style-01-card-grid/style-01-card-grid.html
open assets/styles/style-09-tech-minimal/style-09-tech-minimal.html
```

The examples are static single-file HTML pages. Wait a few seconds before taking screenshots so rendering can settle.

Every style includes a desktop screenshot and a mobile screenshot after running the preview generator. Gallery cards show desktop screenshots; each style detail can switch between desktop and mobile previews.
The generator uses Chrome headless with explicit desktop and mobile viewport metrics so screenshots match the intended responsive layouts.

## What Is Included?

```text
skills/awesome-page-design/
├── SKILL.md                         # Skill entry point
├── agents/
│   └── openai.yaml                  # Agent metadata
├── references/
│   ├── workflow.md                  # Required preview selection and implementation workflow
│   ├── usage-principles.md          # How to use the library correctly
│   ├── layout-guidance.md           # Layout archetypes and responsive structure rules
│   ├── existing-project-integration.md # Existing/legacy project component inventory workflow
│   ├── local-ui-patch.md            # Existing-page local patch workflow
│   ├── ui-primitive-contract.md     # Hard rules for browser dialogs, native selects, overlays, and feedback primitives
│   ├── new-project-shell.md          # Framework-specific title, metadata, favicon, and starter-brand checklist
│   ├── patterns/                     # Select, overlay, feedback, and data-table/pagination contracts
│   ├── design-dials.md              # Layout variance, motion intensity, and visual density controls
│   ├── quality-checklist.md         # UI quality review checklist
│   ├── anti-generic-ui.md           # Rules for avoiding default-looking generated pages
│   ├── interface-compliance.md      # Implementation-level UI compliance checks
│   ├── component-implementation.md  # Component state matrix and implementation rules
│   ├── motion-guidance.md           # Semantic motion and reduced-motion rules
│   ├── icon-guidance.md             # Icon system and usage rules
│   ├── design-system-output.md      # Reusable project design guide format
│   ├── variant-guidance.md          # Adjacent mood and sub-style variants
│   ├── style-index.md               # Short catalog of all styles
│   └── styles/                      # Full style notes
└── assets/
    ├── previews/
    │   ├── index.html               # Preview gallery
    │   └── asset-manifest.json      # HTML/PNG hashes and expected screenshot dimensions
    └── styles/                      # Visual style HTML and PNG preview assets
```


## Style Catalog

<!-- style-catalog:start -->
| Style | Name | Layout Pattern | Best For | Visual Language |
|:---:|---|---|---|---|
| 01 | Card Grid | Quiet Teal Admin | admin panels, enterprise consoles, permission systems, operations dashboards | A quiet teal administration interface with a white sidebar and top bar, light-gray workspace, one bordered table panel, compact filters, restrained status labels, and a clear two-column form dialog. |
| 02 | Block Brutalism | Creative Fair Poster | creative fairs, cultural events, independent publishing, ticket reservations | Warm off-white canvas, a vivid yellow poster, black outlines, hard shadows, and orange-red accents for an independent creative fair. |
| 03 | Aurora Gradient | Night Sky Observatory | astronomy guides, immersive learning, exploration tools | Deep-blue sky, restrained cyan-violet aurora, luminous observation points, and a quiet star-atlas workspace. |
| 04 | Retro Y2K | Glossy Photo Booth | photo editors, playful creative tools, personal keepsakes | Candy-pink Y2K photo booth with glossy controls, a tall four-frame strip, pastel gradients, and collectible stickers. |
| 05 | Swiss Editorial | Street Letter Archive | visual archives, cultural collections, image-led editorial indexes | Off-white editorial archive with red-black hierarchy, accession numbers, asymmetric image indexing, and strict fine-rule alignment. |
| 06 | Terminal Hacker | Local Link Inspection Console | developer diagnostics, command consoles, technical reports | Near-black terminal with restrained green monospace text, actionable response rows, severity colors, and a real stoppable local run. |
| 07 | Cute-alism | Cute Daily Desk | playful productivity, education tools, creator utilities | Soft playful surfaces, friendly object shapes, pastel accents, compact controls, and warm task-board clarity. |
| 08 | Resonant Stark | Stark Photo Contact Sheet | photography archives, premium dark portfolios, art, high-end product teasers | Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint. |
| 09 | Tech Minimal | Minimal Print Ledger | print studios, editorial tools, focused utility pages | Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface. |
| 10 | Dark Theme | Dark Cinema Review | micro-cinemas, creative studios, premium launch pages | Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual. |
| 11 | Structured Lines | Parcel Route Ledger | parcel tracking, delivery timelines, route-based service records | Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy. |
| 12 | Layered Material | Layered Reading Corner | reading plans, personal bookshelves, calm learning utilities | Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces. |
| 13 | Bento Layout | Lunch Box Configurator | lunch customization, food ordering, modular product configuration | Widget-like card zones, modular composition, and clearly chunked information. |
| 14 | Neumorphism | Tactile Sound Room | ambient sound players, focus timers, calm audio utilities | Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces. |
| 15 | Liquid Glass | Nightwalk Route Planner | botanical maps, spatial dashboards, premium futuristic tools | Frosted glass, transparent layering, blurred materials, and a futuristic technology mood. |
| 16 | Retro Computing | Disk Weekly Reader | music sites, game-adjacent products, cultural campaigns | Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type. |
| 17 | Neo-Brutalism | Loud Type Poster Studio | developer launches, bold campaigns, playful product sites | Thick lines, strong color clashes, unpolished giant type, and controlled chaos. |
| 18 | Precision Futurism | Frame Sequence Render Console | issue trackers, AI operations tools, technical SaaS | Dark background, glowing borders, futuristic technology polish, and sci-fi UI precision. |
| 19 | Gradient Pop | After Hours Run Club | festival pages, launch walls, creator campaign tools | A large running silhouette and orbit gradient lead into a readable route map, distance choices, pace settings and a local registration slip. |
| 20 | Soft Pop | Slow Beats | community classes, education, writing tools, creative productivity | A friendly illustrated introduction opens onto a lesson rail, a central four-beat practice sheet, a tempo slider and a local completion record. |
| 21 | Acid Design | Distorted Archive | experimental portfolios, music/fashion drops, immersive campaigns | A chrome vector sculpture and offset typographic stage lead into track slices, a reorderable personal sequence and a stable bottom player. |
| 22 | Art Deco | The Sea Radio | luxury hospitality, cultural venues, premium events, editorial brand launches | A symmetrical gold-lined invitation introduces the evening; date and party size flank a stage-and-table floor plan, with a menu and price summary at the side. |
| 23 | Wabi-Sabi | Wabi Wood Repair | ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages | Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence. |
| 24 | Ink Wash | Ink Chronicle Reader | tea culture, museums, literature, cultural ecommerce, heritage product stories | Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint. |
| 25 | Blueprint | Camper Plan Sheet | architecture tools, renovation planning, systems maps, technical plans | Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision. |
| 26 | Industrial Control | Cold Store Shift Console | print rooms, factory monitoring, logistics control, hardware fleets, incident rooms | Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity. |
<!-- style-catalog:end -->

## Manual Validation

Validate the gallery and Skill output manually in real tasks. Check language switching, copied prompts and example return navigation. Inspect desktop, 390px and 320px layouts, keyboard focus, error recovery and neighboring regions affected by a local change.

Share the task, screen size, reproduction steps, expected and actual behavior, and screenshots or console errors with the AI for analysis. AI analysis should distinguish observed evidence from behavior that has not been checked. This repository does not include an automated model-evaluation runner or benchmark projects.

## Development

The preview generator is split by responsibility. `scripts/generate-previews.js` coordinates file writes, screenshots, and transactional publication; rendering modules return strings without writing generated assets.

Edit style metadata and effective profiles only in `catalog/styles.json`. It contains each style's base fields, scenario, layout playbook, geometry, implementation rules, and adaptations. `fallbacks` preserves compatibility for unknown style IDs; `removedStyleSlugs` tracks intentional removals. The loader rejects incomplete fields, unsafe paths, duplicate identifiers, and invalid fallback references. Chinese-only style prose is maintained in `catalog/style-docs.zh.json`, alongside the existing bilingual preview data.

| Module under `scripts/` | Responsibility |
|---|---|
| `preview-catalog.js`, `catalog-validation.js` | Validated access to the canonical JSON catalog |
| `preview-scenarios.js`, `preview-style-profiles.js` | Compatibility adapters for scenario and profile lookup |
| `preview-prompts.js` | Prompt kinds and bilingual prompt generation |
| `preview-page-renderer.js`, `preview-pages/shared.css` | HTML templates and shared page CSS |
| `preview-documents.js`, `preview-gallery.js` | Style manuals, style index, and preview gallery |
| `gallery-model.js`, `gallery-client.js`, `gallery-copy.js`, `preview-pages/gallery.css` | Style metadata, lossless prompt packing, gallery interactions, bilingual labels, and gallery styling |
| `preview-config.js`, `preview-selection.js` | Environment settings and style selectors |
| `preview-screenshots.js`, `preview-transaction.js` | Browser execution, cleanup, staged publication, and rollback |
| `sync-catalog-docs.js` | Generated README tables, concise style manuals, and style index |

`preview-output.test.js` preserves the exported prompt hashes and checks preview structure and manual coverage. Gallery tests verify standalone rendering, safe embedded data and lossless reconstruction of all 260 prompt variants. `catalog-integration.test.js` verifies that one JSON edit reaches every consumer; validation also detects stale generated documentation and broken or unreachable Skill references.

For documentation-only changes, refresh both README tables, all style manuals, and the style index without rewriting HTML, screenshots, or their manifest:

```bash
npm run docs
```

Manuals link to shared workflow and acceptance rules; copy full task-specific prompts from the gallery. For visual changes, use the preview generator below and refresh screenshots before release. HTML-only generation can expose existing generator/asset drift and will not certify old screenshots as current.

Regenerate HTML previews, screenshots, the preview index, and style reference files:

```bash
npm run previews
```

The screenshot generator waits 5 seconds per page so each preview has time to render. It generates both desktop and mobile screenshots by default. To skip mobile screenshots during a quick local iteration, run:

```bash
PREVIEW_MOBILE=0 npm run previews
```

When only one style changed, regenerate just that style and reuse existing screenshots for the rest of the gallery:

```bash
PREVIEW_STYLE=01 npm run previews
npm run previews -- --style 01
```

Multiple styles can be selected with commas:

```bash
PREVIEW_STYLES=01,18 npm run previews
npm run previews -- --styles 01,18
```

The generator first updates HTML, manuals, screenshots, and `asset-manifest.json` in a temporary copy. It publishes changed files only after screenshots and additional audits succeed for every selected style. Generation errors leave the original resources intact, and publication errors roll back applied changes. Destination files are checked before publication to avoid overwriting external edits made during generation. The temporary copy is cleaned up after success or an error.

To update only the gallery, without rewriting style HTML, manuals, screenshots, or the manifest:

```bash
PREVIEW_INDEX_ONLY=1 npm run previews
```

`PREVIEW_SCREENSHOTS=0` still updates HTML, manuals, and the gallery without screenshots; `PREVIEW_MOBILE=0` still skips mobile screenshots. Neither mode updates the screenshot manifest. Regenerate complete desktop/mobile pairs before release.

Validation compares paths, dimensions, and SHA-256 hashes with the current HTML and PNG files, so stale screenshots cannot silently pass. Add non-persisted narrow-width render audits when changing responsive layouts:

```bash
PREVIEW_AUDIT_WIDTHS=320 npm run previews -- --styles 01,15,24
```

Run the Node unit tests for the catalog, manifest integrity, and render-audit formatting:

```bash
npm test
```

Validate generated assets, the manifest, prompt payloads, docs, screenshots, metadata, and UI primitive anti-patterns:

```bash
npm run validate
```

Run the same validation through the shorter alias:

```bash
npm run check
```

Start the preview server:

```bash
npm run preview:serve
```

Package verification:

```bash
npm pack --dry-run
```
