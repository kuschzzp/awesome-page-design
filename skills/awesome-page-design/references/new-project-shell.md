# New Project Shell

Use this reference for new websites, web apps, dashboards, admin panels, landing pages, and shell-completeness audits. Browser-tab identity and document metadata are part of the finished UI, not optional cleanup.

## Framework Mapping

| Stack | Metadata location | Favicon output |
|---|---|---|
| Plain HTML | `<html lang>` and `<head>` in each entry document | Commit `favicon.ico` beside the public entry point and link `/favicon.ico` |
| Vite | Root `index.html`; app code may update route titles | Put `favicon.ico` in `public/` and link `/favicon.ico` |
| Next.js App Router | Export `metadata` from `app/layout.*`; use route metadata for route-specific titles | Add `app/favicon.ico`, or use the documented metadata icon route that emits the browser-tab icon |
| Nuxt | Configure `app.head` in `nuxt.config.*`; use route head metadata where needed | Put `favicon.ico` in `public/` and register `/favicon.ico` in head links |
| Astro | Set shell metadata in the shared layout `<head>` and pass page-specific values as props | Put `favicon.ico` in `public/` and link `/favicon.ico` |

Follow the project's established equivalent when its structure differs. Verify actual emitted HTML and public output rather than assuming a source filename is wired correctly.

## Required Baseline

- Set the correct document language with `lang`.
- Include UTF-8 charset and a responsive viewport declaration.
- Use a product-specific title and concise description; support route-specific titles for multi-page products.
- Produce a valid browser-tab icon through `favicon.ico` or the framework's favicon route.
- Remove starter titles, sample logos, default framework favicons, placeholder manifests, and template product names.
- Add app/touch icons and manifest metadata when installability, home-screen use, or a product requirement calls for them.

## Favicon Rules

- For plain HTML and conventional public folders, generate a real `favicon.ico`. An SVG icon may supplement it but does not replace it.
- Keep the mark legible at 16x16 and 32x32. Prefer a simple silhouette, initials, or product symbol over detailed artwork.
- Match the product palette while retaining contrast on light and dark browser chrome.
- Do not leave Vite, React, Next.js, Nuxt, Astro, or generic blank branding in the tab.
- If a framework route produces the browser-tab icon without a committed root `favicon.ico`, document that route and verify its response or build output.

## Conditional Metadata

- Add `theme-color` only when the browser chrome color is intentional; provide light/dark media variants when the product supports both themes.
- Declare `color-scheme` only when native browser surfaces and form controls are tested in those schemes.
- Add Open Graph, social-card, canonical, robots, or structured metadata only when the page is public and the product requirements call for it.
- Keep manifest names, short names, colors, and icons synchronized when the app is installable.

## Verification

- Inspect the rendered document head or framework build output for title, description, charset, viewport, and `lang`.
- Request or open the emitted favicon path and confirm it is a valid, non-empty icon rather than a starter asset.
- Check one deep route in multi-route apps so metadata does not disappear outside the home page.
- Check light and dark browser contexts when theme metadata or a transparent icon is used.
- Scan source and public assets for starter framework names and default icons.
- Report the favicon location or route and any intentionally omitted optional metadata.
