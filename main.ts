import { App, type Context, csrf, staticFiles } from "fresh";
import type { State } from "@/utils.ts";
import { trailingSlashes } from "fresh";
import { logger } from "@/middlewares/logger.ts";
import DefaultLayout from "@/layouts/default.tsx";
import { auth } from "@/lib/auth.ts";
import { authMiddleware } from "@/middlewares/auth.middleware.ts";

export const app = new App<State>()
  .use(csrf())
  .use(authMiddleware)
  .layout("*", DefaultLayout)
  .all("/api/auth/*", (ctx: Context<State>) => {
    return auth.handler(ctx.req);
  })
  .use(trailingSlashes("never"))
  .use(logger)
  .use(staticFiles())
  .fsRoutes();
