# Design Quality Checklist

Use this checklist when reviewing an existing UI, polishing an implementation, or improving the bundled previews.

## First Impression

- The first viewport communicates a specific product or workflow, not a generic design slogan.
- The layout archetype is recognizable within the first viewport.
- The primary content object and main action are visible without reading explanatory feature copy.
- The page has one clear visual hierarchy: primary action, main content, supporting proof, then secondary actions.
- The selected style is visible in typography, color, surfaces, components, and state treatment, not only in background color.
- The page avoids looking like a palette swap of another style.
- The page avoids looking like the same skeleton with different colors, especially in hero layout, card rhythm, button shape, and action placement.
- The selected prompt type matches the job: full, landing page, dashboard, admin panel, or mobile.
- The page has visible product states, not only static marketing copy.

## Layout

- The layout matches the product type: dashboard, landing page, editorial page, portfolio, console, onboarding flow, or commerce surface.
- The layout matches a clear archetype from `layout-guidance.md`.
- The primary content object, top-level regions, and main action model are visible in the structure.
- The layout matches the selected style's structural identity, not only its palette.
- Operational tools expose filters, search, status, ownership, priority, and next actions before marketing copy.
- Creation tools expose the editor/canvas, tool controls, preview, inspector, and output action before promotional sections.
- Admin panels expose navigation, tables/forms, bulk actions, permissions, save feedback, empty states, and recovery paths.
- Content-heavy pages preserve reading order, metadata, table of contents, captions, and evidence blocks before decorative modules.
- Repeated cards have different jobs or clear grouping; they are not identical filler blocks.
- Gutters, section spacing, and component spacing follow a consistent rhythm.
- Dense pages use alignment, tables, filters, labels, and status chips to support scanning.
- Expressive pages still preserve orientation, reading order, and obvious actions.

## Typography

- Headings, body copy, labels, metadata, and numeric values have distinct roles.
- Long headings wrap cleanly and do not overpower compact UI panels.
- Body text is readable at desktop and mobile widths.
- Monospace, display, condensed, or playful type choices are used intentionally and sparingly.

## Color And Material

- Background, surface, text, muted text, primary, accent, border, focus, and state colors are assigned semantic roles.
- Low-contrast muted text never carries important information.
- Glow, glass, chrome, soft depth, gradients, and texture improve the selected mood without hurting legibility.
- Destructive, warning, success, disabled, selected, and focus states are visually distinct.

## Components

- Buttons have primary, secondary, disabled, focus, hover, and pressed states when relevant.
- Button shape, density, border treatment, fill logic, and interaction feedback match the selected style instead of using one default SaaS button everywhere.
- Buttons also define loading, selected/toggled, destructive, and success/error treatment when those actions appear.
- Inputs, tabs, menus, filters, cards, tables, drawers, modals, empty states, and loading states inherit the chosen style.
- Feedback patterns are explicit: toast, snackbar, banner, inline alert, validation message, row-local status, modal confirmation, or undo.
- Spacing is specified beyond vague "generous spacing": page gutters, section rhythm, panel padding, row gaps, control height, and dense/touch-friendly variants are clear.
- Icons share one visual system: same source family, stroke, fill logic, size, and alignment.
- Overlays have clear stacking, backdrop, close affordance, and keyboard/focus behavior when implemented.

## Implementation Compliance

- Semantic controls are used: buttons for actions, links for navigation, labels for form controls, and meaningful names for inputs.
- Icon-only controls have accessible labels or visible adjacent text.
- Every interactive element has a visible `focus-visible` state.
- The component state matrix from `component-implementation.md` is covered for the components that appear on the page.
- Built-in previews include a visible component behavior block with buttons, loading, disabled, selected/toggled, inline feedback, input helper text, common product states, and responsive notes.
- Images, screenshots, charts, and fixed-format media have stable dimensions or aspect-ratio rules.
- Transitions list exact properties, avoid `transition: all`, and respect reduced-motion preferences when motion is present.
- Long text, table cells, metrics, labels, and user-generated content have a wrapping, truncation, or clamp strategy.
- Empty, loading, error, warning, success, disabled, selected, and permission-denied states explain the state and next action.
- Destructive actions provide confirmation, undo, or a clear recovery path.
- Dates, times, numbers, and currency values are formatted intentionally for product UI.

## Content

- Example copy names a real-feeling workflow, object, or decision.
- Metrics, queue items, labels, and messages are specific enough to judge the UI.
- Empty, error, loading, and success states use helpful text instead of vague filler.
- The page avoids fake brand references, external source labels, and unrelated decorative captions.

## Responsive

- Mobile preserves the same hierarchy without forcing desktop grids into narrow columns.
- The responsive collapse is intentional: filters, sidebars, inspectors, tables, media, and secondary actions move into usable drawers, tabs, accordions, or stacked regions.
- The primary content object, current status, and primary action remain reachable on mobile.
- Tablet and mobile order is defined for title, status, primary action, filters, main content, supporting proof, and secondary actions.
- Important controls stay reachable and do not collapse into ambiguous icons.
- Tables, charts, media, and dense panels have a readable small-screen treatment.
- Text never overlaps, clips, or relies on viewport-scaled font sizes to fit.

## Final Verification

- Check desktop and mobile screenshots.
- Check that every built-in style has both desktop and mobile PNG previews after regeneration.
- Check implementation compliance before final visual approval when real UI code or generated HTML is involved.
- Check that copied style prompts do not instruct the agent to copy the sample layout.
- Check that copied style prompts include full, landing page, dashboard, admin panel, and mobile variants where the preview gallery offers copy actions.
- Check that copied style prompts include layout archetype, layout structure, page adaptation, component treatment, button rules, feedback patterns, spacing system, responsive behavior, icon/media direction, state rules, motion rules, implementation compliance, constraints, and verification checks.
- Check that adjacent styles are distinguishable by structure, component tone, material, and content scenario.
- Check that generated docs and previews do not contain obsolete or external reference wording.
- Run `npm run validate` for this skill's own preview library before final approval.
