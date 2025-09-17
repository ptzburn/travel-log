import { defineConfig } from "drizzle-kit";
import env from "./lib/env.ts";

export default defineConfig({
  dialect: "turso",
  schema: "./lib/db/schema/main.ts",
  casing: "snake_case",
  out: "./lib/db/migrations",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.NODE_ENV === "development"
      ? undefined
      : env.TURSO_AUTH_TOKEN,
  },
});
