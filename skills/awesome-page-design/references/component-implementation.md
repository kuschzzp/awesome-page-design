# Component Implementation

Use this to turn the selected or existing design language into stateful controls. Apply only states that the component actually supports; a static panel does not need an invented interaction.

## Ownership Of Detailed Contracts

This file owns buttons, forms, tabs, cards, metrics, shared geometry, density, and content behavior. Read only the focused contract for other component families:

| Component family | Behavior and verification owner |
|---|---|
| Select, dropdown, autocomplete, combobox, cascader | [select-and-combobox.md](patterns/select-and-combobox.md) |
| Modal, drawer, popover, destructive confirmation | [modal-drawer-and-confirmation.md](patterns/modal-drawer-and-confirmation.md) |
| Toast, banner, inline alert, outcome and recovery feedback | [toast-alert-and-feedback.md](patterns/toast-alert-and-feedback.md) |
| Table, sorting, filtering, row selection, batch actions, pagination | [data-table-and-pagination.md](patterns/data-table-and-pagination.md) |

Primitive acceptance and anti-pattern scanning belong to [ui-primitive-contract.md](ui-primitive-contract.md); project reuse belongs to [existing-project-integration.md](existing-project-integration.md).

## Common Component Anatomy

Map semantic tokens to height, padding, radius, border, material, typography, icon placement, and action hierarchy. Define page gutters, section gaps, panel padding, row/control height, and compact versus touch-friendly variants using the current project scale where available.

Style identity should appear in geometry, material, state treatment, density, and placement, not only color. Poster, terminal, editorial, tactile, glass, pixel, and precision directions need distinct control language. If the result looks generic, improve those decisions before adding effects.

Define how long labels, user-generated text, units, numbers, and helper text wrap, truncate, clamp, or expand. State changes should preserve the component's layout footprint.

## Buttons And Links

- Distinguish primary, secondary, quiet, and destructive actions; do not give destructive and happy-path actions identical emphasis.
- Cover default, hover, focus-visible, pressed, disabled, and loading when relevant. Preserve button width during loading and make disabled state recognizable without implying clickability.
- Expose toggled/selected state using semantics appropriate to the control, such as `aria-pressed` or `aria-selected`, with a visible marker.
- Give links current/active or visited treatment only where meaningful. Action labels should describe the result, such as `Export CSV` or `Save Draft`.
- Preserve project permission-disabled conventions when those states exist.

## Forms

- Keep labels visible after fields are filled; placeholders are hints, not labels.
- Cover empty, focused, filled, invalid, disabled, and read-only states as supported; connect helper/error text to the field.
- Place validation near the field, explain recovery, and make the first invalid field easy to find after submit.
- Use appropriate email, URL, phone, number, search, and password input types. Checkbox/radio labels should share a hit target with the control.

## Tabs, Filters, And Cards

- Tabs and segmented controls need selected, focus-visible, hover, and disabled states when supported, with consistent keyboard semantics.
- Filters should expose active/removable values and empty results; use saved-view or URL state when the product expects it.
- Cards can be static, clickable, selected, expanded, disabled, or warning-bearing according to their actual job. Keep nested cards only for real contained objects, not decorative framing.

## Metrics And Product States

- Metrics/charts need loading, no-data, stale, warning, selected-series, and comparison treatment where relevant.
- Align numeric values and use consistent number formatting, units, comparison deltas, tabular numerals, and trend markers. Do not communicate change through color alone.
- Empty states distinguish first use, filtered empty, permission denial, and failure; offer the relevant next action.
- Loading preserves structure; errors expose repair/retry; success names what changed. For delivery scope and announcements use the focused feedback contract.

## Responsive Component Choices

Preserve the primary object, current state, and main action when panels collapse. Toolbars need stable wrapping or menus; filters need a visible mobile entry; dense tables use their focused contract's small-screen strategy. Touch-friendly spacing should not turn every surface into a card wall.

Check supported states with short and longest realistic content. Verify the changed interactions through the finish flow in [workflow.md](workflow.md), including focused-contract checks for any family used above.
