# Style 16 - Retro Computing (复古主义)

## Summary

Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type.

Chinese summary: 像素风、复古 UI、老式操作系统质感、80 年代计算机线索、块状窗口和像素字体。

## Best For

music sites, game-adjacent products, cultural campaigns

## Example Scenario

- Product sample: PixelDesk
- Page job: Retro media workstation
- Headline: Run the release from a chunky desktop board.
- Primary action: Open player
- Secondary action: View files

## Scenario Components

- Old system texture: Chunky windows, hard pixels, and bitmap rhythm create nostalgia with intent.
- Functional chrome: Window bars, tabs, and file rows are real UI, not only decoration.
- Bright precision: Crisp lines keep the playful palette from becoming messy.

## Example States

- Track 03: Loop
- Poster file: Open
- Guest note: Saved

## Layout Pattern

- Pattern: Retro Desktop Workspace (复古桌面工作区)
- Archetype: Retro Desktop Workspace
- Structure: Old desktop environment with overlapping windows, title bars, pixel panels, and file-like action rows.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use monospace or bitmap-like rhythm, crisp labels, and short window titles.
- Components: Windows, title bars, folder rows, mini players, file chips, and pixel dividers should feel functional.
- Buttons: Buttons are rectangular system controls with hard borders and pressed offsets.
- Icons and media: Use file windows, player bars, pixel diagrams, and desktop objects as the visual language.
- States: Show open, saved, playing, minimized, selected file, and modal states.
- Avoid: Do not make the page look broken; nostalgia still needs clear UI.

## Visual Language

- Background: `#f8df7a`
- Surface: `#fff8c9`
- Text: `#1f1300`
- Muted text: `#6f4b1d`
- Primary: `#0057ff`
- Accent: `#ff3bcb`
- Border: `#1f1300`
- Radius: `2px`
- Panel radius: `2px`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `2px`
- Geometry rule: retro system windows with hard pixel edges; avoid making every button and card the same large rounded rectangle.
- Shadow: `8px 8px 0 #1f1300`

## Component Detail System

- Button system: Use OS-window buttons, sharp pixel borders, hard active states, and disabled controls that look unavailable in-system.
- Feedback and alerts: Use window-style alerts, file-status rows, and modal dialogs that feel like old desktop chrome.
- Spacing system: Use 8-14px window chrome spacing, dense file rows, and clear title bars.
- Responsive behavior: Desktop can overlap windows; mobile disables overlap and turns windows into stacked panels.

Chinese implementation notes:

- 按钮细节：使用操作系统窗口按钮、锐利像素边框、硬按下态，以及系统内不可用的禁用控件。
- 提示与反馈：使用窗口式提示、文件状态行，以及像旧桌面 chrome 的弹窗。
- 间距系统：窗口 chrome 间距 8-14px，文件行紧凑，标题栏清楚。
- 响应式策略：桌面可重叠窗口；手机取消重叠，窗口变成堆叠面板。

## Page Adaptation Guide

- Landing page: Use retro windows, title bars, file lists, and a playful install/play action.
- Dashboard: Use overlapping desktop windows for music, files, queues, and system-style status.
- Admin panel: Use only for themed tools; make file states, dialogs, and buttons feel intentionally old-system.
- Forms, tables, and data: Use title-bar groups, pixel borders, system alerts, and sharp validation states.
- Mobile: Disable window overlap and turn windows into stacked panels with clear title bars.
- Not a good fit for: Weak for serious finance, healthcare, or modern premium SaaS.

## Usage Notes

- Use hard windows, pixel dividers, and playful system chrome.
- Keep nostalgia intentional, not broken.
- Use bright accents with crisp black lines.

## Copy Style Prompts

### Full Prompt

