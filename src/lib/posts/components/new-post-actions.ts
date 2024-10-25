"use server";

import { revalidatePath } from "next/cache";
import { postsService } from "../service";

export async function createPost(content: string, character: string) {
  const post = await postsService.createPost({
    authorId: 1,
    content,
    character,
  });
  revalidatePath("/");
  return post;
}
