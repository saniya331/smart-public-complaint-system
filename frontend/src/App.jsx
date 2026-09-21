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
import TrackComplaint from "./pages/citizen/TrackComplaint";
import Notifications from "./pages/citizen/Notifications";
import Feedback from "./pages/citizen/Feedback";
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import AssignedComplaints from "./pages/officer/AssignedComplaints";
import OfficerComplaintDetails from "./pages/officer/OfficerComplaintDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageOfficers from "./pages/admin/ManageOfficers";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageDistricts from "./pages/admin/ManageDistricts";
import ManageMandals from "./pages/admin/ManageMandals";
import ManageCategories from "./pages/admin/ManageCategories";

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

            <Route
              path="/citizen/track/:id"
              element={<TrackComplaint />}
            />

            <Route
              path="/citizen/notifications"
              element={<Notifications />}
            />

            <Route
              path="/citizen/feedback/:id"
              element={<Feedback />}
            />
            <Route
  path="/officer/dashboard"
  element={<OfficerDashboard />}
/>

<Route
  path="/officer/complaints"
  element={<AssignedComplaints />}
/>

<Route
  path="/officer/complaints/:id"
  element={<OfficerComplaintDetails />}
/>
<Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

<Route
  path="/admin/users"
  element={<ManageUsers />}
/>

<Route
  path="/admin/officers"
  element={<ManageOfficers />}
/>

<Route
  path="/admin/departments"
  element={<ManageDepartments />}
/>
<Route
  path="/admin/districts"
  element={<ManageDistricts />}
/>

<Route
  path="/admin/mandals"
  element={<ManageMandals />}
/>

<Route
  path="/admin/categories"
  element={<ManageCategories />}
/>
          </Routes>
        </BrowserRouter>
      </ComplaintProvider>
    </LanguageProvider>
  );
}

export default App;