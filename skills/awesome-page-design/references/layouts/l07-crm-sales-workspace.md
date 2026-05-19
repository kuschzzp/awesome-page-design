# L07 - CRM Sales Workspace

## Purpose

Use this framework for CRM, sales, customer support, account management, and pipeline workflows.

## Structure

- Pipeline or account list as the primary navigation object.
- Filters for owner, stage, account type, date, and priority.
- Detail panel for selected customer or deal.
- Activity timeline with notes, calls, emails, and tasks.
- Next-best-action area.
- Related records such as contacts, contracts, and tickets.

## Required States

- Selected account/deal state.
- Stage change state.
- Task completed state.
- Empty timeline state.
- Conflict or stale data warning.

## Responsive Behavior

- Pipeline/list first, detail second.
- Detail panel becomes drawer or route.
- Keep next action prominent.

## Works Well With Visual Styles

W Lightning CRM, T Atlassian Workbench, S Polaris Commerce, Y Ant Pro.

## Avoid

- Hiding activity history.
- Making every card equally important.
- Treating customer data like a generic table only.
