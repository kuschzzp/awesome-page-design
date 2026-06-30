# Style 19 - Gradient Pop (渐变风)

## Summary

Bright gradients, tech or trend energy, and an immediately eye-catching first viewport.

Chinese summary: 亮色渐变、科技或潮流气质，首屏视觉抓眼。

## Best For

festival pages, launch walls, creator campaign tools

## Example Scenario

- Product sample: Block Party Press
- Page job: Community festival wall
- Headline: Turn a street festival into posters, stages, and volunteer moments.
- Primary action: Publish poster
- Secondary action: Review lineup

## Scenario Components

- Poster energy: Gradient color becomes a print wall, lineup ribbon, and stage schedule.
- Full canvas: The page is packed with usable festival objects so no side feels empty.
- Public action: Publish, lineup, and volunteer states remain clearer than the color field.

## Example States

- Main poster: Approved
- Food lane: Mapped
- Volunteer tent: Needs lead

## Layout Pattern

- Pattern: Gradient Festival Wall (渐变街区节日墙)
- Archetype: Gradient Festival Wall
- Structure: Bright public-event board with poster wall, lineup ribbon, volunteer rail, stage map, and print-ready actions.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use energetic headings, clear public labels, and readable schedule copy.
- Components: Poster tiles, artist slots, food-lane blocks, volunteer states, and publish gates should fill the canvas.
- Buttons: Use confident color for the public action and calmer secondary controls.
- Icons and media: Use posters, lineup cards, stage strips, volunteer tags, and print sizes.
- States: Show approved, mapped, needs lead, live, printed, and delayed states.
- Avoid: Do not let gradients overpower schedule readability.

## Visual Language

