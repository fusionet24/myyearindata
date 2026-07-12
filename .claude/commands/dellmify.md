---
allowed-tools: Read, Glob, Grep, Edit, Write
argument-hint: [post-path | post-folder | pasted text]
description: De-LLM-ify a draft — strip AI-writing tells and rewrite it in the MyYearInData pre-2025 house voice
version: 1.0
---

# De-LLM-ify

Strip the tells of AI writing out of a draft and rewrite it in the **MyYearInData** house voice — plain, first-person, British, hands-on — modelled on the blog's pre-2025 posts.

## Setup

1. Read the full skill reference at `.claude/skills/dellmify/skill.md`. It contains:
   - **Part A** — the signs of AI writing to strip (banned vocabulary, construction / structural / formatting tells), adapted from *Wikipedia:Signs of AI writing*.
   - **Part B** — the pre-2025 house voice and a swap table, drawn from the blog's genuinely-human early posts.
2. If you need to re-calibrate the voice, skim one or two pre-2025 posts for reference (all dated before 2025):
   `posts/welcome/`, `posts/tools-for-consultants/`, `posts/handling-uk-bank-holidays-in-adf-pipelines/`, `posts/deploying-azure-static-web-app-based-quarto-blog/`.

## Input

`$ARGUMENTS` is one of:
- A path to a post, e.g. `posts/my-post/index.qmd`
- A post folder name, e.g. `my-post` (resolve to `posts/my-post/index.qmd`)
- A block of pasted text to clean up directly

If `$ARGUMENTS` is empty, ask the user which post or text they want de-LLM-ified.

## What to do

1. **Read the source.** For a `.qmd`, read the whole file.
2. **Audit against Part A.** Identify banned vocabulary, "not just X but Y" constructions, participle tails, em-dash overuse, Title Case headings, decorative bolding, emoji-as-formatting, and boilerplate structure.
3. **Rewrite in the Part B voice** — first person, British English, concrete and specific, Problem/Solution framing where it fits, short sentences that land, the occasional honest aside. Preserve meaning, facts, and technical accuracy exactly.
4. **Leave these untouched:** code fences, YAML frontmatter (including `ai-label`), SQL/JSON/ADF snippets, commands, URLs, and `![](images/…)` references. Voice edits are prose-only.
5. **Apply the edits** with `Edit` (for a file) or output the cleaned text (for pasted input).
6. **Report an audit summary** — a short bullet list of the main tells removed and roughly how many, so the user can see what was AI-flavoured.

## Hard rules

- **Never fabricate** anecdotes, numbers, costs, or sources to fake a human voice. If a real hook is missing, trim the fluff and flag where a genuine anecdote would help — don't invent one.
- **Never sacrifice technical accuracy** for tone.
- **British English**, sentence-case headings.
- If the text is already in the house voice, say so and change little — don't de-AI writing that isn't AI.
