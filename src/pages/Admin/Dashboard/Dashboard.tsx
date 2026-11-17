import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Building2,
  LogOut,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import { adminLogout } from "../../../services/adminService";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminLogout();
      navigate("/admin/login", { replace: true });
    } catch {
      alert("Unable to log out. Please try again.");
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <GraduationCap size={27} />
          <span>Korea Study Connect</span>
        </div>

        <nav>
          <a href="/admin/dashboard" className="active">
            <LayoutDashboard size={19} />
            Dashboard
          </a>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={19} />
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your education platform.</p>
          </div>
          <span className="admin-status">Administrator</span>
        </header>

        <section className="admin-welcome">
          <h2>Welcome to the Admin Panel</h2>
          <p>
            Manage education agencies, Korean universities, and their available
            study programs.
          </p>
        </section>

        <section className="admin-stat-grid">
          <article className="admin-stat-card">
            <div className="admin-stat-icon purple">
              <Building2 size={24} />
            </div>
            <div>
              <h3>Agencies</h3>
              <p>Manage education agencies</p>
            </div>
          </article>

          <article className="admin-stat-card">
            <div className="admin-stat-icon pink">
              <GraduationCap size={24} />
            </div>
            <div>
              <h3>Universities</h3>
              <p>Manage Korean universities</p>
            </div>
          </article>
        </section>

        <section className="admin-management">
          <h2>Management</h2>

          <div className="admin-management-grid">
            <article className="admin-management-card">
              <Building2 size={30} />
              <h3>Agency Management</h3>
              <p>Add, edit and remove education agencies.</p>
              <button disabled>
                <Plus size={17} />
                Coming in Step 13.7
              </button>
            </article>

            <article className="admin-management-card">
              <GraduationCap size={30} />
              <h3>University Management</h3>
              <p>Add, edit and remove Korean universities.</p>
              <button disabled>
                <Plus size={17} />
                Coming in Step 13.8
              </button>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
