import { createBrowserRouter } from "react-router-dom";
import SelecionarPerfis from "../pages/perfis/selecionarPerfis";
import LayoutApp from "../components/layout/layout/layout";
import ProtectedRoute from "./protectedRoute";
import Login from "../pages/auth/login";
import Cadastro from "../pages/auth/cadastro";
import EditarPerfil from "../pages/perfis/selecionarPerfis/alterar-perfil/editarPerfil";
import Home from "../pages/home";
import Feiras from "../pages/home/feiras";
import OutrosPerfis from "../pages/perfis/outrosPerfis";
import Perfis from "../pages/perfis";
import MeuPerfil from "../pages/perfis/individual";

// Crie suas rotas usando o createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LayoutApp />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/home/:contaID",
        element: <Home />,
      },
      {
        path: "/perfis/:contaID/:perfilContaID",
        element: <OutrosPerfis />,
      },
      {
        path: "/home/:contaID/:feiraID",
        element: <Feiras />,
      },
      {
        path: "/meus-itens/:contaID/:perfilContaID",
        element: <MeuPerfil />,
      },
      {
        path: "/perfis/:contaID",
        element: <Perfis />,
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
    element: <SelecionarPerfis />,
  },
  {
    path: "/perfil-conta/:contaID/alterar-perfil",
    element: <SelecionarPerfis />,
  },
  {
    path: "/editar-perfil/:perfilId",
    element: <EditarPerfil />,
  },
]);

export default router;
