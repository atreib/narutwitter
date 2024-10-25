import type { Kysely } from "kysely";
import { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("handle", "text", (col) => col.notNull())
    .execute();

  await db.schema
    .createTable("posts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("authorId", "integer", (col) =>
      col.references("users.id").onDelete("cascade").notNull()
    )
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.notNull().defaultTo("now()")
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable("posts").execute();
  await db.schema.dropTable("users").execute();
}
