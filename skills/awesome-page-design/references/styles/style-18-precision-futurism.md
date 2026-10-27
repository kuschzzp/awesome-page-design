# Style 18 - Precision Futurism (精密未来风)

## Summary

Dark background, glowing borders, futuristic technology polish, and sci-fi UI precision.

Chinese summary: 深色背景、发光边框、未来科技感和科幻 UI 精度。

## Best For

issue trackers, AI operations tools, technical SaaS

## Example Scenario

- Product sample: VectorOps
- Page job: Precision incident map
- Headline: Pin every failing span on one technical operations map.
- Primary action: Replay incident
- Secondary action: Export trace

## Scenario Components

- Map-first layout: The topology field takes the main space while side data stays attached to active nodes.
- Compact evidence: Trace rows, span IDs, retry state, and command actions stay dense and deliberate.
- Controlled glow: Light is reserved for selected paths, errors, and replay-ready states.

## Example States

- Retry storm: Watch
- Span 7B: Fail
- Replay batch: Ready

## Layout Pattern

- Pattern: Precision Incident Map (精密事故地图)
- Archetype: Precision Incident Map
- Structure: Full-width technical map with topology canvas, span lanes, replay command bar, incident ticker, and attached evidence panels.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use compact technical UI type, precise labels, and aligned numeric values.
- Components: Topology nodes, span lanes, incident chips, command buttons, latency strips, and replay fragments should feel engineered.
- Buttons: Buttons are compact dark controls with glow reserved for active or critical actions.
- Icons and media: Use topology maps, traces, logs, span diagrams, and evidence overlays instead of generic sci-fi backgrounds.
- States: Show active path, fail, retry, replay ready, incident open, and selected node states.
- Avoid: Do not cover precise information with excessive glow.

## Visual Language

- Background: `#08090d`
- Surface: `#101117`
- Text: `#f4f4f5`
- Muted text: `#a1a1aa`
- Primary: `#f4f4f5`
- Accent: `#8b5cf6`
- Border: `#27272f`
- Radius: `6px`
- Panel radius: `6px`
- Control radius: `4px`
- Chip radius: `2px`
- Media radius: `4px`
- Geometry rule: precision console geometry with low-radius panels; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 0 0 1px rgba(139, 92, 246, .22), 0 24px 80px rgba(139, 92, 246, .18)`

## Component Detail System

- Button system: Use precise command buttons, thin glow only on active/focus states, and compact disabled states for technical control.
- Feedback and alerts: Use trace toasts, incident chips, warning rows, and replay confirmations tied to real system state.
- Spacing system: Use 16-20px console panels, 8-12px trace rows, and dense tabular metrics.
- Responsive behavior: Desktop keeps graph, trace panel, and queue; mobile shows trace summary, then graph, then queue.

Chinese implementation notes:

- 按钮细节：使用精密命令按钮，只在 active/focus 使用细发光，并为技术控件提供紧凑禁用态。
- 提示与反馈：使用 trace toast、incident chip、警告行，以及绑定真实系统状态的 replay 确认。
- 间距系统：控制台面板 16-20px，trace 行 8-12px，指标紧凑且表格数字对齐。
- 响应式策略：桌面保留图、trace 面板和队列；手机先 trace 摘要，再图，再队列。

## Page Adaptation Guide

- Landing page: Use a precise technical product story with graph, traces, incidents, and command action.
- Dashboard: Use graph console, trace list, compact metrics, incident chips, and replay controls.
- Admin panel: Use for technical SaaS operations, issue triage, observability, and workflow replay.
- Forms, tables, and data: Use compact dark inputs, command buttons, exact validation, and visible focused edges.
- Mobile: Show trace summary, graph, queue, and replay action in that order.
- Not a good fit for: Weak for soft consumer brands or pages needing warmth over precision.

## Usage Notes

- Keep the surface quiet and precise.
- Use glow as a state signal, not decoration everywhere.
- Favor clean lists, compact cards, and command-like actions.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
