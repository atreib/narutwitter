import { z } from "zod";

const postSchema = z.object({
  id: z.number(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    handle: z.string(),
  }),
  content: z.string(),
  createdAt: z.date(),
});
type Post = z.output<typeof postSchema>;

export { postSchema };
export type { Post };
