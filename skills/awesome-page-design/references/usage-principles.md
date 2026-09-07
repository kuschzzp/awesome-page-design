# Usage Principles

## Purpose

Awesome Page Design is a layout-aware visual style prompt library and UI quality workflow for website and web app design. It helps agents and developers avoid generic-looking pages by selecting the right page structure and a strong visual language for new pages, by integrating new UI into existing or legacy projects, and by preserving the current design system when patching existing UI locally.

It also treats browser-default UI primitives as a quality boundary. Finished product UI should not rely on browser alert dialogs, confirmation prompts, prompt dialogs, or unstyled native selects when a project or framework primitive can provide a designed, accessible pattern.

## Non-Negotiable Rule

Do not treat the sample HTML files as fixed layout templates.

The reusable parts are:

- layout archetype and structural identity
- color system
- typography
- radius
- borders
- shadows, glow, and material treatment
- surface texture
- image direction
- component tone
- interaction states
- animation timing
- visual density

The non-reusable parts are:

- exact page layout
- information architecture
- module order
- grid strategy
- sample content structure
- navigation model

Those must be redesigned for the user's real product and workflow.

## Layout Comes First

Before choosing a page-level style, identify the page job, primary content object, main action model, and likely layout archetype from `layout-guidance.md`.

Use the visual style to shape how the layout feels. Do not let the sample preview decide the final structure.

For an existing-page local patch, identify the target region, neighbor regions, existing tokens, component variants, density, icons, state treatment, and responsive behavior before changing CSS or components. Use `local-ui-patch.md` and preserve the current system unless the user asks for a new direction.

For an existing or legacy frontend project, inspect the current codebase before designing or coding. Use `existing-project-integration.md`, identify the nearest compatible production patterns, and make the new work feel native to the product unless the user asks for a redesign.

For real UI controls, read `ui-primitive-contract.md` and the focused pattern reference for selects, overlays, feedback, or data tables. Replace browser-default primitives with project components or an accessible styled fallback.

For a new site or app, use `new-project-shell.md`. Product-specific title, description, wired `favicon.ico`, language/viewport metadata, and starter-brand removal are part of the UI deliverable.

Examples:

- A dashboard needs filters, state, dense scanning, and real actions before it needs a hero.
- A creation tool needs a canvas/editor, toolbar, inspector, and output action before it needs marketing copy.
- A documentation page needs reading order, metadata, table of contents, and code or evidence blocks before it needs cards.
- A campaign page can be poster-like, but still needs clear schedule, proof, and conversion action.

## Preview Selection Gate

When the user describes a page-level UI request without naming a visual style, the agent should not jump straight into final implementation. First turn the request into a short selection brief, then open or provide the preview gallery so the user can choose.

Do not force this gate for a local UI patch, component polish, or pure implementation compliance task on an existing page. In those cases, inspect the existing page system and patch the requested region first.

The selection brief should cover:

- product type
- page type or primary workflow
- layout archetype
- primary content object
- mood
- information density
- light, dark, or mixed preference when known
- whether images or illustration are useful

The user may delegate the choice. If they explicitly ask to choose and proceed, state the selected style and reasoning, then implement. Otherwise, recommend a small shortlist, explain the differences, and wait for confirmation.

If local previews cannot be opened, use `style-index.md` as the text fallback for selection.

## Work Modes

Use the skill in these modes:

- `Style selection`: choose a visual direction before building.
- `Design audit`: inspect an existing page for weak hierarchy, generic layout, unclear states, inconsistent icons, low contrast, or poor responsive behavior.
- `Existing project integration`: add or modify UI inside a current or legacy codebase while matching established frontend patterns.
- `Local UI patch`: improve a target region of an existing page while preserving nearby tokens, components, density, icons, and state treatment.
- `Implementation polish`: refine an existing implementation while preserving the chosen style.
- `Implementation compliance`: review or fix real UI code for semantic controls, focus, forms, component states, responsive behavior, text handling, media stability, and motion.
- `UI primitive enforcement`: replace browser dialogs, unstyled native selects, and default-looking controls with project primitives or styled accessible fallbacks.
- `Design system output`: write reusable project rules so future pages stay consistent.

For audit and polish work, use `quality-checklist.md`, `anti-generic-ui.md`, `ui-primitive-contract.md`, and `interface-compliance.md` before making visual changes.

For existing project work, use `existing-project-integration.md` first. For local UI patch work, use `local-ui-patch.md` and only escalate to page redesign when the target issue comes from page-level information architecture, layout hierarchy, or conflicting systems.

## Design Dials

After choosing a page-level style, set:

- Layout variance: low, medium, or high.
- Motion intensity: none, subtle, or expressive.
- Visual density: sparse, normal, or dense.

Infer these from the product when the user does not specify them. The same style can become conservative, dense, expressive, or sparse through these dials.

## Selection Heuristics

Use Style 09 Tech Minimal, Style 11 Structured Lines, Style 12 Layered Material, or Style 18 Precision Futurism for serious product work where clarity matters.

Use Style 10 Dark Theme, Style 15 Liquid Glass, Style 18 Precision Futurism, or Style 21 Acid Design for dark, immersive, technical, or experimental products, but keep their differences clear.

Use Style 13 Bento Layout when the page benefits from modular card zones and widget-like chunks. It is a visual composition style, not a required page framework.

Use Style 02 Block Brutalism, Style 04 Retro Y2K, Style 16 Retro Computing, Style 17 Neo-Brutalism, Style 19 Gradient Pop, Style 20 Soft Pop, or Style 21 Acid Design when the brand, audience, or campaign can carry a strong visual personality.

Use Style 14 Neumorphism only when a soft tactile interface fits the product and accessibility remains strong.

## Image Guidance

When a website design needs images, prefer real product screenshots, customer images, brand photography, or carefully matched neutral media. When screenshotting generated previews, wait long enough for the page to render.

## Icon Guidance

When a page uses icons, prefer the icon library already used by the project. Keep icon family, stroke width, fill logic, size, and alignment consistent. Icon buttons need accessible labels or nearby visible text.

## Implementation Guidance

Start by creating tokens: background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.

Then map tokens onto real components. Adjust component layout to the product's needs instead of copying sample sections.

Always define top-level regions and responsive collapse behavior before final CSS polish.

For new projects, complete and verify the framework-specific checklist in `new-project-shell.md`, including `favicon.ico` output.

For local UI patches, start from existing tokens and component rules instead of creating a new system. Define the target boundary, neighbor boundary, and any shared component boundary before editing.

For existing-project features, start from the nearest production examples and load only the focused component pattern documents required by the changed UI.

Do not use `alert(...)`, `confirm(...)`, `prompt(...)`, or an unstyled native `<select>` as finished product UI. Use the project's toast, inline alert, banner, modal, drawer, undo, select, dropdown, combobox, menu, or pagination primitive instead.

Keep accessibility intact. If a style uses low contrast, glow, glass, chrome, texture, or decorative motion, preserve readability and focus visibility first.

When real UI code is changed, run the implementation compliance gate from `workflow.md` and the verification section of each focused component contract used.

Use the layout guidance and anti-generic UI rules before adding decoration. Improve layout archetype, product scenario, information architecture, type scale, density, component states, or media direction before adding extra effects.

## User-Facing Explanation

When presenting a style decision, say which layout archetype is being used, which visual rules are being reused, and which layout decisions are being newly designed for the actual product.

When presenting a local patch, say which target region changed, which existing system rules were preserved, which nearby regions were checked, and whether any broader page redesign risk remains.
