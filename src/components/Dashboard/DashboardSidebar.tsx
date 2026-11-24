import type { ElementType } from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Heart,
  User,
  Settings,
  LogOut,
  X,
  Users,
  ChevronRight,
} from "lucide-react";

interface MenuItem {
  name: string;
  path: string;
  icon: ElementType;
}

interface DashboardSidebarProps {
  role: "student" | "agency";
  userName: string;
  sidebarOpen: boolean;
  onClose: () => void;
}

const studentMenu: MenuItem[] = [
  {
    name: "Overview",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Applications",
    path: "/student/applications",
    icon: FileText,
  },
  {
    name: "Saved Universities",
    path: "/student/saved",
    icon: Heart,
  },
  {
    name: "My Profile",
    path: "/student/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/student/settings",
    icon: Settings,
  },
];

const agencyMenu: MenuItem[] = [
  {
    name: "Overview",
    path: "/agency/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Universities",
    path: "/agency/universities",
    icon: GraduationCap,
  },
  {
    name: "Students",
    path: "/agency/students",
    icon: Users,
  },
  {
    name: "Applications",
    path: "/agency/applications",
    icon: FileText,
  },
  {
    name: "My Profile",
    path: "/agency/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/agency/settings",
    icon: Settings,
  },
];

const DashboardSidebar = ({
  role,
  userName,
  sidebarOpen,
  onClose,
}: DashboardSidebarProps) => {
  const menuItems = role === "student" ? studentMenu : agencyMenu;

  const dashboardTitle =
    role === "student" ? "Student Portal" : "Agency Portal";

  const handleLogout = () => {
    // Firebase logout will be implemented later.
    console.log("Logout clicked");
  };

  return (
    <aside className={`dashboard-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Brand */}
      <div className="dashboard-brand">
        <div className="dashboard-brand-icon">
          <GraduationCap size={26} />
        </div>

        <div>
          <h2>KoreaStudy</h2>
          <span>{dashboardTitle}</span>
        </div>

        <button
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={22} />
        </button>
      </div>

      {/* User Information */}
      <div className="dashboard-user">
        <div className="dashboard-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>

        <div className="dashboard-user-info">
          <h4>{userName}</h4>
          <span>
            {role === "student" ? "Student Account" : "Agency Account"}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="dashboard-navigation">
        <p className="dashboard-nav-label">MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `dashboard-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
              <ChevronRight size={16} className="nav-arrow" />
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Bottom */}
      <div className="dashboard-sidebar-bottom">
        <button className="dashboard-logout" onClick={handleLogout}>
          <LogOut size={19} />
          <span>Logout</span>
        </button>

        <div className="dashboard-sidebar-footer">
          © 2026 KoreaStudy Connect
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
