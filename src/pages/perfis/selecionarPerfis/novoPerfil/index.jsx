import { Avatar, Flex } from "antd";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

export default function NovoPerfil({ isEditing }) {
  let navigate = useNavigate();

  const handleEditClick = (perfilId) => {
    // Redireciona para a página de edição do perfil com o perfilId
    navigate(`/editar-perfil/${perfilId}`);
  };

  return (
    <>
      <Flex gap="middle" vertical className="profile-card">
        <div className="avatar-container">
          <Avatar
            size={250}
            icon={
              <PlusOutlined
                className="new-profile"
                // onClick={() => handleEditClick(perfil.perfilId)}
              />
            }
            className={"icon-novo-perfil"}
          />
        </div>
        <h2>Adicionar Perfil</h2>
      </Flex>
    </>
  );
}
