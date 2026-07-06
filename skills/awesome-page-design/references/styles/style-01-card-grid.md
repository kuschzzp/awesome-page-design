# Style 01 - Card Grid (卡片网格)

## Summary

Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels.

Chinese summary: 真实后台外壳、白色侧栏、白色顶栏、灰蓝工作区、指标卡、快捷入口、筛选栏、密集表格和工具面板。

## Best For

admin panels, enterprise consoles, permission systems, operations dashboards

## Example Scenario

- Product sample: OpsFlow
- Page job: Operations management dashboard
- Headline: Run the daily admin workspace from one dense console.
- Primary action: New record
- Secondary action: More actions

## Scenario Components

- Application shell first: Sidebar modules, top search, page tabs, and workspace panels establish a real system before any decorative styling.
- Operational density: KPI cards, quick actions, filters, tables, charts, rankings, approvals, and schedules share one scan-friendly grid.
- Admin-specific states: Selected menu items, disabled tools, empty states, warning rows, approval tabs, and row actions stay visible.

## Example States

- Sales contract approval: Pending
- Inactive account follow-up: Warning
- Monthly audit export: Ready

## Layout Pattern

- Pattern: Blue Admin Console (浅蓝后台控制台)
- Archetype: Blue Admin Console
- Structure: Full admin application shell: white sidebar, white top bar, breadcrumb/tab strip, gray-blue workspace, KPI row, quick entries, chart cards, ranking panel, approval/calendar widgets, and a dense data table.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use compact sans-serif UI text, practical section titles, tabular numerals, muted labels, and table-first hierarchy instead of hero-scale headings.
- Components: Persistent sidebar navigation, top search, icon buttons, account menu, active tabs, KPI cards, shortcut tiles, filter toolbar, date range controls, status chips, data tables, charts, approval tabs, ranking lists, and calendar strips should feel like one admin system.
- Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
- Icons and media: Use real interface evidence: table rows, chart grids, ranked lists, empty states, approval panes, calendars, and product screenshots instead of abstract hero art.
- States: Show selected sidebar item, active tab, search/filter state, pending approvals, warning rows, empty tables, disabled tools, loading rows, and focus rings clearly.
- Avoid: Do not use marketing hero sections, oversized display copy, decorative card walls, abstract dashboards, or isolated cards without navigation context.

## Visual Language

