# L11 - Onboarding Wizard

## Purpose

Use this framework for setup flows, imports, account activation, product tours, and multi-step configuration.

## Structure

- Step indicator with current, complete, and upcoming states.
- Focused step content.
- Inline validation and help text.
- Preview or summary panel when choices affect output.
- Back, continue, skip, and finish actions.
- Completion state with next action.

## Required States

- Step validation error.
- Saving/progress state.
- Optional skipped state.
- Import or async processing state.
- Completion and retry state.

## Responsive Behavior

- Keep one primary task per screen.
- Move summary below form on mobile.
- Preserve progress visibility.

## Works Well With Visual Styles

P Material You, K Claymorphism, Q Fluent Cloud, D Bento Grid.

## Avoid

- Too many fields per step.
- Ambiguous skip behavior.
- Progress indicators that do not match real completion.
