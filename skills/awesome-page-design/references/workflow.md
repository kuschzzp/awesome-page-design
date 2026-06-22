# Awesome Page Design Workflow

Use this workflow whenever the skill is helping with page design, visual direction, local UI patching, UI review, UI polish, or implementation.

## 1. Understand The Design Task

Before choosing a style or patching an existing page, summarize the user's request as a short design brief:

- Product or site type.
- Page, screen, or component type.
- Task scale: new page, page redesign, local UI patch, component polish, implementation compliance, or design-system output.
- Target region when editing an existing page.
- Neighbor regions that may be affected by the patch.
- Existing visual system when available: tokens, typography, density, components, icons, and state treatments.
- Primary workflow or conversion goal.
- Primary content object: table row, document, asset, lesson, incident, product, lead, report, file, message, or media frame.
- Likely layout archetype: operational workbench, data console, creation studio, landing narrative, campaign poster, editorial/docs, commerce catalog, onboarding flow, portfolio/object focus, or touch utility.
- Main action model: create, approve, filter, compare, review, publish, buy, configure, continue, or recover.
- Required component behavior: buttons, forms, filters, tables, cards, alerts, loading states, empty states, or overlays that must be real, not decorative.
- Target audience.
- Desired mood: serious, premium, playful, official, technical, warm, experimental, futuristic, minimal, or another clear direction.
- Expected information density: sparse, normal, dense, or operational.
- Light, dark, or mixed preference when known.
- Whether the page needs photography, product images, illustration, or no imagery.

If important context is missing, ask only what is needed to choose or patch responsibly. If the user explicitly delegates the choice, choose from the library and explain why.

## 2. Route The Task Scale And Work Mode

Decide task scale before selecting visual style:

- `New page`: the user wants a new site, page, dashboard, admin panel, landing page, app screen, or full experience. Use page-level style selection when visual direction is undecided.
- `Page redesign`: the user wants the whole page rethought, less generic, less AI-looking, or visually redirected. Audit the current page first, then decide whether to preserve and repair or choose a new direction.
- `Local UI patch`: the user wants one existing region improved, such as a toolbar, table, modal, form block, card group, sidebar, filter bar, empty state, toast, drawer, tabs, or action row. Preserve the current page system and read `local-ui-patch.md`.
- `Component polish`: the user wants a component or component family refined. Preserve existing tokens and variants, then use `component-implementation.md`.
- `Implementation compliance`: the user wants real UI code reviewed or fixed for usability, accessibility, state handling, responsive behavior, forms, motion, images, or text overflow. Use `interface-compliance.md`.
- `Design system output`: the user wants reusable rules for future pages. Follow `design-system-output.md`.

Then decide which mode best fits the user's request:

- `Style selection`: the user needs a page-level visual direction for a new page, full screen, or explicit redesign.
- `Design audit`: the user wants an existing UI reviewed, made less generic, made more elegant, or made more professional.
- `Local UI patch`: the user wants a targeted improvement while keeping the surrounding page and product language intact.
- `Implementation polish`: the user has a direction and wants refinement of visual quality, layout, states, responsive behavior, icons, or media.
- `Implementation compliance`: the user wants real UI code reviewed or fixed for usability, accessibility, state handling, responsive behavior, forms, motion, images, or text overflow.
- `Design system output`: the user wants reusable rules for future pages.

For `Design audit`, read `quality-checklist.md`, `anti-generic-ui.md`, and `interface-compliance.md` before recommending changes.

For `Local UI patch`, read `local-ui-patch.md`, inspect the target region and neighbor regions, preserve the existing system, and escalate to page redesign only when a local patch cannot solve the problem.

For `Implementation polish`, keep the selected style visible while improving layout rhythm, typography, component states, responsive behavior, and implementation compliance.

For `Implementation compliance`, lead with concrete findings. Use `file:line` output when files and line numbers are available. If source lines are not available, group findings by page region.

For `Design system output`, follow `design-system-output.md` and avoid source labels or external reference wording.

## 3. Choose The Layout Archetype

Before selecting a page-level visual style, read `layout-guidance.md` and choose the structure that fits the user's real page job.

Name these decisions before implementation:

- Layout archetype.
- Primary content object.
- Top-level regions.
- Main action model.
- Expected density.
- Responsive collapse behavior.
- Layout anti-patterns to avoid.

Do not use a marketing hero layout for dashboards, admin panels, CRM workspaces, analytics screens, consoles, editors, tables, or forms unless the user explicitly asks for a public marketing page.

For local UI patches, do not re-choose the whole layout archetype unless the target issue comes from page-level structure. Instead, name the current local structure, target region, neighbor regions, and responsive behavior that must be preserved.

## 4. Run The Preview Selection Gate

When the user has not already chosen a page-level visual style, do not implement the final page-level UI yet. First guide the user to preview and choose.

Use this gate for new pages, full app screens, page redesigns, and page-level visual direction decisions.

