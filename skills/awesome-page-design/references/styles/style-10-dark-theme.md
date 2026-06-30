# Style 10 - Dark Theme (深色主题)

## Summary

Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.

Chinese summary: 暗背景、高对比度，并用单色亮色强化主按钮和主视觉。

## Best For

micro-cinemas, creative studios, premium launch pages

## Example Scenario

- Product sample: Velvet Screen
- Page job: Micro-cinema program
- Headline: Stage tonight's screening with reels, seats, and projection notes.
- Primary action: Hold two seats
- Secondary action: View program

## Scenario Components

- Frame led layout: The main viewer behaves like a screening window, with reel notes and seat status attached.
- Night atmosphere: Dark panels and a single bright action support the cinema mood without hiding details.
- Operational culture: Program order, cue sheet, and booth status make the page useful, not only pretty.

## Example States

- Short reel: Queued
- Row C: Held
- Booth note: Ready

## Layout Pattern

- Pattern: Dark Cinema Review (暗色影院审阅)
- Archetype: Dark Cinema Review
- Structure: Cinematic venue board with a screening frame, program strip, seat ledger, booth status, and night-mode actions.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use high-contrast dark UI text, restrained labels, and cinematic but readable titles.
- Components: Screen frames, film strips, seat holds, booth notes, and program cards should feel operational.
- Buttons: Primary action is bright and focused; secondary actions use dark outlines.
- Icons and media: Use reels, frame crops, reserved rows, cue sheets, and booth readiness notes.
- States: Show queued, held, ready, late doors, sold out, and booth warning states.
- Avoid: Do not use dark cards without a media or venue structure.

## Visual Language

