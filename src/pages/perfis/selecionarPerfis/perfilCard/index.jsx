import { Avatar, Flex } from "antd";
import DefaultRenderEmpty from "antd/es/config-provider/defaultRenderEmpty";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

export default function PerfilCard({ perfil }) {
  let navigate = useNavigate();

  return (
    <Flex gap="middle" vertical className="profile-card">
      <Avatar
        size={250}
        // icon={<avata />}
        onClick={() => navigate("/home/perfil-conta/${perfil.id}/produtos")}
      />

      <h2>{perfil.nome}</h2>
    </Flex>
  );
}
