import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error || !sessionData.session) {
        setIsAuthenticated(false);
        sessionStorage.removeItem("token");

        return;
      }

      const userRole = sessionData.session.user.user_metadata?.role || null;
      setRole(userRole);
      setIsAuthenticated(true);
    };
    checkSession()
  }, []);

  if (!isAuthenticated) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/admin-panel/admin-login" />;
  }
  if (role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
