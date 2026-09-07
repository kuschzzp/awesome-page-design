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

Load only the detailed contract for the component family being changed:

| Changed UI | Required reference |
|---|---|
| Select, dropdown, autocomplete, combobox, or page-size chooser | `patterns/select-and-combobox.md` |
| Modal, drawer, destructive confirmation, popover, or overlay | `patterns/modal-drawer-and-confirmation.md` |
| Toast, inline alert, banner, save/copy/export outcome, or recovery message | `patterns/toast-alert-and-feedback.md` |
| Data table, filters, sorting, selection, batch actions, or pagination | `patterns/data-table-and-pagination.md` |

For buttons, forms, statistics panels, icons, and navigation, match the nearest production example and use `component-implementation.md`. The focused references own detailed state, accessibility, mobile, and verification lists so they do not drift across this workflow.

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

Before finishing, re-check the implementation against the nearest production examples and every loaded pattern contract:

- Changed components match existing dimensions, hierarchy, density, icons, terminology, state treatment, and responsive conventions.
- Pattern-specific required states, keyboard/focus behavior, mobile fallback, and verification checks pass.
- Buttons, forms, statistics blocks, and navigation still follow the closest compatible project implementation.
- Feedback and confirmation flows use project toasts, inline alerts, banners, modals, drawers, undo, or page-level status instead of browser dialogs.
- UI primitive anti-patterns from `ui-primitive-contract.md` have been scanned or manually checked in the changed files.
- Icons, spacing, radius, shadows, typography, and colors still belong to the current project.
- Desktop and mobile behavior follows the nearest existing page unless a higher-priority usability or accessibility rule requires a documented repair.

In the final response, state which existing project patterns were preserved and which new variants were added.
