import { Col, Flex, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfilCard from "./perfilCard";
import "./styles.scss";
import Title from "antd/es/typography/Title";
import NovoPerfil from "./novoPerfil";

export default function SelecionarPerfis() {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [perfisConta] = useState([
    { nome: "Marcelo", perfilId: "1" },
    { nome: "Gih", perfilId: "1" },
    { nome: "Lucas", perfilId: "1" },
  ]);
  const [isEditing, setIsEditing] = useState(false); // controla a exibição do ícone de edição

  useEffect(() => {
    // const _perfisContaService = new PerfilContaService();

    async function init() {
      // const responsePerfilContaService = await _perfisContaService.listSub(id);
      // setPerfisConta(responsePerfilContaService);
    }

    init();
  }, [id]);

  const handleManageClick = () => {
    setIsEditing(!isEditing); // Alterna o estado de edição
  };

  return (
    <>
      <Row align={"middle"} style={{ gap: "0px", height: "80vh" }}>
        <Col span={24}>
          <Title className="titulo">
            {!isEditing ? "Quem está usando?" : "Gerenciar perfis:"}
          </Title>
        </Col>

        <Col span={14} className="container-perfis">
          <Row justify={"space-between"} className="select-profile">
            {perfisConta.map((perfil) => (
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                key={perfil.perfilId}
              >
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
