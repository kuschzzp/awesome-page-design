# Style 14 - Neumorphism (新拟态)

## Summary

Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.

Chinese summary: 柔光、内凹层次感圆角、柔和阴影和触感表面。

## Best For

home devices, audio tools, calm utilities, wellness and focus products

## Example Scenario

- Product sample: Luma Shelf
- Page job: Tactile home light console
- Headline: Tune the evening shelf with soft light, music, and one calm timer.
- Primary action: Start evening scene
- Secondary action: Save preset

## Scenario Components

- Physical controls: Raised pads, inset wells, and a central dial make the page feel like a real object.
- Home scale: The interface focuses on a shelf, a lamp, and an evening routine rather than a dense dashboard.
- Soft states: Pressed, saved, dimmed, and timer states stay readable despite the gentle surface.

## Example States

- Reading glow: Active
- Rain track: Low
- Sunrise timer: Saved

## Layout Pattern

- Pattern: Neumo Lamp Console (新拟态灯光控制)
- Archetype: Neumo Lamp Console
- Structure: Tactile home console with raised lamp dial, inset timer, scene pads, audio strip, and saved evening routines.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use calm labels, large readable values, and limited headings for relaxed operation.
- Components: Dials, pads, inset meters, scene rows, and timer controls should feel physical and focused.
- Buttons: Use raised and pressed states with enough contrast for tactile controls.
- Icons and media: Use lamp glow, shelf surfaces, audio waves, and timer wells instead of finance widgets.
- States: Show active, saved, dimmed, timer running, muted, and pressed states.
- Avoid: Do not let soft shadows hide state or reduce readability.

## Visual Language

- Background: `#e9eef5`
- Surface: `#e9eef5`
- Text: `#172033`
- Muted text: `#667085`
- Primary: `#243b6b`
- Accent: `#6aa6ff`
- Border: `#f8fbff`
- Radius: `30px`
- Panel radius: `30px`
- Control radius: `22px`
- Chip radius: `18px`
- Media radius: `26px`
- Geometry rule: soft tactile curves for raised and inset controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86)`

## Component Detail System

- Button system: Use raised and inset tactile buttons, pressed states that sink inward, and loading states that keep the soft surface stable.
- Feedback and alerts: Use gentle inset alerts, saved-preset confirmations, and calm validation messages.
- Spacing system: Use 22-30px soft panels, 14-18px mixer gaps, and large tap targets.
- Responsive behavior: Desktop can use multiple tactile columns; mobile stacks controls and keeps the active preset near the primary action.

Chinese implementation notes:

- 按钮细节：使用凸起和内凹触感按钮，按下态向内沉，加载态保持柔和表面稳定。
- 提示与反馈：使用柔和内凹提示、预设保存确认和平静校验消息。
- 间距系统：柔和面板内边距 22-30px，混音器间距 14-18px，点击目标要大。
- 响应式策略：桌面可使用多列触感控件；手机堆叠控件，并让当前预设靠近主操作。

## Page Adaptation Guide

- Landing page: Use tactile controls, session state, presets, and soft proof for calm utility products.
- Dashboard: Use knobs, sliders, preset pads, active layers, and session meters rather than card grids.
- Admin panel: Use sparingly for small settings tools; keep contrast and state clarity higher than the soft surface.
- Forms, tables, and data: Use inset fields, raised buttons, calm validation, and large tap targets.
- Mobile: Stack controls, keep active preset near the primary action, and avoid dense tables.
- Not a good fit for: Weak for dense admin systems, long documents, or high-alert operational products.

## Usage Notes

- Keep contrast high enough despite the soft surface.
- Use inset states for pressed controls.
- Limit the style to focused, calm interfaces.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
