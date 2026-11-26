import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  RefreshCw,
  Eye,
  X,
  Mail,
  ShieldCheck,
} from "lucide-react";

import {
  getAgencyStudents,
  type AgencyStudent,
} from "../../services/agencyStudentsService";

import "./AgencyStudents.css";

const AgencyStudents = () => {
  const [students, setStudents] = useState<AgencyStudent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<AgencyStudent | null>(
    null,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getAgencyStudents();
      setStudents(data);
    } catch (err) {
      console.error("Error loading students:", err);
      setError("Unable to load student records. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const filteredStudents = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return students;

    return students.filter((student) =>
      `${student.fullName} ${student.email}`.toLowerCase().includes(search),
    );
  }, [students, searchTerm]);

  return (
    <div className="agency-students-page">
      {/* Page Heading */}
      <div className="agency-students-heading">
        <div>
          <span className="agency-students-eyebrow">AGENCY MANAGEMENT</span>
          <h2>Students</h2>
          <p>View registered student accounts from your platform.</p>
        </div>

        <button
          type="button"
          className="agency-student-refresh-btn"
          onClick={fetchStudents}
          disabled={isLoading}
        >
          <RefreshCw
            size={17}
            className={isLoading ? "agency-refresh-spinning" : ""}
          />
          {isLoading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Statistics */}
      <div className="agency-student-stats">
        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon purple">
            <Users size={23} />
          </div>
          <div>
            <span>Total Students</span>
            <h3>{isLoading ? "..." : error ? "—" : students.length}</h3>
          </div>
        </div>

        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon green">
            <UserCheck size={23} />
          </div>
          <div>
            <span>Registered Accounts</span>
            <h3>{isLoading ? "..." : error ? "—" : students.length}</h3>
          </div>
        </div>

        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon orange">
            <Search size={23} />
          </div>
          <div>
            <span>Search Results</span>
            <h3>{isLoading ? "..." : error ? "—" : filteredStudents.length}</h3>
          </div>
        </div>

        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon red">
            <ShieldCheck size={23} />
          </div>
          <div>
            <span>Account Type</span>
            <h3 className="agency-student-role-value">Student</h3>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="agency-student-toolbar">
        <div className="agency-student-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search student name or email..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="agency-student-error">
          <span>{error}</span>
          <button type="button" onClick={fetchStudents}>
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      )}

      {/* Student Table */}
      <div className="agency-student-table-card">
        <div className="agency-student-table-heading">
          <div>
            <h3>Student Records</h3>
            <p>
              {isLoading
                ? "Loading student records..."
                : `${filteredStudents.length} students found`}
            </p>
          </div>
        </div>

        <div className="agency-student-table-wrapper">
          <table className="agency-student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email Address</th>
                <th>Account Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4}>
                    <div className="agency-student-loading">
                      <RefreshCw
                        size={25}
                        className="agency-refresh-spinning"
                      />
                      <p>Loading students from Firebase...</p>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4}>
                    <div className="agency-student-no-results">
                      <Users size={35} />
                      <h3>Unable to load students</h3>
                      <p>Please check your connection and try again.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="agency-student-name-cell">
                        <div className="agency-student-avatar">
                          {student.fullName.charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <strong>{student.fullName}</strong>
                          <span>{student.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{student.email}</td>

                    <td>
                      <span className="agency-student-status approved">
                        {student.role}
                      </span>
                    </td>

                    <td>
                      <div className="agency-student-row-actions">
                        <button
                          type="button"
                          className="agency-student-view-btn"
                          title="View details"
                          aria-label={`View ${student.fullName}`}
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>
                    <div className="agency-student-no-results">
                      <Users size={35} />
                      <h3>
                        {searchTerm
                          ? "No matching students"
                          : "No students registered yet"}
                      </h3>
                      <p>
                        {searchTerm
                          ? "Try another name or email address."
                          : "Registered student accounts will appear here."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div
          className="agency-student-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="agency-student-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="agency-student-modal-header">
              <div>
                <h3>Student Details</h3>
                <p>Student account information from Firestore.</p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="agency-student-detail-profile">
              <div className="agency-student-detail-avatar">
                {selectedStudent.fullName.charAt(0).toUpperCase()}
              </div>

              <h3>{selectedStudent.fullName}</h3>

              <span className="agency-student-status approved">
                {selectedStudent.role}
              </span>
            </div>

            <div className="agency-student-detail-list">
              <div>
                <Mail size={18} />
                <section>
                  <span>Email Address</span>
                  <strong>{selectedStudent.email}</strong>
                </section>
              </div>

              <div>
                <ShieldCheck size={18} />
                <section>
                  <span>Account Role</span>
                  <strong>{selectedStudent.role}</strong>
                </section>
              </div>
            </div>

            <div className="agency-student-detail-actions">
              <button
                type="button"
                className="agency-student-edit-detail-btn"
                onClick={() => setSelectedStudent(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyStudents;
