import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail } from "lucide-react";
import { adminLogin } from "../../../services/adminService";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await adminLogin(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to log in.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="admin-login-icon">
          <LockKeyhole size={28} />
        </div>

        <h1>Admin Login</h1>
        <p>Sign in to manage Korea Study Connect.</p>

        {error && <div className="admin-error">{error}</div>}

        <label htmlFor="admin-email">Email Address</label>
        <div className="admin-input">
          <Mail size={18} />
          <input
            id="admin-email"
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label htmlFor="admin-password">Password</label>
        <div className="admin-input">
          <LockKeyhole size={18} />
          <input
            id="admin-password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <a href="/">Back to Website</a>
      </form>
    </main>
  );
}

export default AdminLogin;
