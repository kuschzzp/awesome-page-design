# Component Implementation

Use this reference when translating a selected style into real components. A page should not only style the default state. Every component that can change state needs a visible, style-consistent state model.

Read `ui-primitive-contract.md` before implementing selects/dropdowns, browser feedback replacement, copy/export feedback, destructive confirmation, modal/drawer behavior, or native form controls in finished product UI.

## Component State Matrix

Define the relevant states before final polish:

| Component | Required States |
|---|---|
| Buttons | default, hover, focus-visible, pressed, loading, disabled, destructive when relevant |
| Links | default, hover, focus-visible, visited only when useful, active/current |
| Inputs | empty, focused, filled, invalid, disabled, read-only, helper text, error text |
| Selects and menus | closed, open, hover, focus-visible, focused option, selected option, disabled option, empty, loading, validation |
| Tabs and segmented controls | default, hover, focus-visible, selected, disabled |
| Filters | inactive, active, removable, empty result, saved view when relevant |
| Cards | static, clickable, selected, disabled, warning, expanded when relevant |
| Tables and lists | hover row, selected row, loading row, empty state, error state, truncated content |
| Charts and metrics | loading, no data, stale data, warning, selected series, comparison change |
| Modals and drawers | open, closing, backdrop, close control, focus trap expectation, destructive confirmation |
| Toasts and banners | info, success, warning, error, dismissing, action available |
| Empty states | first use, filtered empty, permission empty, error empty, recovery action |

## Component Detail Contract

For each selected style, define these details before writing final UI code:

- Button anatomy: height, padding, radius, border width, fill logic, icon placement, label length, and primary/secondary/destructive hierarchy.
- Button states: hover, focus-visible, pressed, loading, disabled, selected/toggled, success, warning, error, and destructive confirmation when relevant.
- Feedback model: which situations use toast, snackbar, banner, inline alert, row-local status, field validation, modal confirmation, or undo instead of browser dialogs.
- Spacing model: page gutter, section gap, panel padding, card/list gap, row height, control height, and compact versus touch-first variants.
- Responsive model: desktop layout, tablet collapse, mobile order, toolbar behavior, filter/sidebar handling, table/list fallback, and primary action placement.
- Content model: how long labels, user-generated text, numbers, statuses, and helper text wrap, truncate, clamp, or expand.
- Primitive model: which project wrapper or styled component replaces raw browser dialogs, unstyled native selects, and default-looking native controls.

Do not stop at naming a color palette. A style is considered implemented only when the components have visible state behavior and responsive structure.

For existing projects, start with the current component baselines before inventing new treatments. Inspect sibling pages and shared components for selects/dropdowns, buttons, paginated tables, statistics tables/cards, modals, drawers, filters, forms, pagination, action menus, icons, and feedback states. Reuse those baselines unless the user asks for a redesign or the current pattern blocks usability.

## Page-Type Component Expectations

- Landing pages need a clear primary conversion action, a secondary exploration path, product proof, media with stable dimensions, and feedback for signup/contact/download actions.
- Dashboards need filters, metrics, lists or tables, visible selected state, stale/loading/error states, and a detail or recovery path.
- Admin panels need navigation, tables/forms, bulk actions, permission or destructive states, save feedback, undo or confirmation, and empty/error/loading coverage.
- Mobile screens need touch-friendly controls, explicit content order, safe-area-aware actions, compact filters, and table/list fallbacks.
- Mixed or unknown pages should start from the full style prompt, then narrow to the real page type before implementation.

## Buttons

- Match button shape to the chosen style. Do not use one universal pill or one universal SaaS rectangle across all styles.
- Primary action should be visually stronger than secondary action.
- Secondary actions should stay useful without competing with the main action.
- Disabled buttons need enough contrast to be recognized but should not look clickable.
- Loading buttons should preserve width or use a stable layout so surrounding content does not jump.
- Toggle buttons and selected chips must expose state with `aria-pressed`, `aria-selected`, visible text, or an adjacent selected marker.
- Destructive buttons should not share the exact same visual treatment as the primary happy-path action.
- Existing-project buttons should match nearby action hierarchy, height, icon placement, loading width, disabled contrast, toolbar spacing, and permission-disabled treatment before introducing new variants.

## Selects, Dropdowns, And Menus

