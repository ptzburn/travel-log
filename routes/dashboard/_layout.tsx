import { define } from "@/utils.ts";
import Sidebar from "./(_islands)/sidebar.tsx";

export default define.layout(({ Component, url }) => {
  return (
    <div class="flex-1 flex">
      <Sidebar currentPath={url.pathname} />
      <div class="flex-1">
        <Component />
      </div>
    </div>
  );
});
