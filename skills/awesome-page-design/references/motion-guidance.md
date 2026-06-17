# Motion Guidance

Use this reference when the selected style or product flow needs animation. Motion should communicate continuity, cause, and state change. It should not exist only to make the page feel busy.

## Motion Principles

- Add motion only when it explains what changed, where the user moved, or which object stayed the same.
- Prefer short, interruptible transitions that do not block input.
- Use `transform` and `opacity` first. Avoid animating layout-heavy properties unless there is a clear need.
- Never use `transition: all`; list exact properties.
- Respect `prefers-reduced-motion` with a reduced or disabled variant.
- Keep operational tools calmer than campaigns, portfolios, or expressive launch pages.

## Motion Intensity

Use the `motion intensity` design dial from `design-dials.md`.

- `None`: keep motion limited to focus, pressed, and immediate state feedback.
- `Subtle`: use hover lift, fade, selected-state movement, loading shimmer, or disclosure transitions.
- `Expressive`: use staged reveals, shared-object continuity, spatial transitions, or kinetic accents when the brand can support it.

## Semantic Motion Patterns

- Object continuity: the same item expands, moves to detail view, or remains selected.
- Disclosure: a menu, drawer, accordion, or inspector opens from the control that caused it.
- Data arrival: skeleton or placeholder resolves into loaded content.
- List identity: reordered items move without losing their identity.
- Progress: upload, render, export, or approval state advances visibly.
- Error recovery: failed state directs attention to the repair action.

## Avoid

- Constant background drifting that competes with content.
- Delayed controls that make the interface feel slow.
- Directional motion for unordered tabs or unrelated sections.
- Motion on small body text, dense tables, form validation, or critical alerts that harms legibility.
- Sparkle, parallax, glow, or glass animation used to compensate for weak hierarchy.

## Implementation Checklist

- Define what each animation communicates.
- List the animated properties.
- Provide a reduced-motion behavior.
- Keep focus and keyboard behavior independent of animation.
- Check that layout does not jump at the start or end of the transition.
- Verify mobile performance and touch responsiveness.
