# Style 14 - Neumorphism (新拟态)

## Summary

Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.

Chinese summary: 柔光、内凹层次感圆角、柔和阴影和触感表面。

## Best For

audio tools, calm utilities, wellness and focus products

## Example Scenario

- Product sample: TempoRoom
- Page job: Calm audio control
- Headline: Tune rain, noise, timer, and bell in one soft console.
- Primary action: Start session
- Secondary action: Tune mix

## Scenario Components

- Tactile depth: Soft shadows and inset states make controls feel physical without lowering contrast.
- Focused scope: The style works best when the page has few high-touch controls.
- Accessible calm: Labels, values, and focus states remain strong despite the soft material.

## Example States

- Rain layer: 62%
- Noise floor: Low
- Focus bell: On

## Layout Pattern

- Pattern: Soft Tactile Control (柔软触感控制台)
- Archetype: Soft Tactile Control
- Structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use calm medium-weight labels, clear values, and limited headings.
- Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
- Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
- Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
- States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
- Avoid: Do not let soft shadows reduce accessibility or hide active states.

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

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 14 - Neumorphism as the page design direction.
Prompt type: Full Prompt.
Best fit: audio tools, calm utilities, wellness and focus products.
Visual mood: Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.
Scenario focus:
Landing adaptation: Use tactile controls, session state, presets, and soft proof for calm utility products.
Dashboard adaptation: Use knobs, sliders, preset pads, active layers, and session meters rather than card grids.
Admin adaptation: Use sparingly for small settings tools; keep contrast and state clarity higher than the soft surface.
Forms/data adaptation: Use inset fields, raised buttons, calm validation, and large tap targets.
Mobile adaptation: Stack controls, keep active preset near the primary action, and avoid dense tables.
Avoid for: Weak for dense admin systems, long documents, or high-alert operational products.
Layout archetype: Soft Tactile Control.
Layout structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #e9eef5; surface #e9eef5; text #172033; muted #667085; primary #243b6b; accent #6aa6ff; border #f8fbff; radius 30px; shadow/material 14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86).
Geometry: panel radius 30px; control radius 22px; chip/state radius 18px; media radius 26px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm medium-weight labels, clear values, and limited headings.
Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
Button details: Use raised and inset tactile buttons, pressed states that sink inward, and loading states that keep the soft surface stable.
Feedback and alerts: Use gentle inset alerts, saved-preset confirmations, and calm validation messages.
Spacing system: Use 22-30px soft panels, 14-18px mixer gaps, and large tap targets.
Responsive behavior: Desktop can use multiple tactile columns; mobile stacks controls and keeps the active preset near the primary action.
Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "TempoRoom / Calm audio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let soft shadows reduce accessibility or hide active states. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 14 - Neumorphism as the page design direction.
Prompt type: Landing Page.
Best fit: audio tools, calm utilities, wellness and focus products.
Visual mood: Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.
Scenario focus:
Landing page focus: Use tactile controls, session state, presets, and soft proof for calm utility products.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Soft Tactile Control.
Layout structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #e9eef5; surface #e9eef5; text #172033; muted #667085; primary #243b6b; accent #6aa6ff; border #f8fbff; radius 30px; shadow/material 14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86).
Geometry: panel radius 30px; control radius 22px; chip/state radius 18px; media radius 26px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm medium-weight labels, clear values, and limited headings.
Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
Button details: Use raised and inset tactile buttons, pressed states that sink inward, and loading states that keep the soft surface stable.
Feedback and alerts: Use gentle inset alerts, saved-preset confirmations, and calm validation messages.
Spacing system: Use 22-30px soft panels, 14-18px mixer gaps, and large tap targets.
Responsive behavior: Desktop can use multiple tactile columns; mobile stacks controls and keeps the active preset near the primary action.
Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "TempoRoom / Calm audio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let soft shadows reduce accessibility or hide active states. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 14 - Neumorphism as the page design direction.
Prompt type: Dashboard.
Best fit: audio tools, calm utilities, wellness and focus products.
Visual mood: Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.
Scenario focus:
Dashboard focus: Use knobs, sliders, preset pads, active layers, and session meters rather than card grids.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Soft Tactile Control.
Layout structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #e9eef5; surface #e9eef5; text #172033; muted #667085; primary #243b6b; accent #6aa6ff; border #f8fbff; radius 30px; shadow/material 14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86).
Geometry: panel radius 30px; control radius 22px; chip/state radius 18px; media radius 26px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm medium-weight labels, clear values, and limited headings.
Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
Button details: Use raised and inset tactile buttons, pressed states that sink inward, and loading states that keep the soft surface stable.
Feedback and alerts: Use gentle inset alerts, saved-preset confirmations, and calm validation messages.
Spacing system: Use 22-30px soft panels, 14-18px mixer gaps, and large tap targets.
Responsive behavior: Desktop can use multiple tactile columns; mobile stacks controls and keeps the active preset near the primary action.
Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "TempoRoom / Calm audio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let soft shadows reduce accessibility or hide active states. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 14 - Neumorphism as the page design direction.
Prompt type: Admin Panel.
Best fit: audio tools, calm utilities, wellness and focus products.
Visual mood: Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.
Scenario focus:
Admin panel focus: Use sparingly for small settings tools; keep contrast and state clarity higher than the soft surface.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Soft Tactile Control.
Layout structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #e9eef5; surface #e9eef5; text #172033; muted #667085; primary #243b6b; accent #6aa6ff; border #f8fbff; radius 30px; shadow/material 14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86).
Geometry: panel radius 30px; control radius 22px; chip/state radius 18px; media radius 26px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm medium-weight labels, clear values, and limited headings.
Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
Button details: Use raised and inset tactile buttons, pressed states that sink inward, and loading states that keep the soft surface stable.
Feedback and alerts: Use gentle inset alerts, saved-preset confirmations, and calm validation messages.
Spacing system: Use 22-30px soft panels, 14-18px mixer gaps, and large tap targets.
Responsive behavior: Desktop can use multiple tactile columns; mobile stacks controls and keeps the active preset near the primary action.
Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "TempoRoom / Calm audio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let soft shadows reduce accessibility or hide active states. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 14 - Neumorphism as the page design direction.
Prompt type: Mobile.
Best fit: audio tools, calm utilities, wellness and focus products.
Visual mood: Soft light, inset depth, rounded controls, and gentle shadows with tactile surfaces.
Scenario focus:
Mobile focus: Stack controls, keep active preset near the primary action, and avoid dense tables.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Soft Tactile Control.
Layout structure: Calm control surface with large knobs, inset sliders, preset pads, and a centered session state.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #e9eef5; surface #e9eef5; text #172033; muted #667085; primary #243b6b; accent #6aa6ff; border #f8fbff; radius 30px; shadow/material 14px 14px 34px rgba(148, 163, 184, .42), -14px -14px 34px rgba(255,255,255,.86).
Geometry: panel radius 30px; control radius 22px; chip/state radius 18px; media radius 26px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm medium-weight labels, clear values, and limited headings.
Components: Knobs, sliders, toggle wells, preset pads, and session chips should all feel tactile.
Buttons: Buttons are raised or inset with clear pressed states and strong enough contrast.
Button details: Use raised and inset tactile buttons, pressed states that sink inward, and loading states that keep the soft surface stable.
Feedback and alerts: Use gentle inset alerts, saved-preset confirmations, and calm validation messages.
Spacing system: Use 22-30px soft panels, 14-18px mixer gaps, and large tap targets.
Responsive behavior: Desktop can use multiple tactile columns; mobile stacks controls and keeps the active preset near the primary action.
Icons and media: Use waveform, sound layers, and tactile control objects instead of photos.
States: Show pressed, active layer, muted, disabled, timer-running, and saved preset states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "TempoRoom / Calm audio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let soft shadows reduce accessibility or hide active states. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
