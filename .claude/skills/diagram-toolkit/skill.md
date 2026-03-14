# Diagram Toolkit Skill

Create branded, production-quality diagrams for the MyYearInData blog using pure HTML/CSS/SVG.

## Design System

### Color Palette (CSS Variables)

**Dark Mode** (standalone files default):
```
--bg: #0f1419          --bg-elevated: #161b22
--card-bg: #1a2027     --text: #f0f6fc
--text-muted: rgba(240,246,252,0.55)
--text-secondary: rgba(240,246,252,0.75)
--border: rgba(240,246,252,0.08)
--border-strong: rgba(240,246,252,0.15)
--green: #0aaa50       --green-light: #0dcc60
--green-pale: rgba(10,170,80,0.12)
--green-glow: rgba(10,170,80,0.06)
--red: #ef4444         --orange: #f59e0b
--grey: #6b7280
```

**Light Mode** (inline .qmd diagrams / standalone toggle):
```
--bg: #ffffff           --bg-elevated: #f9fafb
--card-bg: #f3f6f5      --text: #111827
--text-muted: rgba(17,24,39,0.45)
--text-secondary: rgba(17,24,39,0.65)
--border: rgba(17,24,39,0.08)
--border-strong: rgba(17,24,39,0.15)
--green: #0aaa50        --green-light: #08994a
--green-pale: rgba(10,170,80,0.08)
--green-glow: rgba(10,170,80,0.04)
```

**Shorthand variables** (for inline .qmd — compact CSS):
```
--green: #0aaa50  --green-lt: #0dcc60  --green-bg: rgba(10,170,80,0.07)
--card: #f5f7f6   --txt: #111827       --txt2: #374151
--txt3: #6b7280   --bdr: #e5e7eb       --bdr2: #d1d5db
```

### Typography

- Font: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- Load via: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap')`

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Diagram title | 22px (standalone) / 17px (inline) | 700 | --text |
| Subtitle | 14px / 12px | 400 | --text-muted |
| Stage number | 11px / 10px | 700 | --green |
| Stage title | 14px / 13px | 700 | --text |
| Stage subtitle | 11px / 10px | 400 italic | --text-muted |
| Tags/labels | 9-10px | 600 | --green, uppercase, letter-spacing 0.06em |
| Descriptions | 10-11px | 400 | --text-muted |

### Spacing & Borders

- Border radius: 8-12px (boxes), 6px (small elements)
- Border width: 1.5px
- Padding: 14-20px (boxes), 32-60px (diagram container)
- Transitions: `border-color 0.2s` on hover for all interactive elements
- Hover effect: `border-color: var(--green)` on boxes

## Component Library

### 1. Stage Box
Rounded rectangle card with number, title, subtitle. Used in flow/pipeline diagrams.
```html
<div class="[prefix]-box">
  <div class="[prefix]-num">01</div>
  <div class="[prefix]-title">Stage Name</div>
  <div class="[prefix]-sub">"Question it answers"</div>
</div>
```

### 2. Arrow Connector
Unicode arrow between stage boxes. Green, 40-50% opacity.
```html
<span class="[prefix]-arr">&#9654;</span>
```

### 3. Gradient Bar
Horizontal gradient track with left-aligned label. Shows progression.
```html
<div class="[prefix]-gbar">
  <span class="[prefix]-gbar-lbl">Increasing Value</span>
  <div class="[prefix]-gbar-track [prefix]-gval"></div>
</div>
```
Gradient types: `gval` (green), `gcplx` (grey), `gauto` (green→orange).

### 4. Nested Layer (Onion/Concentric)
Bordered containers within containers showing hierarchy.
```html
<div class="[prefix]-layer [prefix]-layer-outer">
  <div class="[prefix]-ntag">Label</div>
  <div class="[prefix]-ntitle">Layer Name</div>
  <div class="[prefix]-ndesc">Description</div>
  <div class="[prefix]-layer-mid">
    <div class="[prefix]-layer-child">...</div>
    <div class="[prefix]-layer-child">...</div>
  </div>
  <div class="[prefix]-layer-inner">...</div>
</div>
```

### 5. Cross-Cutting Bar
Horizontal bar below nested layers. Diamond icon + text.
```html
<div class="[prefix]-xbar">
  <span class="[prefix]-xbar-icon">&#9670;</span>
  <span class="[prefix]-xbar-text">Bar Label</span>
</div>
```

