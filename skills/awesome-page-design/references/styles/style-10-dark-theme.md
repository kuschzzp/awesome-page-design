# Style 10 - Dark Theme (深色主题)

## Summary

Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.

Chinese summary: 暗背景、高对比度，并用单色亮色强化主按钮和主视觉。

## Best For

AI media tools, creative generators, premium launch pages

## Example Scenario

- Product sample: FrameForge
- Page job: Creative render studio
- Headline: Review every frame before the render bill climbs.
- Primary action: Inspect renders
- Secondary action: Open library

## Scenario Components

- Cinematic contrast: Deep panels and one bright accent keep attention on the active visual.
- Queue clarity: Render states, failures, and review tasks stay readable in a dark workspace.
- Premium restraint: The accent is reserved for action and focus, not sprinkled across every object.

## Example States

- Scene 18 mask: Fail
- Poster render: Ready
- Motion pass: Queued

## Layout Pattern

- Pattern: Dark Render Review (暗色渲染审阅)
- Archetype: Dark Render Review
- Structure: Cinematic production console with a large frame viewer, film strip, render queue, and cost alerts.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use high-contrast UI text with restrained labels and sharp numeric cost/status values.
- Components: Frame viewer, timeline strip, render queue, failure badges, and review controls should feel premium.
- Buttons: Primary action is bright and cinematic; destructive or failed states use clear contrast.
- Icons and media: Use frame crops, masks, thumbnails, and production notes as visual content.
- States: Show queued, rendering, failed, approved, budget warning, and retry states.
- Avoid: Do not use generic dark cards without media review structure.

## Visual Language

- Background: `#050505`
- Surface: `#111113`
- Text: `#f8fafc`
- Muted text: `#a1a1aa`
- Primary: `#ffffff`
- Accent: `#7dd3fc`
- Border: `#27272a`
- Radius: `8px`
- Panel radius: `8px`
- Control radius: `4px`
- Chip radius: `2px`
- Media radius: `6px`
- Geometry rule: cinematic dark surfaces with compact angular controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 24px 90px rgba(125, 211, 252, .14)`

## Usage Notes

- Reserve the bright accent for conversion and focus.
- Use deep blacks with subtle panel separation.
- Keep imagery cinematic but readable.

## Copy Style Prompt

```text
Use awesome-page-design Style 10 - Dark Theme as the page design direction.
Best fit: AI media tools, creative generators, premium launch pages.
Visual mood: Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.
Layout archetype: Dark Render Review.
Layout structure: Cinematic production console with a large frame viewer, film strip, render queue, and cost alerts.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050505; surface #111113; text #f8fafc; muted #a1a1aa; primary #ffffff; accent #7dd3fc; border #27272a; radius 8px; shadow/material 0 24px 90px rgba(125, 211, 252, .14).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use high-contrast UI text with restrained labels and sharp numeric cost/status values.
Components: Frame viewer, timeline strip, render queue, failure badges, and review controls should feel premium.
Buttons: Primary action is bright and cinematic; destructive or failed states use clear contrast.
Icons and media: Use frame crops, masks, thumbnails, and production notes as visual content.
States: Show queued, rendering, failed, approved, budget warning, and retry states.
Example content direction: you may use the specificity of "FrameForge / Creative render studio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use generic dark cards without media review structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
