# Component, state, and motion contracts

## Component family (framework-agnostic)

| Component | Rest | Interact | Notes |
|---|---|---|---|
| Nav capsule | Warm opaque background, subtle ring + short shadow | Text darkens on hover | Width fits content, no full-screen nav bar by default |
| CTA button | Warm tinted fill, restrained edge | Fill slightly strengthens | 30-40px desktop; 44px phone when primary |
| Tile | Flat tone step; no default shadow | If clickable, only subtle hover fill | Do not nest shadow cards |
| Context panel | Quiet surface, one header | Tab changes content in place | Avoid scrolling whole page |
| List row | One-line title, compact metadata | Show extra actions on hover/focus | On touch, menu remains discoverable |
| Segmented option | Recessed track, raised selected item | Selected stays same geometry | Avoid shifting labels |
| Composer | Opaque raised surface, good focus | Loading leaves dimensions stable | Footer buttons grouped by purpose |
| Dropdown / popover | Top lit hairline, layered shadow | Fade+translate 150-250ms | Follow viewport boundaries |
| Status | Small semantic dot + text | On update, reserve size | Color only for state |
| Modal | One title + clear action | Focus managed, Escape closes | Avoid multiple toolbar layers |

## Interaction rules

1. Initial focus must be meaningful; `:focus-visible` must work for keyboard, even if the upstream app sometimes chooses hover-colored focus instead of a ring.
2. Button `type="button"` unless it submits. Icon-only buttons need a stable accessible name.
3. Secondary actions may appear on hover/focus only if keyboard and mobile can reach them; no opacity-0 pointer trap.
4. Loading and error UI occupy reserved slots; avoid layout pushing around the input.
5. Use *real* state semantics: `aria-pressed` for toggles, `aria-selected` on tab patterns, `aria-expanded` for menus/panels, `aria-live` for progress where helpful.
6. Copyable text should copy its actual value and confirm action briefly. Demos may show a notification, but must not claim network or LLM work occurred.
7. Long paths truncate from the middle or end with a tooltip/title; do not unexpectedly wrap a dense header.
8. Continuous spinner only while actually waiting. Static successful/failed state is a glyph and label, not a perpetual pulse.

## Motion guidelines

- Button hover 120-160ms ease-out, only color/background/opacity and short transforms.
- Popover open 180-250ms, close 100-130ms. Translate/opacity preferred.
- Panel width or height layout transitions 220-300ms only when deliberate; skip on reduced motion.
- If using spring-like animation, generate CSS `linear()` easings or a spring library in existing stack; avoid `transition: all`.
- Reserve scroll gutters and consistent loading heights; minimize layout movement. Scroll position is a first-class state for chat UI.

## Browser details

- `color-scheme: light` and `dark` per theme for form widgets.
- On mobile, use `100dvh` and safe-area support where a bottom composer docks.
- Avoid backdrop blur on a permanent overlay covering frequently streaming text; opaque, raised surfaces are cheaper to repaint.
- Use `overflow: hidden` in app shell and `overflow: auto` on named scroll panes; landing pages retain natural document scroll.
- Keep line-height on streaming responses pixel-aligned when possible to avoid bottom-anchor drift.
