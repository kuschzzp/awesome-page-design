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
- shadows, glow, and material treatment
- surface texture
- image direction
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

When the user describes a UI request without naming a visual style, the agent should not jump straight into final implementation. First turn the request into a short selection brief, then open or provide the preview gallery so the user can choose.

The selection brief should cover:

- product type
- page type or primary workflow
- mood
- information density
- light, dark, or mixed preference when known
- whether images or illustration are useful

The user may also delegate the choice to the agent. In that case, recommend a small shortlist, explain why the options differ, apply the similarity guardrails from the style index, and ask for confirmation before final implementation unless the user explicitly says to proceed.

If local previews cannot be opened, use `style-index.md` as the text fallback for selection.

## Selection Heuristics

Use Style 09 Tech Minimal, Style 11 Structured Lines, Style 12 Material Design, or Style 18 Linear Futurism for serious product work where clarity matters.

Use Style 10 Dark Theme, Style 15 Liquid Glass, Style 18 Linear Futurism, or Style 21 Acid Design for dark, immersive, technical, or experimental products, but keep their differences clear.

Use Style 13 Bento Layout when the page benefits from modular card zones and widget-like chunks. It is a visual composition style, not a required page framework.

Use Style 02 Block Brutalism, Style 04 Retro Y2K, Style 16 Retro Computing, Style 17 Neo-Brutalism, Style 19 Gradient Pop, Style 20 Soft Pop, or Style 21 Acid Design when the brand, audience, or campaign can carry a strong visual personality.

Use Style 14 Neumorphism only when a soft tactile interface fits the product and accessibility remains strong.

## Image Guidance

When a website design needs images, prefer real product screenshots, customer images, brand photography, or carefully matched neutral media. When screenshotting generated previews, wait 5 seconds so remote images and fonts can load.

## Implementation Guidance

Start by creating tokens: background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.

Then map tokens onto real components. Adjust component layout to the product's needs instead of copying sample sections.

Keep accessibility intact. If a style uses low contrast, glow, glass, chrome, texture, or decorative motion, preserve readability and focus visibility first.

## User-Facing Explanation

When presenting a style decision, say which visual rules are being reused and which layout decisions are being newly designed for the actual product.
