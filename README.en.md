# Awesome Page Design

> 25 reusable visual style prompts for websites and web apps. Built for Codex, Claude Code, OpenCode, and other agentic coding clients that need a distinctive page direction instead of another generic default UI.

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-25-111827)](./styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

## What This Is

`awesome-page-design` is a **visual style Skill** for agents and frontend developers. It contains 25 website visual languages. Each one includes:

- A single-file HTML preview that can be opened directly in a browser
- A design system note
- Transferable colors, typography, radius, borders, shadows, motion, and component tone
- A `SKILL.md` entry that can be read by Codex, Claude Code, OpenCode, and other clients that support Agent Skills

This is not a page template library, and it is not a real AI news product. **AI Pulse** is only shared demo content used to compare all 25 styles under the same information structure.

## When To Use It

- You are building a website, dashboard, SaaS product, admin panel, landing page, portfolio, or component library
- You want a clear visual direction instead of default Tailwind / Ant / Bootstrap aesthetics
- You want an agent to choose a style first, then redesign the real product layout around actual requirements
- You need to migrate a visual style into React, Next.js, Vue, or plain HTML

## Core Principle

**Reuse the visual language. Do not copy the sample layout.**

The sample HTML files exist to preview each style. Real product layout, information architecture, module order, grid strategy, and responsive behavior should be designed around your product, content priority, and user workflow.

Reusable:

- Color system
- Typography and density
- Radius, borders, shadows, and glow
- Surface texture and decoration rules
- Component personality for buttons, cards, inputs, navigation, and tables
- Hover, focus, selected, disabled, loading, and alert states

Not reusable as-is:

- Sample page layout
- AI Pulse content structure
- Module order
- Navigation model
- Fixed grid strategy

## Quick Start

This repository uses an open Agent Skills directory structure:

```text
skills/
└── awesome-page-design/
    ├── SKILL.md
    ├── agents/
    ├── references/
    └── assets/
```

After installation, use prompts like:

```text
Use $awesome-page-design to choose a distinctive visual style for this dashboard.
Apply one of the awesome-page-design styles to this landing page without copying the sample layout.
Use awesome-page-design to make this admin panel feel professional but less generic.
```

## Install With npx skills

> Note: the CLI command is `skills`, not `skill`. People may casually say "npx skill", but the actual command is `npx skills ...`.

### List available skills in this repository

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design --list
```

### Install for Codex

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex
```

### Install for Claude Code

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a claude-code
```

### Install for OpenCode

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a opencode
```

### Install for multiple clients

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex -a claude-code -a opencode
```

### Install into the current project instead of globally

Remove `-g`:

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design --skill awesome-page-design -a codex
```

### Install from a local checkout

Useful while developing or testing this repository:

```bash
npx skills add ./ -g --skill awesome-page-design -a codex
```

### Common management commands

```bash
# List installed skills
npx skills list -g

# Update a skill
npx skills update awesome-page-design -g

# Remove a skill
npx skills remove awesome-page-design -g
```

## Client Compatibility

`awesome-page-design` follows the generic `SKILL.md` + `references/` + `assets/` structure. It does not depend on Codex-only behavior, so it can be installed through `npx skills` into multiple clients that support Agent Skills.

Supported or suitable targets:

| Client | `--agent` value | Notes |
|---|---|---|
| Codex | `codex` | Recommended; this repository includes Codex plugin metadata |
| Claude Code | `claude-code` | Installable as a local Skill through `npx skills` |
| OpenCode | `opencode` | Installable through `npx skills` |
| Cursor | `cursor` | Can be installed as a generic Agent Skill |
| Windsurf | `windsurf` | Can be installed as a generic Agent Skill |
| Other agents | Client-dependent | Any client that can read `SKILL.md` and resource folders can adapt it |

Claude web / Claude.ai, API usage, and other non-local CLI environments depend on the platform's own Skill import mechanism. This repository currently provides a source-style Skill structure and does not package a separate `.skill` artifact.

References:

- [Vercel Labs skills CLI](https://github.com/vercel-labs/skills)
- [Anthropic Skills repository](https://github.com/anthropics/skills)

## Style Catalog

| Version | Style | Best For | Visual Language |
|:---:|---|---|---|
| A | Classic News | News, content sites, authority pages | Light blue-gray canvas, indigo accent, Inter, fine borders, soft shadows |
| B | Card Grid | Dashboards, catalogs, overview pages | Card grid rhythm, search, stats, lightweight data tone |
| C | Feed Layout | Feeds, communities, updates, article streams | Single-column feed, cyan accent, expandable cards, soft dividers |
| D | Bento Grid | Product showcases, Apple-like overview pages | Apple gray, blue accent, large radius, bento surfaces |
| E | Glassmorphism | Immersive dark landing pages, AI products | Deep purple gradient, translucent glass, cyan highlights, blur |
| F | Neo-Brutalism | Bold campaigns, indie products, playful utilities | Warm yellow, thick black borders, hard shadows, saturated labels |
| G | Aurora Gradient | Futuristic products, AI tools, premium dark experiences | Dark canvas, aurora gradients, soft glow, drifting motion |
| H | Retro Y2K | Music, fashion, youth culture, campaigns | Candy gradients, neon details, retro display type, sparkle energy |
| I | Swiss Editorial | Portfolios, cultural sites, serious content | Pure white, red accent, Helvetica, strict grid, no shadow |
| J | Terminal Hacker | Developer tools, CLI products, security, open source | Black canvas, terminal green, monospace, scanlines |
| K | Claymorphism | Education, wellness, friendly SaaS | Lavender background, Nunito type, soft inner and outer shadows |
| L | Cute-alism | Playful brands, creator tools, youth products | Neon yellow, pink hard shadow, sticker mood, soft-hard contrast |
| M | Resonant Stark | Premium dark portfolios, art, high-end teasers | Near-black, thin type, subtle glow, extreme whitespace |
| N | Light Skeuomorphism | Apple-like tools, device apps, tactile UI | Apple gray, embossed surfaces, inset controls |
| O | Human Scribble | Workshops, education, maker pages, notes | Warm paper, hand-drawn fonts, dashed borders, marker highlights |
| P | Material You | Android-like apps, general tools, lifestyle products | Material 3 purple, dynamic color feel, rounded surfaces |
| Q | Fluent Cloud | Productivity tools, cloud consoles, desktop apps | Segoe UI, neutral surfaces, blue action color, light depth |
| R | Carbon Enterprise | Enterprise software, data platforms, industrial systems | IBM-like grays, blue action color, square boundaries, high density |
| S | Polaris Commerce | Merchant tools, ecommerce admin, operations | Warm neutrals, green actions, resource-list clarity |
| T | Atlassian Workbench | Collaboration tools, project management, team dashboards | Collaborative blue, lozenge tags, workbench surfaces |
| U | Gov Service | Public service, legal, forms, accessibility-first sites | High contrast, black dividers, blue links, yellow focus states |
| V | Spectrum Creative | Creative software, asset managers, media tools | Adobe-like neutral UI, indigo accent, media grids |
| W | Lightning CRM | CRM, sales tools, support, customer operations | Light app shell, Salesforce-like blue, compact business cards |
| X | Primer Dev | Developer platforms, docs, repos, issue trackers | GitHub-like borders, blue links, monospace labels |
| Y | Ant Pro | Enterprise admin, management consoles, data tables | Ant Design blue, thin borders, white cards, stable states |

## Choose By Product Type

| Product Need | Recommended Styles |
|---|---|
| Tech SaaS dashboard | D, P, Q, Y |
| Enterprise admin / data platform | R, W, Y, Q |
| News or editorial media | A, I |
| Developer tools / API platforms | J, X |
| Ecommerce operations / merchant admin | S, Y |
| Government / public service / serious forms | U |
| Dark AI / data product | E, G, M |
| Creative studio / portfolio | F, O, V |
| Youth or trend brand | H, L |
| Friendly rounded product | K, N, P |

## How To Apply A Style

1. Pick 1-3 candidate styles from the catalog or matching table.
2. Open the matching HTML or PNG preview and evaluate the overall mood.
3. Read the matching design system note and extract visual tokens.
4. Create CSS variables or theme tokens in the real project.
5. Map those tokens onto real components such as buttons, cards, inputs, navigation, and tables.
6. Redesign the actual page structure around the product. Do not copy the AI Pulse sample layout.
7. Check accessibility, especially contrast, focus states, and motion intensity.

## Local Preview

Open any HTML file directly:

```bash
open styles/version-j-terminal/version-j-terminal.html
```

Open the preview gallery:

```bash
open previews/index.html
```

All pages are single-file static HTML with inline CSS. Some fonts are loaded through Google Fonts CDN and will fall back to system fonts when offline.

## Generate PNG Previews

The repository includes a screenshot script that calls local Chrome in headless mode. It generates one PNG for every HTML file under `styles/` and refreshes `previews/index.html`.

```bash
npm run previews
```

Default viewport:

```text
1440x1200
```

Custom viewport:

```bash
PREVIEW_WIDTH=1600 PREVIEW_HEIGHT=1400 npm run previews
```

Custom Chrome path:

```bash
CHROME_PATH="/path/to/Google Chrome" npm run previews
```

## Repository Structure

```text
awesome-page-design/
├── .codex-plugin/
│   └── plugin.json
├── skills/
│   └── awesome-page-design/
│       ├── SKILL.md
│       ├── agents/
│       │   └── openai.yaml
│       ├── references/
│       │   ├── style-index.md
│       │   ├── usage-principles.md
│       │   └── styles/
│       └── assets/
│           ├── previews/
│           └── styles/
├── styles/
│   ├── version-a-classic/
│   ├── version-b-grid/
│   └── ...
├── previews/
│   └── index.html
├── scripts/
│   ├── generate-previews.js
│   └── generate-system-inspired-styles.js
├── package.json
└── README.md
```

## What's In Each Design System Note

Each style note usually covers 14 sections:

| # | Topic |
|---:|---|
| 1 | Style definition and core mood |
| 2 | Color system |
| 3 | Typography system |
| 4 | Borders, radius, shadows, and glow |
| 5 | Decorative elements and interaction details |
| 6 | Visual rhythm and spacing hints |
| 7 | Responsive strategy |
| 8 | Component quick reference |
| 9 | CSS variables and code snippets |
| 10 | Suitable and unsuitable use cases |
| 11 | Comparison with other styles |
| 12 | Variant suggestions |
| 13 | Motion and micro-interactions |
| 14 | Implementation guidelines and caveats |

## Maintenance Notes

- Keep one folder per style.
- Each style folder should keep its HTML, design system Markdown, and PNG preview aligned.
- If `styles/` changes, sync the same resources into `skills/awesome-page-design/assets/styles/`.
- If the style list changes, update `skills/awesome-page-design/references/style-index.md`.
- Do not describe sample layouts as fixed templates.
- Keep `SKILL.md` concise. Put detailed material in `references/` and `assets/`.

## Development Commands

```bash
# Generate system-inspired styles
npm run styles:systems

# Generate all PNG previews
npm run previews
```

## License

[MIT](./LICENSE)
