# Style 20 - Soft Pop (柔和流行)

## Summary

Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.

Chinese summary: 亲和力和玩乐色彩、手绘涂鸦/卡通插画、圆润夸张字体和带弹性的造型。

## Best For

consumer apps, writing tools, education, creative productivity

## Example Scenario

- Product sample: MellowNotes
- Page job: Friendly learning workspace
- Headline: Practice one lesson, save one note, return tomorrow.
- Primary action: Start lesson
- Secondary action: Open notes

## Scenario Components

- Friendly softness: Rounded forms and warm color make the product approachable without becoming childish.
- Encouraging states: Progress, empty, success, and retry messages feel human and specific.
- Gentle structure: Doodles and shapes support the workflow instead of replacing it.

## Example States

- Warm-up prompt: Ready
- Saved note: New
- Retry card: Kind

## Layout Pattern

- Pattern: Soft Learning Board (柔和学习面板)
- Archetype: Soft Learning Board
- Structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use rounded, readable type with encouraging labels and human microcopy.
- Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
- Buttons: Buttons are rounded and warm with obvious focus and disabled states.
- Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
- States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
- Avoid: Do not make friendly design childish or vague.

## Visual Language

- Background: `#fff8f1`
- Surface: `#ffffff`
- Text: `#2b1d16`
- Muted text: `#8f5f4a`
- Primary: `#ff6b6b`
- Accent: `#ffd166`
- Border: `#f5d7c6`
- Radius: `28px`
- Panel radius: `28px`
- Control radius: `18px`
- Chip radius: `14px`
- Media radius: `24px`
- Geometry rule: soft friendly curves limited to the learning mood; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 55px rgba(255, 107, 107, .18)`

## Component Detail System

- Button system: Use warm rounded buttons, gentle hover, kind disabled language, and retry buttons that feel helpful rather than punitive.
- Feedback and alerts: Use encouraging success notes, kind error messages, saved-note toasts, and empty lessons with clear next steps.
- Spacing system: Use 20-28px friendly panels, 12-16px lesson gaps, and comfortable reading line height.
- Responsive behavior: Desktop can show path, practice, and notes; mobile shows practice first, then path, then progress notes.

Chinese implementation notes:

- 按钮细节：使用温暖圆角按钮、温和 hover、有善意的禁用文案，以及不惩罚用户的重试按钮。
- 提示与反馈：使用鼓励型成功说明、友好错误文案、保存笔记 toast，以及带下一步的空课程状态。
- 间距系统：友好面板 20-28px，课程间距 12-16px，阅读行高舒适。
- 响应式策略：桌面可显示路径、练习和笔记；手机先练习，再路径，再进度笔记。

## Page Adaptation Guide

- Landing page: Use friendly learning story, progress path, saved notes, and encouraging primary action.
- Dashboard: Use practice cards, lesson paths, note stacks, streaks, and kind retry states.
- Admin panel: Use for education/community tools, not dense finance or strict enterprise approvals.
- Forms, tables, and data: Use readable labels, kind errors, saved-note toasts, and comfortable line height.
- Mobile: Show practice first, then path, then notes; keep touch targets generous.
- Not a good fit for: Weak for severe incidents, high-density analytics, or luxury minimal portfolios.

## Usage Notes

- Round the typography and interaction shapes.
- Pair friendly copy with lively but readable components.
- Use illustration sparingly as a human signal.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 20 - Soft Pop as the page design direction.
Prompt type: Full Prompt.
Best fit: consumer apps, writing tools, education, creative productivity.
Visual mood: Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.
Scenario focus:
Landing adaptation: Use friendly learning story, progress path, saved notes, and encouraging primary action.
Dashboard adaptation: Use practice cards, lesson paths, note stacks, streaks, and kind retry states.
Admin adaptation: Use for education/community tools, not dense finance or strict enterprise approvals.
Forms/data adaptation: Use readable labels, kind errors, saved-note toasts, and comfortable line height.
Mobile adaptation: Show practice first, then path, then notes; keep touch targets generous.
Avoid for: Weak for severe incidents, high-density analytics, or luxury minimal portfolios.
Layout archetype: Soft Learning Board.
Layout structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff8f1; surface #ffffff; text #2b1d16; muted #8f5f4a; primary #ff6b6b; accent #ffd166; border #f5d7c6; radius 28px; shadow/material 0 18px 55px rgba(255, 107, 107, .18).
Geometry: panel radius 28px; control radius 18px; chip/state radius 14px; media radius 24px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rounded, readable type with encouraging labels and human microcopy.
Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
Buttons: Buttons are rounded and warm with obvious focus and disabled states.
Button details: Use warm rounded buttons, gentle hover, kind disabled language, and retry buttons that feel helpful rather than punitive.
Feedback and alerts: Use encouraging success notes, kind error messages, saved-note toasts, and empty lessons with clear next steps.
Spacing system: Use 20-28px friendly panels, 12-16px lesson gaps, and comfortable reading line height.
Responsive behavior: Desktop can show path, practice, and notes; mobile shows practice first, then path, then progress notes.
Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "MellowNotes / Friendly learning workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make friendly design childish or vague. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 20 - Soft Pop as the page design direction.
Prompt type: Landing Page.
Best fit: consumer apps, writing tools, education, creative productivity.
Visual mood: Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.
Scenario focus:
Landing page focus: Use friendly learning story, progress path, saved notes, and encouraging primary action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Soft Learning Board.
Layout structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff8f1; surface #ffffff; text #2b1d16; muted #8f5f4a; primary #ff6b6b; accent #ffd166; border #f5d7c6; radius 28px; shadow/material 0 18px 55px rgba(255, 107, 107, .18).
Geometry: panel radius 28px; control radius 18px; chip/state radius 14px; media radius 24px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rounded, readable type with encouraging labels and human microcopy.
Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
Buttons: Buttons are rounded and warm with obvious focus and disabled states.
Button details: Use warm rounded buttons, gentle hover, kind disabled language, and retry buttons that feel helpful rather than punitive.
Feedback and alerts: Use encouraging success notes, kind error messages, saved-note toasts, and empty lessons with clear next steps.
Spacing system: Use 20-28px friendly panels, 12-16px lesson gaps, and comfortable reading line height.
Responsive behavior: Desktop can show path, practice, and notes; mobile shows practice first, then path, then progress notes.
Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "MellowNotes / Friendly learning workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make friendly design childish or vague. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 20 - Soft Pop as the page design direction.
Prompt type: Dashboard.
Best fit: consumer apps, writing tools, education, creative productivity.
Visual mood: Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.
Scenario focus:
Dashboard focus: Use practice cards, lesson paths, note stacks, streaks, and kind retry states.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Soft Learning Board.
Layout structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff8f1; surface #ffffff; text #2b1d16; muted #8f5f4a; primary #ff6b6b; accent #ffd166; border #f5d7c6; radius 28px; shadow/material 0 18px 55px rgba(255, 107, 107, .18).
Geometry: panel radius 28px; control radius 18px; chip/state radius 14px; media radius 24px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rounded, readable type with encouraging labels and human microcopy.
Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
Buttons: Buttons are rounded and warm with obvious focus and disabled states.
Button details: Use warm rounded buttons, gentle hover, kind disabled language, and retry buttons that feel helpful rather than punitive.
Feedback and alerts: Use encouraging success notes, kind error messages, saved-note toasts, and empty lessons with clear next steps.
Spacing system: Use 20-28px friendly panels, 12-16px lesson gaps, and comfortable reading line height.
Responsive behavior: Desktop can show path, practice, and notes; mobile shows practice first, then path, then progress notes.
Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "MellowNotes / Friendly learning workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make friendly design childish or vague. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 20 - Soft Pop as the page design direction.
Prompt type: Admin Panel.
Best fit: consumer apps, writing tools, education, creative productivity.
Visual mood: Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.
Scenario focus:
Admin panel focus: Use for education/community tools, not dense finance or strict enterprise approvals.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Soft Learning Board.
Layout structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff8f1; surface #ffffff; text #2b1d16; muted #8f5f4a; primary #ff6b6b; accent #ffd166; border #f5d7c6; radius 28px; shadow/material 0 18px 55px rgba(255, 107, 107, .18).
Geometry: panel radius 28px; control radius 18px; chip/state radius 14px; media radius 24px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rounded, readable type with encouraging labels and human microcopy.
Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
Buttons: Buttons are rounded and warm with obvious focus and disabled states.
Button details: Use warm rounded buttons, gentle hover, kind disabled language, and retry buttons that feel helpful rather than punitive.
Feedback and alerts: Use encouraging success notes, kind error messages, saved-note toasts, and empty lessons with clear next steps.
Spacing system: Use 20-28px friendly panels, 12-16px lesson gaps, and comfortable reading line height.
Responsive behavior: Desktop can show path, practice, and notes; mobile shows practice first, then path, then progress notes.
Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "MellowNotes / Friendly learning workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make friendly design childish or vague. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 20 - Soft Pop as the page design direction.
Prompt type: Mobile.
Best fit: consumer apps, writing tools, education, creative productivity.
Visual mood: Friendly playful color, doodle or cartoon illustration, rounded expressive type, and elastic shapes.
Scenario focus:
Mobile focus: Show practice first, then path, then notes; keep touch targets generous.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Soft Learning Board.
Layout structure: Warm learning board with note cards, progress path, friendly empty states, and gentle practice controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff8f1; surface #ffffff; text #2b1d16; muted #8f5f4a; primary #ff6b6b; accent #ffd166; border #f5d7c6; radius 28px; shadow/material 0 18px 55px rgba(255, 107, 107, .18).
Geometry: panel radius 28px; control radius 18px; chip/state radius 14px; media radius 24px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rounded, readable type with encouraging labels and human microcopy.
Components: Lesson cards, notes, retry prompts, progress tokens, doodle frames, and save states should feel kind.
Buttons: Buttons are rounded and warm with obvious focus and disabled states.
Button details: Use warm rounded buttons, gentle hover, kind disabled language, and retry buttons that feel helpful rather than punitive.
Feedback and alerts: Use encouraging success notes, kind error messages, saved-note toasts, and empty lessons with clear next steps.
Spacing system: Use 20-28px friendly panels, 12-16px lesson gaps, and comfortable reading line height.
Responsive behavior: Desktop can show path, practice, and notes; mobile shows practice first, then path, then progress notes.
Icons and media: Use small doodles, note objects, progress paths, and friendly illustrations as cues.
States: Show saved note, retry, kind error, empty lesson, streak, and completed states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "MellowNotes / Friendly learning workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make friendly design childish or vague. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
