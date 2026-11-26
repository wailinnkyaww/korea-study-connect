import { useCallback, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Eye,
  GraduationCap,
  CalendarDays,
} from "lucide-react";

import { auth } from "../../config/firebase";

import {
  getStudentApplications,
  type StudentApplication,
} from "../../services/studentApplicationsService";

import "./StudentApplications.css";

const StudentApplications = () => {
  const [applications, setApplications] = useState<StudentApplication[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedApplication, setSelectedApplication] =
    useState<StudentApplication | null>(null);

  // Restore Firebase authentication after page refresh.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setStudentId(user?.uid || null);
      setAuthLoading(false);

      if (!user) {
        setApplications([]);
        setError("Please log in to view your applications.");
      } else {
        setError("");
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchApplications = useCallback(async (uid: string) => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getStudentApplications(uid);
      setApplications(data);
    } catch (err) {
      console.error("Error fetching student applications:", err);
      setError("Unable to load applications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (studentId) {
      fetchApplications(studentId);
    } else {
      setIsLoading(false);
    }
  }, [studentId, authLoading, fetchApplications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        application.universityName.toLowerCase().includes(search) ||
        application.program.toLowerCase().includes(search) ||
        application.degree.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const pendingCount = applications.filter(
    (app) => app.status === "Pending",
  ).length;

  const reviewCount = applications.filter(
    (app) => app.status === "Under Review",
  ).length;

  const acceptedCount = applications.filter(
    (app) => app.status === "Accepted",
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  const formatDate = (date?: StudentApplication["submittedAt"]) => {
    return date ? date.toDate().toLocaleDateString() : "Not available";
  };

  const getStatusClass = (status: string) => {
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

  if (authLoading) {
    return (
      <div className="student-applications-loading">
        <RefreshCw className="loading-spin" size={26} />
        <p>Checking your account...</p>
      </div>
    );
  }

  return (
    <div className="student-applications-page">
      <div className="student-applications-heading">
        <div>
          <h1>My Applications</h1>
          <p>Track the progress of your university applications.</p>
        </div>

        <button
          className="student-application-refresh"
          onClick={() => studentId && fetchApplications(studentId)}
          disabled={isLoading || !studentId}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {error && <div className="student-application-error">{error}</div>}

      <div className="student-application-stats">
        <div>
          <FileText size={22} />
          <span>Total Applications</span>
          <h2>{applications.length}</h2>
        </div>

        <div>
          <Clock size={22} />
          <span>Pending</span>
          <h2>{pendingCount}</h2>
        </div>

        <div>
          <Eye size={22} />
          <span>Under Review</span>
          <h2>{reviewCount}</h2>
        </div>

        <div>
          <CheckCircle2 size={22} />
          <span>Accepted</span>
          <h2>{acceptedCount}</h2>
        </div>

        <div>
          <XCircle size={22} />
          <span>Rejected</span>
          <h2>{rejectedCount}</h2>
        </div>
      </div>

      <div className="student-applications-card">
        <div className="student-applications-toolbar">
          <div className="student-application-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search university or program..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {isLoading ? (
          <div className="student-applications-empty">
            <RefreshCw className="loading-spin" size={28} />
            <p>Loading applications...</p>
          </div>
        ) : !error && filteredApplications.length === 0 ? (
          <div className="student-applications-empty">
            <FileText size={42} />
            <h3>No applications found</h3>
            <p>
              {applications.length === 0
                ? "Your submitted university applications will appear here."
                : "Try another search term or status filter."}
            </p>
          </div>
        ) : (
          !error && (
            <div className="student-applications-table-wrapper">
              <table className="student-applications-table">
                <thead>
                  <tr>
                    <th>University</th>
                    <th>Program</th>
                    <th>Degree</th>
                    <th>Intake</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id}>
                      <td>
                        <strong>{application.universityName}</strong>
                      </td>
                      <td>{application.program}</td>
                      <td>{application.degree}</td>
                      <td>{application.intake}</td>
                      <td>{formatDate(application.submittedAt)}</td>
                      <td>
                        <span
                          className={`student-application-status ${getStatusClass(
                            application.status,
                          )}`}
                        >
                          {application.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="student-application-view"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {selectedApplication && (
        <div
          className="student-application-modal-overlay"
          onClick={() => setSelectedApplication(null)}
        >
          <div
            className="student-application-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="student-application-modal-heading">
              <div>
                <h2>Application Details</h2>
                <p>Review your application information.</p>
              </div>

              <button onClick={() => setSelectedApplication(null)}>×</button>
            </div>

            <div className="student-application-detail">
              <p>
                <GraduationCap size={17} />
                <strong>University:</strong>{" "}
                {selectedApplication.universityName}
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
                <CalendarDays size={17} />
                <strong>Submitted:</strong>{" "}
                {formatDate(selectedApplication.submittedAt)}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`student-application-status ${getStatusClass(
                    selectedApplication.status,
                  )}`}
                >
                  {selectedApplication.status}
                </span>
              </p>

              {selectedApplication.notes && (
                <p>
                  <strong>Notes:</strong> {selectedApplication.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
