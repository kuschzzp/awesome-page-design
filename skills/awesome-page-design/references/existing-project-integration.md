# Existing Project Integration

Use this for UI work inside an existing frontend, including legacy business systems. Reuse the product's language unless the user requests a redesign. The decision precedence is in [SKILL.md](../SKILL.md).

## Inspect Before Designing Or Coding

Read current target files, then the nearest sibling page that solves the same job. Trace its shared components or framework wrappers, relevant tokens/theme values, global styling constraints, and state/data conventions. Identify concrete source examples rather than assuming the framework's defaults are the product standard.

Inspect only families touched by the request: for example a filter/table feature needs the existing search area, table, row actions, pagination, and detail flow; it does not require inventorying every modal or chart in the app. Match relevant control dimensions, density, icon source, terminology, spacing, state treatment, and responsive conventions.

When examples disagree, prefer the nearest compatible, most reused, or newest production pattern and state which you followed. Accessible behavior takes priority over legacy defects.

## Reuse And Compatibility

- Prefer the product wrapper and its props/slots over a raw framework component. Add a narrow variant only for a missing state or hierarchy; inspect affected call sites when changing shared code.
- Preserve route structure, state management, layout shells, naming conventions, preprocessors, and component APIs unless the requested feature requires changes.
- Avoid a new dependency, icon family, styling system, or component engine for a local feature when an existing pattern can solve it. A style choice is not a reason to replace project infrastructure.
- Reuse the current token and density system; translate a selected visual direction into those primitives instead of importing preview HTML.

Component behavior and verification belong to [component-implementation.md](component-implementation.md) and its focused pattern contracts. Primitive acceptance and the final scan belong to [ui-primitive-contract.md](ui-primitive-contract.md), rather than a second set of integration-specific component rules.

## When Local Reuse Is Insufficient

If the request depends on missing page-level state, incompatible information architecture, or widespread accessibility/responsive defects, explain which existing patterns were checked and why a narrow variant cannot solve it. Implement the compatible portion within scope and propose broader work where needed; inconsistency alone is not authorization to reset the product's design.

Before finishing, compare affected components with the chosen production example and disclose any intentional difference. Keep concrete reuse evidence: the nearby source path, the component/helper/API used, and where the changed flow calls it. An import alone does not demonstrate reuse when the rendered flow bypasses it. For shared changes, inspect the existing callers that could inherit the new behavior. Report the relevant evidence, added variants, and compatibility checks once through [workflow.md](workflow.md).
