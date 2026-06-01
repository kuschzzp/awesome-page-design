# Awesome Page Design Workflow

Use this workflow whenever the skill is helping with page design, visual direction, UI polish, or implementation.

## 1. Understand The Design Task

Before choosing a style, summarize the user's request as a short design brief:

- Product or site type.
- Page, screen, or component type.
- Primary workflow or conversion goal.
- Target audience.
- Desired mood: serious, premium, playful, official, technical, warm, experimental, futuristic, minimal, or another clear direction.
- Expected information density: sparse, normal, dense, or operational.
- Light, dark, or mixed preference when known.
- Whether the page needs photography, product images, illustration, or no imagery.

If important context is missing, ask only what is needed to choose responsibly. If the user explicitly delegates the choice, choose from the library and explain why.

## 2. Run The Preview Selection Gate

When the user has not already chosen a visual style, do not implement the final UI yet. First guide the user to preview and choose.

Required preview flow:

1. Present the short design brief.
2. Start or provide the preview gallery URL.
3. Ask the user to copy the style prompt they like.
4. Wait for the user selection before final implementation.

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

If serving a URL is not available, point to `assets/previews/index.html`. If the user cannot open local previews, use `style-index.md` as the text fallback.

## 3. If The User Asks The Agent To Choose

Do not make a hidden single choice. Offer a small shortlist:

- 2-3 visual style candidates.
- A one-sentence reason for each candidate.
- A note about how the candidates differ.

Apply the similarity guardrails from `style-index.md` before recommending. Ask for confirmation before final implementation unless the user explicitly says to choose and proceed.

Example response shape:

```text
Your request looks like: B2B AI product landing page, medium density, technical/premium tone, dark preference.

Open the preview gallery and pick one style:
http://127.0.0.1:4173/assets/previews/

Good starting points if you want me to choose:
- Style 09 - Tech Minimal: best for focused modern product clarity.
- Style 18 - Linear Futurism: best for precise dark technical SaaS.
- Style 15 - Liquid Glass: best for immersive futuristic glass surfaces.
```

## 4. Read The Right References

After selection:

- Read `usage-principles.md`.
- Read `style-index.md` when choosing or comparing visual styles.
- Read the chosen style manual in `references/styles/`.
- Use the matching PNG/HTML preview only as a visual reference, not as a page template.

## 5. Implement The Design

Translate the selected style into concrete implementation primitives:

- Theme tokens for background, surface, text, muted text, primary, accent, border, focus, radius, and shadow.
- Typography rules for heading scale, body density, labels, metadata, and numeric values.
- Spacing rules for page gutters, sections, controls, cards, and dense data areas.
- Component classes or framework tokens for buttons, inputs, tabs, menus, cards, tables, charts, alerts, drawers, modals, empty states, loading states, and disabled states.
- Interaction states for hover, focus, selected, active, loading, error, warning, success, and permission-denied states.
- Image treatment when the page benefits from media. Prefer real product imagery, brand photography, product screenshots, or carefully matched neutral media.

Redesign page structure around the user's actual content and workflow. Do not copy sample content, sample section order, or sample grid structure unless the user explicitly asks for a demo page using the bundled example.

## 6. Verify Before Finishing

Before final response after implementation, check:

- The selected visual style is named and visibly reflected in color, typography, surfaces, imagery, components, and states.
- The final UI is adapted to the user's real product and does not copy the sample HTML layout.
- Similar styles have not collapsed into the same generic SaaS/admin shell.
- Text does not overflow, overlap, or become unreadable.
- Buttons, inputs, cards, tables, drawers, alerts, loading states, empty states, and disabled states are styled consistently when relevant.
- Desktop and mobile layouts preserve hierarchy and usable controls.
- Preview assets, screenshots, and docs are regenerated or updated when changing this skill's own library.
- When generating screenshots for this skill, allow 5 seconds for remote images and fonts to load before capturing.
- Relevant checks have run, such as syntax checks, preview generation, package dry-run, or project tests.

## 7. Explain The Result

When reporting back, include:

- The chosen style.
- Why it fits the user's page.
- Which visual rules were reused.
- Which structure was adapted to the actual product.
- Any verification that was run.
