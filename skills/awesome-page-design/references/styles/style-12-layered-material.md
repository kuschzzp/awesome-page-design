# Style 12 - Layered Material (层级材质)

## Summary

Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.

Chinese summary: 层次分明、大色块卡片、大圆角、有秩序且适合触控的表面。

## Best For

consumer tools, utility apps, product dashboards

## Example Scenario

- Product sample: LayerPad
- Page job: Personal utility dashboard
- Headline: Plan today from routines, focus blocks, and errands.
- Primary action: Plan today
- Secondary action: View routine

## Scenario Components

- Tonal hierarchy: Large surfaces, soft elevation, and clear color roles separate tasks without clutter.
- Touch comfort: Controls and cards feel generous enough for quick daily interaction.
- Orderly states: Done, pending, warning, and disabled items share one consistent material language.

## Example States

- Morning reset: Done
- Focus timer: Next
- Grocery note: Later

## Layout Pattern

- Pattern: Layered Daily Surface (层级日程表面)
- Archetype: Layered Daily Surface
- Structure: Touch-first utility layout with large tonal surfaces, a phone-like focus panel, and routine clusters.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use friendly readable UI type, clear task labels, and generous tap-target spacing.
- Components: Routine cards, toggles, progress rings, chips, bottom actions, and empty task states should share material depth.
- Buttons: Buttons are tonal or filled with large radius and obvious touch states.
- Icons and media: Use small functional icons or calm illustrations only where they speed recognition.
- States: Show done, skipped, next, disabled, overdue, and selected day states.
- Avoid: Do not shrink controls into dense desktop SaaS widgets.

## Visual Language

- Background: `#f7f2fa`
- Surface: `#ffffff`
- Text: `#1d1b20`
- Muted text: `#625b71`
- Primary: `#6750a4`
- Accent: `#eaddff`
- Border: `#e7e0ec`
- Radius: `22px`
- Panel radius: `22px`
- Control radius: `16px`
- Chip radius: `12px`
- Media radius: `18px`
- Geometry rule: material-friendly curves reserved for touch surfaces; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 50px rgba(103, 80, 164, .16)`

## Usage Notes

- Use large touch-friendly controls.
- Separate hierarchy with tonal surfaces.
- Keep motion and states calm and systematic.

## Copy Style Prompt

```text
Use awesome-page-design Style 12 - Layered Material as the page design direction.
Best fit: consumer tools, utility apps, product dashboards.
Visual mood: Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.
Layout archetype: Layered Daily Surface.
Layout structure: Touch-first utility layout with large tonal surfaces, a phone-like focus panel, and routine clusters.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f2fa; surface #ffffff; text #1d1b20; muted #625b71; primary #6750a4; accent #eaddff; border #e7e0ec; radius 22px; shadow/material 0 18px 50px rgba(103, 80, 164, .16).
Geometry: panel radius 22px; control radius 16px; chip/state radius 12px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly readable UI type, clear task labels, and generous tap-target spacing.
Components: Routine cards, toggles, progress rings, chips, bottom actions, and empty task states should share material depth.
Buttons: Buttons are tonal or filled with large radius and obvious touch states.
Icons and media: Use small functional icons or calm illustrations only where they speed recognition.
States: Show done, skipped, next, disabled, overdue, and selected day states.
Example content direction: you may use the specificity of "LayerPad / Personal utility dashboard" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not shrink controls into dense desktop SaaS widgets. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
