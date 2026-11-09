# Tokens, typography, and depth

## 1. Foundational choices

Use an original warm interface palette with real hierarchy. Neutral space is the feature; accent is the punctuation.

| Token (starter) | Example | Role |
|---|---|---|
| `--page` | `#fbfaf7` | Ivory canvas, not pure white |
| `--surface` | `#f3f1ec` | Slightly darker app rail / list tiles |
| `--surface-2` | `#ebe8e1` | Soft nested/inset step |
| `--paper` | `#fffefa` | Tactile raised input and button |
| `--text` | `#2c2a27` | Warm near-black text |
| `--muted` | `#77736d` | Readable, not low-opacity text |
| `--line` | `#dfdbd3` | Edges only where needed |
| `--accent` | `#b45b37` | One warm terracotta active color |
| `--accent-soft` | `#f6e8df` | Quiet CTA background |

These are **original starter approximations** informed by screenshots, not direct `openchamber.dev` variables. For technical references, OpenChamber's default app light tokens include `oklch(0.97 0.02 85)` background, `oklch(0.25 0.02 40)` foreground, and `oklch(0.65 0.2 55)` primary, in `packages/ui/src/styles/design-system.css`.

Do not multiply accent hues to create hierarchy. Semantic color allocations: running/info = subdued blue; success = green; warning/approval = amber; error = red. Avoid coloring *all* task icons or project labels.

## 2. Fixel and multilingual fallbacks

OpenChamber's `fontOptions.ts` includes selectable `Fixel Text` weight 400, 500, 600; website DevTools screenshot renders Fixel Text. Fixel source: https://github.com/MacPaw/Fixel. Its local usage depends on font availability, so do not bundle a WOFF/TTF.

Suggested web stack:

```css
body {
  font-family: "Fixel Text", "Inter", "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
}
```

To fetch Fixel via a permitted CDN in a new site, follow the exact URLs published in the upstream `packages/ui/src/lib/fontOptions.ts` and check license/network policy; fallback is mandatory. For heavier typography, request/host licensed assets yourself instead of copying fonts from someone else's website. When mainly Chinese text is present, tune line-height (~1.6) and font fallback with care; do not assume Fixel contains Chinese glyphs.

Suggested type ladder for workbench (adjust as necessary):

| Role | Font size | Weight | Line height |
|---|---:|---:|---:|
| Main product/marketing heading | clamp(42px, 5vw, 74px) | 600 | 1.04-1.12 |
| Section heading | 30-42px | 600 | 1.12-1.18 |
| Workspace title | 17-20px | 600 | 1.25 |
| Body | 14-16px | 400 | 1.55-1.65 |
| Row / action | 13-14px | 500 | 1.4 |
| Metadata | 12-13px | 400 | 1.4 |

Upstream's internal UI examples use semantic text tokens such as 0.875rem markdown and UI header, 0.84375rem labels, 0.78125rem metadata. Use those as **density guidance**; not as a command to make landing page prose tiny.

## 3. Semantic surface vocabulary

- **Canvas:** warm, soft, static.
- **Tile:** flat slight tone change, usually borderless.
- **Tile inset:** a *single* additional tone step, not another shadowed card.
- **Raised control:** short shadow + half-pixel outline + top lit line, opaque.
- **Floating layer:** deeper layered shadow, optionally blur, for a menu/popover only.
- **Structural frame:** a quiet hairline when needed to delineate code editor, resizable pane, or text input.

Example original CSS shadows:

```css
:root {
  --elevation-button: 0 1px 1.5px rgb(32 28 23 / 0.07), 0 0 0 .5px rgb(32 28 23 / .13);
  --elevation-raised: inset 0 1px rgb(255 255 255 / .78), 0 0 0 .5px rgb(32 28 23 / .12), 0 4px 12px rgb(32 28 23 / .065);
  --elevation-float: inset 0 1px rgb(255 255 255 / .78), 0 0 0 .5px rgb(32 28 23 / .13), 0 12px 28px rgb(32 28 23 / .13);
}
```

The upstream app implements three elevation levels with similarly fine hairlines. These values here are intentionally re-authored, not copied verbatim.

## 4. Radius, rhythm, and spacing

- Layout width: landing `min(1120px, calc(100% - 48px))`, content text cap 560-700px.
- Workbench desktop: sidebar ~260-290px, center fluid, context 270-340px. Ensure center remains readable.
- Border radii: 6-9px small controls; 14-20px cards/panels; 9999px capsules.
- Use an 8px or 4px spacing scale, not arbitrary per-component margins.
- Marketing section vertical spacing: 96-152px desktop, 64-96px phone.
- App panels: maintain compact chrome; no repeated section titles and unnecessary toolbars.

## 5. Theme behavior

Define semantic colors once and switch them via root data attribute. Make all lines/shadows/text responsive to theme; do not invert photographs, icons, or status semantics blindly.

Dark example: `--page:#181716`, `--surface:#22211f`, `--paper:#292723`, `--text:#eeebe4`, `--muted:#b8b1a7`, `--line:#45413b`, `--accent:#e0a06a`.

Verify secondary text and controls retain usable contrast. Do not make all text semi-transparent. Respect `prefers-reduced-motion`; use `color-scheme` where native controls are involved.
