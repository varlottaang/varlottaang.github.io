# varlotta.xyz

Personal website of Angelo Varlotta, built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages at **https://varlotta.xyz**.

## How it works

- Every push to `main` builds and deploys the site (`.github/workflows/deploy.yml`).
- You can also redeploy by hand from **Actions → Deploy to GitHub Pages → Run workflow**.

## Adding a post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md`, for example
`_posts/2026-11-12-my-new-post.md`. It will be published at `/blog/my-new-post/`.

```markdown
---
title: "My new post"
description: "One-sentence summary shown in the post list."
date: 2026-11-12 09:00:00 +0100
substack_url: https://drawanowl.substack.com/p/my-new-post   # optional: adds a "Read on Substack" link
image: https://...                                           # optional: preview image for social links
---

Post text in Markdown. You can also paste HTML.
```

Commit and push to `main` (or use **Add file → Create new file** on github.com) and the site
redeploys automatically. Put a post in `_drafts/` instead to keep it unpublished.

A post dated in the future is skipped until the site is rebuilt after that date, so use the
publication date, not a later one.

## Editing

| What | Where |
| --- | --- |
| Name, description, social links | `_config.yml` |
| Home page intro | `index.html` |
| Work & contributions / education lists | `_data/work.yml`, `_data/education.yml` |
| About / Privacy pages | `about.md`, `privacy.md` |
| Blog posts | `_posts/` (`YYYY-MM-DD-slug.md` or `.html`) |
| Unpublished drafts | `_drafts/` |
| Styles (colors, fonts, light/dark theme) | `assets/css/main.css` |

## Run locally

Requires Ruby 3.x and Bundler.

```bash
bundle install
```

```bash
bundle exec jekyll serve
```

## GitHub Pages settings

**Settings → Pages → Source** must be **GitHub Actions**, and the custom domain `varlotta.xyz`
must pass the DNS check.
