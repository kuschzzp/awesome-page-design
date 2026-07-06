# Awesome Page Design Workflow

Use this workflow whenever the skill is helping with page design, visual direction, existing-project integration, local UI patching, UI review, UI polish, or implementation.

## 1. Understand The Design Task

Before choosing a style or patching an existing page, summarize the user's request as a short design brief:

- Product or site type.
- Page, screen, or component type.
- Task scale: new page, page redesign, existing-project feature, local UI patch, component polish, implementation compliance, or design-system output.
- Target region when editing an existing page.
- Neighbor regions that may be affected by the patch.
- Existing visual system when available: tokens, typography, density, components, icons, and state treatments.
- Existing project component baselines when working in a current or legacy codebase: selects/dropdowns, buttons, paginated tables, statistics tables/cards, modals, drawers, filters, forms, pagination, icons, and feedback states.
- New project shell assets when creating a site or app: document title, description metadata, `favicon.ico` or framework favicon route, app/touch icons when useful, and whether default framework branding must be removed.
- Primary workflow or conversion goal.
- Primary content object: table row, document, asset, lesson, incident, product, lead, report, file, message, or media frame.
- Likely layout archetype: operational workbench, data console, creation studio, landing narrative, campaign poster, editorial/docs, commerce catalog, onboarding flow, portfolio/object focus, or touch utility.
- Main action model: create, approve, filter, compare, review, publish, buy, configure, continue, or recover.
- Required component behavior: buttons, forms, filters, tables, cards, alerts, loading states, empty states, or overlays that must be real, not decorative.
- UI primitive risk: whether the task touches browser dialogs, confirmation flows, selects/dropdowns, menus, table pagination, form controls, copy/export feedback, or overlays that must follow `ui-primitive-contract.md`.
- Target audience.
- Desired mood: serious, premium, playful, official, technical, warm, experimental, futuristic, minimal, or another clear direction.
- Adjacent mood or variant when named, such as biophilic, solarpunk, film noir, dark academia, paper cutout, hand-drawn sketch, Bauhaus, or mid-century modern.
- Expected information density: sparse, normal, dense, or operational.
- Light, dark, or mixed preference when known.
- Whether the page needs photography, product images, illustration, or no imagery.

If important context is missing, ask only what is needed to choose or patch responsibly. If the user explicitly delegates the choice, choose from the library and explain why.

## 2. Route The Task Scale And Work Mode

Decide task scale before selecting visual style:

- `New page`: the user wants a new site, page, dashboard, admin panel, landing page, app screen, or full experience. Use page-level style selection when visual direction is undecided, and include product shell assets such as title metadata, `favicon.ico`, and app icons when the project type supports them.
- `Page redesign`: the user wants the whole page rethought, less generic, less AI-looking, or visually redirected. Audit the current page first, then decide whether to preserve and repair or choose a new direction.
- `Existing-project feature`: the user wants a new or changed feature inside an existing frontend project, legacy business system, enterprise console, dashboard, internal tool, or product module. Read `existing-project-integration.md` and `ui-primitive-contract.md`, inspect nearby code and shared components first, then reuse current component and style conventions by default.
- `Local UI patch`: the user wants one existing region improved, such as a toolbar, table, modal, form block, card group, sidebar, filter bar, empty state, toast, drawer, tabs, or action row. Preserve the current page system and read `local-ui-patch.md` plus `ui-primitive-contract.md`.
- `Component polish`: the user wants a component or component family refined. Preserve existing tokens and variants, then use `component-implementation.md` and `ui-primitive-contract.md`.
- `Implementation compliance`: the user wants real UI code reviewed or fixed for usability, accessibility, state handling, responsive behavior, forms, motion, images, text overflow, or browser-default UI primitives. Use `interface-compliance.md` and `ui-primitive-contract.md`.
- `Design system output`: the user wants reusable rules for future pages. Follow `design-system-output.md`.

Then decide which mode best fits the user's request:

