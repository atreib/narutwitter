import { Database } from "./types";
import { Pool } from "pg";
import { Kysely, PostgresDialect } from "kysely";

export const dbDialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.POSTS_DB_DATABASE,
    host: process.env.POSTS_DB_HOST,
    user: process.env.POSTS_DB_USER,
    port: parseInt(process.env.POSTS_DB_PORT!),
    password: process.env.POSTS_DB_PASSWORD,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect: dbDialect,
});
