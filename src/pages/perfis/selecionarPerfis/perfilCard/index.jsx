import { Avatar, Flex, Modal } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import "./styles.scss";
import { useAuth } from "../../../../context/anotaLiAuthContext";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import PerfilContaService from "../../../../services/perfilConta.service";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

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
  const { contaID } = useParams();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [modalDeleteProfileVisible, setModalDeleteProfileVisible] =
    useState(false);

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

  const handleDeleteProfile = async (perfilID) => {
    setLoading(true);
    const _perfilContaService = new PerfilContaService();

    await _perfilContaService
      .deletarPerfilConta(contaID, perfilID)
      .then((res) => {
        setModalDeleteProfileVisible(false);
        updateProfileList({ id: perfilID }, true); // Chama a atualização com o ID do perfil removido
      })
      .catch((err) => {
        console.error("Erro ao excluir perfil:", err);
      })
      .finally(() => {
        setLoading(false);
        setIsEditing(false);
      });
  };

  return (
    <Flex gap="middle" vertical className="profile-card">
      <div className="avatar-container">
        <Avatar
          size={220}
          src={
            perfil?.imagemPerfil?.caminhoImagem ||
            "/assets/imagens/perfis/default/defaultAvatar.png"
          }
          className={isEditing ? "avatar-image editing" : "avatar-image"}
          onClick={() => {
            navigate(`/home/${usuario.id}`);
            setPerfilId(perfil.id);
          }}
        />

        {isEditing && (
          <EditIcon
            className="edit-icon"
            onClick={() => handleEditClick(perfil.id, perfil.nome)}
          />
        )}

        {isEditing && (
          <Delete
            className="delete-icon"
            onClick={() => {
              setModalDeleteProfileVisible(true);
            }}
          />
        )}
      </div>

      {isEditing ? (
        <Formik
          initialValues={{
            nome: perfil.nome,
            imagemPerfilID: perfil.imagemPerfilID,
          }}
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

      <Modal
        title="Confirmar Exclusão"
        visible={modalDeleteProfileVisible}
        onOk={() => handleDeleteProfile(perfil.id)} // Passe o perfil.id aqui
        onCancel={() => setModalDeleteProfileVisible(false)}
        confirmLoading={loading}
        okText="Excluir"
        cancelText="Cancelar"
        centered
      >
        <p>Você tem certeza que deseja excluir este perfil?</p>
      </Modal>
    </Flex>
  );
}
