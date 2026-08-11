# Patreon Auto-Import Setup

This guide explains how to set up automatic importing of your public Patreon posts as blog drafts.

## How It Works

1. **Daily Check**: GitHub Actions checks your Patreon for new public posts (9 AM UTC)
2. **Auto-Import**: New posts are imported as markdown files with `draft: true`
3. **Review**: You review each draft, add tags, verify formatting
4. **Publish**: Change `draft: false` and merge the PR to publish to your blog

Posts that are already imported are skipped automatically.

## Setup Steps

### 1. Get Your Patreon Creator ID

1. Go to https://www.patreon.com/your-username (replace with your actual username)
2. Look at the URL structure or check your account settings
3. Your creator ID is typically a large number. You can find it by:
   - Visiting your creator dashboard
   - Opening browser DevTools (F12)
   - Going to Network tab
   - Refreshing the page
   - Look for API calls to `/api/oauth2/v2/campaigns/YOUR_ID_HERE/...`

Alternatively, check your Patreon dashboard URL: `https://www.patreon.com/YOUR_USERNAME/home`

### 2. Generate a Patreon API Token

1. Go to https://www.patreon.com/platform/documentation/clients
2. Create a new OAuth client or use your existing one
3. Generate a **Personal Access Token** (not an OAuth token)
   - Go to Settings → Apps & Integrations
   - Under "Personal Use" or "OAuth Clients", create/manage your app
   - Generate a token (it will look like a long alphanumeric string)
4. Save this token securely—you'll only see it once

**Permissions needed**: Your token should have access to read campaigns and posts.

### 3. Add GitHub Secrets

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Create two new secrets:

   - **PATREON_CREATOR_ID**: Your creator ID (the number from step 1)
   - **PATREON_TOKEN**: Your personal access token from step 2

   Example:
   ```
   PATREON_CREATOR_ID=123456789
   PATREON_TOKEN=xyz_super_long_token_string_here
   ```

### 4. Test the Workflow

1. Go to your GitHub repository
2. Click **Actions** tab
3. Find **"Fetch Patreon Posts"** workflow
4. Click **"Run workflow"** → **"Run workflow"** (manual trigger)
5. Watch the run complete
6. If successful, you should see a Pull Request created with any new drafts

## Understanding the Workflow

### Automatic Schedule

The workflow runs **daily at 9 AM UTC** (configurable in `.github/workflows/fetch-patreon-posts.yml`).

To change the time, edit the `cron` line:
```yaml
cron: "0 9 * * *"  # 9 AM UTC every day
```

Common times in UTC:
- `"0 8 * * *"` = 8 AM UTC
- `"0 14 * * *"` = 2 PM UTC
- `"0 18 * * *"` = 6 PM UTC

### Draft Management

When new posts are imported:
- `draft: true` (post won't appear on blog yet)
- `source: "patreon"` (tracks origin)
- `originalUrl:` (link back to Patreon post)

To publish a draft:
1. Open the post's markdown file
2. Change `draft: true` to `draft: false`
3. Add tags if desired: `tags: ["AI", "Ethics", "Research"]`
4. Commit and merge

### What Gets Imported

✅ **Imported**: Public posts only  
❌ **Not imported**: Patron-exclusive posts, unlisted posts

Your API token only sees public posts anyway, so there's no privacy concern.

## Troubleshooting

### "No new posts" every day even though I published

**Check**:
1. Is the post marked as "public" on Patreon? (not patron-exclusive)
2. Did you wait a few minutes after publishing? (Patreon needs time to process)
3. Is your PATREON_CREATOR_ID correct? (check against Patreon dashboard)

### Workflow fails with "401 Unauthorized"

**Fix**:
1. Your PATREON_TOKEN might be expired or incorrect
2. Generate a new token and update the GitHub secret
3. Re-run the workflow

### Workflow fails with "404 Not Found"

**Fix**:
1. Your PATREON_CREATOR_ID is incorrect
2. Double-check the ID from your Patreon dashboard
3. Update the GitHub secret and re-run

### Posts are being duplicated

This shouldn't happen—the script checks if a post already exists before importing. If it does happen:
1. Delete the duplicate from your blog
2. Commit the deletion
3. Re-run the workflow

### HTML formatting looks weird in imported posts

The script converts Patreon's HTML to markdown automatically, but complex formatting might not convert perfectly.

**Fix**:
1. Review the imported draft
2. Manually fix formatting if needed
3. Save and publish

## Manual Testing

You can test the script locally (requires Node.js 18+):

```bash
# Set your credentials
export PATREON_TOKEN="your_token_here"
export PATREON_CREATOR_ID="your_id_here"

# Run the script
node scripts/fetch-patreon-posts.js
```

You'll see output like:
```
Fetching public Patreon posts...
Found 5 public posts
Created draft: your-first-post.md
Created draft: another-post.md
Skipped (already exists): old-post.md

Import complete: 2 new drafts, 1 skipped
```

## Security Notes

- Your PATREON_TOKEN is stored as a GitHub secret (encrypted)
- Only the GitHub Actions workflow can access it
- The token is never logged or exposed
- You can rotate your token at any time on Patreon

## FAQ

**Q: What if I don't want a post imported?**
A: Delete it from the draft PR before merging. Once merged, you can delete it from your blog.

**Q: Can I change the import schedule?**
A: Yes, edit `.github/workflows/fetch-patreon-posts.yml` and change the `cron` line.

**Q: Will it import my old posts?**
A: Only public posts. The first run might import several old posts if they're still public on Patreon.

**Q: Can I disable the workflow temporarily?**
A: Yes, in your GitHub repository settings → Actions → "Fetch Patreon Posts" → Disable.

---

**Questions?** Check the troubleshooting section above or review the `.github/workflows/fetch-patreon-posts.yml` file for details on how the workflow runs.
