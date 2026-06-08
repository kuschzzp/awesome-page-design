# Style 09 - Tech Minimal (科技极简风)

## Summary

Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.

Chinese summary: 大面积空白、少色、单一视觉焦点、现代非衬线字体、界面极简。

## Best For

AI tools, developer products, focused SaaS landing pages

## Example Scenario

- Product sample: NexaBrief
- Page job: Focused product workspace
- Headline: Draft one brief from decisions, risks, and launch notes.
- Primary action: Draft brief
- Secondary action: Review tasks

## Scenario Components

- Single focus: One core object anchors the page so secondary panels stay quiet.
- Measured color: A restrained accent marks important actions without turning the UI into a gradient page.
- Calm density: Whitespace improves decision speed while keeping useful details within reach.

## Example States

- Launch note: Due
- Risk summary: Draft
- Owner review: Ready

## Layout Pattern

- Pattern: Focused Brief Editor (聚焦简报编辑器)
- Archetype: Focused Brief Editor
- Structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
- Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
- Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
- Icons and media: Use product screenshots or document excerpts only when they support the brief.
- States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
- Avoid: Do not add decorative gradients to compensate for weak content hierarchy.

## Visual Language

- Background: `#f8fafc`
- Surface: `#ffffff`
- Text: `#0f172a`
- Muted text: `#64748b`
- Primary: `#111827`
- Accent: `#2563eb`
- Border: `#e2e8f0`
- Radius: `8px`
- Panel radius: `8px`
- Control radius: `4px`
- Chip radius: `2px`
- Media radius: `6px`
- Geometry rule: minimal small-radius surfaces with precise controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 20px 60px rgba(15, 23, 42, .08)`

## Usage Notes

- Use one strong hero object or product surface.
- Keep secondary UI quiet and highly aligned.
- Prefer black, white, slate, and one measured blue accent.

## Copy Style Prompt

```text
Use awesome-page-design Style 09 - Tech Minimal as the page design direction.
Best fit: AI tools, developer products, focused SaaS landing pages.
Visual mood: Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.
Layout archetype: Focused Brief Editor.
Layout structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8fafc; surface #ffffff; text #0f172a; muted #64748b; primary #111827; accent #2563eb; border #e2e8f0; radius 8px; shadow/material 0 20px 60px rgba(15, 23, 42, .08).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
Icons and media: Use product screenshots or document excerpts only when they support the brief.
States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
Example content direction: you may use the specificity of "NexaBrief / Focused product workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not add decorative gradients to compensate for weak content hierarchy. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
