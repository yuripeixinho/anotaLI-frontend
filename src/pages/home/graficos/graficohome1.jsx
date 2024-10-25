import { useParams } from "react-router-dom";
import "./styles.scss";
import { useEffect, useState } from "react";
import PerfilContaService from "../../../services/perfilConta.service";
import { Avatar, Col, Row } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

export default function GraficoPerfis() {
  const { contaID } = useParams();
  const [perfis, setPerfis] = useState([]);

  useEffect(() => {
    const _perfilContaService = new PerfilContaService();

    async function init() {
      const perfilConta = await _perfilContaService.listSub(contaID);

      setPerfis(perfilConta);
    }

    init();
  }, [contaID]);

  return (
    <Row className="graficohome1">
      {perfis.map((perfil) => (
        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} key={perfil.id}>
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            icon={<AntDesignOutlined />}
          />
        </Col>
      ))}
    </Row>
  );
}
