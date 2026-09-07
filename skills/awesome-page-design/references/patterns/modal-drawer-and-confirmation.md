# Modal, Drawer, And Confirmation Pattern

## When To Use

Read this reference for modals, dialogs, drawers, sheets, destructive confirmations, blocking decisions, and overlays that move focus or prevent interaction with the page behind them.

## Resolution Order

First decide whether inline editing, undo, or a non-blocking confirmation is safer than an overlay. When an overlay is justified, use the existing project wrapper, then the installed framework primitive, then a scoped styled `<dialog>` or accessible overlay implementation. Never substitute browser `alert`, `confirm`, or `prompt`.

## Required States

- Closed, opening, open, submitting, success/close, recoverable error, disabled action, and closing states.
- Clear title, visible close affordance, body, primary/secondary action hierarchy, destructive labeling, and scrollable overflow.
- Backdrop, overlay layer, nested-overlay policy, unsaved-change handling, and async action protection.
- For destructive work, name the affected object and consequence; require typed confirmation only when risk warrants the added friction.

## Accessibility And Keyboard

- Move focus to the most useful safe target on open, not automatically to a destructive action.
- Contain focus while modal, support Escape unless the action cannot safely be dismissed, and restore focus to the invoking control on close.
- Provide an accessible name and description, semantic dialog state, and announced validation or submission errors.
- Keep a visible close control even when backdrop click or Escape is supported.
- Backdrop clicks may dismiss only when accidental dismissal cannot lose work; destructive confirmations should not confirm or disappear from a stray backdrop click.

## Existing Project Integration

- Reuse project overlay roots, focus helpers, scroll-lock behavior, header/footer anatomy, width variants, z-index scale, and action ordering.
- Compare at least one form modal and one confirmation flow when available.
- Preserve established button language and destructive color semantics while repairing missing focus or Escape behavior.
- Avoid introducing a second modal manager or portal root for a local feature.

## Mobile Behavior

- Follow the product's existing modal, bottom-sheet, side-drawer, or full-screen fallback based on task length and input complexity.
- Keep title and close action visible, body independently scrollable, and footer actions reachable above safe-area and software-keyboard insets.
- Stack actions only when width requires it; keep the primary/destructive hierarchy unambiguous.
- Prevent background scroll and avoid body content jumping when the overlay opens.

## Verification

- Test open, initial focus, Tab/Shift+Tab containment, Escape, visible close, submit error, retry, and focus return.
- Test backdrop behavior, long content, short viewport, software keyboard, and nested overlay cases allowed by the product.
- Confirm background content is inert or otherwise unavailable while modal.
- Confirm no browser dialog primitive remains and no destructive action can fire twice during loading.
- Verify desktop and mobile scroll behavior without hidden actions or content overlap.
