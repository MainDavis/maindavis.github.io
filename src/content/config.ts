import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { blog, projects };
