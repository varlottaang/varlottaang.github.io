# Patreon Auto-Import Setup

Automatically import your public Patreon posts as blog drafts. No API tokens needed.

## How It Works

1. **Daily Check**: GitHub Actions checks your public Patreon profile at 9 AM UTC
2. **Auto-Import**: New public posts are imported as markdown with `draft: true`
3. **Review**: You review each draft, add tags, verify formatting
4. **Publish**: Change `draft: false` and merge the PR to publish to your blog

Already-imported posts are skipped automatically.

## Setup (Super Simple)

### 1. Nothing to configure

The workflow automatically checks `https://www.patreon.com/varlottaang` (your public profile).

- No API tokens needed
- No authentication required
- Works with public posts only (which is what you want anyway)

### 2. Test it

1. Go to your GitHub repository
2. Click **Actions** tab
3. Find **"Fetch Patreon Posts"** workflow
4. Click **"Run workflow"** → **"Run workflow"** (manual trigger)
5. Watch it run
6. You'll see a Pull Request created if new posts are found

### 3. That's it!

The workflow will automatically run every day at 9 AM UTC and import any new public posts as drafts.

## Workflow Behavior

### What Gets Imported

✅ **Public posts** from your Patreon profile  
❌ **Patron-exclusive posts** (only visible to patrons)  
❌ **Unlisted posts** (not shown on public feed)

Only public posts appear on your profile page, so only those get imported.

### Draft Files

When posts are imported:
- `draft: true` (post won't appear on blog yet)
- `source: "patreon"` (tracks origin)
- `originalUrl:` (link back to Patreon post)
- `tags: []` (add tags when reviewing)

To publish a draft:
1. Open the post's markdown file
2. Change `draft: true` to `draft: false`
3. Add tags: `tags: ["AI", "Ethics"]`
4. Commit and merge the PR

### Auto-PR Creation

When new posts are found:
- GitHub Actions creates a PR with the new drafts
- Title: "🦉 New Patreon posts (drafts)"
- You review and merge when ready
- After merge, posts go live on your blog

## Customization

### Change the Schedule

Edit `.github/workflows/fetch-patreon-posts.yml` and change the `cron` line:

```yaml
cron: "0 9 * * *"  # 9 AM UTC every day
```

Common times in UTC:
- `"0 8 * * *"` = 8 AM UTC
- `"0 14 * * *"` = 2 PM UTC
- `"0 18 * * *"` = 6 PM UTC
- `"0 9 * * 1"` = 9 AM UTC Mondays only

### Run Manually

You can run the import anytime:
1. Go to Actions tab
2. Select "Fetch Patreon Posts"
3. Click "Run workflow" → "Run workflow"

This is useful if you just published something and want to import it immediately instead of waiting for the daily run.

## Troubleshooting

### "No posts found" on first run

**Check**:
1. Do you have any public posts on https://www.patreon.com/varlottaang?
2. Wait a few minutes after publishing—Patreon needs time to update

### Workflow fails with network error

**Likely cause**: Patreon might be temporarily unreachable or rate-limiting.

**Fix**:
1. Wait a few minutes
2. Manually re-run the workflow from the Actions tab
3. If it persists, check Patreon's status

### Posts imported but formatting looks weird

Patreon's HTML to markdown conversion might not be perfect for complex formatting.

**Fix**:
1. Review the imported draft
2. Manually fix formatting in markdown if needed
3. Save and publish

### Duplicate posts appearing

Shouldn't happen—the script checks if a post already exists before importing.

If it does:
1. Delete the duplicate from your blog
2. Commit the deletion
3. Re-run the workflow

## Manual Testing

Test the script locally (requires Node 18+):

```bash
npm ci  # Install dependencies
node scripts/fetch-patreon-posts.js
```

You'll see output like:
```
🦉 Fetching https://www.patreon.com/varlottaang...

Found 5 potential posts
[1/5] Fetching post-title...
✓ Created draft: post-title.md
[2/5] Fetching another-post...
⊘ Skipped (already imported)

✓ Complete: 1 new, 1 skipped, 0 failed
```

## FAQ

**Q: Does this require a Patreon account login?**
A: No, it only reads your public profile, which is visible to anyone.

**Q: What if I want to keep some posts patron-exclusive?**
A: Keep them as patron-exclusive on Patreon—they won't show up in the workflow since it only imports public posts.

**Q: Can I change which creator is scraped?**
A: Yes, edit `scripts/fetch-patreon-posts.js` line ~12 and change `PATREON_CREATOR = "varlottaang"` to a different creator name.

**Q: What if Patreon changes their website structure?**
A: The script might break since it relies on HTML selectors. If that happens, let me know and I can update it.

**Q: Can I disable the workflow?**
A: Yes, in your GitHub repository:
1. Actions tab → "Fetch Patreon Posts"
2. Click "..." menu → "Disable workflow"

**Q: Will old posts be imported on first run?**
A: Only public posts currently on your profile. If they're there, they'll get imported.

## How It Works Under the Hood

1. Script fetches `https://www.patreon.com/varlottaang` (public page)
2. Parses HTML to find post links
3. Follows each link to get full content
4. Converts HTML to markdown
5. Creates `.md` files in `src/content/blog/` with proper frontmatter
6. GitHub Actions creates a PR if new files are found
7. You review the PR and merge to publish

---

**That's it!** No configuration needed. Just publish on Patreon, and the workflow handles the rest.