- Do not use an unstyled native `<select>` for designed product UI unless it is already the project's intentional, styled convention.
- Prefer the project's Select, Dropdown, Combobox, Cascader, Autocomplete, Menu, or pagination size component before building a new primitive.
- Match existing trigger height, border, radius, placeholder, selected value, clear action, arrow icon, disabled state, and validation treatment.
- Menus need predictable width, option height, focused option, selected option, empty state, and overlay layering.
- Searchable selects should follow the existing project's search, debounce, loading, no-result, and clear behavior.
- Cascaders, multi-selects, and tag selects should preserve chip shape, remove affordance, overflow behavior, and keyboard expectations.
- Existing-project dropdowns should use the project's wrapper component or UI framework abstraction before raw menu markup.
- Custom dropdowns need semantic roles or accessible names, keyboard behavior, click-outside/escape behavior, mobile fallback, and visual states for disabled, loading, selected, focused, empty, and invalid options.

## Forms

- Labels should remain visible after input is filled.
- Placeholder text is not a label.
- Validation messages should appear next to the field and explain the next step.
- The first invalid field should be easy to find after submit.
- Email, URL, phone, number, search, and password fields should use appropriate input types.
- Checkboxes and radios should have a shared hit target with their label.

## Feedback And Alerts

- Do not use `alert(...)`, `confirm(...)`, `prompt(...)`, or their `window.*` forms for product UI.
- Toasts confirm lightweight outcomes such as save, copy, publish, or queue changes.
- Inline alerts belong next to the field, row, card, or panel they affect.
- Banners are for page-level warnings, permission states, environment changes, or outages.
- Destructive decisions should use the project's modal, drawer, inline confirmation, or undo pattern instead of a browser confirmation dialog.
- Copy/export/save failures should use page-level status, toast, inline alert, or retry affordance instead of a prompt.
- Success states should say what changed. Error states should say what failed and what to try next.
- Loading states should preserve the layout footprint and avoid replacing the whole page with a spinner.
- Warning, error, success, and info colors must be readable in the selected light or dark mode and must not rely on color alone.

## Spacing And Density

- Define page gutters, section gaps, panel padding, row gaps, control height, icon spacing, and table/list row height.
- Dense operational pages can be compact, but controls still need readable labels and usable hit targets.
- Touch-first pages need larger controls and spacing without turning every surface into a rounded card wall.
- Repeated components should align to the same rhythm unless the chosen style intentionally breaks rhythm for hierarchy.

## Responsive Component Behavior

- Desktop can show sidebars, inspectors, split panes, large tables, and parallel proof panels when they support the workflow.
- Tablet should collapse secondary panels without hiding the primary content object or current state.
- Mobile should keep the title, current status, primary action, and primary content object reachable before secondary proof.
- Filters can become chips, drawers, segmented controls, or stacked forms; they should not disappear into ambiguous icons.
- Tables need a small-screen strategy: priority columns, stacked rows, cards, horizontal scroll with context, or a detail drawer.
- Toolbars should wrap into stable rows or menus without text overlap or layout jumps.

## Dense Data

- Tables need clear alignment, sticky or repeated context when useful, and readable row states.
- Numeric values should align visually and use tabular numerals when possible.
- Filter bars should expose active filters as visible chips or controls.
- Avoid turning dense operational work into a decorative card wall.
- Paginated tables should match existing filter bar, toolbar, row density, column alignment, selection, batch action, row action, sorter/filter, pagination, page-size, loading, empty, and error patterns.
- Statistics tables and metric panels should match existing number formatting, unit labels, comparison deltas, stale/no-data/loading states, trend markers, and chart/table spacing.

## Overlays

- Modals, drawers, popovers, and menus need visible close affordance, clear layering, and predictable escape behavior.
- Backdrops should support focus and hierarchy without hiding text contrast.
- Destructive flows need project-styled confirmation or undo, not browser confirm dialogs.
- Existing-project modals and drawers should match title bar, body padding, footer button order, close affordance, scroll container, overlay layer, width, mobile fallback, and confirmation language.
- Native `<dialog>` can be used only when styled to the project system and paired with focus handling, backdrop, escape behavior, scroll handling, and mobile behavior.

## Empty, Error, And Loading States

- Empty states should name why the space is empty and what the user can do next.
- Error states should include a repair action, retry action, or contact path.
- Loading states should preserve the layout structure and not collapse the page.
- Success states should confirm what changed, not just show a green color.

## Style Consistency

For every selected visual style, translate these component details into the style language:

- geometry: radius, edge sharpness, border width, and control silhouette
- material: flat, line-based, raised, inset, glass, chrome, pixel, or poster-like
- feedback: hover, focus, selected, pressed, and loading treatment
- density: compact, normal, spacious, or touch-first
- icon logic: stroke, fill, alignment, and accessible labels

If the component system still looks generic after color tokens are applied, change component geometry, state treatment, density, icon rules, or layout placement before adding decorative effects.

Before final approval, run the anti-pattern scan from `ui-primitive-contract.md` on changed UI files when the task touched controls, overlays, forms, or generated HTML.
