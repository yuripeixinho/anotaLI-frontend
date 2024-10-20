import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import PerfilContaService from "../../../services/perfilConta.service";
import { useParams, useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons"; // ícone de edição
import PerfilCard from "./perfilCard";
import "./styles.scss";
import Title from "antd/es/typography/Title";

export default function SelecionarPerfis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [perfisConta, setPerfisConta] = useState([
    { nome: "Marcelo", perfilId: "1" },
    { nome: "Gih", perfilId: "1" },
    { nome: "Lucas", perfilId: "1" },
    { nome: "Lucas", perfilId: "1" },
  ]);
  const [isEditing, setIsEditing] = useState(false); // controla a exibição do ícone de edição

  useEffect(() => {
    const _perfisContaService = new PerfilContaService();

    async function init() {
      // const responsePerfilContaService = await _perfisContaService.listSub(id);
      // setPerfisConta(responsePerfilContaService);
    }

    init();
  }, [id]);

  const handleManageClick = () => {
    setIsEditing(!isEditing); // Alterna o estado de edição
  };

  const handleEditClick = (perfilId) => {
    // Redireciona para a página de edição do perfil com o perfilId
    navigate(`/editar-perfil/${perfilId}`);
  };

  return (
    <>
      <Row
        align={"middle"}
        style={{ flexDirection: "column" }}
      >
        <Col span={24}>
          <Title className="titulo">Quem vai usar?</Title>
        </Col>

        <Col span={24}>
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
                <PerfilCard perfil={perfil} />
                {isEditing && (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => handleEditClick(perfil.perfilId)}
                    style={{ cursor: "pointer", marginTop: "10px" }}
                  />
                )}
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={24}>
          <label onClick={handleManageClick} style={{ cursor: "pointer" }}>
            Gerenciar perfil
          </label>
        </Col>
      </Row>
    </>
  );
}