- `Style selection`: the user needs a page-level visual direction for a new page, full screen, or explicit redesign.
- `Design audit`: the user wants an existing UI reviewed, made less generic, made more elegant, or made more professional.
- `Existing project integration`: the user wants UI work in an existing codebase. Inspect reusable controls and sibling pages before deciding layout, style, or component implementation.
- `Local UI patch`: the user wants a targeted improvement while keeping the surrounding page and product language intact.
- `Implementation polish`: the user has a direction and wants refinement of visual quality, layout, states, responsive behavior, icons, or media.
- `Implementation compliance`: the user wants real UI code reviewed or fixed for usability, accessibility, state handling, responsive behavior, forms, motion, images, or text overflow.
- `Design system output`: the user wants reusable rules for future pages.

For `Design audit`, read `quality-checklist.md`, `anti-generic-ui.md`, and `interface-compliance.md` before recommending changes.

For `Existing project integration`, read `existing-project-integration.md` and `ui-primitive-contract.md`, inspect current frontend code, identify the nearest production patterns, and reuse existing selects/dropdowns, buttons, paginated tables, statistics blocks, modals, drawers, forms, filters, pagination, icons, and feedback states before adding new UI. Only choose a new page-level visual style when the user asks for redesign or the existing system is the blocker.

For `Local UI patch`, read `local-ui-patch.md` and `ui-primitive-contract.md`, inspect the target region and neighbor regions, preserve the existing system, and escalate to page redesign only when a local patch cannot solve the problem.

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

Do not use a marketing hero layout for dashboards, admin panels, internal workspaces, analytics screens, consoles, editors, tables, or forms unless the user explicitly asks for a public marketing page.

For local UI patches, do not re-choose the whole layout archetype unless the target issue comes from page-level structure. Instead, name the current local structure, target region, neighbor regions, and responsive behavior that must be preserved.

## 3A. Scan Existing Project Components

When the work happens inside an existing or legacy frontend project, inspect the current implementation before visual design or coding:

- Find sibling pages, route modules, layouts, and shared components that already solve a similar page job.
- Check whether the project uses wrapper components or a UI framework abstraction before using raw buttons, selects, tables, modals, drawers, or pagination controls.
- Identify the established select/dropdown, button/action group, paginated table, statistics table/card, modal/drawer, form/filter, icon, empty/loading/error, and responsive patterns.
- Prefer the most reused, nearest, or newest production pattern when older pages disagree.
- Mention the inspected examples in the design brief when they shape the implementation.

Treat the style library as a source of direction that must be translated into the existing component system. Do not replace the product's UI language unless the user explicitly asks for a redesign or the existing system cannot support the requested feature.

## 3B. Run The UI Primitive Contract Gate

Before implementation, decide whether the task touches finished product UI primitives:

- browser dialogs, confirmation prompts, copy/export feedback, save/delete/publish outcomes, or destructive decisions
- selects, dropdowns, comboboxes, cascaders, page-size controls, filter menus, action menus, or prompt pickers
- modals, drawers, popovers, banners, inline alerts, toasts, snackbars, validation messages, or page-level status
- native file, checkbox, radio, or form controls that need to match a designed product surface

If any apply, read `ui-primitive-contract.md` before coding. Replace browser-default dialogs and unstyled native selects with the existing project primitive, framework wrapper, or a scoped styled component. If a rare native-control exception remains, document why it matches the project system and verify its states.

## 3C. Plan New Project Shell Assets

When building a new site, app, landing page, dashboard, or admin panel from scratch, include the project shell polish that makes the work feel complete:

- Generate or add a real `favicon.ico` unless the framework has a specific favicon route that produces the same browser-tab result. For plain HTML/static sites, SVG can supplement the icon set but does not replace `favicon.ico`.
- Wire the favicon into the app shell: HTML `<head>`, framework metadata API, `public/favicon.ico`, `app/favicon.ico`, or the project's established asset location.
- Remove default framework icons, sample logos, default titles, starter metadata, and placeholder app names.
- Set a product-specific document title and description metadata.
- Add app/touch icons or manifest metadata when the page is intended to behave like an installable app or mobile-first product.

