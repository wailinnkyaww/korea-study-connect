import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  CalendarDays,
  GraduationCap,
  FileText,
  X,
  MapPin,
  Clock,
} from "lucide-react";

import "./StudentApplications.css";

type ApplicationStatus = "Accepted" | "Pending" | "Under Review" | "Rejected";

interface Application {
  id: number;
  university: string;
  program: string;
  location: string;
  appliedDate: string;
  deadline: string;
  status: ApplicationStatus;
  applicationId: string;
}

const applications: Application[] = [
  {
    id: 1,
    university: "Seoul National University",
    program: "MSc Computer Science",
    location: "Seoul, South Korea",
    appliedDate: "Nov 10, 2026",
    deadline: "Dec 15, 2026",
    status: "Accepted",
    applicationId: "APP-2026-001",
  },
  {
    id: 2,
    university: "Korea University",
    program: "MSc Information Technology",
    location: "Seoul, South Korea",
    appliedDate: "Nov 12, 2026",
    deadline: "Dec 20, 2026",
    status: "Pending",
    applicationId: "APP-2026-002",
  },
  {
    id: 3,
    university: "Yonsei University",
    program: "MSc Artificial Intelligence",
    location: "Seoul, South Korea",
    appliedDate: "Nov 14, 2026",
    deadline: "Dec 25, 2026",
    status: "Under Review",
    applicationId: "APP-2026-003",
  },
  {
    id: 4,
    university: "Hanyang University",
    program: "MSc Software Engineering",
    location: "Seoul, South Korea",
    appliedDate: "Nov 16, 2026",
    deadline: "Dec 30, 2026",
    status: "Rejected",
    applicationId: "APP-2026-004",
  },
  {
    id: 5,
    university: "Kyung Hee University",
    program: "MSc Computer Engineering",
    location: "Seoul, South Korea",
    appliedDate: "Nov 18, 2026",
    deadline: "Jan 05, 2027",
    status: "Pending",
    applicationId: "APP-2026-005",
  },
];

const statusOptions = [
  "All",
  "Pending",
  "Under Review",
  "Accepted",
  "Rejected",
];

const StudentApplications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.university
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.applicationId
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || application.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const getStatusClass = (status: ApplicationStatus) => {
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

  const statusCounts = {
    total: applications.length,
    pending: applications.filter((item) => item.status === "Pending").length,
    review: applications.filter((item) => item.status === "Under Review")
      .length,
    accepted: applications.filter((item) => item.status === "Accepted").length,
    rejected: applications.filter((item) => item.status === "Rejected").length,
  };

  return (
    <div className="student-applications">
      <div className="applications-page-heading">
        <div>
          <span className="dashboard-eyebrow">STUDENT PORTAL</span>
          <h2>My Applications</h2>
          <p>Track and manage your university applications.</p>
        </div>
      </div>

      {/* Application Statistics */}
      <div className="application-summary">
        <div className="application-summary-card">
          <div className="summary-icon summary-total">
            <FileText size={21} />
          </div>
          <div>
            <span>Total Applications</span>
            <h3>{statusCounts.total}</h3>
          </div>
        </div>

        <div className="application-summary-card">
          <div className="summary-icon summary-pending">
            <Clock size={21} />
          </div>
          <div>
            <span>Pending</span>
            <h3>{statusCounts.pending}</h3>
          </div>
        </div>

        <div className="application-summary-card">
          <div className="summary-icon summary-review">
            <Eye size={21} />
          </div>
          <div>
            <span>Under Review</span>
            <h3>{statusCounts.review}</h3>
          </div>
        </div>

        <div className="application-summary-card">
          <div className="summary-icon summary-accepted">
            <GraduationCap size={21} />
          </div>
          <div>
            <span>Accepted</span>
            <h3>{statusCounts.accepted}</h3>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="applications-toolbar">
        <div className="applications-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search university, program or application ID..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="applications-filter">
          <label htmlFor="application-status-filter">Status:</label>
          <select
            id="application-status-filter"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications List */}
      <div className="applications-list-panel">
        <div className="applications-list-heading">
          <div>
            <h3>Application List</h3>
            <p>
              Showing {filteredApplications.length} of {applications.length}{" "}
              applications
            </p>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="applications-table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>University & Program</th>
                  <th>Application ID</th>
                  <th>Applied Date</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className="application-university-cell">
                        <div className="application-university-icon">
                          <GraduationCap size={21} />
                        </div>
                        <div>
                          <strong>{application.university}</strong>
                          <span>{application.program}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="application-id">
                        {application.applicationId}
                      </span>
                    </td>

                    <td>{application.appliedDate}</td>
                    <td>{application.deadline}</td>

                    <td>
                      <span
                        className={`application-status ${getStatusClass(
                          application.status,
                        )}`}
                      >
                        {application.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="application-view-button"
                        onClick={() => setSelectedApplication(application)}
                        aria-label={`View ${application.university} application`}
                      >
                        <Eye size={17} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="applications-empty">
            <FileText size={38} />
            <h3>No applications found</h3>
            <p>Try changing your search keyword or status filter.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedStatus("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div
          className="application-modal-overlay"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="application-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="application-modal-header">
              <div>
                <span>APPLICATION DETAILS</span>
                <h3>{selectedApplication.university}</h3>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                aria-label="Close application details"
              >
                <X size={22} />
              </button>
            </div>

            <div className="application-modal-body">
              <div className="application-modal-status">
                <span>Status</span>
                <span
                  className={`application-status ${getStatusClass(
                    selectedApplication.status,
                  )}`}
                >
                  {selectedApplication.status}
                </span>
              </div>

              <div className="application-detail-item">
                <GraduationCap size={19} />
                <div>
                  <span>Program</span>
                  <strong>{selectedApplication.program}</strong>
                </div>
              </div>

              <div className="application-detail-item">
                <MapPin size={19} />
                <div>
                  <span>Location</span>
                  <strong>{selectedApplication.location}</strong>
                </div>
              </div>

              <div className="application-detail-item">
                <FileText size={19} />
                <div>
                  <span>Application ID</span>
                  <strong>{selectedApplication.applicationId}</strong>
                </div>
              </div>

              <div className="application-detail-item">
                <CalendarDays size={19} />
                <div>
                  <span>Applied Date</span>
                  <strong>{selectedApplication.appliedDate}</strong>
                </div>
              </div>

              <div className="application-detail-item">
                <Clock size={19} />
                <div>
                  <span>Application Deadline</span>
                  <strong>{selectedApplication.deadline}</strong>
                </div>
              </div>
            </div>

            <div className="application-modal-footer">
              <button onClick={() => setSelectedApplication(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
