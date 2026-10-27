# Visual Quality Review

Use for visual audits and final composition review. This file owns visual judgment; code/accessibility checks are in [interface-compliance.md](interface-compliance.md), component behavior is in [component-implementation.md](component-implementation.md), and finishing is in [workflow.md](workflow.md).

## Product And Hierarchy

- The first viewport communicates a specific workflow, primary content object, and main action rather than a generic slogan.
- The layout fits the page job: operations foreground data/actions, creation tools foreground the workspace, and editorial pages preserve reading order/evidence.
- Important information has deliberate hierarchy. Equal cards represent equal choices; unrelated urgency or ownership does not disappear into identical boxes.
- Density, gutters, alignment, and section rhythm support scanning or reading. Expressive composition still has stable orientation.

## Visual Direction

- Typography, geometry, material, component tone, and states express the selected direction; the result is not a palette swap or repeated skeleton.
- Headings, body, labels, metadata, and numbers have distinct roles. Long headings fit compact regions without awkward wrapping.
- Semantic colors and surfaces remain legible; glow, glass, texture, chrome, and depth do not hide content or state.
- Media explains the actual product or object. Icon family, stroke/fill, size, and alignment form one system.
- Copy, metrics, and actions are specific enough to judge a real workflow, without placeholder brand references or unrelated decorative captions.

Use [anti-generic-ui.md](anti-generic-ui.md) when composition feels generic, rather than applying more decoration.

## Existing And Local Work

Compare the changed area with its chosen production baseline: typography, density, action hierarchy, spacing, geometry, and state treatment should still belong to the product. Check target and neighbors together for local changes using [local-ui-patch.md](local-ui-patch.md); do not reinterpret a visual check as permission to restyle the whole page.

## Responsive Composition

Review desktop and mobile hierarchy with realistic long content. The primary object, state, and action must remain reachable; navigation, secondary panels, and proof should collapse intentionally rather than squeeze the desktop grid. Record missing visual evidence instead of claiming screenshots were checked.

## Recording Visual Evidence

Review these five dimensions together: product task/action clarity; hierarchy/readability/density; consistency with the selected direction or existing product; real-content/responsive composition; and visible states/detail finish. Support each finding with the actual viewport and state inspected. Source inspection cannot establish rendered quality, and a single idle screenshot cannot establish error or pending-state finish.

For a requested scored comparison, use the same scenes and evidence for every option. A useful 0–4 scale is: 0 unusable, 1 major defects, 2 usable with visible defects, 3 coherent and complete, 4 clear under realistic long content and constrained viewports. Leave missing dimensions unverified rather than assigning zero or inventing precision. Record broken actions, keyboard traps and other critical functional defects separately from visual scores. Ordinary delivery does not require numerical scoring.

## Maintaining This Library

When this repository's own previews/prompts change, check that styles remain distinguishable by structure, component tone, material, and scenario; prompts adapt to product layout; gallery actions offer full/landing/dashboard/admin/mobile variants; and refreshed docs, previews, and screenshots correspond. Use the regeneration and validation flow in [workflow.md](workflow.md).
