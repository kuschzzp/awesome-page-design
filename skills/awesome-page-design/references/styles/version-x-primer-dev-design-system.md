# Version X - Primer Dev Design System

> This file documents a visual style prompt, not a fixed page layout. The sample HTML is only a preview carrier for comparing the 25 styles with a shared AI Daily Brief content set.

## 1. Style Definition And Core Mood

Primer Dev is a light web UI direction for developer platforms, docs, repo browsers, issue trackers. Its visual personality is developer-native, structured, repository-like. Reuse its visual language while designing the actual product structure around user goals, content priority, and workflow requirements.

## 2. Color System

| Token | Value |
|---|---|
| `--bg` | `#f6f8fa` |
| `--surface` | `#ffffff` |
| `--surface-2` | `#f6f8fa` |
| `--text` | `#24292f` |
| `--muted` | `#57606a` |
| `--accent` | `#0969da` |
| `--accent-2` | `#8250df` |
| `--line` | `#d0d7de` |
| `--soft` | `#ddf4ff` |
| `--success` | `#1a7f37` |
| `--warning` | `#cf222e` |
| `--radius` | `8px` |
| `--radius-sm` | `6px` |
| `--shadow` | `0 8px 24px rgba(140,149,159,0.20)` |
| `--font` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif` |

Use the background, surface, text, accent, border, and state tokens as the starting point for product theme variables. Keep semantic roles stable even when adapting the palette.

## 3. Typography System

- Choose the font stack used by the HTML preview as the primary reference.
- Keep headings compact and high-confidence.
- Keep body copy readable at normal dashboard and editorial densities.
- Use label text for metadata, tags, timestamps, and status indicators.

## 4. Borders, Radius, Shadows, And Glow

The style language is: GitHub-like borders, blue links, monospace labels, code-oriented sections. Preserve the depth model that defines the style. If the style uses square borders, avoid soft cards. If it uses glow or glass, keep contrast and focus visibility intact.

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
| Navigation | Use repo tabs, file trees, issue navigation, and code-oriented sections. |
| Buttons | Use restrained actions with developer-platform clarity. |
| Cards | Use code panels, file lists, issue cards, and contribution surfaces. |
| Tags | Use issue labels, language dots, and monospace metadata. |
| Inputs | Search should support repos, files, issues, and commands. |
| Tables | Use file lists, diffs, issue tables, and audit logs. |

## 9. CSS Variables And Code Snippets

Start by translating the extracted tokens into project-level theme variables:

```css
:root {
  --bg: #f6f8fa;
  --surface: #ffffff;
  --surface-2: #f6f8fa;
  --text: #24292f;
  --muted: #57606a;
  --accent: #0969da;
  --accent-2: #8250df;
  --line: #d0d7de;
  --soft: #ddf4ff;
  --success: #1a7f37;
  --warning: #cf222e;
  --radius: 8px;
  --radius-sm: 6px;
  --shadow: 0 8px 24px rgba(140,149,159,0.20);
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
}
```

Then map those variables onto real product components instead of copying the sample sections.

## 10. Suitable And Unsuitable Use Cases

Best suited for developer platforms, docs, repo browsers, issue trackers. Avoid using this style when the brand, audience, or product density conflicts with its personality: developer-native, structured, repository-like.

## 11. Comparison With Other Styles

Compared with the rest of the library, Primer Dev is defined by GitHub-like borders, blue links, monospace labels, code-oriented sections. It should feel different from generic neutral dashboards while still remaining usable in production.

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
