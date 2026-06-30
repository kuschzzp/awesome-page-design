# Style 05 - Swiss Editorial (瑞士编辑风)

## Summary

Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm.

Chinese summary: 紧凑编辑网格、红黑字体层级、细分割线、极小页边距和克制内容节奏。

## Best For

portfolios, cultural sites, design studios, serious content

## Example Scenario

- Product sample: Neue Archive
- Page job: Swiss issue system
- Headline: Index the issue with type, rules, and evidence.
- Primary action: Open issue
- Secondary action: View sources

## Scenario Components

- Baseline grid: Every headline, caption, and data row locks to a visible publishing rhythm.
- Object proof: Image crops, labels, and accession marks sit in the same rule system as the copy.
- Index table: Readers can scan issue entries without losing the editorial hierarchy.

## Example States

- Caption audit: 8 notes
- Index order: Locked
- Object board: Ready

## Layout Pattern

- Pattern: Swiss Archive Board (瑞士档案索引板)
- Archetype: Swiss Archive Board
- Structure: Objective issue board with masthead rules, accession numbers, object crops, dense source rows, and a visible modular grid.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use grotesk type, tabular numerals, uppercase labels, strict alignment, and oversized issue numbers.
- Components: Mastheads, object boards, accession rows, source ledgers, issue metrics, and compact text actions define the page.
- Buttons: Buttons are hard-edged text or rule-line controls that align to the grid.
- Icons and media: Use cropped catalog objects, source fragments, accession labels, and table-like evidence blocks.
- States: Show selected issue, locked index, source-open, caption-needed, saved object, and empty source states.
- Avoid: Do not let the page collapse into a generic editorial article with sidebars.

## Visual Language

- Background: `#f7f5ef`
- Surface: `#fffdf8`
- Text: `#111111`
- Muted text: `#525252`
- Primary: `#e11d2e`
- Accent: `#111111`
- Border: `#111111`
- Radius: `0`
- Panel radius: `0`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `0`
- Geometry rule: editorial hard edges and rule-line structure; avoid making every button and card the same large rounded rectangle.
- Shadow: `none`

## Component Detail System

- Button system: Use text-link buttons, underlined actions, rule-line tabs, and almost no filled buttons unless the action is decisive.
- Feedback and alerts: Use editorial callouts, margin notes, and rule-separated validation messages instead of colored bubbles.
- Spacing system: Use column gutters of 24-32px, strict baselines, thin dividers, and wide reading measures.
- Responsive behavior: Desktop uses columns; tablet narrows metadata into a top strip; mobile preserves reading order with actions under the headline.

Chinese implementation notes:

- 按钮细节：使用文字链接按钮、下划线操作、规则线 tab，除非动作非常关键，否则少用填充按钮。
- 提示与反馈：使用编辑式 callout、边注和规则线分隔的校验消息，而不是彩色气泡。
- 间距系统：列间距 24-32px，严格基线、细分割线和宽阅读区域。
- 响应式策略：桌面使用分栏；平板把元信息压成顶部条；手机保持阅读顺序，操作放在标题下。

## Page Adaptation Guide

- Landing page: Use editorial columns, rule lines, captions, proof excerpts, and understated text actions.
- Dashboard: Use index tables, metadata columns, and structured evidence rather than cards.
- Admin panel: Use form sections, audit rows, legal/procurement evidence blocks, and rule-line navigation.
- Forms, tables, and data: Use persistent labels, narrow measures, divider-separated validation, and underlined actions.
- Mobile: Preserve reading order: headline, metadata, action, article body, index; avoid hidden sidebars.
- Not a good fit for: Weak for playful commerce, heavy animation, or highly visual immersive demos.

## Usage Notes

