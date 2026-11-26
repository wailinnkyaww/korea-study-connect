import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  GraduationCap,
  Mail,
  CalendarDays,
  X,
} from "lucide-react";

import { auth } from "../../config/firebase";

import {
  getAgencyApplications,
  updateAgencyApplicationStatus,
  type AgencyApplication,
  type ApplicationStatus,
} from "../../services/agencyApplicationsService";

import "./AgencyApplications.css";

const AgencyApplications = () => {
  const [applications, setApplications] = useState<AgencyApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState<AgencyApplication | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchApplications = useCallback(async () => {
    const agencyId = auth.currentUser?.uid;

    if (!agencyId) {
      setError("Please log in with your agency account.");
      setApplications([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const data = await getAgencyApplications(agencyId);
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Unable to load applications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.studentName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.studentEmail
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.universityName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const totalApplications = applications.length;

  const pendingCount = applications.filter(
    (application) => application.status === "Pending",
  ).length;

  const reviewCount = applications.filter(
    (application) => application.status === "Under Review",
  ).length;

  const acceptedCount = applications.filter(
    (application) => application.status === "Accepted",
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected",
  ).length;

  const handleStatusUpdate = async (
    applicationId: string,
    status: ApplicationStatus,
  ) => {
    try {
      setIsUpdating(true);
      setError("");

      await updateAgencyApplicationStatus(applicationId, status);

      setApplications((previous) =>
        previous.map((application) =>
          application.id === applicationId
            ? { ...application, status }
            : application,
        ),
      );

      setSelectedApplication((previous) =>
        previous?.id === applicationId ? { ...previous, status } : previous,
      );
    } catch (err) {
      console.error("Error updating application:", err);
      setError("Unable to update application status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date?: AgencyApplication["submittedAt"]) => {
    if (!date) return "Not available";

    return date.toDate().toLocaleDateString();
  };

  const getStatusClass = (status: ApplicationStatus) => {
    switch (status) {
      case "Accepted":
        return "accepted";
      case "Rejected":
        return "rejected";
      case "Under Review":
        return "review";
      default:
        return "pending";
    }
  };

  return (
    <div className="agency-applications-page">
      <div className="dashboard-page-heading">
        <div>
          <h1>Student Applications</h1>
          <p>Manage and review applications submitted to your agency.</p>
        </div>

        <button
          className="application-refresh-btn"
          onClick={fetchApplications}
          disabled={isLoading}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {error && <div className="applications-error">{error}</div>}

      <div className="application-stats-grid">
        <div className="application-stat-card">
          <div className="application-stat-icon blue">
            <FileText size={22} />
          </div>
          <div>
            <span>Total Applications</span>
            <h2>{totalApplications}</h2>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-icon orange">
            <Clock size={22} />
          </div>
          <div>
            <span>Pending</span>
            <h2>{pendingCount}</h2>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-icon purple">
            <Eye size={22} />
          </div>
          <div>
            <span>Under Review</span>
            <h2>{reviewCount}</h2>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-icon green">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span>Accepted</span>
            <h2>{acceptedCount}</h2>
          </div>
        </div>

        <div className="application-stat-card">
          <div className="application-stat-icon red">
            <XCircle size={22} />
          </div>
          <div>
            <span>Rejected</span>
            <h2>{rejectedCount}</h2>
          </div>
        </div>
      </div>

      <div className="applications-content-card">
        <div className="applications-toolbar">
          <div className="application-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search student or university..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Applications</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {isLoading ? (
          <div className="applications-empty-state">
            <RefreshCw className="loading-spin" size={28} />
            <p>Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="applications-empty-state">
            <FileText size={42} />
            <h3>No applications found</h3>
            <p>
              {applications.length === 0
                ? "Applications submitted to your agency will appear here."
                : "Try changing your search or status filter."}
            </p>
          </div>
        ) : (
          <div className="applications-table-wrapper">
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>University</th>
                  <th>Program</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <div className="application-student-cell">
                        <div className="application-avatar">
                          {application.studentName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{application.studentName}</strong>
                          <small>{application.studentEmail}</small>
                        </div>
                      </div>
                    </td>

                    <td>{application.universityName}</td>
                    <td>{application.program}</td>
                    <td>{formatDate(application.submittedAt)}</td>

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
                        className="application-view-btn"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedApplication && (
        <div
          className="application-modal-overlay"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="application-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="application-modal-header">
              <div>
                <h2>Application Details</h2>
                <p>Review student application information.</p>
              </div>

              <button
                className="application-modal-close"
                onClick={() => setSelectedApplication(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="application-detail-section">
              <h3>Student Information</h3>

              <p>
                <strong>Name:</strong> {selectedApplication.studentName}
              </p>

              <p>
                <Mail size={16} /> {selectedApplication.studentEmail}
              </p>
            </div>

            <div className="application-detail-section">
              <h3>Study Information</h3>

              <p>
                <GraduationCap size={16} /> {selectedApplication.universityName}
              </p>

              <p>
                <strong>Program:</strong> {selectedApplication.program}
              </p>

              <p>
                <strong>Degree:</strong> {selectedApplication.degree}
              </p>

              <p>
                <strong>Intake:</strong> {selectedApplication.intake}
              </p>

              <p>
                <CalendarDays size={16} /> Submitted:{" "}
                {formatDate(selectedApplication.submittedAt)}
              </p>
            </div>

            {selectedApplication.notes && (
              <div className="application-detail-section">
                <h3>Student Notes</h3>
                <p>{selectedApplication.notes}</p>
              </div>
            )}

            <div className="application-detail-section">
              <h3>Update Application Status</h3>

              <div className="application-status-actions">
                <button
                  disabled={isUpdating}
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "Under Review")
                  }
                >
                  Under Review
                </button>

                <button
                  className="accept-application-btn"
                  disabled={isUpdating}
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "Accepted")
                  }
                >
                  Accept
                </button>

                <button
                  className="reject-application-btn"
                  disabled={isUpdating}
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "Rejected")
                  }
                >
                  Reject
                </button>

                <button
                  disabled={isUpdating}
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "Pending")
                  }
                >
                  Reset to Pending
                </button>
              </div>

              {isUpdating && <small>Saving status...</small>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyApplications;
