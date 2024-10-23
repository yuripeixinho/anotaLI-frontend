import { createBrowserRouter } from "react-router-dom";
import SelecionarPerfis from "../pages/perfis/selecionarPerfis";
import LayoutApp from "../components/layout/layout/layout";
import ProtectedRoute from "./protectedRoute";
import Login from "../pages/auth/login";
import Cadastro from "../pages/auth/cadastro";
import EditarPerfil from "../pages/perfis/selecionarPerfis/alterar-perfil/editarPerfil";
import Home from "../pages/home";

// Crie suas rotas usando o createBrowserRouter

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />, // Layout vai ser o layout principal de todas as rotas
    children: [
      {
        path: "/home/:contaID",
        element: <ProtectedRoute>{<Home />}</ProtectedRoute>,
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
    element: (
      <ProtectedRoute publicRoute>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cadastro",
    element: (
      <ProtectedRoute publicRoute>
        <Cadastro />
      </ProtectedRoute>
    ),
  },
  {
    path: "/:contaID/perfis",
    element: (
      <ProtectedRoute>
        <SelecionarPerfis />
      </ProtectedRoute>
    ),
  },
  {
    path: "/perfil-conta/:contaID/alterar-perfil",
    element: (
      <ProtectedRoute>
        <SelecionarPerfis />
      </ProtectedRoute>
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
