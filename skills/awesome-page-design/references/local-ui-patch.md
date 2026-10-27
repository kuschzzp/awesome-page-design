# Local UI Patch

Use for a targeted region of an existing page: a toolbar, modal, form, table area, sidebar, filter, card group, or action row. Retain the surrounding visual direction; selection and finish behavior are in [workflow.md](workflow.md).

## Set The Boundary Before Editing

Inspect the latest target implementation and the regions directly above, below, beside, or inside it. Identify:

- **Target:** the smallest component, slot, class, or section that solves the requested problem.
- **Neighbors:** regions whose alignment, spacing, wrapping, layering, or responsive behavior could change.
- **Shared surface:** a component or token used elsewhere; modify it only when the fix belongs at that level, otherwise add a local variant.

Record the relevant current tokens, typography, density, icon family, action hierarchy, component states, and responsive behavior. Use [existing-project-integration.md](existing-project-integration.md) when tracing shared project patterns; do not inventory unrelated component families.

## Keep The Repair Local

Prefer a scoped class or compatible component variant. Preserve working navigation, routing, data flow, unrelated copy/labels, and component APIs. Do not add a competing button language, radius/shadow scale, icon family, or decoration to conceal weak hierarchy.

When a shared component changes, inspect its affected call sites and ensure the new behavior is compatible or opt-in. Use [component-implementation.md](component-implementation.md) and only the focused contract for the actual target; do not create a second local-patch state checklist.

If the problem originates in page-wide information architecture, action placement, navigation, or responsive collapse, explain why the local fix is insufficient. Keep broader redesign as a proposed scope change unless the user already requested it.

## Check The Boundary After Editing

Review the diff for scope, then verify target and neighbors together at desktop and mobile sizes within the user's testing permissions. Check alignment with surrounding edges, toolbar wrapping, overlay/sticky overlap, reading order, and primary-action reachability. For a responsive bug, include the reported width and a narrower stress width, checking horizontal overflow and text fit; prefer stable flow/constraints over hiding required content. A neighbor spacing repair should not silently expand into a whole-page restyle.

Apply the common implementation/primitive checks through [workflow.md](workflow.md). Report the target, necessary neighbor adjustments, preserved project pattern, verification evidence, and any broader issue left outside scope.
