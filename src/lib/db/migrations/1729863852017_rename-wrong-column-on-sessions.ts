import type { Kysely } from "kysely";
import { Database } from "../types";

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable("sessions")
    .renameColumn("hashedToken", "token")
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable("sessions")
    .renameColumn("token", "hashedToken")
    .execute();
}
