# Style 13 - Bento Layout (便当盒布局)

## Summary

iOS-widget-like card zones, modular composition, and clearly chunked information.

Chinese summary: 类似 iOS 小组件卡片分区、模块化排布、信息清晰分块。

## Best For

creator profiles, product overviews, feature collections

## Visual Language

- Background: `#f4f4f5`
- Surface: `#ffffff`
- Text: `#18181b`
- Muted text: `#71717a`
- Primary: `#18181b`
- Accent: `#f97316`
- Border: `#e4e4e7`
- Radius: `26px`
- Shadow: `0 18px 55px rgba(24, 24, 27, .10)`

## Usage Notes

- Use varied card sizes with one consistent grid.
- Each block should have a clear job.
- Avoid turning every block into identical cards.

## Implementation Guidance

- Start from tokens for background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.
- Apply the style to the user's actual page structure. Do not copy the bundled sample HTML layout.
- Keep hover, focus, selected, disabled, loading, empty, warning, and success states visually consistent.
- When the page needs images, prefer real product imagery, brand photography, or carefully matched neutral media.
- Check desktop and mobile screenshots after external images and fonts have had time to load.
