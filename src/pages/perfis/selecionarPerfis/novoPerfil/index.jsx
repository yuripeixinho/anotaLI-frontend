import { Avatar, Flex } from "antd";
import "./styles.scss";
import { PlusOutlined } from "@ant-design/icons";

export default function NovoPerfil({ isEditing, onAddNewProfile }) {
  return (
    <Flex
      gap="middle"
      vertical
      className="profile-card"
      onClick={onAddNewProfile}
      style={{ cursor: "pointer" }}
    >
      <div className="avatar-container-novo">
        <Avatar
          size={220}
          icon={<PlusOutlined className="new-profile" />}
          style={{ width: "200px", height: "204px" }}
          className="icon-novo-perfil"
        />
      </div>
      <h2 className="nome-perfil">Novo</h2>
    </Flex>
  );
}
