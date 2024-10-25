import { translate } from "@/lib/ai";
import { IPostsService, ISessionsService } from "./contract";
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

const sessionsService: ISessionsService = {
  createSession: async ({ email, token }) => {
    await db
      .insertInto("sessions")
      .values({
        email,
        token,
        createdAt: new Date().toISOString(),
      })
      .execute();
  },
  deleteSession: async ({ email }) => {
    await db.deleteFrom("sessions").where("email", "=", email).execute();
  },
  getSession: async ({ email, token }) => {
    const session = await db
      .selectFrom("sessions")
      .where("email", "=", email)
      .where("token", "=", token)
      .selectAll()
      .executeTakeFirst();
    return session;
  },
};

export { postsService, sessionsService };
