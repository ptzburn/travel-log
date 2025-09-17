import { computed, signal } from "@preact/signals";
import { Session, User } from "@/utils.ts";

export interface AuthState {
  user: ReturnType<typeof computed<User | null>>;
  session: ReturnType<typeof computed<Session | null>>;
  isPending: ReturnType<typeof signal<boolean>>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  init: (user: User | null, session: Session | null) => void;
}
