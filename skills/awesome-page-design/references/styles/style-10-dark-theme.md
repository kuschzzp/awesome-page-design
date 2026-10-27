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

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
