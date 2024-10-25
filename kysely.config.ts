import { dbDialect } from "./src/lib/db/database";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
  dialect: dbDialect,
  migrations: {
    migrationFolder: "src/lib/db/migrations",
  },
});
