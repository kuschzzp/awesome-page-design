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

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
