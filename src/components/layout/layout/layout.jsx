import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";

import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect } from "react";
import { useAuth } from "../../../context/anotaLiAuthContext";
import AvatarDropdown from "../avatarDropdown";
import anotaLogo from "../../../assets/logo/LogoAnota.png";
import { CalendarMonthOutlined, KitchenOutlined } from "@mui/icons-material";

function LayoutApp() {
  const { usuario, perfilId, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (isAuthenticated) {
        navigate(`/home/${usuario?.id}`);
      } else {
        navigate("/login");
      }
    }
  }, [location.pathname, isAuthenticated, usuario?.id, navigate]);

  const items = [
    {
      key: "0",
      label: <Link to={`home/${usuario?.id}`}>Home</Link>,
      icon: <CalendarMonthOutlined />,
    },
    {
      key: "1",
      label: (
        <Link to={`meus-itens/${usuario?.id}/${perfilId}`}>Meus Itens</Link>
      ),
      icon: <KitchenOutlined />,
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible={false}
        collapsed={true}
        style={{ backgroundColor: "#F6F7F9" }}
        width={280}
      >
        <div
          style={{
            fontSize: "16px",
            width: "100%",
            height: 64,
            padding: "40px 8px 50px 8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={anotaLogo} alt="Logo do aplicativo Anota" width={37} />
        </div>

        <Menu
          mode="inline"
          style={{ backgroundColor: "#F6F7F9" }}
          defaultSelectedKeys={["0"]}
          items={items}
        />
      </Sider>
      <Layout>
        <div className="profile-dropdown">
          <AvatarDropdown />
        </div>

        <Content
          style={{
            margin: "0px 35px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutApp;
