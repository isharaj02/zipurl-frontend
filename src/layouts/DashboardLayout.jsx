import { Outlet } from "react-router-dom";

import DashboardNavbar from "@/components/layout/DashboardNavbar";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardNavbar />

      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;