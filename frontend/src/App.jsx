import { BrowserRouter, Routes, Route } from "react-router-dom";
import ComplaintProvider from "./context/ComplaintProvider";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import SubmitComplaint from "./pages/citizen/SubmitComplaint";

function App() {
  return (
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
        </Routes>
      </BrowserRouter>
    </ComplaintProvider>
  );
}

export default App;