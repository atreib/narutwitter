import type { Kysely } from "kysely";
import { NarutwitterDatabase } from "../types";

export async function up(db: Kysely<NarutwitterDatabase>): Promise<void> {
  await db.schema
    .createTable("sessions")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("email", "text", (col) => col.notNull())
    .addColumn("hashedToken", "text", (col) => col.notNull())
    .addColumn("createdAt", "timestamp", (col) =>
      col.notNull().defaultTo("now()")
    )
    .execute();
}

export async function down(db: Kysely<NarutwitterDatabase>): Promise<void> {
  await db.schema.dropTable("sessions").execute();
}