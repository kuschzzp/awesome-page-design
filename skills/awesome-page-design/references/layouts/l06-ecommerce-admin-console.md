# L06 - Ecommerce Admin Console

## Purpose

Use this framework for merchant tools, order management, inventory systems, product catalogs, and fulfillment workflows.

## Structure

- App shell with store/account context.
- Resource list with filters, saved views, and bulk actions.
- Status chips for order, inventory, payment, or fulfillment state.
- Detail drawer or detail page for selected resource.
- Activity timeline and notes.
- Primary operational actions near the resource context.

## Required States

- Bulk selection.
- Saved filter view.
- Empty resource list.
- Sync/import progress.
- Destructive action confirmation.

## Responsive Behavior

- Resource list remains primary.
- Detail drawer becomes full-screen route on mobile.
- Bulk actions compress into action menu.

## Works Well With Visual Styles

S Polaris Commerce, Y Ant Pro, W Lightning CRM, Q Fluent Cloud.

## Avoid

- Marketing page composition.
- Status labels without clear meaning.
- Actions far away from selected resources.
