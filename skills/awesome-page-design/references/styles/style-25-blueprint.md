# Style 25 - Blueprint (蓝图)

## Summary

Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision.

Chinese summary: 深蓝技术网格、青色线稿、标注结构、测量式组件和工程图纸精度。

## Best For

architecture tools, renovation planning, systems maps, technical plans

## Example Scenario

- Product sample: Loft Plan Works
- Page job: Small studio renovation sheet
- Headline: Measure a live-work loft before the first wall is moved.
- Primary action: Approve plan
- Secondary action: Export drawing

## Scenario Components

- Measured living: Dimensions, furniture blocks, and lighting runs are part of the UI, not background texture.
- Build clarity: Crew notes, room callouts, and unresolved spans stay attached to the plan.
- Plan-sheet precision: The layout feels technical while remaining about a real home.

## Example States

- Kitchen wall: Measure
- Bookshelf bay: Approved
- Pendant run: Revise

## Layout Pattern

- Pattern: Blueprint Renovation Sheet (蓝图改造图纸)
- Archetype: Blueprint Renovation Sheet
- Structure: Home renovation plan sheet with room dimensions, furniture blocks, lighting runs, material callouts, and crew notes.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use compact technical labels, tabular dimensions, and clear sheet titles.
- Components: Dimension lines, room nodes, fixture labels, unresolved spans, export controls, and material notes should be measured.
- Buttons: Use technical annotation controls with thin borders and clear focus.
- Icons and media: Use room plans, section marks, furniture outlines, lighting routes, and material callouts.
- States: Show measured, approved, revise, open note, blocked span, and exported states.
- Avoid: Do not turn blueprint precision into generic sci-fi glow.

## Visual Language

