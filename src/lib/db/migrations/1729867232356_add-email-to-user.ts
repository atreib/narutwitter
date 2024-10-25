import type { Kysely } from "kysely";
import { NarutwitterDatabase } from "../types";

export async function up(db: Kysely<NarutwitterDatabase>): Promise<void> {
  await db.schema
    .alterTable("users")
    .addColumn("email", "varchar", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<NarutwitterDatabase>): Promise<void> {
  await db.schema.alterTable("users").dropColumn("email").execute();
}
