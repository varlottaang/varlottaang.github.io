#!/usr/bin/env node

/**
 * Fetch public posts from Patreon and create blog post drafts
 *
 * Scrapes https://www.patreon.com/c/varlotta/posts (public posts page)
 * No API token required, no authentication needed.
 *
 * Usage: node scripts/fetch-patreon-posts.js
 */

import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "../src/content/blog");
const PATREON_URL = "https://www.patreon.com/c/varlotta/posts";

/**
 * Fetch a URL and return the response text
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { timeout: 10000 }, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          if (res.statusCode === 200) {
            resolve(data);
          } else {
            reject(
              new Error(
                `HTTP ${res.statusCode} when fetching ${url.split("?")[0]}`
              )
            );
          }
        });
      })
      .on("error", reject);
  });
}

/**
 * Extract posts from Patreon creator page
 * Returns array of { title, url, publishedAt }
 */
async function fetchPostsFromProfile() {
  try {
    console.log(`Fetching ${PATREON_URL}...`);
    const html = await fetchUrl(PATREON_URL);
    const $ = cheerio.load(html);

    const posts = [];

    // Debug: Log page title to confirm we got the right page
    const pageTitle = $("title").text();
    console.log(`Page title: ${pageTitle}`);

    // Look for post links in the feed
    // Patreon uses various selectors, try multiple approaches
    const postElements = $('a[href*="/posts/"]');
    console.log(`Found ${postElements.length} links with "/posts/" in href`);

    if (postElements.length === 0) {
      console.warn(
        "No posts found on profile. Patreon may have changed their HTML structure."
      );
      console.log("Attempting alternative selectors...");

      // Try alternative selectors
      const altLinks = $('a[href*="patreon.com"]').filter((_, el) => {
        const href = $(el).attr("href") || "";
        return href.includes("/posts/") || href.includes("post");
      });
      console.log(`Found ${altLinks.length} links with alternative selector`);

      if (altLinks.length > 0) {
        console.log("Sample links found:");
        altLinks.slice(0, 3).each((_, el) => {
          console.log(`  - ${$(el).attr("href")}`);
        });
      }

      return [];
    }

    // Extract unique post URLs
    const seenUrls = new Set();

    postElements.each((_, element) => {
      const url = $(element).attr("href");
      if (url && url.includes("/posts/") && !seenUrls.has(url)) {
        seenUrls.add(url);
        const fullUrl = url.startsWith("http")
          ? url
          : `https://www.patreon.com${url}`;
        posts.push({
          url: fullUrl,
          title: null, // Will be extracted when fetching individual post
        });
      }
    });

    console.log(`Found ${posts.length} potential posts`);
    if (posts.length > 0) {
      console.log("First post URL:", posts[0].url);
    }
    return posts.slice(0, 20); // Limit to 20 most recent
  } catch (error) {
    console.error("Error fetching Patreon profile:", error.message);
    return [];
  }
}

/**
 * Fetch a single post and extract title and content
 */
async function fetchPostContent(postUrl) {
  try {
    const html = await fetchUrl(postUrl);
    const $ = cheerio.load(html);

    // Extract title
    const title =
      $('h1').first().text().trim() ||
      $('[data-testid="post-title"]').text().trim() ||
      $('meta[property="og:title"]').attr("content") ||
      "Untitled";

    console.log(`  Title: "${title}"`);

    // Extract publication date from meta tags or structured data
    let publishedAt = new Date().toISOString();
    const dateStr =
      $('meta[property="article:published_time"]').attr("content") ||
      $('[data-testid="post-date"]').text().trim();

    if (dateStr) {
      const parsed = new Date(dateStr);
      if (!isNaN(parsed.getTime())) {
        publishedAt = parsed.toISOString();
      }
    }

    // Extract content - Patreon usually has it in specific containers
    let content = "";
    const contentSelectors = [
      '[data-testid="post-content"]',
      "article",
      '[class*="content"]',
    ];

    for (const selector of contentSelectors) {
      const elem = $(selector).first();
      if (elem.length > 0) {
        content = elem.html() || "";
        if (content) {
          console.log(`  Content found with selector: ${selector}`);
          break;
        }
      }
    }

    if (!content) {
      console.warn(`  ⚠ No content found for post`);
    }

    return { title, content, publishedAt, url: postUrl };
  } catch (error) {
    console.error(`Error fetching post ${postUrl}:`, error.message);
    return null;
  }
}

/**
 * Convert HTML to Markdown
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
 * Generate kebab-case filename from title
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
 * Check if post already exists
 */
function postExists(title) {
  const filename = generateFilename(title);
  return fs.existsSync(path.join(BLOG_DIR, filename));
}

/**
 * Generate frontmatter
 */
function generateFrontmatter(post) {
  const title = post.title;
  const pubDatetime = post.publishedAt;

  // Extract plain text description from content
  const plainText = htmlToMarkdown(post.content)
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
originalUrl: "${post.url}"
---
`;
}

/**
 * Create blog post file
 */
function createBlogPost(post) {
  const filename = generateFilename(post.title);
  const filepath = path.join(BLOG_DIR, filename);

  const frontmatter = generateFrontmatter(post);
  const content = htmlToMarkdown(post.content);

  const markdown = frontmatter + "\n" + content;

  fs.writeFileSync(filepath, markdown);
  console.log(`✓ Created draft: ${filename}`);
  return filename;
}

/**
 * Main function
 */
async function main() {
  console.log(`\n🦉 Fetching public posts from Patreon...\n`);

  try {
    const postUrls = await fetchPostsFromProfile();

    if (postUrls.length === 0) {
      console.log("No posts found.");
      process.exit(0);
    }

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    // Fetch each post with a small delay to avoid rate limiting
    for (let i = 0; i < postUrls.length; i++) {
      const postUrl = postUrls[i];

      console.log(
        `[${i + 1}/${postUrls.length}] Fetching ${postUrl.split("/").pop()}...`
      );

      // Small delay between requests
      if (i > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const post = await fetchPostContent(postUrl);

      if (!post) {
        failed++;
        continue;
      }

      if (postExists(post.title)) {
        console.log(`  ⊘ Skipped (already imported)`);
        skipped++;
      } else {
        createBlogPost(post);
        imported++;
      }
    }

    console.log(
      `\n✓ Complete: ${imported} new, ${skipped} skipped, ${failed} failed\n`
    );
    process.exit(0);
  } catch (error) {
    console.error("Fatal error:", error);
    process.exit(1);
  }
}

main();
