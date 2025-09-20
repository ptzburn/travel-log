import { define, State } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";
import { Context, HttpError } from "fresh";

export const authMiddleware = define.middleware(async (ctx: Context<State>) => {
  const session = await auth.api.getSession({ headers: ctx.req.headers });

  if (!session) {
    ctx.state.user = null;
    ctx.state.session = null;
    if (ctx.req.url.includes("/dashboard")) {
      throw new HttpError(401, "Unauthorized");
    }
    return await ctx.next();
  }

  ctx.state.user = session.user;
  ctx.state.session = session.session;

  return await ctx.next();
});
