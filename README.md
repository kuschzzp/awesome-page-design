<div align="center">

# Awesome Page Design

**21 distinctive visual style prompts for agent-built websites and web apps.**

Give Codex, Claude Code, OpenCode, Cursor, Windsurf, and other coding agents stronger visual direction before they start building UI.

[简体中文](./README.zh-CN.md) · [Roadmap](./ROADMAP.md) · [Skill Entry](./skills/awesome-page-design/SKILL.md) · [Preview Gallery](./skills/awesome-page-design/assets/previews/index.html) · [Style Index](./skills/awesome-page-design/references/style-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-21-111827)](./skills/awesome-page-design/assets/styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## What Is Awesome Page Design?

Awesome Page Design is a UI design Skill for agentic coding tools and frontend developers.

It gives an agent a reusable library of 21 web visual directions, all presented as a continuous Style 01-21 catalog. The styles cover color systems, typography, spacing, borders, radius, shadows, material effects, imagery, component tone, interaction states, and visual density. The goal is simple: help new websites and web apps avoid the same generic default UI.

This is **not** a fixed page-template library. The bundled HTML files are richer clickable previews so users can compare visual directions, copy a prompt, and ask an agent to apply the chosen style to their real product. Agents should reuse the visual language and redesign the actual page structure around the user's content and workflow.

The Skill focuses on visual style selection and application.

## Install

The package is distributed as an Agent Skill and can be installed with the `skills` CLI.

> The command is `npx skills`, plural. People may casually say "npx skill", but the actual CLI command is `npx skills ...`.

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

## Quick Start

After installation, ask your agent to use the skill:

```text
Use $awesome-page-design to choose a distinctive visual style for this dashboard.
Apply one of the awesome-page-design styles to this landing page without copying the sample layout.
Use awesome-page-design to make this admin panel feel professional but less generic.
用 awesome-page-design 给这个官网选一个更优雅、更有辨识度的视觉方向。
```

The skill will guide the agent to:

1. Read the usage principles.
2. Summarize your request as a short selection brief.
3. Open or provide the preview gallery when no style has been chosen yet.
4. Ask you to copy one style prompt from the gallery.
5. Recommend a small candidate shortlist only when you explicitly ask the agent to choose.
6. Read the matching style notes.
7. Apply the chosen style through concrete CSS variables, theme tokens, or component classes.
8. Apply similarity guardrails when candidate styles are visually close.
9. Redesign the real product layout instead of copying the sample HTML.

### Required Selection Gate

For full pages and app screens, the Skill should not silently pick a final look after you describe the requirement. It should first send you to the preview gallery so you can compare the 21 visual styles, then continue after you select the prompt you want.

If you prefer the agent to choose, say so explicitly. The agent should then propose 2-3 style candidates, explain the trade-offs briefly, and ask for confirmation before final implementation unless you explicitly tell it to proceed.

## Preview Styles

Start a local preview server from the repository:

```bash
npm run preview:serve
```

Then open the URL printed by the command:

```text
http://127.0.0.1:<port>/assets/previews/
```

The gallery includes all 21 visual styles, English and Chinese UI switching, copyable style prompts, and direct links to every HTML example.

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
open skills/awesome-page-design/assets/styles/style-18-linear-futurism/style-18-linear-futurism.html
```

Inside an installed skill, the same files live under `assets/`:

```bash
open assets/previews/index.html
open assets/styles/style-01-card-grid/style-01-card-grid.html
open assets/styles/style-09-tech-minimal/style-09-tech-minimal.html
```

The examples are static single-file HTML pages. Some previews load remote media; wait a few seconds before taking screenshots.

## What Is Included?

```text
skills/awesome-page-design/
├── SKILL.md                         # Skill entry point
├── agents/
│   └── openai.yaml                  # Agent metadata
├── references/
│   ├── workflow.md                  # Required preview selection and implementation workflow
│   ├── usage-principles.md          # How to use the library correctly
│   ├── style-index.md               # Short catalog of all styles
│   └── styles/                      # Full style notes
└── assets/
    ├── previews/
    │   └── index.html               # Preview gallery
    └── styles/                      # Visual style HTML and PNG preview assets
```

## Style Catalog

| Style | Name | Best For | Visual Language |
|:---:|---|---|---|
| 01 | Card Grid | Dashboards, catalogs, overview pages | Light neutral canvas, violet accent, card grid rhythm, stats and search |
| 02 | Block Brutalism | Bold campaigns, indie products, playful utilities | Warm yellow, hard black borders, blocky controls, saturated labels |
| 03 | Aurora Gradient | Futuristic products, AI tools, premium dark experiences | Dark canvas, aurora color fields, soft glow, drifting gradient energy |
| 04 | Retro Y2K | Music, fashion, youth culture, campaigns | Candy gradients, neon details, retro display type, sparkle energy |
| 05 | Swiss Editorial | Portfolios, cultural sites, serious content | Tight editorial grid, red-black hierarchy, rule lines, disciplined rhythm |
| 06 | Terminal Hacker | Developer tools, CLI products, security, open source | Black canvas, terminal green, monospace, scanlines |
| 07 | Cute-alism | Playful brands, creator tools, youth products | Neon yellow, pink hard shadows, sticker mood, soft-hard contrast |
| 08 | Resonant Stark | Premium dark portfolios, art, high-end teasers | Near-black, thin type, subtle glow, extreme whitespace |
| 09 | Tech Minimal | AI tools, developer products, focused SaaS landing pages | Whitespace, few colors, one visual focus, modern sans-serif UI |
| 10 | Dark Theme | AI media tools, creative generators, premium launch pages | Dark background, high contrast, one bright accent |
| 11 | Structured Lines | AI platforms, workflow products, B2B product sites | Fine line frames, professional structure, clear hierarchy |
| 12 | Material Design | Consumer tools, Android-like apps, product dashboards | Elevation, tonal cards, large radius, orderly surfaces |
| 13 | Bento Layout | Creator profiles, product overviews, feature collections | Widget-like modular cards and clear information chunks |
| 14 | Neumorphism | Audio tools, calm utilities, wellness and focus products | Soft light, inset depth, rounded tactile controls |
| 15 | Liquid Glass | Immersive AI, spatial dashboards, premium futuristic tools | Frosted transparency, blur, layered futuristic surfaces |
| 16 | Retro Computing | Music sites, game-adjacent products, cultural campaigns | Pixel mood, old OS chrome, 80s/early desktop cues |
| 17 | Neo-Brutalism | Developer launches, bold campaigns, playful product sites | Thick lines, strong color clashes, giant type, controlled tension |
| 18 | Linear Futurism | Issue trackers, AI operations tools, technical SaaS | Dark precision, glowing borders, sci-fi product polish |
| 19 | Gradient Pop | AI builders, launch pages, creator tools | Bright gradients, tech/trend energy, eye-catching hero |
| 20 | Soft Pop | Consumer apps, writing tools, education, creative productivity | Friendly playful color, doodle/cartoon mood, elastic rounded forms |
| 21 | Acid Design | Experimental portfolios, music/fashion drops, immersive campaigns | Chrome/metal sheen, laser light, distorted dark sci-fi energy |

## Development

Regenerate HTML previews, screenshots, the preview index, and style reference files:

```bash
npm run previews
```

The screenshot generator waits 5 seconds per page so remote images and fonts have time to load.

Start the preview server:

```bash
npm run preview:serve
```

Package verification:

```bash
npm pack --dry-run
```
