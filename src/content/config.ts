import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional().nullable(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    ogImage: z.string().optional(),
    source: z.enum(["substack", "patreon", "personal"]).optional(),
    originalUrl: z.string().optional(),
  }),
});

export const collections = { blog };
