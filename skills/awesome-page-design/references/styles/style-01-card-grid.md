# Style 01 - Card Grid (卡片网格)

## Summary

Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.

Chinese summary: 浅色中性画布、紫色强调、卡片网格节奏、统计数据、搜索和易扫描的总览界面。

## Best For

dashboards, catalogs, overview pages

## Example Scenario

- Product sample: OpsGrid
- Page job: Inventory command center
- Headline: Spot late handoffs before the morning standup.
- Primary action: Review exceptions
- Secondary action: Open route map

## Scenario Components

- Exception lanes: Separate inventory, delivery, and approval issues so operators know where to act first.
- Owner clarity: Every card carries owner, priority, due window, and the next required action.
- Dense scanning: Stats, search, filters, and compact cards work together without becoming a flat grid.

## Example States

- Backroom count drift: High
- West route delayed: 2 stops
- Cold storage check: Ready

## Layout Pattern

- Pattern: Operational Card Board (运营卡片看板)
- Archetype: Operational Card Board
- Structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
- Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
- Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
- Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
- States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
- Avoid: Do not turn it into a generic marketing hero or three equal feature cards.

## Visual Language

- Background: `#f5f6fa`
- Surface: `#ffffff`
- Text: `#1a1a2e`
- Muted text: `#64648a`
- Primary: `#7c3aed`
- Accent: `#8b5cf6`
- Border: `#e5e7ef`
- Radius: `10px`
- Panel radius: `10px`
- Control radius: `6px`
- Chip radius: `4px`
- Media radius: `8px`
- Geometry rule: structured small-radius cards with sharper controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 48px rgba(26, 26, 46, .10)`

## Usage Notes

- Keep cards scannable and varied by job.
- Use search and stats as first-class visual anchors.
- Avoid collapsing the style into a generic admin shell.

## Copy Style Prompt

```text
Use awesome-page-design Style 01 - Card Grid as the page design direction.
Best fit: dashboards, catalogs, overview pages.
Visual mood: Light neutral canvas, violet accent, card grid rhythm, statistics, search, and scannable overview surfaces.
Layout archetype: Operational Card Board.
Layout structure: Operational app shell with a compact toolbar, filter rail, dense metrics, uneven exception board, and right-side action inspector.
Layout adaptation: define the user's real primary content object, top-level regions, main action model, information density, and responsive collapse before styling; preserve the archetype's structural identity without copying the sample page.
Color tokens: background #f5f6fa; surface #ffffff; text #1a1a2e; muted #64648a; primary #7c3aed; accent #8b5cf6; border #e5e7ef; radius 10px; shadow/material 0 18px 48px rgba(26, 26, 46, .10).
Geometry: panel radius 10px; control radius 6px; chip/state radius 4px; media radius 8px. Avoid making every button and card the same large rounded rectangle or pill.
Typography: Use compact sans-serif UI text, strong numerals, small uppercase labels, and short card titles.
Components: Search, toolbar controls, stat tiles, filter chips, status badges, priority cards, inspector queues, and owner rows should feel like one dashboard system.
Buttons: Primary buttons are practical solid controls; secondary actions stay quiet as bordered controls.
Icons and media: Use product screenshots, maps, tables, or workflow evidence instead of abstract hero art.
States: Show selected filters, warning chips, stale items, disabled actions, and focus rings clearly.
Example content direction: you may use the specificity of "OpsGrid / Inventory command center" as inspiration, but replace it with the user's real product, real information architecture, and real copy.
Design dials: set layout variance, motion intensity, and visual density for the actual product; do not reuse the sample page structure by default.
Do not: Do not turn it into a generic marketing hero or three equal feature cards. Do not copy the sample HTML, brand, copy, or layout; do not reduce the style to a color swap; do not generate a generic AI-looking hero plus three cards.
Before finishing: check desktop and mobile screenshots, text fit, and style-consistent buttons, inputs, cards, tables, modals, empty states, error, loading, disabled, focus, hover, selected, and success states.
```

## Design Dials

- Layout variance: choose low, medium, or high based on product risk and brand confidence.
- Motion intensity: choose none, subtle, or expressive based on workflow sensitivity.
- Visual density: choose sparse, normal, or dense based on how much the first viewport must support.

## Implementation Guidance

- Start from tokens for background, surface, text, muted text, primary, accent, border, radius, shadow, and focus.
- Apply the style to the user's actual page structure. Do not copy the bundled sample HTML layout.
- Keep hover, focus, selected, disabled, loading, empty, warning, and success states visually consistent.
- When the page needs images, prefer real product imagery, brand photography, or carefully matched neutral media.
- Keep icon family, stroke, size, and alignment consistent when icons are used.
- Check desktop and mobile screenshots before finishing.

## Do Not

- Do not reuse the sample product name, sample copy, or sample layout as production content.
- Do not reduce the style to a palette swap.
- Do not use decorative effects to hide weak hierarchy, vague copy, missing states, or poor responsive structure.
