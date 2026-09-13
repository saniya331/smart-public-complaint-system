import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComplaintProvider from "./context/ComplaintProvider";
import LanguageProvider from "./context/LanguageContext";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitComplaint from "./pages/citizen/SubmitComplaint";
import MyComplaints from "./pages/citizen/MyComplaints";
import ComplaintDetails from "./pages/citizen/ComplaintDetails";

function App() {
  return (
    <LanguageProvider>
      <ComplaintProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/citizen/dashboard"
              element={<CitizenDashboard />}
            />

            <Route
              path="/citizen/submit"
              element={<SubmitComplaint />}
            />

            <Route
              path="/citizen/complaints"
              element={<MyComplaints />}
            />

            <Route
              path="/citizen/complaints/:id"
              element={<ComplaintDetails />}
            />
          </Routes>
        </BrowserRouter>
      </ComplaintProvider>
    </LanguageProvider>
  );
}

export default App;