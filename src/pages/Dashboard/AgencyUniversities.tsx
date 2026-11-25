import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Search,
  Plus,
  MapPin,
  GraduationCap,
  Pencil,
  Trash2,
  X,
  Building2,
  CheckCircle2,
  Power,
} from "lucide-react";
import "./AgencyUniversities.css";

type UniversityStatus = "Active" | "Inactive";

interface University {
  id: number;
  name: string;
  location: string;
  country: string;
  degree: string;
  tuition: string;
  status: UniversityStatus;
}

const initialUniversities: University[] = [
  {
    id: 1,
    name: "Seoul National University",
    location: "Seoul",
    country: "South Korea",
    degree: "Bachelor, Master, PhD",
    tuition: "3,000,000 KRW",
    status: "Active",
  },
  {
    id: 2,
    name: "Korea University",
    location: "Seoul",
    country: "South Korea",
    degree: "Bachelor, Master",
    tuition: "3,500,000 KRW",
    status: "Active",
  },
  {
    id: 3,
    name: "Yonsei University",
    location: "Seoul",
    country: "South Korea",
    degree: "Bachelor, Master, PhD",
    tuition: "4,000,000 KRW",
    status: "Active",
  },
  {
    id: 4,
    name: "Hanyang University",
    location: "Seoul",
    country: "South Korea",
    degree: "Bachelor, Master",
    tuition: "3,800,000 KRW",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Kyung Hee University",
    location: "Seoul",
    country: "South Korea",
    degree: "Bachelor, Master, PhD",
    tuition: "3,200,000 KRW",
    status: "Active",
  },
];

const emptyForm = {
  name: "",
  location: "",
  country: "South Korea",
  degree: "",
  tuition: "",
};

const AgencyUniversities = () => {
  const [universities, setUniversities] =
    useState<University[]>(initialUniversities);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const searchMatch =
        `${university.name} ${university.location} ${university.country}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const statusMatch =
        statusFilter === "All" || university.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [universities, searchTerm, statusFilter]);

  const activeCount = universities.filter(
    (university) => university.status === "Active",
  ).length;

  const inactiveCount = universities.length - activeCount;

  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (university: University) => {
    setEditingId(university.id);
    setFormData({
      name: university.name,
      location: university.location,
      country: university.country,
      degree: university.degree,
      tuition: university.tuition,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
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

    if (editingId !== null) {
      setUniversities((previous) =>
        previous.map((university) =>
          university.id === editingId
            ? { ...university, ...formData }
            : university,
        ),
      );
    } else {
      const newUniversity: University = {
        id: Date.now(),
        ...formData,
        status: "Active",
      };

      setUniversities((previous) => [newUniversity, ...previous]);
    }

    closeModal();
  };

  const toggleStatus = (id: number) => {
    setUniversities((previous) =>
      previous.map((university) =>
        university.id === id
          ? {
              ...university,
              status: university.status === "Active" ? "Inactive" : "Active",
            }
          : university,
      ),
    );
  };

  const deleteUniversity = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this university from your agency list?",
    );

    if (!confirmed) return;

    setUniversities((previous) =>
      previous.filter((university) => university.id !== id),
    );
  };

  return (
    <div className="agency-universities-page">
      <div className="agency-universities-heading">
        <div>
          <span className="agency-page-eyebrow">AGENCY MANAGEMENT</span>
          <h2>Universities</h2>
          <p>Manage the universities associated with your agency.</p>
        </div>

        <button className="agency-add-university-btn" onClick={openAddModal}>
          <Plus size={19} />
          Add University
        </button>
      </div>

      <div className="agency-university-stats">
        <div className="agency-university-stat-card">
          <div className="agency-stat-icon purple">
            <GraduationCap size={23} />
          </div>
          <div>
            <span>Total Universities</span>
            <h3>{universities.length}</h3>
          </div>
        </div>

        <div className="agency-university-stat-card">
          <div className="agency-stat-icon green">
            <CheckCircle2 size={23} />
          </div>
          <div>
            <span>Active Universities</span>
            <h3>{activeCount}</h3>
          </div>
        </div>

        <div className="agency-university-stat-card">
          <div className="agency-stat-icon orange">
            <Power size={23} />
          </div>
          <div>
            <span>Inactive Universities</span>
            <h3>{inactiveCount}</h3>
          </div>
        </div>
      </div>

      <div className="agency-university-toolbar">
        <div className="agency-university-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search university or location..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="agency-university-list-header">
        <div>
          <h3>My Universities</h3>
          <p>{filteredUniversities.length} universities found</p>
        </div>
      </div>

      {filteredUniversities.length > 0 ? (
        <div className="agency-university-grid">
          {filteredUniversities.map((university) => (
            <article className="agency-university-card" key={university.id}>
              <div className="agency-university-card-top">
                <div className="agency-university-logo">
                  <Building2 size={27} />
                </div>

                <span
                  className={`agency-university-status ${
                    university.status === "Active" ? "active" : "inactive"
                  }`}
                >
                  {university.status}
                </span>
              </div>

              <h3>{university.name}</h3>

              <div className="agency-university-location">
                <MapPin size={16} />
                <span>
                  {university.location}, {university.country}
                </span>
              </div>

              <div className="agency-university-info">
                <div>
                  <span>Degree Programs</span>
                  <strong>{university.degree}</strong>
                </div>
                <div>
                  <span>Tuition / Semester</span>
                  <strong>{university.tuition}</strong>
                </div>
              </div>

              <div className="agency-university-actions">
                <button
                  className="agency-edit-btn"
                  onClick={() => openEditModal(university)}
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  className="agency-toggle-btn"
                  onClick={() => toggleStatus(university.id)}
                  title={
                    university.status === "Active"
                      ? "Deactivate university"
                      : "Activate university"
                  }
                >
                  <Power size={16} />
                  {university.status === "Active" ? "Deactivate" : "Activate"}
                </button>

                <button
                  className="agency-delete-btn"
                  onClick={() => deleteUniversity(university.id)}
                  aria-label={`Delete ${university.name}`}
                  title="Remove university"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="agency-university-empty">
          <GraduationCap size={42} />
          <h3>No universities found</h3>
          <p>Try another search or add a university to your list.</p>
          <button onClick={openAddModal}>
            <Plus size={17} />
            Add University
          </button>
        </div>
      )}

      {modalOpen && (
        <div className="agency-modal-overlay" onClick={closeModal}>
          <div
            className="agency-university-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="agency-modal-header">
              <div>
                <h3>
                  {editingId !== null ? "Edit University" : "Add University"}
                </h3>
                <p>Enter the university information below.</p>
              </div>
              <button onClick={closeModal} aria-label="Close modal">
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                University Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter university name"
                  required
                />
              </label>

              <div className="agency-form-row">
                <label>
                  City
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Seoul"
                    required
                  />
                </label>

                <label>
                  Country
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Enter country"
                    required
                  />
                </label>
              </div>

              <label>
                Degree Programs
                <input
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  placeholder="e.g. Bachelor, Master, PhD"
                  required
                />
              </label>

              <label>
                Tuition per Semester
                <input
                  name="tuition"
                  value={formData.tuition}
                  onChange={handleInputChange}
                  placeholder="e.g. 3,000,000 KRW"
                  required
                />
              </label>

              <div className="agency-modal-actions">
                <button
                  type="button"
                  className="agency-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="agency-save-btn">
                  {editingId !== null ? "Save Changes" : "Add University"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyUniversities;
