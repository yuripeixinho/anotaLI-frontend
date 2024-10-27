import { Avatar, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import avatarGeneric from "../../../../assets/predefinedUsersPictures/genericDesignSystem/avatar-veiaco-card-1.png";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.scss";
import { EditOutlined } from "@ant-design/icons";
import { useAuth } from "../../../../context/anotaLiAuthContext";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import PerfilContaService from "../../../../services/perfilConta.service";

const ProfileSchema = Yup.object().shape({
  nome: Yup.string().max(25).required("O nome é obrigatório"),
});

export default function PerfilCard({
  perfil,
  isEditing,
  updateProfileList,
  setIsEditing,
}) {
  const { usuario, setPerfilId } = useAuth();
  let navigate = useNavigate();

  const handleEditClick = (id, nome) => {
    navigate(`/editar-perfil/${id}?nome=${encodeURIComponent(nome)}`);
  };

  const handleBlur = async (values) => {
    const _perfilContaService = new PerfilContaService();

    if (perfil.novoPerfil) {
      try {
        values.parentId = usuario.id;
        const res = await _perfilContaService.createSub(values);
        updateProfileList(res);
        setIsEditing(false);
      } catch (err) {
        const message =
          err?.response?.data?.Message ||
          "Credenciais inválidas. Tente novamente";
        console.error(message);
      }
    } else {
      try {
        const res = await _perfilContaService.atualizarPerfilConta(
          values,
          usuario.id,
          perfil.id
        );
        updateProfileList(res);
      } catch (err) {
        const message =
          err?.response?.data?.Message ||
          "Credenciais inválidas. Tente novamente";
        console.error(message);
      }
    }
  };

  return (
    <Flex gap="middle" vertical className="profile-card">
      <div className="avatar-container">
        <Avatar
          size={220}
          src={avatarGeneric}
          className={isEditing ? "avatar-image editing" : "avatar-image"}
          onClick={() => {
            setPerfilId(perfil.id);
            navigate(`/meus-itens/${usuario.id}/${perfil.id}`);
          }}
        />
        {isEditing && (
          <EditIcon
            className="edit-icon"
            onClick={() => handleEditClick(perfil.id, perfil.nome)}
          />
        )}
      </div>

      {isEditing ? (
        <Formik
          initialValues={{ nome: perfil.nome }}
          validationSchema={ProfileSchema}
          onSubmit={() => {}}
        >
          {({ values, errors, touched }) => (
            <Field
              name="nome"
              placeholder="Digite o novo nome"
              className="nome-perfil-input editable-h2"
              onBlur={() => {
                if (values.nome !== perfil.nome) {
                  handleBlur(values);
                }
              }}
              autoFocus
              maxLength={25}
            />
          )}
        </Formik>
      ) : (
        <h2 className="nome-perfil">{perfil.nome}</h2>
      )}
    </Flex>
  );
}
