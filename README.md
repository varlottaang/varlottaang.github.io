# varlotta.xyz

Personal website of Angelo Varlotta, built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages at **https://varlotta.xyz**.

## How it works

- Every push to `main` builds and deploys the site (`.github/workflows/deploy.yml`).
- Once a day, the same workflow runs `scripts/sync_substack.rb`, which reads the
  [Draw an Owl](https://drawanowl.substack.com) feed and saves any **new public post** to `_posts/`,
  commits it, and redeploys. Paid-only posts are skipped. You can also run it on demand from
  **Actions → Deploy to GitHub Pages → Run workflow**.
- Posts that already exist (same slug or title) are never overwritten, so you can edit imported
  posts freely. Delete a post's file to have it re-imported.

## Editing

| What | Where |
| --- | --- |
| Name, description, social links, Substack feed URL | `_config.yml` |
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

Import new Substack posts locally:

```bash
bundle exec ruby scripts/sync_substack.rb
```

## GitHub Pages settings

**Settings → Pages → Source** must be **GitHub Actions**, and the custom domain `varlotta.xyz`
must pass the DNS check.