- Background: `#eef6ff`
- Surface: `#ffffff`
- Text: `#0f172a`
- Muted text: `#64748b`
- Primary: `#1677ff`
- Accent: `#0ea5e9`
- Border: `#d7e7fb`
- Radius: `8px`
- Panel radius: `8px`
- Control radius: `6px`
- Chip radius: `4px`
- Media radius: `8px`
- Geometry rule: real admin shell geometry with compact panels, dense rows, and precise controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 46px rgba(22, 119, 255, .10)`

## Component Detail System

- Button system: Use compact blue primary buttons, quiet bordered secondary buttons, square icon tools, tab buttons, and stable loading buttons inside the top bar or table toolbar.
- Feedback and alerts: Use selected sidebar states, active tabs, row-local warnings, small status toasts, empty table states, pending chips, and disabled tools in the same admin language.
- Spacing system: Use a 220-260px sidebar, 56-72px top bar, 16-20px workspace gutters, 14-18px panel padding, 8-12px row gaps, and 40-44px controls for repeated scanning.
- Responsive behavior: Desktop keeps sidebar, top bar, KPI row, chart/ranking panels, and table visible; tablet collapses right panels below; mobile turns sidebar into a horizontal module strip and makes tables horizontally scrollable.

Chinese implementation notes:

- 按钮细节：使用紧凑蓝色主按钮、低调描边次按钮、方形图标工具、标签按钮，以及在顶栏或表格工具条内保持宽度稳定的加载按钮。
- 提示与反馈：用同一套后台语言呈现侧栏选中、激活标签、行内警告、小型状态 toast、空表格、待处理标签和禁用工具。
- 间距系统：侧栏 220-260px，顶栏 56-72px，工作区留白 16-20px，面板内边距 14-18px，行间距 8-12px，控件 40-44px，适合反复扫描。
- 响应式策略：桌面保留侧栏、顶栏、指标行、图表/排行面板和表格；平板把右侧面板下移；手机把侧栏变成横向模块条，并让表格可横向滚动。

## Page Adaptation Guide

- Landing page: Use only when the public page needs to show an actual admin product screenshot; the screenshot should still include sidebar, top bar, tables, filters, and widgets.
- Dashboard: Use a real app shell with white sidebar, top search, page tabs, KPI row, quick entries, chart cards, ranking lists, approval panes, and calendar widgets.
- Admin panel: Use compact tables, toolbar filters, date ranges, bulk actions, column settings, row-level status, empty states, permission controls, and detail drawers.
- Forms, tables, and data: Use visible labels, compact helper text, grouped sections, inline validation, table-adjacent editing, permission warnings, and save/cancel toolbars.
- Mobile: Turn sidebar navigation into a horizontal module strip, keep the page title and primary action near the top, stack widgets, and make dense tables scroll horizontally.
- Not a good fit for: Weak for expressive fashion, immersive art, or pages that need emotional hero storytelling instead of management clarity.

## Usage Notes

- Start with the admin application frame: sidebar, top bar, breadcrumb or tabs, workspace, and table-first modules.
- Use search, filters, KPI cards, quick entries, ranking lists, calendars, approvals, and dense tables as real management anchors.
- Avoid hero sections, decorative card walls, oversized marketing typography, and abstract product art.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Full Prompt.
Best fit: admin panels, enterprise consoles, permission systems, operations dashboards.
Visual mood: Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels.
Scenario focus:
Landing adaptation: Use only when the public page needs to show an actual admin product screenshot; the screenshot should still include sidebar, top bar, tables, filters, and widgets.
Dashboard adaptation: Use a real app shell with white sidebar, top search, page tabs, KPI row, quick entries, chart cards, ranking lists, approval panes, and calendar widgets.
Admin adaptation: Use compact tables, toolbar filters, date ranges, bulk actions, column settings, row-level status, empty states, permission controls, and detail drawers.
Forms/data adaptation: Use visible labels, compact helper text, grouped sections, inline validation, table-adjacent editing, permission warnings, and save/cancel toolbars.
Mobile adaptation: Turn sidebar navigation into a horizontal module strip, keep the page title and primary action near the top, stack widgets, and make dense tables scroll horizontally.
Avoid for: Weak for expressive fashion, immersive art, or pages that need emotional hero storytelling instead of management clarity.
Layout archetype: Blue Admin Console.
Layout structure: Full admin application shell: white sidebar, white top bar, breadcrumb/tab strip, gray-blue workspace, KPI row, quick entries, chart cards, ranking panel, approval/calendar widgets, and a dense data table.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #eef6ff; surface #ffffff; text #0f172a; muted #64748b; primary #1677ff; accent #0ea5e9; border #d7e7fb; radius 8px; shadow/material 0 18px 46px rgba(22, 119, 255, .10).
Geometry: panel radius 8px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, practical section titles, tabular numerals, muted labels, and table-first hierarchy instead of hero-scale headings.
Components: Persistent sidebar navigation, top search, icon buttons, account menu, active tabs, KPI cards, shortcut tiles, filter toolbar, date range controls, status chips, data tables, charts, approval tabs, ranking lists, and calendar strips should feel like one admin system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact blue primary buttons, quiet bordered secondary buttons, square icon tools, tab buttons, and stable loading buttons inside the top bar or table toolbar.
Feedback and alerts: Use selected sidebar states, active tabs, row-local warnings, small status toasts, empty table states, pending chips, and disabled tools in the same admin language.
Spacing system: Use a 220-260px sidebar, 56-72px top bar, 16-20px workspace gutters, 14-18px panel padding, 8-12px row gaps, and 40-44px controls for repeated scanning.
Responsive behavior: Desktop keeps sidebar, top bar, KPI row, chart/ranking panels, and table visible; tablet collapses right panels below; mobile turns sidebar into a horizontal module strip and makes tables horizontally scrollable.
Icons and media: Use real interface evidence: table rows, chart grids, ranked lists, empty states, approval panes, calendars, and product screenshots instead of abstract hero art.
States: Show selected sidebar item, active tab, search/filter state, pending approvals, warning rows, empty tables, disabled tools, loading rows, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsFlow / Operations management dashboard" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use marketing hero sections, oversized display copy, decorative card walls, abstract dashboards, or isolated cards without navigation context. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Landing Page.
Best fit: admin panels, enterprise consoles, permission systems, operations dashboards.
Visual mood: Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels.
Scenario focus:
Landing page focus: Use only when the public page needs to show an actual admin product screenshot; the screenshot should still include sidebar, top bar, tables, filters, and widgets.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Blue Admin Console.
Layout structure: Full admin application shell: white sidebar, white top bar, breadcrumb/tab strip, gray-blue workspace, KPI row, quick entries, chart cards, ranking panel, approval/calendar widgets, and a dense data table.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #eef6ff; surface #ffffff; text #0f172a; muted #64748b; primary #1677ff; accent #0ea5e9; border #d7e7fb; radius 8px; shadow/material 0 18px 46px rgba(22, 119, 255, .10).
Geometry: panel radius 8px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, practical section titles, tabular numerals, muted labels, and table-first hierarchy instead of hero-scale headings.
Components: Persistent sidebar navigation, top search, icon buttons, account menu, active tabs, KPI cards, shortcut tiles, filter toolbar, date range controls, status chips, data tables, charts, approval tabs, ranking lists, and calendar strips should feel like one admin system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact blue primary buttons, quiet bordered secondary buttons, square icon tools, tab buttons, and stable loading buttons inside the top bar or table toolbar.
Feedback and alerts: Use selected sidebar states, active tabs, row-local warnings, small status toasts, empty table states, pending chips, and disabled tools in the same admin language.
Spacing system: Use a 220-260px sidebar, 56-72px top bar, 16-20px workspace gutters, 14-18px panel padding, 8-12px row gaps, and 40-44px controls for repeated scanning.
Responsive behavior: Desktop keeps sidebar, top bar, KPI row, chart/ranking panels, and table visible; tablet collapses right panels below; mobile turns sidebar into a horizontal module strip and makes tables horizontally scrollable.
Icons and media: Use real interface evidence: table rows, chart grids, ranked lists, empty states, approval panes, calendars, and product screenshots instead of abstract hero art.
States: Show selected sidebar item, active tab, search/filter state, pending approvals, warning rows, empty tables, disabled tools, loading rows, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsFlow / Operations management dashboard" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use marketing hero sections, oversized display copy, decorative card walls, abstract dashboards, or isolated cards without navigation context. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Dashboard.
Best fit: admin panels, enterprise consoles, permission systems, operations dashboards.
Visual mood: Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels.
Scenario focus:
Dashboard focus: Use a real app shell with white sidebar, top search, page tabs, KPI row, quick entries, chart cards, ranking lists, approval panes, and calendar widgets.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Blue Admin Console.
Layout structure: Full admin application shell: white sidebar, white top bar, breadcrumb/tab strip, gray-blue workspace, KPI row, quick entries, chart cards, ranking panel, approval/calendar widgets, and a dense data table.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #eef6ff; surface #ffffff; text #0f172a; muted #64748b; primary #1677ff; accent #0ea5e9; border #d7e7fb; radius 8px; shadow/material 0 18px 46px rgba(22, 119, 255, .10).
Geometry: panel radius 8px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, practical section titles, tabular numerals, muted labels, and table-first hierarchy instead of hero-scale headings.
Components: Persistent sidebar navigation, top search, icon buttons, account menu, active tabs, KPI cards, shortcut tiles, filter toolbar, date range controls, status chips, data tables, charts, approval tabs, ranking lists, and calendar strips should feel like one admin system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact blue primary buttons, quiet bordered secondary buttons, square icon tools, tab buttons, and stable loading buttons inside the top bar or table toolbar.
Feedback and alerts: Use selected sidebar states, active tabs, row-local warnings, small status toasts, empty table states, pending chips, and disabled tools in the same admin language.
Spacing system: Use a 220-260px sidebar, 56-72px top bar, 16-20px workspace gutters, 14-18px panel padding, 8-12px row gaps, and 40-44px controls for repeated scanning.
Responsive behavior: Desktop keeps sidebar, top bar, KPI row, chart/ranking panels, and table visible; tablet collapses right panels below; mobile turns sidebar into a horizontal module strip and makes tables horizontally scrollable.
Icons and media: Use real interface evidence: table rows, chart grids, ranked lists, empty states, approval panes, calendars, and product screenshots instead of abstract hero art.
States: Show selected sidebar item, active tab, search/filter state, pending approvals, warning rows, empty tables, disabled tools, loading rows, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsFlow / Operations management dashboard" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use marketing hero sections, oversized display copy, decorative card walls, abstract dashboards, or isolated cards without navigation context. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Admin Panel.
Best fit: admin panels, enterprise consoles, permission systems, operations dashboards.
Visual mood: Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels.
Scenario focus:
Admin panel focus: Use compact tables, toolbar filters, date ranges, bulk actions, column settings, row-level status, empty states, permission controls, and detail drawers.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Blue Admin Console.
Layout structure: Full admin application shell: white sidebar, white top bar, breadcrumb/tab strip, gray-blue workspace, KPI row, quick entries, chart cards, ranking panel, approval/calendar widgets, and a dense data table.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #eef6ff; surface #ffffff; text #0f172a; muted #64748b; primary #1677ff; accent #0ea5e9; border #d7e7fb; radius 8px; shadow/material 0 18px 46px rgba(22, 119, 255, .10).
Geometry: panel radius 8px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, practical section titles, tabular numerals, muted labels, and table-first hierarchy instead of hero-scale headings.
Components: Persistent sidebar navigation, top search, icon buttons, account menu, active tabs, KPI cards, shortcut tiles, filter toolbar, date range controls, status chips, data tables, charts, approval tabs, ranking lists, and calendar strips should feel like one admin system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact blue primary buttons, quiet bordered secondary buttons, square icon tools, tab buttons, and stable loading buttons inside the top bar or table toolbar.
Feedback and alerts: Use selected sidebar states, active tabs, row-local warnings, small status toasts, empty table states, pending chips, and disabled tools in the same admin language.
Spacing system: Use a 220-260px sidebar, 56-72px top bar, 16-20px workspace gutters, 14-18px panel padding, 8-12px row gaps, and 40-44px controls for repeated scanning.
Responsive behavior: Desktop keeps sidebar, top bar, KPI row, chart/ranking panels, and table visible; tablet collapses right panels below; mobile turns sidebar into a horizontal module strip and makes tables horizontally scrollable.
Icons and media: Use real interface evidence: table rows, chart grids, ranked lists, empty states, approval panes, calendars, and product screenshots instead of abstract hero art.
States: Show selected sidebar item, active tab, search/filter state, pending approvals, warning rows, empty tables, disabled tools, loading rows, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsFlow / Operations management dashboard" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use marketing hero sections, oversized display copy, decorative card walls, abstract dashboards, or isolated cards without navigation context. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Prompt type: Mobile.
Best fit: admin panels, enterprise consoles, permission systems, operations dashboards.
Visual mood: Real admin shell with white sidebar, white top bar, gray-blue workspace, KPI cards, quick entries, filters, dense tables, and utility panels.
Scenario focus:
Mobile focus: Turn sidebar navigation into a horizontal module strip, keep the page title and primary action near the top, stack widgets, and make dense tables scroll horizontally.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Blue Admin Console.
Layout structure: Full admin application shell: white sidebar, white top bar, breadcrumb/tab strip, gray-blue workspace, KPI row, quick entries, chart cards, ranking panel, approval/calendar widgets, and a dense data table.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #eef6ff; surface #ffffff; text #0f172a; muted #64748b; primary #1677ff; accent #0ea5e9; border #d7e7fb; radius 8px; shadow/material 0 18px 46px rgba(22, 119, 255, .10).
Geometry: panel radius 8px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, practical section titles, tabular numerals, muted labels, and table-first hierarchy instead of hero-scale headings.
Components: Persistent sidebar navigation, top search, icon buttons, account menu, active tabs, KPI cards, shortcut tiles, filter toolbar, date range controls, status chips, data tables, charts, approval tabs, ranking lists, and calendar strips should feel like one admin system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Button details: Use compact blue primary buttons, quiet bordered secondary buttons, square icon tools, tab buttons, and stable loading buttons inside the top bar or table toolbar.
Feedback and alerts: Use selected sidebar states, active tabs, row-local warnings, small status toasts, empty table states, pending chips, and disabled tools in the same admin language.
Spacing system: Use a 220-260px sidebar, 56-72px top bar, 16-20px workspace gutters, 14-18px panel padding, 8-12px row gaps, and 40-44px controls for repeated scanning.
Responsive behavior: Desktop keeps sidebar, top bar, KPI row, chart/ranking panels, and table visible; tablet collapses right panels below; mobile turns sidebar into a horizontal module strip and makes tables horizontally scrollable.
Icons and media: Use real interface evidence: table rows, chart grids, ranked lists, empty states, approval panes, calendars, and product screenshots instead of abstract hero art.
States: Show selected sidebar item, active tab, search/filter state, pending approvals, warning rows, empty tables, disabled tools, loading rows, and focus rings clearly.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "OpsFlow / Operations management dashboard" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use marketing hero sections, oversized display copy, decorative card walls, abstract dashboards, or isolated cards without navigation context. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
