import { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";

import "./styles.scss";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import GraficoPerfis from "../graficos/GraficoPerfis";
import TabelaFeira from "../../../components/common/table";
import ptBR from "antd/es/locale/pt_BR";
import { ConfigProvider } from "antd";

export default function Feiras() {
  const { contaID, feiraID } = useParams();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const _produtoService = new ProdutoService();

    async function init() {
      const responsePerfilContaService = await _produtoService.listByFeira(
        contaID,
        feiraID
      );
      setProdutos(responsePerfilContaService);
    }

    init();
  }, [contaID]);

  return (
    <div>
      <h1>Feira atual</h1>

      <Row gutter={80}>
        <Col xs={19} sm={19} md={19} lg={19} xl={19}>
          <Row gutter={[40, 48]}>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
              <GraficoPerfis />
            </Col>

            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}></Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="tabela-feira-header">
                <h1>Visão Geral</h1>
              </div>
              <ConfigProvider locale={ptBR}>
                <TabelaFeira data={produtos} />
              </ConfigProvider>
            </Col>
          </Row>
        </Col>

        <Col
          xs={5}
          sm={5}
          md={5}
          lg={5}
          xl={5}
          className="right-container"
        ></Col>
      </Row>
    </div>
  );
}
