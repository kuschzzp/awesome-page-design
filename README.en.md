# Awesome Page Design — 25 Visual Style Prompts for Websites

> A reusable visual style prompt library for website and web app development. It captures color, typography, borders, radius, shadows, motion, texture, and component tone so future projects can start from a distinctive visual direction instead of another generic default UI.

---

## Overview

This repository is not a real AI news product or a complete business system. **AI Pulse** is shared demo content used to compare all styles under the same information structure.

The real goal is to provide a reusable **website visual style prompt library**. When starting a new website or web app, pick a visual direction from this library, then transfer its color, typography, border, radius, shadow, motion, surface, state, and component tone into the actual product.

**Important principle:** this project does not provide fixed page layout templates. The HTML files exist only as preview and screenshot carriers. Real product layout, information architecture, module order, grid strategy, and responsive behavior should be designed around the user's needs, workflow, and content priority.

Each style includes:

- **A complete HTML preview** — a single-file page that can be opened directly in a browser.
- **A design system note** — visual rules covering color, type, borders, shadows, component tone, variants, and usage guidance.
- **A PNG preview** — a static screenshot for quick review without opening the HTML.

---

## Goals

- **Capture reusable visual language:** every version is a transferable style direction, not just a page.
- **Accelerate project starts:** choose a visual tone early, then design the real layout around the product.
- **Avoid repetitive websites:** vary color, typography, borders, radius, depth, decoration, and interaction details.
- **Connect design and implementation:** HTML previews show the look; Markdown notes describe how to reuse it.
- **Support framework migration:** selected styles can be moved into React, Next.js, Vue, or other frontend stacks.

---

## Codex Skill Installation

This repository is packaged as the `awesome-page-design` Skill. After it is pushed to GitHub, install it with the general `skills` CLI:

```bash
npx skills add https://github.com/kuschzzp/awesome-page-design -g --skill awesome-page-design -a codex
```

Skill structure:

```text
skills/
└── awesome-page-design/
    ├── SKILL.md
    ├── agents/
    ├── references/
    └── assets/
```

`skills/awesome-page-design/SKILL.md` is the skill entry point. Full HTML, Markdown, and PNG preview assets live under `skills/awesome-page-design/assets/`. `.codex-plugin/plugin.json` declares Codex plugin metadata and the skills directory.

---

## Style Catalog

| Version | Style | Description | Mode | Path |
|:---:|---|---|:---:|---|
| A | Classic News | Classic editorial news portal with Inter and indigo accents | Light | `styles/version-a-classic/` |
| B | Card Grid | Dashboard-like card grid with search and stats | Light | `styles/version-b-grid/` |
| C | Feed Layout | Social feed style with single-column cards and light interactions | Light | `styles/version-c-feed/` |
| D | Bento Grid | Apple-like bento surfaces with large radius and restrained depth | Light | `styles/version-d-bento/` |
| E | Glassmorphism | Dark purple glassmorphism with translucent panels and cyan glow | Dark | `styles/version-e-glass/` |
| F | Neo-Brutalism | Warm yellow neo-brutalism with thick borders and hard shadows | Light | `styles/version-f-brutalism/` |
| G | Aurora Gradient | Dark aurora gradients with glow and futuristic energy | Dark | `styles/version-g-aurora/` |
| H | Retro Y2K | Retro Y2K with candy gradients, sparkles, and display type | Light | `styles/version-h-y2k/` |
| I | Swiss Editorial | Swiss editorial style with white space, red accent, and strict grid | Light | `styles/version-i-swiss/` |
| J | Terminal Hacker | Hacker terminal style with black canvas, green glow, and monospace type | Dark | `styles/version-j-terminal/` |
| K | Claymorphism | Claymorphism with lavender surfaces and soft inner/outer shadows | Light | `styles/version-k-clay/` |
| L | Cute-alism | Cute-brutal mix with neon yellow, pink hard shadows, and sticker energy | Light | `styles/version-l-cutealism/` |
| M | Resonant Stark | Premium dark minimalism with thin type, subtle glow, and whitespace | Dark | `styles/version-m-stark/` |
| N | Light Skeuomorphism | Light skeuomorphism with Apple gray, embossed surfaces, and inset controls | Light | `styles/version-n-skeuomorph/` |
| O | Human Scribble | Human scribble style with paper texture, dashed borders, and marker highlights | Light | `styles/version-o-scribble/` |
| P | Material You | Material 3-inspired dynamic color, rounded surfaces, and large actions | Light | `styles/version-p-material-you/` |
| Q | Fluent Cloud | Fluent 2-inspired neutral UI with Segoe type and light app depth | Light | `styles/version-q-fluent-cloud/` |
| R | Carbon Enterprise | IBM Carbon-inspired gray hierarchy, blue actions, and dense enterprise UI | Light | `styles/version-r-carbon-enterprise/` |
| S | Polaris Commerce | Shopify Polaris-inspired commerce admin with warm neutrals and green actions | Light | `styles/version-s-polaris-commerce/` |
| T | Atlassian Workbench | Atlassian-inspired collaboration workbench with blue actions and lozenges | Light | `styles/version-t-atlassian-workbench/` |
| U | Gov Service | GOV.UK-inspired service UI with high contrast, blue links, and yellow focus | Light | `styles/version-u-gov-service/` |
| V | Spectrum Creative | Adobe Spectrum-inspired creative panels, indigo accents, and media grids | Light | `styles/version-v-spectrum-creative/` |
| W | Lightning CRM | Salesforce Lightning-inspired CRM shell with compact business cards | Light | `styles/version-w-lightning-crm/` |
| X | Primer Dev | GitHub Primer-inspired developer UI with repo cards and code-oriented tone | Light | `styles/version-x-primer-dev/` |
| Y | Ant Pro | Ant Design Pro-inspired admin UI with blue primary color and fine table borders | Light | `styles/version-y-ant-pro/` |

