# Awesome Page Design Workflow

Use this workflow whenever the skill is helping with page design, visual direction, UI review, UI polish, or implementation.

## 1. Understand The Design Task

Before choosing a style, summarize the user's request as a short design brief:

- Product or site type.
- Page, screen, or component type.
- Primary workflow or conversion goal.
- Primary content object: table row, document, asset, lesson, incident, product, lead, report, file, message, or media frame.
- Likely layout archetype: operational workbench, data console, creation studio, landing narrative, campaign poster, editorial/docs, commerce catalog, onboarding flow, portfolio/object focus, or touch utility.
- Main action model: create, approve, filter, compare, review, publish, buy, configure, continue, or recover.
- Target audience.
- Desired mood: serious, premium, playful, official, technical, warm, experimental, futuristic, minimal, or another clear direction.
- Expected information density: sparse, normal, dense, or operational.
- Light, dark, or mixed preference when known.
- Whether the page needs photography, product images, illustration, or no imagery.

If important context is missing, ask only what is needed to choose responsibly. If the user explicitly delegates the choice, choose from the library and explain why.

## 2. Route The Work Mode

Decide which mode best fits the user's request:

- `Style selection`: the user needs a visual direction for a new page, screen, or component.
- `Design audit`: the user wants an existing UI reviewed, made less generic, made more elegant, or made more professional.
- `Implementation polish`: the user has a direction and wants refinement of visual quality, layout, states, responsive behavior, icons, or media.
- `Design system output`: the user wants reusable rules for future pages.

For `Design audit`, read `quality-checklist.md` and `anti-generic-ui.md` before recommending changes.

For `Implementation polish`, keep the selected style visible while improving layout rhythm, typography, component states, and responsive behavior.

For `Design system output`, follow `design-system-output.md` and avoid source labels or external reference wording.

## 3. Choose The Layout Archetype

Before selecting a visual style, read `layout-guidance.md` and choose the structure that fits the user's real page job.

Name these decisions before implementation:

- Layout archetype.
- Primary content object.
- Top-level regions.
- Main action model.
- Expected density.
- Responsive collapse behavior.
- Layout anti-patterns to avoid.

Do not use a marketing hero layout for dashboards, admin panels, CRM workspaces, analytics screens, consoles, editors, tables, or forms unless the user explicitly asks for a public marketing page.

## 4. Run The Preview Selection Gate

When the user has not already chosen a visual style, do not implement the final UI yet. First guide the user to preview and choose.

Required preview flow:

1. Present the short design brief.
2. Include the likely layout archetype and why it fits the page job.
3. Start or provide the preview gallery URL.
4. Ask the user to copy the detailed style prompt they like.
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

If serving a URL is not available, point to `assets/previews/index.html`. If the user cannot open local previews, use `style-index.md` as the text fallback.

## 5. If The User Asks The Agent To Choose

Do not make a hidden single choice. Offer a small shortlist:

  - 2-3 visual style candidates.
  - A one-sentence reason for each candidate.
  - A note about how the candidates differ in layout archetype, button language, density, media direction, and component treatment.

Apply the similarity guardrails from `style-index.md` before recommending. Ask for confirmation before final implementation unless the user explicitly says to choose and proceed.

Example response shape:

```text
Your request looks like: B2B product landing page, medium density, technical/premium tone, dark preference.

Open the preview gallery and pick one style:
http://127.0.0.1:4173/assets/previews/

Good starting points if you want me to choose:
- Style 09 - Tech Minimal: best for focused modern product clarity.
- Style 18 - Precision Futurism: best for precise dark technical SaaS.
- Style 15 - Liquid Glass: best for immersive futuristic glass surfaces.
```

## 6. Set The Design Dials

After a style is selected or delegated, set these dials from `design-dials.md`:

- Layout variance: low, medium, or high.
- Motion intensity: none, subtle, or expressive.
- Visual density: sparse, normal, or dense.

