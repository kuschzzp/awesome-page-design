# UI Primitive Contract

Use before implementing or reviewing finished product controls, feedback, overlays, generated HTML, or page actions. This reference owns primitive acceptance and the anti-pattern scan; detailed behavior belongs to the focused pattern contracts.

## Acceptance Rules

- Replace browser `alert(...)`, `confirm(...)`, `prompt(...)`, and their `window.*` forms in product flows with integrated feedback, confirmation, or recovery UI. Throwaway debugging is outside this product-UI rule.
- Do not ship an unstyled native `<select>` as a designed dropdown. Resolve simple versus complex selection through the [selection contract](patterns/select-and-combobox.md); preserve native keyboard behavior when a deliberately styled native select fits.
- Native file, checkbox, and radio controls should follow the surrounding product's intentional style/wrapper convention.
- Preserve visible focus. An outline reset is acceptable only with an explicit accessible focus-visible replacement; a scan match alone is not proof of a defect.
- Animate specific properties rather than `transition: all`.

Use [existing-project-integration.md](existing-project-integration.md) to find the product wrapper before creating a replacement. Do not introduce a new component engine for a local feature when the current system can support it.

## Choose The Appropriate Primitive

| Need | Preferred product pattern |
|---|---|
| Lightweight save/copy outcome | Toast/snackbar/status with suitable announcement |
| Field or form error | Inline validation; summary when useful |
| Page warning, permission issue, outage | Banner/alert in the affected region |
| Destructive decision | Project confirmation, inline confirmation, or undo |
| Simple selection | Existing wrapper; otherwise deliberately styled native select |
| Searchable/async/complex selection | Existing accessible select/combobox/autocomplete |
| Page size or table filter | Existing pagination/filter/select primitive |
| Clipboard failure | Compatible copy fallback where available; otherwise recoverable page-level status, never a browser prompt |
| Overlay | Existing styled modal/drawer/popover with appropriate focus and close behavior |

Read only the matching contract: [selection](patterns/select-and-combobox.md), [overlays/confirmation](patterns/modal-drawer-and-confirmation.md), [feedback](patterns/toast-alert-and-feedback.md), or [tables/pagination](patterns/data-table-and-pagination.md). A styled native `<dialog>` is acceptable when its focus, backdrop, escape, scrolling, and mobile behavior satisfy the overlay contract.

## Targeted Scan

Scan changed UI files before finishing:

```bash
rg -n '(^|[^[:alnum:]_])(alert|confirm|prompt)[[:space:]]*\(|<select\b|outline[[:space:]]*:[[:space:]]*none|outline-none|transition[[:space:]]*:[[:space:]]*all' <changed-ui-files>
```

Treat results as candidates, not automatic failures. Inspect whether a call is a browser dialog or unrelated function, whether a select is deliberately styled/simple, and whether an outline reset has a visible replacement. Replace actual product-UI violations with the matching pattern. Record scan scope/results and explain any intentional exception in the final verification report; report manually inspected scope when the scan cannot run.
