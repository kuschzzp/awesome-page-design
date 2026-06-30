# Style 11 - Structured Lines (结构线)

## Summary

Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy.

Chinese summary: 细线框、结构化、专业严肃、信息层级清晰。

## Best For

museum maps, workflow products, structured B2B sites

## Example Scenario

- Product sample: Gallery Route
- Page job: Exhibition route map
- Headline: Map a gallery walk from entrance wall to final listening bench.
- Primary action: Start route
- Secondary action: Export wall labels

## Scenario Components

- Linework navigation: Routes, wall numbers, and object labels are drawn as a plan rather than as loose cards.
- Public clarity: The page keeps entrance, accessible path, rest points, and labels legible.
- Curatorial rhythm: Each stop has a purpose: look, listen, rest, or read.

## Example States

- North Wall: Stop 02
- Sound Bench: Quiet
- Exit Label: Needs proof

## Layout Pattern

- Pattern: Line Museum Plan (线框博物馆路线)
- Archetype: Line Museum Plan
- Structure: Floor-plan layout with route lines, numbered exhibition stops, labels, guide notes, and accessibility callouts.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use factual captions, exact numbering, map labels, and compact guide copy.
- Components: Route nodes, wall labels, stop cards, rest points, and export controls should rely on lines before shadows.
- Buttons: Use disciplined rectangular controls aligned to the plan grid.
- Icons and media: Use gallery maps, object labels, accessibility routes, and docent timing notes.
- States: Show current stop, quiet seat, label proof, route open, blocked path, and exported states.
- Avoid: Do not replace the plan with decorative cards.

## Visual Language

