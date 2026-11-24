import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  MapPin,
  GraduationCap,
  ExternalLink,
  Trash2,
  Building2,
  SlidersHorizontal,
} from "lucide-react";

import "./StudentSavedUniversities.css";

type DegreeLevel = "Bachelor" | "Master" | "PhD";

interface University {
  id: string;
  name: string;
  location: string;
  description: string;
  degreeLevels: DegreeLevel[];
  tuition: string;
  image: string;
}

const initialUniversities: University[] = [
  {
    id: "seoul-national-university",
    name: "Seoul National University",
    location: "Gwanak-gu, Seoul",
    description:
      "A leading national university offering a wide range of academic and research programs.",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    tuition: "₩2,500,000 – ₩5,000,000 / semester",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
  },
  {
    id: "korea-university",
    name: "Korea University",
    location: "Seongbuk-gu, Seoul",
    description:
      "A major private university known for its academic programs and international community.",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    tuition: "₩3,500,000 – ₩6,000,000 / semester",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
  },
  {
    id: "yonsei-university",
    name: "Yonsei University",
    location: "Seodaemun-gu, Seoul",
    description:
      "A well-known university with diverse programs and opportunities for international students.",
    degreeLevels: ["Bachelor", "Master"],
    tuition: "₩4,000,000 – ₩7,000,000 / semester",
    image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
  },
  {
    id: "hanyang-university",
    name: "Hanyang University",
    location: "Seongdong-gu, Seoul",
    description:
      "A university recognized for engineering, technology, and practical education.",
    degreeLevels: ["Bachelor", "Master", "PhD"],
    tuition: "₩4,000,000 – ₩6,500,000 / semester",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800",
  },
  {
    id: "kaist",
    name: "KAIST",
    location: "Yuseong-gu, Daejeon",
    description:
      "A science and technology university focused on research, innovation, and advanced engineering.",
    degreeLevels: ["Master", "PhD"],
    tuition: "Scholarship opportunities available",
    image: "https://images.unsplash.com/photo-1568792923760-d70635a89fdc?w=800",
  },
];

const degreeOptions = ["All Degrees", "Bachelor", "Master", "PhD"];

const StudentSavedUniversities = () => {
  const [savedUniversities, setSavedUniversities] =
    useState<University[]>(initialUniversities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("All Degrees");

  const filteredUniversities = useMemo(() => {
    return savedUniversities.filter((university) => {
      const keyword = searchTerm.toLowerCase();

      const matchesSearch =
        university.name.toLowerCase().includes(keyword) ||
        university.location.toLowerCase().includes(keyword);

      const matchesDegree =
        selectedDegree === "All Degrees" ||
        university.degreeLevels.includes(selectedDegree as DegreeLevel);

      return matchesSearch && matchesDegree;
    });
  }, [savedUniversities, searchTerm, selectedDegree]);

  const handleRemove = (id: string) => {
    setSavedUniversities((current) =>
      current.filter((university) => university.id !== id),
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDegree("All Degrees");
  };

  return (
    <div className="student-saved-universities">
      {/* Page Heading */}
      <div className="saved-universities-heading">
        <div>
          <span className="dashboard-eyebrow">STUDENT PORTAL</span>
          <h2>Saved Universities</h2>
          <p>Keep track of universities you are interested in.</p>
        </div>

        <div className="saved-count">
          <Heart size={18} fill="currentColor" />
          <span>{savedUniversities.length} Saved</span>
        </div>
      </div>

      {/* Summary */}
      <div className="saved-universities-summary">
        <div className="saved-summary-icon">
          <Heart size={23} />
        </div>
        <div>
          <span>Your saved list</span>
          <h3>
            {savedUniversities.length}{" "}
            {savedUniversities.length === 1 ? "University" : "Universities"}
          </h3>
          <p>Save universities you want to compare or apply to later.</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="saved-universities-toolbar">
        <div className="saved-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search by university or location..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="saved-degree-filter">
          <SlidersHorizontal size={17} />
          <select
            value={selectedDegree}
            onChange={(event) => setSelectedDegree(event.target.value)}
            aria-label="Filter by degree level"
          >
            {degreeOptions.map((degree) => (
              <option key={degree} value={degree}>
                {degree}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* University Cards */}
      <div className="saved-universities-list-heading">
        <div>
          <h3>My Saved List</h3>
          <p>
            Showing {filteredUniversities.length} of {savedUniversities.length}{" "}
            universities
          </p>
        </div>
        <Link to="/universities" className="browse-universities-link">
          Browse Universities
          <ExternalLink size={15} />
        </Link>
      </div>

      {filteredUniversities.length > 0 ? (
        <div className="saved-universities-grid">
          {filteredUniversities.map((university) => (
            <article className="saved-university-card" key={university.id}>
              <div className="saved-university-image">
                <img
                  src={university.image}
                  alt={`${university.name} campus`}
                  loading="lazy"
                />
                <span className="saved-image-label">
                  <GraduationCap size={14} />
                  University
                </span>
                <button
                  className="remove-saved-button"
                  onClick={() => handleRemove(university.id)}
                  aria-label={`Remove ${university.name} from saved universities`}
                  title="Remove from saved"
                >
                  <Heart size={18} fill="currentColor" />
                </button>
              </div>

              <div className="saved-university-content">
                <h3>{university.name}</h3>

                <div className="saved-university-location">
                  <MapPin size={15} />
                  <span>{university.location}</span>
                </div>

                <p className="saved-university-description">
                  {university.description}
                </p>

                <div className="saved-degree-tags">
                  {university.degreeLevels.map((degree) => (
                    <span key={degree}>{degree}</span>
                  ))}
                </div>

                <div className="saved-university-tuition">
                  <span>Tuition information</span>
                  <strong>{university.tuition}</strong>
                </div>

                <div className="saved-university-actions">
                  <Link
                    to={`/universities/${university.id}`}
                    className="saved-view-details"
                  >
                    View Details
                    <ExternalLink size={15} />
                  </Link>

                  <button
                    className="saved-remove-text"
                    onClick={() => handleRemove(university.id)}
                    title="Remove saved university"
                  >
                    <Trash2 size={15} />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="saved-universities-empty">
          <div className="saved-empty-icon">
            {savedUniversities.length === 0 ? (
              <Heart size={32} />
            ) : (
              <Building2 size={32} />
            )}
          </div>

          <h3>
            {savedUniversities.length === 0
              ? "No saved universities yet"
              : "No universities found"}
          </h3>

          <p>
            {savedUniversities.length === 0
              ? "Browse universities and save the ones you are interested in."
              : "Try another search keyword or degree filter."}
          </p>

          {savedUniversities.length === 0 ? (
            <Link to="/universities" className="saved-empty-action">
              Explore Universities
            </Link>
          ) : (
            <button onClick={clearFilters} className="saved-empty-action">
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSavedUniversities;
