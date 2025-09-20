import { TbMoon, TbSun } from "@preact-icons/tb";

function ThemeToggle() {
  return (
    <label class="swap swap-rotate mx-4">
      {/* this hidden checkbox controls the state */}
      <input
        id="theme-toggle"
        type="checkbox"
        class="theme-controller"
        value="light"
      />

      {/* sun icon */}
      <i id="theme-light" class="swap-off">
        <TbSun size={24} />
      </i>

      {/* moon icon */}
      <i id="theme-dark" class="swap-on">
        <TbMoon size={24} />
      </i>
    </label>
  );
}

export default ThemeToggle;
