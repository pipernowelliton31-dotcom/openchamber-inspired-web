
# OpenChamber-inspired Web

Create an original, usable product interface that *adopts principles* observed in OpenChamber, not a clone of its brand or proprietary marketing art. The reference is OpenChamber v2.7.0 (2026-11-08), with a separately observed download/landing-page capture. The app repository and marketing-site implementation are distinct sources; never pretend that the landing CSS is present in the repo.

## Mission

Build calm interfaces where hierarchy is created through readable typography, spacing, soft tonal differences, and controlled depth. Prioritize functionality and behavioral polish over decorative novelty. Aim for "quiet at rest, precise when active."

## Entry procedure

1. Identify the requested surface before coding: `landing`, `agent-workbench`, `hybrid`, or `restyle-existing`.
2. Preserve the user's content, brand, technology stack, information architecture, and requested interactions. The palette is an adaptation, not a reason to rewrite product semantics.
3. Inspect the current repository before editing. Determine routes, components, CSS strategy, bundler, state management, icons, dark-mode mechanism, accessibility conventions, and tests. Prefer compatible libraries already installed.
4. Load only relevant reference pages below. For a fresh site, consider copying and adapting `assets/starter/` with `scripts/scaffold.py` before replacing placeholder content.
5. Implement **functional interactions**: links navigate, switches alter state, tabs switch content, mobile navigation opens/closes, and input has a meaningful response. If an AI backend is absent, expose a clearly labeled demo action rather than pretend a model was called.
6. QA actual rendered output at desktop (1440x900), tablet (768x1024), and phone (390x844); include light and dark where supported. Fix overflow, crushed columns, muddy contrast, fixed controls obscuring content, and layout shifts before delivery.
7. Deliver source files and concise notes: what was built, how to run, and which views/interactions were verified. Do not report unexecuted tests as passed.

## Design invariants

- **Flat information; raised controls.** Separate passive sections by tonal steps or whitespace, not by nested outlines. Give clickable controls a subtle hairline and short shadow. Reserve floating depth for menus/popovers.
- **Color means something.** Keep neutral text and surfaces quiet. Use accent for a primary action, selection to indicate the active view, status colors only for actual success/warning/error/running states.
- **Few controls at rest.** Put rare actions in a menu; use hover to reveal secondary actions without shifting layout. On mobile do not hide essential actions solely behind hover.
- **Stable interaction geometry.** No width changes on hover, loading buttons preserve dimensions, selection changes color rather than layout, composer grows away from typing point, side panels leave a readable center.
- **No card-in-card framing.** Nested surfaces should use another subtle tone step rather than compound shadows and borders.
- **Typography does the work.** Distinct display / body / metadata roles, restrained weights, comfortable CJK fallback, compact readable UI; never shrink informative text solely to fit density.
- **Motion has a job.** Popup reveal and layout adaptation are short and calm; endless motion only for real ongoing progress, with reduced-motion support.
- **Accessible by default.** Semantic controls, visible keyboard focus, adequate text contrast, 44px touch targets on mobile, label every icon-only control.

## Reference selection

| Need | Read |
|---|---|
| Understand upstream provenance and avoid false source claims | `references/source-audit.md` |
| Colors, Fixel setup, dimensions, elevation, dark theme | `references/tokens-and-type.md` |
| Landing, console, contextual rails, mobile adaptation | `references/layout-recipes.md` |
| Reusable component rules, interaction states, behavior | `references/component-contracts.md` |
| Agent semantics, session/context/worktree UI, honest states | `references/agent-workbench.md` |
| Implementation phases, prompt recipes, QA and rubric | `references/build-and-qa.md` |

## Execution paths

### Landing / product website

- Start with a floating *content-width* capsule navigation rather than a solid full-bleed header, unless accessibility or requested brand requires otherwise.
- Use a two-level hero: concise confident title and short supporting copy, followed by one primary and one secondary CTA.
- Reserve the most distinctive art for one section. Favor original muted illustration, atmospheric CSS shapes, or user-provided photography; never reuse OpenChamber trademarks or artwork.
- Alternate airy copy-led sections with wider functional product visuals. Keep a narrower reading column than screenshot/media width.
- Subsequent sections: outcome-led heading, 2-3 line explanation, product UI proof, then generous vertical break. See `references/layout-recipes.md`.

### Agent workbench

- Use a clear mental model: left task/session navigation, central active transcript or work surface, contextual right rail or inspectable overlay.
- Treat context, tools, usage, files, and state as **secondary context**, not as competing primary content.
- Reserve height for the transcript: one header row per surface, minimize stacked toolbars and duplicate titles.
- Render session names, run state, timestamps, model identity, and real activity as scan-friendly metadata; keep tool activity inspectable but collapsed at rest.
- When panels open/close, preserve reading/scroll position and composer focus. See `references/agent-workbench.md`.

### Restyle existing app

- Take an inventory of components and states before editing. Create semantic theme variables and global primitives first; migrate screens incrementally, avoiding isolated one-off shadows and colors.
- Keep existing routes, events, keyboard shortcuts, data flow, permissions, and responsive behavior working. Update tests/snapshots where appropriate.

## Starter and assets

- `assets/starter/index.html`: original warm landing-page example (not OpenChamber artwork or logo).
- `assets/starter/workbench.html`: original three-zone Agent workbench example with meaningful demo interactions.
- `assets/starter/styles.css`: reusable tokens, typography, surfaces, responsive rules, dark mode.
- `assets/starter/app.js`: behavior for navigation, theme, session selection, composer, tab switches, demo feedback.
- `assets/starter/README.md`: demo usage and migration pointers.
- `scripts/scaffold.py`: copy the starter to a new directory and optionally replace display brand; tested and safe to rerun only with `--force`.
- `scripts/check_frontend.py`: non-invasive checks for required starter files and common design/accessibility regressions. Does not replace visual QA.
- `scripts/visual_smoke.py`: optional Playwright screenshots and interaction checks at three widths; requires Playwright and Chromium.

No font binaries or third-party branded assets are included. Fixel is referenced via its upstream font project, with normal CSS fallbacks. Copy the MIT attribution if you incorporate substantial OpenChamber code rather than merely derive design principles.

## Quality gate before final answer

- Visible typography hierarchy, warm-but-contrasting surfaces, flat tiles, sparse hairlines, tactile primary controls.
- Every visible interactive element works; empty/demo backend clearly labeled.
- Mobile sidebar and right rail adapt without horizontal page scroll.
- Keyboard focus, reduced-motion, theme, and loading states are handled.
- Visuals inspected, not merely compiled.
- Source inspiration correctly attributed, and finished site is its own brand.
