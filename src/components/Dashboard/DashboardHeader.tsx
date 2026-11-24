import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  role: "student" | "agency";
  userName: string;
  currentPage: string;
  onMenuOpen: () => void;
}

const DashboardHeader = ({
  role,
  userName,
  currentPage,
  onMenuOpen,
}: DashboardHeaderProps) => {
  const dashboardTitle =
    role === "student" ? "Student Portal" : "Agency Portal";

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <button
          className="dashboard-menu-toggle"
          onClick={onMenuOpen}
          aria-label="Open sidebar"
        >
          <Menu size={23} />
        </button>

        <div>
          <p className="dashboard-breadcrumb">
            {dashboardTitle} / {currentPage}
          </p>

          <h1>{currentPage}</h1>
        </div>
      </div>

      <div className="dashboard-header-right">
        <div className="dashboard-header-avatar">
          {userName.charAt(0).toUpperCase()}
        </div>

        <div className="dashboard-header-user">
          <strong>{userName}</strong>

          <span>{role === "student" ? "Student" : "Agency"}</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
