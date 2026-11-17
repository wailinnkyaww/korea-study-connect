import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, GraduationCap } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">
            <GraduationCap size={25} />
          </span>
          <span>
            Korea<span className="logo-highlight">Study</span>
            <small>CONNECT</small>
          </span>
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#agencies" onClick={() => setMenuOpen(false)}>
            Agencies
          </a>
          <a href="#universities" onClick={() => setMenuOpen(false)}>
            Universities
          </a>
          <a href="#programs" onClick={() => setMenuOpen(false)}>
            Programs
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>
        </div>

        <a href="#universities" className="nav-button">
          Explore Now
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
