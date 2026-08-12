#!/usr/bin/env node

/**
 * Fetch new posts from Substack RSS feed and create blog post drafts
 *
 * Usage: SUBSTACK_RSS_URL=https://drawanowl.substack.com/feed node scripts/fetch-substack-posts.js
 */

import Parser from "rss-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../src/content/blog");
const SUBSTACK_RSS_URL =
  process.env.SUBSTACK_RSS_URL || "https://drawanowl.substack.com/feed";

const parser = new Parser();

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
 * Convert HTML to Markdown
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
 * Remove Substack promotional content
 */
function removeSubstackPromo(content) {
  return (
    content
      // Remove "draw an owl is a reader-supported publication..."
      .replace(
        /draw an owl is a reader-supported publication[\s\S]*?(?=\n\n|$)/gi,
        ""
      )
      // Remove "Thanks for reading draw an owl!..."
      .replace(
        /Thanks for reading draw an owl![\s\S]*?(?=\n\n|$)/gi,
        ""
      )
      // Remove share prompts
      .replace(/Share\s+[\s\S]*?(?=\n\n|$)/gi, "")
      // Clean up excessive newlines
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
function generateFrontmatter(item) {
  const title = item.title;
  const pubDatetime = new Date(item.pubDate).toISOString();

  const content = item.content || item.description || "";
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
source: "substack"
originalUrl: "${item.link}"
---
`;
}

/**
 * Create blog post file
 */
function createBlogPost(item) {
  const filename = generateFilename(item.title);
  const filepath = path.join(BLOG_DIR, filename);

  const frontmatter = generateFrontmatter(item);
  const rawContent = item.content || item.description || "";
  let content = htmlToMarkdown(rawContent);
  content = removeSubstackPromo(content);

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
    console.log(`\n🦉 Fetching Substack posts from ${SUBSTACK_RSS_URL}...\n`);

    const feed = await parser.parseURL(SUBSTACK_RSS_URL);
    const items = feed.items || [];

    if (items.length === 0) {
      console.log("No posts found in RSS feed.");
      process.exit(0);
    }

    console.log(`Found ${items.length} posts in feed\n`);

    let imported = 0;
    let skipped = 0;

    for (const item of items) {
      const title = item.title;

      if (postExists(title)) {
        console.log(`⊘ Skipped (already imported): ${title}`);
        skipped++;
      } else {
        createBlogPost(item);
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
