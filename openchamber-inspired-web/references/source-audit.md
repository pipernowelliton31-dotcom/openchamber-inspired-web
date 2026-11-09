# Source audit and provenance

## Scope (pinned to 2026-11-09 research)

Reference repository: https://github.com/openchamber/openchamber
Inspected release/tag: `v2.7.0` (Nov 8, 2026). The codebase is a monorepo, not a marketing-only frontend repository. Its main interactive app is under `packages/ui`, with surrounding web serving, Electron, mobile, SDK, and editor packages.

The user's screenshots show `openchamber.dev/download` and Chrome DevTools reporting Fixel Text Regular/Medium as rendered fonts. The user's 5-page PDF shows the *marketing website*. The download landing's exact HTML/CSS source was **not established** within the public `openchamber/openchamber` repository. Do not claim that an invented landing-style variable or layout value is an extracted source value.

## Provenance map

| Domain | Upstream file (tag) | What it proves |
|---|---|---|
| UI behavior guidelines | https://github.com/openchamber/openchamber/blob/v2.7.0/.agents/skills/openchamber-ui-guidance/SKILL.md | Flat layouts, raised controls, quiet-at-rest, stability, spacing, density, mobile rules |
| Surfaces guidelines | https://github.com/openchamber/openchamber/blob/v2.7.0/.agents/skills/openchamber-ui-guidance/references/surfaces.md | `oc-tile`, inset, raised, floating, edge; what not to box |
| Theme instructions | https://github.com/openchamber/openchamber/blob/v2.7.0/.agents/skills/theme-system/SKILL.md | Semantic tokens, buttons, motion contracts |
| Theme examples | https://github.com/openchamber/openchamber/blob/v2.7.0/.agents/skills/theme-system/references/tokens-and-examples.md | Source semantic token families |
| Actual CSS | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/styles/design-system.css | Exact app OKLCH values, elevation, motion variables |
| Type roles | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/styles/typography.css | UI sizes and narrow chat column |
| Font choices | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/lib/fontOptions.ts | Fixel Text via MacPaw repository CDN, 400/500/600, fallback families |
| Button primitives | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/components/ui/button-variants.ts | cva variants, compact heights, no accidental random design |
| Dropdown primitives | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/components/ui/dropdown-trigger.ts | One shared 28px desktop trigger |
| Workspace structure | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/components/layout/MainLayout.tsx | Sidebar, chat, left/bottom/right context zones |
| Sidebar width | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/components/layout/Sidebar.tsx | Nominal 280px, clamp 264-500px in app |
| Context panel | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/components/layout/ContextPanel.tsx | Min width 320px; preserve >=320px chat |
| Motion source | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/src/lib/motion/springs.ts | Popup/layout spring specs, CSS linear() easing |
| App dependency stack | https://github.com/openchamber/openchamber/blob/v2.7.0/packages/ui/package.json | React, TS, Tailwind 4, Base UI, CVA, motion, virtual lists, etc. |
| Repo license | https://github.com/openchamber/openchamber/blob/v2.7.0/LICENSE | MIT, copyright 2025 Bohdan Triapitsyn |

## What is directly observed vs adapted

**Directly supported by upstream:** app design rules; UI source file structure; Fixel Text selectable typography; actual app OKLCH/light/dark token system; purposeful 3-level elevations; spring durations; responsive sidebar and context rail concepts.

**Observed in marketing screenshots only:** floating capsule page navigation, ivory backdrop, peach editorial hero landscape, download rows, airy alternating editorial marketing sections. These can be adapted aesthetically, but are not represented as verified exact repository CSS.

**Original to this skill:** `assets/starter/` logo, name, content, decoration, CSS, JS, landing composition, and demonstration UI. Colors are intentionally similar in *character*, not copied from a brand palette.

## Licensing and responsible use

OpenChamber is MIT licensed; substantial source reuse requires retention of the MIT notice. Design patterns and ideas can inform original code. The Fixel font project has its own license and must be acquired from its authorized source; **no font binaries are shipped here**. Do not copy OpenChamber branded artwork, illustrations, screenshots, icons, or product claims into a customer's site without permission. Do not use the OpenChamber name as the name of a new product.
