---
name: awesome-page-design
description: Use this skill as a page design assistant for designing, reviewing, or improving websites, web apps, dashboards, landing pages, admin panels, product pages, docs portals, ecommerce/CRM/analytics screens, portfolios, onboarding flows, and UI components. It helps choose page-level visual direction and also patch existing UI locally while preserving the current design system. Trigger it for better page design, colors, layout, visual style, elegance, polish, less AI-looking UI, component refinement, local UI fixes, or implementation compliance. For new pages, guide the user to preview and choose a style unless they delegate the choice. For existing local patches, inspect and preserve the surrounding UI before changing it.
---

# Awesome Page Design

Use this skill to make deliberate page design decisions before and during UI implementation.

## Core Rule

This is a layout-aware visual direction library, not a copy-paste template library. Choose the right layout archetype for the user's product, then reuse the selected visual language and design the actual page structure around the user's content priority, workflow, and device needs.

The bundled HTML previews are richer clickable examples so the user can judge the style. They are not production layouts to clone.

Do not treat the styles as palette swaps. Adjacent styles must differ by layout archetype, information architecture, component shape, button language, typography rhythm, density, media direction, and state treatment when the product context supports it.
## Required Workflow

Follow `references/workflow.md` for the full workflow. The short version is:

1. Understand the product, screen type, primary workflow, content object, audience, density, mood, device needs, and image needs.
2. Route the request by task scale: new page, page redesign, local UI patch, component polish, implementation compliance, or design-system output.
3. For new pages or explicit redesigns, choose a layout archetype from `references/layout-guidance.md` before treating the task as visual styling.
4. For local UI patches, read `references/local-ui-patch.md`, preserve the existing page system, and avoid forcing a new visual direction.
5. If page-level visual direction is undecided, run the preview selection gate before final implementation.
6. Set the prompt type and design dials when a page-level style is selected: full, landing, dashboard, admin, or mobile; layout variance, motion intensity, and visual density.
7. Read the minimum relevant references listed below, then read the selected style manual in `references/styles/` when a style is being applied.
8. Apply the chosen or existing language to the user's real product structure; redesign layout around actual content and workflow only when the task calls for page-level work.
9. Before final approval, run the implementation compliance gate from `references/workflow.md`.

## Task Scale Router

Route by scope before selecting visual style:

- `New page`: the user asks to create a new site, page, dashboard, admin panel, landing page, app screen, or full experience. Use the preview selection gate when no style is chosen.
- `Page redesign`: the user asks to rethink the whole page, remove AI-looking structure, change the visual direction, or make the full page more professional. Audit first, then use the preview selection gate if a new direction is needed.
- `Local UI patch`: the user asks to improve one region of an existing page such as a table toolbar, modal, section, card area, sidebar, filter bar, form block, empty state, toast, drawer, tabs, or action row. Preserve the current design system and read `references/local-ui-patch.md`.
- `Component polish`: the user asks to refine a component or component family such as buttons, inputs, menus, cards, tables, overlays, navigation, or feedback. Use `references/component-implementation.md` and preserve existing tokens and variants.
- `Implementation compliance`: the user asks to review or fix usability, accessibility, responsive behavior, state handling, motion, images, or text overflow. Use `references/interface-compliance.md` and do not require style selection unless visual direction is the blocker.
- `Design system output`: the user wants future pages to stay consistent. Produce or update a project-level `DESIGN.md` using `references/design-system-output.md`.

## Work Modes

Use the user's wording to select the right mode after task scale is known:

- `Style selection`: the user is starting a new page, wants a different page-level visual direction, or explicitly asks to choose from the style library. Run the preview selection gate.
- `Design audit`: the user says the current page is ugly, generic, messy, similar, too plain, too AI-looking, or not elegant. Inspect the existing UI before choosing local fixes or page redesign.
- `Local UI patch`: the user wants a specific existing region improved without changing the whole page. Preserve the current visual system, patch only the necessary boundary, and verify neighbor regions.
- `Implementation polish`: the user already has a design direction and wants the page or component refined. Focus on layout rhythm, typography, component states, responsive behavior, icon/media consistency, and final screenshots.
- `Implementation compliance`: the user asks to review or fix real UI code. Check usability, accessibility, focus, forms, responsive behavior, state handling, motion, images, and content overflow before judging the style complete.
- `Design system output`: the user wants future pages to stay consistent. Produce or update a project-level `DESIGN.md` using `references/design-system-output.md`.

For audit and polish work, still use the preview gallery when visual direction is undecided. If the user only wants analysis, report findings without implementing.

## Preview Selection Gate

When the user describes a page-level UI request but has not already chosen a visual style, pause before implementing the final UI. First help the user select from the preview gallery.

Use this gate for complete pages, app screens, dashboards, landing pages, admin panels, product pages, docs portals, ecommerce consoles, CRM workspaces, analytics pages, portfolios, onboarding flows, page redesigns, and any page-level task where visual direction is still undecided.

Do not force this gate for local UI patches, component polish, or implementation compliance work on an existing page. In those cases, preserve the current page language unless the user asks for a new direction or the existing system is the blocker.

Required flow:

