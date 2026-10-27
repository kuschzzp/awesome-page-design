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

Awesome Page Design is a UI design Skill for agentic coding tools and frontend developers.

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

The gallery includes all 26 visual styles with keyword search, product-scenario and appearance filters, desktop/mobile previews, and English/Chinese switching. Compare two or three styles, inspect and copy full/landing/dashboard/admin/mobile prompts, then open an interactive example. Each example includes a return link and a collapsed component reference section. The gallery remains a standalone, offline-capable HTML file.

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

Every style includes a desktop screenshot and a mobile screenshot after running the preview generator. The gallery can switch all cards between the two screenshot modes.
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
| 01 | Card Grid | Blue Admin Console | admin panels, enterprise consoles, permission systems, operations dashboards | Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels. |
| 02 | Block Brutalism | Street Poster Launch | bold campaigns, indie products, playful utilities | Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy. |
| 03 | Aurora Gradient | Aurora Listening Room | immersive art venues, futuristic products, premium dark experiences | Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere. |
| 04 | Retro Y2K | Glossy Y2K Stage | music, fashion, youth culture, playful campaigns | Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism. |
| 05 | Swiss Editorial | Swiss Archive Board | portfolios, cultural sites, design studios, serious content | Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm. |
| 06 | Terminal Hacker | Terminal Console | developer tools, CLI products, security, open source | Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility. |
| 07 | Cute-alism | Cute Daily Desk | playful productivity, education tools, creator utilities | Soft playful surfaces, friendly object shapes, pastel accents, compact controls, and warm task-board clarity. |
| 08 | Resonant Stark | Stark Photo Contact Sheet | photography archives, premium dark portfolios, art, high-end product teasers | Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint. |
| 09 | Tech Minimal | Minimal Print Ledger | print studios, editorial tools, focused utility pages | Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface. |
| 10 | Dark Theme | Dark Cinema Review | micro-cinemas, creative studios, premium launch pages | Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual. |
| 11 | Structured Lines | Line Museum Plan | museum maps, workflow products, structured B2B sites | Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy. |
| 12 | Layered Material | Layered Interior Samples | interior sample boards, consumer tools, product dashboards | Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces. |
| 13 | Bento Layout | Bento Market Table | restaurant menus, creator profiles, modular product overviews | Widget-like card zones, modular composition, and clearly chunked information. |
| 14 | Neumorphism | Neumo Lamp Console | home devices, audio tools, calm utilities, wellness and focus products | Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces. |
| 15 | Liquid Glass | Glasshouse Climate Map | botanical maps, spatial dashboards, premium futuristic tools | Frosted glass, transparent layering, blurred materials, and a futuristic technology mood. |
| 16 | Retro Computing | Retro Desktop Workspace | music sites, game-adjacent products, cultural campaigns | Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type. |
| 17 | Neo-Brutalism | Brutal Proof Release | developer launches, bold campaigns, playful product sites | Thick lines, strong color clashes, unpolished giant type, and controlled chaos. |
| 18 | Precision Futurism | Precision Incident Map | issue trackers, AI operations tools, technical SaaS | Dark background, glowing borders, futuristic technology polish, and sci-fi UI precision. |
| 19 | Gradient Pop | Gradient Festival Wall | festival pages, launch walls, creator campaign tools | Bright gradients, tech or trend energy, and an immediately eye-catching first viewport. |
| 20 | Soft Pop | Soft Garden Class | community classes, education, writing tools, creative productivity | Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes. |
| 21 | Acid Design | Acid Signal Poster | experimental portfolios, music/fashion drops, immersive campaigns | Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension. |
| 22 | Art Deco | Deco Theatre Foyer | luxury hospitality, cultural venues, premium events, editorial brand launches | Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama. |
| 23 | Wabi-Sabi | Wabi Repair Studio | ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages | Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence. |
| 24 | Ink Wash | Ink Tea Scroll | tea culture, museums, literature, cultural ecommerce, heritage product stories | Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint. |
| 25 | Blueprint | Blueprint Renovation Sheet | architecture tools, renovation planning, systems maps, technical plans | Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision. |
| 26 | Industrial Control | Industrial Print Room | print rooms, factory monitoring, logistics control, hardware fleets, incident rooms | Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity. |
<!-- style-catalog:end -->

## Manual Validation

Validate the gallery and Skill output manually in real tasks. Check search/filter reset, empty results, two-to-three-style comparison, language switching, copied prompts and example return navigation. Inspect desktop, 390px and 320px layouts, keyboard focus, error recovery and neighboring regions affected by a local change.

Share the task, screen size, reproduction steps, expected and actual behavior, and screenshots or console errors with the AI for analysis. AI analysis should distinguish observed evidence from behavior that has not been checked. This repository does not include an automated model-evaluation runner or benchmark projects.

## Development

The preview generator is split by responsibility. `scripts/generate-previews.js` coordinates file writes, screenshots, and transactional publication; rendering modules return strings without writing generated assets.

Edit style metadata and effective profiles only in `catalog/styles.json`. It contains each style's base fields, scenario, layout playbook, geometry, implementation rules, and adaptations. `fallbacks` preserves compatibility for unknown style IDs; `removedStyleSlugs` tracks intentional removals. The loader rejects incomplete fields, unsafe paths, duplicate identifiers, and invalid fallback references.

| Module under `scripts/` | Responsibility |
|---|---|
| `preview-catalog.js`, `catalog-validation.js` | Validated access to the canonical JSON catalog |
| `preview-scenarios.js`, `preview-style-profiles.js` | Compatibility adapters for scenario and profile lookup |
| `preview-prompts.js` | Prompt kinds and bilingual prompt generation |
| `preview-page-renderer.js`, `preview-pages/shared.css` | HTML templates and shared page CSS |
| `preview-documents.js`, `preview-gallery.js` | Style manuals, style index, and preview gallery |
| `gallery-model.js`, `gallery-client.js`, `gallery-copy.js`, `preview-pages/gallery.css` | Selection metadata, lossless prompt packing, gallery interactions, bilingual labels, and gallery styling |
| `preview-config.js`, `preview-selection.js` | Environment settings and style selectors |
| `preview-screenshots.js`, `preview-transaction.js` | Browser execution, cleanup, staged publication, and rollback |
| `sync-catalog-docs.js` | Generated README tables, concise style manuals, and style index |

`preview-output.test.js` preserves the exported prompt hashes and checks preview structure and manual coverage. Gallery tests verify standalone rendering, safe embedded data, filtering, and lossless reconstruction of all 260 prompt variants. `catalog-integration.test.js` verifies that one JSON edit reaches every consumer; validation also detects stale generated documentation and broken or unreachable Skill references.

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
