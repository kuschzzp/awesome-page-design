# UI Primitive Contract

Use this reference before implementing or reviewing real UI code, generated HTML, forms, overlays, feedback, selects/dropdowns, menus, tables, or page actions.

The goal is simple: product UI should feel intentionally designed. Browser-default dialogs and unstyled native controls are acceptable for throwaway debugging, but they are not acceptable as finished interface behavior.

## Hard Bans For Product UI

Flag and replace these by default:

- Browser dialog primitives: `alert(...)`, `confirm(...)`, `prompt(...)`, `window.alert(...)`, `window.confirm(...)`, and `window.prompt(...)`.
- Unstyled native `<select>` used as a designed dropdown, filter, page-size chooser, prompt picker, status selector, or form select.
- Unstyled native file, checkbox, or radio controls when the surrounding product uses styled wrappers or custom state treatment.
- Browser-default destructive confirmation flows that skip the project's modal, drawer, inline confirmation, or undo pattern.
- Copy, export, save, delete, submit, publish, or queue feedback that only appears through a browser dialog.
- `outline: none`, `outline-none`, or `transition: all` on finished interactive UI. Use explicit focus-visible rings and list animated properties instead.

## Replacement Matrix

| Need | Use Instead |
|---|---|
| Lightweight success or copy feedback | Existing toast/snackbar/status component with `aria-live` |
| Field or form error | Inline validation near the field plus summary when needed |
| Page-level warning or permission issue | Banner or inline alert in the affected page region |
| Destructive action | Project modal/drawer confirmation, inline confirmation, or undo pattern |
| Basic dropdown/select | Existing project Select/Dropdown/Combobox wrapper or styled framework component |
| Searchable or async select | Existing searchable select/cascader/autocomplete pattern with loading and empty states |
| Page size or table filter select | Existing pagination/filter component, styled segmented control, or dropdown menu |
| Copy fallback when clipboard API fails | Hidden textarea + `execCommand("copy")` fallback, then page-level status/toast |
| Modal or drawer | Existing overlay component with focus handling, close affordance, scroll behavior, and mobile fallback |

## Existing Project Resolution Order

When working inside an existing codebase, choose primitives in this order:

1. Reuse the nearest existing shared component or product wrapper.
2. Reuse the project's UI framework component through the project's established wrapper or prop conventions.
3. Add a narrow variant to the existing component family when the state or hierarchy is missing.
4. Build a scoped styled primitive only when the project has no reusable pattern.

Do not introduce a new UI library, icon family, modal manager, dropdown engine, or table component for a local feature unless the user approves or the project already uses it.

## Select And Dropdown Requirements

A select/dropdown is complete only when these states are covered:

- closed, open, hover, focus-visible, selected option, focused option, disabled option, empty options, loading, validation error, clear action when relevant, and long value overflow
- trigger height, border, radius, placeholder, arrow icon, selected text, menu width, option height, overlay layer, keyboard behavior, and mobile fallback

Native `<select>` is allowed only when it is already the project's deliberate styled convention, the browser control is visually integrated, and the exception is called out in the final response. Otherwise, use or build a styled select/dropdown.

## Feedback And Overlay Requirements

- Toasts/snackbars confirm lightweight outcomes and should name what changed.
- Inline alerts belong next to the field, row, card, or panel they affect.
- Banners handle page-level risk, permission, environment, or outage messages.
- Destructive confirmations need a project modal/drawer, inline confirmation, or undo. Do not use browser confirm dialogs.
- Modal, drawer, popover, and menu interactions need visible close behavior, layering, focus expectation, escape behavior, and scroll handling.
- `<dialog>` is allowed only when styled to the project system and paired with focus, backdrop, escape, and mobile behavior.

## Anti-Pattern Scan

For real UI changes, generated HTML, or preview assets, run a targeted scan before finishing:

```bash
rg -n "alert\\(|confirm\\(|prompt\\(|window\\.alert|window\\.confirm|window\\.prompt|<select\\b|outline\\s*:\\s*none|outline-none|transition\\s*:\\s*all" <changed-ui-files>
```

Default response to a hit:

1. Replace browser dialogs with toast, inline alert, banner, modal, drawer, undo, or page-level status.
2. Replace unstyled native selects with the project select/dropdown/combobox pattern.
3. Replace `outline: none` with a visible focus-visible ring, or remove it when it only hides focus.
4. Replace `transition: all` with exact animated properties.
5. If a rare exception is intentional, document why it is acceptable and how it stays visually integrated.

## Final Response Expectations

When relevant, mention:

- which project primitive or wrapper replaced browser defaults
- how select/dropdown, feedback, and overlay states were handled
- whether the anti-pattern scan was run, including focus/motion hits, and whether any exception remains
