import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import ptBR from "antd/es/locale/pt_BR";
import { Col, ConfigProvider, Row } from "antd";
import TabelaPerfil from "../../../components/common/tabelaPerfil";
import PerfilContaService from "../../../services/perfilConta.service";
import ItemPorFeiraGrafico from "../graficos/itemPorFeira";
import ItemPorCategoriaGrafico from "../graficos/itemPorCategoria";

export default function MeuPerfil() {
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

  console.log(perfilConta);

  return (
    <div>
      <h1>Meu perfil</h1>

      <Row gutter={80}>
        <Col span={24}>
          <Row gutter={[40, 48]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <ItemPorFeiraGrafico dados={perfilConta?.produtos} />
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <ItemPorCategoriaGrafico dados={perfilConta.produtos} />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="tabela-feira-header">
                <h1>Meus produtos</h1>
              </div>

              <ConfigProvider locale={ptBR}>
                <TabelaPerfil data={produtos} />
              </ConfigProvider>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
