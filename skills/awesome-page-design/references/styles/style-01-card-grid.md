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

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
