# Select And Combobox Pattern

## When To Use

Read this reference when a task touches a select, dropdown, autocomplete, combobox, cascader, filter picker, status chooser, prompt picker, or page-size control.

## Resolution Order

Use this order:

```text
existing wrapper -> installed accessible library component -> styled native select for simple selection -> custom combobox only for complex behavior
```

Simple selection means one value from a short, static option set with no search, async loading, grouping, rich option content, or multi-select behavior. A styled native select is an accessibility-friendly option for that case in a new project, but it must look intentional in every supported browser. Complex behavior should use an installed accessible primitive before custom logic.

## Required States

- Closed, open, hover, focus-visible, selected value, focused option, disabled control, and disabled option.
- Placeholder, clear action when valid, validation error, help text, loading, no results, and failed option loading when applicable.
- Long selected values, long option labels, grouped results, and multi-select overflow when the feature supports them.
- Stable trigger dimensions, menu width, overlay layer, selected marker, and open/close icon state.

## Accessibility And Keyboard

- Use a visible label or an accessible name; connect help and error text with the appropriate description attributes.
- Preserve native keyboard behavior for a native select.
- For a combobox/listbox, implement the chosen library's documented Arrow, Enter, Escape, Home/End, typeahead, active-option, and focus behavior.
- Expose expanded state, ownership, active descendant, selected state, disabled state, and validation state with correct semantics.
- Do not trap focus in a non-modal menu. Return focus to the trigger when an overlay picker closes if focus moved into it.

## Existing Project Integration

- Inspect sibling forms, filters, table page-size controls, validation messages, overlay containers, and z-index conventions.
- Reuse the nearest shared wrapper and its props, slots, option model, form integration, and clear/search conventions.
- If nearby legacy pages use inaccessible or default-looking controls, add the smallest compatible wrapper or variant rather than copying the defect.
- Do not add another select library for one feature without user approval.

## Mobile Behavior

- Keep triggers at least as large as the project's touch target standard and prevent selected text from covering icons.
- Prefer the project's existing sheet, popover, or native mobile selection behavior. Use a full-width sheet for dense search or multi-select flows when the current system supports it.
- Keep the focused option visible above the software keyboard; make loading, empty, clear, cancel, and apply actions reachable.
- Do not let a fixed menu extend beyond the viewport or sit under sticky navigation.

## Verification

- Test keyboard-only open, navigation, selection, clear, close, validation, and focus return.
- Test short, empty, loading, failed, disabled, and longest-value states.
- Test overlay placement near every viewport edge and at mobile width.
- Confirm labels, roles, expanded/selected/disabled state, and error announcements in the accessibility tree.
- Scan changed UI for raw `<select>` use and document any deliberately styled simple-selection exception.
