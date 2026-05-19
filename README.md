<div align="center">

# Awesome Page Design

**25 visual style prompts for agent-built websites and web apps.**

Give Codex, Claude Code, OpenCode, Cursor, Windsurf, and other coding agents a stronger visual direction before they start building UI.

[简体中文](./README.zh-CN.md) · [Roadmap](./ROADMAP.md) · [Skill Entry](./skills/awesome-page-design/SKILL.md) · [Preview Gallery](./skills/awesome-page-design/assets/previews/index.html) · [Style Index](./skills/awesome-page-design/references/style-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-25-111827)](./skills/awesome-page-design/assets/styles)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## What Is Awesome Page Design?

Awesome Page Design is a visual style Skill for agentic coding tools and frontend developers.

It gives an agent a reusable library of 25 web visual directions: colors, typography, borders, radius, shadows, textures, motion, component tone, and state rules. The goal is simple: help new websites and web apps avoid the same generic default UI.

This is **not** a fixed page-template library. The bundled HTML files use a shared **AI Daily Brief** demo content set under the **AI Pulse** brand only so every style can be compared against the same information structure. In real projects, agents should reuse the visual language and redesign the actual layout around the product.

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

## Quick Start

After installation, ask your agent to use the skill:

```text
Use $awesome-page-design to choose a distinctive visual style for this dashboard.
Apply one of the awesome-page-design styles to this landing page without copying the sample layout.
Use awesome-page-design to make this admin panel feel professional but less generic.
```

The skill will guide the agent to:

1. Read the usage principles.
2. Choose 2-3 candidate styles from the catalog.
3. Read the matching design system note.
4. Apply the chosen style through concrete CSS variables, theme tokens, or component classes.
5. Redesign the real product layout instead of copying the sample HTML.

## Preview The Styles

Start a local preview server from the repository:

```bash
npm run preview:serve
```

Then open the URL printed by the command:

```text
http://127.0.0.1:<port>/assets/previews/
```

The gallery includes all 25 styles, English and Chinese UI switching, copyable style prompts, and direct links to every HTML example.

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
open skills/awesome-page-design/assets/styles/version-j-terminal/version-j-terminal.html
```

Inside an installed skill, the same files live under `assets/`:

```bash
open assets/previews/index.html
open assets/styles/version-j-terminal/version-j-terminal.html
```

The examples are static single-file HTML pages. Some styles load fonts from Google Fonts and fall back to system fonts when offline.

## What Is Included?

```text
skills/awesome-page-design/
├── SKILL.md                         # Skill entry point
├── agents/
│   └── openai.yaml                  # Agent metadata
├── references/
│   ├── usage-principles.md          # How to use the library correctly
│   ├── style-index.md               # Short catalog of all styles
│   └── styles/                      # Full design system notes
└── assets/
    ├── previews/
    │   └── index.html               # Preview gallery
    └── styles/                      # HTML and PNG preview assets
```

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

## Pick A Style By Product Type

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

## Usage Rules For Agents

The skill has one non-negotiable rule:

> Reuse the style language. Do not copy the sample layout.

Reusable:

- Color tokens and semantic color roles
- Font family, font weights, type scale, and text density
- Border, radius, shadow, glow, and surface treatment
- Button, tag, card, input, table, navigation, and empty-state personality
- Hover, focus, selected, disabled, loading, and alert states
- Motion timing and texture rules

Not reusable as requirements:

- Exact page layout
- Information architecture
- Module order
- Grid strategy
- Sample content structure
- Navigation model

## Generate Preview Images

The repository includes a screenshot script that calls local Chrome in headless mode. It generates one PNG for every HTML file under `skills/awesome-page-design/assets/styles/` and refreshes `skills/awesome-page-design/assets/previews/index.html`.

```bash
npm run previews
```

Custom viewport:

```bash
PREVIEW_WIDTH=1600 PREVIEW_HEIGHT=1400 npm run previews
```

Custom Chrome path:

```bash
CHROME_PATH="/path/to/Google Chrome" npm run previews
```

## Development

```bash
# Generate system-inspired style files
npm run styles:systems

# Generate PNG previews
npm run previews

# Serve the preview gallery as a local URL
npm run preview:serve
```

## References

- [Vercel Labs skills CLI](https://github.com/vercel-labs/skills)
- [Anthropic Skills repository](https://github.com/anthropics/skills)

## License

[MIT](./LICENSE)
