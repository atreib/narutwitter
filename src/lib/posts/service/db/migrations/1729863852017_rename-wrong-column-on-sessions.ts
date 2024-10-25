import type { Kysely } from "kysely";
import { NarutwitterDatabase } from "../types";

export async function up(db: Kysely<NarutwitterDatabase>): Promise<void> {
  await db.schema
    .alterTable("sessions")
    .renameColumn("hashedToken", "token")
    .execute();
}

export async function down(db: Kysely<NarutwitterDatabase>): Promise<void> {
  await db.schema
    .alterTable("sessions")
    .renameColumn("token", "hashedToken")
    .execute();
}
