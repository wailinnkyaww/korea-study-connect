import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, LogOut } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import defaultAvatar from "../../assets/default-avatar.png";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const dashboardPath =
    currentUser?.role === "student"
      ? "/student/dashboard"
      : currentUser?.role === "agency"
        ? "/agency/dashboard"
        : "/admin/dashboard";

  const profileImage = currentUser?.profileImage || defaultAvatar;

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container container">
        {/* Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
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
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/agencies" onClick={closeMenu}>
            Agencies
          </Link>

          <Link to="/universities" onClick={closeMenu}>
            Universities
          </Link>

          <a href="#programs" onClick={closeMenu}>
            Programs
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          {/* Mobile Authentication */}
          <div className="mobile-auth-links">
            {!currentUser ? (
              <>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>

                <Link
                  to="/register"
                  className="mobile-register"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="mobile-user-info">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="nav-avatar"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = defaultAvatar;
                    }}
                  />

                  <div>
                    <strong>{currentUser.fullName}</strong>
                    <span>
                      {currentUser.role.charAt(0).toUpperCase() +
                        currentUser.role.slice(1)}{" "}
                      Account
                    </span>
                  </div>
                </div>

                <Link to={dashboardPath} onClick={closeMenu}>
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
              <div className="nav-user">
                <img
                  src={profileImage}
                  alt={`${currentUser.fullName} profile`}
                  className="nav-avatar"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = defaultAvatar;
                  }}
                />

                <span>{currentUser.fullName}</span>
              </div>

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
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
