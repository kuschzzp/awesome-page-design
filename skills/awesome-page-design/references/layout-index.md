# Layout Framework Index

Layout frameworks describe page structure, information hierarchy, navigation, density, and responsive behavior. They are not visual styles. Combine one layout framework with one visual style when the user needs both structure and look.

Every layout framework has a static HTML preview and PNG screenshot under `assets/layouts/<layout-id>/`. Use these previews for quick visual comparison only. They are intentionally structurally distinct so layout choice does not collapse into the same generic dashboard/card-grid pattern.

These previews are high-fidelity structural references rather than wireframes. They include realistic hierarchy, density, status areas, supporting context, and product-like content so agents can compare page frameworks before adapting them to the user's real product.

## Available Layout Frameworks

| ID | Layout Framework | Best For | Structure Signal |
|---|---|---|---|
| L01 | Dense Admin Dashboard | operations, internal tools, metrics, management systems | dark sidebar app shell, search/action header, exception alert, filters, KPI row, chart/table/queue tri-column, workload and system status panels |
| L02 | SaaS Landing Page | product marketing, startups, conversion pages | conversion hero, realistic product mockup, proof metrics, customer strip, outcome feature grid, workflow preview |
| L03 | AI Copilot Workspace | AI apps, agent tools, assistant-driven workflows | context rail, artifact canvas, source chips, claim review cards, citation map, tool trace, approval panel, run queue |
| L04 | Developer Docs Portal | API docs, SDK docs, technical guides | command-style search, grouped tag navigation, article body, callout, cards, code sample, parameter table, floating category tags |
| L05 | Editorial News Homepage | media, content sites, research digests | full-width masthead, category rail, lead story, field image, latest rail, four-story grid, most-read and subscriber modules |
| L06 | Ecommerce Admin Console | merchant tools, order systems, inventory | saved views, order analytics, search/filter toolbar, fulfillment lanes, order table, selected order drawer, inventory alerts |
| L07 | CRM Sales Workspace | sales, support, customer operations | China-style CRM side rail, sales KPIs, funnel chart, daily task circle, pipeline kanban, customer 360, collection and health panels |
| L08 | Analytics Command Center | BI, monitoring, finance, product analytics | dark multi-panel command center, variables, KPI strip, main chart, heatmap, anomaly rail, event stream, team actions |
| L09 | Portfolio Case Study | studios, personal portfolios, agency work | portfolio nav, sticky project metadata, narrative hero, prototype evidence, outcome metrics, story cards, evidence strip |
| L10 | Settings Console | security, admin settings, integrations, account config | settings side nav, action header, unsaved-change banner, summary metrics, role forms, permission matrix, integrations, audit log, danger zone |
| L11 | Onboarding Wizard | setup flows, imports, account activation | setup header, guided stepper, source selection cards, field grid, validation list, sticky launch preview, completion actions |
| L12 | Marketplace Catalog | app stores, templates, resources, product catalogs | search hero, category chips, filter rail, toolbar, spotlight recommendations, realistic preview cards, install actions, featured collection |
| L13 | Admin Overview Command Center | admin homepages, SaaS consoles, executive status overview | persistent admin nav, hero status block, KPI grid, heatmap, leadership notes |
| L14 | Master Detail Admin Table | evidence libraries, resource management, approvals, database-like admin UI | research evidence library, saved views, field controls, table search, record summary, selected record inspector, related records, comments |
| L15 | Operations Timeline Console | incidents, deployments, support, fulfillment workflows | queue rail, event timeline, current runbook/detail panel |
| L16 | Personal Portfolio Home | designers, engineers, consultants, personal brand sites | personal nav, strong positioning, profile card, proof chips, capability marquee, selected work grid, working notes |
| L17 | Personal Writing Home | blogs, newsletters, researchers, creators | profile rail, side nav, essay-led feed, featured essay, recent essays, newsletter strip, archive list, topic and reading rails |
| L18 | Corporate Homepage | B2B companies, professional services, corporate presence sites | trust-led corporate hero, customer proof, operations visual, evidence cards, audience routes, industry stories |
| L19 | Corporate Services Site | agencies, consultancies, solution providers | service hero, sticky engagement nav, primary offer panel, artifact preview band, hierarchical process cards, case proof row |
| L20 | Enterprise Product Overview | platform websites, product suites, trust-heavy product pages | product nav, governance hero, security chips, layered product visual, module matrix, proof row, buyer paths |

## Selection Heuristics

- Choose layout first when the user asks for page structure, workflow, information architecture, or a specific page type.
- Choose visual style first when the user asks for look, feel, brand mood, color, or personality.
- Combine both when the user asks for a complete page or app experience.
- Do not copy any sample section order as a hard requirement. Adapt the framework to the user's content and task flow.

## Similarity Guardrails

- Use L01 for dense management action: filters, KPI scan, priority table, and action queue.
- Use L08 for analytical exploration: dimension tabs, charts, anomaly/drill-down panels, and segment comparison.
- Use L13 for executive/admin overview: cross-team status, leadership exceptions, workload map, and decision prompts.
- Use L06 for ecommerce operations: saved views, bulk actions, fulfillment lanes, order table, and order drawer.
- Use L14 for table-first record work: saved views, field controls, search, selected row, detail inspector, related records, and comments.
- Use L15 for event operations: timeline stream, queue rail, SLA clock, escalation state, and runbook progress.
- Use L02 for conversion-led SaaS marketing, L18 for company credibility, L19 for service/process selling, and L20 for enterprise product-suite overview.

## Combination Prompt

```text
Use awesome-page-design visual style: Version R - Carbon Enterprise.
Use layout framework: L01 - Dense Admin Dashboard.
Apply both, but design the actual layout around the product requirements.
```
