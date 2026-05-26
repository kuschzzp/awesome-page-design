# L07 - CRM Sales Workspace

## Purpose

Use this framework for CRM, sales, customer support, account management, and pipeline workflows.

## Structure

- CRM side navigation for sales workbench, customers, opportunities, visits, briefs, and contracts.
- Sales KPIs for pipeline value, key accounts, win rate, and follow-up workload.
- Funnel chart and daily task circle for manager-level scanning.
- Pipeline kanban as the primary deal navigation object.
- Detail panel for selected customer or deal with customer 360 fields.
- Activity timeline with notes, visits, approvals, and next communication.
- Collection plan, sales ranking, and customer health panels.
- Related records such as contacts, contracts, receivables, and tickets.

## Required States

- Selected account/deal state.
- Stage change state.
- Task completed state.
- Empty timeline state.
- Conflict or stale data warning.
- Collection risk and renewal reminder states.

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
- Using a generic western dashboard when the target is a China CRM system.
