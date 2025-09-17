import AuthButton from "@/islands/auth-button.tsx";
import ThemeToggle from "@/components/theme-toggle.tsx";
import { User } from "@/utils.ts";

interface NavBarProps {
  user: User | null;
}

function NavBar({ user }: NavBarProps) {
  return (
    <div class="navbar bg-primary text-primary-content">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl" href="/">
          Travel Log
        </a>
      </div>
      <div class="navbar-end">
        <ThemeToggle />
        <AuthButton user={user} />
      </div>
    </div>
  );
}

export default NavBar;
