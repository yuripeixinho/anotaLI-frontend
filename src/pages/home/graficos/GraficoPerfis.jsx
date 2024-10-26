import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PerfilContaService from "../../../services/perfilConta.service";
import { Avatar, Col, Row } from "antd";
import {
  AntDesignOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import avatarGeneric from "../../../assets/predefinedUsersPictures/genericDesignSystem/avatar-veiaco-card-1.png";

import "./styles.scss";

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

  console.log(perfis);

  return (
    <Row className="grafico-perfis">
      {perfis.map((perfil) => (
        <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6} key={perfil.id}>
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 100,
              xxl: 150,
            }}
            icon={<AntDesignOutlined />}
            src={avatarGeneric}
          />

          <Col span={24} className="grafico-perfis-texto-container">
            <h3>{perfil.nome}</h3>

            <div className="metricas-container">
              <span>
                <ShoppingCartOutlined /> 1
              </span>

              <span>
                <ShoppingOutlined /> {perfil.qtdProdutos}
              </span>
            </div>
          </Col>
        </Col>
      ))}
    </Row>
  );
}
