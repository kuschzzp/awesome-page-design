# Awesome Page Design Workflow

Use this workflow whenever the skill is helping with page design, page structure, visual direction, UI polish, or implementation.

## 1. Understand The Design Task

Before choosing a style or layout, summarize the user's request as a short design brief:

- Product or site type.
- Page, screen, or component type.
- Primary workflow or conversion goal.
- Target audience.
- Desired mood: serious, premium, playful, official, technical, warm, editorial, experimental, or another clear direction.
- Expected information density: sparse, normal, dense, or operational.
- Light, dark, or mixed preference when known.

If important context is missing, ask only what is needed to choose responsibly. If the user explicitly delegates the choice, choose from the library and explain why.

## 2. Decide What To Select

Use a visual style when the task involves:

- Color palette.
- Typography.
- Spacing rhythm.
- Surface treatment.
- Border, radius, shadow, glow, or texture.
- Button, tag, card, input, navigation, table, chart, or empty-state personality.
- Overall mood or brand feel.

Use a layout framework when the task involves:

- Page structure.
- Information architecture.
- Navigation model.
- Dashboard composition.
- Marketing page sections.
- Docs structure.
- Settings, onboarding, catalog, CRM, ecommerce, analytics, portfolio, or editorial workflows.

For full pages, app screens, dashboards, landing pages, admin panels, product pages, docs portals, ecommerce consoles, CRM workspaces, analytics pages, portfolios, or onboarding flows, choose both a visual style and a layout framework unless the user only requested one category.

## 3. Run The Preview Selection Gate

When the user has not already chosen the needed style/layout, do not implement the final UI yet. First guide the user to preview and choose.

Required preview flow:

1. Present the short design brief.
2. Start or provide the preview gallery URL.
3. Ask the user to copy the style prompt they like.
4. For full pages or structured screens, also ask the user to copy a layout prompt.
5. Wait for the user selection before final implementation.

Use the local static server whenever possible:

```bash
npm run preview:serve
```

From an installed skill directory where package scripts may not exist:

```bash
node scripts/serve-preview.js
```

Then provide:

```text
http://127.0.0.1:<port>/assets/previews/
```

If serving a URL is not available, point to `assets/previews/index.html`. If the user cannot open local previews, use `style-index.md` and `layout-index.md` as the text fallback.

## 4. If The User Asks The Agent To Choose

Do not make a hidden single choice. Offer a small shortlist:

- 2-3 visual style candidates.
- 1-2 layout framework candidates for full pages.
- A one-sentence reason for each candidate.
- A note about how the candidates differ.

Apply the similarity guardrails from `style-index.md` and `layout-index.md` before recommending. Ask for confirmation before final implementation unless the user explicitly says to choose and proceed.

Example response shape:

```text
Your request looks like: B2B SaaS analytics dashboard, dense operations workflow, serious/technical tone, light UI.

Open the preview gallery and pick one style + one layout:
http://127.0.0.1:4173/assets/previews/

Good starting points if you want me to choose:
- Style R - Carbon Enterprise: best for dense diagnostic tables.
- Style Q - Fluent Cloud: best for productivity split panes and command bars.
- Layout L08 - Analytics Command Center: best for charts, anomalies, and drill-down.
```

## 5. Read The Right References

After selection:

- Read `usage-principles.md`.
- Read `style-index.md` when choosing or comparing visual styles.
- Read `layout-index.md` when choosing or comparing page structures.
- Read the chosen style manual in `references/styles/`.
- Read the chosen layout manual in `references/layouts/`.
- Use the matching PNG/HTML preview only as a visual reference, not as a layout template.

## 6. Implement The Design

Translate the selected style into concrete implementation primitives:

- Theme tokens for background, surface, text, muted text, primary, accent, border, focus, radius, and shadow.
- Typography rules for heading scale, body density, labels, metadata, and numeric values.
- Spacing rules for page gutters, sections, controls, cards, and dense data areas.
- Component classes or framework tokens for buttons, inputs, tabs, menus, cards, tables, charts, alerts, drawers, modals, empty states, loading states, and disabled states.
- Interaction states for hover, focus, selected, active, loading, error, warning, success, and permission-denied states.

Translate the selected layout framework into product-specific structure:

- Navigation model.
- First-viewport hierarchy.
- Primary workflow area.
- Supporting context panels.
- Required states.
- Responsive behavior.

Do not copy sample content, sample section order, or sample grid structure unless the user explicitly asks for a demo page using the bundled example.

## 7. Verify Before Finishing

Before final response after implementation, check:

- The selected visual style is named and visibly reflected in color, typography, surfaces, components, and states.
- The selected layout framework is named and visibly reflected in structure, navigation, density, hierarchy, and required states.
- The final UI is adapted to the user's real product and does not copy the sample HTML layout.
- Similar styles or layouts have not collapsed into the same generic blue SaaS/admin shell.
- Text does not overflow, overlap, or become unreadable.
- Buttons, inputs, cards, tables, drawers, alerts, loading states, empty states, and disabled states are styled consistently when relevant.
- Desktop and mobile layouts preserve hierarchy and usable controls.
- Preview assets, screenshots, and docs are regenerated or updated when changing this skill's own library.
- Relevant checks have run, such as syntax checks, preview generation, package dry-run, or project tests.

## 8. Explain The Result

When reporting back, include:

- The chosen style and layout.
- Why they fit the user's page.
- Which visual rules were reused.
- Which structure was adapted to the actual product.
- Any verification that was run.
