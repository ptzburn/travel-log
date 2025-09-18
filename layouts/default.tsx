import NavBar from "@/components/nav-bar.tsx";
import { define } from "@/utils.ts";

export default define.layout(function DefaultLayout({ Component, state }) {
  return (
    <div class="flex min-h-screen flex-col">
      <NavBar user={state.user} />
      <main class="flex-1 flex flex-col">
        <Component />
      </main>
    </div>
  );
});