---

## How To Use

1. **Choose by product tone:** for example, a SaaS dashboard can reference D/P/Y, a creative studio can reference F/O/V, and a dark AI product can reference E/G/M.
2. **Open the HTML or PNG preview:** evaluate color, typography, texture, density, and component shape.
3. **Read the matching design system note:** extract color variables, type scale, radius, border, shadow, state, and motion rules.
4. **Redesign the real product layout:** do not copy the AI Pulse sample structure or page composition.
5. **Keep style consistency:** reuse the selected visual variables and component tone across future screens.

---

## Preview

Open any HTML file directly:

```bash
open styles/version-j-terminal/version-j-terminal.html
```

Or open the preview gallery:

```bash
open previews/index.html
```

All pages are single-file static HTML with inline CSS. Some fonts are loaded through Google Fonts CDN.

---

## Generate PNG Previews

The repository includes a dependency-free screenshot script. It calls local Chrome in headless mode to generate one PNG for every HTML file under `styles/` and refreshes `previews/index.html`.

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

---

## Quick Matching

| Product Need | Recommended Styles |
|---|---|
| Tech SaaS dashboard | D, P, Q, Y |
| Enterprise admin system | R, W, Y, Q |
| News or editorial media | A, I |
| Developer tools | J, X |
| Commerce operations | S, Y |
| Public service or government | U |
| Dark AI or data product | E, G, M |
| Creative studio or portfolio | F, O, V |
| Youth or trend brand | H, L |
| Friendly rounded product | K, N, P |

---

## Design System Notes

Each design note usually covers:

| # | Topic |
|---:|---|
| 1 | Style definition and core mood |
| 2 | Color system |
| 3 | Typography system |
| 4 | Borders, radius, shadows, and glow |
| 5 | Decorative elements and interaction details |
| 6 | Visual rhythm and spacing hints, not fixed layout |
| 7 | Responsive strategy |
| 8 | Component quick reference |
| 9 | CSS variables and code snippets |
| 10 | Suitable and unsuitable use cases |
| 11 | Comparison with other styles |
| 12 | Variant suggestions |
| 13 | Motion and micro-interactions |
| 14 | Implementation guidelines and caveats |

---

## Maintenance Notes

- Keep one folder per style.
- Each style folder should contain one HTML file, one design system Markdown file, and one PNG preview.
- Do not describe sample layouts as fixed templates.
- If `styles/` is updated, sync the same resources into `skills/awesome-page-design/assets/styles/`.
- Keep `skills/awesome-page-design/references/style-index.md` aligned with the README style list.

---

## License

MIT
