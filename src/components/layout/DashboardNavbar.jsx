import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashboardNavbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <h1 className="text-xl font-bold">Dashboard</h1>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

export default DashboardNavbar;