import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, writeBatch } from "firebase/firestore";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  User,
  Building2,
} from "lucide-react";

import { auth, db } from "../../../config/firebase";
import "./Register.css";
import "../Login/Login.css";

type AccountRole = "student" | "agency";

const Register = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AccountRole>("student");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (role === "agency" && !agencyName.trim()) {
      setError("Please enter your agency name.");
      return;
    }

    setLoading(true);

    try {
      // Create account in Firebase Authentication.
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const uid = credential.user.uid;
      const batch = writeBatch(db);

      // Save common account information in users collection.
      batch.set(doc(db, "users", uid), {
        uid,
        fullName: fullName.trim(),
        email: email.trim(),
        role,
        createdAt: serverTimestamp(),
      });

      // Also create an agency record for agency accounts.
      if (role === "agency") {
        batch.set(doc(db, "agencies", uid), {
          agencyName: agencyName.trim(),
          email: email.trim(),
          userId: uid,
          createdAt: serverTimestamp(),
        });
      }

      await batch.commit();

      // Send the new user to their dashboard.
      if (role === "student") {
        navigate("/student/dashboard", { replace: true });
      } else {
        navigate("/agency/dashboard", { replace: true });
      }
    } catch (err: unknown) {
      console.error("Registration error:", err);

      const errorCode = (err as { code?: string }).code;

      switch (errorCode) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please sign in.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setError("Please choose a stronger password.");
          break;
        case "permission-denied":
          setError(
            "Your account was created, but the profile could not be saved. Please check your Firestore security rules.",
          );
          break;
        default:
          setError(
            "Registration failed. Please check your information and try again.",
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <Link to="/" className="auth-brand">
          <GraduationCap size={32} />
          <span>KoreaStudy Connect</span>
        </Link>

        <div className="auth-heading">
          <h1>Create Account</h1>
          <p>Join KoreaStudy Connect today.</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label htmlFor="register-role">Account Type</label>
            <select
              id="register-role"
              className="auth-select"
              value={role}
              onChange={(event) => setRole(event.target.value as AccountRole)}
            >
              <option value="student">Student</option>
              <option value="agency">Education Agency</option>
            </select>
          </div>

          <div className="auth-field">
            <label htmlFor="register-name">
              {role === "student" ? "Full Name" : "Contact Person Name"}
            </label>
            <div className="auth-input-wrapper">
              <User size={19} />
              <input
                id="register-name"
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                autoComplete="name"
              />
            </div>
          </div>

          {role === "agency" && (
            <div className="auth-field">
              <label htmlFor="agency-name">Agency Name</label>
              <div className="auth-input-wrapper">
                <Building2 size={19} />
                <input
                  id="agency-name"
                  type="text"
                  placeholder="Enter your agency name"
                  value={agencyName}
                  onChange={(event) => setAgencyName(event.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="register-email">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={19} />
              <input
                id="register-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="register-password">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={19} />
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="auth-input-wrapper">
              <Lock size={19} />
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>

        <Link to="/" className="auth-back-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Register;
