// src/components/AvatarDropdown.js
import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../../context/anotaLiAuthContext";
import { useNavigate } from "react-router-dom";
import { Logout, SwitchAccount } from "@mui/icons-material";

const AvatarDropdown = () => {
  const { logout, usuario } = useAuth();

  var navigate = useNavigate();

  const handleMenuClick = (e) => {
    if (e.key === "logout") {
      logout(); // Chama a função de logout ao clicar em "Sair"
    }
    if (e.key === "trocar-perfil") {
      navigate(`/${usuario?.id}/perfis`);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="trocar-perfil" icon={<SwitchAccount />}>
        Trocar perfil
      </Menu.Item>
      <Menu.Item key="logout" icon={<Logout />}>
        Sair
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
        <Avatar size={40} icon={<UserOutlined />} />
        <span style={{ marginRight: 8 }}></span>

        <CaretDownOutlined />
      </div>
    </Dropdown>
  );
};

export default AvatarDropdown;
