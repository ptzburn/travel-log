import { User } from "@/utils.ts";
import AuthButton from "./auth-button.tsx";

export default function CTALanding({ user }: { user: User | null }) {
  return (
    <>
      {user
        ? <a class="btn btn-primary" href="/dashboard">Start Logging</a>
        : <AuthButton user={user} />}
    </>
  );
}
