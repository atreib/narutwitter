import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  handle: z.string(),
});
type User = z.output<typeof userSchema>;

const postSchema = z.object({
  id: z.number(),
  author: userSchema,
  content: z.string(),
  createdAt: z.date(),
});
type Post = z.output<typeof postSchema>;

export { userSchema, postSchema };
export type { User, Post };
