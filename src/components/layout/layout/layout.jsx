import { Link, Outlet } from "react-router-dom";

import { Avatar, Breadcrumb, Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
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

const items = [
  { key: "1", label: <Link to="/home">Home</Link>, icon: <HomeOutlined /> },
  {
    key: "2",
    label: <Link to="/perfis">Perfis</Link>,
    icon: <ProfileFilled />,
  },
  {
    key: "3",
    label: <Link to="/feiras">Feira</Link>,
    icon: <UploadOutlined />,
  },
];

function LayoutApp() {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

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
