import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "../../components/Navbar/Navbar";
import AgencyCard from "../../components/AgencyCard/AgencyCard";
import { agencies } from "../../data/sampleData";
import "./Agencies.css";

function Agencies() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");

  const locations = useMemo(
    () => [...new Set(agencies.map((item) => item.location))],
    [],
  );

  const filteredAgencies = useMemo(() => {
    return agencies.filter((agency) => {
      const matchesSearch =
        agency.name.toLowerCase().includes(search.toLowerCase()) ||
        agency.location.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "All" || agency.location === location;

      return matchesSearch && matchesLocation;
    });
  }, [search, location]);

  const clearFilters = () => {
    setSearch("");
    setLocation("All");
  };

  return (
    <>
      <Navbar />

      <main className="directory-page">
        <section className="directory-hero agency-hero">
          <div className="container">
            <span className="directory-label">STUDY ABROAD SUPPORT</span>

            <h1>
              Find Education <span>Agencies</span>
            </h1>

            <p>
              Discover education agencies in Myanmar and explore the Korean
              universities they list.
            </p>

            <div className="directory-search">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search agency or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="directory-content container">
          <div className="directory-heading">
            <div>
              <h2>All Agencies</h2>
              <p>{filteredAgencies.length} agencies found</p>
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
          </div>

          {filteredAgencies.length > 0 ? (
            <div className="directory-grid">
              {filteredAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          ) : (
            <div className="directory-empty">
              <h3>No agencies found</h3>
              <p>Try another agency name or location.</p>
              <button onClick={clearFilters}>Clear Filters</button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Agencies;
