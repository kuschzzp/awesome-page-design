# Style 24 - Ink Wash (水墨)

## Summary

Paper-white canvas, black ink hierarchy, red seal accents, scroll rhythm, and poetic editorial restraint.

Chinese summary: 宣纸白底、墨色层级、朱红印章强调、卷轴节奏和诗性编辑克制。

## Best For

tea culture, museums, literature, cultural ecommerce, heritage product stories

## Example Scenario

- Product sample: Mist Valley Tea
- Page job: Tea mountain origin scroll
- Headline: Trace one tea lot from foggy ridge to tasting table.
- Primary action: Open tasting scroll
- Secondary action: Browse lots

## Scenario Components

- Scroll pacing: Story, lot ledger, and tasting note unfold vertically like a quiet product record.
- Seal semantics: Red is reserved for chosen lot, provenance proof, and decisive action.
- Cultural restraint: Ink, blank paper, and source notes carry information instead of decoration.

## Example States

- Lot MV-04: Selected
- Roast note: Saved
- Source seal: Ready

## Layout Pattern

- Pattern: Ink Tea Scroll (水墨茶山卷轴)
- Archetype: Ink Tea Scroll
- Structure: Scroll-like tea origin page with ink landscape, lot ledger, tasting notes, provenance seal, and quiet commerce path.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use brush-like moments only for headings or seals; keep body copy disciplined and readable.
- Components: Origin notes, tea lots, tasting rows, seal states, and source strips should feel archival.
- Buttons: Primary actions can read like a seal; secondary actions should be text or rule-line controls.
- Icons and media: Use paper, mist, ink fields, tea lot rows, red seals, and tasting notes.
- States: Show selected lot, saved note, source seal, archived, warning, and tasting open states.
- Avoid: Do not use decorative cultural symbols without structure.

## Visual Language

- Background: `#f8f5ef`
- Surface: `#fffdf7`
- Text: `#1f1f1c`
- Muted text: `#68645c`
- Primary: `#111111`
- Accent: `#c43a32`
- Border: `#d8d0c4`
- Radius: `2px`
- Panel radius: `0`
- Control radius: `0`
- Chip radius: `0`
- Media radius: `2px`
- Geometry rule: paper-and-rule geometry with seals and scroll-like edges; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 18px 45px rgba(31, 31, 28, .08)`

## Component Detail System

- Button system: Use seal-like primary actions, underlined text actions, and square focus states that preserve the paper rhythm.
- Feedback and alerts: Use red seal confirmations, margin notes, rule-separated warnings, and source-open indicators.
- Spacing system: Use wide paper margins, strict vertical rhythm, thin rule lines, and generous caption spacing.
- Responsive behavior: Desktop can keep metadata, lead story, and index columns; mobile preserves scroll order with seal action after the title and source notes after the content.

Chinese implementation notes:

- 按钮细节：使用印章式主操作、下划线文字操作，以及保持纸面节奏的方形焦点态。
- 提示与反馈：使用朱红印章确认、边注、规则线分隔警告和来源打开指示。
- 间距系统：使用宽纸面边距、严格纵向节奏、细规则线和充足图注间距。
- 响应式策略：桌面可保留元信息、主叙事和索引列；手机保持卷轴阅读顺序，标题后放印章操作，内容后放来源说明。

## Page Adaptation Guide

- Landing page: Use a scroll-like editorial sequence with origin, source notes, product proof, and seal-like primary action.
- Dashboard: Use only for cultural archives, catalog review, or editorial systems where index rows and provenance matter.
- Admin panel: Use for museum, publishing, or cultural ecommerce back offices with careful metadata, not generic CRUD shells.
- Forms, tables, and data: Use persistent labels, margin notes, rule-line validation, and a red seal only for decisive states.
- Mobile: Preserve reading order as scroll sections: title, seal action, story, proof, index, source notes.
- Not a good fit for: Weak for modern SaaS metrics, playful apps, or pages that need heavy chart density.

## Usage Notes

- Treat black, gray, and blank paper as the main palette.
- Use red only as a seal, warning, or decisive action accent.
- Do not turn the page into a generic Asian decorative collage.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
