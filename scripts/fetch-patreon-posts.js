#!/usr/bin/env node

/**
 * Fetch public posts from Patreon and create blog post drafts
 *
 * Usage: PATREON_TOKEN=your_token PATREON_CREATOR_ID=123 node scripts/fetch-patreon-posts.js
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

const PATREON_TOKEN = process.env.PATREON_TOKEN;
const PATREON_CREATOR_ID = process.env.PATREON_CREATOR_ID;
const BLOG_DIR = path.join(__dirname, "../src/content/blog");

if (!PATREON_TOKEN || !PATREON_CREATOR_ID) {
  console.error(
    "Error: PATREON_TOKEN and PATREON_CREATOR_ID environment variables are required"
  );
  process.exit(1);
}

/**
 * Make HTTPS request to Patreon API
 */
function patreonRequest(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "www.patreon.com",
      path: url,
      method: "GET",
      headers: {
        Authorization: `Bearer ${PATREON_TOKEN}`,
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
            resolve(JSON.parse(data));
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
 * Fetch public posts from creator's campaign
 */
async function fetchPublicPosts() {
  try {
    const url = `/api/oauth2/v2/campaigns/${PATREON_CREATOR_ID}/posts?include=user&fields[post]=title,content,published_at,url,is_public&sort=-published_at&page[size]=20`;

    const data = await patreonRequest(url);
    const posts = data.data || [];

    // Filter for public posts only
    return posts.filter((post) => post.attributes.is_public === true);
  } catch (error) {
    console.error("Error fetching Patreon posts:", error.message);
    process.exit(1);
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
      .replace(/[^\w\s-]/g, "") // Remove special chars
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .slice(0, 60) + ".md"
  );
}

/**
 * Parse Patreon post content (HTML) into markdown
 * Simple converter for basic HTML to markdown
 */
function htmlToMarkdown(html) {
  if (!html) return "";

  return (
    html
      // Remove script/style tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      // Convert heading tags
      .replace(/<h1[^>]*>([^<]*)<\/h1>/gi, "# $1\n")
      .replace(/<h2[^>]*>([^<]*)<\/h2>/gi, "## $1\n")
      .replace(/<h3[^>]*>([^<]*)<\/h3>/gi, "### $1\n")
      .replace(/<h4[^>]*>([^<]*)<\/h4>/gi, "#### $1\n")
      .replace(/<h5[^>]*>([^<]*)<\/h5>/gi, "##### $1\n")
      .replace(/<h6[^>]*>([^<]*)<\/h6>/gi, "###### $1\n")
      // Convert paragraph tags
      .replace(/<p[^>]*>([^<]*)<\/p>/gi, "$1\n\n")
      // Convert line breaks
      .replace(/<br\s*\/?>/gi, "\n")
      // Convert bold
      .replace(/<strong[^>]*>([^<]*)<\/strong>/gi, "**$1**")
      .replace(/<b[^>]*>([^<]*)<\/b>/gi, "**$1**")
      // Convert italic
      .replace(/<em[^>]*>([^<]*)<\/em>/gi, "*$1*")
      .replace(/<i[^>]*>([^<]*)<\/i>/gi, "*$1*")
      // Convert links
      .replace(/<a[^>]*href=["']([^"']*)["'][^>]*>([^<]*)<\/a>/gi, "[$2]($1)")
      // Convert lists
      .replace(/<li[^>]*>([^<]*)<\/li>/gi, "- $1\n")
      // Remove remaining tags
      .replace(/<[^>]*>/g, "")
      // Clean up multiple newlines
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

/**
 * Check if post already exists in blog
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
  const publishedAt = new Date(post.attributes.published_at);
  const pubDatetime = publishedAt.toISOString();

  // Use first 160 chars of content as description
  const content = post.attributes.content || "";
  const plainText = htmlToMarkdown(content)
    .replace(/[#*[\]()]/g, "")
    .trim();
  const description = plainText.slice(0, 160).replace(/"/g, '\\"');

  return `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description}${description.length === 160 ? "..." : ""}"
pubDatetime: ${pubDatetime}
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
  console.log(`Created draft: ${filename}`);
  return filename;
}

/**
 * Main function
 */
async function main() {
  console.log("Fetching public Patreon posts...");

  const posts = await fetchPublicPosts();
  console.log(`Found ${posts.length} public posts`);

  let imported = 0;
  let skipped = 0;

  for (const post of posts) {
    const title = post.attributes.title;

    if (postExists(title)) {
      console.log(`Skipped (already exists): ${title}`);
      skipped++;
    } else {
      createBlogPost(post);
      imported++;
    }
  }

  console.log(`\nImport complete: ${imported} new drafts, ${skipped} skipped`);
  process.exit(0);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
