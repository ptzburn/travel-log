import { TbBrandGithub, TbLogout2 } from "@preact-icons/tb";
import { authState } from "@/lib/auth-client.ts";
import { User } from "@/utils.ts";

function AuthButton({ user }: { user: User | null }) {
  const isLoading = authState.isLoading.value;

  return (
    <>
      {!isLoading && user
        ? (
          <div class="dropdown dropdown-end">
            <div tabIndex={0} role="button" class="btn m-1">
              <div class="avatar" hidden={!user?.image}>
                <div class="w-8 rounded-full">
                  <img
                    src={user.image ?? ""}
                    alt={user.name}
                  />
                </div>
              </div>
              {user.name}
            </div>
            <ul
              tabIndex={0}
              class="dropdown-content menu bg-base-200 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a href="/sign-out">
                  <TbLogout2 size={24} />
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        )
        : (
          <button
            type="button"
            class="btn btn-accent"
            onClick={authState.signIn}
            disabled={isLoading}
          >
            Sign in with GitHub
            {isLoading && (
              <span class="loading loading-spinner loading-md">
              </span>
            )}
            <TbBrandGithub size={24} />
          </button>
        )}
    </>
  );
}

export default AuthButton;
