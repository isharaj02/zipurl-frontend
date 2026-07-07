import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/", { replace: true});
  };
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-bold"
        >
          ZipUrl
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:opacity-70"
          >
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:opacity-70"
              >
                Dashboard
              </Link>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:opacity-70"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm font-medium hover:opacity-70"
              >
                Register
              </Link>
            </>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;