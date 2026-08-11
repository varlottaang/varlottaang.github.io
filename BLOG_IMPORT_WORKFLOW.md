# Blog Post Import Workflow

This document describes the process for importing blog posts from Patreon into your personal blog.

**Single source of truth**: Publish on Patreon first, then import to your blog. No double publishing.

## Overview

1. **Patreon**: Where you publish posts first (public posts only)
2. **Personal blog**: Import finalized posts from Patreon after publishing

This keeps a single canonical source and prevents content fragmentation.

## Pre-Import Checklist

Before importing a post from Patreon, verify:

- [ ] Post is marked as "public" (not patron-exclusive)
- [ ] Post is finalized on Patreon (no edits planned)
- [ ] You're happy with the formatting and content
- [ ] At least a few days have passed since publishing (let it sit, review for typos)

## File Naming Convention

Use kebab-case (lowercase, hyphens) for filenames:

- Good: `why-ai-matters.md`, `intelligenza-artificiale-etica.md`
- Bad: `WhyAIMatters.md`, `Why AI Matters.md`

For Italian posts, use Italian in the filename if the post is primarily in Italian.

## Frontmatter Template

All blog posts use this frontmatter structure:

```yaml
---
title: "Your Post Title"
description: "A brief 1-2 sentence description for SEO"
pubDatetime: YYYY-MM-DDTHH:MM:SS.000Z
modDatetime: YYYY-MM-DDTHH:MM:SS.000Z (optional)
tags: ["tag1", "tag2"]
draft: false
featured: false
source: "patreon"
originalUrl: "https://patreon.com/..."
---
```

### Field Descriptions

- **title**: The post title (exactly as on Patreon)
- **description**: SEO description for previews (160 chars recommended)
- **pubDatetime**: Original publication date on Patreon (ISO 8601 format)
- **modDatetime**: Last modification date (leave empty if unchanged)
- **tags**: Array of topic tags (3-5 tags per post)
- **draft**: Always `false` for published posts
- **featured**: `true` to pin post to top of blog (use sparingly)
- **source**: Always `"patreon"` for posts imported from Patreon
- **originalUrl**: Link to the Patreon post (recommended for attribution)

## Content Cleanup Checklist

When copying text from Patreon to markdown:

- [ ] Remove Patreon-specific metadata or formatting artifacts
- [ ] Remove "Support me on Patreon" calls-to-action that don't fit the blog context
- [ ] Remove patron-exclusive disclaimers (since you're only importing public posts)
- [ ] Fix any formatting issues (broken links, malformed markdown)
- [ ] Ensure images have alt text
- [ ] Verify all links work
- [ ] Remove excessive whitespace and redundant line breaks
- [ ] Use consistent quote style (`"` not `"`)

## Step-by-Step Import Process

### 1. Prepare the Content

1. Copy the post text from Patreon
2. Save as a `.md` file with kebab-case filename
3. Run through the Content Cleanup Checklist above
4. Add proper frontmatter (use template above)

### 2. Add to Repository

```bash
# Create a new branch for this import
git checkout -b import/patreon-post-title

# Create the file in src/content/blog/
cp your-post.md src/content/blog/your-post.md

# Stage and commit
git add src/content/blog/your-post.md
git commit -m "import: add 'Your Post Title' from patreon"

# Push the branch
git push -u origin import/patreon-post-title
```

### 3. Verify Rendering

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/blog/`
3. Check that your new post appears in the list
4. Click into the post and verify:
   - Title renders correctly with colored heading
   - Description is appropriate
   - All text is readable (check for formatting issues)
   - Links work
   - Images display properly (if any)
   - No Patreon branding visible

### 4. Merge & Deploy

Once verified:

```bash
git checkout main
git pull origin main
git merge import/patreon-post-title
git push origin main
```

GitHub Actions will automatically build and deploy your changes.

## Language Handling

- **Italian posts**: Use Italian filenames for Italian posts
- **English posts**: Use English filenames
- **Mixed language posts**: Use English filename, note language context in title

The website supports both languages. Posts render in their original language.

## Tags Reference

Use these tags consistently across your posts:

- **Topics**: AI/ML, Ethics, Science, Technology, Writing, Policy
- **Format**: Analysis, News, Personal, Tutorial, Research, Opinion
- **Domain**: Education, Corporate, Governance, Research

## Workflow Tips

**How often should I import?**
- Import when you're happy with the post on Patreon
- No rush—your blog is a curated collection, not a mirror
- One post per week, one per month, or one per quarter—whatever feels right

**Should I link back to Patreon?**
- Add `originalUrl` to frontmatter for attribution
- You can optionally add a line at the end like: "Read more on [my Patreon](link)"

**Can I edit posts after importing?**
- Yes, but consider updating `modDatetime` if you make significant changes
- For minor typo fixes, no need to update `modDatetime`

**What about images?**
- Save images to `src/assets/blog/post-name/` 
- Reference in markdown: `![alt text](/src/assets/blog/post-name/image.jpg)`

---

**Last Updated**: 2026-08-11
**Workflow**: Patreon first, then import to blog
