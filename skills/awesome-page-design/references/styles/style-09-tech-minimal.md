# Style 09 - Tech Minimal (科技极简风)

## Summary

Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.

Chinese summary: 大面积空白、少色、单一视觉焦点、现代非衬线字体、界面极简。

## Best For

AI tools, developer products, focused SaaS landing pages

## Example Scenario

- Product sample: NexaBrief
- Page job: Focused product workspace
- Headline: Draft one brief from decisions, risks, and launch notes.
- Primary action: Draft brief
- Secondary action: Review tasks

## Scenario Components

- Single focus: One core object anchors the page so secondary panels stay quiet.
- Measured color: A restrained accent marks important actions without turning the UI into a gradient page.
- Calm density: Whitespace improves decision speed while keeping useful details within reach.

## Example States

- Launch note: Due
- Risk summary: Draft
- Owner review: Ready

## Layout Pattern

- Pattern: Focused Brief Editor (聚焦简报编辑器)
- Archetype: Focused Brief Editor
- Structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
- Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
- Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
- Icons and media: Use product screenshots or document excerpts only when they support the brief.
- States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
- Avoid: Do not add decorative gradients to compensate for weak content hierarchy.

## Visual Language

- Background: `#f8fafc`
- Surface: `#ffffff`
- Text: `#0f172a`
- Muted text: `#64748b`
- Primary: `#111827`
- Accent: `#2563eb`
- Border: `#e2e8f0`
- Radius: `8px`
- Panel radius: `8px`
- Control radius: `4px`
- Chip radius: `2px`
- Media radius: `6px`
- Geometry rule: minimal small-radius surfaces with precise controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 20px 60px rgba(15, 23, 42, .08)`

## Component Detail System

- Button system: Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.
- Feedback and alerts: Use plain inline alerts, compact success toasts, and reserved empty states.
- Spacing system: Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.
- Responsive behavior: Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.

Chinese implementation notes:

- 按钮细节：使用极简深色主按钮、安静次按钮、清晰焦点环，不使用装饰性按钮发光。
- 提示与反馈：使用朴素内联提示、紧凑成功 toast 和克制空状态。
- 间距系统：页面节奏 24-32px，组件间距 16px，产品证明周围文本宽度克制。
- 响应式策略：桌面可稀疏；手机保留单一焦点对象，并把次级控件下移。

## Page Adaptation Guide

- Landing page: Use a focused product brief with one central proof object, concise copy, and quiet secondary links.
- Dashboard: Use clean metrics, simple lists, small charts, and generous whitespace around the main decision.
- Admin panel: Use orderly forms, tables, and settings pages with minimal decoration and strong alignment.
- Forms, tables, and data: Use simple labels, compact helper text, precise focus rings, and calm error states.
- Mobile: Keep one focus object, primary action, then details; move secondary controls below content.
- Not a good fit for: Weak for brands that need strong personality or dramatic visual storytelling.

## Usage Notes

- Use one strong hero object or product surface.
- Keep secondary UI quiet and highly aligned.
- Prefer black, white, slate, and one measured blue accent.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 09 - Tech Minimal as the page design direction.
Prompt type: Full Prompt.
Best fit: AI tools, developer products, focused SaaS landing pages.
Visual mood: Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.
Scenario focus:
Landing adaptation: Use a focused product brief with one central proof object, concise copy, and quiet secondary links.
Dashboard adaptation: Use clean metrics, simple lists, small charts, and generous whitespace around the main decision.
Admin adaptation: Use orderly forms, tables, and settings pages with minimal decoration and strong alignment.
Forms/data adaptation: Use simple labels, compact helper text, precise focus rings, and calm error states.
Mobile adaptation: Keep one focus object, primary action, then details; move secondary controls below content.
Avoid for: Weak for brands that need strong personality or dramatic visual storytelling.
Layout archetype: Focused Brief Editor.
Layout structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8fafc; surface #ffffff; text #0f172a; muted #64748b; primary #111827; accent #2563eb; border #e2e8f0; radius 8px; shadow/material 0 20px 60px rgba(15, 23, 42, .08).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
Button details: Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.
Feedback and alerts: Use plain inline alerts, compact success toasts, and reserved empty states.
Spacing system: Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.
Responsive behavior: Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.
Icons and media: Use product screenshots or document excerpts only when they support the brief.
States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NexaBrief / Focused product workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not add decorative gradients to compensate for weak content hierarchy. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 09 - Tech Minimal as the page design direction.
Prompt type: Landing Page.
Best fit: AI tools, developer products, focused SaaS landing pages.
Visual mood: Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.
Scenario focus:
Landing page focus: Use a focused product brief with one central proof object, concise copy, and quiet secondary links.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Focused Brief Editor.
Layout structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8fafc; surface #ffffff; text #0f172a; muted #64748b; primary #111827; accent #2563eb; border #e2e8f0; radius 8px; shadow/material 0 20px 60px rgba(15, 23, 42, .08).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
Button details: Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.
Feedback and alerts: Use plain inline alerts, compact success toasts, and reserved empty states.
Spacing system: Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.
Responsive behavior: Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.
Icons and media: Use product screenshots or document excerpts only when they support the brief.
States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NexaBrief / Focused product workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not add decorative gradients to compensate for weak content hierarchy. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 09 - Tech Minimal as the page design direction.
Prompt type: Dashboard.
Best fit: AI tools, developer products, focused SaaS landing pages.
Visual mood: Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.
Scenario focus:
Dashboard focus: Use clean metrics, simple lists, small charts, and generous whitespace around the main decision.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Focused Brief Editor.
Layout structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8fafc; surface #ffffff; text #0f172a; muted #64748b; primary #111827; accent #2563eb; border #e2e8f0; radius 8px; shadow/material 0 20px 60px rgba(15, 23, 42, .08).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
Button details: Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.
Feedback and alerts: Use plain inline alerts, compact success toasts, and reserved empty states.
Spacing system: Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.
Responsive behavior: Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.
Icons and media: Use product screenshots or document excerpts only when they support the brief.
States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NexaBrief / Focused product workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not add decorative gradients to compensate for weak content hierarchy. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 09 - Tech Minimal as the page design direction.
Prompt type: Admin Panel.
Best fit: AI tools, developer products, focused SaaS landing pages.
Visual mood: Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.
Scenario focus:
Admin panel focus: Use orderly forms, tables, and settings pages with minimal decoration and strong alignment.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Focused Brief Editor.
Layout structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8fafc; surface #ffffff; text #0f172a; muted #64748b; primary #111827; accent #2563eb; border #e2e8f0; radius 8px; shadow/material 0 20px 60px rgba(15, 23, 42, .08).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
Button details: Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.
Feedback and alerts: Use plain inline alerts, compact success toasts, and reserved empty states.
Spacing system: Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.
Responsive behavior: Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.
Icons and media: Use product screenshots or document excerpts only when they support the brief.
States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NexaBrief / Focused product workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not add decorative gradients to compensate for weak content hierarchy. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 09 - Tech Minimal as the page design direction.
Prompt type: Mobile.
Best fit: AI tools, developer products, focused SaaS landing pages.
Visual mood: Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.
Scenario focus:
Mobile focus: Keep one focus object, primary action, then details; move secondary controls below content.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Focused Brief Editor.
Layout structure: Quiet document workspace with a writing surface, side notes, decision chips, and subdued task context.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8fafc; surface #ffffff; text #0f172a; muted #64748b; primary #111827; accent #2563eb; border #e2e8f0; radius 8px; shadow/material 0 20px 60px rgba(15, 23, 42, .08).
Geometry: panel radius 8px; control radius 4px; chip/state radius 2px; media radius 6px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use readable editor text, crisp UI labels, and restrained heading scale.
Components: Editor panels, decision chips, review comments, tasks, and lightweight progress objects should be calm.
Buttons: Buttons are simple and sharp; primary action is solid, secondary actions are text or light outlines.
Button details: Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.
Feedback and alerts: Use plain inline alerts, compact success toasts, and reserved empty states.
Spacing system: Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.
Responsive behavior: Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.
Icons and media: Use product screenshots or document excerpts only when they support the brief.
States: Show draft, review-ready, blocked decision, synced, and disabled submit states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "NexaBrief / Focused product workspace" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not add decorative gradients to compensate for weak content hierarchy. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
