import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/conta/2/perfis">Selecionar perfis</Link>
          </li>
          <li>
            <Link to="/home/2/produtos">Home Compartilhada</Link>
          </li>
          <li>
            <Link to="/home/perfil-conta/5/produtos">Minha Home</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

export default Layout;
