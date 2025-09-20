import { define } from "@/utils.ts";
import AuthButton from "@/islands/auth-button.tsx";

export default define.page(function Home({ state }) {
  return (
    <div class="hero bg-base-300 container mx-auto mt-4 min-h-96">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Travel Log</h1>
          <p class="py-6">
            Keep track of your travels and adventures with this simple travel
            log app. Add locations, photos, and notes to create a digital
            journal of your journeys.
          </p>
          {state.user
            ? (
              <a
                class="btn btn-primary"
                href="/dashboard"
              >
                Start Logging
              </a>
            )
            : <AuthButton user={state.user} />}
        </div>
      </div>
    </div>
  );
});
