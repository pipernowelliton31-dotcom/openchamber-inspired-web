# OpenChamber-inspired Web | reusable frontend skill

A portable, independent design-and-build skill for warm, calm AI agent workbenches and editorial marketing sites. It distills interface *principles* observed in the OpenChamber v2.7.0 repository and separate visual snapshots of its marketing website. This is **not an official OpenChamber skill**, a product clone, or an export of its marketing website source.

## Inside

- `SKILL.md` - when to activate, how to plan/build/QA an AI workbench, product site, or redesign.
- `references/` - upstream source audit, design tokens, type, layout, components, agent UX, and QA prompts.
- `assets/starter/` - dependency-free original two-page website (landing + functional demo agent console).
- `scripts/scaffold.py` - copy the starter into your own project directory.
- `scripts/check_frontend.py` - basic static checks.
- `scripts/visual_smoke.py` - optional Playwright screenshot and interaction test (requires `playwright` and Chromium).

## Install the Skill

Use your Skills interface to import `skill.zip`. For a code agent that reads local skill folders, place the extracted `openchamber-inspired-web` folder in your agent's supported skills directory. Keep references and assets together with `SKILL.md`.

## Use in prompts

- "Build an original responsive AI agent workbench inspired by OpenChamber's calm UI style. React + Tailwind, with working task navigation, chat transcript, context inspector, and dark theme."
- "Restyle my existing Next.js AI dashboard with this Skill, preserving every current feature and fixing layout shifts."
- "Create a product marketing landing page with editorial warm minimalism, a floating pill navigation, subtle peach artwork, and real app preview."

The skill treats existing brand, feature semantics, and implementation requirements as authoritative. Its reference palette and demo brand are optional.

## Run the example

```bash
python scripts/scaffold.py --output ./my-demo --brand MyStudio
python scripts/check_frontend.py ./my-demo
python -m http.server 8765 --directory ./my-demo
```

Open `http://localhost:8765/` then navigate to the demo workspace. The interface is functional only in the **frontend**; it does not call an AI model, run commands, or access the filesystem. Its actions say so explicitly.

If Playwright and Chromium are installed:

```bash
python scripts/visual_smoke.py --site ./my-demo --out ./screenshots
```

This QA script uses an inlined page for screenshot generation, so it can run in environments where localhost navigation is restricted. It checks 1440x900, 768x1024, 390x844, and tests the major controls.

## Attribution

Upstream project: https://github.com/openchamber/openchamber ; source license MIT (Copyright 2025 Bohdan Triapitsyn). Original patterns and design rationale are referenced with pinned release URLs in `references/source-audit.md`. The Fixel font source is https://github.com/MacPaw/Fixel; no font binaries are distributed.
