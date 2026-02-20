---
description: List all draft posts not yet published and their modified dates
---

# Task: List Draft Posts

Scan all blog posts in the `posts/` directory and identify any that are marked as drafts (not yet published).

## Process

1. **Search for drafts**: Use Grep to find all `index.qmd` files under `posts/` that contain `draft: true` in their YAML frontmatter.

2. **For each draft found**, extract:
   - The post title (from the `title:` field in frontmatter)
   - The post folder name / slug
   - The draft status
   - The date field from frontmatter (if set)
   - The file's last modified date on disk (use `stat -f "%Sm" -t "%Y-%m-%d %H:%M" <filepath>` on macOS)

3. **Also check for posts without a date field** or with a future date, as these may also be unpublished.

4. **Present the results** in a clean markdown table with columns:
   | Post Title | Slug | Date (frontmatter) | Last Modified | Status |

   - Sort by last modified date, most recent first
   - Under "Status", show `draft: true` or note if the date is in the future

5. **If no drafts are found**, report that all posts are currently published (no `draft: true` posts found), and mention the total number of published posts.

## Notes
- Draft posts have `draft: true` in their YAML frontmatter
- Posts without a `draft` field or with `draft: false` are considered published
- The `posts/` directory is at the project root
