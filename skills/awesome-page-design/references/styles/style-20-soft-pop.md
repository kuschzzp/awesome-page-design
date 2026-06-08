# Style 20 - Soft Pop (柔和流行)

## Summary

Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.

Chinese summary: 亲和力和玩乐色彩、手绘涂鸦/卡通插画、圆润夸张字体和带弹性的造型。

## Best For

consumer apps, writing tools, education, creative productivity

## Example Scenario

- Product sample: MellowNotes
- Page job: Friendly learning workspace
- Headline: Practice one lesson, save one note, return tomorrow.
- Primary action: Start lesson
- Secondary action: Open notes

## Scenario Components

- Friendly softness: Rounded forms and warm color make the product approachable without becoming childish.
- Encouraging states: Progress, empty, success, and retry messages feel human and specific.
- Gentle structure: Doodles and shapes support the workflow instead of replacing it.

## Example States

- Warm-up prompt: Ready
- Saved note: New
- Retry card: Kind

## Layout Pattern

- Pattern: Soft Learning Board (柔和学习面板)
- Archetype: Soft Learning Board
- Structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use rounded, readable type with encouraging labels and human microcopy.
- Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
- Buttons: Buttons are rounded and warm with obvious focus and disabled states.
- Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
- States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
- Avoid: Do not make friendly design childish or vague.

## Visual Language

- Background: `#fff8f1`
- Surface: `#ffffff`
- Text: `#2b1d16`
- Muted text: `#8f5f4a`
- Primary: `#ff6b6b`
- Accent: `#ffd166`
- Border: `#f5d7c6`
- Radius: `28px`
- Panel radius: `28px`
- Control radius: `18px`
- Chip radius: `14px`
- Media radius: `24px`
- Geometry rule: soft friendly curves limited to the learning mood; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 55px rgba(255, 107, 107, .18)`

## Usage Notes

- Round the typography and interaction shapes.
- Pair friendly copy with lively but readable components.
- Use illustration sparingly as a human signal.

## Copy Style Prompt

```text
Use awesome-page-design Style 20 - Soft Pop as the page design direction.
Best fit: consumer apps, writing tools, education, creative productivity.
Visual mood: Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.
Layout archetype: Soft Learning Board.
Layout structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff8f1; surface #ffffff; text #2b1d16; muted #8f5f4a; primary #ff6b6b; accent #ffd166; border #f5d7c6; radius 28px; shadow/material 0 18px 55px rgba(255, 107, 107, .18).
Geometry: panel radius 28px; control radius 18px; chip/state radius 14px; media radius 24px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rounded, readable type with encouraging labels and human microcopy.
Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
Buttons: Buttons are rounded and warm with obvious focus and disabled states.
Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
Example content direction: you may use the specificity of "MellowNotes / Friendly learning workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make friendly design childish or vague. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
