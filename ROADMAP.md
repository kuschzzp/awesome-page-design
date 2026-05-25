# Roadmap

Awesome Page Design is starting as a visual style prompt library, but the long-term goal is broader: help agents make stronger UI decisions across visual language, page structure, and reusable interaction patterns.

This roadmap is intentionally practical. It describes how the project should grow without becoming a loose pile of templates.

## Current Scope

The current Skill includes:

- 25 visual style directions.
- 20 page layout frameworks.
- HTML and PNG previews for every visual style and layout framework.
- Design system notes under `references/styles/`.
- Layout framework notes under `references/layouts/`.
- Similarity guardrails in `SKILL.md`, `style-index.md`, and `layout-index.md` so related system styles and admin layouts remain distinguishable.
- A required preview selection gate in `SKILL.md` so agents pause after the user's requirement, open or provide the gallery, and wait for style/layout selection unless explicitly delegated.
- A bilingual preview gallery with copyable style and layout prompts.
- A local preview server for source checkouts and installed Skill directories.

The current rule remains the foundation:

> Reuse the style language. Do not copy the sample layout.

## Product Direction

The project should evolve from a single visual-style library into a UI design decision library for coding agents.

Planned categories:

- **Visual styles**: color, typography, radius, shadow, texture, motion, component tone.
- **Page framework styles**: dashboard shell, SaaS landing page, editorial article, docs site, ecommerce admin, portfolio, data console.
- **Component patterns**: modal, drawer, command palette, toast, table, form, empty state, onboarding, pricing card, chart panel.
- **Interaction patterns**: selection, filtering, drag and drop, batch actions, loading, error recovery, keyboard focus, responsive collapse.
- **Domain packs**: finance, healthcare, education, developer tools, public service, commerce, creative tools.

Each category should stay prompt-oriented. The Skill should guide an agent to adapt patterns to the user's product, not paste fixed layouts.

## Proposed Future Structure

The repository should eventually separate style assets, manuals, and catalogs more explicitly:

```text
skills/awesome-page-design/
├── SKILL.md
├── agents/
├── assets/
│   ├── previews/
│   ├── styles/              # HTML + PNG visual previews
│   ├── layouts/             # HTML + PNG layout previews
│   └── components/          # HTML + PNG component previews
├── references/
│   ├── usage-principles.md
│   ├── style-index.md
│   ├── layout-index.md
│   ├── component-index.md
│   ├── styles/
│   ├── layouts/
│   └── components/
└── scripts/
```

Before adding new categories, introduce machine-readable catalog files so metadata is not duplicated across scripts:

```text
catalog/
├── styles.json
├── layouts.json
└── components.json
```

These catalogs should drive preview generation, README tables, copy prompts, and index files.

## Adding More Visual Styles

Near-term additions should focus on quality, not count.

Recommended process for each new style:

1. Define the style name, best-use cases, personality, and anti-use cases.
2. Build one static HTML preview under `skills/awesome-page-design/assets/styles/<style-id>/`.
3. Use the shared AI Daily Brief demo content unless the style needs a different neutral demo carrier.
4. Add or update the design manual in `skills/awesome-page-design/references/styles/`.
5. Update the style catalog metadata.
6. Run `npm run previews`.
7. Check the preview gallery, mobile readability, and copy prompt.
8. Confirm the style is visually distinct from existing options.

Acceptance criteria:

- The style has a clear reason to exist.
- It is not just a palette swap.
- It includes usable typography, surfaces, states, and component tone.
- It has a clear distinction from nearby styles in the same family, especially mature product-system styles.
- It works at desktop and mobile widths.
- It does not depend on a fixed layout.

## Page Framework Styles

Page framework styles should describe structure and workflow, not color.

Examples:

- Dense admin dashboard.
- SaaS product landing page.
- Developer documentation site.
- Editorial homepage and article page.
- Ecommerce merchant console.
- CRM workspace.
- Analytics command center.
- Portfolio case-study page.

Each framework should include:

- Information hierarchy.
- Section order options.
- Navigation model.
- Responsive collapse rules.
- Recommended component mix.
- Failure modes to avoid.
- Compatible visual style families.
- Similarity guardrails that explain how it differs from nearby frameworks.

Agents should be able to combine one visual style with one page framework:

