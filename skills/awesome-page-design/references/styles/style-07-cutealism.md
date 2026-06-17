# Style 07 - Cute-alism (可爱主义)

## Summary

Neon yellow, pink hard shadows, sticker-like objects, rounded bold shapes, and soft-hard contrast.

Chinese summary: 荧光黄、粉色硬阴影、贴纸感对象、圆润粗形和软硬碰撞。

## Best For

playful brands, creator tools, youth products

## Example Scenario

- Product sample: StickerForge
- Page job: Creator sticker shop
- Headline: Build sticker packs, price variants, and prep print proof.
- Primary action: Build pack
- Secondary action: Preview shop

## Scenario Components

- Sticker energy: Chunky shapes and hard shadows give the interface charm without hiding controls.
- Friendly commerce: Pack previews, order states, and price chips stay playful and clear.
- Soft-hard balance: Rounded forms meet crisp outlines so the page feels lively but not childish.

## Example States

- Holiday pack: Draft
- Print proof: Ready
- Shop banner: Live

## Layout Pattern

- Pattern: Sticker Shop Board (贴纸商店面板)
- Archetype: Sticker Shop Board
- Structure: Playful shop board with sticker cutouts, product tiles, price tags, and chunky commerce controls.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use friendly bold headings, short labels, and clear commerce microcopy.
- Components: Pack previews, variant chips, cart rows, proof badges, and reorder handles should feel tactile.
- Buttons: Buttons are chunky, outlined, playful, and clearly clickable.
- Icons and media: Use sticker silhouettes, product thumbnails, cutout shapes, and playful labels.
- States: Show draft, proof-ready, sold-out, selected variant, and fulfilled states.
- Avoid: Do not let cuteness remove hierarchy or commerce clarity.

## Visual Language

- Background: `#f7ff45`
- Surface: `#fffef2`
- Text: `#18181b`
- Muted text: `#5b21b6`
- Primary: `#ff4db8`
- Accent: `#6dff8f`
- Border: `#18181b`
- Radius: `26px`
- Panel radius: `22px`
- Control radius: `12px`
- Chip radius: `10px`
- Media radius: `18px`
- Geometry rule: playful sticker curves with hard-shadow contrast; avoid making every button and card the same large rounded rectangle.
- Shadow: `8px 8px 0 #ff4db8`

## Component Detail System

- Button system: Use sticker-like buttons with firm shadows, playful active motion, and high-contrast disabled labels.
- Feedback and alerts: Use friendly shop toasts, cart confirmations, and inline proof states that feel tactile.
- Spacing system: Use 18-24px playful padding, 12-16px sticker gaps, and irregular but aligned product zones.
- Responsive behavior: Desktop can show builder plus catalog; mobile puts builder first, then product cards, then cart summary.

Chinese implementation notes:

- 按钮细节：使用贴纸感按钮、明确阴影、俏皮按下动效和高对比禁用标签。
- 提示与反馈：使用友好的商店 toast、购物车确认，以及有触感的内联 proof 状态。
- 间距系统：使用 18-24px 俏皮内边距、12-16px 贴纸间距，以及不完全规整但对齐的商品区域。
- 响应式策略：桌面显示构建器加目录；手机先构建器，再商品卡，最后购物车摘要。

## Page Adaptation Guide

- Landing page: Use a playful product builder, sticker-like media, price/proof tags, and a friendly cart action.
- Dashboard: Use creator shop metrics, order states, fulfillment cards, and tactile product previews.
- Admin panel: Use readable commerce controls, variant forms, inventory warnings, and friendly confirmation states.
- Forms, tables, and data: Use chunky labels, tactile inputs, high-contrast validation, and clear cart/save feedback.
- Mobile: Put builder first, then product cards, cart summary, and proof; keep playful elements from crowding controls.
- Not a good fit for: Weak for sober B2B, dense analytics, or official documentation portals.

## Usage Notes

