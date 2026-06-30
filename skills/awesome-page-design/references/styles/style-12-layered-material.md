# Style 12 - Layered Material (层级材质)

## Summary

Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.

Chinese summary: 层次分明、大色块卡片、大圆角、有秩序且适合触控的表面。

## Best For

interior sample boards, consumer tools, product dashboards

## Example Scenario

- Product sample: Room & Grain
- Page job: Interior material board
- Headline: Compare wood, textile, stone, and paint before the room is built.
- Primary action: Approve board
- Secondary action: Compare samples

## Scenario Components

- Sample stack: Physical layers, swatches, and supplier labels replace abstract product cards.
- Room logic: Each material is tied to a real placement such as wall, floor, counter, or textile.
- Approval trail: Availability, finish note, and owner decision remain visible together.

## Example States

- Oak veneer: Chosen
- Linen weave: Hold
- Warm limewash: Sample due

## Layout Pattern

- Pattern: Layered Interior Samples (层叠室内样板)
- Archetype: Layered Interior Samples
- Structure: Material-board layout with stacked samples, swatch lanes, room placement notes, supplier rows, and approval rail.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use friendly material labels, room placement captions, and clear stock values.
- Components: Swatches, sample stacks, supplier chips, placement notes, and approval states should share tactile depth.
- Buttons: Use touch-friendly tonal buttons with visible selected states.
- Icons and media: Use wood, textile, stone, paint, room plans, and supplier labels as content.
- States: Show chosen, hold, sample due, low stock, approved, and compare states.
- Avoid: Do not make layered material look like a generic task dashboard.

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

## Component Detail System

- Button system: Use touch-friendly filled and tonal buttons, clear selected states, and disabled states that preserve material depth.
- Feedback and alerts: Use calm snackbars, inline helper text, and clear routine-complete confirmations.
- Spacing system: Use 24px touch panels, 12-16px list gaps, and comfortable 44-52px controls.
- Responsive behavior: Desktop can show phone panel and cloud; mobile keeps the daily panel first and converts side content into stacked cards.

Chinese implementation notes:

- 按钮细节：使用适合触控的实色和调性按钮、清楚选中态，以及保留材质深度的禁用态。
- 提示与反馈：使用平静 snackbar、内联帮助文本和清晰日程完成确认。
- 间距系统：触控面板 24px，列表间距 12-16px，控件高度 44-52px。
- 响应式策略：桌面可展示手机面板和信息云；手机先日程面板，侧内容变为堆叠卡片。

## Page Adaptation Guide

- Landing page: Use layered product surfaces, touch-friendly proof cards, and calm utility storytelling.
- Dashboard: Use large touch panels, routine cards, tonal status surfaces, and comfortable controls.
- Admin panel: Use settings, forms, and utility dashboards where clarity and touch targets matter.
- Forms, tables, and data: Use filled and tonal inputs, clear helper text, calm snackbars, and large touch targets.
- Mobile: Put the daily or utility panel first; convert side content into stacked cards.
- Not a good fit for: Weak for hard-edged technical consoles or editorial layouts that need strict rules.

## Usage Notes

