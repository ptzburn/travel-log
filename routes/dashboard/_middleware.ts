import { define, State } from "@/utils.ts";
import { Context } from "fresh";
import { findLocations } from "@/lib/db/queries/location.ts";

export default define.middleware(async (ctx: Context<State>) => {
  if (ctx.state.user) {
    const locations = await findLocations(Number(ctx.state.user.id));
    ctx.state.locations = locations;
  }
  return await ctx.next();
});
