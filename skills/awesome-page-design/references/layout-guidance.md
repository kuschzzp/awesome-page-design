# Layout Guidance

Use this reference before choosing or applying a visual style. Layout is not decoration; it is the structure that lets the user's real workflow make sense.

## Layout-First Rule

Choose the page layout archetype from the user's task before deciding how expressive the visual style should become.

A good page direction should name:

- The page job: what the user is trying to decide, compare, create, buy, read, approve, or monitor.
- The primary content object: table row, document, asset, lesson, incident, product, lead, report, file, message, or media frame.
- The main action model: create, approve, filter, compare, review, publish, buy, configure, continue, or recover.
- The top-level regions: navigation, filters, content surface, detail pane, action queue, inspector, timeline, proof area, or conversion area.
- The responsive collapse: what stays visible first on mobile, what moves into a drawer, and which actions remain reachable.

Do not start from a generic hero, three feature cards, and a final call to action unless the page is actually a marketing narrative.

## Decision Flow

1. Identify the page job and the primary content object.
2. Choose a layout archetype from the catalog below.
3. Define the hierarchy of regions before styling: persistent nav, transient filters, main content, detail view, proof, status, and actions.
4. Set density: sparse, normal, dense, or operational.
5. Pick or confirm the visual style.
6. Adapt the style's color, type, surfaces, buttons, media, and states onto the chosen layout archetype.
7. Verify desktop and mobile screenshots against the user's actual workflow.

## Layout Archetypes

| Archetype | Use For | Structural Pattern | Avoid |
|---|---|---|---|
| Operational Workbench | dashboards, admin panels, CRM, analytics, logistics, finance, support queues | App shell, filter rail, dense metrics, table/list, detail or action queue, visible state chips | Giant marketing hero, equal feature cards, decorative media |
| Data Review Console | AI ops, incident review, issue tracking, QA, security, observability | Split panes, traces/logs, evidence surface, status lanes, compact command actions | Atmospheric dark cards without data structure |
| Creation Studio | editors, AI builders, media tools, design tools, content creation | Canvas or editor center, tool rail, asset strip, inspector, preview, publish/export actions | Landing-page sections that hide the creation surface |
| Product Landing Narrative | SaaS, product launch, conversion pages | Offer, proof, demo/media, use cases, pricing or action module, supporting trust | Vague slogans, repeated cards, action hidden below decoration |
| Campaign Poster | launches, events, music/fashion drops, expressive announcements | Poster-first composition, bold type, schedule/ticket/proof blocks, focused conversion | Soft SaaS chrome, over-explained body copy |
| Editorial / Documentation | articles, docs portals, cultural pages, reports, knowledge bases | Reading column, table of contents, metadata rail, index rows, captions, code or evidence blocks | Card-heavy dashboards, vague hero art |
| Commerce Catalog | ecommerce, marketplaces, product selection, plan comparison | Search/filter/sort, product grid or list, compare surface, cart/action panel, inventory states | Hero-first pages when users need to browse and compare |
| Onboarding / Setup Flow | signup, configuration, migration, wizard, learning setup | Stepper, focused form, validation, progress, summary, support context, recoverable errors | Decorative steps without validation and state handling |
| Portfolio / Object Focus | portfolios, case studies, galleries, high-end object pages | One dominant object or project, quiet metadata, index navigation, restrained actions | Filling the page with equal generic cards |
| Touch Utility | mobile-first apps, wellness, routines, consumer utilities | Large tap targets, bottom or local actions, routine clusters, day/status panels, forgiving empty states | Dense desktop widgets squeezed onto mobile |

## Matching Layout And Style

Use the layout archetype as the skeleton of meaning, then let the visual style decide how that skeleton feels.

- A dashboard can use Card Grid, Structured Lines, Layered Material, Precision Futurism, or Liquid Glass, but it still needs filters, state, dense scanning, and real actions.
- A landing page can use Tech Minimal, Gradient Pop, Block Brutalism, Soft Pop, or Acid Design, but it still needs offer, proof, demo, and conversion flow.
- A developer tool can use Terminal Hacker, Precision Futurism, Structured Lines, or Tech Minimal, but it should foreground logs, traces, files, commands, and states.
- A content-heavy page can use Swiss Editorial, Resonant Stark, or Tech Minimal, but it should rely on reading order, metadata, captions, and index structure before decorative cards.

Do not force a chosen visual style's sample page structure onto a different product. Preserve the style's structural identity only when it supports the user's real workflow.

## Responsive Rules

- Operational workbenches: collapse filters into a drawer or top segmented row; preserve search, primary action, critical metric, and one active queue.
- Data consoles: keep the selected object and current status visible first; move secondary traces into tabs or accordions.
- Creation studios: keep the canvas/editor and primary action visible; move asset libraries and inspectors behind tabs or drawers.
- Product landing pages: preserve offer, primary action, and proof in the first viewport; avoid stacking so much hero text that the next section disappears.
- Editorial pages: keep reading width comfortable; move metadata and table of contents above or below the article on mobile.
- Commerce pages: preserve search/filter, product identity, price/state, and add/compare action.

## Anti-Patterns

- Do not use the same nav, hero split, metric strip, card grid, and bottom call-to-action across unrelated styles.
- Do not place dashboard tasks inside a marketing page shell.
- Do not make every layout a centered headline plus cards.
- Do not use equal card grids when the content has different urgency or job types.
- Do not put UI cards inside decorative section cards.
- Do not hide required controls behind vague icon-only actions.
- Do not let visual effects replace information architecture.

## Prompt Requirements

When creating or copying a style prompt, include:

- Layout archetype.
- Primary content object.
- Top-level regions.
- Main action model.
- Density target.
- Responsive collapse behavior.
- Style-specific visual language, buttons, media, and states.
- Explicit instruction not to copy the bundled sample layout.
