# Style 08 - Resonant Stark (共鸣极简)

## Summary

Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.

Chinese summary: 近黑画布、细字重、微光、大留白、精细线条和高级克制感。

## Best For

premium dark portfolios, art, high-end product teasers

## Example Scenario

- Product sample: Quiet Index
- Page job: Private portfolio
- Headline: Let a single piece hold the room.
- Primary action: View selected work
- Secondary action: Read notes

## Scenario Components

- Restraint first: Large space, thin rules, and delicate glow make the content feel considered.
- Object focus: A single visual anchor replaces busy feature grids.
- Premium silence: Microcopy and motion stay quiet so the page feels intentional.

## Example States

- Study 04 caption: Draft
- Private link: Ready
- Inquiry note: New

## Layout Pattern

- Pattern: Stark Object Focus (克制对象聚焦)
- Archetype: Stark Object Focus
- Structure: Sparse portfolio composition with one dominant object, quiet metadata, and thin navigation.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use thin, restrained type with generous line spacing and few words.
- Components: Object viewer, private notes, small index links, and contact actions should stay calm.
- Buttons: Actions are quiet text buttons or thin outlined controls, never loud filled blocks.
- Icons and media: Use one strong crop, material study, or object silhouette with enough empty space.
- States: Show selected work, private link ready, inquiry received, and caption draft states.
- Avoid: Do not fill the silence with equal cards or decorative noise.

## Visual Language

