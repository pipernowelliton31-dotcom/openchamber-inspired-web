# Build process, prompt recipes, and QA rubric

## Build process

1. Decide surface and content model: marketing, app, hybrid, docs, learning tool, or redesign.
2. Capture 5-10 real components/states from the user's app. Identify routes, controls, error/loading states, long titles, and mobile behavior.
3. Implement tokens and typography (one source), then primitives, then page layout, then features. Avoid hand-tuning every component in isolation.
4. Start with a working design skeleton before polishing motion. Use `assets/starter/` only as an initial reference/boilerplate, not as a mandated framework.
5. Replace placeholder copy with actual domain language and real data connections. Avoid duplicating the source product's brand, copy, and art.
6. Capture desktop, tablet, and mobile screenshots. Iterate until readable/interactive without clipping.
7. Verify controls with browser interactions; run project build/lint/tests as available. Check tab order, open modal, composer focus, long user text, empty/error/loading, and dark theme.
8. State what is demo-only, what is implemented, what is untested.

## Prompt recipe: agent console

> Build a production-quality AI agent workbench with a warm, restrained editorial UI inspired by OpenChamber's *design principles*, not its branding. Use an off-white canvas, quiet flat list tiles, tactile half-pixel button elevation, readable 14-16px text, a left session rail, a centered chat/work column, and an optional right context inspector. Provide compact model selection, an activity trail, semantic run statuses, keyboard focus, responsive drawers, dark mode, and a stable composer. Every control must work or be explicitly labeled demo-only. Verify at 1440/768/390 widths.

## Prompt recipe: marketing site

> Design a calm original AI tools landing page: compact floating capsule navigation, one expressive hero with restrained original warm artwork, concise 2-line headline, one warm primary CTA, an actual app preview, airy editorial content sections, Fixel-like humanist typography with CJK fallback, generous vertical rhythm, and minimal footer. Avoid stock SaaS gradients, card spam, thick borders, and cloned OpenChamber branding. Responsive, accessible, and runnable.

## Prompt recipe: redesign

> Retain existing features, routes, data, and keyboard behavior. Inventory current components; introduce semantic warm surface tokens, compact type roles, three depth levels, sparse borders, quiet status colors, and motion-stable controls. Update components incrementally; verify old interactions did not regress and audit 1440/768/390 plus light/dark.

## Visual QA checks

- [ ] Only 1-2 visual focal points per viewport, no gratuitous gradients or filler cards.
- [ ] Content and control spacing look consistent; no arbitrary radius/shadow drift.
- [ ] Main prose line lengths are comfortable; metadata readable and not opacity-washed.
- [ ] Surface hierarchy understandable even without obvious outlines.
- [ ] Accent is mostly CTA/current focus; status color signals meaningful state.
- [ ] 1440px: 3-column center readable; 768px: inspector collapses; 390px: no horizontal document scroll.
- [ ] No clipped dropdown, hidden icon hitbox, swallowed keyboard focus, or uncloseable mobile rail.
- [ ] Light and dark text contrast remain useful.
- [ ] Reduced motion works and ongoing animations stop when no longer active.
- [ ] Loading/error/empty states do not displace controls unexpectedly.
- [ ] Demo interactions do not impersonate live AI, network, or real billing data.

## Recommended minimum smoke sequence

Open landing, follow CTA to workbench, select a session, change tabs, open/close Inspector, open/close mobile rail, switch theme, type and submit a prompt (see explicitly labeled demo acknowledgement), navigate back. Verify title and layout at all widths. Automated scripts are supplements, not evidence of visual quality without screenshots.