```text
Use awesome-page-design Style 16 - Retro Computing as the page design direction.
Prompt type: Full Prompt.
Best fit: music sites, game-adjacent products, cultural campaigns.
Visual mood: Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type.
Scenario focus:
Landing adaptation: Use retro windows, title bars, file lists, and a playful install/play action.
Dashboard adaptation: Use overlapping desktop windows for music, files, queues, and system-style status.
Admin adaptation: Use only for themed tools; make file states, dialogs, and buttons feel intentionally old-system.
Forms/data adaptation: Use title-bar groups, pixel borders, system alerts, and sharp validation states.
Mobile adaptation: Disable window overlap and turn windows into stacked panels with clear title bars.
Avoid for: Weak for serious finance, healthcare, or modern premium SaaS.
Layout archetype: Retro Desktop Workspace.
Layout structure: Old desktop environment with overlapping windows, title bars, pixel panels, and file-like action rows.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8df7a; surface #fff8c9; text #1f1300; muted #6f4b1d; primary #0057ff; accent #ff3bcb; border #1f1300; radius 2px; shadow/material 8px 8px 0 #1f1300.
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace or bitmap-like rhythm, crisp labels, and short window titles.
Components: Windows, title bars, folder rows, mini players, file chips, and pixel dividers should feel functional.
Buttons: Buttons are rectangular system controls with hard borders and pressed offsets.
Button details: Use OS-window buttons, sharp pixel borders, hard active states, and disabled controls that look unavailable in-system.
Feedback and alerts: Use window-style alerts, file-status rows, and modal dialogs that feel like old desktop chrome.
Spacing system: Use 8-14px window chrome spacing, dense file rows, and clear title bars.
Responsive behavior: Desktop can overlap windows; mobile disables overlap and turns windows into stacked panels.
Icons and media: Use file windows, player bars, pixel diagrams, and desktop objects as the visual language.
States: Show open, saved, playing, minimized, selected file, and modal states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PixelDesk / Retro media workstation" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page look broken; nostalgia still needs clear UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Landing Page

```text
Use awesome-page-design Style 16 - Retro Computing as the page design direction.
Prompt type: Landing Page.
Best fit: music sites, game-adjacent products, cultural campaigns.
Visual mood: Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type.
Scenario focus:
Landing page focus: Use retro windows, title bars, file lists, and a playful install/play action.
First viewport must establish the product, literal offer, primary conversion action, proof, and media direction.
Avoid the generic hero plus three feature cards; arrange proof, workflow, testimonials, or product visuals around the real offer.
Layout archetype: Retro Desktop Workspace.
Layout structure: Old desktop environment with overlapping windows, title bars, pixel panels, and file-like action rows.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8df7a; surface #fff8c9; text #1f1300; muted #6f4b1d; primary #0057ff; accent #ff3bcb; border #1f1300; radius 2px; shadow/material 8px 8px 0 #1f1300.
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace or bitmap-like rhythm, crisp labels, and short window titles.
Components: Windows, title bars, folder rows, mini players, file chips, and pixel dividers should feel functional.
Buttons: Buttons are rectangular system controls with hard borders and pressed offsets.
Button details: Use OS-window buttons, sharp pixel borders, hard active states, and disabled controls that look unavailable in-system.
Feedback and alerts: Use window-style alerts, file-status rows, and modal dialogs that feel like old desktop chrome.
Spacing system: Use 8-14px window chrome spacing, dense file rows, and clear title bars.
Responsive behavior: Desktop can overlap windows; mobile disables overlap and turns windows into stacked panels.
Icons and media: Use file windows, player bars, pixel diagrams, and desktop objects as the visual language.
States: Show open, saved, playing, minimized, selected file, and modal states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PixelDesk / Retro media workstation" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page look broken; nostalgia still needs clear UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Dashboard

