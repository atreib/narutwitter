"use server";

import { revalidatePath } from "next/cache";
import { postsService } from "../service";
import { User } from "@/lib/users/types";

export async function createPost(
  content: string,
  character: string,
  userId: User["id"]
) {
  const post = await postsService.createPost({
    authorId: userId,
    content,
    character,
  });
  revalidatePath("/");
  return post;
}
