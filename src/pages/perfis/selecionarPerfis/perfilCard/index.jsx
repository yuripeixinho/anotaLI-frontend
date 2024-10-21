import { Avatar, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import avatarGeneric from "../../../../assets/predefinedUsersPictures/genericDesignSystem/avatar-veiaco-card-1.png";

import "./styles.scss";
import { EditOutlined } from "@ant-design/icons";

export default function PerfilCard({ perfil, isEditing }) {
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
            src={avatarGeneric}
            className={isEditing ? "avatar-image editing" : "avatar-image"} // Condiciona o estilo de opacidade baseado no isEditing
            onClick={() => navigate(`/home/perfil-conta/${perfil.id}/produtos`)}
          />
          {isEditing && (
            <EditOutlined
              className="edit-icon"
              onClick={() => handleEditClick(perfil.perfilId)}
            />
          )}
        </div>
        <h2>{perfil.nome}</h2>
      </Flex>
    </>
  );
}