```text
Use awesome-page-design Style 16 - Retro Computing as the page design direction.
Prompt type: Dashboard.
Best fit: music sites, game-adjacent products, cultural campaigns.
Visual mood: Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type.
Scenario focus:
Dashboard focus: Use overlapping desktop windows for music, files, queues, and system-style status.
Prioritize filters, metrics, lists/tables, detail panels, state, and next actions.
Do not turn an operational screen into a marketing hero; keep the primary object, current state, and main action visible.
Layout archetype: Retro Desktop Workspace.
Layout structure: Old desktop environment with overlapping windows, title bars, pixel panels, and file-like action rows.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8df7a; surface #fff8c9; text #1f1300; muted #6f4b1d; primary #0057ff; accent #ff3bcb; border #1f1300; radius 2px; shadow/material 8px 8px 0 #1f1300.
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace or bitmap-like rhythm, crisp labels, and short window titles.
Components: Windows, title bars, folder rows, mini players, file chips, and pixel dividers should feel functional.
Buttons: Buttons are rectangular system controls with hard borders and pressed offsets.
Button details: Use OS-window buttons, sharp pixel borders, hard active states, and disabled controls that look unavailable in-system.
Feedback and alerts: Use window-style alerts, file-status rows, and modal dialogs that feel like old desktop chrome.
Spacing system: Use 8-14px window chrome spacing, dense file rows, and clear title bars.
Responsive behavior: Desktop can overlap windows; mobile disables overlap and turns windows into stacked panels.
Icons and media: Use file windows, player bars, pixel diagrams, and desktop objects as the visual language.
States: Show open, saved, playing, minimized, selected file, and modal states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PixelDesk / Retro media workstation" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page look broken; nostalgia still needs clear UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Admin Panel

```text
Use awesome-page-design Style 16 - Retro Computing as the page design direction.
Prompt type: Admin Panel.
Best fit: music sites, game-adjacent products, cultural campaigns.
Visual mood: Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type.
Scenario focus:
Admin panel focus: Use only for themed tools; make file states, dialogs, and buttons feel intentionally old-system.
Emphasize navigation, tables/forms, bulk actions, permissions, errors, empty states, save feedback, and undo paths.
Restrain decoration so repeated action, scanning, comparison, and recovery paths stay clear.
Layout archetype: Retro Desktop Workspace.
Layout structure: Old desktop environment with overlapping windows, title bars, pixel panels, and file-like action rows.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8df7a; surface #fff8c9; text #1f1300; muted #6f4b1d; primary #0057ff; accent #ff3bcb; border #1f1300; radius 2px; shadow/material 8px 8px 0 #1f1300.
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace or bitmap-like rhythm, crisp labels, and short window titles.
Components: Windows, title bars, folder rows, mini players, file chips, and pixel dividers should feel functional.
Buttons: Buttons are rectangular system controls with hard borders and pressed offsets.
Button details: Use OS-window buttons, sharp pixel borders, hard active states, and disabled controls that look unavailable in-system.
Feedback and alerts: Use window-style alerts, file-status rows, and modal dialogs that feel like old desktop chrome.
Spacing system: Use 8-14px window chrome spacing, dense file rows, and clear title bars.
Responsive behavior: Desktop can overlap windows; mobile disables overlap and turns windows into stacked panels.
Icons and media: Use file windows, player bars, pixel diagrams, and desktop objects as the visual language.
States: Show open, saved, playing, minimized, selected file, and modal states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PixelDesk / Retro media workstation" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page look broken; nostalgia still needs clear UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, semantic controls, accessible labels, focus-visible, reduced motion, stable media, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, hover, selected, warning, and success states.
```

### Mobile

```text
Use awesome-page-design Style 16 - Retro Computing as the page design direction.
Prompt type: Mobile.
Best fit: music sites, game-adjacent products, cultural campaigns.
Visual mood: Pixel mood, old operating-system texture, 80s computing cues, chunky windows, and bitmap type.
Scenario focus:
Mobile focus: Disable window overlap and turn windows into stacked panels with clear title bars.
Define the order for title, current status, primary action, filters, main content, supporting proof, and secondary actions.
Specify touch targets, bottom actions, collapsible panels, table fallbacks, and safe areas; do not squeeze desktop grids.
Layout archetype: Retro Desktop Workspace.
Layout structure: Old desktop environment with overlapping windows, title bars, pixel panels, and file-like action rows.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f8df7a; surface #fff8c9; text #1f1300; muted #6f4b1d; primary #0057ff; accent #ff3bcb; border #1f1300; radius 2px; shadow/material 8px 8px 0 #1f1300.
Geometry: panel radius 2px; control radius 0; chip/state radius 0; media radius 2px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use monospace or bitmap-like rhythm, crisp labels, and short window titles.
Components: Windows, title bars, folder rows, mini players, file chips, and pixel dividers should feel functional.
Buttons: Buttons are rectangular system controls with hard borders and pressed offsets.
Button details: Use OS-window buttons, sharp pixel borders, hard active states, and disabled controls that look unavailable in-system.
Feedback and alerts: Use window-style alerts, file-status rows, and modal dialogs that feel like old desktop chrome.
Spacing system: Use 8-14px window chrome spacing, dense file rows, and clear title bars.
Responsive behavior: Desktop can overlap windows; mobile disables overlap and turns windows into stacked panels.
Icons and media: Use file windows, player bars, pixel diagrams, and desktop objects as the visual language.
States: Show open, saved, playing, minimized, selected file, and modal states.
Component state matrix: define visible, style-consistent states for the buttons, links, inputs, filters, cards, lists, tables, modals, drawers, empty states, error states, loading states, disabled states, selected states, warning states, and success states that appear in the UI.
Motion: every transition should communicate entry, exit, disclosure, loading, object continuity, list reordering, or progress. Avoid transition: all and provide reduced-motion behavior.
Implementation compliance: use semantic controls; give icon-only buttons accessible names; make focus-visible obvious; keep media dimensions stable with width/height or aspect-ratio; handle long text with wrapping, truncation, or clamping; make empty/error/loading states explain the next action.
Example content direction: you may use the specificity of "PixelDesk / Retro media workstation" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not make the page look broken; nostalgia still needs clear UI. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
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
