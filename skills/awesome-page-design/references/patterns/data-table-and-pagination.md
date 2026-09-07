# Data Table And Pagination Pattern

## When To Use

Read this reference for data tables, result lists with table semantics, filter/search toolbars, sorting, row selection, batch actions, row menus, pagination, and page-size controls.

## Resolution Order

Reuse the project's shared table/page wrapper first, then its installed table library through established adapters, then a semantic scoped table for simple static data. Introduce virtualization, server-driven state, or another table engine only when data volume and product requirements justify it.

## Required States

- Initial loading, refresh loading, populated, no data, no filter results, recoverable error, permission-limited, and stale data when relevant.
- Filters, active-filter summary, reset/apply behavior, sorting direction, selected rows, select-all scope, batch actions, and row actions.
- Column labels, alignment, widths, wrapping/truncation, sticky regions, density, status cells, numeric/unit formatting, and long values.
- Current page, total items, page count, previous/next, direct page access when useful, page size, and behavior when filtering or deleting changes the current page.
- Clear distinction between all rows on the page and all matching rows across pages for bulk selection.

## Accessibility And Keyboard

- Use semantic table structure for tabular relationships; provide a caption or accessible name when context is not already clear.
- Expose sortable headers as buttons with current sort state. Do not make the entire header cell an unlabeled click target.
- Label row-selection checkboxes with the row identity and announce selected count near batch actions.
- Keep row actions, pagination, page-size selection, and retry controls keyboard reachable with visible focus.
- Do not encode state only by color; preserve reading order when columns collapse or convert to cards.

## Existing Project Integration

- Inspect sibling list pages for query-state ownership, URL synchronization, filter form layout, table wrapper props, row keys, pagination placement, and loading/empty/error slots.
- Reuse project number/date formatting, status badges, action menus, permission checks, selection rules, and density tokens.
- Follow the existing server/client pagination contract; do not silently change index bases, page-size defaults, or reset behavior.
- If a legacy table lacks an essential accessible state, add the narrowest shared wrapper improvement that keeps existing callers stable.

## Mobile Behavior

- Choose deliberately among horizontal scrolling with a sticky identifier column, priority-column reduction, stacked row details, or a card/list alternative.
- Preserve the primary object identity, status, and main action. Do not shrink a desktop table until labels and controls become unreadable.
- Keep filters in normal flow or an established drawer/sheet, show active filters outside the closed overlay, and keep reset/apply reachable.
- Use compact pagination or load-more only when it preserves position, total/context, keyboard access, and recovery from errors.

## Verification

- Test loading, populated, empty dataset, empty filtered result, error/retry, permission, and longest-cell states.
- Test every sort direction, filter reset/apply, row action, selection scope, batch action, and delete-last-row page correction.
- Test first, middle, and last pages plus page-size changes and invalid/out-of-range query state.
- Verify semantic headers, sort state, selection labels/count, focus order, and keyboard operation.
- Check desktop and mobile for clipped controls, hidden primary data, unstable column widths, and pagination overflow.
