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

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 26 - Industrial Control as the page design direction.
Prompt type: Full Prompt.
Best fit: print rooms, factory monitoring, logistics control, hardware fleets, incident rooms.
Visual mood: Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity.
Scenario focus:
Landing adaptation: Use a rugged operations story only when the public page is about equipment, reliability, service, or safety proof.
Dashboard adaptation: Use alarms, filters, threshold metrics, service queues, ownership chips, and row-local recovery actions.
Admin adaptation: Use for operations consoles, hardware fleets, logistics control, safety checks, and service management.
Forms/data adaptation: Use clear labels, hard field borders, machine IDs, explicit validation, and locked/destructive confirmations.
Mobile adaptation: Show alarm summary, acknowledge action, active filters, alarm list, and service detail in that order.
Avoid for: Weak for luxury editorial, calm wellness, playful education, or long-form reading.
Layout archetype: Industrial Print Room.
Layout structure: Rugged print-studio control room with press matrix, ink batch table, drying rack, safety hold, cleanup log, and service evidence.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #11130f; surface #1d211c; text #f2f2ea; muted #a7ac9e; primary #d6ff3f; accent #ffb000; border #3d4438; radius 2px; shadow/material 0 18px 60px rgba(0, 0, 0, .35).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rugged UI type, tabular machine values, short state names, and strong row scanning.
Components: Press cards, ink rows, lockout notes, rack meters, service tags, and acknowledgement buttons should feel shop-floor ready.
Buttons: Use durable rectangular controls; warning and acknowledgement states must be unmistakable.
Button details: Use hard rectangular controls, explicit acknowledgement buttons, safety-color destructive states, and disabled states that look locked out.
Feedback and alerts: Use alarm banners, row-local warnings, service-log confirmations, and recovery actions attached to the affected machine.
Spacing system: Use 16-22px rugged panels, 8-10px dense status rows, 44-52px control heights, and compact filter rails.
Responsive behavior: Desktop keeps filters, alarms, metrics, and inspector visible; mobile shows alarm summary, acknowledge action, filters, then service detail.
Icons and media: Use press labels, ink batches, roller checks, drying racks, service logs, and safety notes.
States: Show hold, mixing, open, locked out, recovered, warning, and acknowledged states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Press Room 12 / Printmaking studio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften safety-critical craft operations into glossy consumer UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 26 - Industrial Control as the page design direction.
Prompt type: Landing Page.
Best fit: print rooms, factory monitoring, logistics control, hardware fleets, incident rooms.
Visual mood: Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity.
Scenario focus:
Landing page focus: Use a rugged operations story only when the public page is about equipment, reliability, service, or safety proof.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Industrial Print Room.
Layout structure: Rugged print-studio control room with press matrix, ink batch table, drying rack, safety hold, cleanup log, and service evidence.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #11130f; surface #1d211c; text #f2f2ea; muted #a7ac9e; primary #d6ff3f; accent #ffb000; border #3d4438; radius 2px; shadow/material 0 18px 60px rgba(0, 0, 0, .35).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rugged UI type, tabular machine values, short state names, and strong row scanning.
Components: Press cards, ink rows, lockout notes, rack meters, service tags, and acknowledgement buttons should feel shop-floor ready.
Buttons: Use durable rectangular controls; warning and acknowledgement states must be unmistakable.
Button details: Use hard rectangular controls, explicit acknowledgement buttons, safety-color destructive states, and disabled states that look locked out.
Feedback and alerts: Use alarm banners, row-local warnings, service-log confirmations, and recovery actions attached to the affected machine.
Spacing system: Use 16-22px rugged panels, 8-10px dense status rows, 44-52px control heights, and compact filter rails.
Responsive behavior: Desktop keeps filters, alarms, metrics, and inspector visible; mobile shows alarm summary, acknowledge action, filters, then service detail.
Icons and media: Use press labels, ink batches, roller checks, drying racks, service logs, and safety notes.
States: Show hold, mixing, open, locked out, recovered, warning, and acknowledged states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Press Room 12 / Printmaking studio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften safety-critical craft operations into glossy consumer UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 26 - Industrial Control as the page design direction.
Prompt type: Dashboard.
Best fit: print rooms, factory monitoring, logistics control, hardware fleets, incident rooms.
Visual mood: Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity.
Scenario focus:
Dashboard focus: Use alarms, filters, threshold metrics, service queues, ownership chips, and row-local recovery actions.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Industrial Print Room.
Layout structure: Rugged print-studio control room with press matrix, ink batch table, drying rack, safety hold, cleanup log, and service evidence.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #11130f; surface #1d211c; text #f2f2ea; muted #a7ac9e; primary #d6ff3f; accent #ffb000; border #3d4438; radius 2px; shadow/material 0 18px 60px rgba(0, 0, 0, .35).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rugged UI type, tabular machine values, short state names, and strong row scanning.
Components: Press cards, ink rows, lockout notes, rack meters, service tags, and acknowledgement buttons should feel shop-floor ready.
Buttons: Use durable rectangular controls; warning and acknowledgement states must be unmistakable.
Button details: Use hard rectangular controls, explicit acknowledgement buttons, safety-color destructive states, and disabled states that look locked out.
Feedback and alerts: Use alarm banners, row-local warnings, service-log confirmations, and recovery actions attached to the affected machine.
Spacing system: Use 16-22px rugged panels, 8-10px dense status rows, 44-52px control heights, and compact filter rails.
Responsive behavior: Desktop keeps filters, alarms, metrics, and inspector visible; mobile shows alarm summary, acknowledge action, filters, then service detail.
Icons and media: Use press labels, ink batches, roller checks, drying racks, service logs, and safety notes.
States: Show hold, mixing, open, locked out, recovered, warning, and acknowledged states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Press Room 12 / Printmaking studio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften safety-critical craft operations into glossy consumer UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 26 - Industrial Control as the page design direction.
Prompt type: Admin Panel.
Best fit: print rooms, factory monitoring, logistics control, hardware fleets, incident rooms.
Visual mood: Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity.
Scenario focus:
Admin panel focus: Use for operations consoles, hardware fleets, logistics control, safety checks, and service management.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Industrial Print Room.
Layout structure: Rugged print-studio control room with press matrix, ink batch table, drying rack, safety hold, cleanup log, and service evidence.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #11130f; surface #1d211c; text #f2f2ea; muted #a7ac9e; primary #d6ff3f; accent #ffb000; border #3d4438; radius 2px; shadow/material 0 18px 60px rgba(0, 0, 0, .35).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rugged UI type, tabular machine values, short state names, and strong row scanning.
Components: Press cards, ink rows, lockout notes, rack meters, service tags, and acknowledgement buttons should feel shop-floor ready.
Buttons: Use durable rectangular controls; warning and acknowledgement states must be unmistakable.
Button details: Use hard rectangular controls, explicit acknowledgement buttons, safety-color destructive states, and disabled states that look locked out.
Feedback and alerts: Use alarm banners, row-local warnings, service-log confirmations, and recovery actions attached to the affected machine.
Spacing system: Use 16-22px rugged panels, 8-10px dense status rows, 44-52px control heights, and compact filter rails.
Responsive behavior: Desktop keeps filters, alarms, metrics, and inspector visible; mobile shows alarm summary, acknowledge action, filters, then service detail.
Icons and media: Use press labels, ink batches, roller checks, drying racks, service logs, and safety notes.
States: Show hold, mixing, open, locked out, recovered, warning, and acknowledged states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Press Room 12 / Printmaking studio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften safety-critical craft operations into glossy consumer UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 26 - Industrial Control as the page design direction.
Prompt type: Mobile.
Best fit: print rooms, factory monitoring, logistics control, hardware fleets, incident rooms.
Visual mood: Rugged dark panels, safety accents, dense status rows, machine labels, and maintainable control-room clarity.
Scenario focus:
Mobile focus: Show alarm summary, acknowledge action, active filters, alarm list, and service detail in that order.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Industrial Print Room.
Layout structure: Rugged print-studio control room with press matrix, ink batch table, drying rack, safety hold, cleanup log, and service evidence.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #11130f; surface #1d211c; text #f2f2ea; muted #a7ac9e; primary #d6ff3f; accent #ffb000; border #3d4438; radius 2px; shadow/material 0 18px 60px rgba(0, 0, 0, .35).
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use rugged UI type, tabular machine values, short state names, and strong row scanning.
Components: Press cards, ink rows, lockout notes, rack meters, service tags, and acknowledgement buttons should feel shop-floor ready.
Buttons: Use durable rectangular controls; warning and acknowledgement states must be unmistakable.
Button details: Use hard rectangular controls, explicit acknowledgement buttons, safety-color destructive states, and disabled states that look locked out.
Feedback and alerts: Use alarm banners, row-local warnings, service-log confirmations, and recovery actions attached to the affected machine.
Spacing system: Use 16-22px rugged panels, 8-10px dense status rows, 44-52px control heights, and compact filter rails.
Responsive behavior: Desktop keeps filters, alarms, metrics, and inspector visible; mobile shows alarm summary, acknowledge action, filters, then service detail.
Icons and media: Use press labels, ink batches, roller checks, drying racks, service logs, and safety notes.
States: Show hold, mixing, open, locked out, recovered, warning, and acknowledged states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Press Room 12 / Printmaking studio control" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not soften safety-critical craft operations into glossy consumer UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
