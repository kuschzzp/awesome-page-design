# Style 22 - Art Deco (装饰艺术)

## Summary

Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama.

Chinese summary: 对称海报构图、暗色宝石调、金色线框、阶梯几何和精致的高级场景感。

## Best For

luxury hospitality, cultural venues, premium events, editorial brand launches

## Example Scenario

- Product sample: Marble Fox Theatre
- Page job: Jazz theatre foyer
- Headline: Reserve a velvet table for a brass set and midnight dessert.
- Primary action: Reserve table
- Secondary action: View seating plan

## Scenario Components

- Axial drama: Symmetry, stepped frames, and gold rules feel like a theatre foyer, not a luxury wallpaper.
- Reservation proof: Tables, set times, bar notes, and program states become polished labels.
- Ceremony with use: The primary action is staged but still immediate.

## Example States

- Table 7: Open
- Dessert card: Signed
- First set: 9PM

## Layout Pattern

- Pattern: Deco Theatre Foyer (装饰艺术剧场门厅)
- Archetype: Deco Theatre Foyer
- Structure: Symmetric jazz-theatre booking page with marquee axis, table availability, program cards, bar notes, and gilded seating plan.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use elegant display headings, refined numerals, and short polished venue labels.
- Components: Marquee frames, table rows, set-time labels, program strips, and ceremonial booking controls should align to the center axis.
- Buttons: Use framed gold primary buttons and fine outline secondary actions.
- Icons and media: Use seating plans, stage labels, program cards, velvet textures, and bar menu notes.
- States: Show open, signed, first set, held, waitlist, and invitation states.
- Avoid: Do not scatter gold trim without information value.

## Visual Language

