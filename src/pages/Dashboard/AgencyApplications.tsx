import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  X,
  GraduationCap,
  CalendarDays,
  Mail,
  MapPin,
  User,
  Filter,
} from "lucide-react";
import "./AgencyApplications.css";

type ApplicationStatus = "Pending" | "Under Review" | "Accepted" | "Rejected";

interface Application {
  id: string;
  studentName: string;
  email: string;
  university: string;
  major: string;
  degree: string;
  intake: string;
  submittedDate: string;
  status: ApplicationStatus;
  notes: string;
}

const initialApplications: Application[] = [
  {
    id: "APP-2026-001",
    studentName: "Aung Aung",
    email: "aung@example.com",
    university: "Seoul National University",
    major: "Computer Science",
    degree: "Master",
    intake: "September 2027",
    submittedDate: "2026-10-10",
    status: "Accepted",
    notes: "Student meets the initial application requirements.",
  },
  {
    id: "APP-2026-002",
    studentName: "Su Su",
    email: "susu@example.com",
    university: "Korea University",
    major: "Business Administration",
    degree: "Bachelor",
    intake: "September 2027",
    submittedDate: "2026-10-15",
    status: "Pending",
    notes: "Waiting for academic documents.",
  },
  {
    id: "APP-2026-003",
    studentName: "Mg Mg",
    email: "mgmg@example.com",
    university: "Yonsei University",
    major: "Information Technology",
    degree: "Master",
    intake: "March 2027",
    submittedDate: "2026-10-18",
    status: "Under Review",
    notes: "Documents are currently being reviewed.",
  },
  {
    id: "APP-2026-004",
    studentName: "Hla Hla",
    email: "hla@example.com",
    university: "Hanyang University",
    major: "International Relations",
    degree: "Bachelor",
    intake: "September 2027",
    submittedDate: "2026-10-20",
    status: "Rejected",
    notes: "Application does not meet the current requirements.",
  },
  {
    id: "APP-2026-005",
    studentName: "Kyaw Kyaw",
    email: "kyaw@example.com",
    university: "Kyung Hee University",
    major: "Data Science",
    degree: "Master",
    intake: "September 2027",
    submittedDate: "2026-10-22",
    status: "Pending",
    notes: "Application received and waiting for review.",
  },
  {
    id: "APP-2026-006",
    studentName: "May Thu",
    email: "maythu@example.com",
    university: "Korea University",
    major: "Computer Science",
    degree: "Master",
    intake: "March 2027",
    submittedDate: "2026-10-25",
    status: "Under Review",
    notes: "Checking the student's academic background.",
  },
];

const statusOptions: ApplicationStatus[] = [
  "Pending",
  "Under Review",
  "Accepted",
  "Rejected",
];

