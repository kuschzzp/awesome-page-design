---
name: awesome-page-design
description: Use this skill when designing or implementing websites, web apps, dashboards, landing pages, admin panels, product pages, docs, ecommerce consoles, CRM workspaces, analytics pages, portfolios, onboarding flows, or UI components that need stronger visual direction or page structure. It provides reusable visual style prompts plus page layout frameworks, including color systems, typography, surfaces, motion, component tone, information hierarchy, navigation models, density, responsive behavior, and required states. Use it when the user asks to choose, apply, imitate, vary, or combine page styles and layout frameworks, especially when they want to avoid generic or identical-looking websites. This skill is not a copy-paste template library.
---

# Awesome Page Design

Use this skill to choose and apply visual style directions and page layout frameworks for web UI work.

## Core Rule

This is a UI decision library, not a copy-paste template library. Do not copy sample HTML layouts as the target product layout. Reuse visual style language and layout framework principles, then design the actual structure around the user's product, content priority, workflows, and device needs.

## Required Preview Selection Gate

When the user describes a UI request but has not already chosen a visual style or layout framework, pause before implementing the final UI. First help the user select from the preview gallery.

Use this gate for complete pages, app screens, dashboards, landing pages, admin panels, product pages, docs portals, ecommerce consoles, CRM workspaces, analytics pages, portfolios, onboarding flows, and any task where visual direction or page structure is still undecided.

Required flow:

1. Summarize the user's request as a short selection brief:
   - product type
   - primary workflow or page type
   - desired mood
   - expected information density
   - light or dark preference when known
2. Open or provide the preview gallery URL using the instructions in `Previewing The Included HTML`.
3. Ask the user to choose by copying a style prompt and, for complete pages or structured screens, a layout prompt from the gallery.
4. Do not implement the final UI until the user has selected the needed style/layout or has explicitly delegated the choice to the agent.
5. If the user says the agent should choose, recommend 2-3 style candidates and 1-2 layout candidates, explain the differences briefly, apply the similarity guardrails, and ask for confirmation before final implementation.
6. If the client cannot open local previews, provide text candidates from `references/style-index.md` and `references/layout-index.md` as the fallback selection surface.

Only skip this gate when the user has already named a specific style/layout, asks only for analysis/review, asks for a tiny component that does not need page-level direction, or explicitly says to choose and proceed without confirmation.

## Workflow

1. Read `references/usage-principles.md` before applying this library.
2. Decide whether the task needs:
   - visual style only
   - layout framework only
   - both visual style and layout framework
3. If the needed style or layout is not already selected, run the `Required Preview Selection Gate` before final implementation.
4. For visual style, read `references/style-index.md` to choose candidate styles.
5. For page structure, read `references/layout-index.md` to choose candidate layout frameworks.
6. If the user names a version, style, layout ID, or layout framework, read the matching file in `references/styles/` or `references/layouts/`.
7. If the user explicitly delegates style choice to the agent, recommend 2-3 visual style candidates based on:
   - product type: marketing, SaaS, admin, developer tool, editorial, commerce, portfolio
   - mood: serious, playful, premium, technical, warm, official, experimental
   - density: sparse editorial, normal product UI, dense operations UI
   - light or dark preference
8. If the user explicitly delegates layout choice to the agent, recommend 1-2 layout candidates based on the page type and workflow.
9. Implement the UI by combining the selected visual language with the selected layout framework while adapting both to the actual task.
10. For exact visual comparison, use the PNG and HTML examples in `assets/styles/<style-folder>/` and `assets/layouts/<layout-folder>/`.
11. When candidate styles or layouts are in the same family, apply the similarity guardrails in `references/style-index.md` and `references/layout-index.md` before recommending one.

## Reference Navigation

