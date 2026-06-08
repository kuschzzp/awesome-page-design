# Roadmap

Awesome Page Design is now a focused layout-aware visual style prompt library. The project helps agents make stronger UI decisions across layout archetypes, information architecture, visual language, button systems, component tone, imagery, and interaction states without becoming a copy-paste template pack.

## Current Scope

The current Skill includes:

- 21 visual style directions, numbered continuously from Style 01 to Style 21.
- HTML and PNG previews for every visual style.
- Richer clickable sample pages with style-specific layout structures, buttons, modal notes, local visual objects, metrics, and action surfaces.
- Design notes under `references/styles/`.
- Layout guidance, design dials, quality checklist, anti-generic UI rules, icon guidance, and design-system output guidance under `references/`.
- Similarity guardrails in `SKILL.md` and `style-index.md` so related styles remain distinguishable.
- A required preview selection gate in `SKILL.md` so agents pause after the user's requirement, open or provide the gallery, and wait for style selection unless explicitly delegated.
- A bilingual preview gallery with copyable detailed style prompts.
- A local preview server for source checkouts and installed Skill directories.

The current rule remains the foundation:

> Reuse the style language. Do not copy the sample layout.

## Product Direction

The project should stay prompt-oriented. The Skill should guide an agent to adapt style decisions to the user's product, not paste fixed layouts.

Planned categories:

- **Layout archetypes**: operational workbench, data console, creation studio, landing narrative, campaign poster, editorial/docs, commerce catalog, onboarding flow, portfolio/object focus, touch utility.
- **Visual styles**: color, typography, radius, shadow, texture, material, motion, component tone.
- **Component patterns**: modal, drawer, command palette, toast, table, form, empty state, onboarding, pricing card, chart panel.
- **Interaction patterns**: selection, filtering, batch actions, loading, error recovery, keyboard focus, responsive collapse.
- **Domain notes**: developer tools, creative tools, SaaS, education, commerce, portfolios, public service, AI products.
- **Quality rules**: design dials, anti-generic UI checks, icon consistency, responsive verification, and reusable design-system output.

Structural guidance should stay clearly separated from visual style and keep a strong quality bar.

## Proposed Future Structure

The repository should eventually separate style metadata from rendering scripts:

```text
skills/awesome-page-design/
├── SKILL.md
├── agents/
├── assets/
│   ├── previews/
│   └── styles/              # HTML + PNG visual previews
├── references/
│   ├── usage-principles.md
│   ├── layout-guidance.md
│   ├── design-dials.md
│   ├── quality-checklist.md
│   ├── anti-generic-ui.md
│   ├── icon-guidance.md
│   ├── design-system-output.md
│   ├── style-index.md
│   └── styles/
└── scripts/
```

Before adding new categories, introduce a machine-readable style catalog so metadata is not duplicated across scripts:

```text
catalog/
└── styles.json
```

This catalog should drive preview generation, README tables, copy prompts, and index files.

## Adding Or Revising Visual Styles

Near-term work should focus on quality, not count.

Recommended process for each new style:

1. Define the style name, best-use cases, personality, anti-use cases, and visual language.
2. Build one static HTML preview under `skills/awesome-page-design/assets/styles/<style-id>/`.
3. Include enough realistic content to judge the style: navigation, style-specific layout structure, layout archetype, cards or non-card alternatives, data, local visual objects, clickable controls, button variants, and states.
4. Add or update the design manual in `skills/awesome-page-design/references/styles/`.
5. Update the style catalog metadata.
6. Run `npm run previews`.
7. Check the preview gallery, mobile readability, image loading, and detailed copy prompt.
8. Confirm the style is visually distinct from existing options.

Acceptance criteria:

- The style has a clear reason to exist.
- It is not just a palette swap.
- It is not the same page shell with different colors.
- It includes usable typography, surfaces, states, imagery guidance, and component tone.
- It includes button and control treatment that fits the style.
- It includes a concrete product scenario, not vague placeholder copy.
- It has a clear distinction from nearby styles in the same family.
- It works at desktop and mobile widths.
- It does not depend on a fixed layout.

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
- Settings panel.

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

The preview gallery should remain the user's style selection surface.

Planned improvements:

- Search by style name and use case.
- Filters for light/dark, density, mood, and product type.
- Copy prompts that include layout archetype, responsive behavior, and category-specific instructions.
- Side-by-side comparison mode.
- Direct links to individual HTML previews.
- Optional compressed preview images to reduce package size.

The gallery should remain static and offline-friendly.

## Skill Behavior Improvements

`SKILL.md` should keep helping agents choose reliably:

- If the user asks for general UI design, pick a visual style first.
- If the user has not chosen a style, use the preview selection gate before final implementation.
- If the user asks the agent to choose, recommend a small candidate set and explain why.
- When multiple candidates are similar, apply the guardrails from the style index before recommending one.
- Set design dials after style selection: layout variance, motion intensity, and visual density.
- Choose a layout archetype from `layout-guidance.md` before treating the task as visual styling.
- Use the quality checklist and anti-generic UI rules when reviewing or polishing existing pages.
- Produce a reusable project design guide when the user wants future pages to stay consistent.
- Always avoid copying demo content or sample layout as production requirements.

## Quality Bar

Every new asset should pass these checks:

- No broken local links in the preview gallery.
- No obsolete `version-*` or `layout-*` references.
- No root-level duplicate style assets.
- `npm pack --dry-run` includes only useful package files.
- Preview server returns a URL under `/assets/previews/`.
- Generated screenshots are nonblank and visually representative.
- Screenshots wait long enough for previews to render.
- The style can be described in one clear sentence.
- Adjacent styles can be differentiated by typography, material, component tone, product scenario, and visual object treatment, not only by palette.
- Adjacent styles can be differentiated by layout archetype, information architecture, typography, material, component tone, product scenario, and visual object treatment, not only by palette.

## Suggested Milestones

### v0.2: Focused 21-Style Library

- Keep the current 21 visual styles.
- Maintain one source of assets under `skills/awesome-page-design/`.
- Keep README, Chinese README, preview server, and install/update docs stable.
- Keep the preview selection gate clear enough that installed agents know when to wait for user choice.

### v0.3: Catalog And Validation

- Add machine-readable `catalog/styles.json`.
- Generate preview metadata from the catalog.
- Add basic link and count validation scripts.
- Add screenshot sanity checks.

### v0.4: Component Pattern Library

- Add modal, drawer, command palette, toast, table, form, empty state, and chart panel patterns.
- Add interaction and accessibility rules for each component.
- Add component previews only if they remain visually distinct and useful.

### v1.0: Agent-Ready Visual Design Library

- Stabilize public structure.
- Provide complete install and contribution docs.
- Keep package size controlled.
- Support style and component selection in one coherent workflow.

## Non-Goals

These should remain out of scope unless the project direction changes:

- Full UI framework implementation.
- Component library runtime.
- Copy-paste production templates.
- Brand-specific clones that imply official affiliation.
- Complex build system that makes installed Skill previews hard to open.

## Maintenance Principles

- Prefer fewer, better styles over a large weak catalog.
- Keep examples rich enough to judge, but never imply they are production templates.
- Prefer real product imagery, brand photography, product screenshots, or carefully matched neutral media.
- Regenerate previews after any visual or documentation metadata change.
