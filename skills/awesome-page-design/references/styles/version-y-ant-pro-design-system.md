# Version Y - Ant Pro Design System

> This file documents a visual style prompt, not a fixed page layout. The sample HTML is only a preview carrier for comparing the 25 styles with a shared AI Daily Brief content set.

## 1. Style Definition And Core Mood

Ant Pro is a light web UI direction for enterprise admin, data tables, management consoles. Its visual personality is stable, enterprise, table-ready. Reuse its visual language while designing the actual product structure around user goals, content priority, and workflow requirements.

## 2. Color System

| Token | Value |
|---|---|
| `--bg` | `#f5f5f5` |
| `--surface` | `#ffffff` |
| `--surface-2` | `#fafafa` |
| `--text` | `rgba(0,0,0,0.88)` |
| `--muted` | `rgba(0,0,0,0.45)` |
| `--accent` | `#1677ff` |
| `--accent-2` | `#0958d9` |
| `--line` | `#f0f0f0` |
| `--soft` | `#e6f4ff` |
| `--success` | `#52c41a` |
| `--warning` | `#ff4d4f` |
| `--radius` | `8px` |
| `--radius-sm` | `6px` |
| `--shadow` | `0 6px 16px rgba(0,0,0,0.08)` |
| `--font` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |

Use the background, surface, text, accent, border, and state tokens as the starting point for product theme variables. Keep semantic roles stable even when adapting the palette.

## 3. Typography System

- Choose the font stack used by the HTML preview as the primary reference.
- Keep headings compact and high-confidence.
- Keep body copy readable at normal dashboard and editorial densities.
- Use label text for metadata, tags, timestamps, and status indicators.

## 4. Borders, Radius, Shadows, And Glow

The style language is: Ant Design Pro shell, breadcrumb header, query form, KPI cards, alert, ProTable, drawer details, steps, timeline, and quick actions. Preserve the depth model that defines the style. If the style uses square borders, avoid soft cards. If it uses glow or glass, keep contrast and focus visibility intact.

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
| Navigation | Use admin shells, query forms, table toolbars, drawers, and management sections. |
| Buttons | Use blue primary actions, neutral secondary actions, and clear disabled states. |
| Cards | Keep cards neutral; the table and form controls should carry the workflow. |
| Tags | Use stable status tags with restrained color. |
| Inputs | Use search, select, date, and owner filters in query forms. |
| Tables | Make data tables, row actions, pagination, and drawers central. |

## 9. CSS Variables And Code Snippets

Start by translating the extracted tokens into project-level theme variables:

```css
:root {
  --bg: #f5f5f5;
  --surface: #ffffff;
  --surface-2: #fafafa;
  --text: rgba(0,0,0,0.88);
  --muted: rgba(0,0,0,0.45);
  --accent: #1677ff;
  --accent-2: #0958d9;
  --line: #f0f0f0;
  --soft: #e6f4ff;
  --success: #52c41a;
  --warning: #ff4d4f;
  --radius: 8px;
  --radius-sm: 6px;
  --shadow: 0 6px 16px rgba(0,0,0,0.08);
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
```

Then map those variables onto real product components instead of copying the sample sections.

## 10. Suitable And Unsuitable Use Cases

Best suited for enterprise admin, data tables, management consoles. Avoid using this style when the brand, audience, or product density conflicts with its personality: stable, enterprise, table-ready.

## 11. Comparison With Other Styles

Compared with the rest of the library, Ant Pro is defined by an Ant Design Pro shell, breadcrumb header, query form, KPI cards, alert, ProTable, drawer details, steps, timeline, and quick actions. It should feel different from generic neutral dashboards while still remaining usable in production.

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
