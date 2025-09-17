import { createDefine } from "fresh";
import { auth } from "./lib/auth.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;

export interface State {
  user: User | null;
  session: Session | null;
}

export const define = createDefine<State>();
