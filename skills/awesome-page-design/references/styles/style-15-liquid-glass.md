# Style 15 - Liquid Glass (液态玻璃)

## Summary

Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.

Chinese summary: 毛玻璃、透明层次、磨砂质感、科技感和未来感。

## Best For

botanical maps, spatial dashboards, premium futuristic tools

## Example Scenario

- Product sample: Glasshouse Nine
- Page job: Botanical glasshouse map
- Headline: Float humidity, watering, and visitor paths over a living conservatory.
- Primary action: Open canopy map
- Secondary action: Schedule watering

## Scenario Components

- Living map: Glass layers sit over beds, paths, and climate zones instead of a generic sci-fi background.
- Readable translucency: Tint and borders protect text while still feeling like glass.
- Garden operations: Visitor route, water schedule, and climate status are visible at once.

## Example States

- Fern room: Stable
- Orchid mist: Due
- West path: Open

## Layout Pattern

- Pattern: Glasshouse Climate Map (玻璃温室气候图)
- Archetype: Glasshouse Climate Map
- Structure: Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use clean futuristic labels with high contrast over every glass layer.
- Components: Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.
- Buttons: Use bordered glass controls and bright active states that do not rely on blur alone.
- Icons and media: Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.
- States: Show stable, due, open path, climate drift, selected zone, and mist running states.
- Avoid: Do not put low-contrast text over busy translucent scenery.

## Visual Language

- Background: `#07111f`
- Surface: `rgba(255,255,255,.13)`
- Text: `#f8fbff`
- Muted text: `#b9c5d6`
- Primary: `#dff7ff`
- Accent: `#8b5cf6`
- Border: `rgba(255,255,255,.26)`
- Radius: `24px`
- Panel radius: `24px`
- Control radius: `14px`
- Chip radius: `10px`
- Media radius: `20px`
- Geometry rule: glass curves balanced by visible structure; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 28px 90px rgba(15, 23, 42, .45)`

## Component Detail System

- Button system: Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.
- Feedback and alerts: Use translucent toasts, map-layer alerts, and readable inline status cards over glass.
- Spacing system: Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.
- Responsive behavior: Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.

Chinese implementation notes:

- 按钮细节：使用带可见边框的玻璃按钮、可读标签，以及基于色调而不是只靠模糊的 hover。
- 提示与反馈：使用半透明 toast、地图层提示，以及玻璃上可读的内联状态卡。
- 间距系统：玻璃面板 20-28px，透明层间距 14px，文本下方背景稳定。
- 响应式策略：桌面可拆分地图和控件；手机在操作更重要时把控件放到地图前。

## Page Adaptation Guide

- Landing page: Use a glass map or spatial product story with readable translucent panels and stable media backdrops.
- Dashboard: Use signal layers, selected rooms, map pins, translucent controls, and readable alerts.
- Admin panel: Use for premium spatial tools, not conventional back-office CRUD unless the map/object is central.
- Forms, tables, and data: Use glass fields only over stable surfaces; focus and errors need visible borders and text.
- Mobile: Place controls above ambience when action matters; keep glass panels readable over every background.
- Not a good fit for: Weak for low-power devices, accessibility-critical dense forms, or plain official portals.

## Usage Notes

- Layer translucent panels over vivid but softened media.
- Use blur, tint, and borders to keep text readable.
- Avoid low-contrast glass over busy images.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
