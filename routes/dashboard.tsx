import { define } from "@/utils.ts";
import Sidebar from "@/islands/sidebar.tsx";

export default define.page(function Dashboard(ctx) {
  return (
    <div class="flex-1 flex">
      <Sidebar currentPath={ctx.url.pathname} />
      <div class="flex-1" />
    </div>
  );
});