- Use sticker energy without losing hierarchy.
- Keep controls chunky and friendly.
- Balance playful color with readable content.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 07 - Cute-alism as the page design direction.
Prompt type: Full Prompt.
Best fit: playful brands, creator tools, youth products.
Visual mood: Neon yellow, pink hard shadows, sticker-like objects, rounded bold shapes, and soft-hard contrast.
Scenario focus:
Landing adaptation: Use a playful product builder, sticker-like media, price/proof tags, and a friendly cart action.
Dashboard adaptation: Use creator shop metrics, order states, fulfillment cards, and tactile product previews.
Admin adaptation: Use readable commerce controls, variant forms, inventory warnings, and friendly confirmation states.
Forms/data adaptation: Use chunky labels, tactile inputs, high-contrast validation, and clear cart/save feedback.
Mobile adaptation: Put builder first, then product cards, cart summary, and proof; keep playful elements from crowding controls.
Avoid for: Weak for sober B2B, dense analytics, or official documentation portals.
Layout archetype: Sticker Shop Board.
Layout structure: Playful shop board with sticker cutouts, product tiles, price tags, and chunky commerce controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7ff45; surface #fffef2; text #18181b; muted #5b21b6; primary #ff4db8; accent #6dff8f; border #18181b; radius 26px; shadow/material 8px 8px 0 #ff4db8.
Geometry: panel radius 22px; control radius 12px; chip/state radius 10px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly bold headings, short labels, and clear commerce microcopy.
Components: Pack previews, variant chips, cart rows, proof badges, and reorder handles should feel tactile.
Buttons: Buttons are chunky, outlined, playful, and clearly clickable.
Button details: Use sticker-like buttons with firm shadows, playful active motion, and high-contrast disabled labels.
Feedback and alerts: Use friendly shop toasts, cart confirmations, and inline proof states that feel tactile.
Spacing system: Use 18-24px playful padding, 12-16px sticker gaps, and irregular but aligned product zones.
Responsive behavior: Desktop can show builder plus catalog; mobile puts builder first, then product cards, then cart summary.
Icons and media: Use sticker silhouettes, product thumbnails, cutout shapes, and playful labels.
States: Show draft, proof-ready, sold-out, selected variant, and fulfilled states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "StickerForge / Creator sticker shop" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let cuteness remove hierarchy or commerce clarity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 07 - Cute-alism as the page design direction.
Prompt type: Landing Page.
Best fit: playful brands, creator tools, youth products.
Visual mood: Neon yellow, pink hard shadows, sticker-like objects, rounded bold shapes, and soft-hard contrast.
Scenario focus:
Landing page focus: Use a playful product builder, sticker-like media, price/proof tags, and a friendly cart action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Sticker Shop Board.
Layout structure: Playful shop board with sticker cutouts, product tiles, price tags, and chunky commerce controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7ff45; surface #fffef2; text #18181b; muted #5b21b6; primary #ff4db8; accent #6dff8f; border #18181b; radius 26px; shadow/material 8px 8px 0 #ff4db8.
Geometry: panel radius 22px; control radius 12px; chip/state radius 10px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly bold headings, short labels, and clear commerce microcopy.
Components: Pack previews, variant chips, cart rows, proof badges, and reorder handles should feel tactile.
Buttons: Buttons are chunky, outlined, playful, and clearly clickable.
Button details: Use sticker-like buttons with firm shadows, playful active motion, and high-contrast disabled labels.
Feedback and alerts: Use friendly shop toasts, cart confirmations, and inline proof states that feel tactile.
Spacing system: Use 18-24px playful padding, 12-16px sticker gaps, and irregular but aligned product zones.
Responsive behavior: Desktop can show builder plus catalog; mobile puts builder first, then product cards, then cart summary.
Icons and media: Use sticker silhouettes, product thumbnails, cutout shapes, and playful labels.
States: Show draft, proof-ready, sold-out, selected variant, and fulfilled states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "StickerForge / Creator sticker shop" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let cuteness remove hierarchy or commerce clarity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 07 - Cute-alism as the page design direction.
Prompt type: Dashboard.
Best fit: playful brands, creator tools, youth products.
Visual mood: Neon yellow, pink hard shadows, sticker-like objects, rounded bold shapes, and soft-hard contrast.
Scenario focus:
Dashboard focus: Use creator shop metrics, order states, fulfillment cards, and tactile product previews.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Sticker Shop Board.
Layout structure: Playful shop board with sticker cutouts, product tiles, price tags, and chunky commerce controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7ff45; surface #fffef2; text #18181b; muted #5b21b6; primary #ff4db8; accent #6dff8f; border #18181b; radius 26px; shadow/material 8px 8px 0 #ff4db8.
Geometry: panel radius 22px; control radius 12px; chip/state radius 10px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly bold headings, short labels, and clear commerce microcopy.
Components: Pack previews, variant chips, cart rows, proof badges, and reorder handles should feel tactile.
Buttons: Buttons are chunky, outlined, playful, and clearly clickable.
Button details: Use sticker-like buttons with firm shadows, playful active motion, and high-contrast disabled labels.
Feedback and alerts: Use friendly shop toasts, cart confirmations, and inline proof states that feel tactile.
Spacing system: Use 18-24px playful padding, 12-16px sticker gaps, and irregular but aligned product zones.
Responsive behavior: Desktop can show builder plus catalog; mobile puts builder first, then product cards, then cart summary.
Icons and media: Use sticker silhouettes, product thumbnails, cutout shapes, and playful labels.
States: Show draft, proof-ready, sold-out, selected variant, and fulfilled states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "StickerForge / Creator sticker shop" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let cuteness remove hierarchy or commerce clarity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 07 - Cute-alism as the page design direction.
Prompt type: Admin Panel.
Best fit: playful brands, creator tools, youth products.
Visual mood: Neon yellow, pink hard shadows, sticker-like objects, rounded bold shapes, and soft-hard contrast.
Scenario focus:
Admin panel focus: Use readable commerce controls, variant forms, inventory warnings, and friendly confirmation states.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Sticker Shop Board.
Layout structure: Playful shop board with sticker cutouts, product tiles, price tags, and chunky commerce controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7ff45; surface #fffef2; text #18181b; muted #5b21b6; primary #ff4db8; accent #6dff8f; border #18181b; radius 26px; shadow/material 8px 8px 0 #ff4db8.
Geometry: panel radius 22px; control radius 12px; chip/state radius 10px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly bold headings, short labels, and clear commerce microcopy.
Components: Pack previews, variant chips, cart rows, proof badges, and reorder handles should feel tactile.
Buttons: Buttons are chunky, outlined, playful, and clearly clickable.
Button details: Use sticker-like buttons with firm shadows, playful active motion, and high-contrast disabled labels.
Feedback and alerts: Use friendly shop toasts, cart confirmations, and inline proof states that feel tactile.
Spacing system: Use 18-24px playful padding, 12-16px sticker gaps, and irregular but aligned product zones.
Responsive behavior: Desktop can show builder plus catalog; mobile puts builder first, then product cards, then cart summary.
Icons and media: Use sticker silhouettes, product thumbnails, cutout shapes, and playful labels.
States: Show draft, proof-ready, sold-out, selected variant, and fulfilled states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "StickerForge / Creator sticker shop" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let cuteness remove hierarchy or commerce clarity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 07 - Cute-alism as the page design direction.
Prompt type: Mobile.
Best fit: playful brands, creator tools, youth products.
Visual mood: Neon yellow, pink hard shadows, sticker-like objects, rounded bold shapes, and soft-hard contrast.
Scenario focus:
Mobile focus: Put builder first, then product cards, cart summary, and proof; keep playful elements from crowding controls.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Sticker Shop Board.
Layout structure: Playful shop board with sticker cutouts, product tiles, price tags, and chunky commerce controls.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f7ff45; surface #fffef2; text #18181b; muted #5b21b6; primary #ff4db8; accent #6dff8f; border #18181b; radius 26px; shadow/material 8px 8px 0 #ff4db8.
Geometry: panel radius 22px; control radius 12px; chip/state radius 10px; media radius 18px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use friendly bold headings, short labels, and clear commerce microcopy.
Components: Pack previews, variant chips, cart rows, proof badges, and reorder handles should feel tactile.
Buttons: Buttons are chunky, outlined, playful, and clearly clickable.
Button details: Use sticker-like buttons with firm shadows, playful active motion, and high-contrast disabled labels.
Feedback and alerts: Use friendly shop toasts, cart confirmations, and inline proof states that feel tactile.
Spacing system: Use 18-24px playful padding, 12-16px sticker gaps, and irregular but aligned product zones.
Responsive behavior: Desktop can show builder plus catalog; mobile puts builder first, then product cards, then cart summary.
Icons and media: Use sticker silhouettes, product thumbnails, cutout shapes, and playful labels.
States: Show draft, proof-ready, sold-out, selected variant, and fulfilled states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "StickerForge / Creator sticker shop" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not let cuteness remove hierarchy or commerce clarity. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
