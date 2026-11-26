// export default AgencyDashboard;
import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  GraduationCap,
  ArrowUpRight,
  ArrowRight,
  UserPlus,
  RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";
import { getAgencyDashboardStats } from "../../services/agencyDashboardService";

import "./Dashboard.css";

interface DashboardStats {
  totalStudents: number;
}

const AgencyDashboard = () => {
  const agencyName = "Korea Education Agency";

  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getAgencyDashboardStats();

      setStats({
        totalStudents: data.totalStudents,
      });
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError("Unable to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const agencyStats = [
    {
      title: "Total Students",
      value: isLoading
        ? "..."
        : error
          ? "—"
          : stats.totalStudents.toLocaleString(),
      description: "Registered student accounts",
      icon: Users,
      color: "blue",
    },
    {
      title: "Total Applications",
      value: "—",
      description: "Application data not available yet",
      icon: FileText,
      color: "orange",
    },
    {
      title: "Pending Applications",
      value: "—",
      description: "Application data not available yet",
      icon: Clock,
      color: "pink",
    },
    {
      title: "Accepted Applications",
      value: "—",
      description: "Application data not available yet",
      icon: CheckCircle2,
      color: "green",
    },
  ];

  return (
    <div className="agency-dashboard">
      {/* Welcome Section */}
      <section className="agency-welcome">
        <div>
          <span className="welcome-label">AGENCY OVERVIEW</span>
          <h2>Welcome back, {agencyName}! 👋</h2>
          <p>
            Manage your students, monitor applications, and help students
            achieve their dream of studying in Korea.
          </p>
        </div>

        <Link to="/agency/students" className="agency-welcome-action">
          <UserPlus size={18} />
          Manage Students
        </Link>
      </section>

      {/* Error Message */}
      {error && (
        <div className="agency-dashboard-error">
          <span>{error}</span>
          <button type="button" onClick={fetchDashboardData}>
            <RefreshCw size={15} />
            Retry
          </button>
        </div>
      )}

      {/* Statistics */}
      <section className="agency-stats">
        {agencyStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="agency-stat-card" key={stat.title}>
              <div className="agency-stat-top">
                <div className={`agency-stat-icon ${stat.color}`}>
                  <Icon size={22} />
                </div>

                <ArrowUpRight size={18} className="agency-stat-arrow" />
              </div>

              <h3>{stat.value}</h3>
              <h4>{stat.title}</h4>
              <p>{stat.description}</p>
            </div>
          );
        })}
      </section>

      {/* Overview and Quick Actions */}
      <section className="agency-overview-grid">
        {/* Application Overview */}
        <div className="agency-panel">
          <div className="agency-panel-header">
            <div>
              <h3>Application Overview</h3>
              <p>Current student application status</p>
            </div>

            <FileText size={21} />
          </div>

          <div className="agency-data-empty">
            <div className="agency-empty-icon">
              <FileText size={27} />
            </div>

            <h4>No Application Data Yet</h4>

            <p>
              Application statistics will appear here after the applications
              collection is created and connected.
            </p>

            <Link to="/agency/applications">
              View Applications <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="agency-panel agency-quick-actions">
          <div className="agency-panel-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Manage your agency activities</p>
            </div>
          </div>

          <Link to="/agency/students" className="agency-action-item">
            <div className="agency-action-icon blue">
              <Users size={21} />
            </div>

            <div>
              <strong>Manage Students</strong>
              <span>View and manage registered students</span>
            </div>

            <ArrowRight size={17} />
          </Link>

          <Link to="/agency/applications" className="agency-action-item">
            <div className="agency-action-icon orange">
              <FileText size={21} />
            </div>

            <div>
              <strong>Applications</strong>
              <span>Review student applications</span>
            </div>

            <ArrowRight size={17} />
          </Link>

          <Link to="/agency/universities" className="agency-action-item">
            <div className="agency-action-icon green">
              <GraduationCap size={21} />
            </div>

            <div>
              <strong>University Management</strong>
              <span>Explore university information</span>
            </div>

            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="agency-panel agency-recent-applications">
        <div className="agency-panel-header">
          <div>
            <h3>Recent Student Applications</h3>
            <p>Latest applications submitted by your students</p>
          </div>

          <Link to="/agency/applications" className="agency-view-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="agency-table-wrapper">
          <table className="agency-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>University</th>
                <th>Program</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className="agency-table-empty">
                    <FileText size={24} />
                    <strong>No applications found</strong>
                    <span>
                      Student application records will appear here when
                      available.
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* University Overview */}
      <section className="agency-panel agency-universities">
        <div className="agency-panel-header">
          <div>
            <h3>Popular Universities</h3>
            <p>Universities selected by your students</p>
          </div>

          <Link to="/universities" className="agency-view-all">
            Explore More <ArrowRight size={16} />
          </Link>
        </div>

        <div className="agency-university-empty">
          <GraduationCap size={30} />
          <h4>No University Statistics Yet</h4>
          <p>
            University information and student selections will appear here after
            the university data is connected.
          </p>
          <Link to="/agency/universities">
            Manage Universities <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AgencyDashboard;
