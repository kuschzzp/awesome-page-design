<div align="center">

# Awesome Page Design

**25 visual style prompts and 20 layout frameworks for agent-built websites and web apps.**

Give Codex, Claude Code, OpenCode, Cursor, Windsurf, and other coding agents stronger visual and structural direction before they start building UI.

[简体中文](./README.zh-CN.md) · [Roadmap](./ROADMAP.md) · [Skill Entry](./skills/awesome-page-design/SKILL.md) · [Preview Gallery](./skills/awesome-page-design/assets/previews/index.html) · [Style Index](./skills/awesome-page-design/references/style-index.md) · [Layout Index](./skills/awesome-page-design/references/layout-index.md)

[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-awesome--page--design-4F46E5)](./skills/awesome-page-design/SKILL.md)
[![Styles](https://img.shields.io/badge/styles-25-111827)](./skills/awesome-page-design/assets/styles)
[![Layouts](https://img.shields.io/badge/layouts-20-3157D5)](./skills/awesome-page-design/assets/layouts)
[![License: MIT](https://img.shields.io/badge/license-MIT-10B981)](./LICENSE)

</div>

---

## What Is Awesome Page Design?

Awesome Page Design is a UI design Skill for agentic coding tools and frontend developers.

It gives an agent a reusable library of 25 web visual directions and 20 page layout frameworks. Visual styles cover colors, typography, borders, radius, shadows, textures, motion, component tone, and state rules. Layout frameworks cover information hierarchy, navigation models, page density, responsive behavior, and required states. The goal is simple: help new websites and web apps avoid the same generic default UI.

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
Combine an awesome-page-design visual style with a layout framework for this analytics page.
Use awesome-page-design to make this admin panel feel professional but less generic.
```

The skill will guide the agent to:

1. Read the usage principles.
2. Choose 2-3 candidate visual styles from the catalog.
3. Choose a page layout framework when the task needs structure.
4. Read the matching style and layout notes.
5. Apply the chosen style through concrete CSS variables, theme tokens, or component classes.
6. Apply similarity guardrails when candidate styles or layouts belong to the same product-system family.
7. Redesign the real product layout instead of copying the sample HTML.

## Preview Styles And Layouts

Start a local preview server from the repository:

```bash
npm run preview:serve
```

Then open the URL printed by the command:

```text
http://127.0.0.1:<port>/assets/previews/
```

The gallery includes all 25 visual styles and 20 layout frameworks, English and Chinese UI switching, copyable style/layout prompts, and direct links to every HTML example.

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
open skills/awesome-page-design/assets/layouts/l08-analytics-command-center/l08-analytics-command-center.html
```

Inside an installed skill, the same files live under `assets/`:

```bash
open assets/previews/index.html
open assets/styles/version-j-terminal/version-j-terminal.html
open assets/layouts/l08-analytics-command-center/l08-analytics-command-center.html
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
│   ├── layout-index.md              # Short catalog of page layout frameworks
│   ├── styles/                      # Full design system notes
│   └── layouts/                     # Full layout framework notes
└── assets/
    ├── previews/
    │   └── index.html               # Preview gallery
    ├── styles/                      # Visual style HTML and PNG preview assets
    └── layouts/                     # Layout framework HTML and PNG preview assets
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

## Avoid Similar-Looking Choices

Some styles intentionally belong to mature product-system families, but they should not become the same blue SaaS shell:

- Q - Fluent Cloud: command bars, split panes, search, activity surfaces, and productivity-app UI.
- R - Carbon Enterprise: square, dense, diagnostic enterprise data grids.
- S - Polaris Commerce: merchant resource lists, bulk actions, fulfillment states, and order drawers.
- T - Atlassian Workbench: planning boards, work items, lozenge tags, and team collaboration flows.
- W - Lightning CRM: record pages, paths, related lists, account context, and activity timelines.
- X - Primer Dev: repositories, file trees, code blocks, issues, labels, and developer workflows.
- Y - Ant Pro: query forms, table toolbars, drawers, management consoles, and neutral admin states.

## Layout Frameworks

Layout frameworks describe page structure and workflow. They can be used alone or combined with any visual style.

| ID | Layout Framework | Best For |
|---|---|---|
| L01 | Dense Admin Dashboard | Internal tools, operations, metrics, management systems |
| L02 | SaaS Landing Page | Product marketing, startups, conversion pages |
| L03 | AI Copilot Workspace | AI apps, agent tools, assistant-driven workflows |
| L04 | Developer Docs Portal | API docs, SDK docs, technical guides |
| L05 | Editorial News Homepage | Media, content sites, research digests |
| L06 | Ecommerce Admin Console | Merchant tools, orders, inventory, fulfillment |
| L07 | CRM Sales Workspace | Sales, support, customer operations |
| L08 | Analytics Command Center | BI, monitoring, finance, product analytics |
| L09 | Portfolio Case Study | Studios, personal portfolios, agency work |
| L10 | Settings Console | Security, integrations, permissions, account config |
| L11 | Onboarding Wizard | Setup flows, imports, activation |
| L12 | Marketplace Catalog | App stores, templates, resources, product catalogs |
| L13 | Admin Overview Command Center | SaaS admin homepages, executive operations overview |
| L14 | Master Detail Admin Table | Resource management, users, approvals, database-like admin UI |
| L15 | Operations Timeline Console | Incident operations, deployments, support workflows |
| L16 | Personal Portfolio Home | Designers, engineers, consultants, personal brand sites |
| L17 | Personal Writing Home | Blogs, newsletters, independent researchers, creators |
| L18 | Corporate Homepage | B2B companies, professional services, corporate sites |
| L19 | Corporate Services Site | Agencies, consultancies, solution providers |
| L20 | Enterprise Product Overview | Platform websites, product suites, trust-heavy product pages |

Each layout has its own static HTML preview and PNG screenshot under `skills/awesome-page-design/assets/layouts/`. These previews are intentionally structurally distinct: dashboards, docs, commerce, CRM, analytics, case studies, settings, onboarding, and catalogs should not collapse into the same generic card grid.

The layout previews are high-fidelity structural references, not wireframes. They include realistic hierarchy, density, status areas, supporting context, and product-like content so agents can understand the difference between page frameworks before adapting them to a real project.

Similar layout families also have distinct roles: L01 is for filters, KPI scanning, priority tables, and action queues; L08 is for analytical dimensions, charts, anomalies, and drill-down; L13 is for executive/admin overview and decision prompts; L06 is for ecommerce fulfillment; L14 is for table-first resource management; L15 is for event timelines, SLA, and runbooks.

Example combined prompt:

```text
Use awesome-page-design visual style: Version R - Carbon Enterprise.
Use layout framework: L01 - Dense Admin Dashboard.
Apply both, but design the actual layout around the product requirements.
```

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
- Layout hierarchy, navigation model, density, responsive behavior, and required states

Not reusable as requirements:

- Exact page layout
- Information architecture
- Module order
- Grid strategy
- Sample content structure
- Exact navigation labels and sample menu items

## Generate Preview Images

The repository includes a screenshot script that calls local Chrome in headless mode. It generates one PNG for every visual style and layout framework HTML file, then refreshes `skills/awesome-page-design/assets/previews/index.html`.

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
