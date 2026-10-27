# Design Workflow

Use the task router in [SKILL.md](../SKILL.md) to select references. This file owns the execution sequence; detailed visual, component, and implementation rules live in their focused references.

## 1. Establish The Brief And Boundary

Identify the product's main job, primary content object, main action, audience, target device, and requested change. Infer routine choices from the request and current project; ask only for missing information that changes the outcome.

For an existing implementation, inspect the latest target files before deciding a solution. Use [existing-project-integration.md](existing-project-integration.md) for reuse and [local-ui-patch.md](local-ui-patch.md) for target/neighbor boundaries. Do not turn a local repair into a redesign.

For page-level work, choose the layout archetype from [layout-guidance.md](layout-guidance.md) before visual treatment. Name the top-level regions, action placement, density, and responsive collapse. For a local change, retain the current layout unless that is the cause of the problem.

## 2. Resolve Visual Direction Only When Needed

For a new page or explicit redesign:

- **Style already selected:** apply it and continue.
- **User explicitly asks you to choose and implement:** choose a fitting style, briefly state why, and continue without another approval stop.
- **Direction remains undecided:** present a short brief and the preview gallery or a 2–3 style shortlist, explain the useful differences, and wait for selection before final implementation. A request for recommendations alone calls for options, not an assumed implementation choice.

Existing-project features, local patches, component polish, and pure compliance audits retain the current system. Do not force a gallery selection for those tasks. If a broader visual change is necessary but outside the request, explain the dependency and propose it without silently widening the patch.

When previewing options is useful, serve the gallery from the repository with `npm run preview:serve`. In an installed skill with the bundled script available, use `node scripts/serve-preview.js`. Provide the printed URL ending in `/assets/previews/`; otherwise use `assets/previews/index.html` or [style-index.md](style-index.md) as a text fallback. An already chosen or directly delegated direction does not require opening the gallery. Stop any server you started when the task is finished unless the user wants it left running.

Choose the prompt type for the actual job: full, landing page, dashboard, admin panel, or mobile. When implementation is delegated, infer this choice and continue; do not add a second prompt-selection approval. Once direction is settled, read only the selected manual and its adaptation guide; infer the layout variance, motion intensity, and density from [design-dials.md](design-dials.md). For a requested sub-style, apply [variant-guidance.md](variant-guidance.md) without overriding the product's workflow.

## 3. Implement Within Scope

Reuse project tokens/components where present; otherwise define semantic tokens and component anatomy appropriate to the chosen direction. Translate visual rules into the real content, actions, and responsive structure using [usage-principles.md](usage-principles.md). Do not import the preview's sample copy, brand, or section sequence.

Apply only the component contracts relevant to changed interactions. For new sites/apps, implement the framework-specific metadata/favicon baseline in [new-project-shell.md](new-project-shell.md). A visual audit should produce findings first; an audit request alone does not authorize a redesign.

## 4. Finish And Report

For real UI code or generated HTML, check changed regions against [interface-compliance.md](interface-compliance.md), run the targeted scan from [ui-primitive-contract.md](ui-primitive-contract.md), and verify the applicable focused component contracts. For visual work, use [quality-checklist.md](quality-checklist.md). Pure style selection and text-only advice do not require implementation checks.

Verify the actual affected workflow and desktop/mobile behavior, including target and neighbors for local patches. Use available screenshots, code inspection, and proportionate project checks within the user's test permissions; a checklist does not authorize extra browser tests. Re-check changed files and any shared-component call sites affected by a new variant.

Finish with one compact completion record, scaled to the task:

- **Scope:** changed regions and the resulting user behavior.
- **Baseline and reuse:** the chosen visual direction, or concrete nearby source/component/API examples reused; mention added variants and affected call sites when relevant.
- **States:** the interactions and meaningful loading, empty, error and success states actually delivered in the changed flow.
- **Evidence:** checks actually run and their results. Distinguish source inspection, executable tests, browser interaction and screenshot review; one does not prove the others.
- **Open items:** unverified behavior, missing viewport/state evidence, remaining risks and intentional primitive exceptions.

Use only applicable entries; a selection-only answer does not need an implementation report. Audits lead with highest-priority findings and source lines or page regions. Do not repeat the full checklist in the delivery, or imply a check passed when it was not run.

When maintaining this skill, use `npm run docs` for generated text only; it leaves HTML and screenshots untouched. Use `PREVIEW_SCREENSHOTS=0 npm run previews` for intended HTML-only changes, or `npm run previews` when screenshots need updating. Respect browser-test permissions and run `npm run validate`; disclose stale screenshots if capture was not performed.
