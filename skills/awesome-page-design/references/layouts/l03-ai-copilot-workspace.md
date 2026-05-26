# L03 - AI Copilot Workspace

## Purpose

Use this framework for AI products where the user works with a main artifact while an assistant, agent, or copilot helps plan, edit, analyze, or execute tasks.

## Structure

- Left context rail for active runs, sources, memories, reviewers, and prior tasks.
- Main artifact canvas with an action toolbar, source-backed content block, evidence chips, claim review cards, artifact metadata, citation map, approval path, and run queue.
- Right copilot panel for chat, tool calls, reasoning summaries, and approval cards.
- Tool/action bar tied to the active artifact.
- Status area for running, blocked, completed, and failed tasks.

## Required States

- Streaming response.
- Tool running state.
- Human approval or confirmation state.
- Failed tool call with retry.
- Context missing state.
- Diff or compare state before applying AI edits.
- Citation coverage state that separates linked sources from missing evidence.

## Responsive Behavior

- Collapse copilot panel into bottom sheet or tab.
- Keep active artifact first.
- Preserve task status visibility.

## Works Well With Visual Styles

J Terminal Hacker, X Primer Dev, G Aurora Gradient, Q Fluent Cloud, V Spectrum Creative.

## Avoid

- Chat-only layout when the product has real artifacts.
- Hiding task status.
- Leaving the artifact canvas half-empty when the workflow needs review context.
- Treating AI output as final without review paths.
