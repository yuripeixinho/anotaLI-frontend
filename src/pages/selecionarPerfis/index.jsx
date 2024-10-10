import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import PerfilContaService from "../../services/perfilConta.service";
import { useParams } from "react-router-dom";

import PerfilCard from "./perfilCard";
import "./styles.scss";

export default function SelecionarPerfis() {
  const { id } = useParams();
  const [perfisConta, setPerfisConta] = useState([]);

  useEffect(() => {
    const _perfisContaService = new PerfilContaService();

    async function init() {
      const responsePerfilContaService = await _perfisContaService.listSub(id);
      setPerfisConta(responsePerfilContaService);
    }

    init();
  }, [id]);

  return (
    <>
      <h1 className="titulo">Quem vai usar?</h1>

      <Row justify={"space-between"} className="select-profile">
        {perfisConta.map((perfil) => (
          <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <PerfilCard perfil={perfil} />
          </Col>
        ))}
      </Row>
    </>
  );
}
