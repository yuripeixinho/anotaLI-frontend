// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/anotaLiAuthContext";

const ProtectedRoute = ({ children, publicRoute = false }) => {
  debugger;
  const { isAuthenticated, loading, usuario } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Ou um componente de carregamento mais estilizado
  }

  if (publicRoute && isAuthenticated) {
    return <Navigate to={`/home/${usuario?.id}`} />; // Redireciona para a página inicial
  }

  if (!publicRoute && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
