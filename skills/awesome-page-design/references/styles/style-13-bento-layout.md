# Style 13 - Bento Layout (便当盒布局)

## Summary

Widget-like card zones, modular composition, and clearly chunked information.

Chinese summary: 小组件式卡片分区、模块化排布、信息清晰分块。

## Best For

restaurant menus, creator profiles, modular product overviews

## Example Scenario

- Product sample: Supper Blocks
- Page job: Seasonal tasting menu
- Headline: Build a dinner story from market crates, chef notes, and table timing.
- Primary action: Book table
- Secondary action: See market list

## Scenario Components

- Food blocks: Large and small tiles follow actual service meaning: hero course, producer note, quote, timing, and booking.
- Market texture: Ingredient blocks carry the visual energy instead of decorative shapes.
- Uneven but useful: The grid changes size by content value, not randomly.

## Example States

- Tomato course: Lead
- Bread pickup: 11AM
- Window table: Open

## Layout Pattern

- Pattern: Bento Market Table (便当市集餐桌)
- Archetype: Bento Market Table
- Structure: Irregular food-service bento with hero course, producer notes, market run, table status, chef quote, and booking block.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use compact tile labels, warm menu headings, and clear local hierarchy in each block.
- Components: Course tiles, market crates, table chips, chef notes, and service timing blocks should vary by content value.
- Buttons: Use embedded tile actions and one confident reservation control.
- Icons and media: Use ingredient blocks, menu notes, market labels, and service timing as the visual language.
- States: Show lead course, open table, market pickup, sold out, prepping, and saved states.
- Avoid: Do not make every bento tile the same size.

## Visual Language

- Background: `#f4f4f5`
- Surface: `#ffffff`
- Text: `#18181b`
- Muted text: `#71717a`
- Primary: `#18181b`
- Accent: `#f97316`
- Border: `#e4e4e7`
- Radius: `18px`
- Panel radius: `18px`
- Control radius: `10px`
- Chip radius: `8px`
- Media radius: `16px`
- Geometry rule: modular bento curves without making every item identical; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 55px rgba(24, 24, 27, .10)`

## Component Detail System

- Button system: Use compact buttons embedded only where a tile has a job; selected tiles need obvious but not loud treatment.
- Feedback and alerts: Use tile-local badges, progress chips, and empty tile states with next actions.
- Spacing system: Use 16px grid gaps, varied tile padding, and stable aspect ratios for visual rhythm.
- Responsive behavior: Desktop can use varied tile spans; mobile becomes one column while preserving tile order by importance.

Chinese implementation notes:

- 按钮细节：只在有明确任务的模块内嵌紧凑按钮；选中模块要明显但不吵。
- 提示与反馈：使用模块内徽章、进度 chip，以及带下一步的空模块状态。
- 间距系统：网格间距 16px，模块内边距可变化，使用稳定宽高比形成节奏。
- 响应式策略：桌面可使用不同跨度模块；手机变成单列，并按重要性保持模块顺序。

## Page Adaptation Guide

- Landing page: Use uneven tiles where each block has a job: proof, media, quote, stat, timeline, and action.
- Dashboard: Use modular status tiles, varied spans, local actions, and progress badges.
- Admin panel: Use admin only when modules are independent; avoid forcing dense tables into bento tiles.
- Forms, tables, and data: Use forms inside purposeful tiles with local validation and stable tile dimensions.
- Mobile: Collapse to one column while preserving tile order by importance.
- Not a good fit for: Weak for long tables, legal documents, or workflows needing strict linear review.

## Usage Notes

- Use varied card sizes with one consistent grid.
- Each block should have a clear job.
- Avoid turning every block into identical cards.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
