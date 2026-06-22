<div align="center">

# Awesome Page Design

**21 distinctive visual style prompts for agent-built websites and web apps.**

Give coding agents stronger visual direction before they start building UI.

[Chinese](./README.zh-CN.md) · [Roadmap](./ROADMAP.md) · [Skill Entry](./skills/awesome-page-design/SKILL.md) · [Preview Gallery](./skills/awesome-page-design/assets/previews/index.html) · [Style Index](./skills/awesome-page-design/references/style-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-21-111827)](./skills/awesome-page-design/assets/styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## What Is Awesome Page Design?

Awesome Page Design is a UI design Skill for agentic coding tools and frontend developers.

It gives an agent a reusable library of 21 web layout-aware visual directions, all presented as a continuous Style 01-21 catalog. The styles cover layout archetypes, information architecture, composition strategy, grid behavior, responsive structure, color systems, typography, spacing, borders, radius, shadows, material effects, imagery, component tone, button systems, feedback patterns, interaction states, and visual density. The goal is simple: help new websites and web apps avoid the same generic default UI.

This is **not** a fixed page-template library. The bundled HTML files are richer clickable previews so users can compare visual directions, copy a task-specific prompt, and ask an agent to apply the chosen style to their real product. Agents should reuse the visual language and redesign the actual page structure around the user's content and workflow.

The Skill focuses on layout planning, visual style selection, local UI patching for existing pages, UI quality review, implementation compliance, implementation polish, and reusable design guidance.

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

After installation, ask your agent to use the skill:

```text
Use $awesome-page-design to choose a distinctive visual style for this dashboard.
Apply one of the awesome-page-design styles to this landing page without copying the sample layout.
Use awesome-page-design to make this admin panel feel professional but less generic.
Use awesome-page-design to polish this table toolbar while preserving the existing page style.
Use awesome-page-design to improve this modal without redesigning the whole page.
```

The skill will guide the agent to:

1. Read the usage principles.
2. Route your request by task scale: new page, page redesign, local UI patch, component polish, implementation compliance, or design-system output.
3. Summarize your request as a short selection or patch brief.
4. Identify the page job, primary content object, action model, layout archetype, responsive collapse behavior, and target region when editing an existing page.
5. Open or provide the preview gallery for page-level visual direction when no style has been chosen yet.
6. For existing local patches, preserve the current page style and inspect the target region plus nearby regions before editing.
7. Ask you to copy one task-specific style prompt from the gallery for page-level work: full, landing page, dashboard, admin panel, or mobile.
8. Recommend a small candidate shortlist only when you explicitly ask the agent to choose.
9. Read the matching style notes or the local patch workflow.
10. Set design dials for layout variance, motion intensity, and visual density when a page-level style is selected.
11. Apply the chosen or existing style through concrete layout structure, CSS variables, theme tokens, component detail rules, button rules, feedback rules, spacing rules, responsive rules, state rules, or component classes.
12. Apply anti-generic UI checks and similarity guardrails when candidate styles are visually close.
13. Run implementation compliance checks for semantic controls, accessible labels, focus states, responsive text handling, stable media, reduced motion, and useful empty/error/loading states when real UI code is involved.
14. Redesign the real product layout only when the task calls for page-level work instead of copying the sample HTML.

### Required Selection Gate

For full pages and app screens, the Skill should not silently pick a final look after you describe the requirement. It should first send you to the preview gallery so you can compare the 21 visual styles, then continue after you select the prompt you want.

If you prefer the agent to choose, say so explicitly. The agent should then propose 2-3 style candidates, explain the layout and visual trade-offs briefly, and ask for confirmation before final implementation unless you explicitly tell it to proceed.

For local changes to an existing page, the Skill should not force a new style selection. It should inspect the current page system, preserve nearby tokens and components, patch the target region, and only escalate to page redesign when the local issue comes from the full page structure.

## Preview Styles

Start a local preview server from the repository:

```bash
npm run preview:serve
```

Then open the URL printed by the command:

```text
http://127.0.0.1:<port>/assets/previews/
```

The gallery includes all 21 visual styles, desktop/mobile screenshot switching, English and Chinese UI switching, copyable full/landing/dashboard/admin/mobile prompts, component behavior examples, and direct links to every HTML example.

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
│   ├── local-ui-patch.md            # Existing-page local patch workflow
│   ├── design-dials.md              # Layout variance, motion intensity, and visual density controls
│   ├── quality-checklist.md         # UI quality review checklist
│   ├── anti-generic-ui.md           # Rules for avoiding default-looking generated pages
│   ├── interface-compliance.md      # Implementation-level UI compliance checks
│   ├── component-implementation.md  # Component state matrix and implementation rules
│   ├── motion-guidance.md           # Semantic motion and reduced-motion rules
│   ├── icon-guidance.md             # Icon system and usage rules
│   ├── design-system-output.md      # Reusable project design guide format
│   ├── style-index.md               # Short catalog of all styles
│   └── styles/                      # Full style notes
└── assets/
    ├── previews/
    │   └── index.html               # Preview gallery
    └── styles/                      # Visual style HTML and PNG preview assets
```

## Style Catalog

| Style | Name | Layout Pattern | Best For | Visual Language |
|:---:|---|---|---|---|
| 01 | Card Grid | Operational Card Board | Dashboards, catalogs, overview pages | Light neutral canvas, violet accent, card grid rhythm, stats and search |
| 02 | Block Brutalism | Street Poster Launch | Bold campaigns, indie products, playful utilities | Warm yellow, hard black borders, blocky controls, saturated labels |
| 03 | Aurora Gradient | Aurora Evaluation Lab | Futuristic products, AI tools, premium dark experiences | Dark canvas, aurora color fields, soft glow, drifting gradient energy |
| 04 | Retro Y2K | Glossy Y2K Stage | Music, fashion, youth culture, campaigns | Candy gradients, neon details, retro display type, sparkle energy |
| 05 | Swiss Editorial | Editorial Index Grid | Portfolios, cultural sites, serious content | Tight editorial grid, red-black hierarchy, rule lines, disciplined rhythm |
| 06 | Terminal Hacker | Terminal Console | Developer tools, CLI products, security, open source | Black canvas, terminal green, monospace, scanlines |
| 07 | Cute-alism | Sticker Shop Board | Playful brands, creator tools, youth products | Neon yellow, pink hard shadows, sticker mood, soft-hard contrast |
| 08 | Resonant Stark | Stark Object Focus | Premium dark portfolios, art, high-end teasers | Near-black, thin type, subtle glow, extreme whitespace |
| 09 | Tech Minimal | Focused Brief Editor | AI tools, developer products, focused SaaS landing pages | Whitespace, few colors, one visual focus, modern sans-serif UI |
| 10 | Dark Theme | Dark Render Review | AI media tools, creative generators, premium launch pages | Dark background, high contrast, one bright accent |
| 11 | Structured Lines | Linework Process Map | AI platforms, workflow products, B2B product sites | Fine line frames, professional structure, clear hierarchy |
| 12 | Layered Material | Layered Daily Surface | Consumer tools, utility apps, product dashboards | Elevation, tonal cards, large radius, orderly surfaces |
| 13 | Bento Layout | Uneven Bento Story | Creator profiles, product overviews, feature collections | Widget-like modular cards and clear information chunks |
| 14 | Neumorphism | Soft Tactile Control | Audio tools, calm utilities, wellness and focus products | Soft light, inset depth, rounded tactile controls |
| 15 | Liquid Glass | Glass Signal Map | Immersive AI, spatial dashboards, premium futuristic tools | Frosted transparency, blur, layered futuristic surfaces |
| 16 | Retro Computing | Retro Desktop Workspace | Music sites, game-adjacent products, cultural campaigns | Pixel mood, old OS chrome, 80s/early desktop cues |
| 17 | Neo-Brutalism | Brutal Proof Release | Developer launches, bold campaigns, playful product sites | Thick lines, strong color clashes, giant type, controlled tension |
| 18 | Precision Futurism | Precision Graph Console | Issue trackers, AI operations tools, technical SaaS | Dark precision, glowing borders, sci-fi product polish |
| 19 | Gradient Pop | Gradient Builder Flow | AI builders, launch pages, creator tools | Bright gradients, tech/trend energy, eye-catching hero |
| 20 | Soft Pop | Soft Learning Board | Consumer apps, writing tools, education, creative productivity | Friendly playful color, doodle/cartoon mood, elastic rounded forms |
| 21 | Acid Design | Acid Signal Poster | Experimental portfolios, music/fashion drops, immersive campaigns | Chrome/metal sheen, laser light, distorted dark sci-fi energy |

## Development

Regenerate HTML previews, screenshots, the preview index, and style reference files:

```bash
npm run previews
```

The screenshot generator waits 5 seconds per page so each preview has time to render. It generates both desktop and mobile screenshots by default. To skip mobile screenshots during a quick local iteration, run:

```bash
PREVIEW_MOBILE=0 npm run previews
```

Validate generated assets, prompt payloads, docs, mobile screenshots, and common implementation anti-patterns:

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
