# Style 01 - Card Grid (卡片网格)

## Summary

Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.

Chinese summary: 浅色中性画布、紫色强调、卡片网格节奏、统计数据、搜索和易扫描的总览界面。

## Best For

dashboards, catalogs, overview pages

## Visual Language

- Background: `#f5f6fa`
- Surface: `#ffffff`
- Text: `#1a1a2e`
- Muted text: `#64648a`
- Primary: `#7c3aed`
- Accent: `#8b5cf6`
- Border: `#e5e7ef`
- Radius: `18px`
- Shadow: `0 18px 48px rgba(26, 26, 46, .10)`

## Usage Notes

- Keep cards scannable and varied by job.
- Use search and stats as first-class visual anchors.
- Avoid collapsing the style into a generic admin shell.

## Implementation Guidance

- Start from tokens for background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.
- Apply the style to the user's actual page structure. Do not copy the bundled sample HTML layout.
- Keep hover, focus, selected, disabled, loading, empty, warning, and success states visually consistent.
- When the page needs images, prefer real product imagery, brand photography, or carefully matched neutral media.
- Check desktop and mobile screenshots after external images and fonts have had time to load.
