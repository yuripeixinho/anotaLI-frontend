import { createBrowserRouter } from 'react-router-dom';
import About from './pages/about';
import Contact from './pages/contact';
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
        path: '/about',
        element: <About />, // Rota para página About
      },
      {
        path: '/contact',
        element: <Contact />, // Rota para página Contact
      },
    ],
  },
]);

export default router;
