import { z } from "zod";

export const createSnippetSchema = z.object({
  title: z.string().min(3).max(100, "Title must be at most 100 characters"),
  code: z.string().min(5),
});

export const updateSnippetSchema = createSnippetSchema.extend({
  id: z.string().min(1),
});


