import type { Kysely } from "kysely";
import { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable("users")
    .addColumn("email", "varchar", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.alterTable("users").dropColumn("email").execute();
}
