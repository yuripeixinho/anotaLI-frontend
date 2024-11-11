/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Modal, Row, Typography } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
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
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const FeiraSchema = Yup.object().shape({
  nome: Yup.string().required("Nome é obrigatório"),
});

export default function Feiras() {
  const { contaID, feiraID } = useParams();
  const { perfilId } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [feiraAtual, setFeiraAtual] = useState({});
  const [produtosRecomendados, setProdutosRecomendados] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [loadingDelete, setLoadingDelete] = useState(false); // Estado para controlar o loading da requisição DELETE
  const [isVertical, setIsVertical] = useState(true);
  const [dadosCategorias, setDadosCategorias] = useState();

  const navigate = useNavigate();

  // Função para verificar a largura da tela e definir o modo do carrossel
  const updateCarouselDirection = () => {
    setIsVertical(window.innerWidth >= 1200);
  };

  useEffect(() => {
    updateCarouselDirection(); // Checar a largura inicial
    window.addEventListener("resize", updateCarouselDirection); // Adicionar listener de resize
    return () => window.removeEventListener("resize", updateCarouselDirection); // Remover listener no cleanup
  }, []);

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

      // Cria um Set para armazenar os nomes dos produtos já inseridos na lista de produtos da feira
      const nomesInseridos = new Set(
        responsePerfilContaService.map((produto) => produto.nome)
      );

      // Filtra os produtos recomendados para garantir que não haja duplicatas (pelo nome)
      const produtosRecomendadosUnicos = responsePerfilContaProdutos.filter(
        (produtoRecomendado) => {
          // Verifica se o nome do produto não está presente na lista da feira atual
          if (!nomesInseridos.has(produtoRecomendado.nome)) {
            nomesInseridos.add(produtoRecomendado.nome); // Adiciona o nome ao Set
            return true; // Produto é único e pode ser adicionado
          }
          return false; // Produto duplicado (mesmo nome), não adiciona
        }
      );

      setProdutosRecomendados(produtosRecomendadosUnicos);

      const feiraAtual = await _feiraService.read(feiraID);
      setFeiraAtual(feiraAtual);
    }

    init();
  }, [contaID, feiraID]);

  useEffect(() => {
    // Filtra produtosRecomendados para incluir apenas produtos que não estão na lista de produtos
    const produtosFiltrados = produtosRecomendados.filter(
      (produtoRecomendado) =>
        !produtos.some((produto) => produto.nome === produtoRecomendado.nome)
    );

    setProdutosRecomendados(produtosFiltrados);
  }, [produtos]);

  useEffect(() => {
    // Recalcular dados das categorias sempre que o estado 'produtos' for atualizado
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

    const novosDadosCategorias = calcularDadosCategorias(produtos);
    setDadosCategorias(novosDadosCategorias); // Atualiza o estado com os novos dados
  }, [produtos]);

  const COLORS = [
    "#74bade", // Azul principal
    "#9bc9d6", // Azul claro (para uma variação suave do azul principal)
    "#6a98b4", // Azul escuro (para contrastar)
    "#82ca9d", // Verde suave (para complementar)
    "#ffbc5c", // Amarelo suave (para dar um toque vibrante)
    "#ffd580", // Laranja claro (substituindo o laranja)
  ];

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

  // Função para criar produto e atualizar a tabela
  async function handleCriarProduto(values) {
    const _produtoService = new ProdutoService();
    values.perfilID = perfilId;
    values.feiraID = feiraID;
    debugger;
    // Recupera e converte o valor de perfilConta do localStorage em um objeto
    const perfilContaLocal = JSON.parse(localStorage.getItem("perfil"));
    values.perfilConta = perfilContaLocal;

    try {
      await _produtoService.criarProduto(values, contaID);
      // Atualize a lista de produtos adicionando o novo produto
      setProdutos((prevProdutos) => [...prevProdutos, values]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFeira(values) {
    const _feiraService = new FeiraService();
    try {
      await _feiraService.atualizarFeira(values, contaID, feiraID);
      setFeiraAtual((prev) => ({ ...prev, ...values }));
      setIsEditing(false); // Fecha a edição após salvar
    } catch (err) {
      console.error("Erro ao atualizar feira:", err);
    }
  }

  const handleDeleteFeira = async () => {
    const _feiraService = new FeiraService();

    await _feiraService
      .deletarFeira(contaID, feiraID)
      .then((res) => {
        setIsModalVisible(false);
        navigate(`/home/${contaID}`);
      })
      .catch((err) => {
        console.error("Erro ao excluir feira:", err);
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  return (
    <div>
      <h1>Visualização de feira</h1>

      <Row gutter={80} className="container-feiras">
        <Col xs={24} sm={24} md={24} lg={24} xl={19} xxl={19}>
          <Row gutter={[40, 48]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={14}>
              <div className="bar-chart-container">
                <h3>Itens por feira</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={transformedData}>
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
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={10}>
              <div className="container-grafico-torta">
                <h3>Itens por categoria</h3>

                <ResponsiveContainer width="100%" height={200}>
                  <PieChart width={400} height={250}>
                    <Pie
                      data={dadosCategorias}
                      dataKey="quantidade"
                      nameKey="nome"
                      cx="50%"
                      cy="40%"
                      outerRadius="86%"
                      fill="#8884d8"
                    >
                      {dadosCategorias?.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>

                    <Legend
                      layout="vertical"
                      align="left"
                      verticalAlign="top"
                      className="custom-legend"
                    />

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="container-tabela-feira">
                <div className="tabela-feira-header">
                  <h1>
                    {!isEditing ? (
                      <div className="nome-feira">
                        {feiraAtual.nome || "Nome da feira"}

                        <div>
                          <EditOutlined
                            onClick={() => setIsEditing(true)}
                            style={{
                              marginLeft: 10,
                              cursor: "pointer",
                              color: "#777777",
                            }}
                          />

                          <DeleteOutline
                            onClick={() => setIsModalVisible(true)}
                            style={{
                              marginLeft: 10,
                              cursor: "pointer",
                              color: "#777777",
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <Formik
                        initialValues={{ nome: feiraAtual.nome || "" }}
                        enableReinitialize
                        validationSchema={FeiraSchema}
                        onSubmit={handleUpdateFeira}
                      >
                        {({ errors, touched }) => (
                          <Form
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Field
                              name="nome"
                              placeholder="Nome da feira"
                              className="nome-feira-input-text"
                            />
                            {errors.nome && touched.nome ? (
                              <div style={{ color: "red", marginRight: 10 }}>
                                {errors.nome}
                              </div>
                            ) : null}

                            <button
                              type="submit"
                              style={{ marginRight: 5, marginLeft: 5 }}
                              className="btn-salvar-nome-feira"
                            >
                              Salvar
                            </button>

                            <Button
                              color="danger"
                              htmlType="button"
                              className="btn-cancelar-editar-feira"
                              onClick={() => setIsEditing(false)}
                            >
                              Cancelar
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    )}
                  </h1>
                </div>
                <ConfigProvider locale={ptBR}>
                  <TabelaFeira data={produtos} setData={setProdutos} />
                </ConfigProvider>
              </div>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={5} xxl={5}>
          <div className="right-container">
            <Typography.Title
              level={4}
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                marginBottom: "4rem",
              }}
            >
              Produtos que podem te interessar...
            </Typography.Title>

            <Carousel
              vertical={isVertical}
              className="carousel-produtos"
              slidesToShow={3}
              slidesToScroll={3}
              dots={false}
              arrows={true}
              autoplay={true}
              responsive={[
                {
                  breakpoint: 1500,
                  settings: {
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 4,
                  },
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {produtosRecomendados.map((produto, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px 0",
                    margin: "0 auto",
                  }}
                >
                  <Card
                    onClick={() => handleCriarProduto(produto)}
                    bordered={false}
                    cover={
                      <img
                        alt={produto.nome}
                        src={
                          produto.imagem || "https://via.placeholder.com/150"
                        }
                      />
                    }
                    style={{ borderRadius: "10px" }}
                  >
                    <div className="product-info">
                      <label style={{ fontFamily: "Poppins", fontWeight: 400 }}>
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
          </div>
        </Col>
      </Row>

      <Modal
        title="Confirmar Exclusão"
        visible={isModalVisible}
        onOk={handleDeleteFeira}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loadingDelete}
        okText="Excluir"
        cancelText="Cancelar"
        centered
      >
        <p>Você tem certeza que deseja excluir esta feira?</p>
      </Modal>
    </div>
  );
}
