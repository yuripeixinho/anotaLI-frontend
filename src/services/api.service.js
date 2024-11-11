import axios from "axios";
import { performLogout } from "../pages/auth/logout";

const api = axios.create({
  baseURL: "https://localhost:44353/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona um interceptor para adicionar o token nos cabeçalhos
api.interceptors.request.use(
  (config) => {
    const usuarioStorage = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (usuarioStorage) {
      const usuario = JSON.parse(usuarioStorage);

      if (usuario && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        performLogout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
