"use server";

import { revalidatePath } from "next/cache";
import { postsService } from "../service";

export async function createPost(content: string) {
  const post = await postsService.createPost({
    authorId: 1,
    content,
  });
  revalidatePath("/");
  return post;
}
