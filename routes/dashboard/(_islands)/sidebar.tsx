import {
  TbChevronLeft,
  TbChevronRight,
  TbCirclePlusFilled,
  TbLogout2,
  TbMap,
} from "@preact-icons/tb";
import SidebarButton from "../(_components)/sidebar-button.tsx";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

interface SidebarProps {
  currentPath: string;
}

function Sidebar({ currentPath }: SidebarProps) {
  const isSidebarOpen = useSignal(true);

  // Initialize from localStorage only on client-side
  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem("isSidebarOpen");
      if (stored !== null) {
        isSidebarOpen.value = JSON.parse(stored);
      }
    }
  }, []);

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        "isSidebarOpen",
        isSidebarOpen.value.toString(),
      );
    }
  }

  return (
    <aside
      class={`bg-base-100 transition-all duration-300 ${
        isSidebarOpen.value ? "w-64" : "w-16"
      }`}
    >
      <button
        type="button"
        class={`flex w-full hover:cursor-pointer p-2 hover:bg-base-200 ${
          isSidebarOpen.value ? "justify-end" : "justify-center"
        }`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen.value
          ? <TbChevronLeft size={32} />
          : <TbChevronRight size={32} />}
      </button>
      <div class="flex flex-col">
        <SidebarButton
          label="Locations"
          icon={<TbMap size={24} />}
          href="/dashboard"
          currentPath={currentPath}
          showLabel={isSidebarOpen.value}
        />
        <SidebarButton
          label="Add Location"
          icon={<TbCirclePlusFilled size={24} />}
          href="/dashboard/add"
          currentPath={currentPath}
          showLabel={isSidebarOpen.value}
        />
        <div class="divider" />
        <SidebarButton
          label="Sign Out"
          icon={<TbLogout2 size={24} />}
          href="/sign-out"
          currentPath={currentPath}
          showLabel={isSidebarOpen.value}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
