# Layout recipes: website, agent console, hybrid

## A. Editorial landing page

Sequence: floating capsule nav -> hero title and 2-line value proposition -> one primary and one secondary CTA -> single atmospheric original art moment -> embedded product UI proof -> alternating feature sections -> integration/process examples -> simple FAQ/CTA -> quiet footer.

Widths: shell 1100-1200px; text column 560-670px; large product visual 100% shell. A 2-line heading with a short subtitle beats six dense cards at top. Provide 20-32px side gutters depending on viewport. Floating nav must not hide content on keyboard focus/mobile; on narrow screens collapse low-value links.

Visuals: one warm abstract landscape / original architectural vignette (if useful). Keep saturation concentrated in a localized area and the text region calm. Do not mimic OpenChamber's exact landscape or copy the credited artist's work.

Section pattern: heading 28-42px, paragraph 15-17px capped ~600px, media 16:9-ish under 20-40px gap, then generous 100px+ next section. Alternate layouts only when narrative benefits. Avoid overly stylized gradients on every card.

## B. Three-zone agent workbench

```text
+------------------+--------------------------------------+--------------------+
| project/session  | header: session name | status      | context/tools/files|
| rail 260-290px   +--------------------------------------+ rail 280-340px     |
|                  | transcript / activity               |                    |
| project headings | centered reading column ~720px     | source refs        |
| sessions / tasks | turn / artifact / action summaries  | model/context      |
|                  |                                      | execution stats    |
|                  | composer stays stable near bottom    |                    |
+------------------+--------------------------------------+--------------------+
```

- The *center* remains primary. Optional context panels open as tabs/overlays where the viewport cannot support 3 columns.
- Keep one header strip per zone. Avoid a title row + tab row + actions row + search row.
- Protect the composer location while toggling modes or statuses.
- Long content needs scroll containment; ideally each zone controls its own scroll rather than entire page scrolling under fixed composer.
- Use a narrow chat text column and wider tool/canvas view when necessary; do not stretch prose full-screen.
- A sidebar group label is *text + upper whitespace*, not a colorful badge, icon, separator, and border.
- Sidebars can be resizable, but minimum center width must be enforced. Source repo uses nominal 280px left sidebar and 320px minimum context/chat widths in its complex desktop app.

## C. Responsive collapse

At >= 1180px: three columns. At ~800-1179px: hide context rail into an explicit Inspector button, keep left sidebar and center. At <800px: make sidebar an off-canvas drawer; center becomes full width with 20px gutters; context appears as sheet/overlay. Target 44px touch buttons and list rows. Essential actions must remain visible without hover.

Do not render a 3-column layout with 140px center on tablet. Do not make the actual chat scroll horizontally. Only code blocks, tables, and charts may use bounded horizontal scrolling.

## D. Hybrid marketing + authenticated app

Separate marketing storytelling from operating workspace: marketing can use art and generous vertical gaps; workspace should maximize reading and useful tools. Reuse design tokens and typography across both, but do not bring decorative hero landscapes into a transcript backdrop.

## E. Other websites

For documentation, product dashboards, portfolios, knowledge tools, or study products, preserve same principles but redesign the information hierarchy to the actual job. Do not mechanically insert fake Agent status panels into an unrelated site. A research/learning UI can replace worktrees with concepts, citations, documents, and active questions; status remains semantic.
