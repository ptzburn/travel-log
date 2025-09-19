import { define } from "@/utils.ts";
import Sidebar from "@/islands/sidebar.tsx";

export default define.layout(function DashboardLayout({ Component, url }) {
  return (
    <div class="flex-1 flex">
      <Sidebar currentPath={url.pathname} />
      <div class="flex-1">
        <Component />
      </div>
    </div>
  );
});
