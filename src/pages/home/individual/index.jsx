import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import { Table } from "antd";

export default function HomeIndividual() {
  const { perfilContaID } = useParams();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    debugger;
    const _produtoService = new ProdutoService();

    async function init() {
      const responsePerfilContaService = await _produtoService.listByPerfilConta(perfilContaID);
      setProdutos(responsePerfilContaService);
    }

    init();
  }, [perfilContaID]);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
  ];

  console.log(produtos)
  return (
    <div>
        <h1>Home individual</h1>
        <Table dataSource={produtos} columns={columns} />;
    </div>
  );
}


  
