import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;