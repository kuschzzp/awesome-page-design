# L14 - Master Detail Admin Table

Use this layout for evidence libraries, resource management, research repositories, approvals, and database-like back-office screens where a selected record needs rich context.

## Structure

- Top action bar with import/export, view sharing, and primary create action.
- Left rail for saved views, visible fields, filters, and status groups.
- Central table as the primary work area, supported by search, grouping, column controls, and record summary metrics.
- Related-record cards below the table for artifacts, automations, linked evidence, or dependent tasks.
- Right detail inspector for the selected record with editable fields, related records, comments, and revision history.

## Required States

- Selected row and detail panel must stay synchronized.
- Keep search, filters, grouping, column controls, and bulk edit visible near the table.
- Include empty result, loading, stale-record, permission-denied, and field-hidden states.
- Support horizontal overflow only when the table truly needs it.
- Comments and related records should stay close to the selected record so users do not lose context.

## Avoid

- Hiding primary actions inside row menus.
- Making filters visually compete with the table.
- Turning this into another generic admin dashboard; the value is the selected-record workspace.
- Copying sample columns directly into unrelated products.
