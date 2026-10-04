import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // User is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // User has the wrong role
  if (allowedRole && role !== allowedRole) {
    if (role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === "OFFICER") {
      return <Navigate to="/officer/dashboard" replace />;
    }

    return <Navigate to="/citizen/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;