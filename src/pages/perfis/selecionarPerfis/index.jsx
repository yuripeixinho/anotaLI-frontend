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

  // const [perfisConta] = useState([
  //   { nome: "Marcelo", perfilId: "1" },
  //   { nome: "Gih", perfilId: "1" },
  //   { nome: "Lucas", perfilId: "1" },
  // ]);
  const [isEditing, setIsEditing] = useState(false); // controla a exibição do ícone de edição

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
  };

  // console.log(perfilConta);

  return (
    <>
      <Row align={"middle"}>
        <Col span={14} className="container-perfis">
          <h1 className="titulo">
            {!isEditing ? "Quem está usando?" : "Gerenciar perfis:"}
          </h1>

          <Row justify={"space-between"} className="select-profile">
            {perfilConta.map((perfil) => (
              <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} key={perfil.id}>
                <PerfilCard perfil={perfil} isEditing={isEditing} />
              </Col>
            ))}

            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              <NovoPerfil isEditing={isEditing} />
            </Col>
          </Row>
        </Col>

        <Col span={24} className="container-gerenciar-perfil">
          <Flex justify="center">
            <button
              onClick={handleManageClick}
              style={{ cursor: "pointer" }}
              className="btn-gerenciar-perfil"
            >
              {!isEditing ? "Gerenciar perfil" : "Concluído"}
            </button>
          </Flex>
        </Col>
      </Row>
    </>
  );
}
