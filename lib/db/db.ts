import { drizzle } from "drizzle-orm/libsql/web";
import env from "../../lib/env.ts";
import * as schema from "./schema/main.ts";

const db = drizzle({
  connection: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.NODE_ENV === "development"
      ? undefined
      : env.TURSO_AUTH_TOKEN,
  },
  casing: "snake_case",
  schema,
});

export default db;
