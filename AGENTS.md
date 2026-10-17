# Agent Instructions

<!-- context7:start -->
# Context7 — Documentation-First Development

**MANDATORY RULE**: Always invoke Context7 MCP before working with ANY library, framework, or repo.

## When to Use Context7

- Before reading, modifying, or creating code for any library/repo
- Before using any API, SDK, or framework feature
- Before making assumptions about how something works

## How to Use Context7

1. **Resolve library ID first**: `context7_resolve_library_id` with the library name
2. **Query documentation**: `context7_query_docs` with the resolved ID and specific question
3. **Verify against docs**: Check APIs, file paths, config schemas, and patterns
4. **Use Context7 version**: If docs show something different from your plan, use the docs version

## Applies To

- Any GitHub repo (Hermes, OpenCode, React, Python libs, etc.)
- Any framework (Next.js, FastAPI, Flask, etc.)
- Any language (Python, JavaScript, TypeScript, etc.)
- Any tool or service (Docker, Kubernetes, Firebase, etc.)
- Any API integration (OpenAI, Anthropic, OpenRouter, xAI, etc.)

## Why

Libraries and APIs evolve frequently. Context7 keeps you updated with the latest patterns instead of guessing or using outdated knowledge.

<!-- context7:end -->

<!-- lean-ctx -->
## lean-ctx

Prefer lean-ctx MCP tools over native equivalents for token savings.
Full rules: @LEAN-CTX.md
<!-- /lean-ctx -->

<!-- agentmemory:start -->
# AgentMemory — Persistent Cross-Session Memory

agentmemory MCP is configured for this repo. Server runs on localhost:3111.

## Available Tools

| Tool | Use for |
|------|---------|
| `memory_save` | Save important findings, decisions, patterns to long-term memory |
| `memory_recall` | Search past session observations for relevant context |
| `memory_search` | Hybrid semantic+keyword search with progressive disclosure |
| `memory_action_create` | Create tracked work items with dependencies |
| `memory_diagnose` | Run health checks on memory subsystems |

## Configuration

- **Project**: deign-lazaro-dev (C:\Users\Deign\Downloads\deign-lazaro-dev)
- **Working Features**: Basic memory operations (save, recall, search)
- **Disabled Features**: LLM-backed features (compress, reflect, slots) — no supported provider with credits

## Usage Rules

- **ALWAYS save important findings** to agentmemory after debugging or discovering non-obvious patterns
- Use `memory_recall` before starting work to check for relevant past context
- Tag memories with relevant concepts for better searchability
- Use `type` field: architecture, fact, workflow, bug, preference

<!-- agentmemory:end -->

<!-- clipboard-image-analysis:start -->
# Clipboard Image Analysis — Pasted Images

**MANDATORY RULE**: When the user pastes images (via clipboard or attachment), always attempt to analyze them using the available image analysis tools.

## When to Use

- User pastes an image into the chat/conversation
- User references "[Image N]" or attached screenshot
- User says "look at this" with an image reference
- Any visual context the user is providing that should influence decisions

## How to Use

1. **Try image analysis MCP first**: Use `1mcp_image_analysis_1mcp_read_image_via_vision_backend` with the image path
2. **Fallback to `look_at` tool**: If the CLI cannot read clipboard images (model limitation), use the `look_at` tool by Omo as the fallback
   - `look_at(file_path="<absolute path>", goal="<what to extract>")`
   - Also accepts `image_data` for base64 encoded clipboard images
3. **Never skip image analysis**: Even if you cannot see the image directly, use available tools. If all tools fail, inform the user that image input is not supported by this model and ask for text description.

## Why

Users often share screenshots of UI bugs, visual design references, error states, or deployment issues. These images contain critical context that cannot be conveyed through text alone.
<!-- clipboard-image-analysis:end -->


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
