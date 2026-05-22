# Version Q - Fluent Cloud Design System

> This file documents a visual style prompt, not a fixed page layout. The sample HTML is only a preview carrier for comparing the 25 styles with a shared AI Daily Brief content set.

## 1. Style Definition And Core Mood

Fluent Cloud is a light web UI direction for Microsoft-like productivity tools, cloud apps. Its visual personality is productive, familiar, application-like. Reuse its visual language while designing the actual product structure around user goals, content priority, and workflow requirements.

## 2. Color System

| Token | Value |
|---|---|
| `--bg` | `#f5f5f5` |
| `--surface` | `rgba(255,255,255,0.82)` |
| `--surface-2` | `#ffffff` |
| `--text` | `#242424` |
| `--muted` | `#616161` |
| `--accent` | `#0f6cbd` |
| `--accent-2` | `#115ea3` |
| `--line` | `#d1d1d1` |
| `--soft` | `#ebf3fc` |
| `--success` | `#0e700e` |
| `--warning` | `#bc4b09` |
| `--radius` | `12px` |
| `--radius-sm` | `6px` |
| `--shadow` | `0 8px 24px rgba(0,0,0,0.10)` |
| `--font` | `'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif` |

Use the background, surface, text, accent, border, and state tokens as the starting point for product theme variables. Keep semantic roles stable even when adapting the palette.

## 3. Typography System

- Choose the font stack used by the HTML preview as the primary reference.
- Keep headings compact and high-confidence.
- Keep body copy readable at normal dashboard and editorial densities.
- Use label text for metadata, tags, timestamps, and status indicators.

## 4. Borders, Radius, Shadows, And Glow

The style language is: Segoe UI, neutral surfaces, blue action color, light depth and command bars. Preserve the depth model that defines the style. If the style uses square borders, avoid soft cards. If it uses glow or glass, keep contrast and focus visibility intact.

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
| Navigation | Use command bars, split panes, search boxes, and productivity-app grouping. |
| Buttons | Keep controls compact with squared rounded corners and familiar desktop-app spacing. |
| Cards | Use glassy or translucent panes only where they support hierarchy. |
| Tags | Use subtle status text rather than saturated badges. |
| Inputs | Make search and command input first-class surfaces. |
| Tables | Pair lists with reading panes or activity panes. |

## 9. CSS Variables And Code Snippets

Start by translating the extracted tokens into project-level theme variables:

```css
:root {
  --bg: #f5f5f5;
  --surface: rgba(255,255,255,0.82);
  --surface-2: #ffffff;
  --text: #242424;
  --muted: #616161;
  --accent: #0f6cbd;
  --accent-2: #115ea3;
  --line: #d1d1d1;
  --soft: #ebf3fc;
  --success: #0e700e;
  --warning: #bc4b09;
  --radius: 12px;
  --radius-sm: 6px;
  --shadow: 0 8px 24px rgba(0,0,0,0.10);
  --font: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

Then map those variables onto real product components instead of copying the sample sections.

## 10. Suitable And Unsuitable Use Cases

Best suited for Microsoft-like productivity tools, cloud apps. Avoid using this style when the brand, audience, or product density conflicts with its personality: productive, familiar, application-like.

## 11. Comparison With Other Styles

Compared with the rest of the library, Fluent Cloud is defined by Segoe UI, neutral surfaces, blue action color, light depth and command bars. It should feel different from generic neutral dashboards while still remaining usable in production.

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