Do not run this gate for a local UI patch, component polish, or pure implementation compliance task unless the user asks for a new direction or the current visual system is the blocker.

Required preview flow:

1. Present the short design brief.
2. Include the likely layout archetype and why it fits the page job.
3. Start or provide the preview gallery URL.
4. Ask the user to choose the prompt type that matches the task: full, landing page, dashboard, admin panel, or mobile.
5. Ask the user to copy the detailed style prompt they like.
6. Wait for the user selection before final implementation.

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

After a page-level style is selected or delegated, set these dials from `design-dials.md`:

- Layout variance: low, medium, or high.
- Motion intensity: none, subtle, or expressive.
- Visual density: sparse, normal, or dense.

Infer the values when the user does not specify them. Mention the chosen dials briefly when explaining the design direction.

Also name the prompt type being applied:

- `Full Prompt`: broad design direction for an unknown or mixed page.
- `Landing Page`: public page, product page, campaign, portfolio, or conversion flow.
- `Dashboard`: metrics, analytics, operations, review queues, or state monitoring.
- `Admin Panel`: tables, forms, bulk actions, permissions, settings, and recovery flows.
- `Mobile`: mobile-first screen, responsive redesign, or small-screen compliance work.

## 7. Read The Right References

After task scale and selection, load only the references needed for the current mode so the skill stays focused. Always read `usage-principles.md` for library rules and sample-layout constraints.

- Page-level work (`New page`, `Page redesign`, `Style selection`): read `layout-guidance.md`, `style-index.md`, `design-dials.md` after selection, the chosen style manual and its `Page Adaptation Guide`, and `anti-generic-ui.md`. Use matching PNG/HTML previews only as visual references, not templates.
- `Local UI patch`: read `local-ui-patch.md`; add `component-implementation.md` for stateful targets and `interface-compliance.md` for real code changes. Read `motion-guidance.md` or `icon-guidance.md` only when the target uses motion or icons. Do not read `design-dials.md`, `style-index.md`, or a style manual unless the user asks for a new page-level direction or the existing system is the blocker.
- `Component polish`: read `component-implementation.md`; add `interface-compliance.md` for real code, `local-ui-patch.md` when the component lives inside a page region, and motion or icon guidance only when used.
- `Implementation compliance`: read `interface-compliance.md`; add `component-implementation.md` for component states, forms, tables, overlays, or feedback patterns; add motion, icon, or local patch guidance only when the fix touches those areas.
- `Design system output`: read `design-system-output.md` plus usage, layout, component, and interface rules as inputs. Read a selected style manual only if the design system is explicitly based on a chosen style.

## 8. Implement The Design

Translate the selected style or existing local system into concrete implementation primitives:

- Page structure, layout archetype, top-level regions, action placement, and information architecture that fit the real product.
- Responsive collapse behavior for navigation, filters, dense tables, media, toolbars, and primary actions.
- Theme tokens for background, surface, text, muted text, primary, accent, border, focus, radius, and shadow.
- Typography rules for heading scale, body density, labels, metadata, and numeric values.
- Spacing rules for page gutters, sections, controls, cards, and dense data areas.
- Component classes or framework tokens for buttons, inputs, tabs, menus, cards, tables, charts, alerts, drawers, modals, empty states, loading states, selected states, disabled states, and destructive states.
- Component detail rules for button anatomy, feedback level, spacing rhythm, and desktop/tablet/mobile behavior.
- Interaction states for hover, focus, selected, active, loading, error, warning, success, and permission-denied states.
- Icon rules for source family, stroke/fill logic, size, alignment, labels, and action semantics.
- Image treatment when the page benefits from media. Prefer real product imagery, brand photography, product screenshots, or carefully matched neutral media.

For page-level work, redesign page structure around the user's actual content and workflow. Do not copy sample content, sample section order, sample button shapes, or sample grid structure unless the user explicitly asks for a demo page using the bundled example.

For local UI patches, define the patch boundary before editing:

- Target region to change.
- Neighbor regions to protect or lightly adjust.
- Existing tokens, components, icon rules, density, and state treatment to preserve.
- Minimum shared component or token change, if any.

Do not rewrite the whole page layout, introduce a new visual language, or change unrelated copy/data/behavior for a local patch. If the local issue is caused by page-level structure, explain the escalation and move to page redesign.

When the chosen style has a strong structural identity, preserve that identity in a context-aware way:

- Editorial styles should rely on type, rules, columns, captions, and index rhythm before cards.
- Console styles should foreground logs, tables, traces, commands, or workflow evidence before decorative hero art.
- Poster/campaign styles should use slabs, stamps, tickets, marquees, or bold conversion modules before neutral SaaS panels.
- Tool and dashboard styles should expose filters, states, owner/action rows, dense data, and controls before marketing copy.
- Experimental styles should keep stable anchors for navigation, actions, and body text even when the visual field is expressive.

## 9. Run The Implementation Compliance Gate

