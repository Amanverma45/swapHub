import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isAdmin = token && (user?.email === "amanarandiya@gmail.com" || user?.role === "admin");

  if (!isAdmin) {
    toast.error("Access denied. Admin rights required.");
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default AdminRoute;
