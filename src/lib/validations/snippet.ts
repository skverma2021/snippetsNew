import { z } from "zod";

// export const createSnippetSchema = z.object({
//   title: z
//     .string()
//     .min(3, "Title must be at least 3 characters")
//     .max(100, "Title must be at most 100 characters"),

//   code: z
//     .string()
//     .min(5, "Code must be at least 5 characters"),
// });



export const createSnippetSchema = z.object({
  title: z.string().min(3).max(100, "Title must be at most 100 characters"),
  code: z.string().min(5),
});

export const updateSnippetSchema = createSnippetSchema.extend({
  id: z.string().min(1),
});

// export type CreateSnippetInput = z.infer<typeof createSnippetSchema>;