- Use large touch-friendly controls.
- Separate hierarchy with tonal surfaces.
- Keep motion and states calm and systematic.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 12 - Layered Material as the page design direction.
Prompt type: Full Prompt.
Best fit: interior sample boards, consumer tools, product dashboards.
Visual mood: Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.
Scenario focus:
Landing adaptation: Use layered product surfaces, touch-friendly proof cards, and calm utility storytelling.
Dashboard adaptation: Use large touch panels, routine cards, tonal status surfaces, and comfortable controls.
Admin adaptation: Use settings, forms, and utility dashboards where clarity and touch targets matter.
Forms/data adaptation: Use filled and tonal inputs, clear helper text, calm snackbars, and large touch targets.
Mobile adaptation: Put the daily or utility panel first; convert side content into stacked cards.
Avoid for: Weak for hard-edged technical consoles or editorial layouts that need strict rules.
Layout archetype: Layered Interior Samples.
Layout structure: Material-board layout with stacked samples, swatch lanes, room placement notes, supplier rows, and approval rail.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f2fa; surface #ffffff; text #1d1b20; muted #625b71; primary #6750a4; accent #eaddff; border #e7e0ec; radius 22px; shadow/material 0 18px 50px rgba(103, 80, 164, .16).
Geometry: panel radius 22px; control radius 16px; chip/state radius 12px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly material labels, room placement captions, and clear stock values.
Components: Swatches, sample stacks, supplier chips, placement notes, and approval states should share tactile depth.
Buttons: Use touch-friendly tonal buttons with visible selected states.
Button details: Use touch-friendly filled and tonal buttons, clear selected states, and disabled states that preserve material depth.
Feedback and alerts: Use calm snackbars, inline helper text, and clear routine-complete confirmations.
Spacing system: Use 24px touch panels, 12-16px list gaps, and comfortable 44-52px controls.
Responsive behavior: Desktop can show phone panel and cloud; mobile keeps the daily panel first and converts side content into stacked cards.
Icons and media: Use wood, textile, stone, paint, room plans, and supplier labels as content.
States: Show chosen, hold, sample due, low stock, approved, and compare states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Room & Grain / Interior material board" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make layered material look like a generic task dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 12 - Layered Material as the page design direction.
Prompt type: Landing Page.
Best fit: interior sample boards, consumer tools, product dashboards.
Visual mood: Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.
Scenario focus:
Landing page focus: Use layered product surfaces, touch-friendly proof cards, and calm utility storytelling.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Layered Interior Samples.
Layout structure: Material-board layout with stacked samples, swatch lanes, room placement notes, supplier rows, and approval rail.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f2fa; surface #ffffff; text #1d1b20; muted #625b71; primary #6750a4; accent #eaddff; border #e7e0ec; radius 22px; shadow/material 0 18px 50px rgba(103, 80, 164, .16).
Geometry: panel radius 22px; control radius 16px; chip/state radius 12px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly material labels, room placement captions, and clear stock values.
Components: Swatches, sample stacks, supplier chips, placement notes, and approval states should share tactile depth.
Buttons: Use touch-friendly tonal buttons with visible selected states.
Button details: Use touch-friendly filled and tonal buttons, clear selected states, and disabled states that preserve material depth.
Feedback and alerts: Use calm snackbars, inline helper text, and clear routine-complete confirmations.
Spacing system: Use 24px touch panels, 12-16px list gaps, and comfortable 44-52px controls.
Responsive behavior: Desktop can show phone panel and cloud; mobile keeps the daily panel first and converts side content into stacked cards.
Icons and media: Use wood, textile, stone, paint, room plans, and supplier labels as content.
States: Show chosen, hold, sample due, low stock, approved, and compare states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Room & Grain / Interior material board" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make layered material look like a generic task dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 12 - Layered Material as the page design direction.
Prompt type: Dashboard.
Best fit: interior sample boards, consumer tools, product dashboards.
Visual mood: Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.
Scenario focus:
Dashboard focus: Use large touch panels, routine cards, tonal status surfaces, and comfortable controls.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Layered Interior Samples.
Layout structure: Material-board layout with stacked samples, swatch lanes, room placement notes, supplier rows, and approval rail.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f2fa; surface #ffffff; text #1d1b20; muted #625b71; primary #6750a4; accent #eaddff; border #e7e0ec; radius 22px; shadow/material 0 18px 50px rgba(103, 80, 164, .16).
Geometry: panel radius 22px; control radius 16px; chip/state radius 12px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly material labels, room placement captions, and clear stock values.
Components: Swatches, sample stacks, supplier chips, placement notes, and approval states should share tactile depth.
Buttons: Use touch-friendly tonal buttons with visible selected states.
Button details: Use touch-friendly filled and tonal buttons, clear selected states, and disabled states that preserve material depth.
Feedback and alerts: Use calm snackbars, inline helper text, and clear routine-complete confirmations.
Spacing system: Use 24px touch panels, 12-16px list gaps, and comfortable 44-52px controls.
Responsive behavior: Desktop can show phone panel and cloud; mobile keeps the daily panel first and converts side content into stacked cards.
Icons and media: Use wood, textile, stone, paint, room plans, and supplier labels as content.
States: Show chosen, hold, sample due, low stock, approved, and compare states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Room & Grain / Interior material board" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make layered material look like a generic task dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 12 - Layered Material as the page design direction.
Prompt type: Admin Panel.
Best fit: interior sample boards, consumer tools, product dashboards.
Visual mood: Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.
Scenario focus:
Admin panel focus: Use settings, forms, and utility dashboards where clarity and touch targets matter.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Layered Interior Samples.
Layout structure: Material-board layout with stacked samples, swatch lanes, room placement notes, supplier rows, and approval rail.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f2fa; surface #ffffff; text #1d1b20; muted #625b71; primary #6750a4; accent #eaddff; border #e7e0ec; radius 22px; shadow/material 0 18px 50px rgba(103, 80, 164, .16).
Geometry: panel radius 22px; control radius 16px; chip/state radius 12px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly material labels, room placement captions, and clear stock values.
Components: Swatches, sample stacks, supplier chips, placement notes, and approval states should share tactile depth.
Buttons: Use touch-friendly tonal buttons with visible selected states.
Button details: Use touch-friendly filled and tonal buttons, clear selected states, and disabled states that preserve material depth.
Feedback and alerts: Use calm snackbars, inline helper text, and clear routine-complete confirmations.
Spacing system: Use 24px touch panels, 12-16px list gaps, and comfortable 44-52px controls.
Responsive behavior: Desktop can show phone panel and cloud; mobile keeps the daily panel first and converts side content into stacked cards.
Icons and media: Use wood, textile, stone, paint, room plans, and supplier labels as content.
States: Show chosen, hold, sample due, low stock, approved, and compare states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Room & Grain / Interior material board" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make layered material look like a generic task dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 12 - Layered Material as the page design direction.
Prompt type: Mobile.
Best fit: interior sample boards, consumer tools, product dashboards.
Visual mood: Clear elevation, large tonal cards, generous radius, and orderly touch-friendly surfaces.
Scenario focus:
Mobile focus: Put the daily or utility panel first; convert side content into stacked cards.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Layered Interior Samples.
Layout structure: Material-board layout with stacked samples, swatch lanes, room placement notes, supplier rows, and approval rail.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f2fa; surface #ffffff; text #1d1b20; muted #625b71; primary #6750a4; accent #eaddff; border #e7e0ec; radius 22px; shadow/material 0 18px 50px rgba(103, 80, 164, .16).
Geometry: panel radius 22px; control radius 16px; chip/state radius 12px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly material labels, room placement captions, and clear stock values.
Components: Swatches, sample stacks, supplier chips, placement notes, and approval states should share tactile depth.
Buttons: Use touch-friendly tonal buttons with visible selected states.
Button details: Use touch-friendly filled and tonal buttons, clear selected states, and disabled states that preserve material depth.
Feedback and alerts: Use calm snackbars, inline helper text, and clear routine-complete confirmations.
Spacing system: Use 24px touch panels, 12-16px list gaps, and comfortable 44-52px controls.
Responsive behavior: Desktop can show phone panel and cloud; mobile keeps the daily panel first and converts side content into stacked cards.
Icons and media: Use wood, textile, stone, paint, room plans, and supplier labels as content.
States: Show chosen, hold, sample due, low stock, approved, and compare states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Room & Grain / Interior material board" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make layered material look like a generic task dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
