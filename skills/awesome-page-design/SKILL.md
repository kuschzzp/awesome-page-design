---
name: awesome-page-design
description: Use this skill for designing, reviewing, or improving websites, web apps, dashboards, admin panels, landing pages, product pages, docs portals, ecommerce screens, analytics screens, internal tools, portfolios, onboarding flows, and UI components. It helps select visual direction, patch or extend existing/legacy frontend projects, preserve the current design system, and enforce polished UI primitives. Trigger it for better page design, colors, layout, elegance, less AI-looking UI, component refinement, local UI fixes, existing-project feature work, modals, dropdowns/selects, buttons, paginated tables, statistics tables/cards, forms, filters, favicon.ico/app metadata, or implementation compliance. For new pages, guide preview style selection unless the user delegates. For existing projects, inspect nearby frontend code and shared component patterns before changing UI.
---

# Awesome Page Design

Use this skill to make deliberate page design, UI integration, and implementation-quality decisions before and during frontend work.

## Operating Rule

This is a layout-aware visual direction library and UI quality workflow, not a copy-paste template library. Choose or preserve the right layout and component language for the user's product, then adapt the implementation to the real workflow, content, density, and device needs.

The bundled HTML previews are selection aids. Reuse visual language, not sample page structure.

## Required Workflow

Always start from `references/workflow.md` and `references/usage-principles.md`.

Before touching real UI code, generated HTML, forms, overlays, feedback, or interactive controls, also read `references/ui-primitive-contract.md`. This contract blocks browser-default product UI such as alert dialogs, confirmation prompts, and unstyled native selects unless a narrow exception is documented.

## Task Scale Router

- `New page`: create a new site, page, dashboard, admin panel, landing page, app screen, or full experience. Use the preview selection gate when no style is chosen, and include product shell metadata such as page title, `favicon.ico`, and app icons when the project type supports them.
- `Page redesign`: rethink a whole page, remove generic AI-looking structure, change visual direction, or improve page-level hierarchy.
- `Existing-project feature`: add or modify UI inside an existing frontend project, legacy business system, enterprise console, dashboard, internal tool, or app module. Inspect nearby routes, views, shared components, wrappers, tokens, and established component patterns before writing UI.
- `Local UI patch`: improve one existing region such as a toolbar, modal, table area, sidebar, filter bar, form block, empty state, toast, drawer, tabs, or action row. Preserve the surrounding product system.
- `Component polish`: refine a component or family such as buttons, inputs, selects, menus, cards, tables, overlays, navigation, or feedback.
- `Implementation compliance`: review or fix real UI code for usability, accessibility, responsive behavior, state handling, motion, images, text overflow, and UI primitive quality.
- `Design system output`: write or update reusable project rules with `references/design-system-output.md`.

## Mode Reference Map

- Page-level style selection or redesign: read `layout-guidance.md`, `style-index.md`, `design-dials.md`, the selected style manual in `references/styles/`, and `anti-generic-ui.md`.
- Existing-project feature: read `existing-project-integration.md`, `ui-primitive-contract.md`, `component-implementation.md`, and `interface-compliance.md`.
- Local UI patch: read `local-ui-patch.md`, `ui-primitive-contract.md`, and add component/compliance references when controls or code change.
- Component polish: read `component-implementation.md`, `ui-primitive-contract.md`, and `interface-compliance.md` for real code.
- Implementation compliance or audit: read `interface-compliance.md`, `ui-primitive-contract.md`, and add focused references for motion, icons, local patching, or existing-project integration when relevant.
- Design system output: read `design-system-output.md` plus the usage, layout, component, primitive, and interface rules that match the target project.

## Existing Project Rule

For existing or legacy projects, compatibility comes first. Inspect the current implementation before design or coding:

- sibling pages, route modules, layout shells, and shared components
- design tokens, CSS variables, Tailwind/theme config, Sass/Less variables, and utility classes
- wrappers or framework components for selects/dropdowns, buttons, tables, pagination, statistics blocks, modals, drawers, forms, filters, menus, icons, and feedback
- state patterns for hover, focus, selected, disabled, loading, empty, error, warning, success, permission, and destructive flows

Reuse the nearest, most reused, or newest production pattern by default. Treat the style library as a compatibility layer, not a replacement product system, unless the user explicitly asks for a redesign.

## Preview Selection Gate

For complete pages, app screens, dashboards, admin panels, product pages, docs portals, ecommerce consoles, internal workspaces, analytics pages, portfolios, onboarding flows, and page-level redesigns, pause before final implementation when visual direction is undecided.

Summarize the brief, provide the preview gallery URL, and ask the user to choose a task-specific prompt: full, landing, dashboard, admin, or mobile. If the user delegates the choice, recommend 2-3 candidates and explain differences in layout archetype, density, media direction, button language, and component treatment before proceeding.

Do not force this gate for local UI patches, component polish, or pure compliance work inside an existing page unless visual direction is the blocker.

## Applying A Style

Translate the chosen or existing system into concrete implementation primitives:

- layout archetype, top-level regions, action placement, responsive collapse, and primary content object
- product shell assets for new projects: document title, description metadata, `favicon.ico` or framework favicon route, and app icons when useful
- semantic tokens for background, surface, text, muted text, primary, accent, border, focus, radius, and shadow
- typography, spacing, density, icon rules, image treatment, and motion timing
- component classes or framework tokens for buttons, inputs, selects, menus, tabs, tables, cards, charts, modals, drawers, toasts, banners, empty states, loading states, validation, and destructive states
- visible states for hover, focus-visible, selected, active, loading, disabled, error, warning, success, permission, and empty scenarios

For local patches, define the target and neighbor boundaries before editing. For existing projects, name the project components or patterns being reused.

## Finish Gate

Before final approval for real UI code or generated HTML:

- Run the implementation compliance gate from `references/workflow.md`.
- Check the UI primitive contract: no product-facing browser dialog primitives, no unstyled native select used as a designed dropdown, no `outline: none`, no `transition: all`, and no default-looking browser controls where the project has a styled component pattern.
- Report the UI primitive anti-pattern scan scope and result when real UI files changed.
- Verify desktop and mobile hierarchy, text fit, focus-visible, semantic controls, accessible labels, stable dimensions, reduced motion, and useful empty/error/loading recovery.
- For new static sites or apps, confirm a real `favicon.ico` exists and is wired into HTML/head metadata. A favicon SVG may be added as a supplement, but it is not a replacement unless the framework has a favicon route that produces the browser-tab icon.
- For existing projects, confirm selects/dropdowns, buttons, paginated tables, statistics blocks, modals/drawers, filters/forms, pagination, icons, feedback states, and responsive behavior match nearby production patterns.

When editing this skill's own preview library, refresh generated assets with `PREVIEW_SCREENSHOTS=0 npm run previews` for HTML-only changes or `npm run previews` for screenshot changes, then run `npm run validate`.
