import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Allow access to the dashboard if it's a demo view
  const isDemoView = window.location.pathname === "/dashboard" && !isAuthenticated;

  return isAuthenticated || isDemoView ? children : <Navigate to="/login" />;
};

export default ProtectedRoute; 