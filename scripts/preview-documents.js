const { allStyles } = require("./preview-catalog");
const { getScenario } = require("./preview-scenarios");
const { getStylePlaybook, getGeometryProfile, getImplementationProfile, getAdaptationProfile } = require("./preview-style-profiles");

function renderStyleDoc(style) {
  const label = style.label || `Style ${style.id}`;
  const scenario = getScenario(style);
  const playbook = getStylePlaybook(style);
  const geometry = getGeometryProfile(style);
  const implementation = getImplementationProfile(style);
  const adaptation = getAdaptationProfile(style);
  const notes = style.notes.map((note) => `- ${note}`).join("\n");
  const features = scenario.features.map(([title, body]) => `- ${title}: ${body}`).join("\n");
  const queue = scenario.queue.map(([title, state]) => `- ${title}: ${state}`).join("\n");
  return `# ${label} - ${style.name} (${style.zhName})

## Summary

${style.brief}

Chinese summary: ${style.zhBrief}

## Best For

${style.bestFor}

## Example Scenario

- Product sample: ${scenario.brand}
- Page job: ${scenario.eyebrow}
- Headline: ${scenario.headline}
- Primary action: ${scenario.primaryAction}
- Secondary action: ${scenario.secondaryAction}

## Scenario Components

${features}

## Example States

${queue}

## Layout Pattern

- Pattern: ${playbook.name} (${playbook.zhName})
- Archetype: ${playbook.name}
- Structure: ${playbook.structure}
- Adaptation: Define the user's real primary content object, top-level regions, main action model, density, and responsive collapse before applying the visual language.
- Typography: ${playbook.typography}
- Components: ${playbook.components}
- Buttons: ${playbook.buttons}
- Icons and media: ${playbook.media}
- States: ${playbook.states}
- Avoid: ${playbook.avoid}

## Visual Language

- Background: \`${style.bg}\`
- Surface: \`${style.surface}\`
- Text: \`${style.text}\`
- Muted text: \`${style.muted}\`
- Primary: \`${style.primary}\`
- Accent: \`${style.accent}\`
- Border: \`${style.border}\`
- Radius: \`${style.radius}\`
- Panel radius: \`${geometry.panel}\`
- Control radius: \`${geometry.control}\`
- Chip radius: \`${geometry.chip}\`
- Media radius: \`${geometry.media}\`
- Geometry rule: ${geometry.description}; avoid making every button and card the same large rounded rectangle.
- Shadow: \`${style.shadow}\`

## Component Detail System

- Button system: ${implementation.buttons}
- Feedback and alerts: ${implementation.feedback}
- Spacing system: ${implementation.spacing}
- Responsive behavior: ${implementation.responsive}

Chinese implementation notes:

- 按钮细节：${implementation.zhButtons}
- 提示与反馈：${implementation.zhFeedback}
- 间距系统：${implementation.zhSpacing}
- 响应式策略：${implementation.zhResponsive}

## Page Adaptation Guide

- Landing page: ${adaptation.landing}
- Dashboard: ${adaptation.dashboard}
- Admin panel: ${adaptation.admin}
- Forms, tables, and data: ${adaptation.forms}
- Mobile: ${adaptation.mobile}
- Not a good fit for: ${adaptation.unsuitable}

## Usage Notes

${notes}

## Continue

Apply this direction through the [workflow](../workflow.md); use the shared [design dials](../design-dials.md) and [implementation checks](../interface-compliance.md) only as needed. The rules above describe this style; shared process and accessibility requirements are maintained in those references.

Copy task-specific English or Chinese prompts from the [preview gallery](../../assets/previews/index.html). Adapt the sample's visual language to the real product rather than copying its brand or page structure.
`;
}

function renderStyleIndex() {
  const rows = allStyles
    .map((style) => {
      const playbook = getStylePlaybook(style);
      return `| ${style.label || `Style ${style.id}`} | [${style.name}](styles/${style.slug}.md) | ${style.zhName} | ${style.bestFor} | ${playbook.name} | ${style.brief} |`;
    })
    .join("\n");
  return `# Style Index

This index summarizes all ${allStyles.length} available visual styles, numbered continuously from Style 01 to Style ${allStyles.length}. Use these styles as visual direction and design the actual page structure around the user's product. Choose the user's layout archetype from \`layout-guidance.md\` before treating any style as a fixed page shape.

| Style | Name | 中文名 | Best For | Layout Pattern | Visual Language |
|---|---|---|---|---|---|
${rows}

## Similarity Guardrails

- Do not collapse Style 03 Aurora Gradient, Style 08 Resonant Stark, Style 10 Dark Theme, Style 15 Liquid Glass, Style 18 Precision Futurism, and Style 21 Acid Design into the same generic dark SaaS page. They differ by atmosphere, restraint, contrast, material, precision, and experimental intensity.
- Do not collapse Style 09 Tech Minimal, Style 11 Structured Lines, and Style 12 Layered Material into one neutral white UI. They differ by whitespace, line structure, and elevation/tonal surface logic.
- Do not collapse Style 02 Block Brutalism and Style 17 Neo-Brutalism. Style 02 is the original warm block campaign style; Style 17 is higher-collision, giant-type controlled chaos.
- Do not collapse Style 04 Retro Y2K and Style 16 Retro Computing. Style 04 is candy/neon Y2K; Style 16 is pixel and old-operating-system texture.
- Do not turn Style 13 Bento Layout into a fixed template. Treat it as a modular visual composition style, not a required information architecture.
- Do not collapse Style 22 Art Deco, Style 24 Ink Wash, and Style 05 Swiss Editorial into one editorial page. They differ by gilded symmetry, scroll/paper rhythm, and strict modernist rules.
- Do not collapse Style 23 Wabi-Sabi and Style 20 Soft Pop into one warm rounded UI. Style 23 is quiet material restraint; Style 20 is friendly playful learning/product energy.
- Do not collapse Style 25 Blueprint, Style 18 Precision Futurism, and Style 26 Industrial Control into one technical dashboard. Style 25 is a measured plan sheet, Style 18 is a dark precision graph console, and Style 26 is rugged safety-critical operations.
- Use Style 02, Style 04, Style 07, Style 16, Style 17, Style 19, Style 20, and Style 21 only when the brand can carry a strong personality.
`;
}

module.exports = { renderStyleDoc, renderStyleIndex };