- `references/style-index.md`: concise index of all A-Y styles.
- `references/layout-index.md`: concise index of page layout frameworks.
- `references/usage-principles.md`: rules for using the library correctly.
- `references/styles/*.md`: full style manuals copied from the project.
- `references/layouts/*.md`: page framework manuals for structure, responsive behavior, and required states.
- `assets/styles/`: visual style HTML and PNG preview assets.
- `assets/layouts/`: layout framework HTML and PNG preview assets.
- `assets/previews/index.html`: preview gallery for visual styles and layout frameworks.

## Choosing Style Versus Layout

Use visual styles when the user asks about look, brand mood, color, typography, surfaces, motion, or component personality.

Use layout frameworks when the user asks about page type, page structure, workflow, information architecture, dashboard composition, landing-page sections, docs layout, settings pages, onboarding, catalogs, CRM workspaces, or analytics pages.

Use both when the user asks for a complete page or app screen.

Example combination:

```text
Use awesome-page-design visual style: Version R - Carbon Enterprise.
Use layout framework: L01 - Dense Admin Dashboard.
Apply both, but design the actual layout around the product requirements.
```

When combining, explain:

- which visual style is being reused
- which layout framework is being reused
- which parts are newly designed for the user's content and workflow

## Similarity Guardrails

Some visual styles and layout frameworks intentionally belong to the same product-system family. Do not treat them as interchangeable.

For mature system-inspired visual styles:

- Use Q - Fluent Cloud for productivity-app command bars, split panes, search, and activity surfaces.
- Use R - Carbon Enterprise for square, dense, diagnostic enterprise data grids.
- Use S - Polaris Commerce for merchant resource lists, bulk actions, fulfillment, and order drawers.
- Use T - Atlassian Workbench for planning boards, work items, lozenge tags, and team collaboration.
- Use W - Lightning CRM for record pages, paths, related lists, account context, and activity timelines.
- Use X - Primer Dev for repositories, file trees, code blocks, issues, labels, and developer workflows.
- Use Y - Ant Pro for query forms, table toolbars, drawers, management consoles, and neutral admin states.

For similar layout families:

- Use L01 for dense management action: filters, KPI scan, priority table, and action queue.
- Use L08 for analytical exploration: dimension tabs, charts, anomalies, drill-down, and segment comparison.
- Use L13 for executive/admin overview: cross-team status, leadership exceptions, workload map, and decision prompts.
- Use L06 for ecommerce operations: saved views, bulk actions, fulfillment lanes, order table, and order drawer.
- Use L14 for table-first resource management: saved views, columns, selected row, bulk edit, and detail inspector.
- Use L15 for event operations: timeline stream, queue rail, SLA clock, escalation state, and runbook progress.

## Previewing The Included HTML

When the user wants to preview the integrated examples, provide a browser URL rather than only a filesystem path whenever possible.

If running from the source repository, start the local static preview server and give the user the URL:

```bash
npm run preview:serve
```

Then provide:

```text
http://127.0.0.1:<port>/assets/previews/
```

If the skill is installed inside a client, package scripts may not be available. In that case, run the bundled skill-local preview server from the installed `awesome-page-design` skill directory:

```bash
node scripts/serve-preview.js
```

Then provide:

```text
http://127.0.0.1:<port>/assets/previews/
```

Primary preview entry:

- `assets/previews/index.html`: gallery of all visual style and layout framework previews.

Individual style examples:

- `assets/styles/version-a-classic/version-a-classic.html`
- `assets/styles/version-j-terminal/version-j-terminal.html`
- Use the same pattern for other style folders.

Individual layout examples:

- `assets/layouts/l01-dense-admin-dashboard/l01-dense-admin-dashboard.html`
- `assets/layouts/l08-analytics-command-center/l08-analytics-command-center.html`
- Use the same pattern for other layout folders.

Fallback local commands when the client has shell access but cannot start a URL server:

```bash
# From inside the installed awesome-page-design skill directory
open assets/previews/index.html

# Or open a single style example
open assets/styles/version-j-terminal/version-j-terminal.html

# Or open a single layout example
open assets/layouts/l08-analytics-command-center/l08-analytics-command-center.html
```

