# Style 02 - Block Brutalism (块状粗野主义)

## Summary

Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy.

Chinese summary: 暖黄画布、硬黑边框、块状控件、高饱和标签和强活动感。

## Best For

bold campaigns, indie products, playful utilities

## Example Scenario

- Product sample: BlockParty
- Page job: Street launch builder
- Headline: Make the launch impossible to ignore.
- Primary action: Publish drop
- Secondary action: Edit rules

## Scenario Components

- Hard hierarchy: Black borders, block labels, and oversized type make the core action unmistakable.
- Campaign pressure: Timers, scarcity notes, and status slabs create energy without hiding the rules.
- Readable chaos: The grid feels loud, but actions and requirements stay obvious.

## Example States

- Prize rules approved: Done
- Hero slab contrast: Check
- Referral badge: Live

## Layout Pattern

- Pattern: Street Poster Launch (街头海报发布)
- Archetype: Street Poster Launch
- Structure: Poster-first composition with slab headline blocks, ticket strips, hard stamps, and intentionally loud hierarchy.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use huge block type, compressed labels, blunt numbers, and minimal body copy.
- Components: Tickets, stamps, countdowns, rule panels, and claim modules should look physical and direct.
- Buttons: Buttons are black or saturated slabs with hard borders and offset shadows, never soft pills.
- Icons and media: Use poster blocks, product labels, stickers, or campaign artifacts as the main image language.
- States: Use stamped states such as live, locked, claimed, expired, and warning with strong contrast.
- Avoid: Do not soften the style with generic rounded SaaS cards.

## Visual Language

- Background: `#fff04d`
- Surface: `#fffbea`
- Text: `#111111`
- Muted text: `#3f3f46`
- Primary: `#111111`
- Accent: `#ff3d00`
- Border: `#111111`
- Radius: `0`
- Panel radius: `0`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `0`
- Geometry rule: hard square geometry with no softened SaaS corners; avoid making every button and card the same large rounded rectangle.
- Shadow: `10px 10px 0 #111111`

## Component Detail System

- Button system: Use blunt rectangular buttons with thick borders, hard offset shadows, pressed translation, and no soft disabled treatment.
- Feedback and alerts: Use poster-like alert strips, stamped success labels, and obvious error blocks with hard borders.
- Spacing system: Use large 24-32px slabs, abrupt 12-16px gaps, and intentionally chunky control groups.
- Responsive behavior: Desktop can be asymmetric; tablet collapses poster and proof wall; mobile becomes a single stack with full-width slab buttons and no horizontal overflow.

Chinese implementation notes:

- 按钮细节：使用钝感矩形按钮、粗边框、硬偏移阴影、按下位移，并避免柔和的禁用态。
- 提示与反馈：使用海报式提示条、印章式成功标签，以及粗边框错误块。
- 间距系统：使用 24-32px 大块内边距、12-16px 明确间距，以及厚重的控件组。
- 响应式策略：桌面可以不对称；平板折叠海报和证明墙；手机变成单列，按钮全宽且不能横向溢出。

## Page Adaptation Guide

- Landing page: Use a campaign poster, stamped proof, bold offer slab, and one loud call-to-action with hard-edged supporting tickets.
- Dashboard: Use chunky status slabs and urgent queues only for high-energy launch or moderation dashboards.
- Admin panel: Use blunt forms, strong section borders, and obvious destructive confirmation; keep density lower than a neutral admin shell.
- Forms, tables, and data: Use large labels, hard field borders, poster-like errors, and full-width confirmation blocks.
- Mobile: Stack slabs in a strong reading order; remove side collisions and keep buttons full-width with no horizontal overflow.
- Not a good fit for: Weak for quiet finance, medical, legal, or long-form reading products.

## Usage Notes

