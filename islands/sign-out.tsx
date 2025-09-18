import { useEffect } from "preact/hooks";
import { signOut } from "@/lib/auth-client.ts";

export default function SignOut() {
  useEffect(() => {
    signOut();
  }, []);

  return (
    <div class="card bg-base-300 container mt-4 min-h-72 mx-auto text-center flex flex-col justify-center items-center gap-4">
      <span class="loading loading-spinner loading-xl" />
    </div>
  );
}
