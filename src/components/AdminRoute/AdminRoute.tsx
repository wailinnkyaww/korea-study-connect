import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { checkAdmin } from "../../services/adminService";

interface Props {
  children: ReactNode;
}

function AdminRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const isAdmin = await checkAdmin(user.uid);
        setAuthorized(isAdmin);
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="admin-loading">Checking access...</div>;
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export default AdminRoute;
