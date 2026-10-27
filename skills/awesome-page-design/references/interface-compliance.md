# Interface Compliance

Use for real UI implementation and code/screenshot audits. Apply checks to the requested surface, without expanding the assignment. Primitive-specific acceptance and scan rules are owned by [ui-primitive-contract.md](ui-primitive-contract.md); detailed component states belong to [component-implementation.md](component-implementation.md) and its focused references.

## Review Priorities

Classify findings by their actual impact:

- **P0:** blocks a core workflow, accessible operation, or usable responsive layout.
- **P1:** weakens common-path clarity, recovery, performance, or trust.
- **P2:** visual consistency or polish issue.

Lead with findings. Use source `file:line` when available, otherwise the affected page region. Give a concrete fix when it is not obvious; do not require style selection during a pure compliance audit.

## Semantics And Accessible Operation

- Actions use buttons, navigation uses links, and fields have labels and meaningful names. Icon-only controls have accessible names.
- Keyboard-reachable controls have visible focus. Focus order, overlay behavior, and announcements follow the applicable component contract.
- Important state is understandable beyond color or hover. Required actions remain discoverable.
- Motion respects reduced-motion preferences, does not block input, and animates explicit properties; use [motion-guidance.md](motion-guidance.md) for motion work.
- Mobile zoom remains available. Touch targets and spacing support reliable input.

## Responsive Layout, Text, And Media

- Small screens preserve the primary object, current state, main action, and intentional reading order; desktop-only grids do not simply shrink.
- Long text, labels, cells, and user content have an intentional wrap/truncation/expansion strategy without overlap or clipped required content.
- Layout-affecting images/charts/media have stable dimensions or aspect ratio. Above-fold media loads predictably; decorative media does not delay the core workflow.
- Sticky controls, safe areas, software keyboards, and overlays do not cover necessary content or actions.
- Dark themes preserve native-control and scrollbar legibility. Decorative effects preserve contrast and state visibility.

## State And Recovery

Verify only the relevant states from the component owner, including keyboard use, loading/empty/error recovery, destructive decisions, and longest realistic content. Do not add arbitrary states to satisfy a blanket matrix.

Use visible selected/expanded/filter/pagination state; preserve URL state where sharing, refresh, or back navigation is part of the product. Use locale-aware dates, times, numbers, and currency for product data. Large lists and tables should retain responsive input and readable density.

For a new site/app or shell audit, use [new-project-shell.md](new-project-shell.md) as the sole metadata/favicon checklist. Existing local patches do not imply unrelated shell changes.

## Verification And Reporting

Run the targeted primitive scan from [ui-primitive-contract.md](ui-primitive-contract.md), then inspect matches in context. Focused contracts own interaction tests; [quality-checklist.md](quality-checklist.md) owns visual judgment. Re-check changed regions after fixes and follow [workflow.md](workflow.md) to report completed checks, intentional exceptions, and unverified behavior.