- Let typography and rules create the visual system.
- Use red sparingly for hierarchy and urgency.
- Avoid soft SaaS cards.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 05 - Swiss Editorial as the page design direction.
Prompt type: Full Prompt.
Best fit: portfolios, cultural sites, design studios, serious content.
Visual mood: Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm.
Scenario focus:
Landing adaptation: Use editorial columns, rule lines, captions, proof excerpts, and understated text actions.
Dashboard adaptation: Use index tables, metadata columns, and structured evidence rather than cards.
Admin adaptation: Use form sections, audit rows, legal/procurement evidence blocks, and rule-line navigation.
Forms/data adaptation: Use persistent labels, narrow measures, divider-separated validation, and underlined actions.
Mobile adaptation: Preserve reading order: headline, metadata, action, article body, index; avoid hidden sidebars.
Avoid for: Weak for playful commerce, heavy animation, or highly visual immersive demos.
Layout archetype: Swiss Archive Board.
Layout structure: Objective issue board with masthead rules, accession numbers, object crops, dense source rows, and a visible modular grid.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f5ef; surface #fffdf8; text #111111; muted #525252; primary #e11d2e; accent #111111; border #111111; radius 0; shadow/material none.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use grotesk type, tabular numerals, uppercase labels, strict alignment, and oversized issue numbers.
Components: Mastheads, object boards, accession rows, source ledgers, issue metrics, and compact text actions define the page.
Buttons: Buttons are hard-edged text or rule-line controls that align to the grid.
Button details: Use text-link buttons, underlined actions, rule-line tabs, and almost no filled buttons unless the action is decisive.
Feedback and alerts: Use editorial callouts, margin notes, and rule-separated validation messages instead of colored bubbles.
Spacing system: Use column gutters of 24-32px, strict baselines, thin dividers, and wide reading measures.
Responsive behavior: Desktop uses columns; tablet narrows metadata into a top strip; mobile preserves reading order with actions under the headline.
Icons and media: Use cropped catalog objects, source fragments, accession labels, and table-like evidence blocks.
States: Show selected issue, locked index, source-open, caption-needed, saved object, and empty source states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Neue Archive / Swiss issue system" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let the page collapse into a generic editorial article with sidebars. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 05 - Swiss Editorial as the page design direction.
Prompt type: Landing Page.
Best fit: portfolios, cultural sites, design studios, serious content.
Visual mood: Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm.
Scenario focus:
Landing page focus: Use editorial columns, rule lines, captions, proof excerpts, and understated text actions.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Swiss Archive Board.
Layout structure: Objective issue board with masthead rules, accession numbers, object crops, dense source rows, and a visible modular grid.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f5ef; surface #fffdf8; text #111111; muted #525252; primary #e11d2e; accent #111111; border #111111; radius 0; shadow/material none.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use grotesk type, tabular numerals, uppercase labels, strict alignment, and oversized issue numbers.
Components: Mastheads, object boards, accession rows, source ledgers, issue metrics, and compact text actions define the page.
Buttons: Buttons are hard-edged text or rule-line controls that align to the grid.
Button details: Use text-link buttons, underlined actions, rule-line tabs, and almost no filled buttons unless the action is decisive.
Feedback and alerts: Use editorial callouts, margin notes, and rule-separated validation messages instead of colored bubbles.
Spacing system: Use column gutters of 24-32px, strict baselines, thin dividers, and wide reading measures.
Responsive behavior: Desktop uses columns; tablet narrows metadata into a top strip; mobile preserves reading order with actions under the headline.
Icons and media: Use cropped catalog objects, source fragments, accession labels, and table-like evidence blocks.
States: Show selected issue, locked index, source-open, caption-needed, saved object, and empty source states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Neue Archive / Swiss issue system" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let the page collapse into a generic editorial article with sidebars. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 05 - Swiss Editorial as the page design direction.
Prompt type: Dashboard.
Best fit: portfolios, cultural sites, design studios, serious content.
Visual mood: Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm.
Scenario focus:
Dashboard focus: Use index tables, metadata columns, and structured evidence rather than cards.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Swiss Archive Board.
Layout structure: Objective issue board with masthead rules, accession numbers, object crops, dense source rows, and a visible modular grid.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f5ef; surface #fffdf8; text #111111; muted #525252; primary #e11d2e; accent #111111; border #111111; radius 0; shadow/material none.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use grotesk type, tabular numerals, uppercase labels, strict alignment, and oversized issue numbers.
Components: Mastheads, object boards, accession rows, source ledgers, issue metrics, and compact text actions define the page.
Buttons: Buttons are hard-edged text or rule-line controls that align to the grid.
Button details: Use text-link buttons, underlined actions, rule-line tabs, and almost no filled buttons unless the action is decisive.
Feedback and alerts: Use editorial callouts, margin notes, and rule-separated validation messages instead of colored bubbles.
Spacing system: Use column gutters of 24-32px, strict baselines, thin dividers, and wide reading measures.
Responsive behavior: Desktop uses columns; tablet narrows metadata into a top strip; mobile preserves reading order with actions under the headline.
Icons and media: Use cropped catalog objects, source fragments, accession labels, and table-like evidence blocks.
States: Show selected issue, locked index, source-open, caption-needed, saved object, and empty source states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Neue Archive / Swiss issue system" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let the page collapse into a generic editorial article with sidebars. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 05 - Swiss Editorial as the page design direction.
Prompt type: Admin Panel.
Best fit: portfolios, cultural sites, design studios, serious content.
Visual mood: Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm.
Scenario focus:
Admin panel focus: Use form sections, audit rows, legal/procurement evidence blocks, and rule-line navigation.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Swiss Archive Board.
Layout structure: Objective issue board with masthead rules, accession numbers, object crops, dense source rows, and a visible modular grid.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f5ef; surface #fffdf8; text #111111; muted #525252; primary #e11d2e; accent #111111; border #111111; radius 0; shadow/material none.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use grotesk type, tabular numerals, uppercase labels, strict alignment, and oversized issue numbers.
Components: Mastheads, object boards, accession rows, source ledgers, issue metrics, and compact text actions define the page.
Buttons: Buttons are hard-edged text or rule-line controls that align to the grid.
Button details: Use text-link buttons, underlined actions, rule-line tabs, and almost no filled buttons unless the action is decisive.
Feedback and alerts: Use editorial callouts, margin notes, and rule-separated validation messages instead of colored bubbles.
Spacing system: Use column gutters of 24-32px, strict baselines, thin dividers, and wide reading measures.
Responsive behavior: Desktop uses columns; tablet narrows metadata into a top strip; mobile preserves reading order with actions under the headline.
Icons and media: Use cropped catalog objects, source fragments, accession labels, and table-like evidence blocks.
States: Show selected issue, locked index, source-open, caption-needed, saved object, and empty source states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Neue Archive / Swiss issue system" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let the page collapse into a generic editorial article with sidebars. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 05 - Swiss Editorial as the page design direction.
Prompt type: Mobile.
Best fit: portfolios, cultural sites, design studios, serious content.
Visual mood: Tight editorial grid, red-black typographic hierarchy, rule lines, minimal gutters, and disciplined content rhythm.
Scenario focus:
Mobile focus: Preserve reading order: headline, metadata, action, article body, index; avoid hidden sidebars.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Swiss Archive Board.
Layout structure: Objective issue board with masthead rules, accession numbers, object crops, dense source rows, and a visible modular grid.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7f5ef; surface #fffdf8; text #111111; muted #525252; primary #e11d2e; accent #111111; border #111111; radius 0; shadow/material none.
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 0. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use grotesk type, tabular numerals, uppercase labels, strict alignment, and oversized issue numbers.
Components: Mastheads, object boards, accession rows, source ledgers, issue metrics, and compact text actions define the page.
Buttons: Buttons are hard-edged text or rule-line controls that align to the grid.
Button details: Use text-link buttons, underlined actions, rule-line tabs, and almost no filled buttons unless the action is decisive.
Feedback and alerts: Use editorial callouts, margin notes, and rule-separated validation messages instead of colored bubbles.
Spacing system: Use column gutters of 24-32px, strict baselines, thin dividers, and wide reading measures.
Responsive behavior: Desktop uses columns; tablet narrows metadata into a top strip; mobile preserves reading order with actions under the headline.
Icons and media: Use cropped catalog objects, source fragments, accession labels, and table-like evidence blocks.
States: Show selected issue, locked index, source-open, caption-needed, saved object, and empty source states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Neue Archive / Swiss issue system" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let the page collapse into a generic editorial article with sidebars. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