When the task touches real UI code, generated HTML, or a page implementation, check the result against `interface-compliance.md` and `component-implementation.md` before final visual approval. Add `motion-guidance.md` when motion exists or is changed. For local patches, also check `local-ui-patch.md`.

Required checks:

- Semantic controls: actions use buttons, navigation uses links, form controls have labels, and icon-only controls have accessible names.
- Focus and keyboard: every interactive element has a visible focus-visible state and remains reachable.
- Component state matrix: relevant buttons, links, inputs, tabs, filters, cards, lists, tables, modals, drawers, empty states, loading states, error states, disabled states, selected states, warning states, and success states are styled.
- Button detail: primary, secondary, disabled, loading, selected/toggled, destructive, and success/error treatments are visually distinct and style-consistent when present.
- Feedback detail: toast, snackbar, banner, inline alert, validation message, row-local status, modal confirmation, or undo is chosen according to severity and context.
- Spacing detail: page gutters, section gaps, panel padding, row gaps, control height, and dense/touch-friendly variants are explicit.
- Responsive behavior: desktop, tablet, and mobile preserve hierarchy, readable text, reachable actions, and the primary content object.
- Content handling: long labels, user-generated content, metrics, table cells, and button text wrap, truncate, or clamp intentionally.
- Media stability: images, screenshots, charts, and visual containers have stable dimensions or aspect-ratio rules.
- Motion: transitions have semantic purpose, list exact properties, avoid `transition: all`, and respect reduced-motion preferences.
- Product state: filters, tabs, pagination, expanded panels, and selected objects show state visibly; use URL state when the product expects refresh, sharing, or back navigation.
- Feedback quality: error, warning, success, loading, and empty states explain what happened and what the user can do next.
- Local patch boundary: the changed region still belongs to the existing page system and does not break adjacent regions.

Audit output:

- When reporting issues, group by file and line when available.
- When reviewing screenshots, group by page region.
- Lead with P0 and P1 issues before polish.
- If implementing fixes, re-check the changed regions before final response.

Only skip this gate for pure style selection, text-only analysis, or tiny static mockups where no implementation details exist yet.

## 10. Verify Before Finishing

Before final response after implementation, check:

- For page-level work, the layout archetype matches the user's page job and primary content object.
- For page-level work, the top-level regions, action model, and responsive collapse are explicit enough to implement.
- For page-level work, the selected visual style is named and visibly reflected in color, typography, surfaces, imagery, components, and states.
- The final UI is adapted to the user's real product and does not copy the sample HTML layout.
- Local patches preserve the existing page system, stay within the target and necessary neighbor regions, and do not introduce a conflicting visual language.
- For style selection or preview-library work, similar styles have not collapsed into the same generic SaaS/admin shell.
- For style selection or preview-library work, the page does not reuse the same layout skeleton, button system, or card rhythm across unrelated styles.
- The anti-generic UI rules have been applied: no filler hero, no default three-card rhythm, no vague copy, and no decorative effect substituting for hierarchy.
- Text does not overflow, overlap, or become unreadable.
- Buttons, inputs, cards, tables, drawers, alerts, loading states, empty states, and disabled states are styled consistently when relevant.
- Icons use one coherent visual system when relevant.
- Desktop and mobile layouts preserve hierarchy and usable controls.
- Target and neighbor regions have been re-checked after local patches.
- Preview assets, screenshots, and docs are regenerated or updated when changing this skill's own library.
- When updating copied style prompts, include layout archetype, layout structure, tokens, typography, components, buttons, icons/media, states, constraints, and verification checks.
- When updating copied style prompts, include the appropriate task type: full, landing page, dashboard, admin panel, or mobile.
- When updating copied style prompts, include implementation compliance: semantic controls, accessible labels, focus-visible states, component state matrix, responsive text handling, stable media, and reduced-motion requirements.
- For this skill's own previews, desktop and mobile PNG assets exist for every style.
- For this skill's own previews, run `npm run validate` after `npm run previews`.
- When generating screenshots for this skill, allow enough time for page rendering before capturing.
- Relevant checks have run, such as syntax checks, preview generation, package dry-run, or project tests.

## 11. Explain The Result

Match the final explanation to the work mode so the report does not force page-level language onto local work.

- Page-level style selection, new pages, or redesigns: include the chosen style, layout archetype, design dials when relevant, why it fits, what structure was adapted to the real product, which visual rules were reused, compliance checks, and verification.
- Local UI patches: include the target region changed, existing system preserved, neighbor regions checked or adjusted, states/responsive/accessibility details improved, page-level redesign risk if any, and verification including screenshots when UI changed.
- Implementation compliance or design audit: include highest-priority findings first, file and line or page region, concrete fix or recommendation, remaining risks or test gaps, and verification.
- Design system output: include reusable rules created or updated, covered page types/components/tokens/states/responsive behaviors, how future pages should apply the rules, and verification.
