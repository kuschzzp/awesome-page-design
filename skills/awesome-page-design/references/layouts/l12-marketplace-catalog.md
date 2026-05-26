# L12 - Marketplace Catalog

## Purpose

Use this framework for app stores, template galleries, asset catalogs, plugin directories, and product collections.

## Structure

- Search hero with category chips or tab navigation.
- Filter sidebar or filter chips.
- Sort control and result count.
- Result toolbar with saved view, sort, and comparison actions.
- Spotlight recommendations or editorial picks.
- Card grid or resource list with realistic preview thumbnails, metadata, rating, and primary action.
- Featured or recommended collection that explains why resources belong together.
- Detail view, comparison view, or quick preview.

## Required States

- Search loading.
- No results.
- Filter selected state.
- Card hover/focus.
- Favorite, install, compare, or add action.
- Saved filters and selected category state.
- Featured collection empty, loading, and unavailable states when recommendations fail.

## Responsive Behavior

- Collapse filters into drawer.
- Keep search at top.
- Use fewer grid columns and stable card heights.

## Works Well With Visual Styles

B Card Grid, X Primer Dev, S Polaris Commerce, V Spectrum Creative, D Bento Grid.

## Avoid

- Cards with inconsistent action placement.
- Filters that are hard to clear.
- Placeholder-only gradient thumbnails that do not communicate the resource type.
- Detail pages that repeat the card without adding information.
- Marketplace pages where every result has the same visual weight and no curated recommendation.
