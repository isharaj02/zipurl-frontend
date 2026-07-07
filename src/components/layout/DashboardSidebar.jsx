import { NavLink } from "react-router-dom";
import { Home, Link2, BarChart3, Settings } from "lucide-react";

function DashboardSidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "My URLs",
      path: "/dashboard/urls",
      icon: Link2,
    },
    
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 border-r bg-background p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;