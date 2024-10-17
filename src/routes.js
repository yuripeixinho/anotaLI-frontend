import { createBrowserRouter } from 'react-router-dom';
import HomeIndividual from './pages/perfis/individual';
import LayoutApp from './components/layout/layout/layout';
import Home from './pages/home';
import Perfil from './pages/perfis';

// Crie suas rotas usando o createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    children: [
      {
        path: "/home",
        element: <Home/>, 
      },
      {
        path: "/perfis",
        element: <Perfil/>, 
      },
      {
        path: "/home/perfil-conta/:perfilContaID/produtos",
        element: <HomeIndividual/>, 
      },
    ],
  },
]);

export default router;
