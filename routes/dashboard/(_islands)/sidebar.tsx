import {
  TbChevronLeft,
  TbChevronRight,
  TbCirclePlusFilled,
  TbLogout2,
  TbMap,
  TbMapPinFilled,
} from "@preact-icons/tb";
import SidebarButton from "../(_components)/sidebar-button.tsx";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { SideBarItem } from "@/utils.ts";
import { sideBarLocations } from "@/signals/sidebar.ts";

interface SidebarProps {
  currentPath: string;
  sideBarItems: SideBarItem[] | undefined;
}

function Sidebar({ currentPath, sideBarItems }: SidebarProps) {
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

  // Update sideBarLocations when sideBarItems prop changes
  useEffect(() => {
    sideBarLocations.value = sideBarItems ?? sideBarLocations.value;
  }, [sideBarItems]);

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
        <div
          class={`transition-all duration-300 overflow-hidden flex flex-col ${
            sideBarLocations.value.length > 0
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          {sideBarLocations.value.length > 0 && (
            <>
              <div class="divider" />
              {sideBarLocations.value.map((item, index) => (
                <SidebarButton
                  key={index}
                  label={item.label}
                  icon={<TbMapPinFilled size={24} />}
                  href={item.href}
                  currentPath={currentPath}
                  showLabel={isSidebarOpen.value}
                />
              ))}
            </>
          )}
        </div>
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
