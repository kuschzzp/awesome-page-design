# Style 06 - Terminal Hacker (黑客终端)

## Summary

Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.

Chinese summary: 黑色画布、终端绿、等宽字体、CRT 扫描线、命令行细节和开发者可信感。

## Best For

developer tools, CLI products, security, open source

## Example Scenario

- Product sample: NullTrace
- Page job: Security command line
- Headline: Trace exposed secrets before they ship.
- Primary action: Run scan
- Secondary action: View logs

## Scenario Components

- Command rhythm: Monospace surfaces, prompts, and log rows make the product feel credible to developers.
- Sharp states: Warnings, failures, and successful checks are unmistakable in a dark console.
- Useful texture: Scanlines and glow stay subtle so long logs remain readable.

## Example States

- Token revoked: Pass
- Stale key owner: Find
- Webhook secret: Mask

## Layout Pattern

- Pattern: Terminal Console (终端控制台)
- Archetype: Terminal Console
- Structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use monospace for the main interface and keep long log rows aligned.
- Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
- Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
- Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
- States: Show pass, fail, warning, masked, ignored, running, and copied command states.
- Avoid: Do not use green glow so heavily that logs become hard to read.

## Visual Language

- Background: `#020403`
- Surface: `#07130d`
- Text: `#d1fae5`
- Muted text: `#7ddf9e`
- Primary: `#00ff88`
- Accent: `#33ffcc`
- Border: `#14532d`
- Radius: `2px`
- Panel radius: `2px`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `2px`
- Geometry rule: terminal-like square controls and tiny window corners; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 0 36px rgba(0, 255, 136, .16)`

## Usage Notes

- Use monospace rhythm and command metaphors.
- Keep scanline or terminal texture subtle.
- Make focus and error states unmistakable.

## Copy Style Prompt

```text
Use awesome-page-design Style 06 - Terminal Hacker as the page design direction.
Best fit: developer tools, CLI products, security, open source.
Visual mood: Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.
Layout archetype: Terminal Console.
Layout structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #020403; surface #07130d; text #d1fae5; muted #7ddf9e; primary #00ff88; accent #33ffcc; border #14532d; radius 2px; shadow/material 0 0 36px rgba(0, 255, 136, .16).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace for the main interface and keep long log rows aligned.
Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
States: Show pass, fail, warning, masked, ignored, running, and copied command states.
Example content direction: you may use the specificity of "NullTrace / Security command line" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use green glow so heavily that logs become hard to read. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