### 6. Histogram Bar
Vertical bar chart. Flex container with columns, percentage labels on top.
```html
<div class="[prefix]-hist">
  <div class="[prefix]-hcol">
    <span class="[prefix]-hpct">~40%</span>
    <div class="[prefix]-hbar" style="height:80%"></div>
  </div>
  <!-- more columns -->
</div>
```

### 7. Staircase Step
Progressive-height blocks aligned to bottom. Each step rests on the one below.
```html
<div class="[prefix]-stairs">
  <div class="[prefix]-step [prefix]-s1">
    <div class="[prefix]-snum">Step 1</div>
    <div class="[prefix]-stitle">Title</div>
    <div class="[prefix]-sdesc">Description</div>
  </div>
  <!-- more steps with increasing min-height -->
</div>
```

### 8. SVG S-Curve
SVG line chart with bezier curves, gradient fills, and text annotations.
Uses `<path>` with cubic bezier, `<linearGradient>` for fills.

### 9. Dashed Divider
Vertical dashed line with floating label. Marks inflection points.
```html
<div class="[prefix]-divider">
  <div class="[prefix]-divider-line"></div>
  <span class="[prefix]-divider-lbl">Label Text</span>
</div>
```

### 10. Group Bracket
Bottom border with centered label. Groups related stages.
```html
<div class="[prefix]-bracket">
  <span class="[prefix]-bracket-lbl">Group Name</span>
</div>
```

## Output Modes

### Inline QMD Mode
For embedding directly in `.qmd` blog posts.

Rules:
1. Use a **unique CSS prefix** per diagram: `.dtk-[topic]-` (e.g., `.dtk-pipeline-`, `.dtk-quadrant-`)
2. Output a `<style>` block with **compact/minified CSS** using shorthand variables
3. Use **light mode only** (Quarto blog uses cosmo theme = light)
4. Keep CSS variables defined on the diagram container class
5. No JavaScript (inline diagrams are static)
6. All HTML in a single `<div class="dtk-[topic]">` wrapper

Example output structure:
```html
<style>
.dtk-pipeline{--green:#0aaa50;--card:#f5f7f6;--txt:#111827;...}
.dtk-pipeline .dtk-pipeline-box{...}
</style>

<div class="dtk-pipeline">
  <h3>Title</h3>
  <p class="dtk-pipeline-sub">Subtitle</p>
  <!-- diagram content -->
</div>
```

### Standalone HTML Mode
For screenshotting, interactive viewing, presentations.

Rules:
1. Full `<!DOCTYPE html>` document
2. Include dark/light toggle (two-button, fixed top-right)
3. Default to **dark mode**
4. Include full CSS variable set for both themes
5. Each diagram in a `<section class="diagram">` with `max-width: 1100px`
6. Include Inter font via Google Fonts CDN
7. Compatible with `diagram-to-png.js` export script

## Template Catalog

Read templates from: `.claude/skills/diagram-toolkit/templates/`

| Template | File | Use Cases |
|----------|------|-----------|
| Horizontal Flow | `flow-horizontal.html` | Maturity curves, pipelines, process flows, stage progression |
| Nested Layers | `nested-layers.html` | Ops discipline maps, architecture layers, taxonomy/hierarchy |
| Histogram | `histogram.html` | Distribution data, survey results, adoption rates |
| Staircase | `staircase.html` | Dependency chains, prerequisites, building blocks |
| S-Curve | `s-curve.html` | Value vs complexity, adoption curves, trend visualization |
| Quadrant | `quadrant.html` | Risk assessment, priority matrices, 2x2 categorization |
| Timeline | `timeline.html` | Project timelines, evolution/history, roadmaps |

## Export

### Client-side (in toolkit)
The interactive toolkit at `tools/diagram-toolkit.html` provides PNG, PDF, and clipboard export.

### Server-side (Puppeteer)
```bash
node scripts/diagram-to-png.js <file.html> [--theme dark|light] [--scale 2] [--pdf]
```

## Process

When the `/diagram` command is invoked:

1. **Understand the request**: What concept needs visualizing? What data/content?
2. **Select template**: Match to the closest template from the catalog
3. **Read the template**: Load the snippet from `templates/` directory
4. **Adapt content**: Replace sample data with the user's content
5. **Choose mode**: Ask if inline (.qmd) or standalone (.html) — or infer from context
6. **Generate output**: Apply the appropriate mode rules
7. **Offer export**: Mention `diagram-to-png.js` for server-side export if standalone
