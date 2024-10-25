import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface NarutwitterDatabase {
  users: UserTable;
  posts: PostTable;
  sessions: SessionTable;
}

export interface UserTable {
  id: Generated<number>;
  name: string;
  handle: string;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export interface PostTable {
  id: Generated<number>;
  authorId: number;
  content: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}
export type Post = Selectable<PostTable>;
export type NewPost = Insertable<PostTable>;
export type PostUpdate = Updateable<PostTable>;

export interface SessionTable {
  id: Generated<number>;
  email: string;
  token: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}
export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;
