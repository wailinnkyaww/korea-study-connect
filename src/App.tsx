import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import AgencyDetails from "./pages/AgencyDetails/AgencyDetails";
import UniversityDetails from "./pages/UniversityDetails/UniversityDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Agency details */}
        <Route path="/agencies/:id" element={<AgencyDetails />} />

        {/* University details */}
        <Route path="/universities/:id" element={<UniversityDetails />} />

        {/* Not found */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "100px 20px" }}>
              <h1>404 - Page Not Found</h1>
              <a href="/" style={{ color: "#6955e8" }}>
                Return Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
