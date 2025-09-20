import { JSX } from "preact";

interface SidebarButtonProps {
  label: string;
  icon: JSX.Element;
  href: string;
  currentPath: string;
  showLabel: boolean;
}

function SidebarButton({
  label,
  icon,
  href,
  currentPath,
  showLabel,
}: SidebarButtonProps) {
  return (
    <div class="tooltip tooltip-right" data-tip={!showLabel ? label : ""}>
      <a
        href={href}
        class={`flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer ${
          currentPath === href ? "bg-base-200" : ""
        }
      ${showLabel ? "justify-start" : "justify-center"}
      `}
      >
        {icon}
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
