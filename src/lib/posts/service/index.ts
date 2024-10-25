import { translate } from "@/lib/ai";
import { IPostsService } from "./contract";
import { db } from "./db/database";

const postsService: IPostsService = {
  getPosts: async () => {
    const posts = await db
      .selectFrom("posts")
      .innerJoin("users", "posts.authorId", "users.id")
      .select([
        "posts.id",
        "posts.content",
        "posts.createdAt",
        "users.id as authorId",
        "users.name",
        "users.handle",
      ])
      .orderBy("posts.createdAt", "desc")
      .execute();
    return posts.map((x) => ({
      id: x.id,
      content: x.content,
      createdAt: x.createdAt,
      author: {
        id: x.authorId,
        name: x.name,
        handle: x.handle,
      },
    }));
  },
  createPost: async ({ authorId, content, character }) => {
    const translatedContent = await translate(content, character);
    const createdPost = await db
      .insertInto("posts")
      .values({
        authorId,
        content: translatedContent ?? content,
        createdAt: new Date().toISOString(),
      })
      .returningAll()
      .executeTakeFirst();
    if (!createdPost) throw new Error("Failed to create post");
    return createdPost;
  },
};

export { postsService };
