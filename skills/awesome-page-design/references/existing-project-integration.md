# Existing Project Integration

Use this reference whenever the user asks to add, modify, redesign, polish, or review UI inside an existing frontend codebase, especially legacy admin systems, enterprise consoles, dashboards, operational workbenches, and internal tools.

The goal is compatibility first: a new feature should feel authored by the same product team unless the user explicitly asks for a new visual direction.

## When To Use

Use this mode for requests such as:

- Add a new management page to this existing admin project.
- Implement this feature in the legacy admin project.
- Add filters, actions, or a detail modal to this table page.
- Make this dashboard module fit the existing system.
- Polish this page without changing the whole product style.
- Update a form, select, table, pagination, modal, drawer, or stats block in an existing app.

Use this mode before `Style selection` when the work is inside a current product. Only run the preview selection gate when the user asks for a new page-level visual direction or the existing system cannot support the feature safely.

Read `ui-primitive-contract.md` with this file before implementing controls, forms, feedback, overlays, generated HTML, confirmation flows, or dropdown behavior.

## Required Frontend Inventory

Before designing or coding, inspect the latest relevant project files. Build a small mental inventory from real source code, not assumptions.

Read the closest examples you can find:

- Nearby routes, pages, views, layout shells, and sibling modules.
- Shared component wrappers, UI framework adapters, base components, and design-system folders.
- Theme tokens, CSS variables, Tailwind config, Sass/Less variables, reset styles, and global utility classes.
- Existing form layout, search/filter area, table/list page, statistics panel, action toolbar, modal, drawer, and empty/error/loading states.
- Existing UI primitive wrappers for selects/dropdowns, menus, buttons, modals, drawers, popovers, toasts, banners, inline alerts, pagination, form controls, confirmation flows, and copy/export feedback.
- Icon source, icon sizing, button icon placement, and label conventions.
- Pagination, sorting, selected-row, bulk-action, and detail navigation patterns.
- Responsive conventions for sidebars, filters, dense tables, dialogs, and sticky action rows.

When possible, identify concrete source examples in the design brief so the implementation can reuse them deliberately.

## Component Baselines To Match

Check these component families before writing new UI:

- Selects and dropdowns: trigger height, border, radius, placeholder, selected text, clear action, arrow icon, menu width, option height, disabled options, search behavior, empty menu, validation, z-index, and overlay placement.
- Buttons and action groups: primary, secondary, quiet, text, icon-only, destructive, success, loading, disabled, permission-disabled, selected/toggled, bulk-action, and toolbar variants.
- Paginated tables: filter bar, toolbar, density, column alignment, row height, sticky header, sorter/filter affordances, selected rows, batch actions, loading rows, empty state, error state, pagination placement, page-size selector, and row action menu.
- Statistics tables and metric panels: number formatting, tabular numerals, comparison deltas, labels, units, trend arrows, stale/loading/no-data states, grid rhythm, and chart/table relationship.
- Modals, drawers, popovers, and menus: trigger pattern, title bar, close affordance, footer actions, destructive confirmation, scroll area, overlay layer, focus expectation, escape behavior, and mobile fallback.
- Forms and filters: label position, required marks, validation placement, helper text, inline versus advanced filters, reset/apply behavior, saved filters, date/time/number formatting, and active filter chips.
- Feedback states: toast, inline alert, banner, row-local status, field error, loading skeleton, retry, empty state, permission state, copy/export status, confirmation, and undo.

If the project uses a UI framework such as Ant Design, Element Plus, Material UI, shadcn/ui, Bootstrap, Naive UI, or a custom wrapper library, prefer its existing wrappers and variants over raw framework components.

## Implementation Rules

- Reuse existing components, props, slots, utility classes, naming conventions, and state patterns by default.
- Add a new variant only when the current component system lacks a needed state or hierarchy. Keep the variant narrow unless the same need appears in multiple places.
- Keep table, form, modal, and button density aligned with sibling pages unless the user explicitly asks to change density.
- Match old project constraints, including fixed page shells, legacy CSS preprocessors, global class naming, route conventions, and state management patterns.
- Avoid introducing a new dependency, icon family, styling system, table library, chart library, or modal manager for a local feature unless the current project already uses it or the user approves.
- Do not use browser `alert`, `confirm`, or `prompt` dialogs for product feedback, copy fallback, destructive confirmation, or validation.
- Do not use an unstyled native `<select>` for dropdowns, filters, status changes, page-size controls, or prompt pickers when the project has a styled select/dropdown/combobox/menu primitive.
- Do not import sample HTML or copy a style preview layout into an existing product. Translate only the useful visual rules into the current codebase.
- If the existing system is inconsistent, choose the most recent, most reused, or nearest production pattern and name that choice in the response.

## Escalation Rules

Escalate from existing-project integration to page redesign only when:

- Nearby pages are internally inconsistent enough that reuse would make the new feature worse.
- The feature requires a different information architecture, not just a new component state.
- The current component system lacks essential accessibility, responsive, or state handling across the whole page type.
- The user explicitly asks for a visual reset, new style, or less legacy-looking page.

When escalating, explain which existing patterns were checked and why they cannot support the requested outcome.

## Final Verification

Before finishing, re-check the implemented UI against existing examples:

- Selects/dropdowns match existing trigger, menu, option, clear, disabled, and validation patterns.
- Buttons match existing action hierarchy, icon placement, loading, disabled, and destructive patterns.
- Tables match existing row density, alignment, selection, loading, empty/error, pagination, and row-action patterns.
- Statistics blocks match existing number formatting, labels, comparison states, and grid rhythm.
- Modals/drawers match existing header, body, footer, close, overlay, scroll, and confirmation behavior.
- Forms/filters match label, validation, reset/apply, advanced filter, and active filter conventions.
- Feedback and confirmation flows use project toasts, inline alerts, banners, modals, drawers, undo, or page-level status instead of browser dialogs.
- UI primitive anti-patterns from `ui-primitive-contract.md` have been scanned or manually checked in the changed files.
- Icons, spacing, radius, shadows, typography, and colors still belong to the current project.
- Desktop and mobile behavior follows the nearest existing page unless the change intentionally improves a documented weakness.

In the final response, state which existing project patterns were preserved and which new variants were added.
