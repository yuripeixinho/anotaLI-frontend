// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Novo estado de carregamento
  const [perfilId, setPerfilId] = useState(null); // Novo estado para armazenar o ID do perfil

  // Carrega o usuário e o token do localStorage ao iniciar
  useEffect(() => {
    const usuarioStorage = localStorage.getItem("usuario");
    const tokenStorage = localStorage.getItem("token");
    const perfilIdStorage = localStorage.getItem("perfilId"); // Carrega o perfilId

    if (usuarioStorage && tokenStorage) {
      setUsuario(JSON.parse(usuarioStorage));
    }

    if (perfilIdStorage) {
      setPerfilId(perfilIdStorage); // Armazena o perfilId se existir
    }

    setLoading(false);
  }, []);

  const login = (token, usuarioData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuarioData)); // Armazena no localStorage
    setUsuario(usuarioData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("perfilId"); // Limpa o perfilId ao sair
    setUsuario(null);
    setPerfilId(null); // Limpa o perfilId ao sair
  };

  const handleSetPerfilId = (id) => {
    localStorage.setItem("perfilId", id); // Armazena o perfilId no localStorage
    setPerfilId(id);
  };

  const isAuthenticated = !!usuario; // Verifica se há um usuário autenticado

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        isAuthenticated,
        loading,
        login,
        logout,
        perfilId,
        setPerfilId: handleSetPerfilId, // Use a nova função para armazenar o perfilId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
