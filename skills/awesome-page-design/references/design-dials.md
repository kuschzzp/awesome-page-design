# Design Dials

Use these dials after a layout archetype and visual style are selected. They keep one direction flexible without letting the result become vague or generic.

Layout variance is not the same as layout archetype. Choose the archetype from the user's page job first, then use layout variance to decide how familiar or expressive that archetype should feel.

## Layout Variance

Choose how much the page structure should depart from a familiar product layout.

- `Low`: Keep common navigation, section order, and grid patterns inside the chosen archetype. Use for enterprise tools, admin panels, and pages where speed of understanding matters more than novelty.
- `Medium`: Keep the core workflow familiar, but vary section rhythm, card scale, media placement, and hierarchy inside the chosen archetype. This is the default for most websites and app screens.
- `High`: Use asymmetric composition, editorial pacing, expressive type scale, or immersive first view while preserving the chosen archetype's required actions and orientation. Use only when the brand, campaign, or portfolio can support a stronger point of view.

## Motion Intensity

Choose how active the interface should feel.

- `None`: Static except for required focus and state changes. Use for dense operations, documentation, government-like flows, and sensitive workflows.
- `Subtle`: Small hover, selected, loading, and disclosure transitions. This is the default.
- `Expressive`: Larger transitions, kinetic surfaces, staged reveals, or animated accent elements. Use for launches, creative tools, and playful brands.

## Visual Density

Choose how much information appears in the first usable viewport.

- `Sparse`: Strong hero, few objects, generous breathing room. Use for premium pages, portfolios, and focused launches.
- `Normal`: Balanced content, proof, actions, and a supporting visual. This is the default.
- `Dense`: Tables, filters, status chips, charts, split panes, or operational queues visible early. Use for dashboards, admin panels, CRM workspaces, and analytics tools.

## How To Apply

When the user has not specified these dials, infer them from the product:

- Public landing page: `Medium` layout variance, `Subtle` motion, `Normal` density.
- Operational dashboard: `Low` layout variance, `None` or `Subtle` motion, `Dense` density.
- Creative campaign: `High` layout variance, `Expressive` motion, `Sparse` or `Normal` density.
- Documentation or developer tool: `Low` to `Medium` layout variance, `Subtle` motion, `Normal` or `Dense` density.

Report the selected dials briefly when explaining the design direction.
