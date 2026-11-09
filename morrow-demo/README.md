# Morrow demo starter

This is an original, self-contained, two-page demonstration of the `openchamber-inspired-web` Skill's design principles. It is **not** an OpenChamber website export, product clone, functional AI engine, or licensed source asset bundle.

## Run

- Open `index.html` in a browser to inspect the marketing layout; click "Open demo" to enter `workbench.html`.
- For local serving and consistent browser security behavior: from this folder run `python -m http.server 8765` and open `http://127.0.0.1:8765/`.
- No install step or Node dependencies needed. The page loads Fixel Text from a public upstream CDN when online; use system font fallbacks when offline. Font binaries are **not included**.

## Demonstrated interactions

- Theme button toggles a genuinely styled light/dark theme (and persists preference if localStorage is available).
- Sidebar sessions update current title and central sample content.
- Search filters sessions; N creates a local demo session; `/` focuses session search.
- Inspector toggles; Overview and Files tabs switch panels.
- Composer appends a local sample prompt and honestly indicates there is no model connection. Ctrl/Cmd+Enter submits.
- At narrow widths the session sidebar becomes a drawer and the Inspector becomes an overlay. Escape and backdrop close them.

## Migrate to your actual agent product

- Replace the sample brand, context sources, session names, and preview art.
- Move design tokens into your framework's theme layer. Componentize nav, session row, context panel, transcript, and composer.
- Replace the fake sample content with actual session/task state and API actions. Never interpret demo text as model output.
- Maintain keyboard navigation, focus, accessible labels and responsive breakpoints.
- For a React project, use semantic buttons and `useState`/router state for toggles instead of manually mutating the DOM; the CSS tokens can be used as-is.

## Provenance

This starter is original example code influenced by OpenChamber's published UI principles and by user-provided visual observations. It does not bundle OpenChamber icons/brand artwork or font binaries. See `../../references/source-audit.md` for upstream links and licensing.