- Background: `#050505`
- Surface: `#111113`
- Text: `#f8fafc`
- Muted text: `#a1a1aa`
- Primary: `#ffffff`
- Accent: `#7dd3fc`
- Border: `#27272a`
- Radius: `8px`
- Panel radius: `8px`
- Control radius: `4px`
- Chip radius: `2px`
- Media radius: `6px`
- Geometry rule: cinematic dark surfaces with compact angular controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 24px 90px rgba(125, 211, 252, .14)`

## Component Detail System

- Button system: Use high-contrast dark buttons, cinematic hover states, and loading states that feel like render progress.
- Feedback and alerts: Use dark toasts, cost warnings, render-complete confirmations, and visible retry actions.
- Spacing system: Use 20-28px panels, 14px media gaps, and clear separation between viewer and queue.
- Responsive behavior: Desktop keeps viewer and queue split; mobile shows viewer, primary render action, then queue and budget details.

Chinese implementation notes:

- 按钮细节：使用高对比暗色按钮、电影感 hover，以及像渲染进度的加载态。
- 提示与反馈：使用暗色 toast、成本警告、渲染完成确认和可见重试操作。
- 间距系统：面板内边距 20-28px，媒体间距 14px，查看器和队列清楚分隔。
- 响应式策略：桌面拆分查看器和队列；手机先查看器，再主渲染操作，之后队列和预算。

## Page Adaptation Guide

- Landing page: Use a cinematic viewer, render proof, budget/status warnings, and one bright primary action.
- Dashboard: Use render queues, review states, media thumbnails, failure badges, and retry actions.
- Admin panel: Use dark production controls, batch review tables, and visible cost/error states.
- Forms, tables, and data: Use dark fields, high-contrast labels, stable loading buttons, and retry-focused errors.
- Mobile: Show viewer, primary action, queue, then budget and errors; avoid hiding retry actions.
- Not a good fit for: Weak for text-heavy documentation or low-contrast casual reading.

## Usage Notes

- Reserve the bright accent for conversion and focus.
- Use deep blacks with subtle panel separation.
- Keep imagery cinematic but readable.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 10 - Dark Theme as the page design direction.
Prompt type: Full Prompt.
Best fit: micro-cinemas, creative studios, premium launch pages.
Visual mood: Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.
Scenario focus:
Landing adaptation: Use a cinematic viewer, render proof, budget/status warnings, and one bright primary action.
Dashboard adaptation: Use render queues, review states, media thumbnails, failure badges, and retry actions.
Admin adaptation: Use dark production controls, batch review tables, and visible cost/error states.
Forms/data adaptation: Use dark fields, high-contrast labels, stable loading buttons, and retry-focused errors.
Mobile adaptation: Show viewer, primary action, queue, then budget and errors; avoid hiding retry actions.
Avoid for: Weak for text-heavy documentation or low-contrast casual reading.
Layout archetype: Dark Cinema Review.
Layout structure: Cinematic venue board with a screening frame, program strip, seat ledger, booth status, and night-mode actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050505; surface #111113; text #f8fafc; muted #a1a1aa; primary #ffffff; accent #7dd3fc; border #27272a; radius 8px; shadow/material 0 24px 90px rgba(125, 211, 252, .14).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use high-contrast dark UI text, restrained labels, and cinematic but readable titles.
Components: Screen frames, film strips, seat holds, booth notes, and program cards should feel operational.
Buttons: Primary action is bright and focused; secondary actions use dark outlines.
Button details: Use high-contrast dark buttons, cinematic hover states, and loading states that feel like render progress.
Feedback and alerts: Use dark toasts, cost warnings, render-complete confirmations, and visible retry actions.
Spacing system: Use 20-28px panels, 14px media gaps, and clear separation between viewer and queue.
Responsive behavior: Desktop keeps viewer and queue split; mobile shows viewer, primary render action, then queue and budget details.
Icons and media: Use reels, frame crops, reserved rows, cue sheets, and booth readiness notes.
States: Show queued, held, ready, late doors, sold out, and booth warning states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Velvet Screen / Micro-cinema program" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use dark cards without a media or venue structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 10 - Dark Theme as the page design direction.
Prompt type: Landing Page.
Best fit: micro-cinemas, creative studios, premium launch pages.
Visual mood: Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.
Scenario focus:
Landing page focus: Use a cinematic viewer, render proof, budget/status warnings, and one bright primary action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Dark Cinema Review.
Layout structure: Cinematic venue board with a screening frame, program strip, seat ledger, booth status, and night-mode actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050505; surface #111113; text #f8fafc; muted #a1a1aa; primary #ffffff; accent #7dd3fc; border #27272a; radius 8px; shadow/material 0 24px 90px rgba(125, 211, 252, .14).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use high-contrast dark UI text, restrained labels, and cinematic but readable titles.
Components: Screen frames, film strips, seat holds, booth notes, and program cards should feel operational.
Buttons: Primary action is bright and focused; secondary actions use dark outlines.
Button details: Use high-contrast dark buttons, cinematic hover states, and loading states that feel like render progress.
Feedback and alerts: Use dark toasts, cost warnings, render-complete confirmations, and visible retry actions.
Spacing system: Use 20-28px panels, 14px media gaps, and clear separation between viewer and queue.
Responsive behavior: Desktop keeps viewer and queue split; mobile shows viewer, primary render action, then queue and budget details.
Icons and media: Use reels, frame crops, reserved rows, cue sheets, and booth readiness notes.
States: Show queued, held, ready, late doors, sold out, and booth warning states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Velvet Screen / Micro-cinema program" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use dark cards without a media or venue structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 10 - Dark Theme as the page design direction.
Prompt type: Dashboard.
Best fit: micro-cinemas, creative studios, premium launch pages.
Visual mood: Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.
Scenario focus:
Dashboard focus: Use render queues, review states, media thumbnails, failure badges, and retry actions.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Dark Cinema Review.
Layout structure: Cinematic venue board with a screening frame, program strip, seat ledger, booth status, and night-mode actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050505; surface #111113; text #f8fafc; muted #a1a1aa; primary #ffffff; accent #7dd3fc; border #27272a; radius 8px; shadow/material 0 24px 90px rgba(125, 211, 252, .14).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use high-contrast dark UI text, restrained labels, and cinematic but readable titles.
Components: Screen frames, film strips, seat holds, booth notes, and program cards should feel operational.
Buttons: Primary action is bright and focused; secondary actions use dark outlines.
Button details: Use high-contrast dark buttons, cinematic hover states, and loading states that feel like render progress.
Feedback and alerts: Use dark toasts, cost warnings, render-complete confirmations, and visible retry actions.
Spacing system: Use 20-28px panels, 14px media gaps, and clear separation between viewer and queue.
Responsive behavior: Desktop keeps viewer and queue split; mobile shows viewer, primary render action, then queue and budget details.
Icons and media: Use reels, frame crops, reserved rows, cue sheets, and booth readiness notes.
States: Show queued, held, ready, late doors, sold out, and booth warning states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Velvet Screen / Micro-cinema program" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use dark cards without a media or venue structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 10 - Dark Theme as the page design direction.
Prompt type: Admin Panel.
Best fit: micro-cinemas, creative studios, premium launch pages.
Visual mood: Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.
Scenario focus:
Admin panel focus: Use dark production controls, batch review tables, and visible cost/error states.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Dark Cinema Review.
Layout structure: Cinematic venue board with a screening frame, program strip, seat ledger, booth status, and night-mode actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050505; surface #111113; text #f8fafc; muted #a1a1aa; primary #ffffff; accent #7dd3fc; border #27272a; radius 8px; shadow/material 0 24px 90px rgba(125, 211, 252, .14).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use high-contrast dark UI text, restrained labels, and cinematic but readable titles.
Components: Screen frames, film strips, seat holds, booth notes, and program cards should feel operational.
Buttons: Primary action is bright and focused; secondary actions use dark outlines.
Button details: Use high-contrast dark buttons, cinematic hover states, and loading states that feel like render progress.
Feedback and alerts: Use dark toasts, cost warnings, render-complete confirmations, and visible retry actions.
Spacing system: Use 20-28px panels, 14px media gaps, and clear separation between viewer and queue.
Responsive behavior: Desktop keeps viewer and queue split; mobile shows viewer, primary render action, then queue and budget details.
Icons and media: Use reels, frame crops, reserved rows, cue sheets, and booth readiness notes.
States: Show queued, held, ready, late doors, sold out, and booth warning states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Velvet Screen / Micro-cinema program" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use dark cards without a media or venue structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 10 - Dark Theme as the page design direction.
Prompt type: Mobile.
Best fit: micro-cinemas, creative studios, premium launch pages.
Visual mood: Dark background, high contrast, and one bright monochrome accent for primary actions and the main visual.
Scenario focus:
Mobile focus: Show viewer, primary action, queue, then budget and errors; avoid hiding retry actions.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Dark Cinema Review.
Layout structure: Cinematic venue board with a screening frame, program strip, seat ledger, booth status, and night-mode actions.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050505; surface #111113; text #f8fafc; muted #a1a1aa; primary #ffffff; accent #7dd3fc; border #27272a; radius 8px; shadow/material 0 24px 90px rgba(125, 211, 252, .14).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use high-contrast dark UI text, restrained labels, and cinematic but readable titles.
Components: Screen frames, film strips, seat holds, booth notes, and program cards should feel operational.
Buttons: Primary action is bright and focused; secondary actions use dark outlines.
Button details: Use high-contrast dark buttons, cinematic hover states, and loading states that feel like render progress.
Feedback and alerts: Use dark toasts, cost warnings, render-complete confirmations, and visible retry actions.
Spacing system: Use 20-28px panels, 14px media gaps, and clear separation between viewer and queue.
Responsive behavior: Desktop keeps viewer and queue split; mobile shows viewer, primary render action, then queue and budget details.
Icons and media: Use reels, frame crops, reserved rows, cue sheets, and booth readiness notes.
States: Show queued, held, ready, late doors, sold out, and booth warning states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Velvet Screen / Micro-cinema program" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use dark cards without a media or venue structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
