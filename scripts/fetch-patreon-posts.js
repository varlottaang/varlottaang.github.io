#!/usr/bin/env node

/**
 * Fetch public posts from Patreon API and create blog post drafts
 *
 * Usage: PATREON_ACCESS_TOKEN=your_token node scripts/fetch-patreon-posts.js
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../src/content/blog");
const PATREON_ACCESS_TOKEN = process.env.PATREON_ACCESS_TOKEN;

if (!PATREON_ACCESS_TOKEN) {
  console.error(
    "❌ Error: PATREON_ACCESS_TOKEN environment variable is required"
  );
  console.error(
    "See PATREON_SETUP.md for instructions on how to get your access token"
  );
  process.exit(1);
}

/**
 * Make HTTPS request to Patreon API
 */
function patreonRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "www.patreon.com",
      path: path,
      method: "GET",
      headers: {
        Authorization: `Bearer ${PATREON_ACCESS_TOKEN}`,
        "User-Agent": "Mozilla/5.0",
      },
    };

    https
      .request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode === 200) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error("Invalid JSON from Patreon API"));
            }
          } else if (res.statusCode === 401) {
            reject(
              new Error(
                "Unauthorized: PATREON_ACCESS_TOKEN is invalid or expired"
              )
            );
          } else {
            reject(
              new Error(
                `Patreon API error: ${res.statusCode} ${res.statusMessage}`
              )
            );
          }
        });
      })
      .on("error", reject)
      .end();
  });
}

/**
 * Fetch current user's campaign ID
 */
async function getCreatorId() {
  try {
    console.log("Getting creator info...");
    const data = await patreonRequest(
      "/api/oauth2/v2/identity?include=memberships"
    );
    const user = data.data;

    // Find the campaign the user is a creator of
    const memberships = data.included?.filter(
      (item) => item.type === "member"
    ) || [];
    const campaignIds = memberships.map((m) => m.relationships?.campaign?.data?.id).filter(Boolean);

    if (campaignIds.length === 0) {
      throw new Error(
        "Could not find campaign. Make sure your token has the right permissions."
      );
    }

    return campaignIds[0];
  } catch (error) {
    throw new Error(`Failed to get creator info: ${error.message}`);
  }
}

/**
 * Fetch public posts from creator's campaign
 */
async function fetchPublicPosts(campaignId) {
  try {
    console.log(`Fetching posts from campaign ${campaignId}...`);
    const url = `/api/oauth2/v2/campaigns/${campaignId}/posts?include=user&fields[post]=title,content,published_at,url,is_public&sort=-published_at&page[size]=20`;

    const data = await patreonRequest(url);
    const posts = data.data || [];

    // Filter for public posts only
    const publicPosts = posts.filter((post) => post.attributes.is_public === true);
    console.log(
      `Found ${publicPosts.length} public posts (out of ${posts.length} total)`
    );
    return publicPosts;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

/**
 * Generate kebab-case filename
 */
function generateFilename(title) {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60) + ".md"
  );
}

/**
 * Parse Patreon post content (HTML) into markdown
 */
function htmlToMarkdown(html) {
  if (!html) return "";

  return (
    html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<h1[^>]*>([^<]*)<\/h1>/gi, "# $1\n")
      .replace(/<h2[^>]*>([^<]*)<\/h2>/gi, "## $1\n")
      .replace(/<h3[^>]*>([^<]*)<\/h3>/gi, "### $1\n")
      .replace(/<h4[^>]*>([^<]*)<\/h4>/gi, "#### $1\n")
      .replace(/<h5[^>]*>([^<]*)<\/h5>/gi, "##### $1\n")
      .replace(/<h6[^>]*>([^<]*)<\/h6>/gi, "###### $1\n")
      .replace(/<p[^>]*>([^<]*)<\/p>/gi, "$1\n\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<strong[^>]*>([^<]*)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>([^<]*)<\/b>/gi, "**$1**")
      .replace(/<em[^>]*>([^<]*)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>([^<]*)<\/i>/gi, "*$1*")
      .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([^<]*)<\/a>/gi, "[$2]($1)")
      .replace(/<li[^>]*>([^<]*)<\/li>/gi, "- $1\n")
      .replace(/<[^>]*>/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * Check if post already exists
 */
function postExists(title) {
  const filename = generateFilename(title);
  return fs.existsSync(path.join(BLOG_DIR, filename));
}

/**
 * Generate frontmatter YAML
 */
function generateFrontmatter(post) {
  const title = post.attributes.title;
  const publishedAt = new Date(post.attributes.published_at).toISOString();

  const content = post.attributes.content || "";
  const plainText = htmlToMarkdown(content)
    .replace(/[#*[\]()]/g, "")
    .trim();
  const description = plainText.slice(0, 160).replace(/"/g, '\\"');

  return `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description}${description.length === 160 ? "..." : ""}"
pubDatetime: ${publishedAt}
tags: []
draft: true
featured: false
source: "patreon"
originalUrl: "${post.attributes.url}"
---
`;
}

/**
 * Create blog post file
 */
function createBlogPost(post) {
  const filename = generateFilename(post.attributes.title);
  const filepath = path.join(BLOG_DIR, filename);

  const frontmatter = generateFrontmatter(post);
  const content = htmlToMarkdown(post.attributes.content || "");

  const markdown = frontmatter + "\n" + content;

  fs.writeFileSync(filepath, markdown);
  console.log(`✓ Created draft: ${filename}`);
  return filename;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("\n🦉 Fetching Patreon posts...\n");

    const campaignId = await getCreatorId();
    const posts = await fetchPublicPosts(campaignId);

    if (posts.length === 0) {
      console.log("No public posts found.");
      process.exit(0);
    }

    let imported = 0;
    let skipped = 0;

    for (const post of posts) {
      const title = post.attributes.title;

      if (postExists(title)) {
        console.log(`⊘ Skipped (already imported): ${title}`);
        skipped++;
      } else {
        createBlogPost(post);
        imported++;
      }
    }

    console.log(
      `\n✓ Complete: ${imported} new drafts, ${skipped} skipped\n`
    );
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

main();
