import { define } from "@/utils.ts";
import Sidebar from "./(_islands)/sidebar.tsx";
import Map from "./(_islands)/map.tsx";

export default define.layout(({ Component, url, state }) => {
  return (
    <div class="flex-1 flex">
      <Sidebar currentPath={url.pathname} sideBarItems={state.locations} />
      <div class="flex-1 flex flex-col">
        <Component />
        <Map />
      </div>
    </div>
  );
});
