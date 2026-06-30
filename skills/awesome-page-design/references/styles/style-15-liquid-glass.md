# Style 15 - Liquid Glass (液态玻璃)

## Summary

Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.

Chinese summary: 毛玻璃、透明层次、磨砂质感、科技感和未来感。

## Best For

botanical maps, spatial dashboards, premium futuristic tools

## Example Scenario

- Product sample: Glasshouse Nine
- Page job: Botanical glasshouse map
- Headline: Float humidity, watering, and visitor paths over a living conservatory.
- Primary action: Open canopy map
- Secondary action: Schedule watering

## Scenario Components

- Living map: Glass layers sit over beds, paths, and climate zones instead of a generic sci-fi background.
- Readable translucency: Tint and borders protect text while still feeling like glass.
- Garden operations: Visitor route, water schedule, and climate status are visible at once.

## Example States

- Fern room: Stable
- Orchid mist: Due
- West path: Open

## Layout Pattern

- Pattern: Glasshouse Climate Map (玻璃温室气候图)
- Archetype: Glasshouse Climate Map
- Structure: Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use clean futuristic labels with high contrast over every glass layer.
- Components: Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.
- Buttons: Use bordered glass controls and bright active states that do not rely on blur alone.
- Icons and media: Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.
- States: Show stable, due, open path, climate drift, selected zone, and mist running states.
- Avoid: Do not put low-contrast text over busy translucent scenery.

## Visual Language

