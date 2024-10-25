import { Post } from "../types";

type IPostsService = {
  getPosts: () => Promise<Post[]>;
  createPost: (props: {
    authorId: Post["author"]["id"];
    content: Post["content"];
  }) => Promise<Omit<Post, "author">>;
};

export type { IPostsService };
