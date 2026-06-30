# Style 23 - Wabi-Sabi (侘寂)

## Summary

Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence.

Chinese summary: 低饱和大地色、自然纹理、手作不完美、安静留白和缓慢的材质信任感。

## Best For

ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages

## Example Scenario

- Product sample: Mend Clay
- Page job: Ceramic repair studio
- Headline: Give a cracked bowl a slower second life with gold, clay, and care.
- Primary action: Book repair
- Secondary action: Read care note

## Scenario Components

- Repair table: Objects, cracks, slips, and care notes create the layout language.
- Useful imperfection: Irregular shapes are tied to real ceramic states such as drying, sealed, and reserved.
- Slow conversion: The action follows trust, material notes, and process evidence.

## Example States

- Tea bowl: Drying
- Gold seam: Curing
- Care card: Ready

## Layout Pattern

- Pattern: Wabi Repair Studio (侘寂修补工作室)
- Archetype: Wabi Repair Studio
- Structure: Quiet ceramic repair table with object stage, process notes, drying ledger, care card, and grounded booking action.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use warm body text, small honest labels, and enough whitespace around each object.
- Components: Crack diagrams, clay bodies, cure timing, repair status, and care notes should feel handmade but aligned.
- Buttons: Use quiet grounded buttons that become precise on focus or selected state.
- Icons and media: Use ceramic forms, repair seams, worktable marks, clay labels, and care cards.
- States: Show drying, curing, ready, reserved, care needed, and repaired states.
- Avoid: Do not polish away the material irregularity.

## Visual Language

