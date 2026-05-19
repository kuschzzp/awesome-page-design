---
name: awesome-page-design
description: Use this skill when designing or implementing websites, web apps, dashboards, landing pages, admin panels, product pages, docs, ecommerce consoles, CRM workspaces, analytics pages, portfolios, onboarding flows, or UI components that need stronger visual direction or page structure. It provides reusable visual style prompts plus page layout frameworks, including color systems, typography, surfaces, motion, component tone, information hierarchy, navigation models, density, responsive behavior, and required states. Use it when the user asks to choose, apply, imitate, vary, or combine page styles and layout frameworks, especially when they want to avoid generic or identical-looking websites. This skill is not a copy-paste template library.
---

# Awesome Page Design

Use this skill to choose and apply visual style directions and page layout frameworks for web UI work.

## Core Rule

This is a UI decision library, not a copy-paste template library. Do not copy sample HTML layouts as the target product layout. Reuse visual style language and layout framework principles, then design the actual structure around the user's product, content priority, workflows, and device needs.

## Workflow

1. Read `references/usage-principles.md` before applying this library.
2. Decide whether the task needs:
   - visual style only
   - layout framework only
   - both visual style and layout framework
3. For visual style, read `references/style-index.md` to choose candidate styles.
4. For page structure, read `references/layout-index.md` to choose candidate layout frameworks.
5. If the user names a version, style, layout ID, or layout framework, read the matching file in `references/styles/` or `references/layouts/`.
6. If the user does not name a style, recommend 2-3 visual style candidates based on:
   - product type: marketing, SaaS, admin, developer tool, editorial, commerce, portfolio
   - mood: serious, playful, premium, technical, warm, official, experimental
   - density: sparse editorial, normal product UI, dense operations UI
   - light or dark preference
7. If the user does not name a layout framework, recommend 1-2 layout candidates based on the page type and workflow.
8. Implement the UI by combining the selected visual language with the selected layout framework while adapting both to the actual task.
9. For exact visual comparison, use the PNG and HTML examples in `assets/styles/<style-folder>/` and `assets/layouts/<layout-folder>/`.

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

When the user has not chosen a style or layout yet, offer to open the preview gallery so they can compare all 25 visual styles and 20 layout frameworks.

Use this flow:

1. Prefer starting a local static server and giving the user a URL.
2. Use `http://127.0.0.1:<port>/assets/previews/` when running from the source repository or an installed skill directory.
3. Open `assets/previews/index.html` only when URL serving is not available.
4. Ask the user to copy a style prompt or layout prompt from the gallery and send it back.
5. After the user chooses a style, read the matching manual in `references/styles/`.
6. After the user chooses a layout framework, read the matching manual in `references/layouts/`.
7. Apply the selected style's visual language and selected layout framework principles, not the sample layout or sample content.

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