- Use loud hierarchy and hard geometry.
- Let tension come from shape and contrast, not randomness.
- Keep forms and actions obvious.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 02 - Block Brutalism as the page design direction.
Prompt type: Full Prompt.
Best fit: bold campaigns, indie products, playful utilities.
Visual mood: Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy.
Scenario focus:
Landing adaptation: Use a campaign poster, stamped proof, bold offer slab, and one loud call-to-action with hard-edged supporting tickets.
Dashboard adaptation: Use chunky status slabs and urgent queues only for high-energy launch or moderation dashboards.
Admin adaptation: Use blunt forms, strong section borders, and obvious destructive confirmation; keep density lower than a neutral admin shell.
Forms/data adaptation: Use large labels, hard field borders, poster-like errors, and full-width confirmation blocks.
Mobile adaptation: Stack slabs in a strong reading order; remove side collisions and keep buttons full-width with no horizontal overflow.
Avoid for: Weak for quiet finance, medical, legal, or long-form reading products.
Layout archetype: Street Poster Launch.
Layout structure: Poster-first composition with slab headline blocks, ticket strips, hard stamps, and intentionally loud hierarchy.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff04d; surface #fffbea; text #111111; muted #3f3f46; primary #111111; accent #ff3d00; border #111111; radius 0; shadow/material 10px 10px 0 #111111.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use huge block type, compressed labels, blunt numbers, and minimal body copy.
Components: Tickets, stamps, countdowns, rule panels, and claim modules should look physical and direct.
Buttons: Buttons are black or saturated slabs with hard borders and offset shadows, never soft pills.
Button details: Use blunt rectangular buttons with thick borders, hard offset shadows, pressed translation, and no soft disabled treatment.
Feedback and alerts: Use poster-like alert strips, stamped success labels, and obvious error blocks with hard borders.
Spacing system: Use large 24-32px slabs, abrupt 12-16px gaps, and intentionally chunky control groups.
Responsive behavior: Desktop can be asymmetric; tablet collapses poster and proof wall; mobile becomes a single stack with full-width slab buttons and no horizontal overflow.
Icons and media: Use poster blocks, product labels, stickers, or campaign artifacts as the main image language.
States: Use stamped states such as live, locked, claimed, expired, and warning with strong contrast.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "BlockParty / Street launch builder" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften the style with generic rounded SaaS cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 02 - Block Brutalism as the page design direction.
Prompt type: Landing Page.
Best fit: bold campaigns, indie products, playful utilities.
Visual mood: Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy.
Scenario focus:
Landing page focus: Use a campaign poster, stamped proof, bold offer slab, and one loud call-to-action with hard-edged supporting tickets.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Street Poster Launch.
Layout structure: Poster-first composition with slab headline blocks, ticket strips, hard stamps, and intentionally loud hierarchy.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff04d; surface #fffbea; text #111111; muted #3f3f46; primary #111111; accent #ff3d00; border #111111; radius 0; shadow/material 10px 10px 0 #111111.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use huge block type, compressed labels, blunt numbers, and minimal body copy.
Components: Tickets, stamps, countdowns, rule panels, and claim modules should look physical and direct.
Buttons: Buttons are black or saturated slabs with hard borders and offset shadows, never soft pills.
Button details: Use blunt rectangular buttons with thick borders, hard offset shadows, pressed translation, and no soft disabled treatment.
Feedback and alerts: Use poster-like alert strips, stamped success labels, and obvious error blocks with hard borders.
Spacing system: Use large 24-32px slabs, abrupt 12-16px gaps, and intentionally chunky control groups.
Responsive behavior: Desktop can be asymmetric; tablet collapses poster and proof wall; mobile becomes a single stack with full-width slab buttons and no horizontal overflow.
Icons and media: Use poster blocks, product labels, stickers, or campaign artifacts as the main image language.
States: Use stamped states such as live, locked, claimed, expired, and warning with strong contrast.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "BlockParty / Street launch builder" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften the style with generic rounded SaaS cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 02 - Block Brutalism as the page design direction.
Prompt type: Dashboard.
Best fit: bold campaigns, indie products, playful utilities.
Visual mood: Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy.
Scenario focus:
Dashboard focus: Use chunky status slabs and urgent queues only for high-energy launch or moderation dashboards.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Street Poster Launch.
Layout structure: Poster-first composition with slab headline blocks, ticket strips, hard stamps, and intentionally loud hierarchy.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff04d; surface #fffbea; text #111111; muted #3f3f46; primary #111111; accent #ff3d00; border #111111; radius 0; shadow/material 10px 10px 0 #111111.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use huge block type, compressed labels, blunt numbers, and minimal body copy.
Components: Tickets, stamps, countdowns, rule panels, and claim modules should look physical and direct.
Buttons: Buttons are black or saturated slabs with hard borders and offset shadows, never soft pills.
Button details: Use blunt rectangular buttons with thick borders, hard offset shadows, pressed translation, and no soft disabled treatment.
Feedback and alerts: Use poster-like alert strips, stamped success labels, and obvious error blocks with hard borders.
Spacing system: Use large 24-32px slabs, abrupt 12-16px gaps, and intentionally chunky control groups.
Responsive behavior: Desktop can be asymmetric; tablet collapses poster and proof wall; mobile becomes a single stack with full-width slab buttons and no horizontal overflow.
Icons and media: Use poster blocks, product labels, stickers, or campaign artifacts as the main image language.
States: Use stamped states such as live, locked, claimed, expired, and warning with strong contrast.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "BlockParty / Street launch builder" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften the style with generic rounded SaaS cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 02 - Block Brutalism as the page design direction.
Prompt type: Admin Panel.
Best fit: bold campaigns, indie products, playful utilities.
Visual mood: Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy.
Scenario focus:
Admin panel focus: Use blunt forms, strong section borders, and obvious destructive confirmation; keep density lower than a neutral admin shell.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Street Poster Launch.
Layout structure: Poster-first composition with slab headline blocks, ticket strips, hard stamps, and intentionally loud hierarchy.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff04d; surface #fffbea; text #111111; muted #3f3f46; primary #111111; accent #ff3d00; border #111111; radius 0; shadow/material 10px 10px 0 #111111.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use huge block type, compressed labels, blunt numbers, and minimal body copy.
Components: Tickets, stamps, countdowns, rule panels, and claim modules should look physical and direct.
Buttons: Buttons are black or saturated slabs with hard borders and offset shadows, never soft pills.
Button details: Use blunt rectangular buttons with thick borders, hard offset shadows, pressed translation, and no soft disabled treatment.
Feedback and alerts: Use poster-like alert strips, stamped success labels, and obvious error blocks with hard borders.
Spacing system: Use large 24-32px slabs, abrupt 12-16px gaps, and intentionally chunky control groups.
Responsive behavior: Desktop can be asymmetric; tablet collapses poster and proof wall; mobile becomes a single stack with full-width slab buttons and no horizontal overflow.
Icons and media: Use poster blocks, product labels, stickers, or campaign artifacts as the main image language.
States: Use stamped states such as live, locked, claimed, expired, and warning with strong contrast.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "BlockParty / Street launch builder" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften the style with generic rounded SaaS cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 02 - Block Brutalism as the page design direction.
Prompt type: Mobile.
Best fit: bold campaigns, indie products, playful utilities.
Visual mood: Warm yellow canvas, hard black borders, blocky controls, saturated labels, and strong campaign energy.
Scenario focus:
Mobile focus: Stack slabs in a strong reading order; remove side collisions and keep buttons full-width with no horizontal overflow.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Street Poster Launch.
Layout structure: Poster-first composition with slab headline blocks, ticket strips, hard stamps, and intentionally loud hierarchy.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff04d; surface #fffbea; text #111111; muted #3f3f46; primary #111111; accent #ff3d00; border #111111; radius 0; shadow/material 10px 10px 0 #111111.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use huge block type, compressed labels, blunt numbers, and minimal body copy.
Components: Tickets, stamps, countdowns, rule panels, and claim modules should look physical and direct.
Buttons: Buttons are black or saturated slabs with hard borders and offset shadows, never soft pills.
Button details: Use blunt rectangular buttons with thick borders, hard offset shadows, pressed translation, and no soft disabled treatment.
Feedback and alerts: Use poster-like alert strips, stamped success labels, and obvious error blocks with hard borders.
Spacing system: Use large 24-32px slabs, abrupt 12-16px gaps, and intentionally chunky control groups.
Responsive behavior: Desktop can be asymmetric; tablet collapses poster and proof wall; mobile becomes a single stack with full-width slab buttons and no horizontal overflow.
Icons and media: Use poster blocks, product labels, stickers, or campaign artifacts as the main image language.
States: Use stamped states such as live, locked, claimed, expired, and warning with strong contrast.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "BlockParty / Street launch builder" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften the style with generic rounded SaaS cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
