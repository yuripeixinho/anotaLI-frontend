import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SelecionarPerfis from "../pages/perfis/selecionarPerfis";
import LayoutApp from "../components/layout/layout/layout";
import ProtectedRoute from "./protectedRoute";
import Login from "../pages/auth/login";
import Cadastro from "../pages/auth/cadastro";
import EditarPerfil from "../pages/perfis/selecionarPerfis/alterar-perfil/editarPerfil";

// Crie suas rotas usando o createBrowserRouter

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />, // Layout vai ser o layout principal de todas as rotas
    children: [
      {
        path: "/home/:contaID/produtos",
        element: <ProtectedRoute>{/* <Home />, */}</ProtectedRoute>,
      },
      {
        path: "/home/perfil-conta/:perfilContaID/produtos",
        element: <ProtectedRoute>{/* <HomeIndividual /> */}</ProtectedRoute>,
      },
      {
        path: "/home/:contaID",
        element: <ProtectedRoute>{/* <Home /> */}</ProtectedRoute>,
      },
      {
        path: "/perfis",
        element: <ProtectedRoute>{/* <Perfil /> */}</ProtectedRoute>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/conta/:id/perfis",
    element: (
      // <ProtectedRoute>
      <SelecionarPerfis />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/perfil-conta/:id/alterar-perfil",
    element: (
      // <ProtectedRoute>
      <SelecionarPerfis />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/editar-perfil/:perfilId",
    element: (
      // <ProtectedRoute>
      <EditarPerfil />
      // </ProtectedRoute>
    ),
  },
]);

export default router;
