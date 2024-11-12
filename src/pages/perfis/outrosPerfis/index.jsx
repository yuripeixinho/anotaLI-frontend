import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import { Avatar, Col, Row } from "antd";
import ptBR from "antd/es/locale/pt_BR";
import { ConfigProvider } from "antd";
import TabelaPerfil from "../../../components/common/tabelaPerfil";
import PerfilContaService from "../../../services/perfilConta.service";
import ItemPorFeiraGrafico from "../graficos/itemPorFeira";
import ItemPorCategoriaGrafico from "../graficos/itemPorCategoria";

import "./styles.scss";

export default function OutrosPerfis() {
  const { perfilContaID } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [perfilConta, setPerfilConta] = useState({});

  useEffect(() => {
    const _produtoService = new ProdutoService();
    const _perfilContaService = new PerfilContaService();

    async function init() {
      const responsePerfilContaService =
        await _produtoService.listByPerfilConta(perfilContaID);
      setProdutos(responsePerfilContaService);

      const responsePerfilConta = await _perfilContaService.read(perfilContaID);
      setPerfilConta(responsePerfilConta);
    }

    init();
  }, [perfilContaID]);

  return (
    <div>
      <h1>Perfil de {perfilConta?.nome}</h1>

      <Row gutter={80}>
        <Col xs={24} sm={24} md={24} lg={24} xl={18}>
          <Row gutter={[40, 48]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={14}>
              <ItemPorFeiraGrafico dados={perfilConta?.produtos} />
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={10}>
              <ItemPorCategoriaGrafico dados={perfilConta.produtos} />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="container-tabela-perfis">
                <div className="tabela-feira-header">
                  <h1>Produtos de {perfilConta?.nome}</h1>
                </div>

                <ConfigProvider locale={ptBR}>
                  <TabelaPerfil data={produtos} />
                </ConfigProvider>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={0} sm={0} md={0} lg={0} xl={6}>
          <div className="perfil-right-container">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 200 }}
              src={perfilConta?.imagemPerfil?.caminhoImagem}
            />

            <h1>{perfilConta?.nome}</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
}
