import { Post } from "../types";

type IPostsService = {
  getPosts: () => Promise<Post[]>;
  createPost: (props: {
    authorId: Post["author"]["id"];
    content: Post["content"];
    character: string;
  }) => Promise<Omit<Post, "author">>;
};

export type { IPostsService };
