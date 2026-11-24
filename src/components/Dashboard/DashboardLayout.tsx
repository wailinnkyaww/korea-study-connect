import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

import "./DashboardLayout.css";

interface DashboardLayoutProps {
  role: "student" | "agency";
  userName?: string;
}

const DashboardLayout = ({
  role,
  userName = "Wai Lin Kyaw",
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  const menuItems =
    role === "student"
      ? [
          { name: "Overview", path: "/student/dashboard" },
          { name: "My Applications", path: "/student/applications" },
          { name: "Saved Universities", path: "/student/saved" },
          { name: "My Profile", path: "/student/profile" },
          { name: "Settings", path: "/student/settings" },
        ]
      : [
          { name: "Overview", path: "/agency/dashboard" },
          { name: "Universities", path: "/agency/universities" },
          { name: "Students", path: "/agency/students" },
          { name: "Applications", path: "/agency/applications" },
          { name: "My Profile", path: "/agency/profile" },
          { name: "Settings", path: "/agency/settings" },
        ];

  const currentPage =
    menuItems.find((item) => item.path === location.pathname)?.name ||
    "Dashboard";

  return (
    <div className="dashboard-layout">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSidebar
        role={role}
        userName={userName}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <DashboardHeader
          role={role}
          userName={userName}
          currentPage={currentPage}
          onMenuOpen={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
