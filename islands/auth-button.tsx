import { TbBrandGithub, TbLogout2 } from "@preact-icons/tb";
import { User } from "@/utils.ts";
import { isLoading, signIn } from "@/lib/auth-client.ts";

interface AuthButtonProps {
  user: User | null;
}

function AuthButton({ user }: AuthButtonProps) {
  return (
    <>
      {!isLoading.value && user
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
            onClick={signIn}
            disabled={isLoading.value}
          >
            Sign in with GitHub
            {isLoading.value && (
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
