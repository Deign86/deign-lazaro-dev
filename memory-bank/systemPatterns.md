# System Patterns *Optional*

This file documents recurring patterns and standards used in the project.
It is optional, but recommended to be updated as the project evolves.
2026-05-27 10:07:17 - Log of updates made.

*

## Coding Patterns

*   **Multi-tier sort priority**: Sort functions use a 3-tier hierarchy: (1) FEATURED_PROJECTS first, (2) OLD_PROJECTS last, (3) timestamp-based ordering for everything in between. This pattern is replicated across all list-rendering functions in `github.ts` and `vercel.ts`.

## Architectural Patterns

*   

## Testing Patterns

*   