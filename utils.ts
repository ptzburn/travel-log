import { createDefine } from "fresh";
import { auth } from "./lib/auth.ts";
import { signal } from "@preact/signals";
import { SelectLocation } from "./lib/db/schema/location.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;

export interface State {
  user: User | null;
  session: Session | null;
  locations: SelectLocation[] | undefined;
}

export const define = createDefine<State>();

export const isLoading = signal(false);
