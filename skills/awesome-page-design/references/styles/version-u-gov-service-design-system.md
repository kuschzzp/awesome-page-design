# Version U - Gov Service Design System

> This file documents a visual style prompt, not a fixed page layout. The sample HTML is only a preview carrier for comparing the 25 styles with a shared AI Daily Brief content set.

## 1. Style Definition And Core Mood

Gov Service is a light web UI direction for public service, legal, forms, accessibility-first sites. Its visual personality is official, accessible, direct. Reuse its visual language while designing the actual product structure around user goals, content priority, and workflow requirements.

## 2. Color System

| Token | Value |
|---|---|
| `--bg` | `#ffffff` |
| `--surface` | `#ffffff` |
| `--surface-2` | `#f4f8fb` |
| `--text` | `#0b0c0c` |
| `--muted` | `#484949` |
| `--accent` | `#1d70b8` |
| `--accent-2` | `#0f385c` |
| `--line` | `#0b0c0c` |
| `--soft` | `#ffdd00` |
| `--success` | `#0f7a52` |
| `--warning` | `#ca3535` |
| `--radius` | `0` |
| `--radius-sm` | `0` |
| `--shadow` | `none` |
| `--font` | `Arial, Helvetica, sans-serif` |

Use the background, surface, text, accent, border, and state tokens as the starting point for product theme variables. Keep semantic roles stable even when adapting the palette.

## 3. Typography System

- Choose the font stack used by the HTML preview as the primary reference.
- Keep headings compact and high-confidence.
- Keep body copy readable at normal dashboard and editorial densities.
- Use label text for metadata, tags, timestamps, and status indicators.

## 4. Borders, Radius, Shadows, And Glow

The style language is: high contrast, black dividers, blue links, yellow focus states. Preserve the depth model that defines the style. If the style uses square borders, avoid soft cards. If it uses glow or glass, keep contrast and focus visibility intact.

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
| Navigation | Use direct service navigation with plain links and strong focus states. |
| Buttons | Use high-contrast rectangular start and submit actions. |
| Cards | Avoid decorative cards; prefer forms, warnings, and task sections. |
| Tags | Use official status text and warning panels rather than decorative badges. |
| Inputs | Labels, help text, validation, and focus visibility are mandatory. |
| Tables | Use plain, accessible tables with strong borders when data is required. |

## 9. CSS Variables And Code Snippets

Start by translating the extracted tokens into project-level theme variables:

```css
:root {
  --bg: #ffffff;
  --surface: #ffffff;
  --surface-2: #f4f8fb;
  --text: #0b0c0c;
  --muted: #484949;
  --accent: #1d70b8;
  --accent-2: #0f385c;
  --line: #0b0c0c;
  --soft: #ffdd00;
  --success: #0f7a52;
  --warning: #ca3535;
  --radius: 0;
  --radius-sm: 0;
  --shadow: none;
  --font: Arial, Helvetica, sans-serif;
}
```

Then map those variables onto real product components instead of copying the sample sections.

## 10. Suitable And Unsuitable Use Cases

Best suited for public service, legal, forms, accessibility-first sites. Avoid using this style when the brand, audience, or product density conflicts with its personality: official, accessible, direct.

## 11. Comparison With Other Styles

Compared with the rest of the library, Gov Service is defined by high contrast, black dividers, blue links, yellow focus states. It should feel different from generic neutral dashboards while still remaining usable in production.

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
