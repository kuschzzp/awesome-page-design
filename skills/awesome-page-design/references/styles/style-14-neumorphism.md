# Style 14 - Neumorphism (新拟态)

## Summary

Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.

Chinese summary: 柔光、内凹层次感圆角、柔和阴影和触感表面。

## Best For

audio tools, calm utilities, wellness and focus products

## Example Scenario

- Product sample: TempoRoom
- Page job: Calm audio control
- Headline: Tune rain, noise, timer, and bell in one soft console.
- Primary action: Start session
- Secondary action: Tune mix

## Scenario Components

- Tactile depth: Soft shadows and inset states make controls feel physical without lowering contrast.
- Focused scope: The style works best when the page has few high-touch controls.
- Accessible calm: Labels, values, and focus states remain strong despite the soft material.

## Example States

- Rain layer: 62%
- Noise floor: Low
- Focus bell: On

## Layout Pattern

- Pattern: Soft Tactile Control (柔软触感控制台)
- Archetype: Soft Tactile Control
- Structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use calm medium-weight labels, clear values, and limited headings.
- Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
- Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
- Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
- States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
- Avoid: Do not let soft shadows reduce accessibility or hide active states.

## Visual Language

- Background: `#e9eef5`
- Surface: `#e9eef5`
- Text: `#172033`
- Muted text: `#667085`
- Primary: `#243b6b`
- Accent: `#6aa6ff`
- Border: `#f8fbff`
- Radius: `30px`
- Panel radius: `30px`
- Control radius: `22px`
- Chip radius: `18px`
- Media radius: `26px`
- Geometry rule: soft tactile curves for raised and inset controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86)`

## Usage Notes

- Keep contrast high enough despite the soft surface.
- Use inset states for pressed controls.
- Limit the style to focused, calm interfaces.

## Copy Style Prompt

```text
Use awesome-page-design Style 14 - Neumorphism as the page design direction.
Best fit: audio tools, calm utilities, wellness and focus products.
Visual mood: Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.
Layout archetype: Soft Tactile Control.
Layout structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #e9eef5; surface #e9eef5; text #172033; muted #667085; primary #243b6b; accent #6aa6ff; border #f8fbff; radius 30px; shadow/material 14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86).
Geometry: panel radius 30px; control radius 22px; chip/state radius 18px; media radius 26px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm medium-weight labels, clear values, and limited headings.
Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
Example content direction: you may use the specificity of "TempoRoom / Calm audio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let soft shadows reduce accessibility or hide active states. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
