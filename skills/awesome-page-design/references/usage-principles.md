# Usage Principles

## Purpose

Awesome Page Design is a visual style prompt library for website and web app design. It helps agents and developers avoid generic-looking pages by selecting a strong visual language before implementation.

## Non-Negotiable Rule

Do not treat the sample HTML files as fixed layout templates.

The reusable parts are:

- color system
- typography
- radius
- borders
- shadows and glow
- surface texture
- component tone
- interaction states
- animation timing
- visual density

The non-reusable parts are:

- exact page layout
- information architecture
- module order
- grid strategy
- sample content structure
- navigation model

Those must be redesigned for the user's real product and workflow.

## Preview Selection Gate

When the user describes a UI request without naming a visual style or layout framework, the agent should not jump straight into final implementation. First turn the request into a short selection brief, then open or provide the preview gallery so the user can choose.

The selection brief should cover:

- product type
- page type or primary workflow
- mood
- information density
- light or dark preference when known

For complete pages or app screens, confirm both:

- one visual style prompt
- one layout framework prompt

The user may also delegate the choice to the agent. In that case, recommend a small shortlist, explain why the options differ, apply the similarity guardrails from the style and layout indexes, and ask for confirmation before final implementation.

If local previews cannot be opened, use `style-index.md` and `layout-index.md` as the text fallback for selection.

## Selection Heuristics

Use restrained system-like styles for enterprise tools, admin systems, data-heavy apps, and operational dashboards.

Use editorial, Swiss, or classic styles for content-heavy websites where reading hierarchy matters.

Use expressive styles such as Brutalism, Y2K, Cute-alism, Aurora, Scribble, or Terminal only when the brand, audience, or product context can support a strong visual personality.

Use public design-system-inspired styles when the user wants familiar, production-safe UI direction.

## Implementation Guidance

Start by creating tokens: background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.

Then map tokens onto real components. Adjust component layout to the product's needs instead of copying sample sections.

Keep accessibility intact. If a style uses low contrast, glow, texture, or decorative motion, preserve readability and focus visibility first.

## User-Facing Explanation

When presenting a style decision, say which visual rules are being reused and which layout decisions are being newly designed for the actual product.
