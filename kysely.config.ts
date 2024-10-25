import { narutwitterDBDialect } from "./src/lib/posts/service/db/database";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
  dialect: narutwitterDBDialect,
  migrations: {
    migrationFolder: "src/lib/posts/service/db/migrations",
  },
});
