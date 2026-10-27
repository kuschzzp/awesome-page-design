---
name: awesome-page-design
description: >-
  Design or improve web pages and UI components: choose visual direction, adapt a
  layout to the product, integrate features into existing frontend projects,
  polish a local region, or review interface quality. Use for page design, layout,
  colors, UI refinement, and implementation reviews; preserve the project's
  design system for existing-project work.
---

# Awesome Page Design

Use the library as visual direction and a UI workflow. Design around the user's product rather than copying a bundled preview.

## Decision Order

Resolve conflicts in this order: **user scope and product requirements → usability, accessibility, and semantics → project components and tokens → nearest compatible production pattern → visual style → bundled examples**. Repair inaccessible legacy behavior with the smallest compatible change; an old pattern does not override accessibility.

## Start With The Task

Read [workflow.md](references/workflow.md) for execution and finishing. Choose the main task route below; add the real UI implementation row whenever that route changes UI code. Load no unrelated references:

| Task | Minimum references |
|---|---|
| New page or explicit page redesign | [layout-guidance.md](references/layout-guidance.md), [usage-principles.md](references/usage-principles.md), [style-index.md](references/style-index.md); after selection, [design-dials.md](references/design-dials.md) and only the chosen style manual |
| Feature or UI change in an existing project | [existing-project-integration.md](references/existing-project-integration.md) |
| Targeted region or local UI patch | [local-ui-patch.md](references/local-ui-patch.md); add integration guidance when reusable project components are involved |
| Component polish | [component-implementation.md](references/component-implementation.md) |
| Visual audit | [quality-checklist.md](references/quality-checklist.md); add [anti-generic-ui.md](references/anti-generic-ui.md) for generic composition |
| Implementation audit or real UI implementation | [interface-compliance.md](references/interface-compliance.md) and [ui-primitive-contract.md](references/ui-primitive-contract.md) |
| Reusable project design guide | [design-system-output.md](references/design-system-output.md) |

For new sites/apps, also read [new-project-shell.md](references/new-project-shell.md) for metadata, favicon, and starter-brand cleanup. Existing pages and local patches use their current direction by default; do not send them through style selection unless the task requires a visual reset.

## Conditional References

When implementing stateful components, read [component-implementation.md](references/component-implementation.md), then only the relevant focused contract:

- Select/dropdown/combobox: [select-and-combobox.md](references/patterns/select-and-combobox.md).
- Modal/drawer/confirmation: [modal-drawer-and-confirmation.md](references/patterns/modal-drawer-and-confirmation.md).
- Toast/alert/outcome feedback: [toast-alert-and-feedback.md](references/patterns/toast-alert-and-feedback.md).
- Table/sorting/selection/pagination: [data-table-and-pagination.md](references/patterns/data-table-and-pagination.md).

Add [motion-guidance.md](references/motion-guidance.md) when motion is used, [icon-guidance.md](references/icon-guidance.md) when icons are involved, and [variant-guidance.md](references/variant-guidance.md) for a requested adjacent mood. Do not load every style or component reference.