- Background: `#fbfcfe`
- Surface: `#ffffff`
- Text: `#111827`
- Muted text: `#6b7280`
- Primary: `#1d4ed8`
- Accent: `#22c55e`
- Border: `#d7dde8`
- Radius: `4px`
- Panel radius: `4px`
- Control radius: `2px`
- Chip radius: `0`
- Media radius: `4px`
- Geometry rule: linework structure with almost-square components; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 45px rgba(15, 23, 42, .07)`

## Component Detail System

- Button system: Use line-based buttons, compact action labels, and focus states that strengthen the rule system.
- Feedback and alerts: Use rule-separated banners, inline audit notes, and visible state chips without soft shadows.
- Spacing system: Use 20-24px grid gutters, 1px dividers, 12px evidence rows, and strict alignment.
- Responsive behavior: Desktop uses process lanes; mobile turns lanes into ordered cards with the current step and action visible.

Chinese implementation notes:

- 按钮细节：使用线性按钮、紧凑动作标签，以及增强规则线系统的焦点态。
- 提示与反馈：使用规则线分隔 banner、内联审计说明和可见状态 chip，不用柔阴影。
- 间距系统：网格间距 20-24px，1px 分割线，证据行 12px，严格对齐。
- 响应式策略：桌面使用流程泳道；手机把泳道变成有序卡片，并显示当前步骤和操作。

## Page Adaptation Guide

- Landing page: Use a structured process map, evidence panels, and precise conversion actions.
- Dashboard: Use workflow lanes, tables, audit evidence, status chips, and rule-based grouping.
- Admin panel: Use B2B forms, approval tables, permissions, and line-separated validation.
- Forms, tables, and data: Use strict alignment, visible labels, compact errors, and clear section dividers.
- Mobile: Turn lanes into ordered cards with current step and action visible before evidence.
- Not a good fit for: Weak for playful campaigns or pages that need emotional softness.

## Usage Notes

- Let borders organize information before shadows do.
- Use diagrams, rails, and labeled groups.
- Keep the tone factual and composed.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 11 - Structured Lines as the page design direction.
Prompt type: Full Prompt.
Best fit: museum maps, workflow products, structured B2B sites.
Visual mood: Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy.
Scenario focus:
Landing adaptation: Use a structured process map, evidence panels, and precise conversion actions.
Dashboard adaptation: Use workflow lanes, tables, audit evidence, status chips, and rule-based grouping.
Admin adaptation: Use B2B forms, approval tables, permissions, and line-separated validation.
Forms/data adaptation: Use strict alignment, visible labels, compact errors, and clear section dividers.
Mobile adaptation: Turn lanes into ordered cards with current step and action visible before evidence.
Avoid for: Weak for playful campaigns or pages that need emotional softness.
Layout archetype: Line Museum Plan.
Layout structure: Floor-plan layout with route lines, numbered exhibition stops, labels, guide notes, and accessibility callouts.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fbfcfe; surface #ffffff; text #111827; muted #6b7280; primary #1d4ed8; accent #22c55e; border #d7dde8; radius 4px; shadow/material 0 18px 45px rgba(15, 23, 42, .07).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use factual captions, exact numbering, map labels, and compact guide copy.
Components: Route nodes, wall labels, stop cards, rest points, and export controls should rely on lines before shadows.
Buttons: Use disciplined rectangular controls aligned to the plan grid.
Button details: Use line-based buttons, compact action labels, and focus states that strengthen the rule system.
Feedback and alerts: Use rule-separated banners, inline audit notes, and visible state chips without soft shadows.
Spacing system: Use 20-24px grid gutters, 1px dividers, 12px evidence rows, and strict alignment.
Responsive behavior: Desktop uses process lanes; mobile turns lanes into ordered cards with the current step and action visible.
Icons and media: Use gallery maps, object labels, accessibility routes, and docent timing notes.
States: Show current stop, quiet seat, label proof, route open, blocked path, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Gallery Route / Exhibition route map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not replace the plan with decorative cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 11 - Structured Lines as the page design direction.
Prompt type: Landing Page.
Best fit: museum maps, workflow products, structured B2B sites.
Visual mood: Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy.
Scenario focus:
Landing page focus: Use a structured process map, evidence panels, and precise conversion actions.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Line Museum Plan.
Layout structure: Floor-plan layout with route lines, numbered exhibition stops, labels, guide notes, and accessibility callouts.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fbfcfe; surface #ffffff; text #111827; muted #6b7280; primary #1d4ed8; accent #22c55e; border #d7dde8; radius 4px; shadow/material 0 18px 45px rgba(15, 23, 42, .07).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use factual captions, exact numbering, map labels, and compact guide copy.
Components: Route nodes, wall labels, stop cards, rest points, and export controls should rely on lines before shadows.
Buttons: Use disciplined rectangular controls aligned to the plan grid.
Button details: Use line-based buttons, compact action labels, and focus states that strengthen the rule system.
Feedback and alerts: Use rule-separated banners, inline audit notes, and visible state chips without soft shadows.
Spacing system: Use 20-24px grid gutters, 1px dividers, 12px evidence rows, and strict alignment.
Responsive behavior: Desktop uses process lanes; mobile turns lanes into ordered cards with the current step and action visible.
Icons and media: Use gallery maps, object labels, accessibility routes, and docent timing notes.
States: Show current stop, quiet seat, label proof, route open, blocked path, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Gallery Route / Exhibition route map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not replace the plan with decorative cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 11 - Structured Lines as the page design direction.
Prompt type: Dashboard.
Best fit: museum maps, workflow products, structured B2B sites.
Visual mood: Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy.
Scenario focus:
Dashboard focus: Use workflow lanes, tables, audit evidence, status chips, and rule-based grouping.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Line Museum Plan.
Layout structure: Floor-plan layout with route lines, numbered exhibition stops, labels, guide notes, and accessibility callouts.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fbfcfe; surface #ffffff; text #111827; muted #6b7280; primary #1d4ed8; accent #22c55e; border #d7dde8; radius 4px; shadow/material 0 18px 45px rgba(15, 23, 42, .07).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use factual captions, exact numbering, map labels, and compact guide copy.
Components: Route nodes, wall labels, stop cards, rest points, and export controls should rely on lines before shadows.
Buttons: Use disciplined rectangular controls aligned to the plan grid.
Button details: Use line-based buttons, compact action labels, and focus states that strengthen the rule system.
Feedback and alerts: Use rule-separated banners, inline audit notes, and visible state chips without soft shadows.
Spacing system: Use 20-24px grid gutters, 1px dividers, 12px evidence rows, and strict alignment.
Responsive behavior: Desktop uses process lanes; mobile turns lanes into ordered cards with the current step and action visible.
Icons and media: Use gallery maps, object labels, accessibility routes, and docent timing notes.
States: Show current stop, quiet seat, label proof, route open, blocked path, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Gallery Route / Exhibition route map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not replace the plan with decorative cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 11 - Structured Lines as the page design direction.
Prompt type: Admin Panel.
Best fit: museum maps, workflow products, structured B2B sites.
Visual mood: Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy.
Scenario focus:
Admin panel focus: Use B2B forms, approval tables, permissions, and line-separated validation.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Line Museum Plan.
Layout structure: Floor-plan layout with route lines, numbered exhibition stops, labels, guide notes, and accessibility callouts.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fbfcfe; surface #ffffff; text #111827; muted #6b7280; primary #1d4ed8; accent #22c55e; border #d7dde8; radius 4px; shadow/material 0 18px 45px rgba(15, 23, 42, .07).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use factual captions, exact numbering, map labels, and compact guide copy.
Components: Route nodes, wall labels, stop cards, rest points, and export controls should rely on lines before shadows.
Buttons: Use disciplined rectangular controls aligned to the plan grid.
Button details: Use line-based buttons, compact action labels, and focus states that strengthen the rule system.
Feedback and alerts: Use rule-separated banners, inline audit notes, and visible state chips without soft shadows.
Spacing system: Use 20-24px grid gutters, 1px dividers, 12px evidence rows, and strict alignment.
Responsive behavior: Desktop uses process lanes; mobile turns lanes into ordered cards with the current step and action visible.
Icons and media: Use gallery maps, object labels, accessibility routes, and docent timing notes.
States: Show current stop, quiet seat, label proof, route open, blocked path, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Gallery Route / Exhibition route map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not replace the plan with decorative cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 11 - Structured Lines as the page design direction.
Prompt type: Mobile.
Best fit: museum maps, workflow products, structured B2B sites.
Visual mood: Fine line frames, structured rhythm, professional seriousness, and clear information hierarchy.
Scenario focus:
Mobile focus: Turn lanes into ordered cards with current step and action visible before evidence.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Line Museum Plan.
Layout structure: Floor-plan layout with route lines, numbered exhibition stops, labels, guide notes, and accessibility callouts.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fbfcfe; surface #ffffff; text #111827; muted #6b7280; primary #1d4ed8; accent #22c55e; border #d7dde8; radius 4px; shadow/material 0 18px 45px rgba(15, 23, 42, .07).
Geometry: panel radius 4px; control radius 2px; chip/state radius 0; media radius 4px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use factual captions, exact numbering, map labels, and compact guide copy.
Components: Route nodes, wall labels, stop cards, rest points, and export controls should rely on lines before shadows.
Buttons: Use disciplined rectangular controls aligned to the plan grid.
Button details: Use line-based buttons, compact action labels, and focus states that strengthen the rule system.
Feedback and alerts: Use rule-separated banners, inline audit notes, and visible state chips without soft shadows.
Spacing system: Use 20-24px grid gutters, 1px dividers, 12px evidence rows, and strict alignment.
Responsive behavior: Desktop uses process lanes; mobile turns lanes into ordered cards with the current step and action visible.
Icons and media: Use gallery maps, object labels, accessibility routes, and docent timing notes.
States: Show current stop, quiet seat, label proof, route open, blocked path, and exported states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Gallery Route / Exhibition route map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not replace the plan with decorative cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
