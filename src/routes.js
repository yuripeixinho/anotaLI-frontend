import { createBrowserRouter } from 'react-router-dom';
import SelecionarPerfis from './pages/selecionarPerfis';
import HomeCompartilhada from './pages/home/compartilhada';
import HomeIndividual from './pages/home/individual';
import LayoutApp from './components/layout/layout/layout';

// Crie suas rotas usando o createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />, // Layout vai ser o layout principal de todas as rotas
    children: [
      {
        path: "/conta/:id/perfis",
        element: <SelecionarPerfis/>, 
      },
      {
        path: "/home/:contaID/produtos",
        element: <HomeCompartilhada/>, 
      },
      {
        path: "/home/perfil-conta/:perfilContaID/produtos",
        element: <HomeIndividual/>, 
      },
    ],
  },
]);

export default router;