Infer the values when the user does not specify them. Mention the chosen dials briefly when explaining the design direction.

## 7. Read The Right References

After selection:

- Read `usage-principles.md`.
- Read `layout-guidance.md`.
- Read `design-dials.md`.
- Read `anti-generic-ui.md`.
- Read `style-index.md` when choosing or comparing visual styles.
- Read the chosen style manual in `references/styles/`.
- Read `icon-guidance.md` when the page uses icons, toolbars, navigation, empty states, or compact actions.
- Read `design-system-output.md` when writing or updating a reusable design guide.
- Use the matching PNG/HTML preview only as a visual reference, not as a page template.

## 8. Implement The Design

Translate the selected style into concrete implementation primitives:

- Page structure, layout archetype, top-level regions, action placement, and information architecture that fit the real product.
- Responsive collapse behavior for navigation, filters, dense tables, media, toolbars, and primary actions.
- Theme tokens for background, surface, text, muted text, primary, accent, border, focus, radius, and shadow.
- Typography rules for heading scale, body density, labels, metadata, and numeric values.
- Spacing rules for page gutters, sections, controls, cards, and dense data areas.
- Component classes or framework tokens for buttons, inputs, tabs, menus, cards, tables, charts, alerts, drawers, modals, empty states, loading states, and disabled states.
- Interaction states for hover, focus, selected, active, loading, error, warning, success, and permission-denied states.
- Icon rules for source family, stroke/fill logic, size, alignment, labels, and action semantics.
- Image treatment when the page benefits from media. Prefer real product imagery, brand photography, product screenshots, or carefully matched neutral media.

Redesign page structure around the user's actual content and workflow. Do not copy sample content, sample section order, sample button shapes, or sample grid structure unless the user explicitly asks for a demo page using the bundled example.

When the chosen style has a strong structural identity, preserve that identity in a context-aware way:

- Editorial styles should rely on type, rules, columns, captions, and index rhythm before cards.
- Console styles should foreground logs, tables, traces, commands, or workflow evidence before decorative hero art.
- Poster/campaign styles should use slabs, stamps, tickets, marquees, or bold conversion modules before neutral SaaS panels.
- Tool and dashboard styles should expose filters, states, owner/action rows, dense data, and controls before marketing copy.
- Experimental styles should keep stable anchors for navigation, actions, and body text even when the visual field is expressive.

## 9. Verify Before Finishing

Before final response after implementation, check:

- The layout archetype matches the user's page job and primary content object.
- The top-level regions, action model, and responsive collapse are explicit enough to implement.
- The selected visual style is named and visibly reflected in color, typography, surfaces, imagery, components, and states.
- The final UI is adapted to the user's real product and does not copy the sample HTML layout.
- Similar styles have not collapsed into the same generic SaaS/admin shell.
- The page does not reuse the same layout skeleton, button system, or card rhythm across unrelated styles.
- The anti-generic UI rules have been applied: no filler hero, no default three-card rhythm, no vague copy, and no decorative effect substituting for hierarchy.
- Text does not overflow, overlap, or become unreadable.
- Buttons, inputs, cards, tables, drawers, alerts, loading states, empty states, and disabled states are styled consistently when relevant.
- Icons use one coherent visual system when relevant.
- Desktop and mobile layouts preserve hierarchy and usable controls.
- Preview assets, screenshots, and docs are regenerated or updated when changing this skill's own library.
- Copied style prompts include layout archetype, layout structure, tokens, typography, components, buttons, icons/media, states, constraints, and verification checks.
- When generating screenshots for this skill, allow enough time for page rendering before capturing.
- Relevant checks have run, such as syntax checks, preview generation, package dry-run, or project tests.

## 10. Explain The Result

When reporting back, include:

- The chosen style.
- The chosen layout archetype.
- The selected design dials when relevant.
- Why it fits the user's page.
- Which visual rules were reused.
- Which structure was adapted to the actual product.
- Any verification that was run.
