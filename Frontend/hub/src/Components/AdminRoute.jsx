import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // If not logged in at all, redirect immediately to login page without toast
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin, show toast and redirect to welcome dashboard
  const isAdmin = user?.email === "amanarandiya@gmail.com" || user?.role === "admin";

  if (!isAdmin) {
    toast.error("Access denied. Admin rights required.");
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default AdminRoute;
