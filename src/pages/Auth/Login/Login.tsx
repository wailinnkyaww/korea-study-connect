import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Eye, EyeOff, GraduationCap, Lock, Mail } from "lucide-react";

import { auth, db } from "../../../config/firebase";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      const userRef = doc(db, "users", credential.user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        await signOut(auth);
        throw new Error(
          "Your user profile was not found. Please contact the administrator.",
        );
      }

      const userData = userSnapshot.data();
      const role = userData.role;

      if (!["student", "agency", "admin"].includes(role)) {
        await signOut(auth);
        throw new Error("Your account has an invalid user role.");
      }

      if (role === "student") {
        navigate("/student/dashboard", { replace: true });
      } else if (role === "agency") {
        navigate("/agency/dashboard", { replace: true });
      } else {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err: unknown) {
      console.error("Login error:", err);

      if (err instanceof Error && err.message.includes("profile")) {
        setError(err.message);
      } else if (
        err instanceof Error &&
        err.message.includes("invalid user role")
      ) {
        setError(err.message);
      } else {
        const errorCode = (err as { code?: string }).code;

        switch (errorCode) {
          case "auth/invalid-credential":
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("Incorrect email or password.");
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;
          case "auth/too-many-requests":
            setError("Too many attempts. Please try again later.");
            break;
          case "permission-denied":
            setError("You do not have permission to access your profile.");
            break;
          default:
            setError("Login failed. Please try again.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-brand">
          <GraduationCap size={32} />
          <span>KoreaStudy Connect</span>
        </Link>

        <div className="auth-heading">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label htmlFor="login-email">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={19} />
              <input
                id="login-email"
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
            <label htmlFor="login-password">Password</label>
            <div className="auth-input-wrapper">
              <Lock size={19} />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
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

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>

        <Link to="/" className="auth-back-home">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Login;
