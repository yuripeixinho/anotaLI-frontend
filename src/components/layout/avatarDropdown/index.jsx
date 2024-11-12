import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/anotaLiAuthContext";
import { useNavigate } from "react-router-dom";
import { Logout, SwitchAccount } from "@mui/icons-material";
import PerfilContaService from "../../../services/perfilConta.service";

const AvatarDropdown = () => {
  const { logout, usuario, perfilId, setPerfilConta } = useAuth();
  const [perfilContaAvatar, setPerfilContaAvatar] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const _perfilContaService = new PerfilContaService();

    async function init() {
      const responsePerfilConta = await _perfilContaService.read(perfilId);
      setPerfilConta(responsePerfilConta);
      setPerfilContaAvatar(responsePerfilConta);
    }

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Avatar
          size={40}
          src={
            perfilContaAvatar?.imagemPerfil?.caminhoImagem ||
            "/assets/imagens/perfis/default/defaultAvatar.png"
          }
        />
        <span style={{ marginRight: 8 }}></span>

        <CaretDownOutlined />
      </div>
    </Dropdown>
  );
};

export default AvatarDropdown;