- Background: `#0a0a0b`
- Surface: `#141416`
- Text: `#fafafa`
- Muted text: `#8a8a8e`
- Primary: `#c8b8ff`
- Accent: `#ffb8c8`
- Border: `rgba(255,255,255,.08)`
- Radius: `6px`
- Panel radius: `6px`
- Control radius: `2px`
- Chip radius: `0`
- Media radius: `4px`
- Geometry rule: stark near-square panels and thin editorial controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 28px 100px rgba(200, 184, 255, .12)`

## Component Detail System

- Button system: Use restrained text buttons or hard-edged outline controls; keep hover/focus precise and quiet.
- Feedback and alerts: Use sparse status notes, subtle border changes, and no decorative alert noise.
- Spacing system: Use large negative space, 28-40px object gutters, and sparse metadata rows.
- Responsive behavior: Desktop may hold an object stage beside notes; mobile places the object first, then proof rows and one clear action.

Chinese implementation notes:

- 按钮细节：使用克制文字按钮或硬边描边控件；hover/focus 精确而安静。
- 提示与反馈：使用稀疏状态说明、细微边框变化，避免装饰性提示噪声。
- 间距系统：使用大面积留白、28-40px 对象间距和稀疏元信息行。
- 响应式策略：桌面可让对象舞台和说明并列；手机先对象，再证明行，最后一个明确操作。

## Page Adaptation Guide

- Landing page: Use one object, one message, sparse proof rows, and a restrained action with premium whitespace.
- Dashboard: Use only for high-end monitoring or portfolio dashboards where a single object/state matters most.
- Admin panel: Use sparse review panels, minimal metadata, and precise outline controls; avoid dense bulk workflows.
- Forms, tables, and data: Use few fields, large whitespace, clear labels, and quiet validation with strong contrast.
- Mobile: Place object first, then proof rows and one action; avoid long multi-column content.
- Not a good fit for: Weak for operational tools that need many visible controls at once.

## Usage Notes

- Use quiet space as the main visual move.
- Keep glow delicate and premium.
- Let content breathe instead of filling every gap.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 08 - Resonant Stark as the page design direction.
Prompt type: Full Prompt.
Best fit: premium dark portfolios, art, high-end product teasers.
Visual mood: Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.
Scenario focus:
Landing adaptation: Use one object, one message, sparse proof rows, and a restrained action with premium whitespace.
Dashboard adaptation: Use only for high-end monitoring or portfolio dashboards where a single object/state matters most.
Admin adaptation: Use sparse review panels, minimal metadata, and precise outline controls; avoid dense bulk workflows.
Forms/data adaptation: Use few fields, large whitespace, clear labels, and quiet validation with strong contrast.
Mobile adaptation: Place object first, then proof rows and one action; avoid long multi-column content.
Avoid for: Weak for operational tools that need many visible controls at once.
Layout archetype: Stark Object Focus.
Layout structure: Sparse portfolio composition with one dominant object, quiet metadata, and thin navigation.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0a0a0b; surface #141416; text #fafafa; muted #8a8a8e; primary #c8b8ff; accent #ffb8c8; border rgba(255,255,255,.08); radius 6px; shadow/material 0 28px 100px rgba(200, 184, 255, .12).
Geometry: panel radius 6px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use thin, restrained type with generous line spacing and few words.
Components: Object viewer, private notes, small index links, and contact actions should stay calm.
Buttons: Actions are quiet text buttons or thin outlined controls, never loud filled blocks.
Button details: Use restrained text buttons or hard-edged outline controls; keep hover/focus precise and quiet.
Feedback and alerts: Use sparse status notes, subtle border changes, and no decorative alert noise.
Spacing system: Use large negative space, 28-40px object gutters, and sparse metadata rows.
Responsive behavior: Desktop may hold an object stage beside notes; mobile places the object first, then proof rows and one clear action.
Icons and media: Use one strong crop, material study, or object silhouette with enough empty space.
States: Show selected work, private link ready, inquiry received, and caption draft states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Quiet Index / Private portfolio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not fill the silence with equal cards or decorative noise. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 08 - Resonant Stark as the page design direction.
Prompt type: Landing Page.
Best fit: premium dark portfolios, art, high-end product teasers.
Visual mood: Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.
Scenario focus:
Landing page focus: Use one object, one message, sparse proof rows, and a restrained action with premium whitespace.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Stark Object Focus.
Layout structure: Sparse portfolio composition with one dominant object, quiet metadata, and thin navigation.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0a0a0b; surface #141416; text #fafafa; muted #8a8a8e; primary #c8b8ff; accent #ffb8c8; border rgba(255,255,255,.08); radius 6px; shadow/material 0 28px 100px rgba(200, 184, 255, .12).
Geometry: panel radius 6px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use thin, restrained type with generous line spacing and few words.
Components: Object viewer, private notes, small index links, and contact actions should stay calm.
Buttons: Actions are quiet text buttons or thin outlined controls, never loud filled blocks.
Button details: Use restrained text buttons or hard-edged outline controls; keep hover/focus precise and quiet.
Feedback and alerts: Use sparse status notes, subtle border changes, and no decorative alert noise.
Spacing system: Use large negative space, 28-40px object gutters, and sparse metadata rows.
Responsive behavior: Desktop may hold an object stage beside notes; mobile places the object first, then proof rows and one clear action.
Icons and media: Use one strong crop, material study, or object silhouette with enough empty space.
States: Show selected work, private link ready, inquiry received, and caption draft states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Quiet Index / Private portfolio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not fill the silence with equal cards or decorative noise. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 08 - Resonant Stark as the page design direction.
Prompt type: Dashboard.
Best fit: premium dark portfolios, art, high-end product teasers.
Visual mood: Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.
Scenario focus:
Dashboard focus: Use only for high-end monitoring or portfolio dashboards where a single object/state matters most.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Stark Object Focus.
Layout structure: Sparse portfolio composition with one dominant object, quiet metadata, and thin navigation.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0a0a0b; surface #141416; text #fafafa; muted #8a8a8e; primary #c8b8ff; accent #ffb8c8; border rgba(255,255,255,.08); radius 6px; shadow/material 0 28px 100px rgba(200, 184, 255, .12).
Geometry: panel radius 6px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use thin, restrained type with generous line spacing and few words.
Components: Object viewer, private notes, small index links, and contact actions should stay calm.
Buttons: Actions are quiet text buttons or thin outlined controls, never loud filled blocks.
Button details: Use restrained text buttons or hard-edged outline controls; keep hover/focus precise and quiet.
Feedback and alerts: Use sparse status notes, subtle border changes, and no decorative alert noise.
Spacing system: Use large negative space, 28-40px object gutters, and sparse metadata rows.
Responsive behavior: Desktop may hold an object stage beside notes; mobile places the object first, then proof rows and one clear action.
Icons and media: Use one strong crop, material study, or object silhouette with enough empty space.
States: Show selected work, private link ready, inquiry received, and caption draft states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Quiet Index / Private portfolio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not fill the silence with equal cards or decorative noise. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 08 - Resonant Stark as the page design direction.
Prompt type: Admin Panel.
Best fit: premium dark portfolios, art, high-end product teasers.
Visual mood: Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.
Scenario focus:
Admin panel focus: Use sparse review panels, minimal metadata, and precise outline controls; avoid dense bulk workflows.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Stark Object Focus.
Layout structure: Sparse portfolio composition with one dominant object, quiet metadata, and thin navigation.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0a0a0b; surface #141416; text #fafafa; muted #8a8a8e; primary #c8b8ff; accent #ffb8c8; border rgba(255,255,255,.08); radius 6px; shadow/material 0 28px 100px rgba(200, 184, 255, .12).
Geometry: panel radius 6px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use thin, restrained type with generous line spacing and few words.
Components: Object viewer, private notes, small index links, and contact actions should stay calm.
Buttons: Actions are quiet text buttons or thin outlined controls, never loud filled blocks.
Button details: Use restrained text buttons or hard-edged outline controls; keep hover/focus precise and quiet.
Feedback and alerts: Use sparse status notes, subtle border changes, and no decorative alert noise.
Spacing system: Use large negative space, 28-40px object gutters, and sparse metadata rows.
Responsive behavior: Desktop may hold an object stage beside notes; mobile places the object first, then proof rows and one clear action.
Icons and media: Use one strong crop, material study, or object silhouette with enough empty space.
States: Show selected work, private link ready, inquiry received, and caption draft states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Quiet Index / Private portfolio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not fill the silence with equal cards or decorative noise. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 08 - Resonant Stark as the page design direction.
Prompt type: Mobile.
Best fit: premium dark portfolios, art, high-end product teasers.
Visual mood: Near-black canvas, thin type, subtle glow, extreme whitespace, delicate lines, and premium restraint.
Scenario focus:
Mobile focus: Place object first, then proof rows and one action; avoid long multi-column content.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Stark Object Focus.
Layout structure: Sparse portfolio composition with one dominant object, quiet metadata, and thin navigation.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0a0a0b; surface #141416; text #fafafa; muted #8a8a8e; primary #c8b8ff; accent #ffb8c8; border rgba(255,255,255,.08); radius 6px; shadow/material 0 28px 100px rgba(200, 184, 255, .12).
Geometry: panel radius 6px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use thin, restrained type with generous line spacing and few words.
Components: Object viewer, private notes, small index links, and contact actions should stay calm.
Buttons: Actions are quiet text buttons or thin outlined controls, never loud filled blocks.
Button details: Use restrained text buttons or hard-edged outline controls; keep hover/focus precise and quiet.
Feedback and alerts: Use sparse status notes, subtle border changes, and no decorative alert noise.
Spacing system: Use large negative space, 28-40px object gutters, and sparse metadata rows.
Responsive behavior: Desktop may hold an object stage beside notes; mobile places the object first, then proof rows and one clear action.
Icons and media: Use one strong crop, material study, or object silhouette with enough empty space.
States: Show selected work, private link ready, inquiry received, and caption draft states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Quiet Index / Private portfolio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not fill the silence with equal cards or decorative noise. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

## Design Dials

- Layout variance: choose low, medium, or high based on product risk and brand confidence.
- Motion intensity: choose none, subtle, or expressive based on workflow sensitivity.
- Visual density: choose sparse, normal, or dense based on how much the first viewport must support.

## Implementation Guidance

- Start from tokens for background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.
- Apply the style to the user's actual page structure. Do not copy the bundled sample HTML layout.
- Keep hover, focus, selected, disabled, loading, empty, warning, and success states visually consistent.
- Define primary, secondary, disabled, loading, pressed, selected, warning, success, and destructive button treatments when those actions appear.
- Provide at least one visible feedback pattern for the page: toast, snackbar, banner, inline alert, validation message, or row-local status.
- Define spacing tokens for page gutters, section gaps, panel padding, control height, row gaps, and dense/touch-friendly variants.
- Document desktop, tablet, and mobile collapse behavior for the main content object, filters, sidebars, inspectors, tables, media, and primary action.
- Use semantic controls, visible focus states, accessible labels, stable media dimensions, reduced-motion behavior, and intentional long-text handling.
- Define a component state matrix for the components that appear on the page before final polish.
- Make empty, error, loading, warning, success, disabled, and selected states explain what happened and what the user can do next.
- When the page needs images, prefer real product imagery, brand photography, or carefully matched neutral media.
- Keep icon family, stroke, size, and alignment consistent when icons are used.
- Check desktop and mobile screenshots before finishing.

## Do Not

- Do not reuse the sample product name, sample copy, or sample layout as production content.
- Do not reduce the style to a palette swap.
- Do not use decorative effects to hide weak hierarchy, vague copy, missing states, or poor responsive structure.
