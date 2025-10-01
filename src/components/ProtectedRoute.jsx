import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("adminToken");

  // Agar token hi nahi hai to Admin Login page pe redirect karo
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Agar token hai to nested routes allow karo
  return <Outlet />;
};

export default ProtectedRoute;
