import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Building2,
  ArrowLeft,
  GraduationCap,
  ArrowUpRight,
  Mail,
  Globe,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import UniversityCard from "../../components/UniversityCard/UniversityCard";

import { agencies, universities } from "../../data/sampleData";

import "./AgencyDetails.css";

function AgencyDetails() {
  const { id } = useParams<{ id: string }>();

  const agency = agencies.find((item) => item.id === id);

  const partnerUniversities = universities.filter((university) =>
    agency?.universities.includes(university.id),
  );

  if (!agency) {
    return (
      <div className="details-not-found">
        <h2>Agency Not Found</h2>
        <p>Sorry, we couldn't find this education agency.</p>
        <Link to="/agencies">Back to Agencies</Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="agency-details-page">
        <div className="container">
          <Link to="/#agencies" className="back-link">
            <ArrowLeft size={18} />
            Back to Agencies
          </Link>

          <section className="agency-profile">
            <div className="agency-profile-image">
              <img src={agency.image} alt={agency.name} />
            </div>

            <div className="agency-profile-content">
              <span className="details-label">EDUCATION AGENCY</span>

              <h1>{agency.name}</h1>

              <p className="agency-profile-description">{agency.description}</p>

              <div className="agency-info-list">
                <div>
                  <MapPin size={18} />
                  <span>{agency.location}</span>
                </div>

                <div>
                  <Building2 size={18} />
                  <span>{partnerUniversities.length} Partner Universities</span>
                </div>

                <div>
                  <GraduationCap size={18} />
                  <span>Study in South Korea</span>
                </div>
              </div>

              <div className="agency-contact-actions">
                <button
                  className="contact-button"
                  onClick={() =>
                    alert("Agency contact information will be available soon.")
                  }
                >
                  <Mail size={17} />
                  Contact Agency
                </button>

                <button
                  className="website-button"
                  onClick={() =>
                    alert("Agency website information will be available soon.")
                  }
                >
                  <Globe size={17} />
                  Website
                </button>
              </div>

              <p className="contact-notice">
                Contact details and partnership information are not yet
                verified.
              </p>
            </div>
          </section>

          <section className="agency-partners">
            <div className="details-heading">
              <div>
                <span className="details-label">UNIVERSITY PARTNERS</span>

                <h2>Universities Connected to This Agency</h2>

                <p>
                  Explore the Korean universities associated with this agency.
                </p>
              </div>

              <span className="partner-count">
                {partnerUniversities.length} Universities
              </span>
            </div>

            {partnerUniversities.length > 0 ? (
              <div className="university-grid">
                {partnerUniversities.map((university) => (
                  <UniversityCard key={university.id} university={university} />
                ))}
              </div>
            ) : (
              <div className="details-empty">
                <Building2 size={35} />
                <h3>No Universities Available</h3>
                <p>No partner universities have been added for this agency.</p>
              </div>
            )}
          </section>

          <section className="agency-bottom-banner">
            <div>
              <h2>Find Your Study Opportunity</h2>
              <p>Explore universities and compare D-2 and D-4 programs.</p>
            </div>

            <Link to="/universities" className="explore-link">
              Explore Universities
              <ArrowUpRight size={18} />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}

export default AgencyDetails;
