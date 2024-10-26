import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import { Col, Row, Table } from "antd";
import GraficoHome2 from "../../home/graficos/graficohome2";



export default function PerfilUsuario() {
  const { perfilContaID } = useParams();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const _produtoService = new ProdutoService();

    async function init() {
      const responsePerfilContaService =
        await _produtoService.listByPerfilConta(perfilContaID);
      setProdutos(responsePerfilContaService);
    }

    init();
  }, [perfilContaID]);

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
      <h1>Meus itens</h1>

      <Row gutter={80}>
        <Col xs={19} sm={19} md={19} lg={19} xl={19}>
          <Row gutter={[40, 48]}>
            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
              {/* < /> */}
            </Col>

            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
              <GraficoHome2 />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Table dataSource={produtos} columns={columns} />
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
