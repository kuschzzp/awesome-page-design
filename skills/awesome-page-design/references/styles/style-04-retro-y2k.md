# Style 04 - Retro Y2K (复古 Y2K)

## Summary

Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism.

Chinese summary: 糖果渐变、霓虹细节、复古标题字、星光能量和千禧年数字乐观感。

## Best For

music, fashion, youth culture, playful campaigns

## Example Scenario

- Product sample: PulseRoom
- Page job: Culture drop page
- Headline: Stage the drop, preview tracks, and collect reminders.
- Primary action: Join the list
- Secondary action: See lineup

## Scenario Components

- Glossy emphasis: Shine, neon outlines, and bubbly forms carry the mood while keeping copy legible.
- Hype modules: Track cards, countdowns, artist notes, and badges feel like part of one event.
- Controlled sparkle: Decorative energy stays around the primary objects instead of covering the interface.

## Example States

- Cover crop: Ready
- Countdown tile: Live
- Track preview: Queued

## Layout Pattern

- Pattern: Glossy Y2K Stage (千禧亮面舞台)
- Archetype: Glossy Y2K Stage
- Structure: A glossy stage with marquee bars, circular media, sticker controls, and a playful release lineup.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Pair expressive display words with readable short captions and badge labels.
- Components: Lineup cards, track pills, shiny badges, countdown chips, and signup controls should feel collectible.
- Buttons: Buttons are glossy, thick, and high-energy with clear hover and pressed states.
- Icons and media: Use cover art crops, neon frames, sparkles, and real promo fragments.
- States: Show queued, live, saved, reminder-on, and preview-playing states.
- Avoid: Do not let sparkle effects cover interface meaning.

## Visual Language

