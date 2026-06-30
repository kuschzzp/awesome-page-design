# Style 03 - Aurora Gradient (极光渐变)

## Summary

Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere.

Chinese summary: 暗色画布、极光色场、柔光、漂移渐变能量和高级沉浸氛围。

## Best For

immersive art venues, futuristic products, premium dark experiences

## Example Scenario

- Product sample: Northlight Rooms
- Page job: Immersive listening salon
- Headline: Book a quiet room where color, sound, and time move together.
- Primary action: Reserve a session
- Secondary action: View room map

## Scenario Components

- Light as schedule: The aurora field marks session phases, entry time, and room intensity instead of acting as decoration.
- Human pace: Capacity, quiet rules, and host notes stay close to the booking action.
- Spatial proof: Room map, sound cues, and visitor notes make the page feel like a real venue.

## Example States

- Dusk Room: Open
- Rain Chamber: Few seats
- North Alcove: Private

## Layout Pattern

- Pattern: Aurora Listening Room (极光听觉房间)
- Archetype: Aurora Listening Room
- Structure: Immersive venue layout with a luminous room field, session rail, capacity notes, and sound-light booking controls.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use calm dark UI type, generous line height, small venue metadata, and restrained luminous headings.
- Components: Room fields, session chips, ticket states, host notes, map legends, and quiet booking controls should feel like a real cultural venue.
- Buttons: Primary actions may glow softly; secondary actions stay translucent with clear borders.
- Icons and media: Use aurora light, room maps, sound rings, seat notes, and session bands as useful objects.
- States: Show open, few seats, private, selected room, check-in soon, and sold-out states.
- Avoid: Do not make the page a generic AI glow dashboard.

## Visual Language