The favicon can be simple, but it should use the selected visual language or product mark. Do not leave the browser tab with the Vite, React, Next.js, framework, or generic blank icon.

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

If the user names a sub-style or adjacent mood after a numbered style is selected, read `variant-guidance.md` and state the base style plus the variant. Keep the numbered style's layout archetype and component behavior as the structural base unless the user's product workflow requires a different layout.

## 7. Read The Right References

After task scale and selection, load only the references needed for the current mode so the skill stays focused. Always read `usage-principles.md` for library rules and sample-layout constraints.

- Page-level work (`New page`, `Page redesign`, `Style selection`): read `layout-guidance.md`, `style-index.md`, `design-dials.md` after selection, the chosen style manual and its `Page Adaptation Guide`, and `anti-generic-ui.md`. Add `variant-guidance.md` only when the user asks for an adjacent mood or named sub-style. Use matching PNG/HTML previews only as visual references, not templates.
- Existing-project feature or existing-codebase UI work: read `existing-project-integration.md` and `ui-primitive-contract.md`; add `local-ui-patch.md` for targeted regions, `component-implementation.md` for controls and states, and `interface-compliance.md` for real code changes. Do not read `design-dials.md`, `style-index.md`, or a style manual unless the user asks for a new page-level direction or the existing system is the blocker.
- `Local UI patch`: read `local-ui-patch.md` and `ui-primitive-contract.md`; add `existing-project-integration.md` when the target lives in a broader legacy/current project, `component-implementation.md` for stateful targets, and `interface-compliance.md` for real code changes. Read `motion-guidance.md` or `icon-guidance.md` only when the target uses motion or icons. Do not read `design-dials.md`, `style-index.md`, or a style manual unless the user asks for a new page-level direction or the existing system is the blocker.
- `Component polish`: read `component-implementation.md` and `ui-primitive-contract.md`; add `interface-compliance.md` for real code, `local-ui-patch.md` when the component lives inside a page region, and motion or icon guidance only when used.
- `Implementation compliance`: read `interface-compliance.md` and `ui-primitive-contract.md`; add `component-implementation.md` for component states, forms, tables, overlays, or feedback patterns; add motion, icon, or local patch guidance only when the fix touches those areas.
- `Design system output`: read `design-system-output.md` plus usage, layout, primitive, component, and interface rules as inputs. Read a selected style manual only if the design system is explicitly based on a chosen style.

## 8. Implement The Design

Translate the selected style or existing local system into concrete implementation primitives:

- Page structure, layout archetype, top-level regions, action placement, and information architecture that fit the real product.
- New project shell assets: product-specific title, description metadata, `favicon.ico` or framework favicon route, optional app/touch icons, and removal of default framework branding.
- Responsive collapse behavior for navigation, filters, dense tables, media, toolbars, and primary actions.
- Theme tokens for background, surface, text, muted text, primary, accent, border, focus, radius, and shadow.
- Typography rules for heading scale, body density, labels, metadata, and numeric values.
- Spacing rules for page gutters, sections, controls, cards, and dense data areas.
- Component classes or framework tokens for buttons, inputs, tabs, menus, cards, tables, charts, alerts, drawers, modals, empty states, loading states, selected states, disabled states, and destructive states.
- Component detail rules for button anatomy, feedback level, spacing rhythm, and desktop/tablet/mobile behavior.
- UI primitive replacements for browser dialogs, unstyled native selects, copy/export feedback fallbacks, confirmation flows, and overlay behavior.
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

For existing-project feature work, define the reuse baseline before editing:

- Existing select/dropdown, button, table, statistics, modal/drawer, form/filter, pagination, icon, and feedback examples to follow.
- Shared components or framework wrappers to reuse.
- New variants that are necessary, scoped, and compatible with existing call sites.
- Legacy constraints that should remain untouched, such as route structure, global CSS, state management, and layout shells.

When the chosen style has a strong structural identity, preserve that identity in a context-aware way:

