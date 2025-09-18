import { createAuthClient } from "better-auth/react";
import { signal } from "@preact/signals";

export const authClient = createAuthClient();

export const isLoading = signal(false);

export async function signIn() {
  isLoading.value = true;
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
    errorCallbackURL: "/error",
  });
  isLoading.value = false;
}

export async function signOut() {
  isLoading.value = true;
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        globalThis.location.href = "/";
      },
      onError: () => {
        globalThis.location.href = "/error";
      },
    },
  });
  isLoading.value = false;
}