- Background: `#060a1f`
- Surface: `rgba(255,255,255,.08)`
- Text: `#f8fbff`
- Muted text: `#b8c2d8`
- Primary: `#f8fbff`
- Accent: `#22d3ee`
- Border: `rgba(255,255,255,.18)`
- Radius: `14px`
- Panel radius: `14px`
- Control radius: `8px`
- Chip radius: `6px`
- Media radius: `12px`
- Geometry rule: restrained aurora panels with crisp controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 28px 90px rgba(34, 211, 238, .18)`

## Component Detail System

- Button system: Use luminous but restrained buttons, translucent secondary controls, and selected states that glow only at the edge.
- Feedback and alerts: Use soft toast panels, score-change alerts, and low-noise validation hints over dark panels.
- Spacing system: Use 22-28px glass panel padding, 14px component gaps, and generous breathing room around comparison cards.
- Responsive behavior: Desktop keeps evidence, comparison, and review notes side by side; mobile stacks them as review cards and keeps the score/primary action visible before media.

Chinese implementation notes:

- 按钮细节：使用克制发光按钮、半透明次级控件，以及只在边缘发光的选中态。
- 提示与反馈：使用柔和 toast、分数变化提示，以及暗色面板上的低噪声校验提示。
- 间距系统：玻璃面板内边距 22-28px，组件间距 14px，对比卡周围保持足够呼吸感。
- 响应式策略：桌面并列证据、对比和审阅备注；手机堆叠成审阅卡，并把分数和主操作放在媒体之前。

## Page Adaptation Guide

- Landing page: Use a premium dark product narrative with comparison panels, evidence cards, soft media, and restrained glow.
- Dashboard: Use model runs, confidence scores, review notes, and selected-state panels rather than generic dark cards.
- Admin panel: Use review workflows, validation queues, and low-noise status panels; keep destructive states crisp.
- Forms, tables, and data: Use translucent field groups over stable dark surfaces with clear focus and validation edges.
- Mobile: Show score and primary action before media; stack comparison cards with readable text over every panel.
- Not a good fit for: Weak for dense clerical tools or pages that must feel plain and official.

## Usage Notes

- Use glow as atmosphere around important content.
- Keep text panels calm and readable.
- Avoid turning every surface into a rainbow gradient.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 03 - Aurora Gradient as the page design direction.
Prompt type: Full Prompt.
Best fit: immersive art venues, futuristic products, premium dark experiences.
Visual mood: Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere.
Scenario focus:
Landing adaptation: Use a premium dark product narrative with comparison panels, evidence cards, soft media, and restrained glow.
Dashboard adaptation: Use model runs, confidence scores, review notes, and selected-state panels rather than generic dark cards.
Admin adaptation: Use review workflows, validation queues, and low-noise status panels; keep destructive states crisp.
Forms/data adaptation: Use translucent field groups over stable dark surfaces with clear focus and validation edges.
Mobile adaptation: Show score and primary action before media; stack comparison cards with readable text over every panel.
Avoid for: Weak for dense clerical tools or pages that must feel plain and official.
Layout archetype: Aurora Listening Room.
Layout structure: Immersive venue layout with a luminous room field, session rail, capacity notes, and sound-light booking controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #060a1f; surface rgba(255,255,255,.08); text #f8fbff; muted #b8c2d8; primary #f8fbff; accent #22d3ee; border rgba(255,255,255,.18); radius 14px; shadow/material 0 28px 90px rgba(34, 211, 238, .18).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm dark UI type, generous line height, small venue metadata, and restrained luminous headings.
Components: Room fields, session chips, ticket states, host notes, map legends, and quiet booking controls should feel like a real cultural venue.
Buttons: Primary actions may glow softly; secondary actions stay translucent with clear borders.
Button details: Use luminous but restrained buttons, translucent secondary controls, and selected states that glow only at the edge.
Feedback and alerts: Use soft toast panels, score-change alerts, and low-noise validation hints over dark panels.
Spacing system: Use 22-28px glass panel padding, 14px component gaps, and generous breathing room around comparison cards.
Responsive behavior: Desktop keeps evidence, comparison, and review notes side by side; mobile stacks them as review cards and keeps the score/primary action visible before media.
Icons and media: Use aurora light, room maps, sound rings, seat notes, and session bands as useful objects.
States: Show open, few seats, private, selected room, check-in soon, and sold-out states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Northlight Rooms / Immersive listening salon" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page a generic AI glow dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 03 - Aurora Gradient as the page design direction.
Prompt type: Landing Page.
Best fit: immersive art venues, futuristic products, premium dark experiences.
Visual mood: Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere.
Scenario focus:
Landing page focus: Use a premium dark product narrative with comparison panels, evidence cards, soft media, and restrained glow.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Aurora Listening Room.
Layout structure: Immersive venue layout with a luminous room field, session rail, capacity notes, and sound-light booking controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #060a1f; surface rgba(255,255,255,.08); text #f8fbff; muted #b8c2d8; primary #f8fbff; accent #22d3ee; border rgba(255,255,255,.18); radius 14px; shadow/material 0 28px 90px rgba(34, 211, 238, .18).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm dark UI type, generous line height, small venue metadata, and restrained luminous headings.
Components: Room fields, session chips, ticket states, host notes, map legends, and quiet booking controls should feel like a real cultural venue.
Buttons: Primary actions may glow softly; secondary actions stay translucent with clear borders.
Button details: Use luminous but restrained buttons, translucent secondary controls, and selected states that glow only at the edge.
Feedback and alerts: Use soft toast panels, score-change alerts, and low-noise validation hints over dark panels.
Spacing system: Use 22-28px glass panel padding, 14px component gaps, and generous breathing room around comparison cards.
Responsive behavior: Desktop keeps evidence, comparison, and review notes side by side; mobile stacks them as review cards and keeps the score/primary action visible before media.
Icons and media: Use aurora light, room maps, sound rings, seat notes, and session bands as useful objects.
States: Show open, few seats, private, selected room, check-in soon, and sold-out states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Northlight Rooms / Immersive listening salon" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page a generic AI glow dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 03 - Aurora Gradient as the page design direction.
Prompt type: Dashboard.
Best fit: immersive art venues, futuristic products, premium dark experiences.
Visual mood: Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere.
Scenario focus:
Dashboard focus: Use model runs, confidence scores, review notes, and selected-state panels rather than generic dark cards.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Aurora Listening Room.
Layout structure: Immersive venue layout with a luminous room field, session rail, capacity notes, and sound-light booking controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #060a1f; surface rgba(255,255,255,.08); text #f8fbff; muted #b8c2d8; primary #f8fbff; accent #22d3ee; border rgba(255,255,255,.18); radius 14px; shadow/material 0 28px 90px rgba(34, 211, 238, .18).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm dark UI type, generous line height, small venue metadata, and restrained luminous headings.
Components: Room fields, session chips, ticket states, host notes, map legends, and quiet booking controls should feel like a real cultural venue.
Buttons: Primary actions may glow softly; secondary actions stay translucent with clear borders.
Button details: Use luminous but restrained buttons, translucent secondary controls, and selected states that glow only at the edge.
Feedback and alerts: Use soft toast panels, score-change alerts, and low-noise validation hints over dark panels.
Spacing system: Use 22-28px glass panel padding, 14px component gaps, and generous breathing room around comparison cards.
Responsive behavior: Desktop keeps evidence, comparison, and review notes side by side; mobile stacks them as review cards and keeps the score/primary action visible before media.
Icons and media: Use aurora light, room maps, sound rings, seat notes, and session bands as useful objects.
States: Show open, few seats, private, selected room, check-in soon, and sold-out states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Northlight Rooms / Immersive listening salon" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page a generic AI glow dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 03 - Aurora Gradient as the page design direction.
Prompt type: Admin Panel.
Best fit: immersive art venues, futuristic products, premium dark experiences.
Visual mood: Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere.
Scenario focus:
Admin panel focus: Use review workflows, validation queues, and low-noise status panels; keep destructive states crisp.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Aurora Listening Room.
Layout structure: Immersive venue layout with a luminous room field, session rail, capacity notes, and sound-light booking controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #060a1f; surface rgba(255,255,255,.08); text #f8fbff; muted #b8c2d8; primary #f8fbff; accent #22d3ee; border rgba(255,255,255,.18); radius 14px; shadow/material 0 28px 90px rgba(34, 211, 238, .18).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm dark UI type, generous line height, small venue metadata, and restrained luminous headings.
Components: Room fields, session chips, ticket states, host notes, map legends, and quiet booking controls should feel like a real cultural venue.
Buttons: Primary actions may glow softly; secondary actions stay translucent with clear borders.
Button details: Use luminous but restrained buttons, translucent secondary controls, and selected states that glow only at the edge.
Feedback and alerts: Use soft toast panels, score-change alerts, and low-noise validation hints over dark panels.
Spacing system: Use 22-28px glass panel padding, 14px component gaps, and generous breathing room around comparison cards.
Responsive behavior: Desktop keeps evidence, comparison, and review notes side by side; mobile stacks them as review cards and keeps the score/primary action visible before media.
Icons and media: Use aurora light, room maps, sound rings, seat notes, and session bands as useful objects.
States: Show open, few seats, private, selected room, check-in soon, and sold-out states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Northlight Rooms / Immersive listening salon" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page a generic AI glow dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 03 - Aurora Gradient as the page design direction.
Prompt type: Mobile.
Best fit: immersive art venues, futuristic products, premium dark experiences.
Visual mood: Dark canvas, aurora color fields, soft glow, drifting gradient energy, and premium immersive atmosphere.
Scenario focus:
Mobile focus: Show score and primary action before media; stack comparison cards with readable text over every panel.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Aurora Listening Room.
Layout structure: Immersive venue layout with a luminous room field, session rail, capacity notes, and sound-light booking controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #060a1f; surface rgba(255,255,255,.08); text #f8fbff; muted #b8c2d8; primary #f8fbff; accent #22d3ee; border rgba(255,255,255,.18); radius 14px; shadow/material 0 28px 90px rgba(34, 211, 238, .18).
Geometry: panel radius 14px; control radius 8px; chip/state radius 6px; media radius 12px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use calm dark UI type, generous line height, small venue metadata, and restrained luminous headings.
Components: Room fields, session chips, ticket states, host notes, map legends, and quiet booking controls should feel like a real cultural venue.
Buttons: Primary actions may glow softly; secondary actions stay translucent with clear borders.
Button details: Use luminous but restrained buttons, translucent secondary controls, and selected states that glow only at the edge.
Feedback and alerts: Use soft toast panels, score-change alerts, and low-noise validation hints over dark panels.
Spacing system: Use 22-28px glass panel padding, 14px component gaps, and generous breathing room around comparison cards.
Responsive behavior: Desktop keeps evidence, comparison, and review notes side by side; mobile stacks them as review cards and keeps the score/primary action visible before media.
Icons and media: Use aurora light, room maps, sound rings, seat notes, and session bands as useful objects.
States: Show open, few seats, private, selected room, check-in soon, and sold-out states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Northlight Rooms / Immersive listening salon" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page a generic AI glow dashboard. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
