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
import avatarGeneric from "../../../assets/predefinedUsersPictures/genericDesignSystem/avatar-veiaco-card-1.png";
import { Grid, Tag } from "antd";

export default function OutrosPerfis() {
  const { perfilContaID } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [perfilConta, setPerfilConta] = useState({});
  const { useBreakpoint } = Grid;

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
  const screens = useBreakpoint();

  return (
    <div>
      {Object.entries(screens)
        .filter((screen) => !!screen[1])
        .map((screen) => (
          <Tag color="blue" key={screen[0]}>
            {screen[0]}
          </Tag>
        ))}

      <h1>Perfil de {perfilConta?.nome}</h1>

      <Row gutter={80}>
        <Col xs={24} sm={24} md={24} lg={24} xl={19}>
          <Row gutter={[40, 48]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={15}>
              <ItemPorFeiraGrafico dados={perfilConta?.produtos} />
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={9}>
              <ItemPorCategoriaGrafico dados={perfilConta.produtos} />
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="tabela-feira-header">
                <h1>Produtos de {perfilConta?.nome}</h1>
              </div>

              <ConfigProvider locale={ptBR}>
                <TabelaPerfil data={produtos} />
              </ConfigProvider>
            </Col>
          </Row>
        </Col>

        <Col xs={0} sm={0} md={0} lg={0} xl={5} className="right-container">
          <Avatar src={avatarGeneric} />

          <h1>{perfilConta?.nome}</h1>
        </Col>
      </Row>
    </div>
  );
}
