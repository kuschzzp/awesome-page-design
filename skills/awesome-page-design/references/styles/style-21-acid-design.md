# Style 21 - Acid Design (酸性设计)

## Summary

Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension.

Chinese summary: 金属光泽、液态金属字体、铬材质、扭曲排版、镭射光、暗黑科幻和致幻感。

## Best For

experimental portfolios, music/fashion drops, immersive campaigns

## Example Scenario

- Product sample: ChromeRift
- Page job: Experimental release page
- Headline: Make the page feel like a warped signal.
- Primary action: Enter drop
- Secondary action: View archive

## Scenario Components

- Controlled distortion: Chrome, laser color, and warped type create impact while body text stays readable.
- Stable anchors: Navigation, actions, and status chips keep the experience usable inside the chaos.
- Rare intensity: The style is strongest when used for brands that can carry risk and attitude.

## Example States

- Timer shard: Live
- Chrome title: Tune
- Archive cut: Hidden

## Layout Pattern

- Pattern: Acid Signal Poster (酸性信号海报)
- Archetype: Acid Signal Poster
- Structure: Asymmetric experimental poster with chrome slabs, laser cuts, warped title treatment, and stable navigation anchors.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use distorted display moments only for headlines; keep body copy and controls readable.
- Components: Signal shards, timer chips, archive cuts, chrome buttons, and high-contrast anchor controls define the UI.
- Buttons: Buttons can be metallic or laser-outlined but must remain obvious actions.
- Icons and media: Use chrome slabs, cut-up images, laser rules, and dark surreal fields as content anchors.
- States: Show live drop, hidden shard, tuned title, entered, archived, and expired states.
- Avoid: Do not apply distortion to small text, forms, or critical controls.

## Visual Language