- Background: `#07111f`
- Surface: `rgba(255,255,255,.13)`
- Text: `#f8fbff`
- Muted text: `#b9c5d6`
- Primary: `#dff7ff`
- Accent: `#8b5cf6`
- Border: `rgba(255,255,255,.26)`
- Radius: `24px`
- Panel radius: `24px`
- Control radius: `14px`
- Chip radius: `10px`
- Media radius: `20px`
- Geometry rule: glass curves balanced by visible structure; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 28px 90px rgba(15, 23, 42, .45)`

## Component Detail System

- Button system: Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.
- Feedback and alerts: Use translucent toasts, map-layer alerts, and readable inline status cards over glass.
- Spacing system: Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.
- Responsive behavior: Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.

Chinese implementation notes:

- 按钮细节：使用带可见边框的玻璃按钮、可读标签，以及基于色调而不是只靠模糊的 hover。
- 提示与反馈：使用半透明 toast、地图层提示，以及玻璃上可读的内联状态卡。
- 间距系统：玻璃面板 20-28px，透明层间距 14px，文本下方背景稳定。
- 响应式策略：桌面可拆分地图和控件；手机在操作更重要时把控件放到地图前。

## Page Adaptation Guide

- Landing page: Use a glass map or spatial product story with readable translucent panels and stable media backdrops.
- Dashboard: Use signal layers, selected rooms, map pins, translucent controls, and readable alerts.
- Admin panel: Use for premium spatial tools, not conventional back-office CRUD unless the map/object is central.
- Forms, tables, and data: Use glass fields only over stable surfaces; focus and errors need visible borders and text.
- Mobile: Place controls above ambience when action matters; keep glass panels readable over every background.
- Not a good fit for: Weak for low-power devices, accessibility-critical dense forms, or plain official portals.

## Usage Notes

- Layer translucent panels over vivid but softened media.
- Use blur, tint, and borders to keep text readable.
- Avoid low-contrast glass over busy images.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 15 - Liquid Glass as the page design direction.
Prompt type: Full Prompt.
Best fit: botanical maps, spatial dashboards, premium futuristic tools.
Visual mood: Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.
Scenario focus:
Landing adaptation: Use a glass map or spatial product story with readable translucent panels and stable media backdrops.
Dashboard adaptation: Use signal layers, selected rooms, map pins, translucent controls, and readable alerts.
Admin adaptation: Use for premium spatial tools, not conventional back-office CRUD unless the map/object is central.
Forms/data adaptation: Use glass fields only over stable surfaces; focus and errors need visible borders and text.
Mobile adaptation: Place controls above ambience when action matters; keep glass panels readable over every background.
Avoid for: Weak for low-power devices, accessibility-critical dense forms, or plain official portals.
Layout archetype: Glasshouse Climate Map.
Layout structure: Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #07111f; surface rgba(255,255,255,.13); text #f8fbff; muted #b9c5d6; primary #dff7ff; accent #8b5cf6; border rgba(255,255,255,.26); radius 24px; shadow/material 0 28px 90px rgba(15, 23, 42, .45).
Geometry: panel radius 24px; control radius 14px; chip/state radius 10px; media radius 20px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use clean futuristic labels with high contrast over every glass layer.
Components: Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.
Buttons: Use bordered glass controls and bright active states that do not rely on blur alone.
Button details: Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.
Feedback and alerts: Use translucent toasts, map-layer alerts, and readable inline status cards over glass.
Spacing system: Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.
Responsive behavior: Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.
Icons and media: Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.
States: Show stable, due, open path, climate drift, selected zone, and mist running states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Glasshouse Nine / Botanical glasshouse map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not put low-contrast text over busy translucent scenery. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 15 - Liquid Glass as the page design direction.
Prompt type: Landing Page.
Best fit: botanical maps, spatial dashboards, premium futuristic tools.
Visual mood: Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.
Scenario focus:
Landing page focus: Use a glass map or spatial product story with readable translucent panels and stable media backdrops.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Glasshouse Climate Map.
Layout structure: Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #07111f; surface rgba(255,255,255,.13); text #f8fbff; muted #b9c5d6; primary #dff7ff; accent #8b5cf6; border rgba(255,255,255,.26); radius 24px; shadow/material 0 28px 90px rgba(15, 23, 42, .45).
Geometry: panel radius 24px; control radius 14px; chip/state radius 10px; media radius 20px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use clean futuristic labels with high contrast over every glass layer.
Components: Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.
Buttons: Use bordered glass controls and bright active states that do not rely on blur alone.
Button details: Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.
Feedback and alerts: Use translucent toasts, map-layer alerts, and readable inline status cards over glass.
Spacing system: Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.
Responsive behavior: Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.
Icons and media: Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.
States: Show stable, due, open path, climate drift, selected zone, and mist running states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Glasshouse Nine / Botanical glasshouse map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not put low-contrast text over busy translucent scenery. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 15 - Liquid Glass as the page design direction.
Prompt type: Dashboard.
Best fit: botanical maps, spatial dashboards, premium futuristic tools.
Visual mood: Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.
Scenario focus:
Dashboard focus: Use signal layers, selected rooms, map pins, translucent controls, and readable alerts.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Glasshouse Climate Map.
Layout structure: Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #07111f; surface rgba(255,255,255,.13); text #f8fbff; muted #b9c5d6; primary #dff7ff; accent #8b5cf6; border rgba(255,255,255,.26); radius 24px; shadow/material 0 28px 90px rgba(15, 23, 42, .45).
Geometry: panel radius 24px; control radius 14px; chip/state radius 10px; media radius 20px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use clean futuristic labels with high contrast over every glass layer.
Components: Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.
Buttons: Use bordered glass controls and bright active states that do not rely on blur alone.
Button details: Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.
Feedback and alerts: Use translucent toasts, map-layer alerts, and readable inline status cards over glass.
Spacing system: Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.
Responsive behavior: Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.
Icons and media: Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.
States: Show stable, due, open path, climate drift, selected zone, and mist running states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Glasshouse Nine / Botanical glasshouse map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not put low-contrast text over busy translucent scenery. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 15 - Liquid Glass as the page design direction.
Prompt type: Admin Panel.
Best fit: botanical maps, spatial dashboards, premium futuristic tools.
Visual mood: Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.
Scenario focus:
Admin panel focus: Use for premium spatial tools, not conventional back-office CRUD unless the map/object is central.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Glasshouse Climate Map.
Layout structure: Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #07111f; surface rgba(255,255,255,.13); text #f8fbff; muted #b9c5d6; primary #dff7ff; accent #8b5cf6; border rgba(255,255,255,.26); radius 24px; shadow/material 0 28px 90px rgba(15, 23, 42, .45).
Geometry: panel radius 24px; control radius 14px; chip/state radius 10px; media radius 20px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use clean futuristic labels with high contrast over every glass layer.
Components: Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.
Buttons: Use bordered glass controls and bright active states that do not rely on blur alone.
Button details: Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.
Feedback and alerts: Use translucent toasts, map-layer alerts, and readable inline status cards over glass.
Spacing system: Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.
Responsive behavior: Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.
Icons and media: Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.
States: Show stable, due, open path, climate drift, selected zone, and mist running states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Glasshouse Nine / Botanical glasshouse map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not put low-contrast text over busy translucent scenery. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 15 - Liquid Glass as the page design direction.
Prompt type: Mobile.
Best fit: botanical maps, spatial dashboards, premium futuristic tools.
Visual mood: Frosted glass, transparent layering, blurred materials, and a futuristic technology mood.
Scenario focus:
Mobile focus: Place controls above ambience when action matters; keep glass panels readable over every background.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Glasshouse Climate Map.
Layout structure: Translucent conservatory map with climate panes, water zones, canopy paths, plant notes, and visitor route controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #07111f; surface rgba(255,255,255,.13); text #f8fbff; muted #b9c5d6; primary #dff7ff; accent #8b5cf6; border rgba(255,255,255,.26); radius 24px; shadow/material 0 28px 90px rgba(15, 23, 42, .45).
Geometry: panel radius 24px; control radius 14px; chip/state radius 10px; media radius 20px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use clean futuristic labels with high contrast over every glass layer.
Components: Glass panels, climate pins, watering rows, plant cards, and route overlays should stay readable.
Buttons: Use bordered glass controls and bright active states that do not rely on blur alone.
Button details: Use glass buttons with visible borders, readable labels, and hover states based on tint rather than blur alone.
Feedback and alerts: Use translucent toasts, map-layer alerts, and readable inline status cards over glass.
Spacing system: Use 20-28px glass panels, 14px translucent gaps, and stable backdrops under text.
Responsive behavior: Desktop can split map and controls; mobile places controls above the map when the action matters more than ambience.
Icons and media: Use plant beds, canopy maps, mist zones, roof lines, and watering schedules.
States: Show stable, due, open path, climate drift, selected zone, and mist running states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Glasshouse Nine / Botanical glasshouse map" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not put low-contrast text over busy translucent scenery. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
