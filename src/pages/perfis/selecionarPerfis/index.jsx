import { Col, Flex, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfilCard from "./perfilCard";
import "./styles.scss";
import NovoPerfil from "./novoPerfil";
import PerfilContaService from "../../../services/perfilConta.service";

export default function SelecionarPerfis() {
  const { contaID } = useParams();
  const [perfilConta, setPerfilConta] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const _perfisContaService = new PerfilContaService();

    async function init() {
      const responsePerfilContaService = await _perfisContaService.listSub(
        contaID
      );
      setPerfilConta(responsePerfilContaService);
    }

    init();
  }, [contaID]);

  const handleManageClick = () => {
    setIsEditing(!isEditing); // Alterna o estado de edição

    if (isEditing) {
      const updatedPerfis = perfilConta.filter((item) => !(item.nome === ""));
      setPerfilConta(updatedPerfis); // Atualiza o estado com a nova lista filtrada
    }
  };

  // Função para adicionar novo perfil
  const handleAddNewProfile = () => {
    const newProfile = {
      id: Date.now(), // ID temporário
      nome: "", // Nome em branco para edição
      novoPerfil: true,
      // Adicione outros campos necessários aqui, como 'email', 'foto', etc.
    };
    setPerfilConta([...perfilConta, newProfile]);
    setIsEditing(true); // Ativa o modo de edição
  };

  const updateProfileList = (updatedProfile, isRemoved = false) => {
    setPerfilConta((prev) => {
      // Remove perfis temporários que estão sendo criados
      const filteredProfiles = prev.filter(
        (perfil) => !(perfil.novoPerfil && perfil.nome === "")
      );

      if (isRemoved) {
        // Filtra o perfil removido da lista
        return filteredProfiles.filter(
          (perfil) => perfil.id !== updatedProfile.id
        );
      }

      // Verifica se o perfil atualizado já existe na lista
      const existingProfileIndex = filteredProfiles.findIndex(
        (p) => p.id === updatedProfile.id
      );

      if (existingProfileIndex >= 0) {
        // Se o perfil já existir, atualiza-o
        const newPerfis = [...filteredProfiles];
        newPerfis[existingProfileIndex] = updatedProfile;
        return newPerfis;
      } else {
        // Caso contrário, adiciona o novo perfil
        return [...filteredProfiles, updatedProfile];
      }
    });
  };
  return (
    <>
      <Row>
        <Col span={24}>
          <Flex justify="right" style={{ padding: "20px" }}>
            <button
              onClick={handleManageClick}
              style={{ cursor: "pointer" }}
              className="btn-gerenciar-perfil"
            >
              {!isEditing ? "Gerenciar perfil" : "Concluir"}
            </button>
          </Flex>
        </Col>
      </Row>

      <Row align={"middle"} className="row-selecionar-perfil">
        <Col className="container-perfis" style={{ width: "100%" }}>
          <h1 className="titulo">
            {perfilConta.length === 0
              ? "Não existe nenhum perfil criado"
              : !isEditing
              ? "Quem está usando?"
              : "Gerenciando perfis"}
          </h1>
        </Col>

        <Col justify="center" style={{ width: "100%" }}>
          <Row justify={"center"} className="select-profile">
            {perfilConta.map((perfil) => (
              <Col xs={24} sm={9} md={8} lg={6} xl={5} xxl={4} key={perfil.id}>
                <PerfilCard
                  perfil={perfil}
                  isEditing={isEditing}
                  updateProfileList={updateProfileList}
                  setIsEditing={setIsEditing}
                />
              </Col>
            ))}

            <Col xs={24} sm={9} md={8} lg={6} xl={5} xxl={4}>
              <NovoPerfil
                isEditing={isEditing}
                onAddNewProfile={handleAddNewProfile}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
