import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import AgencyDetails from "./pages/AgencyDetails/AgencyDetails";
import UniversityDetails from "./pages/UniversityDetails/UniversityDetails";
import Agencies from "./pages/Agencies/Agencies";
import Universities from "./pages/Universities/Universities";

import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminRoute from "./components/AdminRoute/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
