import { useEffect, useState } from "react";
import { Card, Carousel, Col, Row, Typography } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "./styles.scss";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import TabelaFeira from "../../../components/common/tabelaFeira";
import ptBR from "antd/es/locale/pt_BR";
import { ConfigProvider } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth } from "../../../context/anotaLiAuthContext";
import FeiraService from "../../../services/feira.service";

const FeiraSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
});

export default function Feiras() {
  const { contaID, feiraID } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [feiraAtual, setFeiraAtual] = useState({});
  const [produtosRecomendados, setProdutosRecomendados] = useState([]);
  const { perfilId } = useAuth();

  useEffect(() => {
    const _produtoService = new ProdutoService();
    const _feiraService = new FeiraService();

    async function init() {
      const responsePerfilContaService = await _produtoService.listByFeira(
        contaID,
        feiraID
      );
      setProdutos(responsePerfilContaService);

      const responsePerfilContaProdutos = await _produtoService.listByConta(
        contaID
      );
      setProdutosRecomendados(responsePerfilContaProdutos);

      const feiraAtual = await _feiraService.read(feiraID);
      setFeiraAtual(feiraAtual);
    }

    init();
  }, [contaID, feiraID]);

  const calcularDadosCategorias = (dados) => {
    const categorias = {};

    dados.forEach((produto) => {
      const { categoria } = produto;
      const categoriaID = categoria.categoriaID;
      const nomeCategoria = categoria.nome;

      if (!categorias[categoriaID]) {
        categorias[categoriaID] = { nome: nomeCategoria, quantidade: 1 };
      } else {
        categorias[categoriaID].quantidade += 1;
      }
    });

    return Object.values(categorias);
  };

  const dadosCategorias = calcularDadosCategorias(produtos);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const transformedData = [];
  const profilesSet = new Set();

  produtos.forEach((produto) => {
    const categoriaNome = produto.categoria.nome;
    const perfilNome = produto.perfilConta.nome;

    profilesSet.add(perfilNome);

    let categoria = transformedData.find((item) => item.name === categoriaNome);
    if (!categoria) {
      categoria = { name: categoriaNome };
      transformedData.push(categoria);
    }

    categoria[perfilNome] = (categoria[perfilNome] || 0) + 1;
  });

  const profiles = Array.from(profilesSet);

  async function handleCriarProduto(values) {
    const _produtoService = new ProdutoService();
    values.perfilID = perfilId;
    values.feiraID = feiraID;
    await _produtoService.criarProduto(values, contaID).catch((err) => {
      console.log(err);
    });
  }

  async function handleUpdateFeira(values) {
    debugger;
    const _feiraService = new FeiraService();
    try {
      await _feiraService.atualizarFeira(values, contaID, feiraID);
      setFeiraAtual((prev) => ({ ...prev, ...values }));
    } catch (err) {
      console.error("Erro ao atualizar feira:", err);
    }
  }

  return (
    <Row gutter={[0, 30]}>
      <h1>Visualização de feira</h1>

      <Row gutter={[0, 20]}>
        <Row justify={"space-between"} gutter={[10, 10]}>
          <Col xs={19} sm={19} md={19} lg={19} xl={19}>
            <Row gutter={[40, 40]}>
              <Col xs={19} sm={19} md={19} lg={19} xl={24}>
                <Row justify={"space-between"}>
                  <Col
                    xs={16}
                    sm={16}
                    md={16}
                    lg={16}
                    xl={15}
                    className="bar-chart-container"
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={transformedData}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {profiles.map((profile, index) => (
                          <Bar
                            key={profile}
                            dataKey={profile}
                            stackId="a"
                            fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </Col>

                  <Col
                    xs={8}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={24}
                    xxl={8}
                    className="container-grafico-torta"
                  >
                    <PieChart width={250} height={250}>
                      <Pie
                        data={dadosCategorias}
                        dataKey="quantidade"
                        nameKey="nome"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {dadosCategorias.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </Col>
                </Row>
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="tabela-feira-header">
                  <h1>
                    <Formik
                      initialValues={{ nome: feiraAtual.nome || "" }}
                      enableReinitialize
                      onSubmit={handleUpdateFeira}
                    >
                      {({ errors, touched }) => (
                        <Form>
                          <Field
                            name="nome"
                            placeholder="Nome da feira"
                            style={{ fontSize: "1.5rem", fontWeight: "bold" }}
                          />
                          {errors.nome && touched.nome ? (
                            <div style={{ color: "red" }}>{errors.nome}</div>
                          ) : null}
                          <button type="submit">Salvar</button>
                        </Form>
                      )}
                    </Formik>
                  </h1>
                </div>
                <ConfigProvider locale={ptBR}>
                  <TabelaFeira data={produtos} />
                </ConfigProvider>
              </Col>
            </Row>
          </Col>

          <Col xs={5} sm={5} md={5} lg={5} xl={5} className="right-container">
            <Row gutter={[0, 16]} justify="center">
              <Col span={20}>
                <Typography.Title
                  level={5}
                  style={{ fontFamily: "Poppins", fontWeight: 400 }}
                >
                  Produtos que podem te interessar...
                </Typography.Title>
                <Carousel
                  dotPosition="left"
                  vertical
                  className="carousel-produtos"
                  slidesToShow={3}
                  slidesToScroll={1}
                  dots={true}
                  autoplay={true}
                >
                  {produtosRecomendados.map((produto, index) => (
                    <div
                      key={index}
                      style={{ padding: "10px 0", margin: "0 auto" }}
                    >
                      <Card
                        onClick={() => handleCriarProduto(produto)}
                        bordered={false}
                        cover={
                          <img
                            alt={produto.nome}
                            src={
                              produto.imagem ||
                              "https://via.placeholder.com/150"
                            }
                          />
                        }
                        style={{ borderRadius: "10px" }}
                      >
                        <div className="product-info">
                          <label
                            style={{ fontFamily: "Poppins", fontWeight: 400 }}
                          >
                            {produto.nome}
                          </label>
                          <label
                            style={{
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              color: "#ABABAB",
                              fontSize: 12,
                            }}
                          >
                            {produto.unidade}
                          </label>
                        </div>
                      </Card>
                    </div>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Row>
  );
}
