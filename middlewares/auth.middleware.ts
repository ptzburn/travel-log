import { define, State } from "@/utils.ts";
import { auth } from "@/lib/auth.ts";
import { Context, HttpError } from "fresh";

export const authMiddleware = define.middleware(async (ctx: Context<State>) => {
  console.log(`Auth middleware: ${ctx.req.method} ${ctx.req.url}`);

  const session = await auth.api.getSession({ headers: ctx.req.headers });
  console.log(`Session exists: ${!!session}`);

  if (!session) {
    ctx.state.user = null;
    ctx.state.session = null;
    console.log(
      `Checking if URL includes /dashboard: ${
        ctx.req.url.includes("/dashboard")
      }`,
    );
    if (ctx.req.url.includes("/dashboard")) {
      console.log("Throwing 401 Unauthorized");
      throw new HttpError(401, "Unauthorized");
    }
    return await ctx.next();
  }

  ctx.state.user = session.user;
  ctx.state.session = session.session;

  return await ctx.next();
});
