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

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 06 - Terminal Hacker as the page design direction.
Prompt type: Full Prompt.
Best fit: developer tools, CLI products, security, open source.
Visual mood: Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.
Scenario focus:
Landing adaptation: Use terminal output, command examples, severity proof, and a clear install or run action.
Dashboard adaptation: Use log streams, severity filters, health metrics, command results, and incident queues.
Admin adaptation: Use CLI-like settings, permission warnings, and exact recovery commands for technical operators.
Forms/data adaptation: Use command labels, sharp focus rings, monospace helper text, and exact error recovery.
Mobile adaptation: Show logs first, then metrics and recovery actions; keep command snippets wrap-safe.
Avoid for: Weak for consumer lifestyle, soft wellness, or image-led brand storytelling.
Layout archetype: Terminal Console.
Layout structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #020403; surface #07130d; text #d1fae5; muted #7ddf9e; primary #00ff88; accent #33ffcc; border #14532d; radius 2px; shadow/material 0 0 36px rgba(0, 255, 136, .16).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace for the main interface and keep long log rows aligned.
Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
Button details: Use command-style buttons, terminal labels, sharp focus rings, and disabled states that look locked rather than faded away.
Feedback and alerts: Use log-line alerts, command output toasts, and inline error rows with exact recovery commands.
Spacing system: Use 12-18px monospace panels, 8-10px log rows, and compact control groups.
Responsive behavior: Desktop keeps console and severity board split; mobile stacks logs first, then metrics, then secondary evidence.
Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
States: Show pass, fail, warning, masked, ignored, running, and copied command states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NullTrace / Security command line" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use green glow so heavily that logs become hard to read. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 06 - Terminal Hacker as the page design direction.
Prompt type: Landing Page.
Best fit: developer tools, CLI products, security, open source.
Visual mood: Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.
Scenario focus:
Landing page focus: Use terminal output, command examples, severity proof, and a clear install or run action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Terminal Console.
Layout structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #020403; surface #07130d; text #d1fae5; muted #7ddf9e; primary #00ff88; accent #33ffcc; border #14532d; radius 2px; shadow/material 0 0 36px rgba(0, 255, 136, .16).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace for the main interface and keep long log rows aligned.
Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
Button details: Use command-style buttons, terminal labels, sharp focus rings, and disabled states that look locked rather than faded away.
Feedback and alerts: Use log-line alerts, command output toasts, and inline error rows with exact recovery commands.
Spacing system: Use 12-18px monospace panels, 8-10px log rows, and compact control groups.
Responsive behavior: Desktop keeps console and severity board split; mobile stacks logs first, then metrics, then secondary evidence.
Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
States: Show pass, fail, warning, masked, ignored, running, and copied command states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NullTrace / Security command line" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use green glow so heavily that logs become hard to read. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 06 - Terminal Hacker as the page design direction.
Prompt type: Dashboard.
Best fit: developer tools, CLI products, security, open source.
Visual mood: Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.
Scenario focus:
Dashboard focus: Use log streams, severity filters, health metrics, command results, and incident queues.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Terminal Console.
Layout structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #020403; surface #07130d; text #d1fae5; muted #7ddf9e; primary #00ff88; accent #33ffcc; border #14532d; radius 2px; shadow/material 0 0 36px rgba(0, 255, 136, .16).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace for the main interface and keep long log rows aligned.
Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
Button details: Use command-style buttons, terminal labels, sharp focus rings, and disabled states that look locked rather than faded away.
Feedback and alerts: Use log-line alerts, command output toasts, and inline error rows with exact recovery commands.
Spacing system: Use 12-18px monospace panels, 8-10px log rows, and compact control groups.
Responsive behavior: Desktop keeps console and severity board split; mobile stacks logs first, then metrics, then secondary evidence.
Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
States: Show pass, fail, warning, masked, ignored, running, and copied command states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NullTrace / Security command line" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use green glow so heavily that logs become hard to read. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 06 - Terminal Hacker as the page design direction.
Prompt type: Admin Panel.
Best fit: developer tools, CLI products, security, open source.
Visual mood: Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.
Scenario focus:
Admin panel focus: Use CLI-like settings, permission warnings, and exact recovery commands for technical operators.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Terminal Console.
Layout structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #020403; surface #07130d; text #d1fae5; muted #7ddf9e; primary #00ff88; accent #33ffcc; border #14532d; radius 2px; shadow/material 0 0 36px rgba(0, 255, 136, .16).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace for the main interface and keep long log rows aligned.
Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
Button details: Use command-style buttons, terminal labels, sharp focus rings, and disabled states that look locked rather than faded away.
Feedback and alerts: Use log-line alerts, command output toasts, and inline error rows with exact recovery commands.
Spacing system: Use 12-18px monospace panels, 8-10px log rows, and compact control groups.
Responsive behavior: Desktop keeps console and severity board split; mobile stacks logs first, then metrics, then secondary evidence.
Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
States: Show pass, fail, warning, masked, ignored, running, and copied command states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NullTrace / Security command line" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use green glow so heavily that logs become hard to read. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 06 - Terminal Hacker as the page design direction.
Prompt type: Mobile.
Best fit: developer tools, CLI products, security, open source.
Visual mood: Black canvas, terminal green, monospace, CRT scanlines, command-line details, and developer credibility.
Scenario focus:
Mobile focus: Show logs first, then metrics and recovery actions; keep command snippets wrap-safe.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Terminal Console.
Layout structure: Command-line console with log panes, prompt rows, file paths, severity lanes, and a compact run summary.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #020403; surface #07130d; text #d1fae5; muted #7ddf9e; primary #00ff88; accent #33ffcc; border #14532d; radius 2px; shadow/material 0 0 36px rgba(0, 255, 136, .16).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace for the main interface and keep long log rows aligned.
Components: Prompt inputs, log rows, severity chips, file paths, command buttons, and inline remediation blocks are central.
Buttons: Buttons should look like executable commands, with brackets, prompt marks, or terminal borders.
Button details: Use command-style buttons, terminal labels, sharp focus rings, and disabled states that look locked rather than faded away.
Feedback and alerts: Use log-line alerts, command output toasts, and inline error rows with exact recovery commands.
Spacing system: Use 12-18px monospace panels, 8-10px log rows, and compact control groups.
Responsive behavior: Desktop keeps console and severity board split; mobile stacks logs first, then metrics, then secondary evidence.
Icons and media: Use logs, code snippets, repo paths, and scan traces instead of abstract graphics.
States: Show pass, fail, warning, masked, ignored, running, and copied command states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NullTrace / Security command line" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use green glow so heavily that logs become hard to read. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
