import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border px-3 py-2"
    >
      {theme === "light" ? (
        <Moon size={18} />
      ) : (
        <Sun size={18} />
      )}
    </button>
  );
}

export default ThemeToggle;