import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Building2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import AgencyCard from "../../components/AgencyCard/AgencyCard";

import { agencies, universities } from "../../data/sampleData";

import "./UniversityDetails.css";

function UniversityDetails() {
  const { id } = useParams<{ id: string }>();

  const university = universities.find((item) => item.id === id);

  const relatedAgencies = agencies.filter((agency) =>
    agency.universities.includes(id || ""),
  );

  if (!university) {
    return (
      <div className="details-not-found">
        <h2>University Not Found</h2>
        <p>Sorry, we couldn't find this university.</p>
        <Link to="/universities">Back to Universities</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="university-details-page">
        <div className="container">
          <Link to="/#universities" className="back-link">
            <ArrowLeft size={18} />
            Back to Universities
          </Link>

          {/* UNIVERSITY HERO */}

          <section className="university-profile">
            <div className="university-profile-image">
              <img src={university.image} alt={university.name} />

              <div className="university-profile-badges">
                {university.programs.map((program) => (
                  <span
                    key={program}
                    className={`program-badge ${program.toLowerCase()}`}
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>

            <div className="university-profile-content">
              <span className="details-label">KOREAN UNIVERSITY</span>

              <h1>{university.name}</h1>

              <p className="university-description">{university.description}</p>

              <div className="university-detail-info">
                <div>
                  <MapPin size={19} />
                  <span>{university.location}</span>
                </div>

                <div>
                  <GraduationCap size={19} />
                  <span>Degree Programs (D-2)</span>
                </div>

                <div>
                  <BookOpen size={19} />
                  <span>Language Training (D-4)</span>
                </div>
              </div>

              <div className="tuition-information">
                <span>Tuition Information</span>
                <strong>{university.tuition}</strong>
                <small>
                  Fees vary by department, degree and academic year. Confirm
                  directly with the university.
                </small>
              </div>
            </div>
          </section>

          {/* PROGRAM DETAILS */}

          <section className="university-program-section">
            <div className="details-heading">
              <div>
                <span className="details-label">AVAILABLE CATEGORIES</span>

                <h2>Explore Study Programs</h2>

                <p>
                  Learn about the study visa categories associated with this
                  university.
                </p>
              </div>
            </div>

            <div className="university-program-grid">
              {university.programs.includes("D-2") && (
                <div className="university-program-card d2-program">
                  <div className="detail-program-icon">
                    <GraduationCap size={28} />
                  </div>

                  <span>D-2 VISA</span>

                  <h3>Degree Program</h3>

                  <p>
                    For international students pursuing eligible degree programs
                    at Korean universities, such as bachelor's, master's and
                    doctoral degrees.
                  </p>

                  <ul>
                    <li>
                      <CheckCircle2 size={16} />
                      Undergraduate programs
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      Graduate programs
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      Doctoral programs
                    </li>
                  </ul>
                </div>
              )}

              {university.programs.includes("D-4") && (
                <div className="university-program-card d4-program">
                  <div className="detail-program-icon">
                    <BookOpen size={28} />
                  </div>

                  <span>D-4 VISA</span>

                  <h3>Language Training</h3>

                  <p>
                    For eligible international students attending Korean
                    language training or other qualifying non-degree educational
                    programs.
                  </p>

                  <ul>
                    <li>
                      <CheckCircle2 size={16} />
                      Korean language courses
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      Language institute
                    </li>
                    <li>
                      <CheckCircle2 size={16} />
                      Non-degree training
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <p className="program-disclaimer">
              Important: These are visa category descriptions, not confirmation
              of current admission availability. Check the university's official
              admissions information before applying.
            </p>
          </section>

          {/* RELATED AGENCIES */}

          <section className="related-agencies">
            <div className="details-heading">
              <div>
                <span className="details-label">EDUCATION PARTNERS</span>

                <h2>Agencies Connected to This University</h2>

                <p>
                  Explore agencies associated with this university in our
                  demonstration database.
                </p>
              </div>

              <span className="partner-count">
                {relatedAgencies.length} Agencies
              </span>
            </div>

            {relatedAgencies.length > 0 ? (
              <div className="agency-grid">
                {relatedAgencies.map((agency) => (
                  <AgencyCard key={agency.id} agency={agency} />
                ))}
              </div>
            ) : (
              <div className="details-empty">
                <Building2 size={35} />
                <h3>No Agencies Listed</h3>
                <p>No associated agencies have been added yet.</p>
              </div>
            )}
          </section>

          {/* OFFICIAL INFORMATION */}

          <section className="official-info-banner">
            <div>
              <h2>Need Official Admission Information?</h2>
              <p>
                Always verify tuition fees, application dates and visa
                requirements through the university's official international
                admissions office.
              </p>
            </div>

            <span className="official-info-note">
              <ExternalLink size={18} />
              Official links will be added after verification.
            </span>
          </section>
        </div>
      </main>
    </>
  );
}

export default UniversityDetails;
