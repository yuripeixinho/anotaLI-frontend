import { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";

import "./styles.scss";
import { useParams } from "react-router-dom";
import ProdutoService from "../../../services/produto.service";
import GraficoPerfis from "../graficos/GraficoPerfis";
import TabelaFeira from "../../../components/common/table";
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

  const calcularDadosCategorias = (dados) => {
    const categorias = {};

    dados.forEach((produto) => {
      const { categoria } = produto;
      const categoriaID = categoria.categoriaID;
      const nomeCategoria = categoria.nome;

      // Incrementa 1 apenas se a categoria ainda não tiver sido contada para o produto
      if (!categorias[categoriaID]) {
        categorias[categoriaID] = { nome: nomeCategoria, quantidade: 1 };
      } else {
        categorias[categoriaID].quantidade += 1;
      }
    });

    return Object.values(categorias); // Converte para array
  };

  // Processa os dados
  const dadosCategorias = calcularDadosCategorias(produtos);

  // Paleta de cores para as fatias do gráfico
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  const transformedData = [];
  const profilesSet = new Set();

  produtos.forEach((produto) => {
    const categoriaNome = produto.categoria.nome;
    const perfilNome = produto.perfilConta.nome;

    // Adiciona o perfil ao conjunto de perfis únicos
    profilesSet.add(perfilNome);

    // Verifica se a categoria já existe no array transformado
    let categoria = transformedData.find((item) => item.name === categoriaNome);
    if (!categoria) {
      categoria = { name: categoriaNome };
      transformedData.push(categoria);
    }

    // Verifica se a contagem para o perfil já foi incrementada
    // Caso contrário, inicializa com 0 e incrementa em 1
    categoria[perfilNome] = (categoria[perfilNome] || 0) + 1;
  });

  // Converte o conjunto de perfis para um array para uso posterior
  const profiles = Array.from(profilesSet);

  return (
    <Row gutter={[0, 30]}>
      <h1>Feira atual</h1>

      <Row gutter={[0, 20]}>
        <Row justify={"space-between"} gutter={[24, 24]}>
          <Col xs={19} sm={19} md={19} lg={19} xl={18}>
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
                            fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} // Alterna as cores para cada perfil
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
                  <h1>Visão Geral</h1>
                </div>
                <ConfigProvider locale={ptBR}>
                  <TabelaFeira data={produtos} />
                </ConfigProvider>
                {/* <Table dataSource={produtos} columns={columns} /> */}
              </Col>
            </Row>
          </Col>

          <Col xs={5} sm={5} md={5} lg={5} xl={6} className="right-container">
            <Row gutter={[0, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <GraficoPerfis />
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={24}
                className="grafico-proximas-feiras"
                style={{ padding: "20px " }}
              >
                <Row align={"middle"} justify={"center"}>
                  {/* <Col xs={24}>
                    <Typography className="proximas-feiras-title">
                      Categorias
                    </Typography>
                  </Col>
                  <PieChart width={250} height={250}>
                    <Pie
                      data={dadosCategorias}
                      dataKey="quantidade"
                      nameKey="nome"
                      cx="50%"
                      cy="40%"
                      outerRadius={80} // Diminuímos o raio externo
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
                  </PieChart> */}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Row>
  );
}