- Background: `#050108`
- Surface: `#130818`
- Text: `#f8f0ff`
- Muted text: `#c4b5fd`
- Primary: `#e5e7eb`
- Accent: `#d6ff00`
- Border: `#7c3aed`
- Radius: `8px`
- Panel radius: `8px`
- Control radius: `4px`
- Chip radius: `2px`
- Media radius: `6px`
- Geometry rule: acid-edged geometry with sharp anchor controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 24px 90px rgba(214, 255, 0, .16)`

## Component Detail System

- Button system: Use sharp chrome or laser-outline buttons, stable labels, and active states that stay readable under visual distortion.
- Feedback and alerts: Use high-contrast signal alerts, archive confirmations, and expired-state warnings without distorting body text.
- Spacing system: Use 18-26px experimental slabs, 10-14px shard gaps, and stable anchor zones for controls.
- Responsive behavior: Desktop may be asymmetric and surreal; mobile removes distortion from controls and stacks title, action, media, and shards.

Chinese implementation notes:

- 按钮细节：使用锐利铬面或镭射描边按钮、稳定标签，以及在视觉扭曲下仍可读的 active 状态。
- 提示与反馈：使用高对比信号提示、归档确认和过期警告，但不要扭曲正文。
- 间距系统：实验块面 18-26px，碎片间距 10-14px，并为控件保留稳定锚点区域。
- 响应式策略：桌面可不对称且超现实；手机移除控件扭曲，并堆叠标题、操作、媒体和碎片。

## Page Adaptation Guide

- Landing page: Use experimental title, chrome media, laser cuts, stable nav anchors, and a readable entry action.
- Dashboard: Use only for expressive live signal or archive surfaces with strong stable control zones.
- Admin panel: Use sparingly; critical forms and tables must be distortion-free and high contrast.
- Forms, tables, and data: Use sharp fields, clear labels, no text distortion, and high-contrast expired/error states.
- Mobile: Remove distortion from controls and stack title, action, media, and shards.
- Not a good fit for: Weak for accessibility-critical admin, long copy, or conservative institutional products.

## Usage Notes

- Use distortion and chrome as brand moments, not body text.
- Keep enough stable UI for orientation.
- Let neon accents cut through a dark surreal base.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 21 - Acid Design as the page design direction.
Prompt type: Full Prompt.
Best fit: experimental portfolios, music/fashion drops, immersive campaigns.
Visual mood: Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension.
Scenario focus:
Landing adaptation: Use experimental title, chrome media, laser cuts, stable nav anchors, and a readable entry action.
Dashboard adaptation: Use only for expressive live signal or archive surfaces with strong stable control zones.
Admin adaptation: Use sparingly; critical forms and tables must be distortion-free and high contrast.
Forms/data adaptation: Use sharp fields, clear labels, no text distortion, and high-contrast expired/error states.
Mobile adaptation: Remove distortion from controls and stack title, action, media, and shards.
Avoid for: Weak for accessibility-critical admin, long copy, or conservative institutional products.
Layout archetype: Acid Signal Poster.
Layout structure: Asymmetric experimental poster with chrome slabs, laser cuts, warped title treatment, and stable navigation anchors.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050108; surface #130818; text #f8f0ff; muted #c4b5fd; primary #e5e7eb; accent #d6ff00; border #7c3aed; radius 8px; shadow/material 0 24px 90px rgba(214, 255, 0, .16).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use distorted display moments only for headlines; keep body copy and controls readable.
Components: Signal shards, timer chips, archive cuts, chrome buttons, and high-contrast anchor controls define the UI.
Buttons: Buttons can be metallic or laser-outlined but must remain obvious actions.
Button details: Use sharp chrome or laser-outline buttons, stable labels, and active states that stay readable under visual distortion.
Feedback and alerts: Use high-contrast signal alerts, archive confirmations, and expired-state warnings without distorting body text.
Spacing system: Use 18-26px experimental slabs, 10-14px shard gaps, and stable anchor zones for controls.
Responsive behavior: Desktop may be asymmetric and surreal; mobile removes distortion from controls and stacks title, action, media, and shards.
Icons and media: Use chrome slabs, cut-up images, laser rules, and dark surreal fields as content anchors.
States: Show live drop, hidden shard, tuned title, entered, archived, and expired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "ChromeRift / Experimental release page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not apply distortion to small text, forms, or critical controls. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 21 - Acid Design as the page design direction.
Prompt type: Landing Page.
Best fit: experimental portfolios, music/fashion drops, immersive campaigns.
Visual mood: Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension.
Scenario focus:
Landing page focus: Use experimental title, chrome media, laser cuts, stable nav anchors, and a readable entry action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Acid Signal Poster.
Layout structure: Asymmetric experimental poster with chrome slabs, laser cuts, warped title treatment, and stable navigation anchors.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050108; surface #130818; text #f8f0ff; muted #c4b5fd; primary #e5e7eb; accent #d6ff00; border #7c3aed; radius 8px; shadow/material 0 24px 90px rgba(214, 255, 0, .16).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use distorted display moments only for headlines; keep body copy and controls readable.
Components: Signal shards, timer chips, archive cuts, chrome buttons, and high-contrast anchor controls define the UI.
Buttons: Buttons can be metallic or laser-outlined but must remain obvious actions.
Button details: Use sharp chrome or laser-outline buttons, stable labels, and active states that stay readable under visual distortion.
Feedback and alerts: Use high-contrast signal alerts, archive confirmations, and expired-state warnings without distorting body text.
Spacing system: Use 18-26px experimental slabs, 10-14px shard gaps, and stable anchor zones for controls.
Responsive behavior: Desktop may be asymmetric and surreal; mobile removes distortion from controls and stacks title, action, media, and shards.
Icons and media: Use chrome slabs, cut-up images, laser rules, and dark surreal fields as content anchors.
States: Show live drop, hidden shard, tuned title, entered, archived, and expired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "ChromeRift / Experimental release page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not apply distortion to small text, forms, or critical controls. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 21 - Acid Design as the page design direction.
Prompt type: Dashboard.
Best fit: experimental portfolios, music/fashion drops, immersive campaigns.
Visual mood: Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension.
Scenario focus:
Dashboard focus: Use only for expressive live signal or archive surfaces with strong stable control zones.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Acid Signal Poster.
Layout structure: Asymmetric experimental poster with chrome slabs, laser cuts, warped title treatment, and stable navigation anchors.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050108; surface #130818; text #f8f0ff; muted #c4b5fd; primary #e5e7eb; accent #d6ff00; border #7c3aed; radius 8px; shadow/material 0 24px 90px rgba(214, 255, 0, .16).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use distorted display moments only for headlines; keep body copy and controls readable.
Components: Signal shards, timer chips, archive cuts, chrome buttons, and high-contrast anchor controls define the UI.
Buttons: Buttons can be metallic or laser-outlined but must remain obvious actions.
Button details: Use sharp chrome or laser-outline buttons, stable labels, and active states that stay readable under visual distortion.
Feedback and alerts: Use high-contrast signal alerts, archive confirmations, and expired-state warnings without distorting body text.
Spacing system: Use 18-26px experimental slabs, 10-14px shard gaps, and stable anchor zones for controls.
Responsive behavior: Desktop may be asymmetric and surreal; mobile removes distortion from controls and stacks title, action, media, and shards.
Icons and media: Use chrome slabs, cut-up images, laser rules, and dark surreal fields as content anchors.
States: Show live drop, hidden shard, tuned title, entered, archived, and expired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "ChromeRift / Experimental release page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not apply distortion to small text, forms, or critical controls. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 21 - Acid Design as the page design direction.
Prompt type: Admin Panel.
Best fit: experimental portfolios, music/fashion drops, immersive campaigns.
Visual mood: Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension.
Scenario focus:
Admin panel focus: Use sparingly; critical forms and tables must be distortion-free and high contrast.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Acid Signal Poster.
Layout structure: Asymmetric experimental poster with chrome slabs, laser cuts, warped title treatment, and stable navigation anchors.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050108; surface #130818; text #f8f0ff; muted #c4b5fd; primary #e5e7eb; accent #d6ff00; border #7c3aed; radius 8px; shadow/material 0 24px 90px rgba(214, 255, 0, .16).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use distorted display moments only for headlines; keep body copy and controls readable.
Components: Signal shards, timer chips, archive cuts, chrome buttons, and high-contrast anchor controls define the UI.
Buttons: Buttons can be metallic or laser-outlined but must remain obvious actions.
Button details: Use sharp chrome or laser-outline buttons, stable labels, and active states that stay readable under visual distortion.
Feedback and alerts: Use high-contrast signal alerts, archive confirmations, and expired-state warnings without distorting body text.
Spacing system: Use 18-26px experimental slabs, 10-14px shard gaps, and stable anchor zones for controls.
Responsive behavior: Desktop may be asymmetric and surreal; mobile removes distortion from controls and stacks title, action, media, and shards.
Icons and media: Use chrome slabs, cut-up images, laser rules, and dark surreal fields as content anchors.
States: Show live drop, hidden shard, tuned title, entered, archived, and expired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "ChromeRift / Experimental release page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not apply distortion to small text, forms, or critical controls. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 21 - Acid Design as the page design direction.
Prompt type: Mobile.
Best fit: experimental portfolios, music/fashion drops, immersive campaigns.
Visual mood: Metal sheen, liquid chrome type, distorted composition, laser light, dark sci-fi, and psychedelic tension.
Scenario focus:
Mobile focus: Remove distortion from controls and stack title, action, media, and shards.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Acid Signal Poster.
Layout structure: Asymmetric experimental poster with chrome slabs, laser cuts, warped title treatment, and stable navigation anchors.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #050108; surface #130818; text #f8f0ff; muted #c4b5fd; primary #e5e7eb; accent #d6ff00; border #7c3aed; radius 8px; shadow/material 0 24px 90px rgba(214, 255, 0, .16).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use distorted display moments only for headlines; keep body copy and controls readable.
Components: Signal shards, timer chips, archive cuts, chrome buttons, and high-contrast anchor controls define the UI.
Buttons: Buttons can be metallic or laser-outlined but must remain obvious actions.
Button details: Use sharp chrome or laser-outline buttons, stable labels, and active states that stay readable under visual distortion.
Feedback and alerts: Use high-contrast signal alerts, archive confirmations, and expired-state warnings without distorting body text.
Spacing system: Use 18-26px experimental slabs, 10-14px shard gaps, and stable anchor zones for controls.
Responsive behavior: Desktop may be asymmetric and surreal; mobile removes distortion from controls and stacks title, action, media, and shards.
Icons and media: Use chrome slabs, cut-up images, laser rules, and dark surreal fields as content anchors.
States: Show live drop, hidden shard, tuned title, entered, archived, and expired states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "ChromeRift / Experimental release page" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not apply distortion to small text, forms, or critical controls. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
