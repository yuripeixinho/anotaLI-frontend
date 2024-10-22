// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  debugger;
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Novo estado de carregamento

  // Carrega o usuário e o token do localStorage ao iniciar
  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    const tokenStorage = localStorage.getItem("token");

    if (usuarioStorage && tokenStorage) {
      setUsuario(JSON.parse(usuarioStorage));
    }

    setLoading(false); 
  }, []);

  const login = (token, usuarioData) => {
    debugger;
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuarioData)); // Armazena no localStorage

    setUsuario(usuarioData)
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  const isAuthenticated = !!usuario; // Verifica se há um usuário autenticado

  return (
    <AuthContext.Provider
      value={{ usuario, setUsuario, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
