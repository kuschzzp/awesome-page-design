# Style 26 - Industrial Control (工业控制)

## Summary

Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity.

Chinese summary: 耐用暗色面板、安全色强调、密集状态行、机器标签和可维护的控制室清晰度。

## Best For

print rooms, factory monitoring, logistics control, hardware fleets, incident rooms

## Example Scenario

- Product sample: Press Room 12
- Page job: Printmaking studio control
- Headline: Run a letterpress shift through ink, plates, rollers, and cleanup.
- Primary action: Acknowledge hold
- Secondary action: Open cleanup log

## Scenario Components

- Shop-floor density: Line cards, alarms, ink batches, and service notes stay visible for fast scanning.
- Safety color: Amber, red, green, and neutral states map to real press-room meaning.
- Rugged craft: The page feels industrial without becoming a factory clone.

## Example States

- Press B: Hold
- Cyan batch: Mixing
- Cleanup sink: Open

## Layout Pattern

- Pattern: Industrial Print Room (工业印刷工作室)
- Archetype: Industrial Print Room
- Structure: Rugged print-studio control room with press matrix, ink batch table, drying rack, safety hold, cleanup log, and service evidence.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use rugged UI type, tabular machine values, short state names, and strong row scanning.
- Components: Press cards, ink rows, lockout notes, rack meters, service tags, and acknowledgement buttons should feel shop-floor ready.
- Buttons: Use durable rectangular controls; warning and acknowledgement states must be unmistakable.
- Icons and media: Use press labels, ink batches, roller checks, drying racks, service logs, and safety notes.
- States: Show hold, mixing, open, locked out, recovered, warning, and acknowledged states.
- Avoid: Do not soften safety-critical craft operations into glossy consumer UI.

## Visual Language

- Background: `#11130f`
- Surface: `#1d211c`
- Text: `#f2f2ea`
- Muted text: `#a7ac9e`
- Primary: `#d6ff3f`
- Accent: `#ffb000`
- Border: `#3d4438`
- Radius: `2px`
- Panel radius: `2px`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `2px`
- Geometry rule: rugged industrial geometry with hard serviceable controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 60px rgba(0, 0, 0, .35)`

## Component Detail System

- Button system: Use hard rectangular controls, explicit acknowledgement buttons, safety-color destructive states, and disabled states that look locked out.
- Feedback and alerts: Use alarm banners, row-local warnings, service-log confirmations, and recovery actions attached to the affected machine.
- Spacing system: Use 16-22px rugged panels, 8-10px dense status rows, 44-52px control heights, and compact filter rails.
- Responsive behavior: Desktop keeps filters, alarms, metrics, and inspector visible; mobile shows alarm summary, acknowledge action, filters, then service detail.

Chinese implementation notes:

- 按钮细节：使用硬朗矩形控件、明确确认按钮、安全色危险态，以及像 lockout 的禁用态。
- 提示与反馈：使用告警 banner、行内警告、维修日志确认，以及绑定到受影响机器的恢复操作。
- 间距系统：耐用面板 16-22px，密集状态行 8-10px，控件高度 44-52px，筛选栏紧凑。
- 响应式策略：桌面保留筛选、告警、指标和检查面板；手机先显示告警摘要和确认操作，再显示筛选和维修详情。

## Page Adaptation Guide

- Landing page: Use a rugged operations story only when the public page is about equipment, reliability, service, or safety proof.
- Dashboard: Use alarms, filters, threshold metrics, service queues, ownership chips, and row-local recovery actions.
- Admin panel: Use for operations consoles, hardware fleets, logistics control, safety checks, and service management.
- Forms, tables, and data: Use clear labels, hard field borders, machine IDs, explicit validation, and locked/destructive confirmations.
- Mobile: Show alarm summary, acknowledge action, active filters, alarm list, and service detail in that order.
- Not a good fit for: Weak for luxury editorial, calm wellness, playful education, or long-form reading.

## Usage Notes

- Prioritize durable controls, visible warnings, and operator scan speed.
- Use color as safety semantics, not decorative variety.
- Keep layouts serviceable: labels, owners, thresholds, and recovery actions must be obvious.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
