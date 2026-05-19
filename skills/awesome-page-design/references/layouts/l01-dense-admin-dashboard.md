# L01 - Dense Admin Dashboard

## Purpose

Use this framework for internal tools, operations consoles, management systems, and dashboards where users repeatedly scan, filter, compare, and act on structured data.

## Structure

- Persistent app shell with sidebar or top navigation.
- Page header with title, scope switcher, and primary action.
- Filter/search row close to the data it controls.
- KPI row for high-level status.
- Main content split between table/list, charts, and detail panels.
- Secondary panels for alerts, tasks, or recent activity.

## Required States

- Loading state for metrics and tables.
- Empty state with clear next action.
- Error state that preserves filters and retry path.
- Selected row state and bulk action state.
- Permission-limited state for hidden actions.

## Responsive Behavior

- Collapse sidebar to rail or drawer on smaller screens.
- Keep filters reachable above the data.
- Stack KPI cards before tables.
- Move detail panels into drawers on mobile.

## Works Well With Visual Styles

R Carbon Enterprise, W Lightning CRM, Y Ant Pro, Q Fluent Cloud, T Atlassian Workbench.

## Avoid

- Oversized hero sections.
- Decorative cards that reduce scanning speed.
- Hiding primary filters behind too many clicks.
