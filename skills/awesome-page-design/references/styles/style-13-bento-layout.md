# Style 13 - Bento Layout (便当盒布局)

## Summary

Widget-like card zones, modular composition, and clearly chunked information.

Chinese summary: 小组件式卡片分区、模块化排布、信息清晰分块。

## Best For

creator profiles, product overviews, feature collections

## Example Scenario

- Product sample: Patchwork
- Page job: Modular profile hub
- Headline: Compose the profile from proof, media, timeline, and quote.
- Primary action: Arrange blocks
- Secondary action: Open profile

## Scenario Components

- Uneven modules: Cards vary by purpose and size instead of forming a dull equal grid.
- Chunked meaning: Each block does one job: proof, media, stat, quote, action, or timeline.
- Composed rhythm: The layout feels assembled, but gutters and radius keep it coherent.

## Example States

- Hero module: Large
- Quote card: Small
- Timeline: Wide

## Layout Pattern

- Pattern: Uneven Bento Story (不等格便当叙事)
- Archetype: Uneven Bento Story
- Structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
- Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
- Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
- Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
- States: Show pinned, updated, saved, expanded, compact, and reordered module states.
- Avoid: Do not make all bento cards equal-sized placeholders.

## Visual Language

- Background: `#f4f4f5`
- Surface: `#ffffff`
- Text: `#18181b`
- Muted text: `#71717a`
- Primary: `#18181b`
- Accent: `#f97316`
- Border: `#e4e4e7`
- Radius: `18px`
- Panel radius: `18px`
- Control radius: `10px`
- Chip radius: `8px`
- Media radius: `16px`
- Geometry rule: modular bento curves without making every item identical; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 55px rgba(24, 24, 27, .10)`

## Usage Notes

- Use varied card sizes with one consistent grid.
- Each block should have a clear job.
- Avoid turning every block into identical cards.

## Copy Style Prompt

```text
Use awesome-page-design Style 13 - Bento Layout as the page design direction.
Best fit: creator profiles, product overviews, feature collections.
Visual mood: Widget-like card zones, modular composition, and clearly chunked information.
Layout archetype: Uneven Bento Story.
Layout structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4f4f5; surface #ffffff; text #18181b; muted #71717a; primary #18181b; accent #f97316; border #e4e4e7; radius 18px; shadow/material 0 18px 55px rgba(24, 24, 27, .10).
Geometry: panel radius 18px; control radius 10px; chip/state radius 8px; media radius 16px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
States: Show pinned, updated, saved, expanded, compact, and reordered module states.
Example content direction: you may use the specificity of "Patchwork / Modular profile hub" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make all bento cards equal-sized placeholders. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, focus, hover, selected, and success states.
```

## Design Dials

- Layout variance: choose low, medium, or high based on product risk and brand confidence.
- Motion intensity: choose none, subtle, or expressive based on workflow sensitivity.
- Visual density: choose sparse, normal, or dense based on how much the first viewport must support.

## Implementation Guidance

- Start from tokens for background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.
- Apply the style to the user's actual page structure. Do not copy the bundled sample HTML layout.
- Keep hover, focus, selected, disabled, loading, empty, warning, and success states visually consistent.
- When the page needs images, prefer real product imagery, brand photography, or carefully matched neutral media.
- Keep icon family, stroke, size, and alignment consistent when icons are used.
- Check desktop and mobile screenshots before finishing.

## Do Not

- Do not reuse the sample product name, sample copy, or sample layout as production content.
- Do not reduce the style to a palette swap.
- Do not use decorative effects to hide weak hierarchy, vague copy, missing states, or poor responsive structure.
