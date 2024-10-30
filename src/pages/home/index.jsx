import { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import GraficoHome2 from "./graficos/graficohome2";
import ProdutoService from "../../services/produto.service";

import "./styles.scss";
import { useParams } from "react-router-dom";
import Calendario from "./calendar";
import MeuCalendario from "./calendar";
import GraficoPerfis from "./graficos/GraficoPerfis";

export default function Home() {
  const { contaID } = useParams();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const _produtoService = new ProdutoService();

    async function init() {
      const responsePerfilContaService = await _produtoService.listByConta(
        contaID
      );
      setProdutos(responsePerfilContaService);
    }

    init();
  }, [contaID]);

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
    },
    {
      title: "Unidade",
      dataIndex: "unidade",
      key: "unidade",
    },
  ];

  return (
    <div>
      <h1>Home</h1>

      <Row gutter={80}>
        <Col xs={19} sm={19} md={19} lg={19} xl={19}>
          <Row gutter={[40, 48]}>
            {/* <Col xs={16} sm={16} md={16} lg={16} xl={16}>
              <GraficoPerfis />
            </Col> */}

            <Col xs={8} sm={8} md={8} lg={8} xl={24} xxl={24}>
              {/* <GraficoHome2 /> */}

              <h1>Olá, Yago! Não temos nada agendado para hoje.</h1>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <MeuCalendario />

              {/* <Table dataSource={produtos} columns={columns} /> */}
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
