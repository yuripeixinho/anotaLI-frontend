import { Link, Outlet } from "react-router-dom";

import { Avatar, Badge, Breadcrumb, Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  FieldBinaryOutlined,
  HomeFilled,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProfileFilled,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button } from "antd/es/radio";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useAuth } from "../../../context/anotaLiAuthContext";

function LayoutApp() {
  const { logout, usuario } = useAuth(); // Usa o hook de autenticação para acessar a função login

  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      label: <Link to={`home/${usuario?.id}`}>Home</Link>,
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      label: <Link to="/meus-itens/2">Meus Itens</Link>,
      icon: <FieldBinaryOutlined />,
    },
    {
      key: "3",
      label: <Link to="/perfis">Perfis</Link>,
      icon: <ProfileFilled />,
    },
    {
      key: "4",
      label: <Link to="/feiras">Feira</Link>,
      icon: <UploadOutlined />,
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
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 20,
            height: 20,
          }}
        />
        <Button
          type="text"
          onClick={() => logout()}
          style={{
            fontSize: "16px",
            width: 20,
            height: 20,
          }}
        />
      </Sider>
      <Layout>
        {/* <Header
          style={{
            paddingTop: 20,
            background: "#fff",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Avatar size={45} icon={<UserOutlined />} />
        </Header> */}

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