- Background: `#f4efe6`
- Surface: `#fffaf0`
- Text: `#302a22`
- Muted text: `#766b5e`
- Primary: `#5f6f52`
- Accent: `#b26b4b`
- Border: `#d8cdbc`
- Radius: `6px`
- Panel radius: `6px`
- Control radius: `3px`
- Chip radius: `2px`
- Media radius: `8px`
- Geometry rule: quiet handmade geometry with small irregular-feeling corners; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 16px 48px rgba(77, 61, 43, .10)`

## Component Detail System

- Button system: Use quiet text or low-fill buttons with visible focus, modest hover, and selected states that feel gently pressed into paper.
- Feedback and alerts: Use small inline notes, care labels, reserved marks, and calm confirmations near the affected object.
- Spacing system: Use 28-44px quiet gutters, uneven but intentional object spacing, and 14-18px readable caption gaps.
- Responsive behavior: Desktop may place one object stage beside notes; mobile shows object, material caption, availability, then action without crowding.

Chinese implementation notes:

- 按钮细节：使用安静文字或低填充按钮，保留可见焦点、克制 hover，并让选中态像轻轻压入纸面。
- 提示与反馈：在对象附近使用小型内联说明、养护标签、预留标记和平静确认。
- 间距系统：安静留白 28-44px，对象间距可不完全均匀但要有意图，图注间距 14-18px。
- 响应式策略：桌面可让对象舞台和说明并列；手机按对象、材质图注、可用状态、操作顺序呈现，避免拥挤。

## Page Adaptation Guide

- Landing page: Use one material object, generous space, process notes, human copy, and a slow primary action after proof.
- Dashboard: Use for studio inventory, wellness progress, or small collections where low density and material context matter.
- Admin panel: Use only for calm curation or catalog management; avoid high-volume tables and urgent batch operations.
- Forms, tables, and data: Use few fields, grounded labels, quiet helper text, and validation that stays close to the field.
- Mobile: Show object, caption, status, care/process note, then action; preserve whitespace instead of squeezing more modules in.
- Not a good fit for: Weak for urgent alerts, high-density analytics, loud campaigns, or glossy tech launches.

## Usage Notes

- Let asymmetry feel found and intentional, not careless.
- Use texture and edge softness instead of bright decoration.
- Leave enough silence around product objects, quotes, and primary actions.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 23 - Wabi-Sabi as the page design direction.
Prompt type: Full Prompt.
Best fit: ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages.
Visual mood: Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence.
Scenario focus:
Landing adaptation: Use one material object, generous space, process notes, human copy, and a slow primary action after proof.
Dashboard adaptation: Use for studio inventory, wellness progress, or small collections where low density and material context matter.
Admin adaptation: Use only for calm curation or catalog management; avoid high-volume tables and urgent batch operations.
Forms/data adaptation: Use few fields, grounded labels, quiet helper text, and validation that stays close to the field.
Mobile adaptation: Show object, caption, status, care/process note, then action; preserve whitespace instead of squeezing more modules in.
Avoid for: Weak for urgent alerts, high-density analytics, loud campaigns, or glossy tech launches.
Layout archetype: Wabi Repair Studio.
Layout structure: Quiet ceramic repair table with object stage, process notes, drying ledger, care card, and grounded booking action.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4efe6; surface #fffaf0; text #302a22; muted #766b5e; primary #5f6f52; accent #b26b4b; border #d8cdbc; radius 6px; shadow/material 0 16px 48px rgba(77, 61, 43, .10).
Geometry: panel radius 6px; control radius 3px; chip/state radius 2px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use warm body text, small honest labels, and enough whitespace around each object.
Components: Crack diagrams, clay bodies, cure timing, repair status, and care notes should feel handmade but aligned.
Buttons: Use quiet grounded buttons that become precise on focus or selected state.
Button details: Use quiet text or low-fill buttons with visible focus, modest hover, and selected states that feel gently pressed into paper.
Feedback and alerts: Use small inline notes, care labels, reserved marks, and calm confirmations near the affected object.
Spacing system: Use 28-44px quiet gutters, uneven but intentional object spacing, and 14-18px readable caption gaps.
Responsive behavior: Desktop may place one object stage beside notes; mobile shows object, material caption, availability, then action without crowding.
Icons and media: Use ceramic forms, repair seams, worktable marks, clay labels, and care cards.
States: Show drying, curing, ready, reserved, care needed, and repaired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mend Clay / Ceramic repair studio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not polish away the material irregularity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 23 - Wabi-Sabi as the page design direction.
Prompt type: Landing Page.
Best fit: ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages.
Visual mood: Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence.
Scenario focus:
Landing page focus: Use one material object, generous space, process notes, human copy, and a slow primary action after proof.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Wabi Repair Studio.
Layout structure: Quiet ceramic repair table with object stage, process notes, drying ledger, care card, and grounded booking action.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4efe6; surface #fffaf0; text #302a22; muted #766b5e; primary #5f6f52; accent #b26b4b; border #d8cdbc; radius 6px; shadow/material 0 16px 48px rgba(77, 61, 43, .10).
Geometry: panel radius 6px; control radius 3px; chip/state radius 2px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use warm body text, small honest labels, and enough whitespace around each object.
Components: Crack diagrams, clay bodies, cure timing, repair status, and care notes should feel handmade but aligned.
Buttons: Use quiet grounded buttons that become precise on focus or selected state.
Button details: Use quiet text or low-fill buttons with visible focus, modest hover, and selected states that feel gently pressed into paper.
Feedback and alerts: Use small inline notes, care labels, reserved marks, and calm confirmations near the affected object.
Spacing system: Use 28-44px quiet gutters, uneven but intentional object spacing, and 14-18px readable caption gaps.
Responsive behavior: Desktop may place one object stage beside notes; mobile shows object, material caption, availability, then action without crowding.
Icons and media: Use ceramic forms, repair seams, worktable marks, clay labels, and care cards.
States: Show drying, curing, ready, reserved, care needed, and repaired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mend Clay / Ceramic repair studio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not polish away the material irregularity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 23 - Wabi-Sabi as the page design direction.
Prompt type: Dashboard.
Best fit: ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages.
Visual mood: Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence.
Scenario focus:
Dashboard focus: Use for studio inventory, wellness progress, or small collections where low density and material context matter.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Wabi Repair Studio.
Layout structure: Quiet ceramic repair table with object stage, process notes, drying ledger, care card, and grounded booking action.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4efe6; surface #fffaf0; text #302a22; muted #766b5e; primary #5f6f52; accent #b26b4b; border #d8cdbc; radius 6px; shadow/material 0 16px 48px rgba(77, 61, 43, .10).
Geometry: panel radius 6px; control radius 3px; chip/state radius 2px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use warm body text, small honest labels, and enough whitespace around each object.
Components: Crack diagrams, clay bodies, cure timing, repair status, and care notes should feel handmade but aligned.
Buttons: Use quiet grounded buttons that become precise on focus or selected state.
Button details: Use quiet text or low-fill buttons with visible focus, modest hover, and selected states that feel gently pressed into paper.
Feedback and alerts: Use small inline notes, care labels, reserved marks, and calm confirmations near the affected object.
Spacing system: Use 28-44px quiet gutters, uneven but intentional object spacing, and 14-18px readable caption gaps.
Responsive behavior: Desktop may place one object stage beside notes; mobile shows object, material caption, availability, then action without crowding.
Icons and media: Use ceramic forms, repair seams, worktable marks, clay labels, and care cards.
States: Show drying, curing, ready, reserved, care needed, and repaired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mend Clay / Ceramic repair studio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not polish away the material irregularity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 23 - Wabi-Sabi as the page design direction.
Prompt type: Admin Panel.
Best fit: ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages.
Visual mood: Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence.
Scenario focus:
Admin panel focus: Use only for calm curation or catalog management; avoid high-volume tables and urgent batch operations.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Wabi Repair Studio.
Layout structure: Quiet ceramic repair table with object stage, process notes, drying ledger, care card, and grounded booking action.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4efe6; surface #fffaf0; text #302a22; muted #766b5e; primary #5f6f52; accent #b26b4b; border #d8cdbc; radius 6px; shadow/material 0 16px 48px rgba(77, 61, 43, .10).
Geometry: panel radius 6px; control radius 3px; chip/state radius 2px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use warm body text, small honest labels, and enough whitespace around each object.
Components: Crack diagrams, clay bodies, cure timing, repair status, and care notes should feel handmade but aligned.
Buttons: Use quiet grounded buttons that become precise on focus or selected state.
Button details: Use quiet text or low-fill buttons with visible focus, modest hover, and selected states that feel gently pressed into paper.
Feedback and alerts: Use small inline notes, care labels, reserved marks, and calm confirmations near the affected object.
Spacing system: Use 28-44px quiet gutters, uneven but intentional object spacing, and 14-18px readable caption gaps.
Responsive behavior: Desktop may place one object stage beside notes; mobile shows object, material caption, availability, then action without crowding.
Icons and media: Use ceramic forms, repair seams, worktable marks, clay labels, and care cards.
States: Show drying, curing, ready, reserved, care needed, and repaired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mend Clay / Ceramic repair studio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not polish away the material irregularity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 23 - Wabi-Sabi as the page design direction.
Prompt type: Mobile.
Best fit: ceramics, wellness, slow commerce, craft portfolios, mindful editorial pages.
Visual mood: Earthy restraint, natural texture, handmade imperfection, quiet whitespace, and slow material confidence.
Scenario focus:
Mobile focus: Show object, caption, status, care/process note, then action; preserve whitespace instead of squeezing more modules in.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Wabi Repair Studio.
Layout structure: Quiet ceramic repair table with object stage, process notes, drying ledger, care card, and grounded booking action.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4efe6; surface #fffaf0; text #302a22; muted #766b5e; primary #5f6f52; accent #b26b4b; border #d8cdbc; radius 6px; shadow/material 0 16px 48px rgba(77, 61, 43, .10).
Geometry: panel radius 6px; control radius 3px; chip/state radius 2px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use warm body text, small honest labels, and enough whitespace around each object.
Components: Crack diagrams, clay bodies, cure timing, repair status, and care notes should feel handmade but aligned.
Buttons: Use quiet grounded buttons that become precise on focus or selected state.
Button details: Use quiet text or low-fill buttons with visible focus, modest hover, and selected states that feel gently pressed into paper.
Feedback and alerts: Use small inline notes, care labels, reserved marks, and calm confirmations near the affected object.
Spacing system: Use 28-44px quiet gutters, uneven but intentional object spacing, and 14-18px readable caption gaps.
Responsive behavior: Desktop may place one object stage beside notes; mobile shows object, material caption, availability, then action without crowding.
Icons and media: Use ceramic forms, repair seams, worktable marks, clay labels, and care cards.
States: Show drying, curing, ready, reserved, care needed, and repaired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mend Clay / Ceramic repair studio" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not polish away the material irregularity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
