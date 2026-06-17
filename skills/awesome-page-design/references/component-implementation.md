# Component Implementation

Use this reference when translating a selected style into real components. A page should not only style the default state. Every component that can change state needs a visible, style-consistent state model.

## Component State Matrix

Define the relevant states before final polish:

| Component | Required States |
|---|---|
| Buttons | default, hover, focus-visible, pressed, loading, disabled, destructive when relevant |
| Links | default, hover, focus-visible, visited only when useful, active/current |
| Inputs | empty, focused, filled, invalid, disabled, read-only, helper text, error text |
| Selects and menus | closed, open, focused option, selected option, disabled option |
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
- Feedback model: which situations use toast, snackbar, banner, inline alert, row-local status, field validation, modal confirmation, or undo.
- Spacing model: page gutter, section gap, panel padding, card/list gap, row height, control height, and compact versus touch-first variants.
- Responsive model: desktop layout, tablet collapse, mobile order, toolbar behavior, filter/sidebar handling, table/list fallback, and primary action placement.
- Content model: how long labels, user-generated text, numbers, statuses, and helper text wrap, truncate, clamp, or expand.

Do not stop at naming a color palette. A style is considered implemented only when the components have visible state behavior and responsive structure.

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

## Forms

- Labels should remain visible after input is filled.
- Placeholder text is not a label.
- Validation messages should appear next to the field and explain the next step.
- The first invalid field should be easy to find after submit.
- Email, URL, phone, number, search, and password fields should use appropriate input types.
- Checkboxes and radios should have a shared hit target with their label.

## Feedback And Alerts

- Toasts confirm lightweight outcomes such as save, copy, publish, or queue changes.
- Inline alerts belong next to the field, row, card, or panel they affect.
- Banners are for page-level warnings, permission states, environment changes, or outages.
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

## Overlays

- Modals, drawers, popovers, and menus need visible close affordance, clear layering, and predictable escape behavior.
- Backdrops should support focus and hierarchy without hiding text contrast.
- Destructive flows need confirmation or undo.

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
