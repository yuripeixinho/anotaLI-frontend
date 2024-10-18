import { createBrowserRouter } from "react-router-dom";
import SelecionarPerfis from "../pages/selecionarPerfis";
import HomeCompartilhada from "../pages/home/compartilhada";
import HomeIndividual from "../pages/home/individual";
import LayoutApp from "../components/layout/layout/layout";
import ProtectedRoute from "./protectedRoute";
import Login from "../pages/auth/login";

// Crie suas rotas usando o createBrowserRouter

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />, // Layout vai ser o layout principal de todas as rotas
    children: [
      {
        path: "/conta/:id/perfis",
        element: (
          <ProtectedRoute>
            <SelecionarPerfis />
          </ProtectedRoute>
        ),
      },
      {
        path: "/home/:contaID/produtos",
        element: (
          <ProtectedRoute>
            <HomeCompartilhada />,
          </ProtectedRoute>
        ),
      },
      {
        path: "/home/perfil-conta/:perfilContaID/produtos",
        element: (
          <ProtectedRoute>
            <HomeIndividual />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
