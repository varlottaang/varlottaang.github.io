# Patreon Auto-Import Setup

Automatically import your public Patreon posts as blog drafts using the official Patreon API.

## How It Works

1. **Daily Check**: GitHub Actions checks your Patreon at 9 AM UTC
2. **Auto-Import**: New public posts are imported as markdown with `draft: true`
3. **Review**: You review each draft, add tags, verify formatting
4. **Publish**: Change `draft: false` and merge the PR to publish to your blog

Already-imported posts are skipped automatically.

## Setup (3 Steps)

### Step 1: Get Your Patreon Access Token

1. Go to https://www.patreon.com/settings/apps
2. Under "My Applications", click **"Create Client"** or use existing one
3. Click on your application
4. Scroll to **Personal Use** section
5. Click **"Generate Token"**
6. Copy the token (it will look like: `abc123xyz...`)
7. Save it somewhere safe—you'll only see it once

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `PATREON_ACCESS_TOKEN`
5. Value: Paste your token from Step 1
6. Click **"Add secret"**

### Step 3: Test It

1. Go to **Actions** tab
2. Click **"Fetch Patreon Posts"** on the left
3. Click **"Run workflow"** button
4. Select branch: **main**
5. Click **"Run workflow"**

Watch it run. If successful:
- You'll see a Pull Request created with your imported posts
- Each post will be marked as `draft: true` for review

## After Setup

The workflow runs **automatically every day at 9 AM UTC**. When new posts are found, it creates a PR for you to review and merge.

**Your workflow:**
1. Publish on Patreon
2. GitHub Actions auto-imports as draft (next daily run, or manually trigger)
3. Review the PR
   - Check formatting
   - Add tags
   - Fix any issues
4. Change `draft: false` in posts you want to publish
5. Merge PR → posts go live on your blog

## Customization

### Change the Schedule

Edit `.github/workflows/fetch-patreon-posts.yml` and change the `cron` line:

```yaml
cron: "0 9 * * *"  # 9 AM UTC every day
```

Common times:
- `"0 8 * * *"` = 8 AM UTC
- `"0 14 * * *"` = 2 PM UTC (same as 9 AM EST)
- `"0 9 * * 1"` = 9 AM UTC Mondays only

### Run Manually

You can trigger an import anytime without waiting for the daily run:

1. **Actions** → **"Fetch Patreon Posts"**
2. Click **"Run workflow"** → **"Run workflow"**

Useful if you just published and want to import immediately.

## Troubleshooting

### "Unauthorized: PATREON_ACCESS_TOKEN is invalid or expired"

**Fix:**
1. Generate a new token on https://www.patreon.com/settings/apps
2. Update the GitHub secret with the new token
3. Re-run the workflow

### "Could not find campaign"

**Fix:**
1. Make sure you're the creator of the campaign
2. Generate a new token with proper permissions
3. Update the GitHub secret

### No posts imported on first run

**Check:**
1. Do you have any public posts on Patreon?
2. Are they marked as "public" (not patron-exclusive)?
3. Wait a few minutes after publishing—Patreon needs time to process
4. Try running manually: **Actions** → **"Fetch Patreon Posts"** → **Run workflow**

### Duplicate posts appearing

Shouldn't happen—the script checks before importing.

If it does:
1. Delete the duplicate from your blog
2. Commit the deletion
3. Re-run the workflow

## Testing Locally

You can test the script locally:

```bash
export PATREON_ACCESS_TOKEN="your_token_here"
npm ci
node scripts/fetch-patreon-posts.js
```

You'll see output like:
```
🦉 Fetching Patreon posts...

Getting creator info...
Fetching posts from campaign 123456...
Found 3 public posts (out of 5 total)
✓ Created draft: your-post-title.md
⊘ Skipped (already imported): another-post.md
✓ Complete: 1 new drafts, 1 skipped
```

## Security

- Your `PATREON_ACCESS_TOKEN` is stored as a GitHub secret (encrypted)
- Only the GitHub Actions workflow can access it
- The token is never logged or exposed in any output
- You can revoke the token at any time on Patreon

## FAQ

**Q: Do I need to keep my token secret?**
A: Yes. Never share it or commit it to your repository. GitHub secrets keep it safe.

**Q: What if I lose my token?**
A: Generate a new one on Patreon and update the GitHub secret.

**Q: Can I use this token for anything else?**
A: It's tied to your Patreon account. Only use it for your blog automation.

**Q: What posts get imported?**
A: Only public posts. Patron-exclusive posts won't show up.

**Q: Can I disable the workflow?**
A: Yes, in GitHub Actions → **"Fetch Patreon Posts"** → **Disable workflow** (... menu).

**Q: What happens if I merge a draft without changing draft: false?**
A: The post stays as a draft and won't appear on your blog. You need to change `draft: false` to publish it.

---

That's it! Once you add the token, the workflow handles everything else automatically.

**Questions?** Check the troubleshooting section or re-read the setup steps above.
