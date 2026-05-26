# L06 - Ecommerce Admin Console

## Purpose

Use this framework for merchant tools, order management, inventory systems, product catalogs, and fulfillment workflows.

## Structure

- App shell with store/account context and primary order actions.
- Saved views, filters, and bulk actions in the left rail.
- Order analytics strip for volume, item count, returns, and fulfillment speed.
- Search/filter/sort/column toolbar above the resource table.
- Fulfillment lanes for paid, packed, shipped, and returns states.
- Order table with channel, inventory, fulfillment chip, and total.
- Detail drawer for selected order, customer context, fulfillment progress, notes, and staff actions.
- Inventory alerts, fulfillment timeline, and operational notes below the table.

## Required States

- Bulk selection.
- Saved filter view.
- Empty resource list.
- Sync/import progress.
- Destructive action confirmation.
- Selected order drawer state.
- Inventory risk or hold state.

## Responsive Behavior

- Resource list remains primary.
- Detail drawer becomes full-screen route on mobile.
- Bulk actions compress into action menu.

## Works Well With Visual Styles

S Polaris Commerce, Y Ant Pro, W Lightning CRM, Q Fluent Cloud.

## Avoid

- Marketing page composition.
- Status labels without clear meaning.
- Large empty panels that do not support order work.
- Actions far away from selected resources.
