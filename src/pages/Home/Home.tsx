import { useMemo, useState } from "react";
import {
  Search,
  GraduationCap,
  Globe,
  Building2,
  ArrowRight,
  BookOpen,
  Users,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import UniversityCard from "../../components/UniversityCard/UniversityCard";
import AgencyCard from "../../components/AgencyCard/AgencyCard";

import { agencies, universities } from "../../data/sampleData";

import "./Home.css";

function Home() {
  const [universitySearch, setUniversitySearch] = useState("");
  const [program, setProgram] = useState("All");
  const [search, setSearch] = useState("");
  const [agencySearch, setAgencySearch] = useState("");

  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const matchesSearch =
        university.name
          .toLowerCase()
          .includes(universitySearch.toLowerCase()) ||
        university.location
          .toLowerCase()
          .includes(universitySearch.toLowerCase());

      const matchesProgram =
        program === "All" ||
        university.programs.includes(program as "D-2" | "D-4");

      return matchesSearch && matchesProgram;
    });
  }, [universitySearch, program]);

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(agencySearch.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section className="hero" id="home">
          <div className="hero-container container">
            <div className="hero-content">
              <span className="hero-label">
                🇰🇷 YOUR KOREAN STUDY JOURNEY STARTS HERE
              </span>

              <h1>
                Discover Your Future
                <span> in South Korea.</span>
              </h1>

              <p>
                Find trusted education agencies, explore Korean universities,
                and discover D-2 and D-4 study opportunities in one place.
              </p>

              <div className="hero-search">
                <Search size={21} />

                <input
                  type="text"
                  placeholder="Search university or location..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    document.getElementById("universities")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                />

                <button
                  onClick={() =>
                    document.getElementById("universities")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Search
                </button>
              </div>

              <div className="hero-trust">
                <span>
                  <ShieldCheck size={17} /> Explore opportunities
                </span>
                <span>
                  <Globe size={17} /> Study in Korea
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <img
                src="https://images.unsplash.com/photo-1549693578-d683be217e58?w=1000"
                alt="South Korea city"
              />

              <div className="hero-floating-card">
                <span className="floating-icon">
                  <GraduationCap size={25} />
                </span>
                <div>
                  <strong>Your Future Awaits</strong>
                  <small>Start exploring today</small>
                </div>
              </div>

              <div className="hero-decoration">✦</div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="stats-section">
          <div className="container stats-grid">
            <div className="stat-item">
              <Building2 />
              <div>
                <h3>Agencies</h3>
                <p>Explore education partners</p>
              </div>
            </div>

            <div className="stat-item">
              <GraduationCap />
              <div>
                <h3>Universities</h3>
                <p>Discover Korean institutions</p>
              </div>
            </div>

            <div className="stat-item">
              <BookOpen />
              <div>
                <h3>D-2 & D-4</h3>
                <p>Explore study programs</p>
              </div>
            </div>

            <div className="stat-item">
              <Users />
              <div>
                <h3>Students</h3>
                <p>Plan your study journey</p>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAMS */}
        <section className="program-section" id="programs">
          <div className="container">
            <div className="section-heading">
              <span>STUDY PROGRAMS</span>
              <h2>Choose Your Study Path</h2>
              <p>Understand the two main study visa pathways in Korea.</p>
            </div>

            <div className="program-grid">
              <div className="program-card d2-card">
                <div className="program-icon">
                  <GraduationCap size={30} />
                </div>
                <span className="program-tag">D-2 VISA</span>
                <h3>Degree Programs</h3>
                <p>
                  Explore associate, bachelor's, master's and doctoral degree
                  opportunities at Korean universities.
                </p>
                <a href="#universities" onClick={() => setProgram("D-2")}>
                  Explore D-2 <ArrowRight size={17} />
                </a>
              </div>

              <div className="program-card d4-card">
                <div className="program-icon">
                  <BookOpen size={30} />
                </div>
                <span className="program-tag">D-4 VISA</span>
                <h3>Language Training</h3>
                <p>
                  Discover Korean language training opportunities and university
                  language institutes.
                </p>
                <a href="#universities" onClick={() => setProgram("D-4")}>
                  Explore D-4 <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* UNIVERSITIES */}
        <section className="university-section" id="universities">
          <div className="container">
            <div className="section-heading">
              <span>FIND YOUR UNIVERSITY</span>
              <h2>Explore Korean Universities</h2>
              <p>Find universities that match your study interests.</p>
            </div>

            <div className="filter-bar">
              <div className="filter-buttons">
                {["All", "D-2", "D-4"].map((item) => (
                  <button
                    key={item}
                    className={program === item ? "selected" : ""}
                    onClick={() => setProgram(item)}
                  >
                    {item === "All" ? "All Programs" : item}
                  </button>
                ))}
              </div>

              <div className="filter-search">
                <Search size={19} />
                <input
                  type="text"
                  placeholder="Search university..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="university-grid">
              {filteredUniversities.length > 0 ? (
                filteredUniversities.map((university) => (
                  <UniversityCard key={university.id} university={university} />
                ))
              ) : (
                <div className="empty-state">
                  No universities found. Try another search.
                </div>
              )}
            </div>

            <div className="center-button">
              <button
                onClick={() => {
                  setUniversitySearch("");
                  setProgram("All");
                }}
              >
                Clear Filters <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </section>

        {/* AGENCIES */}
        <section className="agency-section" id="agencies">
          <div className="container">
            <div className="section-heading">
              <span>EDUCATION PARTNERS</span>
              <h2>Find Your Education Agency</h2>
              <p>Explore agencies and their associated universities.</p>
            </div>

            <div className="filter-search agency-search">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search agency name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="agency-grid">
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((agency) => (
                  <AgencyCard key={agency.id} agency={agency} />
                ))
              ) : (
                <div className="empty-state">No agencies found.</div>
              )}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="about">
          <div className="container">
            <div className="section-heading">
              <span>SIMPLE PROCESS</span>
              <h2>How Korea Study Connect Works</h2>
              <p>Three simple steps to start your journey.</p>
            </div>

            <div className="how-grid">
              <div className="how-card">
                <div className="how-number">01</div>
                <Search size={30} />
                <h3>Find an Agency</h3>
                <p>Search and choose an education agency.</p>
              </div>

              <div className="how-card">
                <div className="how-number">02</div>
                <GraduationCap size={30} />
                <h3>Explore Universities</h3>
                <p>Discover the universities connected to the agency.</p>
              </div>

              <div className="how-card">
                <div className="how-number">03</div>
                <Globe size={30} />
                <h3>Choose Your Program</h3>
                <p>Explore D-2 or D-4 opportunities and contact the agency.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <p>© 2026 Korea Study Connect. Your journey, your future.</p>
        <p>Study in South Korea 🇰🇷</p>
      </footer>
    </>
  );
}

export default Home;