- Editorial styles should rely on type, rules, columns, captions, and index rhythm before cards.
- Console styles should foreground logs, tables, traces, commands, or workflow evidence before decorative hero art.
- Poster/campaign styles should use slabs, stamps, tickets, marquees, or bold conversion modules before neutral SaaS panels.
- Tool and dashboard styles should expose filters, states, owner/action rows, dense data, and controls before marketing copy.
- Experimental styles should keep stable anchors for navigation, actions, and body text even when the visual field is expressive.

## 9. Run The Implementation Compliance Gate

When the task touches real UI code, generated HTML, or a page implementation, check the result against `interface-compliance.md` and `component-implementation.md` before final visual approval. Add `motion-guidance.md` when motion exists or is changed. For local patches, also check `local-ui-patch.md`.

Run these focused gates and use the referenced files for detail:

- `interface-compliance.md`: semantic controls, focus-visible, accessible names, responsive order, text fit, stable media, motion, product state, and empty/error/loading recovery.
- `component-implementation.md`: button hierarchy, form/select/menu states, table states, overlay states, density, destructive variants, and style-consistent component anatomy.
- `ui-primitive-contract.md`: no product-facing browser dialogs, no unstyled native selects for designed controls, no hidden focus rings, no `transition: all`, and a targeted anti-pattern scan for changed UI files.
- `existing-project-integration.md`: project wrappers, tables, statistics blocks, modals/drawers, filters/forms, pagination, icons, feedback, and responsive patterns match nearby production examples.
- `local-ui-patch.md`: target and neighbor regions still belong to the existing page system.
- New project metadata: title, description, real `favicon.ico` for static/plain apps or a framework favicon route, app/touch icons when useful, and no default framework branding.

Audit output:

- When reporting issues, group by file and line when available.
- When reviewing screenshots, group by page region.
- Lead with P0 and P1 issues before polish.
- If implementing fixes, re-check the changed regions before final response.

Only skip this gate for pure style selection, text-only analysis, or tiny static mockups where no implementation details exist yet.

## 10. Verify Before Finishing

Before final response after implementation, check:

- Page-level work names the layout archetype, primary content object, action model, responsive collapse, selected style, and design dials when relevant.
- The UI is adapted to the user's real product and does not copy sample HTML, sample copy, or a repeated generic layout skeleton.
- Local patches preserve the target and neighbor regions without introducing a conflicting visual language.
- Existing-project work names the project patterns reused for selects/dropdowns, buttons, paginated tables, statistics blocks, modals/drawers, filters/forms, pagination, icons, feedback, and responsive behavior.
- Changed UI avoids browser dialog primitives and unstyled native select/dropdown controls, or documents a real project exception.
- New sites and apps include wired title, description metadata, real `favicon.ico` or a framework favicon route, and no default framework branding.
- Anti-generic rules, text fit, desktop/mobile hierarchy, focus-visible, icon consistency, and component states are re-checked.
- Preview assets, screenshots, docs, or style prompts are regenerated when changing this skill's own library.
- Relevant checks have run, such as anti-pattern scan, syntax checks, preview generation, package dry-run, or project tests.

## 11. Explain The Result

Match the final explanation to the work mode so the report does not force page-level language onto local work.

- Page-level style selection, new pages, or redesigns: include the chosen style, layout archetype, design dials when relevant, why it fits, what structure was adapted to the real product, which visual rules were reused, compliance checks, and verification.
- Local UI patches: include the target region changed, existing system preserved, neighbor regions checked or adjusted, states/responsive/accessibility details improved, page-level redesign risk if any, and verification including screenshots when UI changed.
- Existing-project feature work: include the sibling pages or shared components inspected, component patterns reused, any new variant added, compatibility checks, and verification.
- Implementation compliance or design audit: include highest-priority findings first, file and line or page region, concrete fix or recommendation, remaining risks or test gaps, and verification.
- Design system output: include reusable rules created or updated, covered page types/components/tokens/states/responsive behaviors, how future pages should apply the rules, and verification.
