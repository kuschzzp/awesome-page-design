# Layout Framework Index

Layout frameworks describe page structure, information hierarchy, navigation, density, and responsive behavior. They are not visual styles. Combine one layout framework with one visual style when the user needs both structure and look.

Every layout framework has a static HTML preview and PNG screenshot under `assets/layouts/<layout-id>/`. Use these previews for quick visual comparison only. They are intentionally structurally distinct so layout choice does not collapse into the same generic dashboard/card-grid pattern.

These previews are high-fidelity structural references rather than wireframes. They include realistic hierarchy, density, status areas, supporting context, and product-like content so agents can compare page frameworks before adapting them to the user's real product.

## Available Layout Frameworks

| ID | Layout Framework | Best For | Structure Signal |
|---|---|---|---|
| L01 | Dense Admin Dashboard | operations, internal tools, metrics, management systems | app shell, filters, KPI row, tables, drill-down panels |
| L02 | SaaS Landing Page | product marketing, startups, conversion pages | hero, proof, feature sections, pricing, FAQ |
| L03 | AI Copilot Workspace | AI apps, agent tools, assistant-driven workflows | main canvas, right copilot panel, task queue, context rail |
| L04 | Developer Docs Portal | API docs, SDK docs, technical guides | left nav, search, article body, right anchors |
| L05 | Editorial News Homepage | media, content sites, research digests | lead story, secondary stories, topic rails, trending list |
| L06 | Ecommerce Admin Console | merchant tools, order systems, inventory | resource lists, bulk actions, status chips, detail drawer |
| L07 | CRM Sales Workspace | sales, support, customer operations | pipeline, account list, detail panel, activity timeline |
| L08 | Analytics Command Center | BI, monitoring, finance, product analytics | filter bar, KPI grid, chart matrix, drill-down table |
| L09 | Portfolio Case Study | studios, personal portfolios, agency work | project hero, narrative sections, proof, next case |
| L10 | Settings Console | security, admin settings, integrations, account config | grouped navigation, forms, permission panels, audit trail |
| L11 | Onboarding Wizard | setup flows, imports, account activation | steps, validation, preview, completion state |
| L12 | Marketplace Catalog | app stores, templates, resources, product catalogs | search, filters, category nav, cards, comparison/detail view |
| L13 | Admin Overview Command Center | admin homepages, SaaS consoles, executive status overview | persistent admin nav, hero status block, KPI grid, heatmap, leadership notes |
| L14 | Master Detail Admin Table | resource management, users, approvals, database-like admin UI | saved views, filter rail, data table, detail inspector |
| L15 | Operations Timeline Console | incidents, deployments, support, fulfillment workflows | queue rail, event timeline, current runbook/detail panel |
| L16 | Personal Portfolio Home | designers, engineers, consultants, personal brand sites | personal nav, large intro, selected work grid, project highlights |
| L17 | Personal Writing Home | blogs, newsletters, researchers, creators | author profile, article feed, topic index |
| L18 | Corporate Homepage | B2B companies, professional services, corporate presence sites | corporate nav, trust-led hero, proof strip, solution cards |
| L19 | Corporate Services Site | agencies, consultancies, solution providers | service hero, sticky services nav, process/service cards |
| L20 | Enterprise Product Overview | platform websites, product suites, trust-heavy product pages | product nav, platform hero, stacked product visual, module cards |

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
- Use L14 for table-first resource management: saved views, column controls, selected row, bulk edit, and detail inspector.
- Use L15 for event operations: timeline stream, queue rail, SLA clock, escalation state, and runbook progress.
- Use L02 for conversion-led SaaS marketing, L18 for company credibility, L19 for service/process selling, and L20 for enterprise product-suite overview.

## Combination Prompt

```text
Use awesome-page-design visual style: Version R - Carbon Enterprise.
Use layout framework: L01 - Dense Admin Dashboard.
Apply both, but design the actual layout around the product requirements.
```
