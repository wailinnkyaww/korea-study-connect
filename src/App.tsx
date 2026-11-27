import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";

import AgencyDetails from "./pages/AgencyDetails/AgencyDetails";
import Agencies from "./pages/Agencies/Agencies";
import AgencyUniversities from "./pages/Dashboard/AgencyUniversities";
import AgencyStudents from "./pages/Dashboard/AgencyStudents";
import AgencyApplications from "./pages/Dashboard/AgencyApplications";
import AgencyProfile from "./pages/Dashboard/AgencyProfile";
import AgencySettings from "./pages/Dashboard/AgencySettings";

import Universities from "./pages/Universities/Universities";
import UniversityDetails from "./pages/UniversityDetails/UniversityDetails";

import StudentApplications from "./pages/Dashboard/StudentApplications";
import StudentSavedUniversities from "./pages/Dashboard/StudentSavedUniversities";
import StudentProfile from "./pages/Dashboard/StudentProfile";
import StudentSettings from "./pages/Dashboard/StudentSettings";

import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";

// Dashboard
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import AgencyDashboard from "./pages/Dashboard/AgencyDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/agencies" element={<Agencies />} />
        <Route path="/agencies/:id" element={<AgencyDetails />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetails />} />
        {/* Authentication pages */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>
        {/* Admin protected page */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>
        {/* Student protected pages */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<DashboardLayout role="student" />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="applications" element={<StudentApplications />} />
            <Route path="saved" element={<StudentSavedUniversities />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>
        </Route>
        {/* Agency protected pages */}
        <Route element={<ProtectedRoute allowedRoles={["agency"]} />}>
          <Route path="/agency" element={<DashboardLayout role="agency" />}>
            <Route path="dashboard" element={<AgencyDashboard />} />
            <Route path="universities" element={<AgencyUniversities />} />
            <Route path="students" element={<AgencyStudents />} />
            <Route path="applications" element={<AgencyApplications />} />
            <Route path="profile" element={<AgencyProfile />} />
            <Route path="settings" element={<AgencySettings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