```text
Use awesome-page-design visual style: Version R - Carbon Enterprise.
Use page framework: Dense Admin Dashboard.
Apply both, but design the layout around the actual product requirements.
```

## Component And Popup Patterns

Component patterns should cover common interaction surfaces that agents often implement inconsistently.

Priority components:

- Modal dialog.
- Drawer / side panel.
- Command palette.
- Toast / notification.
- Empty state.
- Data table.
- Filter bar.
- Search results.
- Multi-step form.
- Pricing card.
- Chart panel.
- Settings page.

Each pattern should define:

- When to use it.
- When not to use it.
- Required states.
- Accessibility requirements.
- Desktop and mobile behavior.
- Copywriting rules.
- Style adaptation notes.

Popup and overlay patterns need special care. They should specify focus management, escape behavior, backdrop behavior, scroll locking, stacking, and destructive-action confirmation.

## Preview Gallery Evolution

The preview gallery should become the user's style selection surface.

Planned improvements:

- Search by style name and use case.
- Filters for light/dark, density, mood, and product type.
- Tabs for visual styles, page frameworks, and components.
- Copy prompts that include category-specific instructions.
- Side-by-side comparison mode.
- Direct links to individual HTML previews.
- Optional compressed preview images to reduce package size.

The gallery should remain static and offline-friendly.

## Skill Behavior Improvements

`SKILL.md` should keep helping agents choose combinations reliably:

- If the user asks for general UI design, pick a visual style first.
- If the user asks for page structure, pick a page framework first.
- If the user asks for a specific UI element, pick a component pattern first.
- If multiple categories apply, combine them explicitly and explain the mapping.
- If the user has not chosen a style or layout, use the preview selection gate before final implementation.
- When multiple candidates are similar, apply the guardrails from the style and layout indexes before recommending one.
- Always avoid copying demo content or sample layout as production requirements.

## Quality Bar

Every new asset should pass these checks:

- No Chinese text in shipped English preview assets unless intentionally bilingual UI.
- No broken local links in the preview gallery.
- No duplicate manuals under `assets/` and `references/`.
- No root-level duplicate style assets.
- `npm pack --dry-run` includes only useful package files.
- Preview server returns a URL under `/assets/previews/`.
- Generated screenshots are nonblank and visually representative.
- The style or pattern can be described in one clear sentence.
- Adjacent styles or layouts can be differentiated by workflow, component mix, and information structure, not only by palette.

## Suggested Milestones

### v0.1: Stable Skill Package

- Keep the current 25 visual styles.
- Maintain one source of assets under `skills/awesome-page-design/`.
- Keep README, Chinese README, preview server, and install docs stable.
- Keep the preview selection gate clear enough that installed agents know when to wait for user choice.

### v0.2: Catalog And Contribution Workflow

- Add machine-readable catalogs.
- Generate preview metadata from catalogs.
- Add a documented style contribution checklist.
- Add basic link and count validation scripts.
- Add automated similarity checks for preview screenshots and catalog metadata.

### v0.3: More Visual Styles

- Add 10-15 high-quality visual styles.
- Focus on styles that are genuinely distinct from the current set.
- Add gallery filters for mood, density, product type, and light/dark mode.

### v0.4: Page Framework Library

- Expand beyond the initial 20 page framework patterns.
- Keep layout preview assets visually and structurally distinct, not palette swaps.
- Add stronger framework-specific required states and mobile collapse examples.
- Teach the Skill to recommend style + layout combinations more explicitly by product type.

### v0.5: Component Pattern Library

- Add modal, drawer, command palette, toast, table, form, empty state, and chart panel patterns.
- Add interaction and accessibility rules for each component.
- Add category tabs to the preview gallery.

### v1.0: Agent-Ready UI Design Library

- Stabilize public structure.
- Provide complete install and contribution docs.
- Keep package size controlled.
- Support style + layout + component selection in one coherent workflow.

## Non-Goals

These should remain out of scope unless the project direction changes:

- Full UI framework implementation.
- Component library runtime.
- Copy-paste production templates.
- Brand-specific clones that imply official affiliation.
- Complex build system that makes installed Skill previews hard to open.

## Maintenance Principles

- Prefer fewer, better patterns over a large weak catalog.
- Keep the Skill body concise; put detailed manuals in `references/`.
- Keep preview assets static and easy to inspect.
- Keep generated files reproducible through scripts.
- Treat every demo as a style carrier, not a production template.
