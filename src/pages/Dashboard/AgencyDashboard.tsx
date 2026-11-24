import {
  Users,
  FileText,
  Clock,
  CheckCircle2,
  GraduationCap,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Eye,
  MapPin,
  CalendarDays,
  Building2,
  UserPlus,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Dashboard.css";

const agencyStats = [
  {
    title: "Total Students",
    value: "156",
    description: "Students registered",
    icon: Users,
    color: "blue",
  },
  {
    title: "Total Applications",
    value: "248",
    description: "All submitted applications",
    icon: FileText,
    color: "orange",
  },
  {
    title: "Pending Applications",
    value: "36",
    description: "Waiting for review",
    icon: Clock,
    color: "pink",
  },
  {
    title: "Accepted Applications",
    value: "128",
    description: "Successfully accepted",
    icon: CheckCircle2,
    color: "green",
  },
];

const recentApplications = [
  {
    id: 1,
    student: "Aung Aung",
    email: "aung@example.com",
    university: "Seoul National University",
    program: "Computer Science",
    date: "Nov 20, 2026",
    status: "Accepted",
    initials: "AA",
    color: "purple",
  },
  {
    id: 2,
    student: "Su Su",
    email: "susu@example.com",
    university: "Korea University",
    program: "Information Technology",
    date: "Nov 21, 2026",
    status: "Pending",
    initials: "SS",
    color: "red",
  },
  {
    id: 3,
    student: "Mg Mg",
    email: "mgmg@example.com",
    university: "Yonsei University",
    program: "Software Engineering",
    date: "Nov 22, 2026",
    status: "Under Review",
    initials: "MM",
    color: "blue",
  },
  {
    id: 4,
    student: "Hla Hla",
    email: "hlahla@example.com",
    university: "Hanyang University",
    program: "Computer Science",
    date: "Nov 23, 2026",
    status: "Rejected",
    initials: "HH",
    color: "orange",
  },
];

const universityList = [
  {
    id: 1,
    name: "Seoul National University",
    location: "Seoul, South Korea",
    students: 32,
    initials: "SNU",
    color: "purple",
  },
  {
    id: 2,
    name: "Korea University",
    location: "Seoul, South Korea",
    students: 24,
    initials: "KU",
    color: "red",
  },
  {
    id: 3,
    name: "Yonsei University",
    location: "Seoul, South Korea",
    students: 19,
    initials: "YU",
    color: "blue",
  },
];

const AgencyDashboard = () => {
  const agencyName = "Korea Education Agency";

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Accepted":
        return "status-accepted";
      case "Pending":
        return "status-pending";
      case "Under Review":
        return "status-review";
      case "Rejected":
        return "status-rejected";
      default:
        return "";
    }
  };

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

          <div className="agency-chart-content">
            <div className="agency-chart-circle">
              <div className="agency-chart-inner">
                <h2>248</h2>
                <span>Applications</span>
              </div>
            </div>

            <div className="agency-chart-legend">
              <div>
                <span className="agency-dot accepted-dot" />
                <span>Accepted</span>
                <strong>128</strong>
              </div>

              <div>
                <span className="agency-dot pending-dot" />
                <span>Pending</span>
                <strong>36</strong>
              </div>

              <div>
                <span className="agency-dot review-dot" />
                <span>Under Review</span>
                <strong>52</strong>
              </div>

              <div>
                <span className="agency-dot rejected-dot" />
                <span>Rejected</span>
                <strong>32</strong>
              </div>
            </div>
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
              {recentApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <div className="agency-student-info">
                      <div
                        className={`agency-student-avatar ${application.color}`}
                      >
                        {application.initials}
                      </div>

                      <div>
                        <strong>{application.student}</strong>
                        <span>{application.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{application.university}</td>
                  <td>{application.program}</td>

                  <td>
                    <span className="agency-date">
                      <CalendarDays size={14} />
                      {application.date}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`application-status ${getStatusClass(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>
                    <Link
                      to="/agency/applications"
                      className="agency-view-btn"
                      aria-label={`View ${application.student}'s application`}
                    >
                      <Eye size={17} />
                    </Link>
                  </td>
                </tr>
              ))}
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

        <div className="agency-university-grid">
          {universityList.map((university) => (
            <div className="agency-university-card" key={university.id}>
              <div className={`agency-university-logo ${university.color}`}>
                {university.initials}
              </div>

              <h4>{university.name}</h4>

              <span className="agency-university-location">
                <MapPin size={13} />
                {university.location}
              </span>

              <div className="agency-university-footer">
                <span>Student Applications</span>
                <strong>{university.students}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AgencyDashboard;
