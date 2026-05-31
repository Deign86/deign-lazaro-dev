# System Patterns *Optional*

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2026-05-27 10:07:17 - Log of updates made.

*

## Coding Patterns
* **Multi-tier sort priority**: Sort functions use a 3-tier hierarchy: (1) FEATURED_PROJECTS first, (2) OLD_PROJECTS last, (3) timestamp-based ordering for everything in between. This pattern is replicated across all list-rendering functions in `github.ts` and `vercel.ts`.

## OpenCode Configuration Patterns
* **NEVER modify `oh-my-openagent.json` title agent** (lines 193-209). It controls session auto-naming via a hidden built-in `agent=title` that uses `small_model`. Changing its model or fallbacks breaks session auto-renaming. Use `small_model` in `opencode.json` (line 468) to change the naming model instead.
* **`small_model`** in `opencode.json` is the official mechanism for changing the model used by the hidden title agent for session naming.

## Architectural Patterns

*   

## Testing Patterns

*   