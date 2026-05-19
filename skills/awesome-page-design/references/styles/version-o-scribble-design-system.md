# Version O - Human Scribble Design System

> This file documents a visual style prompt, not a fixed page layout. The sample HTML is only a preview carrier for comparing the 25 styles with a shared AI Daily Brief content set.

## 1. Style Definition And Core Mood

Human Scribble is a light web UI direction for workshops, education, human-centered notes, maker pages. Its visual personality is human, informal, workshop-like. Reuse its visual language while designing the actual product structure around user goals, content priority, and workflow requirements.

## 2. Color System

| Token | Value |
|---|---|
| `--bg` | `#FFF8F0` |
| `--paper` | `#FFFDF7` |
| `--cream` | `#F5ECD7` |
| `--pencil` | `#2B2B2B` |
| `--pencil-light` | `#666` |
| `--ink` | `#1A3A5C` |
| `--ink-light` | `#4A7A9C` |
| `--highlight-yellow` | `rgba(255,220,0,0.25)` |
| `--highlight-green` | `rgba(0,220,100,0.15)` |
| `--highlight-pink` | `rgba(255,100,150,0.15)` |
| `--scribble-red` | `#E74C3C` |
| `--scribble-blue` | `#3498DB` |
| `--scribble-green` | `#27AE60` |
| `--scribble-orange` | `#F39C12` |
| `--scribble-purple` | `#8E44AD` |
| `--doodle-line` | `2px solid var(--pencil)` |
| `--transition` | `0.3s ease` |

Use the background, surface, text, accent, border, and state tokens as the starting point for product theme variables. Keep semantic roles stable even when adapting the palette.

## 3. Typography System

- Choose the font stack used by the HTML preview as the primary reference.
- Keep headings compact and high-confidence.
- Keep body copy readable at normal dashboard and editorial densities.
- Use label text for metadata, tags, timestamps, and status indicators.

## 4. Borders, Radius, Shadows, And Glow

The style language is: warm paper, hand-drawn fonts, dashed borders, marker highlights. Preserve the depth model that defines the style. If the style uses square borders, avoid soft cards. If it uses glow or glass, keep contrast and focus visibility intact.

## 5. Decorative Elements And Interaction Details

Decorative details should reinforce the style rather than become layout requirements. Hover, selected, focus, disabled, and loading states should use the same accent and surface treatment as the base components.

## 6. Visual Rhythm And Spacing Hints

Use the preview as a density reference only. Do not copy its information architecture, module order, grid strategy, or navigation model. Rebuild spacing around the actual user task.

## 7. Responsive Strategy

- Preserve the style's visual hierarchy across desktop and mobile.
- Collapse dense grids into single-column or two-column structures when needed.
- Keep touch targets accessible.
- Avoid text overlap and preserve readable line lengths.

## 8. Component Quick Reference

| Component | Guidance |
|---|---|
| Navigation | Match the preview's surface, border, and active-state treatment. |
| Buttons | Use the accent color and radius rules from the style. |
| Cards | Preserve the style's depth model: shadow, border, glass, glow, or flat grid. |
| Tags | Use compact metadata styling with clear category contrast. |
| Inputs | Keep focus states visible and aligned with the accent system. |
| Tables | For dense products, prefer clear borders, row states, and restrained typography. |
| Empty states | Reuse the style's icon tone, surface treatment, and text density. |

## 9. CSS Variables And Code Snippets

Start by translating the extracted tokens into project-level theme variables:

```css
:root {
  --bg: #FFF8F0;
  --paper: #FFFDF7;
  --cream: #F5ECD7;
  --pencil: #2B2B2B;
  --pencil-light: #666;
  --ink: #1A3A5C;
  --ink-light: #4A7A9C;
  --highlight-yellow: rgba(255,220,0,0.25);
  --highlight-green: rgba(0,220,100,0.15);
  --highlight-pink: rgba(255,100,150,0.15);
  --scribble-red: #E74C3C;
  --scribble-blue: #3498DB;
  --scribble-green: #27AE60;
  --scribble-orange: #F39C12;
  --scribble-purple: #8E44AD;
  --doodle-line: 2px solid var(--pencil);
  --transition: 0.3s ease;
}
```

Then map those variables onto real product components instead of copying the sample sections.

## 10. Suitable And Unsuitable Use Cases

Best suited for workshops, education, human-centered notes, maker pages. Avoid using this style when the brand, audience, or product density conflicts with its personality: human, informal, workshop-like.

## 11. Comparison With Other Styles

Compared with the rest of the library, Human Scribble is defined by warm paper, hand-drawn fonts, dashed borders, marker highlights. It should feel different from generic neutral dashboards while still remaining usable in production.

## 12. Variant Suggestions

- A restrained variant with fewer decorative effects.
- A high-density variant for operational dashboards.
- A landing-page variant with stronger hero imagery.
- A dark or light companion theme when the product requires both modes.

## 13. Motion And Micro-Interactions

Use short, functional motion. Hover transitions should confirm interactivity. Loading and alert states should remain readable. Avoid decorative motion that competes with the primary content.

## 14. Implementation Guidelines

1. Reuse the visual language, not the sample layout.
2. Start with tokens for background, surface, text, muted text, accent, border, radius, shadow, and focus.
3. Apply tokens to real product components.
4. Preserve accessibility, contrast, and visible focus.
5. Keep the AI Daily Brief sample content out of production code unless the user explicitly asks for demo content.
