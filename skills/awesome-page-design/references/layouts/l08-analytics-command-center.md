# L08 - Analytics Command Center

## Purpose

Use this framework for analytics, monitoring, finance dashboards, product metrics, and operational intelligence.

## Structure

- Global variable/filter bar with date range, segment, scope, and comparison controls.
- KPI strip for summary signals with change indicators.
- Main chart panel tied to a specific question.
- Secondary panels for top segment, heatmap, and anomaly drill-down.
- Event stream for live operational changes.
- Annotation, correlation notes, notebook, and sharing controls.
- Drill-down table or raw-record area when the product requires auditability.

## Required States

- Loading skeleton for charts.
- No-data state after filters.
- Comparison mode.
- Drill-down selected state.
- Data freshness indicator.
- Event-stream state for new data arrivals.
- Shared dashboard or notebook state.

## Responsive Behavior

- Keep filters at top.
- Stack charts by priority.
- Move table below summary on small screens.

## Works Well With Visual Styles

R Carbon Enterprise, Q Fluent Cloud, Y Ant Pro, G Aurora Gradient, J Terminal Hacker.

## Avoid

- Decorative charts without clear questions.
- Single oversized chart with thin supporting context.
- Too many colors without semantic meaning.
- Metrics that cannot be traced to detail.
