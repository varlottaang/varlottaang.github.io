import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: context.site ?? SITE.website,
    items: posts
      .filter(post => !post.data.draft)
      .sort((a, b) => new Date(b.data.pubDatetime).valueOf() - new Date(a.data.pubDatetime).valueOf())
      .map(post => ({
        link: `/blog/${post.slug}/`,
        title: post.data.title,
        description: post.data.description,
        pubDate: new Date(post.data.pubDatetime),
      })),
  });
}
