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

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
