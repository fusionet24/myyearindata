---
description: Generate LinkedIn carousel slides from a blog post with MyYearInData branding
---

# LinkedIn Carousel Generator

Generate engaging LinkedIn carousel slides (HTML format) from a blog post, optimized for the platform's algorithm and engagement patterns.

## Required Input

The user must provide ONE of:
- A path to a blog post (e.g., `posts/my-post/index.qmd`)
- A post folder name (e.g., `my-post`)

## Process

### Step 1: Retrieve Post Content and Shortcode

1. **Read the blog post** at the provided path (or `posts/{folder}/index.qmd`)
2. **Read staticwebapp.config.json** to find the shortcode for this post
   - Search the routes array for a redirect pointing to the post's folder
   - Extract the shortcode (e.g., `/s/AI-Obsidian`)
   - If no shortcode exists, warn the user and suggest they create one first

### Step 2: Analyze Content for LinkedIn

Apply these LinkedIn content strategy principles:

**Hook Architecture (Slide 1):**
- Pattern interrupt - something unexpected or counterintuitive
- Create curiosity gap - make them NEED to swipe
- Relatable pain point that the target audience experiences
- Avoid clickbait but embrace tension

**Narrative Arc:**
- Problem → Agitation → Solution → Proof → CTA
- Each slide should answer "why should I keep swiping?"
- Progressive revelation - don't give everything away early
- Build to a climax before the CTA

**LinkedIn Algorithm Optimization:**
- Carousels get 3x more reach than text posts
- Optimal length: 6-10 slides (7 is sweet spot)
- First slide determines 80% of engagement
- Dwell time matters - make slides worth pausing on
- Last slide CTA drives saves and shares

**Text Hierarchy:**
- One main idea per slide
- 3-5 second read time max per slide
- Bold key phrases, not full sentences
- White space is your friend
- Numbers and lists increase scannability

**Content Extraction Strategy:**
- Identify the SINGLE most compelling insight
- Find the contrarian take or unexpected angle
- Extract memorable phrases/quotes from the post
- Identify the "aha moment" that makes it shareable

### Step 3: Generate 3 Carousel Variations

Create THREE distinct carousel approaches:

**Variation A: Problem-Agitate-Solve**
- Lead with pain point
- Build tension with consequences
- Reveal solution as hero
- Focus on transformation story

**Variation B: Counterintuitive Hook**
- Lead with unexpected statement
- Challenge conventional wisdom
- Reveal the insight through slides
- Focus on mindset shift

**Variation C: Listicle/Framework**
- Lead with numbered promise
- Each slide delivers one item
- Focus on actionable takeaways
- Works well for "X ways to..." or "X mistakes..."

### Step 4: Apply MyYearInData Branding

**Required Branding Elements:**

1. **Header Bar** (all slides):
   - Background: `#0aaa50` (brand green)
   - Left: `myyearindata.com/s/{SHORTCODE}` (from staticwebapp.config.json)
   - Right: Slide number (e.g., `1/7`)

2. **Color Palette:**
   ```css
   --brand-green: #0aaa50;
   --brand-green-light: #0dcc60;
   --dark-bg: #0f1419;
   --card-bg: #1a2027;
   ```

3. **Typography:**
   - Primary: Inter (weights: 400, 600, 700, 900)
   - Doodle/handwritten: Caveat (for accents)

4. **Doodle Elements** (use sparingly, 2-3 per carousel):
   - `.doodle-circle` - hand-drawn circle around key text
   - `.doodle-underline` - sketchy underline for emphasis
   - `.sparkle` - `&#10022;` character in brand green
   - `.doodle-data` - SVG beaker/flask/test tube (data science theme)

5. **Swipe Indicator** (all slides except last):
   - Bottom right corner
   - "swipe" text + animated arrow
   - Green arrow with bounce animation

6. **Final Slide CTA:**
   - "Read the full breakdown" → myyearindata.com
   - "Follow me on LinkedIn" → Scott Bell
   - DailyDatabricks.Tips logo
   - Databricks.News logo
   - "Powered by" RapidData logo (local: `../../logos/RapiData-White.png`)

### Step 5: Output Format

Create HTML file at: `posts/{post-folder}/carousel.html`

The HTML should:
- Be self-contained (inline CSS, no external dependencies except Google Fonts)
- Display all slides vertically for easy screenshotting
- Include instructions paragraph at top
- Each slide: 1080x1350px (Instagram 4:5 ratio, works on LinkedIn)

## Reference Template

Use this carousel as the structural and styling reference:
**Example:** `posts/obsidian-second-brain-ai-agents/carousel.html`

Key structural elements from the reference:
- Subtle grid pattern background (3% opacity green lines)
- Card components with `var(--card-bg)` and subtle borders
- Comparison boxes with `.active` state for emphasis
- Agent/feature cards in 2x2 grid layout
- Tombstone style for "dead" items (strikethrough + skull)
- Icon circles for visual interest
- Overhead list items with icons

## Deliverable

Present all 3 variations to the user with:
1. Brief description of the hook strategy for each
2. Slide-by-slide content outline
3. Recommendation on which might perform best and why

After user selects preferred approach (or requests merge of elements), generate the final HTML file.

## LinkedIn Content Best Practices Summary

**What makes carousels go viral:**
- Teaches something valuable in 60 seconds
- Makes the reader feel smarter
- Is highly saveable (people bookmark for later)
- Creates "I need to share this" moment
- Solves a problem they didn't know how to articulate

**What kills engagement:**
- Too much text per slide
- Burying the lead
- Generic advice without specifics
- No clear takeaway
- Weak or missing CTA

**Engagement triggers to include:**
- Specific numbers (not "many" but "4 agents")
- Named frameworks or concepts
- Before/after contrast
- "This changed everything" moments
- Actionable next steps

## Exporting to PDF

After generating the carousel HTML, use the export script to create high-res screenshots and PDF:

```bash
# Install dependencies (first time only)
cd scripts && npm install

# Generate PDF from carousel
node scripts/carousel-to-pdf.js posts/{post-folder}/carousel.html

# Options:
#   --output, -o    Custom output filename
#   --scale, -s     Resolution multiplier (default: 2x)
#   --keep-images   Keep individual PNG files
```

The script:
1. Opens the carousel HTML in headless Chrome
2. Screenshots each slide at 2x resolution (2160x2700px)
3. Combines all slides into a single PDF
4. Outputs `carousel.pdf` in the same folder as the HTML

## Important Notes

- Never include time estimates for how long tasks take
- The carousel should work standalone - someone should understand the value without reading the blog
- But create enough curiosity that they WANT to read the full post
- Test the hook by asking: "Would I stop scrolling for this?"
