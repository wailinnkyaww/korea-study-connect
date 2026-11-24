import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import AgencyDetails from "./pages/AgencyDetails/AgencyDetails";
import UniversityDetails from "./pages/UniversityDetails/UniversityDetails";
import Agencies from "./pages/Agencies/Agencies";
import Universities from "./pages/Universities/Universities";
import StudentApplications from "./pages/Dashboard/StudentApplications";
import StudentSavedUniversities from "./pages/Dashboard/StudentSavedUniversities";
import StudentProfile from "./pages/Dashboard/StudentProfile";
import StudentSettings from "./pages/Dashboard/StudentSettings";

import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminRoute from "./components/AdminRoute/AdminRoute";

// Dashboard
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import AgencyDashboard from "./pages/Dashboard/AgencyDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />

        <Route path="/agencies" element={<Agencies />} />
        <Route path="/agencies/:id" element={<AgencyDetails />} />

        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetails />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        {/* Student dashboard */}
        <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="saved" element={<StudentSavedUniversities />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>

        {/* Agency dashboard */}
        <Route path="/agency" element={<DashboardLayout role="agency" />}>
          <Route path="dashboard" element={<AgencyDashboard />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
              <h1>404 - Page Not Found</h1>
              <a href="/">Return Home</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
