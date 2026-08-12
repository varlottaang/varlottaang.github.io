# Substack Auto-Import Setup

Automatically import your public Substack posts as blog drafts using the RSS feed.

## How It Works

1. **Daily Check**: GitHub Actions checks your Substack RSS feed at 9 AM UTC
2. **Auto-Import**: New posts are imported as markdown with `draft: true`
3. **Review**: You review each draft, add tags, verify formatting
4. **Publish**: Change `draft: false` and merge the PR to publish to your blog

Already-imported posts are skipped automatically.

## Setup (Super Simple - No Configuration Needed!)

The workflow is already configured to fetch from `https://drawanowl.substack.com/feed`.

### 1. Test It

1. Go to your GitHub repository
2. Click **Actions** tab
3. Find **"Fetch Substack Posts"** on the left
4. Click **"Run workflow"** button
5. Select branch: **main**
6. Click **"Run workflow"**

Watch it run. If successful:
- You'll see a Pull Request created with your imported posts
- Each post will be marked as `draft: true` for review

### 2. That's It!

The workflow runs **automatically every day at 9 AM UTC**. When new posts are found, it creates a PR for you to review and merge.

## Your Workflow

**Publishing on Substack:**
1. Write and publish on Substack
2. GitHub Actions auto-imports as draft (next daily run, or manually trigger)
3. Review the PR
   - Check formatting
   - Add tags
   - Fix any issues
4. Change `draft: false` in posts you want to publish
5. Merge PR → posts go live on your blog

## Customization

### Change the Schedule

Edit `.github/workflows/fetch-substack-posts.yml` and change the `cron` line:

```yaml
cron: "0 9 * * *"  # 9 AM UTC every day
```

Common times:
- `"0 8 * * *"` = 8 AM UTC
- `"0 14 * * *"` = 2 PM UTC
- `"0 9 * * 1"` = 9 AM UTC Mondays only

### Run Manually

Trigger an import anytime without waiting for the daily run:

1. **Actions** → **"Fetch Substack Posts"**
2. Click **"Run workflow"** → **"Run workflow"**

Useful if you just published and want to import immediately.

### Change Substack URL

If your Substack URL is different, edit `.github/workflows/fetch-substack-posts.yml`:

```yaml
- name: Fetch Substack posts
  env:
    SUBSTACK_RSS_URL: https://yourname.substack.com/feed
  run: node scripts/fetch-substack-posts.js
```

## What Gets Imported

✅ **Public posts** from your Substack  
❌ **Paywalled/subscriber-only posts** (not in RSS feed)

Only public posts appear in your RSS feed, so only those get imported.

## Automatic Cleanup

The script automatically removes Substack promotional content:
- "draw an owl is a reader-supported publication..."
- "Thanks for reading draw an owl!..."
- "Share" buttons and prompts

So your blog posts stay clean and focused on the content.

## Draft Files

When posts are imported:
- `draft: true` (post won't appear on blog yet)
- `source: "substack"` (tracks origin)
- `originalUrl:` (link back to Substack post)
- `tags: []` (add tags when reviewing)

To publish a draft:
1. Open the post's markdown file
2. Change `draft: true` to `draft: false`
3. Add tags: `tags: ["AI", "Ethics"]`
4. Commit and merge the PR

## Troubleshooting

### "No posts found in RSS feed" on first run

**Check:**
1. Do you have any public posts on Substack?
2. Is your Substack URL correct in the workflow?
3. Wait a few minutes after publishing—Substack needs time to update the feed

### Workflow runs but no PR is created

This means no new posts were found. Either:
- All posts were already imported
- The RSS feed hasn't been updated yet
- Check if the workflow actually ran (look at the run logs)

### Posts imported but formatting looks weird

Substack's HTML to markdown conversion might not be perfect for complex formatting.

**Fix:**
1. Review the imported draft
2. Manually fix formatting in markdown if needed
3. Save and publish

### Duplicate posts appearing

Shouldn't happen—the script checks before importing.

If it does:
1. Delete the duplicate from your blog
2. Commit the deletion
3. Re-run the workflow

## Manual Testing

Test the script locally:

```bash
npm ci
node scripts/fetch-substack-posts.js
```

You'll see output like:
```
🦉 Fetching Substack posts from https://drawanowl.substack.com/feed...

Found 12 posts in feed

✓ Created draft: your-latest-post.md
⊘ Skipped (already imported): another-post.md
⊘ Skipped (already imported): old-post.md

✓ Complete: 1 new drafts, 2 skipped
```

## FAQ

**Q: What if I publish a paywalled post on Substack?**
A: It won't appear in the RSS feed, so it won't be imported. Only public posts get imported.

**Q: Can I import old Substack posts?**
A: Yes, the first run will import all posts in your RSS feed. After that, only new posts get imported.

**Q: Can I disable the workflow?**
A: Yes, in GitHub Actions → **"Fetch Substack Posts"** → Disable workflow (... menu).

**Q: What if I delete a post from Substack?**
A: It stays in your blog (unless you manually delete it). The workflow only adds new posts, it doesn't remove them.

**Q: Can I change which Substack is scraped?**
A: Yes, edit the RSS URL in the workflow file (see Customization section above).

**Q: Does this require any authentication?**
A: No, it just reads your public RSS feed. No tokens or secrets needed.

---

That's it! The workflow is ready to go. Just run it once to test, then it automatically imports new posts every day at 9 AM UTC.