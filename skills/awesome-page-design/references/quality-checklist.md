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

## Layout

- The layout matches the product type: dashboard, landing page, editorial page, portfolio, console, onboarding flow, or commerce surface.
- The layout matches a clear archetype from `layout-guidance.md`.
- The primary content object, top-level regions, and main action model are visible in the structure.
- The layout matches the selected style's structural identity, not only its palette.
- Operational tools expose filters, search, status, ownership, priority, and next actions before marketing copy.
- Creation tools expose the editor/canvas, tool controls, preview, inspector, and output action before promotional sections.
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
- Inputs, tabs, menus, filters, cards, tables, drawers, modals, empty states, and loading states inherit the chosen style.
- Icons share one visual system: same source family, stroke, fill logic, size, and alignment.
- Overlays have clear stacking, backdrop, close affordance, and keyboard/focus behavior when implemented.

## Content

- Example copy names a real-feeling workflow, object, or decision.
- Metrics, queue items, labels, and messages are specific enough to judge the UI.
- Empty, error, loading, and success states use helpful text instead of vague filler.
- The page avoids fake brand references, external source labels, and unrelated decorative captions.

## Responsive

- Mobile preserves the same hierarchy without forcing desktop grids into narrow columns.
- The responsive collapse is intentional: filters, sidebars, inspectors, tables, media, and secondary actions move into usable drawers, tabs, accordions, or stacked regions.
- The primary content object, current status, and primary action remain reachable on mobile.
- Important controls stay reachable and do not collapse into ambiguous icons.
- Tables, charts, media, and dense panels have a readable small-screen treatment.
- Text never overlaps, clips, or relies on viewport-scaled font sizes to fit.

## Final Verification

- Check desktop and mobile screenshots.
- Check that copied style prompts do not instruct the agent to copy the sample layout.
- Check that copied style prompts include layout archetype, layout structure, component treatment, button rules, icon/media direction, state rules, constraints, and verification checks.
- Check that adjacent styles are distinguishable by structure, component tone, material, and content scenario.
- Check that generated docs and previews do not contain obsolete or external reference wording.
