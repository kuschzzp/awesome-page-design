# L11 - Onboarding Wizard

## Purpose

Use this framework for setup flows, imports, account activation, product tours, and multi-step configuration.

## Structure

- Setup header with save-and-exit or resume action.
- Step indicator with current, complete, and upcoming states.
- Focused step content with source cards or setup choices.
- Field grid for required configuration.
- Inline validation, readiness checks, and help text.
- Sticky preview or summary panel when choices affect output.
- Back, continue, skip, and finish actions.
- Completion state with next action.

## Required States

- Step validation error.
- Saving/progress state.
- Optional skipped state.
- Import or async processing state.
- Completion and retry state.
- Readiness checklist state.
- Preview state that updates from user choices.

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
- A generic form that does not show how setup choices affect launch.
