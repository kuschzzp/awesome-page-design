# Style 06 - Terminal Hacker (黑客终端)

## Summary

Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.

Chinese summary: 黑色画布、终端绿、等宽字体、CRT 扫描线、命令行细节和开发者可信感。

## Best For

developer tools, CLI products, security, open source

## Example Scenario

- Product sample: NullTrace
- Page job: Security command line
- Headline: Trace exposed secrets before they ship.
- Primary action: Run scan
- Secondary action: View logs

## Scenario Components

- Command rhythm: Monospace surfaces, prompts, and log rows make the product feel credible to developers.
- Sharp states: Warnings, failures, and successful checks are unmistakable in a dark console.
- Useful texture: Scanlines and glow stay subtle so long logs remain readable.

## Example States

- Token revoked: Pass
- Stale key owner: Find
- Webhook secret: Mask

## Layout Pattern

- Pattern: Terminal Console (终端控制台)
- Archetype: Terminal Console
- Structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use monospace for the main interface and keep long log rows aligned.
- Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
- Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
- Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
- States: Show pass, fail, warning, masked, ignored, running, and copied command states.
- Avoid: Do not use green glow so heavily that logs become hard to read.

## Visual Language

- Background: `#020403`
- Surface: `#07130d`
- Text: `#d1fae5`
- Muted text: `#7ddf9e`
- Primary: `#00ff88`
- Accent: `#33ffcc`
- Border: `#14532d`
- Radius: `2px`
- Panel radius: `2px`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `2px`
- Geometry rule: terminal-like square controls and tiny window corners; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 0 36px rgba(0, 255, 136, .16)`

## Component Detail System

- Button system: Use command-style buttons, terminal labels, sharp focus rings, and disabled states that look locked rather than faded away.
- Feedback and alerts: Use log-line alerts, command output toasts, and inline error rows with exact recovery commands.
- Spacing system: Use 12-18px monospace panels, 8-10px log rows, and compact control groups.
- Responsive behavior: Desktop keeps console and severity board split; mobile stacks logs first, then metrics, then secondary evidence.

Chinese implementation notes:

- 按钮细节：使用命令式按钮、终端标签、锐利焦点环，以及像 locked 而不是淡掉的禁用态。
- 提示与反馈：使用日志行提示、命令输出 toast，以及带修复命令的内联错误行。
- 间距系统：终端面板内边距 12-18px，日志行间距 8-10px，控件组紧凑。
- 响应式策略：桌面拆分控制台和严重度面板；手机先显示日志，再显示指标，再显示次级证据。

## Page Adaptation Guide

- Landing page: Use terminal output, command examples, severity proof, and a clear install or run action.
- Dashboard: Use log streams, severity filters, health metrics, command results, and incident queues.
- Admin panel: Use CLI-like settings, permission warnings, and exact recovery commands for technical operators.
- Forms, tables, and data: Use command labels, sharp focus rings, monospace helper text, and exact error recovery.
- Mobile: Show logs first, then metrics and recovery actions; keep command snippets wrap-safe.
- Not a good fit for: Weak for consumer lifestyle, soft wellness, or image-led brand storytelling.

## Usage Notes

- Use monospace rhythm and command metaphors.
- Keep scanline or terminal texture subtle.
- Make focus and error states unmistakable.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
