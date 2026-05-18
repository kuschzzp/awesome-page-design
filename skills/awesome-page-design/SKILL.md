---
name: awesome-page-design
description: Use this skill when designing or implementing websites, web apps, dashboards, landing pages, admin panels, product pages, or UI components that need a distinct visual style. It provides reusable visual style prompts, color systems, typography, borders, radius, shadows, texture, motion, and component tone references. Use it when the user asks to choose, apply, imitate, or vary page styles, especially when they want to avoid generic or identical-looking websites. This skill is not a fixed layout template library.
---

# Awesome Page Design

Use this skill to choose and apply a visual style direction for web UI work.

## Core Rule

This is a visual style prompt library, not a page layout template library. Do not copy the sample HTML layout as the target product layout. Reuse the style language: colors, type, border, radius, shadow, texture, motion, states, icon tone, spacing rhythm, and component personality. Design the actual page structure around the user's product, content priority, workflows, and device needs.

## Workflow

1. Read `references/usage-principles.md` before applying a style.
2. Read `references/style-index.md` to choose candidate styles.
3. If the user names a version or style, read that file in `references/styles/`.
4. If the user does not name a style, recommend 2-3 candidates based on:
   - product type: marketing, SaaS, admin, developer tool, editorial, commerce, portfolio
   - mood: serious, playful, premium, technical, warm, official, experimental
   - density: sparse editorial, normal product UI, dense operations UI
   - light or dark preference
5. Implement the UI using the chosen style's visual language, while creating a layout that fits the actual task.
6. For exact visual comparison, use the PNG and HTML examples in `assets/styles/<style-folder>/`.

## Reference Navigation

- `references/style-index.md`: concise index of all A-Y styles.
- `references/usage-principles.md`: rules for using the library correctly.
- `references/styles/*.md`: full style manuals copied from the project.
- `assets/styles/`: full HTML, markdown, and PNG preview assets.
- `assets/previews/index.html`: preview gallery.

## When Applying A Style

Extract only what is relevant to the current project:

- Color tokens and semantic color roles.
- Font family, font weights, type scale, and text density.
- Border, radius, shadow, glow, and surface treatment.
- Button, tag, card, input, table, navigation, and empty-state personality.
- Hover, focus, selected, disabled, loading, and alert states.
- Motion timing and texture rules.

Avoid treating sample layout details as requirements. If a style manual mentions a layout, read it as an example observation, not as an instruction to reproduce that structure.

## Output Expectations

When explaining a style choice to the user, keep it practical:

- Name the selected style and why it fits.
- Mention the main colors, typography, surfaces, and interaction tone.
- State that layout will be adapted to the actual product need.

When coding, translate the selected style into concrete CSS variables, component classes, or framework theme tokens.
