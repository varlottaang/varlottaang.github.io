# Angelo Varlotta — Personal Site

Personal landing page and blog built with [Astro](https://astro.build), styled with Tailwind CSS, and deployed to GitHub Pages via GitHub Actions.

**Live site:** https://varlotta.xyz

## Tech stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS
- [GitHub Actions](https://github.com/features/actions) — CI/CD
- [GitHub Pages](https://pages.github.com) — hosting

## Getting started locally

```bash
npm install
npm run dev
```

Open http://localhost:4321 in your browser.

## Writing a new blog post

Create a new `.md` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short description for SEO and post cards."
pubDatetime: 2026-06-01
tags: ["tag-one", "tag-two"]
---

Your content here in Markdown.
```

The filename becomes the URL slug: `my-post.md` → `/blog/my-post`.

## Deploying to GitHub Pages

### First-time setup

1. Push this repo to GitHub as `varlottaang/varlottaang.github.io`
2. Go to **Settings → Pages** in the GitHub repo
3. Under **Source**, select **GitHub Actions**
4. Push to `main` — the Actions workflow deploys automatically

### Every push to `main`

The `.github/workflows/deploy.yml` workflow runs automatically:
1. Installs dependencies
2. Runs `npm run build` (Astro outputs to `dist/`)
3. Uploads `dist/` and deploys to GitHub Pages

## Project structure

```
src/
├── components/       # Reusable .astro components
├── content/
│   └── blog/         # Markdown blog posts
├── layouts/          # Page and post layout wrappers
├── pages/            # Route pages (index, about, blog, tags, rss)
├── styles/           # Global CSS with Tailwind + theme vars
└── config.ts         # Site metadata and social links
.github/
└── workflows/
    └── deploy.yml    # GitHub Actions deployment
```

## Customising

- **Site metadata & social links** → `src/config.ts`
- **Colors & theme** → `tailwind.config.mjs` (CSS variables under `:root` and `.dark`)
- **Navigation links** → `src/components/Header.astro`
