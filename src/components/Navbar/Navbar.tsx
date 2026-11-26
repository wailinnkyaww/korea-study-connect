import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, User, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  console.log("Current User:", currentUser);

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const dashboardPath =
    currentUser?.role === "student"
      ? "/student/dashboard"
      : currentUser?.role === "agency"
        ? "/agency/dashboard"
        : "/admin/dashboard";

  return (
    <nav className="navbar">
      <div className="nav-container container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-icon">
            <GraduationCap size={25} />
          </span>

          <span>
            Korea<span className="logo-highlight">Study</span>
            <small>CONNECT</small>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/agencies" onClick={() => setMenuOpen(false)}>
            Agencies
          </Link>

          <Link to="/universities" onClick={() => setMenuOpen(false)}>
            Universities
          </Link>

          <a href="#programs" onClick={() => setMenuOpen(false)}>
            Programs
          </a>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          {/* Mobile Authentication Links */}
          <div className="mobile-auth-links">
            {!currentUser ? (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>

                <Link
                  to="/register"
                  className="mobile-register"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to={dashboardPath} onClick={() => setMenuOpen(false)}>
                  My Dashboard
                </Link>

                <button onClick={handleLogout}>
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Desktop Authentication */}
        <div className="nav-auth">
          {!currentUser ? (
            <>
              <Link to="/login" className="nav-login">
                Login
              </Link>

              <Link to="/register" className="nav-register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="nav-user">
                <User size={17} />
                {currentUser.fullName}
              </span>

              <Link to={dashboardPath} className="nav-register">
                Dashboard
              </Link>

              <button className="nav-logout" onClick={handleLogout}>
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
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
