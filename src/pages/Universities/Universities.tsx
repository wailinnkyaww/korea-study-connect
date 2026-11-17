import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import UniversityCard from "../../components/UniversityCard/UniversityCard";
import { universities } from "../../data/sampleData";
import "./Universities.css";

function Universities() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");
  const [program, setProgram] = useState("All");

  const locations = useMemo(
    () => [...new Set(universities.map((item) => item.location))],
    [],
  );

  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const matchesSearch =
        university.name.toLowerCase().includes(search.toLowerCase()) ||
        university.location.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "All" || university.location === location;

      const matchesProgram =
        program === "All" ||
        university.programs.includes(program as "D-2" | "D-4");

      return matchesSearch && matchesLocation && matchesProgram;
    });
  }, [search, location, program]);

  const clearFilters = () => {
    setSearch("");
    setLocation("All");
    setProgram("All");
  };

  return (
    <>
      <Navbar />

      <main className="directory-page">
        <section className="directory-hero university-hero">
          <div className="container">
            <span className="directory-label">EXPLORE SOUTH KOREA</span>

            <h1>
              Find Your <span>University</span>
            </h1>

            <p>
              Explore Korean universities and discover their available D-2 and
              D-4 study programs.
            </p>

            <div className="directory-search">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search university or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="directory-content container">
          <div className="directory-heading">
            <div>
              <h2>All Universities</h2>
              <p>{filteredUniversities.length} universities found</p>
            </div>

            <button className="clear-filter" onClick={clearFilters}>
              <SlidersHorizontal size={16} />
              Clear Filters
            </button>
          </div>

          <div className="directory-filters">
            <div className="filter-group">
              <label>Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="All">All Locations</option>
                {locations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Study Program</label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
              >
                <option value="All">All Programs</option>
                <option value="D-2">D-2 Degree Program</option>
                <option value="D-4">D-4 Language Program</option>
              </select>
            </div>
          </div>

          {filteredUniversities.length > 0 ? (
            <div className="directory-grid">
              {filteredUniversities.map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
          ) : (
            <div className="directory-empty">
              <h3>No universities found</h3>
              <p>Try changing your search or filters.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Universities;
