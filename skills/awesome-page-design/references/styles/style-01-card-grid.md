# Style 01 - Card Grid (卡片网格)

## Summary

Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.

Chinese summary: 浅色中性画布、紫色强调、卡片网格节奏、统计数据、搜索和易扫描的总览界面。

## Best For

dashboards, catalogs, overview pages

## Example Scenario

- Product sample: OpsGrid
- Page job: Inventory command center
- Headline: Spot late handoffs before the morning standup.
- Primary action: Review exceptions
- Secondary action: Open route map

## Scenario Components

- Exception lanes: Separate inventory, delivery, and approval issues so operators know where to act first.
- Owner clarity: Every card carries owner, priority, due window, and the next required action.
- Dense scanning: Stats, search, filters, and compact cards work together without becoming a flat grid.

## Example States

- Backroom count drift: High
- West route delayed: 2 stops
- Cold storage check: Ready

## Layout Pattern

- Pattern: Operational Card Board (运营卡片看板)
- Archetype: Operational Card Board
- Structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
- Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
- Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
- Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
- States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
- Avoid: Do not turn it into a generic marketing hero or three equal feature cards.

## Visual Language

- Background: `#f5f6fa`
- Surface: `#ffffff`
- Text: `#1a1a2e`
- Muted text: `#64648a`
- Primary: `#7c3aed`
- Accent: `#8b5cf6`
- Border: `#e5e7ef`
- Radius: `10px`
- Panel radius: `10px`
- Control radius: `6px`
- Chip radius: `4px`
- Media radius: `8px`
- Geometry rule: structured small-radius cards with sharper controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 48px rgba(26, 26, 46, .10)`

## Component Detail System

- Button system: Use compact solid primary buttons, quiet bordered secondary buttons, square-ish filter chips, and loading buttons that keep the same width.
- Feedback and alerts: Use inline warnings near the affected row, small status toasts for saved actions, and visible stale/error chips inside the board.
- Spacing system: Use 24px page gutters, 16-20px panel padding, 10-12px row gaps, and dense 42-48px controls for operational scanning.
- Responsive behavior: Desktop keeps filter rail, board, and inspector visible; tablet stacks inspector below the board; mobile turns filters into chips above the list and keeps the primary action after the page title.

Chinese implementation notes:

- 按钮细节：使用紧凑实色主按钮、低调描边次按钮、偏方形筛选 chip，以及保持宽度稳定的加载按钮。
- 提示与反馈：在受影响行附近显示内联警告，保存操作使用小型状态 toast，并在看板内显示 stale/error chip。
- 间距系统：页面留白 24px，面板内边距 16-20px，行间距 10-12px，控件高度 42-48px，便于运营扫描。
- 响应式策略：桌面保留筛选栏、看板和检查面板；平板把检查面板下移；手机把筛选栏变成顶部 chip，并让主操作紧跟标题。

## Page Adaptation Guide

- Landing page: Use a proof-led product overview with metrics, workflow screenshots, and one calm conversion action; avoid a decorative hero-only page.
- Dashboard: Use filter rail, metric row, exception cards, owner/status fields, and a right-side inspector for next actions.
- Admin panel: Use compact tables, bulk actions, saved views, row-level warnings, and audit-friendly detail drawers.
- Forms, tables, and data: Use visible labels, compact helper text, short grouped forms, and inline validation close to the affected row.
- Mobile: Place title, current status, primary action, filter chips, list, then inspector details; avoid squeezing a desktop board.
- Not a good fit for: Weak for expressive fashion, immersive art, or pages that need emotional hero storytelling.

## Usage Notes

- Keep cards scannable and varied by job.
- Use search and stats as first-class visual anchors.
- Avoid collapsing the style into a generic admin shell.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Full Prompt.
Best fit: dashboards, catalogs, overview pages.
Visual mood: Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.
Scenario focus:
Landing adaptation: Use a proof-led product overview with metrics, workflow screenshots, and one calm conversion action; avoid a decorative hero-only page.
Dashboard adaptation: Use filter rail, metric row, exception cards, owner/status fields, and a right-side inspector for next actions.
Admin adaptation: Use compact tables, bulk actions, saved views, row-level warnings, and audit-friendly detail drawers.
Forms/data adaptation: Use visible labels, compact helper text, short grouped forms, and inline validation close to the affected row.
Mobile adaptation: Place title, current status, primary action, filter chips, list, then inspector details; avoid squeezing a desktop board.
Avoid for: Weak for expressive fashion, immersive art, or pages that need emotional hero storytelling.
Layout archetype: Operational Card Board.
Layout structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f5f6fa; surface #ffffff; text #1a1a2e; muted #64648a; primary #7c3aed; accent #8b5cf6; border #e5e7ef; radius 10px; shadow/material 0 18px 48px rgba(26, 26, 46, .10).
Geometry: panel radius 10px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact solid primary buttons, quiet bordered secondary buttons, square-ish filter chips, and loading buttons that keep the same width.
Feedback and alerts: Use inline warnings near the affected row, small status toasts for saved actions, and visible stale/error chips inside the board.
Spacing system: Use 24px page gutters, 16-20px panel padding, 10-12px row gaps, and dense 42-48px controls for operational scanning.
Responsive behavior: Desktop keeps filter rail, board, and inspector visible; tablet stacks inspector below the board; mobile turns filters into chips above the list and keeps the primary action after the page title.
Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsGrid / Inventory command center" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn it into a generic marketing hero or three equal feature cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Landing Page.
Best fit: dashboards, catalogs, overview pages.
Visual mood: Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.
Scenario focus:
Landing page focus: Use a proof-led product overview with metrics, workflow screenshots, and one calm conversion action; avoid a decorative hero-only page.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Operational Card Board.
Layout structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f5f6fa; surface #ffffff; text #1a1a2e; muted #64648a; primary #7c3aed; accent #8b5cf6; border #e5e7ef; radius 10px; shadow/material 0 18px 48px rgba(26, 26, 46, .10).
Geometry: panel radius 10px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact solid primary buttons, quiet bordered secondary buttons, square-ish filter chips, and loading buttons that keep the same width.
Feedback and alerts: Use inline warnings near the affected row, small status toasts for saved actions, and visible stale/error chips inside the board.
Spacing system: Use 24px page gutters, 16-20px panel padding, 10-12px row gaps, and dense 42-48px controls for operational scanning.
Responsive behavior: Desktop keeps filter rail, board, and inspector visible; tablet stacks inspector below the board; mobile turns filters into chips above the list and keeps the primary action after the page title.
Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsGrid / Inventory command center" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn it into a generic marketing hero or three equal feature cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Dashboard.
Best fit: dashboards, catalogs, overview pages.
Visual mood: Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.
Scenario focus:
Dashboard focus: Use filter rail, metric row, exception cards, owner/status fields, and a right-side inspector for next actions.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Operational Card Board.
Layout structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f5f6fa; surface #ffffff; text #1a1a2e; muted #64648a; primary #7c3aed; accent #8b5cf6; border #e5e7ef; radius 10px; shadow/material 0 18px 48px rgba(26, 26, 46, .10).
Geometry: panel radius 10px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact solid primary buttons, quiet bordered secondary buttons, square-ish filter chips, and loading buttons that keep the same width.
Feedback and alerts: Use inline warnings near the affected row, small status toasts for saved actions, and visible stale/error chips inside the board.
Spacing system: Use 24px page gutters, 16-20px panel padding, 10-12px row gaps, and dense 42-48px controls for operational scanning.
Responsive behavior: Desktop keeps filter rail, board, and inspector visible; tablet stacks inspector below the board; mobile turns filters into chips above the list and keeps the primary action after the page title.
Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsGrid / Inventory command center" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn it into a generic marketing hero or three equal feature cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Admin Panel.
Best fit: dashboards, catalogs, overview pages.
Visual mood: Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.
Scenario focus:
Admin panel focus: Use compact tables, bulk actions, saved views, row-level warnings, and audit-friendly detail drawers.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Operational Card Board.
Layout structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f5f6fa; surface #ffffff; text #1a1a2e; muted #64648a; primary #7c3aed; accent #8b5cf6; border #e5e7ef; radius 10px; shadow/material 0 18px 48px rgba(26, 26, 46, .10).
Geometry: panel radius 10px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact solid primary buttons, quiet bordered secondary buttons, square-ish filter chips, and loading buttons that keep the same width.
Feedback and alerts: Use inline warnings near the affected row, small status toasts for saved actions, and visible stale/error chips inside the board.
Spacing system: Use 24px page gutters, 16-20px panel padding, 10-12px row gaps, and dense 42-48px controls for operational scanning.
Responsive behavior: Desktop keeps filter rail, board, and inspector visible; tablet stacks inspector below the board; mobile turns filters into chips above the list and keeps the primary action after the page title.
Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsGrid / Inventory command center" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn it into a generic marketing hero or three equal feature cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Mobile.
Best fit: dashboards, catalogs, overview pages.
Visual mood: Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.
Scenario focus:
Mobile focus: Place title, current status, primary action, filter chips, list, then inspector details; avoid squeezing a desktop board.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Operational Card Board.
Layout structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f5f6fa; surface #ffffff; text #1a1a2e; muted #64648a; primary #7c3aed; accent #8b5cf6; border #e5e7ef; radius 10px; shadow/material 0 18px 48px rgba(26, 26, 46, .10).
Geometry: panel radius 10px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact solid primary buttons, quiet bordered secondary buttons, square-ish filter chips, and loading buttons that keep the same width.
Feedback and alerts: Use inline warnings near the affected row, small status toasts for saved actions, and visible stale/error chips inside the board.
Spacing system: Use 24px page gutters, 16-20px panel padding, 10-12px row gaps, and dense 42-48px controls for operational scanning.
Responsive behavior: Desktop keeps filter rail, board, and inspector visible; tablet stacks inspector below the board; mobile turns filters into chips above the list and keeps the primary action after the page title.
Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsGrid / Inventory command center" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn it into a generic marketing hero or three equal feature cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
