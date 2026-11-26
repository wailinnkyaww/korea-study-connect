import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, type UserRole } from "../../context/AuthContext";
import "./ProtectedRoute.css";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Wait for Firebase to restore the authentication session.
  if (loading) {
    return (
      <div className="protected-loading">
        <div className="protected-spinner" />
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Guest users must log in.
  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Redirect users who don't have the required role.
  if (!allowedRoles.includes(currentUser.role)) {
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

export default ProtectedRoute;
