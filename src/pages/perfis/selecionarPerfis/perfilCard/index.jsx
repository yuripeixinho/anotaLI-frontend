import { Avatar, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import avatarGeneric from "../../../../assets/predefinedUsersPictures/genericDesignSystem/avatar-veiaco-card-1.png";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.scss";
import { useAuth } from "../../../../context/anotaLiAuthContext";

export default function PerfilCard({ perfil, isEditing }) {
  const { usuario, setPerfilId } = useAuth();
  let navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate(`/editar-perfil/${id}`);
  };

  return (
    <Flex gap="middle" vertical className="profile-card">
      <div className="avatar-container">
        <Avatar
          size={220}
          src={avatarGeneric}
          className={isEditing ? "avatar-image editing" : "avatar-image"} // Condiciona o estilo de opacidade baseado no isEditing
          onClick={() => {
            setPerfilId(perfil.id); // Armazena o ID do perfil ao clicar
            navigate(`/meus-itens/${usuario.id}/${perfil.id}`);
          }}
        />

        {isEditing && (
          <EditIcon
            className="edit-icon"
            onClick={() => handleEditClick(perfil.id)}
          />
        )}
      </div>

      <h2 className="nome-perfil">{perfil.nome}</h2>
    </Flex>
  );
}
