import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Search,
  Users,
  UserCheck,
  Clock,
  Eye,
  Pencil,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
} from "lucide-react";
import "./AgencyStudents.css";

type StudentStatus = "Pending" | "Approved" | "Rejected";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  education: string;
  preferredCountry: string;
  preferredMajor: string;
  status: StudentStatus;
  joinedDate: string;
}

const initialStudents: Student[] = [
  {
    id: 1,
    name: "Aung Aung",
    email: "aung@example.com",
    phone: "+95 9 123456789",
    nationality: "Myanmar",
    education: "Bachelor Degree",
    preferredCountry: "South Korea",
    preferredMajor: "Computer Science",
    status: "Approved",
    joinedDate: "2026-10-10",
  },
  {
    id: 2,
    name: "Su Su",
    email: "susu@example.com",
    phone: "+95 9 234567890",
    nationality: "Myanmar",
    education: "High School",
    preferredCountry: "South Korea",
    preferredMajor: "Business Administration",
    status: "Pending",
    joinedDate: "2026-10-15",
  },
  {
    id: 3,
    name: "Mg Mg",
    email: "mgmg@example.com",
    phone: "+95 9 345678901",
    nationality: "Myanmar",
    education: "Bachelor Degree",
    preferredCountry: "South Korea",
    preferredMajor: "Information Technology",
    status: "Approved",
    joinedDate: "2026-10-18",
  },
  {
    id: 4,
    name: "Hla Hla",
    email: "hla@example.com",
    phone: "+95 9 456789012",
    nationality: "Myanmar",
    education: "High School",
    preferredCountry: "Japan",
    preferredMajor: "International Relations",
    status: "Rejected",
    joinedDate: "2026-10-20",
  },
  {
    id: 5,
    name: "Kyaw Kyaw",
    email: "kyaw@example.com",
    phone: "+95 9 567890123",
    nationality: "Myanmar",
    education: "Master Degree",
    preferredCountry: "South Korea",
    preferredMajor: "Data Science",
    status: "Pending",
    joinedDate: "2026-10-22",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  education: "",
  preferredCountry: "",
  preferredMajor: "",
};

type StudentFormData = typeof emptyForm;

const AgencyStudents = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudentId, setEditingStudentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<StudentFormData>(emptyForm);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchText = [
        student.name,
        student.email,
        student.nationality,
        student.preferredMajor,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [students, searchTerm, statusFilter]);

  const approvedCount = students.filter(
    (student) => student.status === "Approved",
  ).length;

  const pendingCount = students.filter(
    (student) => student.status === "Pending",
  ).length;

  const rejectedCount = students.filter(
    (student) => student.status === "Rejected",
  ).length;

  const openEditModal = (student: Student) => {
    setEditingStudentId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      nationality: student.nationality,
      education: student.education,
      preferredCountry: student.preferredCountry,
      preferredMajor: student.preferredMajor,
    });
    setSelectedStudent(null);
  };

  const closeEditModal = () => {
    setEditingStudentId(null);
    setFormData(emptyForm);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingStudentId === null) return;

    setStudents((previous) =>
      previous.map((student) =>
        student.id === editingStudentId ? { ...student, ...formData } : student,
      ),
    );

    closeEditModal();
  };

  const updateStatus = (id: number, status: StudentStatus) => {
    setStudents((previous) =>
      previous.map((student) =>
        student.id === id ? { ...student, status } : student,
      ),
    );

    setSelectedStudent((previous) =>
      previous?.id === id ? { ...previous, status } : previous,
    );
  };

  const deleteStudent = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this student record?",
    );

    if (!confirmed) return;

    setStudents((previous) => previous.filter((student) => student.id !== id));

    setSelectedStudent(null);
  };

  return (
    <div className="agency-students-page">
      {/* Page Heading */}
      <div className="agency-students-heading">
        <div>
          <span className="agency-students-eyebrow">AGENCY MANAGEMENT</span>
          <h2>Students</h2>
          <p>View and manage students associated with your agency.</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="agency-student-stats">
        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon purple">
            <Users size={23} />
          </div>
          <div>
            <span>Total Students</span>
            <h3>{students.length}</h3>
          </div>
        </div>

        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon green">
            <UserCheck size={23} />
          </div>
          <div>
            <span>Approved Students</span>
            <h3>{approvedCount}</h3>
          </div>
        </div>

        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon orange">
            <Clock size={23} />
          </div>
          <div>
            <span>Pending Students</span>
            <h3>{pendingCount}</h3>
          </div>
        </div>

        <div className="agency-student-stat-card">
          <div className="agency-student-stat-icon red">
            <FileText size={23} />
          </div>
          <div>
            <span>Rejected Students</span>
            <h3>{rejectedCount}</h3>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="agency-student-toolbar">
        <div className="agency-student-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search name, email, nationality..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter students by status"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="agency-student-table-card">
        <div className="agency-student-table-heading">
          <div>
            <h3>Student Records</h3>
            <p>{filteredStudents.length} students found</p>
          </div>
        </div>

        <div className="agency-student-table-wrapper">
          <table className="agency-student-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Nationality</th>
                <th>Preferred Major</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="agency-student-name-cell">
                      <div className="agency-student-avatar">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>{student.nationality}</td>
                  <td>{student.preferredMajor}</td>
                  <td>{student.joinedDate}</td>

                  <td>
                    <span
                      className={`agency-student-status ${student.status.toLowerCase()}`}
                    >
                      {student.status}
                    </span>
                  </td>

                  <td>
                    <div className="agency-student-row-actions">
                      <button
                        className="agency-student-view-btn"
                        title="View details"
                        aria-label={`View ${student.name}`}
                        onClick={() => setSelectedStudent(student)}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        className="agency-student-edit-btn"
                        title="Edit student"
                        aria-label={`Edit ${student.name}`}
                        onClick={() => openEditModal(student)}
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        className="agency-student-delete-btn"
                        title="Delete student"
                        aria-label={`Delete ${student.name}`}
                        onClick={() => deleteStudent(student.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="agency-student-no-results">
                      <Users size={35} />
                      <h3>No students found</h3>
                      <p>Try changing your search or status filter.</p>
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
                <p>View student information and update status.</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                aria-label="Close details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="agency-student-detail-profile">
              <div className="agency-student-detail-avatar">
                {selectedStudent.name.charAt(0).toUpperCase()}
              </div>
              <h3>{selectedStudent.name}</h3>
              <span
                className={`agency-student-status ${selectedStudent.status.toLowerCase()}`}
              >
                {selectedStudent.status}
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
                <Phone size={18} />
                <section>
                  <span>Phone Number</span>
                  <strong>{selectedStudent.phone}</strong>
                </section>
              </div>

              <div>
                <MapPin size={18} />
                <section>
                  <span>Nationality</span>
                  <strong>{selectedStudent.nationality}</strong>
                </section>
              </div>

              <div>
                <GraduationCap size={18} />
                <section>
                  <span>Current Education</span>
                  <strong>{selectedStudent.education}</strong>
                </section>
              </div>

              <div>
                <FileText size={18} />
                <section>
                  <span>Preferred Major</span>
                  <strong>{selectedStudent.preferredMajor}</strong>
                </section>
              </div>

              <div>
                <MapPin size={18} />
                <section>
                  <span>Preferred Country</span>
                  <strong>{selectedStudent.preferredCountry}</strong>
                </section>
              </div>
            </div>

            <div className="agency-student-detail-actions">
              <button
                className="agency-student-edit-detail-btn"
                onClick={() => openEditModal(selectedStudent)}
              >
                <Pencil size={16} />
                Edit Information
              </button>

              {selectedStudent.status !== "Approved" && (
                <button
                  className="agency-student-approve-btn"
                  onClick={() => updateStatus(selectedStudent.id, "Approved")}
                >
                  Approve
                </button>
              )}

              {selectedStudent.status !== "Rejected" && (
                <button
                  className="agency-student-reject-btn"
                  onClick={() => updateStatus(selectedStudent.id, "Rejected")}
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudentId !== null && (
        <div className="agency-student-modal-overlay" onClick={closeEditModal}>
          <div
            className="agency-student-modal agency-student-edit-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="agency-student-modal-header">
              <div>
                <h3>Edit Student</h3>
                <p>Update the student's information.</p>
              </div>
              <button onClick={closeEditModal} aria-label="Close edit form">
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Email Address
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Nationality
                <input
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Current Education
                <input
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Preferred Country
                <input
                  name="preferredCountry"
                  value={formData.preferredCountry}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Preferred Major
                <input
                  name="preferredMajor"
                  value={formData.preferredMajor}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="agency-student-edit-actions">
                <button
                  type="button"
                  className="agency-student-cancel-btn"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button type="submit" className="agency-student-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyStudents;
