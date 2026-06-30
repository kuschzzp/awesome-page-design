# Style 24 - Ink Wash (水墨)

## Summary

Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.

Chinese summary: 宣纸白底、墨色层级、朱红印章强调、卷轴节奏和诗性编辑克制。

## Best For

tea culture, museums, literature, cultural ecommerce, heritage product stories

## Example Scenario

- Product sample: Mist Valley Tea
- Page job: Tea mountain origin scroll
- Headline: Trace one tea lot from foggy ridge to tasting table.
- Primary action: Open tasting scroll
- Secondary action: Browse lots

## Scenario Components

- Scroll pacing: Story, lot ledger, and tasting note unfold vertically like a quiet product record.
- Seal semantics: Red is reserved for chosen lot, provenance proof, and decisive action.
- Cultural restraint: Ink, blank paper, and source notes carry information instead of decoration.

## Example States

- Lot MV-04: Selected
- Roast note: Saved
- Source seal: Ready

## Layout Pattern

- Pattern: Ink Tea Scroll (水墨茶山卷轴)
- Archetype: Ink Tea Scroll
- Structure: Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use brush-like moments only for headings or seals; keep body copy disciplined and readable.
- Components: Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.
- Buttons: Primary actions can read like a seal; secondary actions should be text or rule-line controls.
- Icons and media: Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.
- States: Show selected lot, saved note, source seal, archived, warning, and tasting open states.
- Avoid: Do not use decorative cultural symbols without structure.

## Visual Language

