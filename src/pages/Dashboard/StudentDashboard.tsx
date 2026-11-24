import {
  FileText,
  Clock,
  CheckCircle2,
  Heart,
  ArrowUpRight,
  ArrowRight,
  GraduationCap,
  MapPin,
  CalendarDays,
  Plus,
  Eye,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./Dashboard.css";

const stats = [
  {
    title: "Total Applications",
    value: "12",
    description: "All submitted applications",
    icon: FileText,
    color: "blue",
  },
  {
    title: "Pending Applications",
    value: "05",
    description: "Waiting for review",
    icon: Clock,
    color: "orange",
  },
  {
    title: "Accepted Applications",
    value: "04",
    description: "Congratulations!",
    icon: CheckCircle2,
    color: "green",
  },
  {
    title: "Saved Universities",
    value: "08",
    description: "Your favorite universities",
    icon: Heart,
    color: "pink",
  },
];

const applications = [
  {
    id: 1,
    university: "Seoul National University",
    program: "Computer Science",
    location: "Seoul, South Korea",
    date: "Nov 15, 2026",
    status: "Accepted",
    initials: "SNU",
    color: "purple",
  },
  {
    id: 2,
    university: "Korea University",
    program: "Information Technology",
    location: "Seoul, South Korea",
    date: "Nov 18, 2026",
    status: "Pending",
    initials: "KU",
    color: "red",
  },
  {
    id: 3,
    university: "Yonsei University",
    program: "Software Engineering",
    location: "Seoul, South Korea",
    date: "Nov 20, 2026",
    status: "Under Review",
    initials: "YU",
    color: "blue",
  },
  {
    id: 4,
    university: "Hanyang University",
    program: "Computer Science",
    location: "Seoul, South Korea",
    date: "Nov 22, 2026",
    status: "Rejected",
    initials: "HU",
    color: "orange",
  },
];

const savedUniversities = [
  {
    id: 1,
    name: "KAIST",
    location: "Daejeon, South Korea",
    program: "Computer Science",
    initials: "KAIST",
    color: "blue",
  },
  {
    id: 2,
    name: "Sungkyunkwan University",
    location: "Seoul, South Korea",
    program: "Information Systems",
    initials: "SKKU",
    color: "purple",
  },
  {
    id: 3,
    name: "Kyung Hee University",
    location: "Seoul, South Korea",
    program: "Software Engineering",
    initials: "KH",
    color: "green",
  },
];

const StudentDashboard = () => {
  const studentName = "Wai Lin Kyaw";

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
    <div className="student-dashboard">
      {/* Welcome Section */}
      <section className="student-welcome">
        <div>
          <span className="welcome-label">STUDENT OVERVIEW</span>
          <h2>Welcome back, {studentName}! 👋</h2>
          <p>
            Track your applications and continue your journey to studying in
            South Korea.
          </p>
        </div>

        <Link to="/universities" className="welcome-action">
          <Plus size={18} />
          Explore Universities
        </Link>
      </section>

      {/* Statistics */}
      <section className="student-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="student-stat-card" key={stat.title}>
              <div className="stat-card-top">
                <div className={`stat-icon ${stat.color}`}>
                  <Icon size={22} />
                </div>

                <ArrowUpRight size={18} className="stat-arrow" />
              </div>

              <h3>{stat.value}</h3>
              <h4>{stat.title}</h4>
              <p>{stat.description}</p>
            </div>
          );
        })}
      </section>

      {/* Application Overview */}
      <section className="student-overview-grid">
        <div className="student-panel application-overview">
          <div className="panel-header">
            <div>
              <h3>Application Overview</h3>
              <p>Your current application progress</p>
            </div>

            <FileText size={21} />
          </div>

          <div className="overview-chart">
            <div className="chart-circle">
              <div className="chart-circle-inner">
                <h2>12</h2>
                <span>Applications</span>
              </div>
            </div>

            <div className="chart-legend">
              <div>
                <span className="legend-dot accepted-dot" />
                <span>Accepted</span>
                <strong>4</strong>
              </div>

              <div>
                <span className="legend-dot pending-dot" />
                <span>Pending</span>
                <strong>5</strong>
              </div>

              <div>
                <span className="legend-dot review-dot" />
                <span>Under Review</span>
                <strong>2</strong>
              </div>

              <div>
                <span className="legend-dot rejected-dot" />
                <span>Rejected</span>
                <strong>1</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="student-panel quick-actions">
          <div className="panel-header">
            <div>
              <h3>Quick Actions</h3>
              <p>What would you like to do?</p>
            </div>
          </div>

          <Link to="/universities" className="quick-action-item">
            <div className="quick-action-icon blue">
              <GraduationCap size={21} />
            </div>

            <div>
              <strong>Find Universities</strong>
              <span>Explore study opportunities</span>
            </div>

            <ArrowRight size={17} />
          </Link>

          <Link to="/student/applications" className="quick-action-item">
            <div className="quick-action-icon orange">
              <FileText size={21} />
            </div>

            <div>
              <strong>My Applications</strong>
              <span>Track application progress</span>
            </div>

            <ArrowRight size={17} />
          </Link>

          <Link to="/student/profile" className="quick-action-item">
            <div className="quick-action-icon green">
              <Eye size={21} />
            </div>

            <div>
              <strong>View My Profile</strong>
              <span>Update your personal information</span>
            </div>

            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="student-panel recent-applications">
        <div className="panel-header">
          <div>
            <h3>Recent Applications</h3>
            <p>Keep track of your latest university applications</p>
          </div>

          <Link to="/student/applications" className="view-all-link">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="application-table-wrapper">
          <table className="application-table">
            <thead>
              <tr>
                <th>University</th>
                <th>Program</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <div className="university-info">
                      <div className={`university-avatar ${application.color}`}>
                        {application.initials}
                      </div>

                      <div>
                        <strong>{application.university}</strong>
                        <span>
                          <MapPin size={12} />
                          {application.location}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>{application.program}</td>

                  <td>
                    <span className="application-date">
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
                      to={`/student/applications`}
                      className="application-view-btn"
                      aria-label={`View ${application.university} application`}
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

      {/* Saved Universities */}
      <section className="student-panel saved-universities">
        <div className="panel-header">
          <div>
            <h3>Saved Universities</h3>
            <p>Universities you are interested in</p>
          </div>

          <Link to="/student/saved" className="view-all-link">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="saved-university-grid">
          {savedUniversities.map((university) => (
            <div className="saved-university-card" key={university.id}>
              <div className={`saved-university-logo ${university.color}`}>
                {university.initials}
              </div>

              <div className="saved-university-info">
                <h4>{university.name}</h4>

                <span>
                  <MapPin size={13} />
                  {university.location}
                </span>

                <p>{university.program}</p>
              </div>

              <Heart size={18} className="saved-heart-icon" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
