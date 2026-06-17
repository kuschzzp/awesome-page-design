# Style 13 - Bento Layout (便当盒布局)

## Summary

Widget-like card zones, modular composition, and clearly chunked information.

Chinese summary: 小组件式卡片分区、模块化排布、信息清晰分块。

## Best For

creator profiles, product overviews, feature collections

## Example Scenario

- Product sample: Patchwork
- Page job: Modular profile hub
- Headline: Compose the profile from proof, media, timeline, and quote.
- Primary action: Arrange blocks
- Secondary action: Open profile

## Scenario Components

- Uneven modules: Cards vary by purpose and size instead of forming a dull equal grid.
- Chunked meaning: Each block does one job: proof, media, stat, quote, action, or timeline.
- Composed rhythm: The layout feels assembled, but gutters and radius keep it coherent.

## Example States

- Hero module: Large
- Quote card: Small
- Timeline: Wide

## Layout Pattern

- Pattern: Uneven Bento Story (不等格便当叙事)
- Archetype: Uneven Bento Story
- Structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
- Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
- Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
- Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
- States: Show pinned, updated, saved, expanded, compact, and reordered module states.
- Avoid: Do not make all bento cards equal-sized placeholders.

## Visual Language

- Background: `#f4f4f5`
- Surface: `#ffffff`
- Text: `#18181b`
- Muted text: `#71717a`
- Primary: `#18181b`
- Accent: `#f97316`
- Border: `#e4e4e7`
- Radius: `18px`
- Panel radius: `18px`
- Control radius: `10px`
- Chip radius: `8px`
- Media radius: `16px`
- Geometry rule: modular bento curves without making every item identical; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 55px rgba(24, 24, 27, .10)`

## Component Detail System

- Button system: Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.
- Feedback and alerts: Use tile-local badges, progress chips, and empty tile states with next actions.
- Spacing system: Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.
- Responsive behavior: Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.

Chinese implementation notes:

- 按钮细节：只在有明确任务的模块内嵌紧凑按钮；选中模块要明显但不吵。
- 提示与反馈：使用模块内徽章、进度 chip，以及带下一步的空模块状态。
- 间距系统：网格间距 16px，模块内边距可变化，使用稳定宽高比形成节奏。
- 响应式策略：桌面可使用不同跨度模块；手机变成单列，并按重要性保持模块顺序。

## Page Adaptation Guide

- Landing page: Use uneven tiles where each block has a job: proof, media, quote, stat, timeline, and action.
- Dashboard: Use modular status tiles, varied spans, local actions, and progress badges.
- Admin panel: Use admin only when modules are independent; avoid forcing dense tables into bento tiles.
- Forms, tables, and data: Use forms inside purposeful tiles with local validation and stable tile dimensions.
- Mobile: Collapse to one column while preserving tile order by importance.
- Not a good fit for: Weak for long tables, legal documents, or workflows needing strict linear review.

## Usage Notes

- Use varied card sizes with one consistent grid.
- Each block should have a clear job.
- Avoid turning every block into identical cards.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 13 - Bento Layout as the page design direction.
Prompt type: Full Prompt.
Best fit: creator profiles, product overviews, feature collections.
Visual mood: Widget-like card zones, modular composition, and clearly chunked information.
Scenario focus:
Landing adaptation: Use uneven tiles where each block has a job: proof, media, quote, stat, timeline, and action.
Dashboard adaptation: Use modular status tiles, varied spans, local actions, and progress badges.
Admin adaptation: Use admin only when modules are independent; avoid forcing dense tables into bento tiles.
Forms/data adaptation: Use forms inside purposeful tiles with local validation and stable tile dimensions.
Mobile adaptation: Collapse to one column while preserving tile order by importance.
Avoid for: Weak for long tables, legal documents, or workflows needing strict linear review.
Layout archetype: Uneven Bento Story.
Layout structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4f4f5; surface #ffffff; text #18181b; muted #71717a; primary #18181b; accent #f97316; border #e4e4e7; radius 18px; shadow/material 0 18px 55px rgba(24, 24, 27, .10).
Geometry: panel radius 18px; control radius 10px; chip/state radius 8px; media radius 16px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
Button details: Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.
Feedback and alerts: Use tile-local badges, progress chips, and empty tile states with next actions.
Spacing system: Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.
Responsive behavior: Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.
Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
States: Show pinned, updated, saved, expanded, compact, and reordered module states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Patchwork / Modular profile hub" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make all bento cards equal-sized placeholders. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 13 - Bento Layout as the page design direction.
Prompt type: Landing Page.
Best fit: creator profiles, product overviews, feature collections.
Visual mood: Widget-like card zones, modular composition, and clearly chunked information.
Scenario focus:
Landing page focus: Use uneven tiles where each block has a job: proof, media, quote, stat, timeline, and action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Uneven Bento Story.
Layout structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4f4f5; surface #ffffff; text #18181b; muted #71717a; primary #18181b; accent #f97316; border #e4e4e7; radius 18px; shadow/material 0 18px 55px rgba(24, 24, 27, .10).
Geometry: panel radius 18px; control radius 10px; chip/state radius 8px; media radius 16px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
Button details: Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.
Feedback and alerts: Use tile-local badges, progress chips, and empty tile states with next actions.
Spacing system: Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.
Responsive behavior: Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.
Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
States: Show pinned, updated, saved, expanded, compact, and reordered module states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Patchwork / Modular profile hub" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make all bento cards equal-sized placeholders. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 13 - Bento Layout as the page design direction.
Prompt type: Dashboard.
Best fit: creator profiles, product overviews, feature collections.
Visual mood: Widget-like card zones, modular composition, and clearly chunked information.
Scenario focus:
Dashboard focus: Use modular status tiles, varied spans, local actions, and progress badges.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Uneven Bento Story.
Layout structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4f4f5; surface #ffffff; text #18181b; muted #71717a; primary #18181b; accent #f97316; border #e4e4e7; radius 18px; shadow/material 0 18px 55px rgba(24, 24, 27, .10).
Geometry: panel radius 18px; control radius 10px; chip/state radius 8px; media radius 16px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
Button details: Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.
Feedback and alerts: Use tile-local badges, progress chips, and empty tile states with next actions.
Spacing system: Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.
Responsive behavior: Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.
Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
States: Show pinned, updated, saved, expanded, compact, and reordered module states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Patchwork / Modular profile hub" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make all bento cards equal-sized placeholders. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 13 - Bento Layout as the page design direction.
Prompt type: Admin Panel.
Best fit: creator profiles, product overviews, feature collections.
Visual mood: Widget-like card zones, modular composition, and clearly chunked information.
Scenario focus:
Admin panel focus: Use admin only when modules are independent; avoid forcing dense tables into bento tiles.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Uneven Bento Story.
Layout structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4f4f5; surface #ffffff; text #18181b; muted #71717a; primary #18181b; accent #f97316; border #e4e4e7; radius 18px; shadow/material 0 18px 55px rgba(24, 24, 27, .10).
Geometry: panel radius 18px; control radius 10px; chip/state radius 8px; media radius 16px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
Button details: Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.
Feedback and alerts: Use tile-local badges, progress chips, and empty tile states with next actions.
Spacing system: Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.
Responsive behavior: Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.
Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
States: Show pinned, updated, saved, expanded, compact, and reordered module states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Patchwork / Modular profile hub" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make all bento cards equal-sized placeholders. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 13 - Bento Layout as the page design direction.
Prompt type: Mobile.
Best fit: creator profiles, product overviews, feature collections.
Visual mood: Widget-like card zones, modular composition, and clearly chunked information.
Scenario focus:
Mobile focus: Collapse to one column while preserving tile order by importance.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Uneven Bento Story.
Layout structure: Asymmetric bento grid where each tile has a different job: proof, media, quote, stat, action, or timeline.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f4f4f5; surface #ffffff; text #18181b; muted #71717a; primary #18181b; accent #f97316; border #e4e4e7; radius 18px; shadow/material 0 18px 55px rgba(24, 24, 27, .10).
Geometry: panel radius 18px; control radius 10px; chip/state radius 8px; media radius 16px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use modular headings, short tile labels, and strong local hierarchy inside each block.
Components: Large, wide, tall, and compact tiles should vary by content value while sharing radius and gutters.
Buttons: Buttons can be embedded tile actions, compact pills, or full-width module controls.
Button details: Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.
Feedback and alerts: Use tile-local badges, progress chips, and empty tile states with next actions.
Spacing system: Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.
Responsive behavior: Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.
Icons and media: Use mini screenshots, quotes, diagrams, profile details, and chart fragments as tile content.
States: Show pinned, updated, saved, expanded, compact, and reordered module states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Patchwork / Modular profile hub" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make all bento cards equal-sized placeholders. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
