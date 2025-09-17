import { z, ZodError } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "testing", "production"]).default(
    "development",
  ),
  TURSO_DATABASE_URL: z.url(),
  TURSO_AUTH_TOKEN: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  AUTH_GITHUB_CLIENT_ID: z.string(),
  AUTH_GITHUB_CLIENT_SECRET: z.string(),
});

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
  env = EnvSchema.parse(Deno.env.toObject());
} catch (error) {
  if (error instanceof ZodError) {
    const missingValues = Object.keys(z.flattenError(error).fieldErrors).join(
      "\n",
    );
    console.error("Missing required variables in .env:\n" + missingValues);
  }
  Deno.exit(1);
}

export default env;
