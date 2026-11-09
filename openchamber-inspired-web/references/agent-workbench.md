# Agent workbench semantics (not just a skin)

A believable agent dashboard is not a generic chat box with a model drop-down. Organize the **work**.

## Primary entities

- **Project / space:** persistent grouping and working directory/context boundary.
- **Session / task:** ongoing conversation/execution unit, with title, timestamps, status, and links to artifacts.
- **Run:** a particular model/agent execution; can expose elapsed time, tool calls, costs/tokens when available.
- **Context source:** files, issue, ticket, repository, citations, session references. Show source and scope explicitly.
- **Work artifact:** diff, file, preview, plan, chart, test result; preserve links between transcript and artifact.
- **Panel:** context/diff/file/browser/terminal for secondary inspection, rather than inline everything into chat.

## Task first, conversation second

Left rail: grouped active and historical tasks with states and gentle metadata. Center: latest active work, assistant narrative, compact tool activity. Right: source scope, session context and usage, current files/results. The interface should offer **return to task** rather than forcing the user to search raw chat logs.

## States and copy

| State | UI copy | Visual |
|---|---|---|
| idle | Ready | neutral |
| running | Working... | blue dot or restrained spinner |
| needs approval | Approval required | amber dot + actionable button |
| completed | Completed | green glyph |
| errored | Action failed | red glyph + Retry/Details |
| canceled | Stopped | neutral |

Do not use fabricated token counts, costs, model results, or code changes as if real. In static demos, call them sample data and mark output "Demo - not connected to an agent".

## Conversation structure

- Keep assistant text a readable column ~650-760px; code/diffs may expand on demand.
- Differentiate user and agent turns subtly, without chat bubbles everywhere.
- Tools should collapse to an activity summary: `Read 3 files · Ran 2 commands · Updated draft`. Provide details on click.
- During streaming, reserve height for status, keep bottom-follow behavior conditional on whether user manually scrolled, and preserve scroll on panel changes.
- A branching/side-chat product should preserve anchor location; don't force users to pan across a canvas for simple sub-questions.

## Model selection, cost, and permissions

- Put model selection with composer or header, not scattered across several surfaces.
- Show reasoning/effort only if API actually supports it.
- For dangerous actions, permission request must include scope and explicit choices. Never bury approvals in status color alone.
- Cost/tokens are shown only when measured or provided; a dash is better than invented accuracy.

## Linkage to upstream

OpenChamber's own app has panels for `chat`, `file`, `diff`, `walkthrough`, `browser`, `git`, `terminal`, and other modes in `ContextPanel.tsx`; its `MainLayout.tsx` composes sidebar, chat region, and context zones. These are **patterns** worth adapting, not a requirement to implement all tools in a new project.
