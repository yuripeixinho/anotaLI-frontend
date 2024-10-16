import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import { Col, Row, Table } from "antd";

export default function HomeIndividual() {
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

  console.log(produtos);
  return (
    <div>
      <h1>Home individual</h1>

      <Row>
        <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
          teste
        </Col>

        <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14}>
          <Table dataSource={produtos} columns={columns} />
        </Col>
      </Row>
    </div>
  );
}
