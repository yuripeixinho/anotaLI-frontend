import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/anotaLiAuthContext";

const ProtectedRoute = ({ children, publicRoute = false }) => {
  const { isAuthenticated, loading, usuario } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (publicRoute && isAuthenticated) {
    return <Navigate to={`/home/${usuario?.id}`} />;
  }

  if (!publicRoute && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
