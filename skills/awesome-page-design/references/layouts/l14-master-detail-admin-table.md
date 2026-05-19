# L14 - Master Detail Admin Table

Use this layout for resource management, user administration, approvals, and database-like back-office screens.

## Structure

- Top action bar with search, import/export, and primary create action.
- Left rail for saved views, filters, and status groups.
- Central table or list as the primary work area.
- Right detail inspector for the selected record.

## Required States

- Selected row and detail panel must stay synchronized.
- Include bulk action, empty result, loading, and permission-denied states.
- Support horizontal overflow only when the table truly needs it.

## Avoid

- Hiding primary actions inside row menus.
- Making filters visually compete with the table.
- Copying sample columns directly into unrelated products.