1. Summarize the user's request as a short selection brief:
   - product type
   - primary workflow or page type
   - likely layout archetype
   - primary content object
   - desired mood
   - expected information density
   - light, dark, or mixed preference when known
   - whether images/photography are useful
2. Open or provide the preview gallery URL using the instructions in `Previewing The Included HTML`.
3. Ask the user to choose by copying one detailed style prompt from the gallery.
4. Do not implement the final UI until the user has selected a style or has explicitly delegated the choice to the agent.
5. If the user says the agent should choose, recommend 2-3 style candidates, explain the differences briefly, apply the similarity guardrails, and ask for confirmation before final implementation unless the user explicitly says to proceed.
6. If the client cannot open local previews, provide text candidates from `references/style-index.md` as the fallback selection surface.

Only skip this gate when the user has already named a specific style, asks only for analysis/review, asks for a local patch or component polish that does not need page-level direction, or explicitly says to choose and proceed without confirmation.

## Reference Navigation

- `references/workflow.md`: required design, preview selection, implementation, previewing, and verification workflow.
- `references/style-index.md`: concise index of the 21 visual styles, numbered continuously from Style 01 to Style 21.
- `references/usage-principles.md`: rules for using the library correctly.
- `references/layout-guidance.md`: layout archetypes, information architecture rules, responsive structure, and anti-template layout checks.
- `references/local-ui-patch.md`: local patch workflow for existing pages, including context scan, patch boundaries, preserving the current system, neighbor checks, and escalation to page redesign.
- `references/design-dials.md`: layout variance, motion intensity, and visual density controls.
- `references/quality-checklist.md`: review checklist for previews and real UI implementation.
- `references/anti-generic-ui.md`: rules for avoiding default-looking generated pages.
- `references/interface-compliance.md`: implementation-level review rules and `file:line` audit output format.
- `references/component-implementation.md`: component state matrix and implementation rules for buttons, feedback, alerts, spacing, responsive behavior, forms, tables, overlays, and states.
- `references/motion-guidance.md`: semantic motion, reduced-motion, and transition rules.
- `references/icon-guidance.md`: icon system and icon usage rules.
- `references/design-system-output.md`: project-level `DESIGN.md` output format.
- `references/styles/*.md`: full style manuals with tokens and application guidance.
- `assets/styles/`: visual style HTML and PNG preview assets.
- `assets/previews/index.html`: preview gallery for the 21 visual styles, with desktop/mobile screenshot switching and selectable full, landing page, dashboard, admin panel, and mobile prompts.
- `scripts/validate-previews.js`: deterministic checks for preview assets, prompt payloads, mobile screenshots, documentation coverage, and common implementation anti-patterns.

## Style Set And Guardrails

Use `references/style-index.md` for the full Style 01-21 list, quick matching, and similarity guardrails. Do not let related styles collapse into the same generic page. Distinguish styles by layout archetype, information architecture, typography, material, component tone, button language, density, media direction, and state treatment.

## Previewing The Included HTML

Use the preview instructions in `references/workflow.md`. Prefer a browser URL from the local static server; use `assets/previews/index.html` only when serving is unavailable. The preview gallery supports desktop/mobile screenshot switching and prompt copying.

## When Applying A Style

Extract only what is relevant to the current project:

- Color tokens and semantic color roles.
- Layout archetype, top-level regions, content hierarchy, grid strategy, action placement, and responsive collapse behavior.
- Font family, font weights, type scale, and text density.
- Border, radius, shadow, glow, glass, metal, soft, or tactile surface treatment.
- Button, tag, card, input, table, navigation, chart, modal, drawer, and empty-state personality.
- Button anatomy, feedback level, spacing tokens, and desktop/tablet/mobile component behavior.
- Hover, focus, selected, disabled, loading, error, warning, and success states.
- Implementation compliance: accessible labels, visible focus, semantic controls, form labels, stable media dimensions, responsive text handling, reduced motion, and useful empty/error/loading states.
- Icon and media direction when the page benefits from symbols, screenshots, photography, or rich visual assets. Prefer real product imagery, brand photography, product screenshots, or carefully matched neutral media.
- Motion timing, texture rules, and responsive density.

Always apply the layout guidance and anti-generic UI rules before adding decorative effects. If the result still feels plain, change layout archetype, product scenario, information architecture, type scale, density, component states, or media direction before adding more glow, blur, gradients, or cards.

Avoid treating sample layout details as requirements. If a style manual mentions page structure, read it as an example observation, not as an instruction to reproduce that structure.

## Output Expectations

When explaining a style choice to the user, keep it practical:

- Name the selected style and why it fits.
- Mention the chosen layout archetype plus the main colors, typography, surfaces, imagery, and interaction tone.
- State that page structure will be adapted to the actual product need.

When coding, translate the selected style into concrete CSS variables, component classes, or framework theme tokens.

When patching existing UI locally, preserve the current system first: reuse nearby tokens, components, density, icon rules, and state treatments; only escalate to page-level redesign when the local problem comes from the full page structure.

When editing this skill's own preview library, regenerate assets with `npm run previews`, then run `npm run validate` before final review.
