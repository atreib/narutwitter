import { narutwitterDBDialect } from "./src/lib/db/database";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
  dialect: narutwitterDBDialect,
  migrations: {
    migrationFolder: "src/lib/db/migrations",
  },
});
