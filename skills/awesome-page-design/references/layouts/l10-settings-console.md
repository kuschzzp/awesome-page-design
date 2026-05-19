# L10 - Settings Console

## Purpose

Use this framework for account settings, admin configuration, security controls, integrations, billing, and permission management.

## Structure

- Settings navigation grouped by domain.
- Page title and concise description.
- Form sections with clear save/cancel behavior.
- Permission, role, or integration panels.
- Audit log or recent changes when relevant.
- Danger zone for destructive actions.

## Required States

- Unsaved changes.
- Validation errors.
- Disabled permissions.
- Connected/disconnected integration.
- Destructive confirmation.

## Responsive Behavior

- Collapse settings nav into select or drawer.
- Keep save actions visible near edited content.
- Stack form columns.

## Works Well With Visual Styles

Q Fluent Cloud, Y Ant Pro, R Carbon Enterprise, U Gov Service, X Primer Dev.

## Avoid

- Hiding destructive actions without clear path.
- Mixing unrelated settings in one page.
- Saving without visible feedback.
