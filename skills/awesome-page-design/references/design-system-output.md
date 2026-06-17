# Design System Output

Use this reference when the user asks for a reusable project design guide or when a selected style needs to be applied across multiple pages.

## Purpose

Create a project-level `DESIGN.md` that translates the selected visual style into durable implementation rules. The guide should describe what to build, not where the idea came from.

## Required Structure

```markdown
# Design System

## Direction
[Selected Style, product context, design dials, and intended mood.]

## Tokens
[Background, surface, text, muted text, primary, accent, border, focus, radius, shadow, and state colors.]

## Typography
[Font stack, heading scale, body density, labels, metadata, numeric values, and line height rules.]

## Layout
[Page gutters, section rhythm, grid behavior, density, mobile collapse, and composition rules.]

## Responsive Behavior
[Desktop, tablet, and mobile order for primary content, filters, sidebars, inspectors, tables, media, toolbars, and primary actions.]

## Components
[Buttons, inputs, tabs, cards, tables, filters, modals, drawers, alerts, empty states, loading states, and disabled states.]

## Buttons And Feedback
[Primary, secondary, destructive, disabled, loading, selected/toggled, success, warning, error, toast, banner, inline alert, validation, and undo behavior.]

## Component States
[State matrix for buttons, links, inputs, tabs, filters, cards, tables, overlays, empty states, loading states, error states, selected states, disabled states, warning states, and success states.]

## Icons And Media
[Icon style, sizing, stroke/fill rules, image direction, screenshot/mockup treatment, and decorative limits.]

## Motion And States
[Motion intensity, semantic animation patterns, reduced-motion behavior, hover, focus, pressed, selected, loading, success, warning, error, disabled, and transition timing.]

## Implementation Compliance
[Accessibility, semantic controls, focus-visible rules, form labeling, responsive text handling, stable media dimensions, URL/state expectations, empty/error/loading recovery, and audit output expectations.]

## Do
[Specific behaviors to repeat.]

## Do Not
[Specific behaviors to avoid.]
```

## Writing Rules

- Keep the guide project-specific.
- Do not include external references, source links, or inspiration labels.
- Do not describe the bundled preview as a template.
- Use implementation-ready language: tokens, component states, spacing, density, and responsive behavior.
- Include button anatomy, feedback patterns, spacing rhythm, and responsive component behavior when the guide will drive implementation.
- Include component state, motion, accessibility, and implementation compliance rules when the guide will be used for real UI code.
- Keep examples concrete enough that a future page can follow them without reopening the preview gallery.