- Background: `#061a33`
- Surface: `rgba(7, 28, 52, .88)`
- Text: `#e8f7ff`
- Muted text: `#8bb8d8`
- Primary: `#9edbff`
- Accent: `#34d3ff`
- Border: `#2d6796`
- Radius: `4px`
- Panel radius: `4px`
- Control radius: `2px`
- Chip radius: `0`
- Media radius: `4px`
- Geometry rule: technical plan-sheet geometry with measured low-radius panels; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 0 0 1px rgba(158, 219, 255, .24), 0 24px 70px rgba(0, 38, 76, .45)`

## Component Detail System

- Button system: Use compact command buttons, coordinate chips, thin measured borders, and active states that look selected on a drawing sheet.
- Feedback and alerts: Use callout notes, dimension-line warnings, export confirmations, and blocked-span labels tied to exact nodes.
- Spacing system: Use 16-24px sheet panels, 8-12px annotation gaps, thin grid lines, and dense but aligned metric rows.
- Responsive behavior: Desktop keeps the sheet, annotations, and trace list visible; mobile shows plan summary, primary action, graph, then unresolved spans.

Chinese implementation notes:

- 按钮细节：使用紧凑命令按钮、坐标 chip、细测量边框，以及像图纸中选中对象的 active 状态。
- 提示与反馈：使用标注说明、尺寸线警告、导出确认和绑定到具体节点的阻塞跨度标签。
- 间距系统：图纸面板 16-24px，标注间距 8-12px，细网格线，指标密集但对齐。
- 响应式策略：桌面保留图纸、标注和追踪列表；手机先显示计划摘要和主操作，再显示图和未解决跨度。

## Page Adaptation Guide

- Landing page: Use a technical plan sheet with dependency graph, annotations, export action, and engineering proof.
- Dashboard: Use grid, nodes, callouts, trace rows, unresolved spans, and plan readiness metrics.
- Admin panel: Use for infrastructure, API, architecture, and planning tools where diagrams and review gates are central.
- Forms, tables, and data: Use compact labels, coordinate-like grouping, exact validation, and export/review confirmations.
- Mobile: Show summary and action first, then graph, unresolved spans, annotations, and export details.
- Not a good fit for: Weak for soft lifestyle, emotional storytelling, and image-led luxury pages.

## Usage Notes

- Use grid, scale, labels, and dimension lines as real information structure.
- Keep linework thin and exact instead of glowing like a sci-fi console.
- Make annotations explain relationships, ownership, and next actions.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 25 - Blueprint as the page design direction.
Prompt type: Full Prompt.
Best fit: architecture tools, renovation planning, systems maps, technical plans.
Visual mood: Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision.
Scenario focus:
Landing adaptation: Use a technical plan sheet with dependency graph, annotations, export action, and engineering proof.
Dashboard adaptation: Use grid, nodes, callouts, trace rows, unresolved spans, and plan readiness metrics.
Admin adaptation: Use for infrastructure, API, architecture, and planning tools where diagrams and review gates are central.
Forms/data adaptation: Use compact labels, coordinate-like grouping, exact validation, and export/review confirmations.
Mobile adaptation: Show summary and action first, then graph, unresolved spans, annotations, and export details.
Avoid for: Weak for soft lifestyle, emotional storytelling, and image-led luxury pages.
Layout archetype: Blueprint Renovation Sheet.
Layout structure: Home renovation plan sheet with room dimensions, furniture blocks, lighting runs, material callouts, and crew notes.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #061a33; surface rgba(7, 28, 52, .88); text #e8f7ff; muted #8bb8d8; primary #9edbff; accent #34d3ff; border #2d6796; radius 4px; shadow/material 0 0 0 1px rgba(158, 219, 255, .24), 0 24px 70px rgba(0, 38, 76, .45).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact technical labels, tabular dimensions, and clear sheet titles.
Components: Dimension lines, room nodes, fixture labels, unresolved spans, export controls, and material notes should be measured.
Buttons: Use technical annotation controls with thin borders and clear focus.
Button details: Use compact command buttons, coordinate chips, thin measured borders, and active states that look selected on a drawing sheet.
Feedback and alerts: Use callout notes, dimension-line warnings, export confirmations, and blocked-span labels tied to exact nodes.
Spacing system: Use 16-24px sheet panels, 8-12px annotation gaps, thin grid lines, and dense but aligned metric rows.
Responsive behavior: Desktop keeps the sheet, annotations, and trace list visible; mobile shows plan summary, primary action, graph, then unresolved spans.
Icons and media: Use room plans, section marks, furniture outlines, lighting routes, and material callouts.
States: Show measured, approved, revise, open note, blocked span, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Loft Plan Works / Small studio renovation sheet" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn blueprint precision into generic sci-fi glow. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 25 - Blueprint as the page design direction.
Prompt type: Landing Page.
Best fit: architecture tools, renovation planning, systems maps, technical plans.
Visual mood: Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision.
Scenario focus:
Landing page focus: Use a technical plan sheet with dependency graph, annotations, export action, and engineering proof.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Blueprint Renovation Sheet.
Layout structure: Home renovation plan sheet with room dimensions, furniture blocks, lighting runs, material callouts, and crew notes.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #061a33; surface rgba(7, 28, 52, .88); text #e8f7ff; muted #8bb8d8; primary #9edbff; accent #34d3ff; border #2d6796; radius 4px; shadow/material 0 0 0 1px rgba(158, 219, 255, .24), 0 24px 70px rgba(0, 38, 76, .45).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact technical labels, tabular dimensions, and clear sheet titles.
Components: Dimension lines, room nodes, fixture labels, unresolved spans, export controls, and material notes should be measured.
Buttons: Use technical annotation controls with thin borders and clear focus.
Button details: Use compact command buttons, coordinate chips, thin measured borders, and active states that look selected on a drawing sheet.
Feedback and alerts: Use callout notes, dimension-line warnings, export confirmations, and blocked-span labels tied to exact nodes.
Spacing system: Use 16-24px sheet panels, 8-12px annotation gaps, thin grid lines, and dense but aligned metric rows.
Responsive behavior: Desktop keeps the sheet, annotations, and trace list visible; mobile shows plan summary, primary action, graph, then unresolved spans.
Icons and media: Use room plans, section marks, furniture outlines, lighting routes, and material callouts.
States: Show measured, approved, revise, open note, blocked span, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Loft Plan Works / Small studio renovation sheet" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn blueprint precision into generic sci-fi glow. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 25 - Blueprint as the page design direction.
Prompt type: Dashboard.
Best fit: architecture tools, renovation planning, systems maps, technical plans.
Visual mood: Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision.
Scenario focus:
Dashboard focus: Use grid, nodes, callouts, trace rows, unresolved spans, and plan readiness metrics.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Blueprint Renovation Sheet.
Layout structure: Home renovation plan sheet with room dimensions, furniture blocks, lighting runs, material callouts, and crew notes.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #061a33; surface rgba(7, 28, 52, .88); text #e8f7ff; muted #8bb8d8; primary #9edbff; accent #34d3ff; border #2d6796; radius 4px; shadow/material 0 0 0 1px rgba(158, 219, 255, .24), 0 24px 70px rgba(0, 38, 76, .45).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact technical labels, tabular dimensions, and clear sheet titles.
Components: Dimension lines, room nodes, fixture labels, unresolved spans, export controls, and material notes should be measured.
Buttons: Use technical annotation controls with thin borders and clear focus.
Button details: Use compact command buttons, coordinate chips, thin measured borders, and active states that look selected on a drawing sheet.
Feedback and alerts: Use callout notes, dimension-line warnings, export confirmations, and blocked-span labels tied to exact nodes.
Spacing system: Use 16-24px sheet panels, 8-12px annotation gaps, thin grid lines, and dense but aligned metric rows.
Responsive behavior: Desktop keeps the sheet, annotations, and trace list visible; mobile shows plan summary, primary action, graph, then unresolved spans.
Icons and media: Use room plans, section marks, furniture outlines, lighting routes, and material callouts.
States: Show measured, approved, revise, open note, blocked span, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Loft Plan Works / Small studio renovation sheet" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn blueprint precision into generic sci-fi glow. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 25 - Blueprint as the page design direction.
Prompt type: Admin Panel.
Best fit: architecture tools, renovation planning, systems maps, technical plans.
Visual mood: Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision.
Scenario focus:
Admin panel focus: Use for infrastructure, API, architecture, and planning tools where diagrams and review gates are central.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Blueprint Renovation Sheet.
Layout structure: Home renovation plan sheet with room dimensions, furniture blocks, lighting runs, material callouts, and crew notes.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #061a33; surface rgba(7, 28, 52, .88); text #e8f7ff; muted #8bb8d8; primary #9edbff; accent #34d3ff; border #2d6796; radius 4px; shadow/material 0 0 0 1px rgba(158, 219, 255, .24), 0 24px 70px rgba(0, 38, 76, .45).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact technical labels, tabular dimensions, and clear sheet titles.
Components: Dimension lines, room nodes, fixture labels, unresolved spans, export controls, and material notes should be measured.
Buttons: Use technical annotation controls with thin borders and clear focus.
Button details: Use compact command buttons, coordinate chips, thin measured borders, and active states that look selected on a drawing sheet.
Feedback and alerts: Use callout notes, dimension-line warnings, export confirmations, and blocked-span labels tied to exact nodes.
Spacing system: Use 16-24px sheet panels, 8-12px annotation gaps, thin grid lines, and dense but aligned metric rows.
Responsive behavior: Desktop keeps the sheet, annotations, and trace list visible; mobile shows plan summary, primary action, graph, then unresolved spans.
Icons and media: Use room plans, section marks, furniture outlines, lighting routes, and material callouts.
States: Show measured, approved, revise, open note, blocked span, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Loft Plan Works / Small studio renovation sheet" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn blueprint precision into generic sci-fi glow. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 25 - Blueprint as the page design direction.
Prompt type: Mobile.
Best fit: architecture tools, renovation planning, systems maps, technical plans.
Visual mood: Deep blue technical grid, cyan linework, annotated structure, measured components, and plan-sheet precision.
Scenario focus:
Mobile focus: Show summary and action first, then graph, unresolved spans, annotations, and export details.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Blueprint Renovation Sheet.
Layout structure: Home renovation plan sheet with room dimensions, furniture blocks, lighting runs, material callouts, and crew notes.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #061a33; surface rgba(7, 28, 52, .88); text #e8f7ff; muted #8bb8d8; primary #9edbff; accent #34d3ff; border #2d6796; radius 4px; shadow/material 0 0 0 1px rgba(158, 219, 255, .24), 0 24px 70px rgba(0, 38, 76, .45).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact technical labels, tabular dimensions, and clear sheet titles.
Components: Dimension lines, room nodes, fixture labels, unresolved spans, export controls, and material notes should be measured.
Buttons: Use technical annotation controls with thin borders and clear focus.
Button details: Use compact command buttons, coordinate chips, thin measured borders, and active states that look selected on a drawing sheet.
Feedback and alerts: Use callout notes, dimension-line warnings, export confirmations, and blocked-span labels tied to exact nodes.
Spacing system: Use 16-24px sheet panels, 8-12px annotation gaps, thin grid lines, and dense but aligned metric rows.
Responsive behavior: Desktop keeps the sheet, annotations, and trace list visible; mobile shows plan summary, primary action, graph, then unresolved spans.
Icons and media: Use room plans, section marks, furniture outlines, lighting routes, and material callouts.
States: Show measured, approved, revise, open note, blocked span, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Loft Plan Works / Small studio renovation sheet" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn blueprint precision into generic sci-fi glow. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