If the client cannot open local files directly, tell the user the exact installed file path and ask them to open it in their browser. These HTML files are static single-file previews; no build step or dev server is required. Some examples load fonts from Google Fonts and will fall back to system fonts when offline.

## Style And Layout Preview Flow

When the user has not chosen a style or layout yet, open or provide the preview gallery before implementing the final UI so they can compare all 25 visual styles and 20 layout frameworks. Treat this as a required selection step, not a casual optional link, unless the user has explicitly delegated the choice.

Use this flow:

1. Create a short selection brief from the user's request.
2. Prefer starting a local static server and giving the user a URL.
3. Use `http://127.0.0.1:<port>/assets/previews/` when running from the source repository or an installed skill directory.
4. Open `assets/previews/index.html` only when URL serving is not available.
5. Ask the user to copy a style prompt or layout prompt from the gallery and send it back.
6. For complete pages or screens, require both a visual style and a layout framework unless the user only asked for one category.
7. After the user chooses a style, read the matching manual in `references/styles/`.
8. After the user chooses a layout framework, read the matching manual in `references/layouts/`.
9. Apply the selected style's visual language and selected layout framework principles, not the sample layout or sample content.

The gallery cards are designed to expose copyable prompts such as:

```text
Use awesome-page-design style: Version J - Terminal Hacker.
Apply its visual language, but do not copy the sample layout.
```

And layout prompts such as:

```text
Use awesome-page-design layout framework: L08 - Analytics Command Center.
Apply its structure, navigation model, density, hierarchy, and required states, but adapt the content and visual style to the product requirements.
```

If the client can open files, open the gallery for the user. If it cannot, provide the exact path and say: "Open this preview gallery, copy the style or layout prompt you like, and send it back to me."

If the user asks the agent to choose instead of opening the gallery, present a short shortlist rather than a single hidden choice. Example response shape:

```text
Your request looks like: B2B SaaS analytics dashboard, dense operations workflow, serious/technical tone, light UI.

Open the preview gallery and pick one style + one layout:
http://127.0.0.1:4173/assets/previews/

Good starting points if you want me to choose:
- Style R - Carbon Enterprise: best for dense diagnostic tables.
- Style Q - Fluent Cloud: best for productivity split panes and command bars.
- Layout L08 - Analytics Command Center: best for charts, anomalies, and drill-down.
```

## Layout Framework Selection Flow

When the user asks for page structure, choose a layout framework from `references/layout-index.md`.

Use this flow:

1. Identify the page type and primary workflow.
2. Recommend 1-2 layout frameworks.
3. Read the selected framework in `references/layouts/`.
4. Combine it with a visual style when the user wants a complete design.
5. Adapt section order, navigation, density, and responsive behavior to the real product.
6. Include required states from the layout framework.

Do not treat layout frameworks as wireframes to copy exactly. Treat them as structural guidance.
Use the layout previews under `assets/layouts/` only to compare structural differences. The included layout previews are intentionally different from one another so the user can distinguish page types quickly.
The layout previews are high-fidelity references with realistic hierarchy, density, status areas, supporting context, and product-like content. They demonstrate how a framework can feel as a real interface, but the final implementation must still be redesigned around the user's own product and workflow.

## When Applying A Style

Extract only what is relevant to the current project:

- Color tokens and semantic color roles.
- Font family, font weights, type scale, and text density.
- Border, radius, shadow, glow, and surface treatment.
- Button, tag, card, input, table, navigation, and empty-state personality.
- Hover, focus, selected, disabled, loading, and alert states.
- Motion timing and texture rules.
- Layout framework hierarchy, navigation model, density, responsive behavior, and required states.

Avoid treating sample layout details as requirements. If a style manual mentions a layout, read it as an example observation, not as an instruction to reproduce that structure.

## Output Expectations

When explaining a style choice to the user, keep it practical:

- Name the selected style and why it fits.
- Mention the main colors, typography, surfaces, and interaction tone.
- State that layout will be adapted to the actual product need.

When coding, translate the selected style into concrete CSS variables, component classes, or framework theme tokens.
