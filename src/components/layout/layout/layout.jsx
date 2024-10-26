import { Link, Outlet } from "react-router-dom";

import { Layout, Menu } from "antd";
import {
  FieldBinaryOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useAuth } from "../../../context/anotaLiAuthContext";
import AvatarDropdown from "../avatarDropdown";

function LayoutApp() {
  const { usuario, perfilId } = useAuth();

  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "2",
      label: <Link to={`home/${usuario?.id}`}>Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "1",
      label: (
        <Link to={`meus-itens/${usuario?.id}/${perfilId}`}>Meus Itens</Link>
      ),
      icon: <FieldBinaryOutlined />,
    },
    {
      key: "3",
      label: <Link to="/perfis">Perfis</Link>,
      icon: <ProfileFilled />,
    },
  ];

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
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
          <span
            style={{
              fontSize: "20px",
            }}
          >
            AnotaLI
          </span>
        </div>

        <Menu
          mode="inline"
          style={{ backgroundColor: "#F6F7F9" }}
          defaultSelectedKeys={["1"]}
          items={items}
        />

        {/* Ícone para abrir/fechar colocado aqui, na parte inferior */}
        <div style={{ position: "absolute", bottom: 20, left: 10 }}>
          {collapsed ? (
            <MenuUnfoldOutlined
              onClick={() => setCollapsed(false)}
              style={{
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => setCollapsed(true)}
              style={{
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          )}
        </div>
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
