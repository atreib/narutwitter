import { ColumnType, Generated } from "kysely";

export interface NarutwitterDatabase {
  users: UserTable;
  posts: PostTable;
  sessions: SessionTable;
}

interface UserTable {
  id: Generated<number>;
  name: string;
  handle: string;
  email: string;
}

interface PostTable {
  id: Generated<number>;
  authorId: number;
  content: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

interface SessionTable {
  id: Generated<number>;
  email: string;
  token: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}
