---
description: Create branded diagrams using the diagram toolkit — inline for .qmd posts or standalone HTML for screenshotting
---

# Diagram Creation

You are creating diagrams for the MyYearInData blog using the diagram toolkit.

## Setup

1. Read the full skill reference at `.claude/skills/diagram-toolkit/skill.md`
2. Read the template registry at `.claude/skills/diagram-toolkit/templates/templates.json`
3. Read the relevant template snippet from `.claude/skills/diagram-toolkit/templates/`

## What to do

Based on the user's request (or `$ARGUMENTS` if provided):

1. **Identify the diagram type** — match to the closest template (flow, nested, histogram, staircase, s-curve, quadrant, timeline)
2. **Ask the user** (if not clear): "Do you want this inline in your .qmd file or as a standalone HTML for screenshotting?"
3. **Read the matching template** snippet for the pattern structure
4. **Adapt the template** with the user's content, applying the design system from skill.md
5. **Generate the output** following the mode rules:

### Inline mode (for .qmd files)
- Use a **unique CSS prefix**: `.dtk-[topic]-` (e.g., `.dtk-risks-`, `.dtk-arch-`)
- Output compact `<style>` block + `<div>` HTML
- Light mode only (blog uses cosmo theme)
- No JavaScript
- Place directly in the .qmd file where the diagram should appear

### Standalone mode (for screenshotting)
- Full HTML document with dark/light toggle
- Dark mode default
- Place in the post directory as `diagrams.html` (or a descriptive name)

## Important rules

- **Always use unique CSS class prefixes** — never reuse `.amc-` or another diagram's prefix
- **Always use CSS custom properties** for colors — never hardcode hex values in HTML
- **Always use Inter font** — load via Google Fonts in standalone, inherit in inline
- **Hover states on boxes** — `border-color: var(--green)` on hover
- **Keep inline CSS compact** — minify where practical, one rule per line maximum

## Export

After creating a standalone diagram, offer to export:
```bash
node scripts/diagram-to-png.js <file.html> --theme dark --scale 2
```

## Reference

The existing maturity curve diagrams in `posts/aiops-journey-analytics-maturity-curve/` serve as the gold standard for quality and style. Both the inline diagrams in `index.qmd` and the standalone `diagrams.html` demonstrate the patterns.
