import { Post } from "../types";
import { Session } from "./db/types";

type IPostsService = {
  getPosts: () => Promise<Post[]>;
  createPost: (props: {
    authorId: Post["author"]["id"];
    content: Post["content"];
    character: string;
  }) => Promise<Omit<Post, "author">>;
};

type ISessionsService = {
  createSession: (props: {
    email: string;
    hashedToken: string;
  }) => Promise<void>;
  deleteSession: (props: { email: string }) => Promise<void>;
  getSession: (props: {
    email: string;
    hashedToken: string;
  }) => Promise<Session | undefined>;
};

export type { IPostsService, ISessionsService };
