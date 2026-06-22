# Local UI Patch

Use this reference when the user asks to improve, restyle, repair, or polish part of an existing page instead of creating a new page or changing the whole visual direction.

Local UI patch work should feel like a senior designer-developer joining an existing product: understand the current system, improve the target area, and avoid surprising changes elsewhere.

## When To Use

Use this mode for requests such as:

- Improve this table toolbar.
- Make this modal look better.
- Polish this button group.
- Fix the mobile layout in this section.
- Make this card area less generic.
- Improve a sidebar, filter bar, form block, empty state, toast, drawer, tabs, or action row.

Do not force the preview selection gate for a local patch unless the user explicitly asks for a new visual style or the existing page has no usable visual direction.

## Required Context Scan

Before editing, inspect the current implementation and answer these questions:

- Target region: what exact component, section, or interaction is being changed?
- Neighbor regions: what sits directly above, below, beside, or inside the target region?
- Current visual system: what colors, typography, spacing, radius, borders, shadows, icons, density, and interaction states already exist?
- Current component system: are there reusable components, tokens, utilities, variants, or framework patterns that should be reused?
- Current state model: which hover, focus, selected, disabled, loading, empty, error, warning, and success states already exist?
- Current responsive behavior: how does the target region behave on desktop, tablet, and mobile?
- Patch scope: what is the smallest change that solves the user's stated problem without weakening nearby UI?

If the answers show that the issue is caused by page-level information architecture, navigation, action placement, or layout hierarchy, escalate to page redesign instead of forcing a local cosmetic fix.

## Preserve Existing System

Local patches should extend the existing page language before introducing a new one.

- Reuse existing design tokens, CSS variables, Tailwind theme values, component props, utility conventions, icon family, and spacing rhythm.
- Keep typography roles compatible with the surrounding page: headings, labels, metadata, helper text, row text, and numeric values should not suddenly change voice.
- Match existing density unless the user explicitly asks for a denser or more spacious target region.
- Keep action hierarchy consistent with nearby primary, secondary, destructive, and quiet actions.
- Keep focus, hover, selected, disabled, loading, validation, and toast treatments related to the existing product states.
- Prefer local class extensions or component variants over broad global CSS changes.

Do not add a new button style, card language, shadow system, radius scale, icon style, or color personality that makes the target region look imported from another product.

## Patch Boundary Rules

Define the change boundary before editing:

- Primary boundary: the smallest file, component, slot, class, or section that contains the requested change.
- Neighbor boundary: adjacent regions that may need spacing, alignment, or responsive adjustments because the target region changed.
- Shared boundary: reusable component or token updates that are justified only when the same issue appears in multiple places.

For local patches:

- Do not rewrite the whole page layout.
- Do not replace working navigation, routing, data flow, or component APIs unless the user's request requires it.
- Do not rename or restructure unrelated components to make the patch easier.
- Do not introduce new dependencies for simple visual repair.
- Do not turn an operational page into a marketing layout.
- Do not change unrelated copy, data labels, or feature behavior.
- Do not mask weak hierarchy with extra glow, blur, gradients, or decoration.

If a shared component must change, confirm that the new variant still works for existing uses or scope the new treatment to the current context.

## Component And State Rules

Every local patch should improve the actual component behavior, not only the default screenshot.

- Buttons: preserve width during loading, expose disabled and focus-visible states, and keep primary/secondary/destructive hierarchy clear.
- Forms: keep labels visible, place validation near the field, and avoid using placeholder text as the only label.
- Tables and lists: preserve scanning, row alignment, selected state, empty state, loading row, and truncated content strategy.
- Filters and tabs: expose active state visibly and keep removable filters or saved views understandable.
- Modals and drawers: preserve close affordance, layering, scroll behavior, and expected focus handling.
- Toasts and alerts: choose the right level for the issue and include what changed plus the next useful action.
- Cards and panels: make each local object purposeful; avoid adding nested cards unless the nested object is real content.
- Icon-only controls: provide accessible names or visible adjacent labels.

When the current page lacks required states, add only the states relevant to the target region and keep their treatment aligned with the surrounding UI.

## Responsive And Neighbor Checks

After a local patch, verify the target region and nearby regions together.

Check desktop:

- The target region aligns with surrounding grids, gutters, and panel edges.
- New controls do not crowd labels, tabs, filters, or action rows.
- Long copy, user-generated content, metrics, and button labels wrap, truncate, or clamp intentionally.
- Hover, focus, selected, loading, and disabled states do not resize the layout.

Check mobile:

- The target region has a clear reading order.
- Primary action remains reachable and is not hidden behind ambiguous icons.
- Toolbars wrap into stable rows or menus without overlap.
- Tables have a small-screen strategy: priority columns, stacked rows, cards, horizontal scroll with context, or detail drawer.
- Touch targets and gaps remain usable.
- Safe areas, sticky actions, drawers, and modals do not cover required content.

If a screenshot reveals that the patch breaks neighbor rhythm, repair the neighbor relationship rather than widening the patch into a full redesign.

## Escalation To Page Redesign

Escalate from local patch to page redesign when:

- The target problem repeats across the whole page because the information architecture is weak.
- Primary content object, main action, and current state are not visible anywhere useful.
- Navigation, filters, sidebars, inspectors, or tables collapse badly across the whole layout.
- The page uses multiple conflicting visual systems and a local patch would add another one.
- The requested component depends on missing page-level state, routing, or data hierarchy.
- The user explicitly asks for a new visual direction or complete redesign.

When escalating, explain the reason briefly and move to the normal page-level workflow: design brief, layout archetype, style selection or delegated style choice, then implementation.

## Final Verification

Before final approval for a local patch:

- Re-open the changed file regions and confirm the patch stayed within scope.
- Check target and neighbor regions on desktop and mobile.
- Check semantic controls, accessible labels, focus-visible, reduced motion, stable dimensions, and content overflow.
- Check relevant default, hover, focus, selected, disabled, loading, error, warning, success, and empty states.
- Confirm the target region still belongs to the existing page visually.
- Mention if no screenshot could be taken, and state the remaining risk.

## Output Expectations

When reporting a local patch, include:

- The target region changed.
- The existing visual system that was preserved.
- The component states or responsive behavior improved.
- Any neighbor regions checked or adjusted.
- Any escalation risk if the page needs broader redesign later.
- Verification run, including screenshots when UI changed.
