# Blog Post Import Workflow

This document describes the process for importing blog posts from Substack, Patreon, or other external sources into your personal blog.

## Overview

You have two main sources for content:
1. **Substack (Archive)**: Existing posts from Draw an Owl that you're migrating
2. **Patreon (Current)**: New posts you'll publish directly on Patreon and import

## Pre-Import Checklist

Before importing any post, verify:
- [ ] Post is marked as "public" (not patron-exclusive, unless you want exclusive content)
- [ ] You have the original text/markdown (from Substack export or Patreon export)
- [ ] You own the copyright/rights to republish
- [ ] Post doesn't violate any exclusive republishing agreements

## File Naming Convention

Use kebab-case (lowercase, hyphens) for filenames:
- Good: `why-ai-matters.md`, `intelligenza-artificiale-dati.md`
- Bad: `WhyAIMatters.md`, `Why AI Matters.md`

For Italian posts, include language context in the title if needed.

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
source: "substack" # or "patreon" or "personal"
originalUrl: "https://substack.com/..." (optional)
---
```

### Field Descriptions

- **title**: The post title (should match or closely match the original)
- **description**: SEO description that appears in previews (160 chars recommended)
- **pubDatetime**: Original publication date/time in ISO 8601 format. For Substack posts, use the date it was published on Substack
- **modDatetime**: Last modification date (leave empty if not modified)
- **tags**: Array of topic tags (keep to 3-5 relevant tags per post)
- **draft**: `false` for published posts, `true` for work-in-progress
- **featured**: `true` to pin post to top of blog (use sparingly)
- **source**: Where the post originally came from (tracking field)
- **originalUrl**: Link to original post on Substack/Patreon (optional but recommended)

## Content Cleanup Checklist

### Remove Substack Promotional Content

When importing from Substack, remove these patterns:

- [ ] "draw an owl is a reader-supported publication..."
- [ ] "Thanks for reading draw an owl! This post is public so feel free to share it."
- [ ] "Share" buttons or share prompts
- [ ] "Subscribe to draw an owl" calls-to-action
- [ ] "Become a free or paid subscriber" links
- [ ] Any Substack-specific metadata or formatting

### Remove Patreon Promotional Content

When importing from Patreon, remove:

- [ ] "This is a patron-exclusive post" disclaimers (if re-publishing public posts)
- [ ] "Support me on Patreon" calls-to-action that feel out of place
- [ ] Patreon member-only links or gatekeeping language
- [ ] Subscriber lists or acknowledgments specific to Patreon

**Note**: You can ADD a "Read more on Draw an Owl" link at the end (using the `<ReadMoreLink />` component) to drive traffic back to Substack, but don't keep their original promotional text.

### General Cleanup

- [ ] Fix any formatting issues (broken links, malformed markdown)
- [ ] Ensure images have alt text (if images are embedded)
- [ ] Verify all links work or update them if needed
- [ ] Remove any redundant line breaks or excessive whitespace
- [ ] Ensure consistent quote style (" not ")

## Step-by-Step Import Process

### 1. Prepare the Content

1. Export or copy the post from Substack/Patreon
2. Save as a `.md` file with kebab-case filename
3. Run through the Content Cleanup Checklist above
4. Add the frontmatter (see template above)

### 2. Add to Repository

```bash
# Create a new branch for the import
git checkout -b import/substack-post-name

# Create the file in src/content/blog/
cp your-post.md src/content/blog/your-post.md

# Stage and commit
git add src/content/blog/your-post.md
git commit -m "import: add 'Your Post Title' from substack"

# Push to your feature branch
git push -u origin import/substack-post-name
```

### 3. Verify Rendering

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/blog/`
3. Check that your new post appears in the list
4. Click into the post and verify:
   - Title renders correctly with colored heading
   - Description is appropriate
   - All text is readable
   - Links work
   - No Substack/Patreon branding visible

### 4. Merge

Once verified:

```bash
git checkout main
git pull origin main
git merge import/substack-post-name
git push origin main
```

The GitHub Actions deployment will automatically build and deploy your changes.

## Bulk Import (Substack Archive)

If importing multiple posts at once:

1. Export all posts from Substack (if available)
2. Process each through the Content Cleanup Checklist
3. Create one commit per post, or one commit for all if they're a cohesive batch
4. Use commit messages like:
   - `import: add substack archive posts (posts 1-5)`
   - `import: migrate 7 posts from substack`

## Language Handling

- **Italian posts**: Name files in Italian if the post is primarily in Italian
- **English posts**: Use English filenames
- **Bilingual posts**: Use English filename, note both languages in title/description

The website supports both languages through the CSS language system. Posts will render in their original language.

## Future: Patreon Workflow

Once you start publishing on Patreon:

1. Each Patreon post will go directly on your Patreon page
2. You'll import the final version to your blog after publishing
3. Use `source: "patreon"` in the frontmatter
4. Include `originalUrl` pointing to the Patreon post
5. Consider adding "Also published on [my personal blog](link)" back to Patreon post description

## Tags Reference

Consider using these tags consistently:

- **Topics**: `AI/ML`, `Ethics`, `Science`, `Technology`, `Writing`
- **Language**: `English`, `Italian`, `Bilingual`
- **Format**: `Analysis`, `News`, `Personal`, `Tutorial`, `Translation`
- **Domain**: `Education`, `Corporate`, `Research`, `Politics`

## Questions & Troubleshooting

**Q: Should I keep the original Substack URL?**
A: Optional, but recommended for attribution. Add it to `originalUrl` field in frontmatter, and optionally add a link at the end: "Read the original on [Draw an Owl](url)"

**Q: Can I modify posts before importing?**
A: Yes, small edits are fine. If you substantially rewrite, consider updating `modDatetime` and noting the changes.

**Q: What if a post has embedded images?**
A: Save images to `src/assets/blog/post-name/` and reference them in markdown as `![alt text](/src/assets/blog/post-name/image.jpg)`

**Q: How do I update tags for all existing posts?**
A: You can edit the frontmatter directly in the `.md` files and commit. Tags don't require frontend changes.

---

**Last Updated**: 2026-08-11
**Maintainer**: You (with help from Claude)