- Background: `#fff0fb`
- Surface: `#ffffff`
- Text: `#26113d`
- Muted text: `#7c3aed`
- Primary: `#ff2db2`
- Accent: `#00d9ff`
- Border: `#ffb6ef`
- Radius: `16px`
- Panel radius: `16px`
- Control radius: `10px`
- Chip radius: `8px`
- Media radius: `14px`
- Geometry rule: glossy Y2K shapes without default pill buttons; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 22px 70px rgba(255, 45, 178, .24)`

## Component Detail System

- Button system: Use glossy compact buttons, bright pill-like chips only for real states, and active feedback that feels like a music player control.
- Feedback and alerts: Use energetic launch toasts, live/reminder badges, and inline signup confirmation.
- Spacing system: Use 18-24px stage padding, 8-12px pill gaps, and compact countdown blocks.
- Responsive behavior: Desktop may use a stage and control panel; mobile moves lineup, countdown, and signup into a single sequenced flow.

Chinese implementation notes:

- 按钮细节：使用有光泽的紧凑按钮，只在真实状态上使用亮色 chip，按下反馈像音乐播放器控件。
- 提示与反馈：使用有活力的发布 toast、live/reminder 徽章，以及内联报名确认。
- 间距系统：舞台内边距 18-24px，胶囊间距 8-12px，倒计时块保持紧凑。
- 响应式策略：桌面可使用舞台和控制面板；手机把 lineup、倒计时和报名变成单列流程。

## Page Adaptation Guide

- Landing page: Use a glossy stage, lineup, countdown, signup module, and collectible media fragments.
- Dashboard: Use launch signals, reminder counts, live badges, and compact activity strips for campaign operations.
- Admin panel: Use bright but bounded controls for content scheduling, asset approval, and release checklists.
- Forms, tables, and data: Use compact glossy fields, visible signup confirmation, and playful but readable validation.
- Mobile: Sequence headline, media, countdown, signup, lineup, then proof; avoid tiny pills as primary controls.
- Not a good fit for: Weak for serious enterprise workflows or high-trust official services.

## Usage Notes

- Use playful shine and neon in controlled zones.
- Pair expressive display type with readable body copy.
- Keep nostalgia bright, not cluttered.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 04 - Retro Y2K as the page design direction.
Prompt type: Full Prompt.
Best fit: music, fashion, youth culture, playful campaigns.
Visual mood: Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism.
Scenario focus:
Landing adaptation: Use a glossy stage, lineup, countdown, signup module, and collectible media fragments.
Dashboard adaptation: Use launch signals, reminder counts, live badges, and compact activity strips for campaign operations.
Admin adaptation: Use bright but bounded controls for content scheduling, asset approval, and release checklists.
Forms/data adaptation: Use compact glossy fields, visible signup confirmation, and playful but readable validation.
Mobile adaptation: Sequence headline, media, countdown, signup, lineup, then proof; avoid tiny pills as primary controls.
Avoid for: Weak for serious enterprise workflows or high-trust official services.
Layout archetype: Glossy Y2K Stage.
Layout structure: A glossy stage with marquee bars, circular media, sticker controls, and a playful release lineup.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff0fb; surface #ffffff; text #26113d; muted #7c3aed; primary #ff2db2; accent #00d9ff; border #ffb6ef; radius 16px; shadow/material 0 22px 70px rgba(255, 45, 178, .24).
Geometry: panel radius 16px; control radius 10px; chip/state radius 8px; media radius 14px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Pair expressive display words with readable short captions and badge labels.
Components: Lineup cards, track pills, shiny badges, countdown chips, and signup controls should feel collectible.
Buttons: Buttons are glossy, thick, and high-energy with clear hover and pressed states.
Button details: Use glossy compact buttons, bright pill-like chips only for real states, and active feedback that feels like a music player control.
Feedback and alerts: Use energetic launch toasts, live/reminder badges, and inline signup confirmation.
Spacing system: Use 18-24px stage padding, 8-12px pill gaps, and compact countdown blocks.
Responsive behavior: Desktop may use a stage and control panel; mobile moves lineup, countdown, and signup into a single sequenced flow.
Icons and media: Use cover art crops, neon frames, sparkles, and real promo fragments.
States: Show queued, live, saved, reminder-on, and preview-playing states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PulseRoom / Culture drop page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let sparkle effects cover interface meaning. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 04 - Retro Y2K as the page design direction.
Prompt type: Landing Page.
Best fit: music, fashion, youth culture, playful campaigns.
Visual mood: Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism.
Scenario focus:
Landing page focus: Use a glossy stage, lineup, countdown, signup module, and collectible media fragments.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Glossy Y2K Stage.
Layout structure: A glossy stage with marquee bars, circular media, sticker controls, and a playful release lineup.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff0fb; surface #ffffff; text #26113d; muted #7c3aed; primary #ff2db2; accent #00d9ff; border #ffb6ef; radius 16px; shadow/material 0 22px 70px rgba(255, 45, 178, .24).
Geometry: panel radius 16px; control radius 10px; chip/state radius 8px; media radius 14px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Pair expressive display words with readable short captions and badge labels.
Components: Lineup cards, track pills, shiny badges, countdown chips, and signup controls should feel collectible.
Buttons: Buttons are glossy, thick, and high-energy with clear hover and pressed states.
Button details: Use glossy compact buttons, bright pill-like chips only for real states, and active feedback that feels like a music player control.
Feedback and alerts: Use energetic launch toasts, live/reminder badges, and inline signup confirmation.
Spacing system: Use 18-24px stage padding, 8-12px pill gaps, and compact countdown blocks.
Responsive behavior: Desktop may use a stage and control panel; mobile moves lineup, countdown, and signup into a single sequenced flow.
Icons and media: Use cover art crops, neon frames, sparkles, and real promo fragments.
States: Show queued, live, saved, reminder-on, and preview-playing states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PulseRoom / Culture drop page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let sparkle effects cover interface meaning. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 04 - Retro Y2K as the page design direction.
Prompt type: Dashboard.
Best fit: music, fashion, youth culture, playful campaigns.
Visual mood: Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism.
Scenario focus:
Dashboard focus: Use launch signals, reminder counts, live badges, and compact activity strips for campaign operations.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Glossy Y2K Stage.
Layout structure: A glossy stage with marquee bars, circular media, sticker controls, and a playful release lineup.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff0fb; surface #ffffff; text #26113d; muted #7c3aed; primary #ff2db2; accent #00d9ff; border #ffb6ef; radius 16px; shadow/material 0 22px 70px rgba(255, 45, 178, .24).
Geometry: panel radius 16px; control radius 10px; chip/state radius 8px; media radius 14px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Pair expressive display words with readable short captions and badge labels.
Components: Lineup cards, track pills, shiny badges, countdown chips, and signup controls should feel collectible.
Buttons: Buttons are glossy, thick, and high-energy with clear hover and pressed states.
Button details: Use glossy compact buttons, bright pill-like chips only for real states, and active feedback that feels like a music player control.
Feedback and alerts: Use energetic launch toasts, live/reminder badges, and inline signup confirmation.
Spacing system: Use 18-24px stage padding, 8-12px pill gaps, and compact countdown blocks.
Responsive behavior: Desktop may use a stage and control panel; mobile moves lineup, countdown, and signup into a single sequenced flow.
Icons and media: Use cover art crops, neon frames, sparkles, and real promo fragments.
States: Show queued, live, saved, reminder-on, and preview-playing states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PulseRoom / Culture drop page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let sparkle effects cover interface meaning. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 04 - Retro Y2K as the page design direction.
Prompt type: Admin Panel.
Best fit: music, fashion, youth culture, playful campaigns.
Visual mood: Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism.
Scenario focus:
Admin panel focus: Use bright but bounded controls for content scheduling, asset approval, and release checklists.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Glossy Y2K Stage.
Layout structure: A glossy stage with marquee bars, circular media, sticker controls, and a playful release lineup.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff0fb; surface #ffffff; text #26113d; muted #7c3aed; primary #ff2db2; accent #00d9ff; border #ffb6ef; radius 16px; shadow/material 0 22px 70px rgba(255, 45, 178, .24).
Geometry: panel radius 16px; control radius 10px; chip/state radius 8px; media radius 14px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Pair expressive display words with readable short captions and badge labels.
Components: Lineup cards, track pills, shiny badges, countdown chips, and signup controls should feel collectible.
Buttons: Buttons are glossy, thick, and high-energy with clear hover and pressed states.
Button details: Use glossy compact buttons, bright pill-like chips only for real states, and active feedback that feels like a music player control.
Feedback and alerts: Use energetic launch toasts, live/reminder badges, and inline signup confirmation.
Spacing system: Use 18-24px stage padding, 8-12px pill gaps, and compact countdown blocks.
Responsive behavior: Desktop may use a stage and control panel; mobile moves lineup, countdown, and signup into a single sequenced flow.
Icons and media: Use cover art crops, neon frames, sparkles, and real promo fragments.
States: Show queued, live, saved, reminder-on, and preview-playing states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PulseRoom / Culture drop page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let sparkle effects cover interface meaning. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 04 - Retro Y2K as the page design direction.
Prompt type: Mobile.
Best fit: music, fashion, youth culture, playful campaigns.
Visual mood: Candy gradients, neon details, retro display type, sparkle energy, and early-2000s digital optimism.
Scenario focus:
Mobile focus: Sequence headline, media, countdown, signup, lineup, then proof; avoid tiny pills as primary controls.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Glossy Y2K Stage.
Layout structure: A glossy stage with marquee bars, circular media, sticker controls, and a playful release lineup.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #fff0fb; surface #ffffff; text #26113d; muted #7c3aed; primary #ff2db2; accent #00d9ff; border #ffb6ef; radius 16px; shadow/material 0 22px 70px rgba(255, 45, 178, .24).
Geometry: panel radius 16px; control radius 10px; chip/state radius 8px; media radius 14px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Pair expressive display words with readable short captions and badge labels.
Components: Lineup cards, track pills, shiny badges, countdown chips, and signup controls should feel collectible.
Buttons: Buttons are glossy, thick, and high-energy with clear hover and pressed states.
Button details: Use glossy compact buttons, bright pill-like chips only for real states, and active feedback that feels like a music player control.
Feedback and alerts: Use energetic launch toasts, live/reminder badges, and inline signup confirmation.
Spacing system: Use 18-24px stage padding, 8-12px pill gaps, and compact countdown blocks.
Responsive behavior: Desktop may use a stage and control panel; mobile moves lineup, countdown, and signup into a single sequenced flow.
Icons and media: Use cover art crops, neon frames, sparkles, and real promo fragments.
States: Show queued, live, saved, reminder-on, and preview-playing states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PulseRoom / Culture drop page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let sparkle effects cover interface meaning. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
