# L01 - Dense Admin Dashboard

## Purpose

Use this framework for internal tools, operations consoles, management systems, and dashboards where users repeatedly scan, filter, compare, and act on structured data. It now models a dense operations control room: persistent app shell, top search/action header, exception alert, visible filters, KPI scan, revenue chart, priority table, action queue, workload heatmap, system status, and decision brief.

## Structure

- Persistent dark app shell with sidebar navigation and user/account context.
- Page header with title, global search, export action, and primary creation action.
- Exception alert directly under the header so urgent work is visible before filters.
- Filter/search row close to the data it controls.
- KPI row for high-level status and fast scanning.
- Main content split into chart, priority table, and action queue.
- Secondary panels for workload, system status, decision brief, tasks, or recent activity.

## Required States

- Loading state for metrics, charts, tables, and queues.
- Empty state with clear next action.
- Error state that preserves filters and retry path.
- Selected row state and bulk action state.
- Exception/escalation state for SLA breaches or risk alerts.
- Permission-limited state for hidden actions.

## Responsive Behavior

- Collapse sidebar to rail or drawer on smaller screens.
- Keep filters reachable above the data.
- Stack KPI cards before tables.
- Convert the chart/table/queue tri-column into a vertical decision flow on mobile.
- Move detail panels and decision briefs into drawers on mobile.

## Works Well With Visual Styles

R Carbon Enterprise, W Lightning CRM, Y Ant Pro, Q Fluent Cloud, T Atlassian Workbench.

## Avoid

- Oversized hero sections.
- Decorative cards that reduce scanning speed.
- Sparse dashboards that leave the lower half empty.
- Hiding primary filters behind too many clicks.
- Separating action queues from the table/chart context they support.
