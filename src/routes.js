import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/layout';
import SelecionarPerfis from './pages/selecionarPerfis';

// Crie suas rotas usando o createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout vai ser o layout principal de todas as rotas
    children: [
      {
        path: "/perfis/:id/conta",
        element: <SelecionarPerfis/>, // Rota para página Home
      },
      {
        path: "/contas/:perfilContaID/produtos",
        element: <SelecionarPerfis/>, // Rota para página Home
      },
    ],
  },
]);

export default router;
