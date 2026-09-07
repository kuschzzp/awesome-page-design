# Toast, Alert, And Feedback Pattern

## When To Use

Read this reference for save, copy, export, submit, delete, publish, sync, queue, validation, permission, outage, loading, retry, and undo feedback.

## Resolution Order

Choose feedback by the scope and recovery path:

| Scope | Preferred pattern |
|---|---|
| Field or form problem | Inline validation near the cause, plus a summary when several errors exist |
| Row, card, or panel problem | Inline alert or local status in that region |
| Lightweight completed outcome | Toast/snackbar or persistent status when the result must remain visible |
| Page-wide risk, permission, environment, or outage | Banner or page-level alert |
| Decision that blocks progress | Project modal/drawer or inline confirmation |
| Reversible destructive outcome | Immediate action plus undo when reversal is reliable |

Do not use browser dialogs as feedback.

## Required States

- Idle, pending, success, warning, recoverable error, terminal error, and retry or undo when meaningful.
- Specific outcome text that names what changed; avoid generic messages such as "Success" without context.
- Duplicate-event policy, timeout/persistence rules, queue or stack behavior, dismissal, and action state.
- Loading feedback that does not masquerade as completion and error feedback that preserves the user's input.

## Accessibility And Keyboard

- Use polite live announcements for routine outcomes and assertive announcements only for urgent blockers.
- Do not move focus to routine toasts. Move or guide focus to the first actionable error when submission cannot continue.
- Keep interactive toast/banner actions keyboard reachable for long enough to use; pause dismissal while hovered or focused when auto-dismiss exists.
- Pair color and iconography with explicit text. Announce updated inline states without repeating the entire page.
- Dismiss buttons need accessible names and visible focus styles.

## Existing Project Integration

- Reuse the project's toast provider, alert/banner components, form error system, status vocabulary, icons, duration, placement, and action patterns.
- Inspect how sibling flows report copy/save/delete failures and whether undo is actually supported by the data layer.
- Add a local inline state when a global toast would separate the message from its cause.
- Do not install another notification system for one feature.

## Mobile Behavior

- Keep transient feedback clear of browser controls, safe areas, sticky navigation, keyboards, and primary actions.
- Allow messages and actions to wrap without shrinking text or covering content.
- Prefer inline or persistent feedback for errors that require reading or recovery; do not hide critical guidance behind a short timeout.
- Keep stacked messages bounded and avoid filling the first viewport with repeated notifications.

## Verification

- Trigger every pending, success, warning, error, retry, and undo path supported by the feature.
- Confirm the feedback appears at the scope where the user can understand and recover from it.
- Check live-region behavior, keyboard access, timeout behavior, long localized copy, duplicate events, and mobile safe areas.
- Confirm failure paths preserve input and explain the next action.
- Scan changed UI for `alert`, `confirm`, and `prompt`; document only non-product debugging exceptions.
