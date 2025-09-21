import { JSX } from "preact";
import { useComputed } from "@preact/signals";
import { selectedMapPoint } from "@/signals/map.ts";
import { MapPoint } from "@/lib/types.ts";
import { TbMapPinFilled } from "@preact-icons/tb";

interface SidebarButtonProps {
  location?: MapPoint | null;
  label: string;
  icon: JSX.Element;
  href: string;
  currentPath: string;
  showLabel: boolean;
}

function SidebarButton({
  location = null,
  label,
  icon,
  href,
  currentPath,
  showLabel,
}: SidebarButtonProps) {
  const isSelected = useComputed(() =>
    selectedMapPoint.value?.id === location?.id
  );

  const handleMouseEnter = () => {
    selectedMapPoint.value = location;
  };

  const handleMouseLeave = () => {
    selectedMapPoint.value = null;
  };

  const locationIcon = location
    ? <TbMapPinFilled class={isSelected.value ? "text-accent" : ""} size={24} />
    : icon;
  return (
    <div
      class="tooltip tooltip-right"
      data-tip={!showLabel ? label : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={href}
        class={`flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer ${
          currentPath === href ? "bg-base-200" : ""
        }
      ${showLabel ? "justify-start" : "justify-center"}
      `}
      >
        {locationIcon}
        <span
          class={`transition-all duration-200 ease-in-out overflow-hidden whitespace-nowrap ${
            showLabel
              ? "opacity-100 scale-100 max-w-32"
              : "opacity-0 scale-0 max-w-0"
          }`}
        >
          {label}
        </span>
      </a>
    </div>
  );
}

export default SidebarButton;
