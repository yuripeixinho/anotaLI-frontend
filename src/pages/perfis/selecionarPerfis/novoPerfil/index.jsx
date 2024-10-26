import { Avatar, Flex } from "antd";

import "./styles.scss";
import { PlusOutlined } from "@ant-design/icons";

export default function NovoPerfil({ isEditing }) {
  return (
    <>
      <Flex gap="middle" vertical className="profile-card">
        <div className="avatar-container-novo">
          <Avatar
            size={220}
            icon={
              <PlusOutlined
                className="new-profile"
                // onClick={() => handleEditClick(perfil.perfilId)}
              />
            }
            style={{ width: "200px", height: "204px" }}
            className={"icon-novo-perfil"}
          />
        </div>
        <h2 className="nome-perfil">Novo</h2>
      </Flex>
    </>
  );
}
