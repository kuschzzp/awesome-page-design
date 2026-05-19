# L03 - AI Copilot Workspace

## Purpose

Use this framework for AI products where the user works with a main artifact while an assistant, agent, or copilot helps plan, edit, analyze, or execute tasks.

## Structure

- Main work canvas for the primary artifact.
- Copilot panel for chat, suggestions, and reasoning summaries.
- Context rail for files, entities, memory, or selected objects.
- Task queue or run history.
- Tool/action bar tied to the active artifact.
- Status area for running, blocked, completed, and failed tasks.

## Required States

- Streaming response.
- Tool running state.
- Human approval or confirmation state.
- Failed tool call with retry.
- Context missing state.

## Responsive Behavior

- Collapse copilot panel into bottom sheet or tab.
- Keep active artifact first.
- Preserve task status visibility.

## Works Well With Visual Styles

J Terminal Hacker, X Primer Dev, G Aurora Gradient, Q Fluent Cloud, V Spectrum Creative.

## Avoid

- Chat-only layout when the product has real artifacts.
- Hiding task status.
- Treating AI output as final without review paths.
