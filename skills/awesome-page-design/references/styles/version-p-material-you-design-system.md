# Version P - Material You Design System

> This file documents a visual style prompt, not a fixed page layout. The sample HTML is only a preview carrier for comparing the 25 styles with a shared AI Daily Brief content set.

## 1. Style Definition And Core Mood

Material You is a light web UI direction for Android-like apps, friendly product UI, general-purpose tools. Its visual personality is friendly, rounded, mobile-first. Reuse its visual language while designing the actual product structure around user goals, content priority, and workflow requirements.

## 2. Color System

| Token | Value |
|---|---|
| `--bg` | `#fffbff` |
| `--surface` | `#ffffff` |
| `--surface-2` | `#f3edf7` |
| `--text` | `#1d1b20` |
| `--muted` | `#625b71` |
| `--accent` | `#6750a4` |
| `--accent-2` | `#7d5260` |
| `--line` | `#e7e0ec` |
| `--soft` | `#eaddff` |
| `--success` | `#386a20` |
| `--warning` | `#b3261e` |
| `--radius` | `28px` |
| `--radius-sm` | `16px` |
| `--shadow` | `0 1px 2px rgba(29,27,32,0.08), 0 4px 10px rgba(29,27,32,0.08)` |
| `--font` | `'Roboto', 'Segoe UI', Arial, sans-serif` |

Use the background, surface, text, accent, border, and state tokens as the starting point for product theme variables. Keep semantic roles stable even when adapting the palette.

## 3. Typography System

- Choose the font stack used by the HTML preview as the primary reference.
- Keep headings compact and high-confidence.
- Keep body copy readable at normal dashboard and editorial densities.
- Use label text for metadata, tags, timestamps, and status indicators.

## 4. Borders, Radius, Shadows, And Glow

The style language is: Material 3 purple, dynamic color feeling, rounded surfaces, large actions. Preserve the depth model that defines the style. If the style uses square borders, avoid soft cards. If it uses glow or glass, keep contrast and focus visibility intact.

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
  --bg: #fffbff;
  --surface: #ffffff;
  --surface-2: #f3edf7;
  --text: #1d1b20;
  --muted: #625b71;
  --accent: #6750a4;
  --accent-2: #7d5260;
  --line: #e7e0ec;
  --soft: #eaddff;
  --success: #386a20;
  --warning: #b3261e;
  --radius: 28px;
  --radius-sm: 16px;
  --shadow: 0 1px 2px rgba(29,27,32,0.08), 0 4px 10px rgba(29,27,32,0.08);
  --font: 'Roboto', 'Segoe UI', Arial, sans-serif;
}
```

Then map those variables onto real product components instead of copying the sample sections.

## 10. Suitable And Unsuitable Use Cases

Best suited for Android-like apps, friendly product UI, general-purpose tools. Avoid using this style when the brand, audience, or product density conflicts with its personality: friendly, rounded, mobile-first.

## 11. Comparison With Other Styles

Compared with the rest of the library, Material You is defined by Material 3 purple, dynamic color feeling, rounded surfaces, large actions. It should feel different from generic neutral dashboards while still remaining usable in production.

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
