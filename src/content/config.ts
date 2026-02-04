import { defineCollection, z } from "astro:content";

const blogEs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
  }),
});

const blogEn = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
  }),
});

const projectsEs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

const projectsEn = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = {
  blogEs,
  blogEn,
  projectsEs,
  projectsEn,
};
