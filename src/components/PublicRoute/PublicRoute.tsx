import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../ProtectedRoute/ProtectedRoute.css";

const PublicRoute = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="protected-loading">
        <div className="protected-spinner" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (currentUser) {
    switch (currentUser.role) {
      case "student":
        return <Navigate to="/student/dashboard" replace />;

      case "agency":
        return <Navigate to="/agency/dashboard" replace />;

      case "admin":
        return <Navigate to="/admin/dashboard" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