const AgencyApplications = () => {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const searchContent = [
        application.id,
        application.studentName,
        application.email,
        application.university,
        application.major,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchContent.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const pendingCount = applications.filter(
    (item) => item.status === "Pending",
  ).length;

  const reviewCount = applications.filter(
    (item) => item.status === "Under Review",
  ).length;

  const acceptedCount = applications.filter(
    (item) => item.status === "Accepted",
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "Rejected",
  ).length;

  const updateStatus = (id: string, status: ApplicationStatus) => {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === id ? { ...application, status } : application,
      ),
    );

    setSelectedApplication((previous) =>
      previous?.id === id ? { ...previous, status } : previous,
    );
  };

  const deleteApplication = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application record?",
    );

    if (!confirmed) return;

    setApplications((previous) =>
      previous.filter((application) => application.id !== id),
    );

    setSelectedApplication(null);
  };

  const getStatusClass = (status: ApplicationStatus) => {
    switch (status) {
      case "Pending":
        return "pending";
      case "Under Review":
        return "review";
      case "Accepted":
        return "accepted";
      case "Rejected":
        return "rejected";
      default:
        return "";
    }
  };

  return (
    <div className="agency-applications-page">
      {/* Page Heading */}
      <div className="agency-applications-heading">
        <div>
          <span className="agency-applications-eyebrow">AGENCY MANAGEMENT</span>
          <h2>Applications</h2>
          <p>Review and manage student university applications.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="agency-application-stats">
        <div className="agency-application-stat-card">
          <div className="agency-application-stat-icon purple">
            <FileText size={23} />
          </div>
          <div>
            <span>Total Applications</span>
            <h3>{applications.length}</h3>
          </div>
        </div>

        <div className="agency-application-stat-card">
          <div className="agency-application-stat-icon orange">
            <Clock size={23} />
          </div>
          <div>
            <span>Pending</span>
            <h3>{pendingCount}</h3>
          </div>
        </div>

        <div className="agency-application-stat-card">
          <div className="agency-application-stat-icon blue">
            <Eye size={23} />
          </div>
          <div>
            <span>Under Review</span>
            <h3>{reviewCount}</h3>
          </div>
        </div>

        <div className="agency-application-stat-card">
          <div className="agency-application-stat-icon green">
            <CheckCircle2 size={23} />
          </div>
          <div>
            <span>Accepted</span>
            <h3>{acceptedCount}</h3>
          </div>
        </div>

        <div className="agency-application-stat-card">
          <div className="agency-application-stat-icon red">
            <XCircle size={23} />
          </div>
          <div>
            <span>Rejected</span>
            <h3>{rejectedCount}</h3>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="agency-application-toolbar">
        <div className="agency-application-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search student, university, application ID..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="agency-application-filter">
          <Filter size={17} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by application status"
          >
            <option value="All">All Status</option>
            {statusOptions.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Application Table */}
      <div className="agency-application-table-card">
        <div className="agency-application-table-heading">
          <div>
            <h3>Student Applications</h3>
            <p>{filteredApplications.length} applications found</p>
          </div>
        </div>

        <div className="agency-application-table-wrapper">
          <table className="agency-application-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Student</th>
                <th>University & Major</th>
                <th>Intake</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <strong className="agency-application-id">
                      {application.id}
                    </strong>
                  </td>

                  <td>
                    <div className="agency-application-student">
                      <div className="agency-application-avatar">
                        {application.studentName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{application.studentName}</strong>
                        <span>{application.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="agency-application-university">
                      <strong>{application.university}</strong>
                      <span>{application.major}</span>
                    </div>
                  </td>

                  <td>{application.intake}</td>
                  <td>{application.submittedDate}</td>

                  <td>
                    <span
                      className={`agency-application-status ${getStatusClass(
                        application.status,
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>
                    <div className="agency-application-actions">
                      <button
                        className="agency-application-view-btn"
                        title="View application"
                        aria-label={`View ${application.id}`}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        className="agency-application-delete-btn"
                        title="Delete application"
                        aria-label={`Delete ${application.id}`}
                        onClick={() => deleteApplication(application.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <div className="agency-application-empty">
                      <FileText size={38} />
                      <h3>No applications found</h3>
                      <p>Try changing your search or status filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div
          className="agency-application-modal-overlay"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="agency-application-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="agency-application-modal-header">
              <div>
                <span>APPLICATION DETAILS</span>
                <h3>{selectedApplication.id}</h3>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                aria-label="Close application details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="agency-application-detail-student">
              <div className="agency-application-detail-avatar">
                {selectedApplication.studentName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3>{selectedApplication.studentName}</h3>
                <p>{selectedApplication.email}</p>
              </div>
            </div>

            <div className="agency-application-detail-grid">
              <div>
                <GraduationCap size={19} />
                <section>
                  <span>University</span>
                  <strong>{selectedApplication.university}</strong>
                </section>
              </div>

              <div>
                <FileText size={19} />
                <section>
                  <span>Preferred Major</span>
                  <strong>{selectedApplication.major}</strong>
                </section>
              </div>

              <div>
                <User size={19} />
                <section>
                  <span>Degree Level</span>
                  <strong>{selectedApplication.degree}</strong>
                </section>
              </div>

              <div>
                <CalendarDays size={19} />
                <section>
                  <span>Intake</span>
                  <strong>{selectedApplication.intake}</strong>
                </section>
              </div>

              <div>
                <CalendarDays size={19} />
                <section>
                  <span>Submitted Date</span>
                  <strong>{selectedApplication.submittedDate}</strong>
                </section>
              </div>

              <div>
                <Mail size={19} />
                <section>
                  <span>Student Email</span>
                  <strong>{selectedApplication.email}</strong>
                </section>
              </div>
            </div>

            <div className="agency-application-current-status">
              <span>Current Status</span>
              <span
                className={`agency-application-status ${getStatusClass(
                  selectedApplication.status,
                )}`}
              >
                {selectedApplication.status}
              </span>
            </div>

            <div className="agency-application-notes">
              <h4>Agency Notes</h4>
              <p>{selectedApplication.notes || "No notes available."}</p>
            </div>

            <div className="agency-application-update">
              <label htmlFor="application-status">
                Update Application Status
              </label>
              <select
                id="application-status"
                value={selectedApplication.status}
                onChange={(event) =>
                  updateStatus(
                    selectedApplication.id,
                    event.target.value as ApplicationStatus,
                  )
                }
              >
                {statusOptions.map((status) => (
                  <option value={status} key={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="agency-application-modal-footer">
              <button
                className="agency-application-close-btn"
                onClick={() => setSelectedApplication(null)}
              >
                Close
              </button>
              <button
                className="agency-application-delete-detail-btn"
                onClick={() => deleteApplication(selectedApplication.id)}
              >
                <Trash2 size={16} />
                Delete Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyApplications;
