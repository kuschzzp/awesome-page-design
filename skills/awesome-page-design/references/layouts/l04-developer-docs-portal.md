# L04 - Developer Docs Portal

## Purpose

Use this framework for documentation sites, API references, SDK guides, and developer portals.

## Structure

- Top bar with product identity, search, version, and repository links.
- Prominent command-style search with keyboard hint and enough width for real queries.
- Left navigation for doc sections, grouped into guides and reference areas.
- Main article body with clear heading hierarchy, callout, compact guide cards, code sample, checklist, parameter table, and next/previous links.
- Right anchor navigation for page sections plus floating category tags.
- Code blocks, callouts, examples, and parameter tables.
- Previous/next navigation.

## Required States

- Search state with keyboard access.
- Current page and current anchor states.
- Code copy feedback.
- Version or language selector state.
- Tag/filter state for API, SDK, CLI, and examples.

## Responsive Behavior

- Collapse left nav into drawer.
- Hide or compress right anchors.
- Keep code blocks horizontally scrollable.

## Works Well With Visual Styles

X Primer Dev, J Terminal Hacker, Q Fluent Cloud, U Gov Service, I Swiss Editorial.

## Avoid

- Marketing-heavy hero sections inside reference docs.
- Low-contrast code blocks.
- Long paragraphs without headings or examples.