- Background: `#0e1020`
- Surface: `#171526`
- Text: `#fff4d6`
- Muted text: `#d8c58e`
- Primary: `#d4af37`
- Accent: `#2dd4bf`
- Border: `#d4af37`
- Radius: `2px`
- Panel radius: `2px`
- Control radius: `2px`
- Chip radius: `0`
- Media radius: `0`
- Geometry rule: stepped Art Deco geometry with crisp framed surfaces; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 26px 80px rgba(212, 175, 55, .18)`

## Component Detail System

- Button system: Use framed gold primary buttons, fine outline secondary buttons, centered labels, and pressed states that feel like a mechanical latch.
- Feedback and alerts: Use polished labels, reserved alert strips, invitation confirmations, and availability states aligned to the poster axis.
- Spacing system: Use 24-34px ceremonial panels, tight 8-12px label gaps, and generous space around the headline and reservation action.
- Responsive behavior: Desktop can use symmetry and side proof panels; mobile keeps the monogram, headline, primary action, availability, then room details in one centered stack.

Chinese implementation notes:

- 按钮细节：使用金色框线主按钮、细描边次按钮、居中标签，以及像机械扣件一样明确的按下态。
- 提示与反馈：使用精致标签、克制提示条、邀请确认和沿海报轴线对齐的可用状态。
- 间距系统：仪式化面板内边距 24-34px，标签间距 8-12px，标题和预订操作周围保留充足空间。
- 响应式策略：桌面可使用对称和侧边证明面板；手机按字标、标题、主操作、可用性、房间详情的顺序居中堆叠。

## Page Adaptation Guide

- Landing page: Use a symmetrical event or venue poster with gilded proof, availability, refined offer copy, and one ceremonial booking action.
- Dashboard: Use sparingly for concierge, venue, or premium booking dashboards where room status and appointments are the main objects.
- Admin panel: Use for curated hospitality/event operations only; keep tables simplified and avoid ornamental bulk-action clutter.
- Forms, tables, and data: Use short reservation forms, visible labels, elegant validation, and framed confirmation states.
- Mobile: Order as monogram, offer, primary booking action, availability, room proof, then secondary story.
- Not a good fit for: Weak for dense operational tools, casual consumer apps, and utilitarian admin pages.

## Usage Notes

- Build the page around symmetry, axial alignment, and staged reveal.
- Use gold rules as structure, not random trim.
- Keep copy refined and short so the ornament has room to breathe.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 22 - Art Deco as the page design direction.
Prompt type: Full Prompt.
Best fit: luxury hospitality, cultural venues, premium events, editorial brand launches.
Visual mood: Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama.
Scenario focus:
Landing adaptation: Use a symmetrical event or venue poster with gilded proof, availability, refined offer copy, and one ceremonial booking action.
Dashboard adaptation: Use sparingly for concierge, venue, or premium booking dashboards where room status and appointments are the main objects.
Admin adaptation: Use for curated hospitality/event operations only; keep tables simplified and avoid ornamental bulk-action clutter.
Forms/data adaptation: Use short reservation forms, visible labels, elegant validation, and framed confirmation states.
Mobile adaptation: Order as monogram, offer, primary booking action, availability, room proof, then secondary story.
Avoid for: Weak for dense operational tools, casual consumer apps, and utilitarian admin pages.
Layout archetype: Deco Theatre Foyer.
Layout structure: Symmetric jazz-theatre booking page with marquee axis, table availability, program cards, bar notes, and gilded seating plan.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0e1020; surface #171526; text #fff4d6; muted #d8c58e; primary #d4af37; accent #2dd4bf; border #d4af37; radius 2px; shadow/material 0 26px 80px rgba(212, 175, 55, .18).
Geometry: panel radius 2px; control radius 2px; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use elegant display headings, refined numerals, and short polished venue labels.
Components: Marquee frames, table rows, set-time labels, program strips, and ceremonial booking controls should align to the center axis.
Buttons: Use framed gold primary buttons and fine outline secondary actions.
Button details: Use framed gold primary buttons, fine outline secondary buttons, centered labels, and pressed states that feel like a mechanical latch.
Feedback and alerts: Use polished labels, reserved alert strips, invitation confirmations, and availability states aligned to the poster axis.
Spacing system: Use 24-34px ceremonial panels, tight 8-12px label gaps, and generous space around the headline and reservation action.
Responsive behavior: Desktop can use symmetry and side proof panels; mobile keeps the monogram, headline, primary action, availability, then room details in one centered stack.
Icons and media: Use seating plans, stage labels, program cards, velvet textures, and bar menu notes.
States: Show open, signed, first set, held, waitlist, and invitation states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Marble Fox Theatre / Jazz theatre foyer" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not scatter gold trim without information value. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 22 - Art Deco as the page design direction.
Prompt type: Landing Page.
Best fit: luxury hospitality, cultural venues, premium events, editorial brand launches.
Visual mood: Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama.
Scenario focus:
Landing page focus: Use a symmetrical event or venue poster with gilded proof, availability, refined offer copy, and one ceremonial booking action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Deco Theatre Foyer.
Layout structure: Symmetric jazz-theatre booking page with marquee axis, table availability, program cards, bar notes, and gilded seating plan.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0e1020; surface #171526; text #fff4d6; muted #d8c58e; primary #d4af37; accent #2dd4bf; border #d4af37; radius 2px; shadow/material 0 26px 80px rgba(212, 175, 55, .18).
Geometry: panel radius 2px; control radius 2px; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use elegant display headings, refined numerals, and short polished venue labels.
Components: Marquee frames, table rows, set-time labels, program strips, and ceremonial booking controls should align to the center axis.
Buttons: Use framed gold primary buttons and fine outline secondary actions.
Button details: Use framed gold primary buttons, fine outline secondary buttons, centered labels, and pressed states that feel like a mechanical latch.
Feedback and alerts: Use polished labels, reserved alert strips, invitation confirmations, and availability states aligned to the poster axis.
Spacing system: Use 24-34px ceremonial panels, tight 8-12px label gaps, and generous space around the headline and reservation action.
Responsive behavior: Desktop can use symmetry and side proof panels; mobile keeps the monogram, headline, primary action, availability, then room details in one centered stack.
Icons and media: Use seating plans, stage labels, program cards, velvet textures, and bar menu notes.
States: Show open, signed, first set, held, waitlist, and invitation states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Marble Fox Theatre / Jazz theatre foyer" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not scatter gold trim without information value. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 22 - Art Deco as the page design direction.
Prompt type: Dashboard.
Best fit: luxury hospitality, cultural venues, premium events, editorial brand launches.
Visual mood: Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama.
Scenario focus:
Dashboard focus: Use sparingly for concierge, venue, or premium booking dashboards where room status and appointments are the main objects.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Deco Theatre Foyer.
Layout structure: Symmetric jazz-theatre booking page with marquee axis, table availability, program cards, bar notes, and gilded seating plan.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0e1020; surface #171526; text #fff4d6; muted #d8c58e; primary #d4af37; accent #2dd4bf; border #d4af37; radius 2px; shadow/material 0 26px 80px rgba(212, 175, 55, .18).
Geometry: panel radius 2px; control radius 2px; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use elegant display headings, refined numerals, and short polished venue labels.
Components: Marquee frames, table rows, set-time labels, program strips, and ceremonial booking controls should align to the center axis.
Buttons: Use framed gold primary buttons and fine outline secondary actions.
Button details: Use framed gold primary buttons, fine outline secondary buttons, centered labels, and pressed states that feel like a mechanical latch.
Feedback and alerts: Use polished labels, reserved alert strips, invitation confirmations, and availability states aligned to the poster axis.
Spacing system: Use 24-34px ceremonial panels, tight 8-12px label gaps, and generous space around the headline and reservation action.
Responsive behavior: Desktop can use symmetry and side proof panels; mobile keeps the monogram, headline, primary action, availability, then room details in one centered stack.
Icons and media: Use seating plans, stage labels, program cards, velvet textures, and bar menu notes.
States: Show open, signed, first set, held, waitlist, and invitation states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Marble Fox Theatre / Jazz theatre foyer" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not scatter gold trim without information value. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 22 - Art Deco as the page design direction.
Prompt type: Admin Panel.
Best fit: luxury hospitality, cultural venues, premium events, editorial brand launches.
Visual mood: Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama.
Scenario focus:
Admin panel focus: Use for curated hospitality/event operations only; keep tables simplified and avoid ornamental bulk-action clutter.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Deco Theatre Foyer.
Layout structure: Symmetric jazz-theatre booking page with marquee axis, table availability, program cards, bar notes, and gilded seating plan.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0e1020; surface #171526; text #fff4d6; muted #d8c58e; primary #d4af37; accent #2dd4bf; border #d4af37; radius 2px; shadow/material 0 26px 80px rgba(212, 175, 55, .18).
Geometry: panel radius 2px; control radius 2px; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use elegant display headings, refined numerals, and short polished venue labels.
Components: Marquee frames, table rows, set-time labels, program strips, and ceremonial booking controls should align to the center axis.
Buttons: Use framed gold primary buttons and fine outline secondary actions.
Button details: Use framed gold primary buttons, fine outline secondary buttons, centered labels, and pressed states that feel like a mechanical latch.
Feedback and alerts: Use polished labels, reserved alert strips, invitation confirmations, and availability states aligned to the poster axis.
Spacing system: Use 24-34px ceremonial panels, tight 8-12px label gaps, and generous space around the headline and reservation action.
Responsive behavior: Desktop can use symmetry and side proof panels; mobile keeps the monogram, headline, primary action, availability, then room details in one centered stack.
Icons and media: Use seating plans, stage labels, program cards, velvet textures, and bar menu notes.
States: Show open, signed, first set, held, waitlist, and invitation states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Marble Fox Theatre / Jazz theatre foyer" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not scatter gold trim without information value. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 22 - Art Deco as the page design direction.
Prompt type: Mobile.
Best fit: luxury hospitality, cultural venues, premium events, editorial brand launches.
Visual mood: Symmetric poster composition, dark jewel tones, gilded rules, stepped geometry, and polished hospitality drama.
Scenario focus:
Mobile focus: Order as monogram, offer, primary booking action, availability, room proof, then secondary story.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Deco Theatre Foyer.
Layout structure: Symmetric jazz-theatre booking page with marquee axis, table availability, program cards, bar notes, and gilded seating plan.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #0e1020; surface #171526; text #fff4d6; muted #d8c58e; primary #d4af37; accent #2dd4bf; border #d4af37; radius 2px; shadow/material 0 26px 80px rgba(212, 175, 55, .18).
Geometry: panel radius 2px; control radius 2px; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use elegant display headings, refined numerals, and short polished venue labels.
Components: Marquee frames, table rows, set-time labels, program strips, and ceremonial booking controls should align to the center axis.
Buttons: Use framed gold primary buttons and fine outline secondary actions.
Button details: Use framed gold primary buttons, fine outline secondary buttons, centered labels, and pressed states that feel like a mechanical latch.
Feedback and alerts: Use polished labels, reserved alert strips, invitation confirmations, and availability states aligned to the poster axis.
Spacing system: Use 24-34px ceremonial panels, tight 8-12px label gaps, and generous space around the headline and reservation action.
Responsive behavior: Desktop can use symmetry and side proof panels; mobile keeps the monogram, headline, primary action, availability, then room details in one centered stack.
Icons and media: Use seating plans, stage labels, program cards, velvet textures, and bar menu notes.
States: Show open, signed, first set, held, waitlist, and invitation states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Marble Fox Theatre / Jazz theatre foyer" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not scatter gold trim without information value. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