- Background: `#fff7ed`
- Surface: `#ffffff`
- Text: `#24111f`
- Muted text: `#7c3aed`
- Primary: `#db2777`
- Accent: `#06b6d4`
- Border: `#f3d4ff`
- Radius: `14px`
- Panel radius: `14px`
- Control radius: `8px`
- Chip radius: `6px`
- Media radius: `12px`
- Geometry rule: energetic gradient surfaces with controlled curves; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 24px 70px rgba(219, 39, 119, .20)`

## Component Detail System

- Button system: Use confident gradient or solid buttons, restrained secondary buttons, and progress/loading states that feel like a builder flow.
- Feedback and alerts: Use bright publish toasts, checklist warnings, and inline success cards near the stepper.
- Spacing system: Use 20-28px builder panels, 12-16px template gaps, and clear separation between canvas and checklist.
- Responsive behavior: Desktop can show copy, canvas, and checklist; mobile orders them as headline, primary action, canvas, checklist.

Chinese implementation notes:

- 按钮细节：使用自信的渐变或实色按钮、克制次按钮，以及像构建流程的进度/加载态。
- 提示与反馈：使用明亮发布 toast、清单警告，以及靠近 stepper 的内联成功卡。
- 间距系统：构建器面板 20-28px，模板间距 12-16px，画布和清单分隔清楚。
- 响应式策略：桌面可显示文案、画布和清单；手机顺序为标题、主操作、画布、清单。

## Page Adaptation Guide

- Landing page: Use a bright builder narrative with live canvas, stepper, checklist, and publish action.
- Dashboard: Use activation metrics, template states, progress cards, and publish readiness checks.
- Admin panel: Use for creator/admin builders, content setup, template management, and launch checklists.
- Forms, tables, and data: Use colorful but restrained inputs, progress validation, checklist warnings, and success cards.
- Mobile: Order as headline, primary action, canvas, checklist, then supporting proof.
- Not a good fit for: Weak for restrained legal, formal docs, or very dense reporting dashboards.

## Usage Notes

- Use a gradient hero with calmer supporting surfaces.
- Let color communicate energy and momentum.
- Prevent gradients from overpowering text.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 19 - Gradient Pop as the page design direction.
Prompt type: Full Prompt.
Best fit: festival pages, launch walls, creator campaign tools.
Visual mood: Bright gradients, tech or trend energy, and an immediately eye-catching first viewport.
Scenario focus:
Landing adaptation: Use a bright builder narrative with live canvas, stepper, checklist, and publish action.
Dashboard adaptation: Use activation metrics, template states, progress cards, and publish readiness checks.
Admin adaptation: Use for creator/admin builders, content setup, template management, and launch checklists.
Forms/data adaptation: Use colorful but restrained inputs, progress validation, checklist warnings, and success cards.
Mobile adaptation: Order as headline, primary action, canvas, checklist, then supporting proof.
Avoid for: Weak for restrained legal, formal docs, or very dense reporting dashboards.
Layout archetype: Gradient Festival Wall.
Layout structure: Bright public-event board with poster wall, lineup ribbon, volunteer rail, stage map, and print-ready actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff7ed; surface #ffffff; text #24111f; muted #7c3aed; primary #db2777; accent #06b6d4; border #f3d4ff; radius 14px; shadow/material 0 24px 70px rgba(219, 39, 119, .20).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use energetic headings, clear public labels, and readable schedule copy.
Components: Poster tiles, artist slots, food-lane blocks, volunteer states, and publish gates should fill the canvas.
Buttons: Use confident color for the public action and calmer secondary controls.
Button details: Use confident gradient or solid buttons, restrained secondary buttons, and progress/loading states that feel like a builder flow.
Feedback and alerts: Use bright publish toasts, checklist warnings, and inline success cards near the stepper.
Spacing system: Use 20-28px builder panels, 12-16px template gaps, and clear separation between canvas and checklist.
Responsive behavior: Desktop can show copy, canvas, and checklist; mobile orders them as headline, primary action, canvas, checklist.
Icons and media: Use posters, lineup cards, stage strips, volunteer tags, and print sizes.
States: Show approved, mapped, needs lead, live, printed, and delayed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Block Party Press / Community festival wall" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let gradients overpower schedule readability. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 19 - Gradient Pop as the page design direction.
Prompt type: Landing Page.
Best fit: festival pages, launch walls, creator campaign tools.
Visual mood: Bright gradients, tech or trend energy, and an immediately eye-catching first viewport.
Scenario focus:
Landing page focus: Use a bright builder narrative with live canvas, stepper, checklist, and publish action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Gradient Festival Wall.
Layout structure: Bright public-event board with poster wall, lineup ribbon, volunteer rail, stage map, and print-ready actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff7ed; surface #ffffff; text #24111f; muted #7c3aed; primary #db2777; accent #06b6d4; border #f3d4ff; radius 14px; shadow/material 0 24px 70px rgba(219, 39, 119, .20).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use energetic headings, clear public labels, and readable schedule copy.
Components: Poster tiles, artist slots, food-lane blocks, volunteer states, and publish gates should fill the canvas.
Buttons: Use confident color for the public action and calmer secondary controls.
Button details: Use confident gradient or solid buttons, restrained secondary buttons, and progress/loading states that feel like a builder flow.
Feedback and alerts: Use bright publish toasts, checklist warnings, and inline success cards near the stepper.
Spacing system: Use 20-28px builder panels, 12-16px template gaps, and clear separation between canvas and checklist.
Responsive behavior: Desktop can show copy, canvas, and checklist; mobile orders them as headline, primary action, canvas, checklist.
Icons and media: Use posters, lineup cards, stage strips, volunteer tags, and print sizes.
States: Show approved, mapped, needs lead, live, printed, and delayed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Block Party Press / Community festival wall" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let gradients overpower schedule readability. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 19 - Gradient Pop as the page design direction.
Prompt type: Dashboard.
Best fit: festival pages, launch walls, creator campaign tools.
Visual mood: Bright gradients, tech or trend energy, and an immediately eye-catching first viewport.
Scenario focus:
Dashboard focus: Use activation metrics, template states, progress cards, and publish readiness checks.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Gradient Festival Wall.
Layout structure: Bright public-event board with poster wall, lineup ribbon, volunteer rail, stage map, and print-ready actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff7ed; surface #ffffff; text #24111f; muted #7c3aed; primary #db2777; accent #06b6d4; border #f3d4ff; radius 14px; shadow/material 0 24px 70px rgba(219, 39, 119, .20).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use energetic headings, clear public labels, and readable schedule copy.
Components: Poster tiles, artist slots, food-lane blocks, volunteer states, and publish gates should fill the canvas.
Buttons: Use confident color for the public action and calmer secondary controls.
Button details: Use confident gradient or solid buttons, restrained secondary buttons, and progress/loading states that feel like a builder flow.
Feedback and alerts: Use bright publish toasts, checklist warnings, and inline success cards near the stepper.
Spacing system: Use 20-28px builder panels, 12-16px template gaps, and clear separation between canvas and checklist.
Responsive behavior: Desktop can show copy, canvas, and checklist; mobile orders them as headline, primary action, canvas, checklist.
Icons and media: Use posters, lineup cards, stage strips, volunteer tags, and print sizes.
States: Show approved, mapped, needs lead, live, printed, and delayed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Block Party Press / Community festival wall" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let gradients overpower schedule readability. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 19 - Gradient Pop as the page design direction.
Prompt type: Admin Panel.
Best fit: festival pages, launch walls, creator campaign tools.
Visual mood: Bright gradients, tech or trend energy, and an immediately eye-catching first viewport.
Scenario focus:
Admin panel focus: Use for creator/admin builders, content setup, template management, and launch checklists.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Gradient Festival Wall.
Layout structure: Bright public-event board with poster wall, lineup ribbon, volunteer rail, stage map, and print-ready actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff7ed; surface #ffffff; text #24111f; muted #7c3aed; primary #db2777; accent #06b6d4; border #f3d4ff; radius 14px; shadow/material 0 24px 70px rgba(219, 39, 119, .20).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use energetic headings, clear public labels, and readable schedule copy.
Components: Poster tiles, artist slots, food-lane blocks, volunteer states, and publish gates should fill the canvas.
Buttons: Use confident color for the public action and calmer secondary controls.
Button details: Use confident gradient or solid buttons, restrained secondary buttons, and progress/loading states that feel like a builder flow.
Feedback and alerts: Use bright publish toasts, checklist warnings, and inline success cards near the stepper.
Spacing system: Use 20-28px builder panels, 12-16px template gaps, and clear separation between canvas and checklist.
Responsive behavior: Desktop can show copy, canvas, and checklist; mobile orders them as headline, primary action, canvas, checklist.
Icons and media: Use posters, lineup cards, stage strips, volunteer tags, and print sizes.
States: Show approved, mapped, needs lead, live, printed, and delayed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Block Party Press / Community festival wall" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let gradients overpower schedule readability. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 19 - Gradient Pop as the page design direction.
Prompt type: Mobile.
Best fit: festival pages, launch walls, creator campaign tools.
Visual mood: Bright gradients, tech or trend energy, and an immediately eye-catching first viewport.
Scenario focus:
Mobile focus: Order as headline, primary action, canvas, checklist, then supporting proof.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Gradient Festival Wall.
Layout structure: Bright public-event board with poster wall, lineup ribbon, volunteer rail, stage map, and print-ready actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff7ed; surface #ffffff; text #24111f; muted #7c3aed; primary #db2777; accent #06b6d4; border #f3d4ff; radius 14px; shadow/material 0 24px 70px rgba(219, 39, 119, .20).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use energetic headings, clear public labels, and readable schedule copy.
Components: Poster tiles, artist slots, food-lane blocks, volunteer states, and publish gates should fill the canvas.
Buttons: Use confident color for the public action and calmer secondary controls.
Button details: Use confident gradient or solid buttons, restrained secondary buttons, and progress/loading states that feel like a builder flow.
Feedback and alerts: Use bright publish toasts, checklist warnings, and inline success cards near the stepper.
Spacing system: Use 20-28px builder panels, 12-16px template gaps, and clear separation between canvas and checklist.
Responsive behavior: Desktop can show copy, canvas, and checklist; mobile orders them as headline, primary action, canvas, checklist.
Icons and media: Use posters, lineup cards, stage strips, volunteer tags, and print sizes.
States: Show approved, mapped, needs lead, live, printed, and delayed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Block Party Press / Community festival wall" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let gradients overpower schedule readability. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
