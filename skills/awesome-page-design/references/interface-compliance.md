# Interface Compliance

Use this reference whenever the skill reviews, polishes, or implements real UI code. Visual style is not complete until the interface is usable, accessible, responsive, primitive-aware, and state-aware.

Read `ui-primitive-contract.md` with this file whenever the code touches dialogs, confirmations, selects/dropdowns, forms, overlays, feedback, or generated HTML.

## Review Priority

Report issues by severity when auditing code or screenshots.

- `P0`: Blocks usability, accessibility, responsive layout, or core workflow completion.
- `P1`: Weakens clarity, state handling, performance, or trust in common user paths.
- `P2`: Polish issue that makes the interface feel less professional or less consistent.

When file and line numbers are available, use this output shape:

```text
## path/to/file.ext
path/to/file.ext:42 - P0 icon-only button needs an accessible label
path/to/file.ext:67 - P1 transition: all -> list exact animated properties
```

When reviewing screenshots or generated HTML without stable source lines, group findings by region:

```text
## Dashboard header
P0 primary action has no visible focus state.
P1 filter state is not reflected in URL or visible selection chips.
```

## P0 Checks

- Interactive controls use semantic elements: `button` for actions, links for navigation, labels for form controls.
- Icon-only controls have an accessible name or a visible adjacent label.
- Focus is visible on every keyboard-reachable action, form control, tab, menu item, and card action.
- Text does not overlap, clip, disappear behind effects, or require viewport-scaled fonts to fit.
- Mobile preserves the primary content object, current state, and main action without forcing desktop-only grids.
- Forms have labels, meaningful names, useful input types, inline errors, and a clear recovery path.
- Required actions are not hidden behind ambiguous icons or decorative controls.
- Images that affect layout have explicit dimensions or stable aspect-ratio rules.
- Motion respects reduced-motion preferences and does not block input.
- Destructive actions have confirmation, undo, or a clear recoverable path.
- Product UI does not use browser dialog primitives for alerts, confirmations, prompts, copy fallback, or destructive decisions.
- Primary actions, loading buttons, disabled buttons, selected controls, and validation states are visible without depending on hover-only behavior.
- Mobile defines a real content order for title, state, primary action, filters, main content, and secondary panels.

## P1 Checks

- Hover, focus, active, selected, disabled, loading, empty, warning, success, and error states are visually related to the chosen style.
- Buttons and links use specific action labels such as `Save Draft`, `Export CSV`, or `Review Run`, not vague labels such as `Continue` when the action is not obvious.
- Button geometry, padding, radius, border, fill, icon placement, and label length match the selected style instead of a universal default.
- Feedback uses the right level for the problem: toast for small confirmations, inline alert for local problems, banner for page-level risk, and modal/undo for destructive decisions.
- Selects, dropdowns, comboboxes, and pagination size controls use the project's styled primitive or a scoped styled component rather than an unstyled native browser select.
- New static sites and apps include a product-specific title, description metadata, and a wired `favicon.ico`. Framework projects may use their favicon route when it produces the browser-tab icon. SVG favicons can supplement the `.ico`, not silently replace it.
- Spacing is tokenized enough to explain page gutters, section gaps, panel padding, row gaps, control height, and compact versus touch-friendly density.
- Large lists, tables, and queues avoid unnecessary layout thrash and have a readable dense treatment.
- Filters, tabs, pagination, expanded panels, and selected objects expose state visibly; use URL state when the product expects sharing, refresh, or back navigation.
- Critical above-fold media loads predictably; decorative or below-fold media does not delay the primary workflow.
- Empty states explain what happened and the next useful action.
- Error states include the problem and a repair path.
- Dark interfaces set native control colors intentionally and preserve scrollbar/input legibility.
- Dates, times, numbers, and currencies use locale-aware formatting when the UI is product-facing.
- Long user-generated content uses wrapping, truncation, line clamp, or overflow strategy without breaking layout.

## P2 Checks

- Number columns, comparison values, clocks, and metrics use tabular numerals when available.
- Headings avoid awkward widows through sensible max width and balanced wrapping.
- Touch targets are large enough for mobile and have enough spacing to avoid dead zones.
- Tap highlight, overscroll, and safe-area behavior feel intentional on mobile.
- Decorative texture, glow, blur, chrome, or depth never hides important state.
- Native checkbox, radio, and file controls match the selected visual direction when used, or are wrapped by the existing project component.
- Browser tab branding does not show a default framework icon, generic blank icon, starter project title, or placeholder product name.
- Loading copy uses a consistent style and does not shift surrounding layout.

## Anti-Patterns To Flag

- `alert(...)`, `confirm(...)`, `prompt(...)`, `window.alert(...)`, `window.confirm(...)`, or `window.prompt(...)` in product UI.
- Unstyled native `<select>` used as a designed dropdown, filter, page-size control, prompt picker, or status selector.
- `outline: none` or `outline-none` without a replacement focus style.
- `transition: all`.
- Click handlers on non-interactive `div` or `span` elements.
- Unlabeled icon buttons.
- Images without stable dimensions.
- Loading states that change button width or collapse surrounding layout.
- Mobile layouts that simply squeeze a desktop grid without reordering filters, sidebars, tables, or primary actions.
- Toasts or alerts that only change color and do not explain what happened.
- Disabled zoom on mobile.
- Form controls without labels.
- Hardcoded date, number, or currency display in product UI.
- Missing `favicon.ico` in a newly built static site or app, or relying only on `favicon.svg` where no framework favicon route produces the browser-tab icon.
- Default Vite, React, Next.js, framework, or starter-template favicon left in a finished new project.
- Decorative effects used to hide weak hierarchy, missing states, or poor layout.

## UI Primitive Scan

For changed UI files, generated HTML, or preview assets, run:

```bash
rg -n "alert\\(|confirm\\(|prompt\\(|window\\.alert|window\\.confirm|window\\.prompt|<select\\b|outline\\s*:\\s*none|outline-none|transition\\s*:\\s*all" <changed-ui-files>
```

Treat matches as P0 when they block a core workflow, destructive flow, accessibility, or form completion. Treat them as P1 when they make a common product path feel browser-default or inconsistent. Only downgrade when the project already has a deliberate, styled native-control convention and the exception is documented.

## Audit Behavior

- Lead with findings, not praise.
- Be terse and concrete.
- Include a suggested correction only when the fix is not obvious.
- Do not ask the user to choose a visual style during a pure compliance audit unless visual direction is the blocker.
- When the primitive scan finds browser dialogs or native selects, recommend the exact project primitive or replacement pattern.
- If implementing fixes, re-check the changed regions against this file before finishing.
