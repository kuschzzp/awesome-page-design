# Style 09 - Tech Minimal (科技极简风)

## Summary

Large whitespace, few colors, one visual focus, modern sans-serif type, and a quiet interface.

Chinese summary: 大面积空白、少色、单一视觉焦点、现代非衬线字体、界面极简。

## Best For

print studios, editorial tools, focused utility pages

## Example Scenario

- Product sample: Riso Ledger
- Page job: Print studio job sheet
- Headline: Track a small edition from paper stock to pickup shelf.
- Primary action: Approve proof
- Secondary action: Print docket

## Scenario Components

- Ledger focus: A single production sheet anchors the page instead of a generic SaaS hero.
- Studio precision: Paper, ink, drying time, and pickup status read like a real workshop record.
- Quiet hierarchy: Whitespace is used to separate job stages, not to make the page feel empty.

## Example States

- Blue pass: Drying
- Proof crop: Approved
- Pickup shelf: 4PM

## Layout Pattern

- Pattern: Minimal Print Ledger (极简印刷账页)
- Archetype: Minimal Print Ledger
- Structure: Sparse production sheet with print job header, paper and ink ledger, proof panel, pickup rail, and clean decision controls.
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: Use small labels, tabular quantities, quiet headings, and precise production notes.
- Components: Job rows, ink passes, proof approval, drying status, and pickup windows should feel like studio paperwork.
- Buttons: Buttons are minimal rectangles or text actions with high alignment.
- Icons and media: Use paper stocks, ink passes, proof crops, and docket rows instead of code snippets.
- States: Show drying, approved, pickup due, low stock, selected proof, and printed states.
- Avoid: Do not turn minimalism into a blank page with no production evidence.

## Visual Language

- Background: `#f8fafc`
- Surface: `#ffffff`
- Text: `#0f172a`
- Muted text: `#64748b`
- Primary: `#111827`
- Accent: `#2563eb`
- Border: `#e2e8f0`
- Radius: `8px`
- Panel radius: `8px`
- Control radius: `4px`
- Chip radius: `2px`
- Media radius: `6px`
- Geometry rule: minimal small-radius surfaces with precise controls; avoid making every button and card the same large rounded rectangle.
- Shadow: `0 20px 60px rgba(15, 23, 42, .08)`

## Component Detail System

- Button system: Use minimal dark primary buttons, quiet secondary actions, clear focus rings, and no decorative button glow.
- Feedback and alerts: Use plain inline alerts, compact success toasts, and reserved empty states.
- Spacing system: Use 24-32px page rhythm, 16px component gaps, and narrow text measures around product proof.
- Responsive behavior: Desktop can be sparse; mobile preserves the single focus object and moves secondary controls below it.

Chinese implementation notes:

- 按钮细节：使用极简深色主按钮、安静次按钮、清晰焦点环，不使用装饰性按钮发光。
- 提示与反馈：使用朴素内联提示、紧凑成功 toast 和克制空状态。
- 间距系统：页面节奏 24-32px，组件间距 16px，产品证明周围文本宽度克制。
- 响应式策略：桌面可稀疏；手机保留单一焦点对象，并把次级控件下移。

## Page Adaptation Guide

- Landing page: Use a focused product brief with one central proof object, concise copy, and quiet secondary links.
- Dashboard: Use clean metrics, simple lists, small charts, and generous whitespace around the main decision.
- Admin panel: Use orderly forms, tables, and settings pages with minimal decoration and strong alignment.
- Forms, tables, and data: Use simple labels, compact helper text, precise focus rings, and calm error states.
- Mobile: Keep one focus object, primary action, then details; move secondary controls below content.
- Not a good fit for: Weak for brands that need strong personality or dramatic visual storytelling.

## Usage Notes

- Use one strong hero object or product surface.
- Keep secondary UI quiet and highly aligned.
- Prefer black, white, slate, and one measured blue accent.

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