- Background: `#f8f5ef`
- Surface: `#fffdf7`
- Text: `#1f1f1c`
- Muted text: `#68645c`
- Primary: `#111111`
- Accent: `#c43a32`
- Border: `#d8d0c4`
- Radius: `2px`
- Panel radius: `0`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `2px`
- Geometry rule: paper-and-rule geometry with seals and scroll-like edges; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 45px rgba(31, 31, 28, .08)`

## Component Detail System

- Button system: Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.
- Feedback and alerts: Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.
- Spacing system: Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.
- Responsive behavior: Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.

Chinese implementation notes:

- 按钮细节：使用印章式主操作、下划线文字操作，以及保持纸面节奏的方形焦点态。
- 提示与反馈：使用朱红印章确认、边注、规则线分隔警告和来源打开指示。
- 间距系统：使用宽纸面边距、严格纵向节奏、细规则线和充足图注间距。
- 响应式策略：桌面可保留元信息、主叙事和索引列；手机保持卷轴阅读顺序，标题后放印章操作，内容后放来源说明。

## Page Adaptation Guide

- Landing page: Use a scroll-like editorial sequence with origin, source notes, product proof, and seal-like primary action.
- Dashboard: Use only for cultural archives, catalog review, or editorial systems where index rows and provenance matter.
- Admin panel: Use for museum, publishing, or cultural ecommerce back offices with careful metadata, not generic CRUD shells.
- Forms, tables, and data: Use persistent labels, margin notes, rule-line validation, and a red seal only for decisive states.
- Mobile: Preserve reading order as scroll sections: title, seal action, story, proof, index, source notes.
- Not a good fit for: Weak for modern SaaS metrics, playful apps, or pages that need heavy chart density.

## Usage Notes

- Treat black, gray, and blank paper as the main palette.
- Use red only as a seal, warning, or decisive action accent.
- Do not turn the page into a generic Asian decorative collage.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 24 - Ink Wash as the page design direction.
Prompt type: Full Prompt.
Best fit: tea culture, museums, literature, cultural ecommerce, heritage product stories.
Visual mood: Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.
Scenario focus:
Landing adaptation: Use a scroll-like editorial sequence with origin, source notes, product proof, and seal-like primary action.
Dashboard adaptation: Use only for cultural archives, catalog review, or editorial systems where index rows and provenance matter.
Admin adaptation: Use for museum, publishing, or cultural ecommerce back offices with careful metadata, not generic CRUD shells.
Forms/data adaptation: Use persistent labels, margin notes, rule-line validation, and a red seal only for decisive states.
Mobile adaptation: Preserve reading order as scroll sections: title, seal action, story, proof, index, source notes.
Avoid for: Weak for modern SaaS metrics, playful apps, or pages that need heavy chart density.
Layout archetype: Ink Tea Scroll.
Layout structure: Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8f5ef; surface #fffdf7; text #1f1f1c; muted #68645c; primary #111111; accent #c43a32; border #d8d0c4; radius 2px; shadow/material 0 18px 45px rgba(31, 31, 28, .08).
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use brush-like moments only for headings or seals; keep body copy disciplined and readable.
Components: Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.
Buttons: Primary actions can read like a seal; secondary actions should be text or rule-line controls.
Button details: Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.
Feedback and alerts: Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.
Spacing system: Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.
Responsive behavior: Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.
Icons and media: Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.
States: Show selected lot, saved note, source seal, archived, warning, and tasting open states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mist Valley Tea / Tea mountain origin scroll" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use decorative cultural symbols without structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 24 - Ink Wash as the page design direction.
Prompt type: Landing Page.
Best fit: tea culture, museums, literature, cultural ecommerce, heritage product stories.
Visual mood: Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.
Scenario focus:
Landing page focus: Use a scroll-like editorial sequence with origin, source notes, product proof, and seal-like primary action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Ink Tea Scroll.
Layout structure: Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8f5ef; surface #fffdf7; text #1f1f1c; muted #68645c; primary #111111; accent #c43a32; border #d8d0c4; radius 2px; shadow/material 0 18px 45px rgba(31, 31, 28, .08).
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use brush-like moments only for headings or seals; keep body copy disciplined and readable.
Components: Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.
Buttons: Primary actions can read like a seal; secondary actions should be text or rule-line controls.
Button details: Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.
Feedback and alerts: Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.
Spacing system: Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.
Responsive behavior: Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.
Icons and media: Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.
States: Show selected lot, saved note, source seal, archived, warning, and tasting open states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mist Valley Tea / Tea mountain origin scroll" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use decorative cultural symbols without structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 24 - Ink Wash as the page design direction.
Prompt type: Dashboard.
Best fit: tea culture, museums, literature, cultural ecommerce, heritage product stories.
Visual mood: Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.
Scenario focus:
Dashboard focus: Use only for cultural archives, catalog review, or editorial systems where index rows and provenance matter.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Ink Tea Scroll.
Layout structure: Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8f5ef; surface #fffdf7; text #1f1f1c; muted #68645c; primary #111111; accent #c43a32; border #d8d0c4; radius 2px; shadow/material 0 18px 45px rgba(31, 31, 28, .08).
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use brush-like moments only for headings or seals; keep body copy disciplined and readable.
Components: Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.
Buttons: Primary actions can read like a seal; secondary actions should be text or rule-line controls.
Button details: Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.
Feedback and alerts: Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.
Spacing system: Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.
Responsive behavior: Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.
Icons and media: Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.
States: Show selected lot, saved note, source seal, archived, warning, and tasting open states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mist Valley Tea / Tea mountain origin scroll" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use decorative cultural symbols without structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 24 - Ink Wash as the page design direction.
Prompt type: Admin Panel.
Best fit: tea culture, museums, literature, cultural ecommerce, heritage product stories.
Visual mood: Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.
Scenario focus:
Admin panel focus: Use for museum, publishing, or cultural ecommerce back offices with careful metadata, not generic CRUD shells.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Ink Tea Scroll.
Layout structure: Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8f5ef; surface #fffdf7; text #1f1f1c; muted #68645c; primary #111111; accent #c43a32; border #d8d0c4; radius 2px; shadow/material 0 18px 45px rgba(31, 31, 28, .08).
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use brush-like moments only for headings or seals; keep body copy disciplined and readable.
Components: Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.
Buttons: Primary actions can read like a seal; secondary actions should be text or rule-line controls.
Button details: Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.
Feedback and alerts: Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.
Spacing system: Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.
Responsive behavior: Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.
Icons and media: Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.
States: Show selected lot, saved note, source seal, archived, warning, and tasting open states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mist Valley Tea / Tea mountain origin scroll" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use decorative cultural symbols without structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 24 - Ink Wash as the page design direction.
Prompt type: Mobile.
Best fit: tea culture, museums, literature, cultural ecommerce, heritage product stories.
Visual mood: Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.
Scenario focus:
Mobile focus: Preserve reading order as scroll sections: title, seal action, story, proof, index, source notes.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Ink Tea Scroll.
Layout structure: Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8f5ef; surface #fffdf7; text #1f1f1c; muted #68645c; primary #111111; accent #c43a32; border #d8d0c4; radius 2px; shadow/material 0 18px 45px rgba(31, 31, 28, .08).
Geometry: panel radius 0; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use brush-like moments only for headings or seals; keep body copy disciplined and readable.
Components: Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.
Buttons: Primary actions can read like a seal; secondary actions should be text or rule-line controls.
Button details: Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.
Feedback and alerts: Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.
Spacing system: Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.
Responsive behavior: Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.
Icons and media: Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.
States: Show selected lot, saved note, source seal, archived, warning, and tasting open states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "Mist Valley Tea / Tea mountain origin scroll" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not use decorative cultural symbols without structure. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
