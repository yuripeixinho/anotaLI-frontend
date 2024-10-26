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
      <Row>
        <Col span={24}>
          <Flex justify="right" style={{ padding: "20px" }}>
            <button
              onClick={handleManageClick}
              style={{ cursor: "pointer" }}
              className="btn-gerenciar-perfil"
            >
              {!isEditing ? "Gerenciar perfil" : "Cancelar"}
            </button>
          </Flex>
        </Col>
      </Row>
      <Row align={"middle"} className="row-selecionar-perfil">
        <Col className="container-perfis" style={{ width: "100%" }}>
          <h1 className="titulo">
            {!isEditing ? "Quem está usando?" : "Gerenciando perfis"}
          </h1>
        </Col>

        <Col justify="center" style={{ width: "100%" }}>
          <Row justify={"center"} className="select-profile">
            {perfilConta.map((perfil) => (
              <Col xs={24} sm={9} md={8} lg={6} xl={5} xxl={4} key={perfil.id}>
                <PerfilCard perfil={perfil} isEditing={isEditing} />
              </Col>
            ))}

            <Col xs={24} sm={9} md={8} lg={6} xl={5} xxl={4}>
              <NovoPerfil isEditing={isEditing} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
