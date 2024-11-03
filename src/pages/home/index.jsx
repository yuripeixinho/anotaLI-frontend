import { useEffect, useState } from "react";
import { Col, Flex, Row, Table, Typography } from "antd";
import GraficoHome2 from "./graficos/graficohome2";
import ProdutoService from "../../services/produto.service";

import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import Calendario from "./calendar";
import MeuCalendario from "./calendar";
import GraficoPerfis from "./graficos/GraficoPerfis";
import PerfilContaService from "../../services/perfilConta.service";
import FeiraService from "../../services/feira.service";
import { CalendarOutlined } from "@ant-design/icons";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { formatarDataDDMMYY } from "../../utils/converterDataParaDDMMYY";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { useAuth } from "../../context/anotaLiAuthContext";
export default function Home() {
  const { contaID } = useParams();
  const [produtos, setProdutos] = useState([]);
  const [perfis, setPerfis] = useState([]);
  const [feiras, setFeiras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const _produtoService = new ProdutoService();
    const _perfilContaService = new PerfilContaService();
    const _feiraService = new FeiraService();

    async function init() {
      const perfilConta = await _perfilContaService.listSub(contaID);

      const responseFeiraService = await _feiraService.listSub(contaID);
      setFeiras(responseFeiraService);

      setPerfis(perfilConta);

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

  const data = [
    {
      categoriaID: 9,
      nome: "Produto A",
      perfilID: "m3Fz6kQp1W",
      quantidade: 10,
    },
    {
      categoriaID: 9,
      nome: "Produto B",
      perfilID: "m3Fz6kQp1W",
      quantidade: 10,
    },
  ];

  // Define cores para cada segmento da pizza
  const COLORS = ["#0088FE", "#00C49F"];
  // Processa os dados para somar as quantidades por categoria
  // Processa os dados para somar as quantidades por categoria
  const calcularDadosCategorias = (dados) => {
    const categorias = {};

    dados.forEach((evento) => {
      // Usamos um Set para registrar as categorias únicas de cada evento
      const categoriasEvento = new Set();

      evento.produtos.forEach((produto) => {
        const { categoria } = produto;
        const categoriaID = categoria.categoriaID;
        const nomeCategoria = categoria.nome;

        // Adiciona a categoria ao Set para garantir que contamos apenas uma vez por evento
        categoriasEvento.add(categoriaID);

        // Inicializa a categoria caso não exista ainda
        if (!categorias[categoriaID]) {
          categorias[categoriaID] = { nome: nomeCategoria, quantidade: 0 };
        }
      });

      // Incrementa a quantidade para cada categoria única no evento
      categoriasEvento.forEach((categoriaID) => {
        categorias[categoriaID].quantidade += 1;
      });
    });

    return Object.values(categorias); // Converte o objeto para um array
  };

  // Função para contar quantas feiras estão agendadas para hoje
  const contarFeirasHoje = () => {
    const dataHoje = new Date();
    dataHoje.setHours(0, 0, 0, 0); // Define a hora para 00:00:00 para ignorar o horário
    const dataHojeStr = dataHoje.toISOString().split("T")[0]; // Obtém a data em formato YYYY-MM-DD

    return feiras.filter((feira) => {
      const dataFeira = new Date(feira.start);
      dataFeira.setHours(0, 0, 0, 0); // Também define a hora para 00:00:00
      const dataFeiraStr = dataFeira.toISOString().split("T")[0]; // Obtém a data em formato YYYY-MM-DD
      return dataFeiraStr === dataHojeStr; // Compara apenas as partes da data
    }).length;
  };

  const numeroFeirasHoje = contarFeirasHoje();

  const dadosCategorias = calcularDadosCategorias(feiras);

  return (
    <Row gutter={[0, 30]}>
      <h1>Calendário</h1>
      <Row gutter={[0, 20]}>
        <Row>
          {numeroFeirasHoje === 0 ? (
            <h1 className="titulo-agendamento">
              Olá! Não temos nenhuma feira agendada para hoje.
            </h1>
          ) : (
            <h1 className="titulo-agendamento">
              Olá! Vamos ao mercado? Temos {numeroFeirasHoje} feira
              {numeroFeirasHoje > 1 ? "s" : ""} agendada
              {numeroFeirasHoje > 1 ? "s" : ""} para hoje.
            </h1>
          )}
        </Row>
        <Row justify={"space-between"} gutter={[24]}>
          <Col xs={19} sm={19} md={19} lg={19} xl={18}>
            <Row gutter={[0, 4]}>
              {/* <Col xs={16} sm={16} md={16} lg={16} xl={16}>
              <GraficoPerfis />
            </Col> */}

              <Col xs={8} sm={8} md={8} lg={8} xl={24} xxl={24}>
                {/* <GraficoHome2 /> */}

                {/* <h1>Olá, Yago! Não temos nada agendado para hoje.</h1> */}
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <MeuCalendario />

                {/* <Table dataSource={produtos} columns={columns} /> */}
              </Col>
            </Row>
          </Col>

          <Col xs={5} sm={5} md={5} lg={5} xl={6} className="right-container">
            <Row gutter={[0, 16]}>
              <Col xs={8} sm={8} md={8} lg={8} xl={24} xxl={24}>
                {/* <GraficoHome2 /> */}
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
                <Row>
                  <Col xs={24}>
                    <Typography className="proximas-feiras-title">
                      Próximas Feiras
                    </Typography>
                  </Col>
                  <Col xs={24}>
                    <Row className="proximas-feiras-flex">
                      {feiras.slice(0, 3).map((feira) => (
                        <div key={feira.id} className="proximas-feiras-card">
                          <Row align="middle">
                            <Col span={20}>
                              <Flex align="center" gap={10}>
                                <Typography className="titulo-proximas-feiras">
                                  {feira.title}
                                </Typography>
                                <Typography className="data-feira">
                                  {formatarDataDDMMYY(feira.start)}
                                </Typography>
                              </Flex>
                            </Col>
                            <Col span={4} className="icon-container">
                              <CallMissedOutgoingIcon
                                className="icon-feiras"
                                onClick={() => {
                                  navigate(`/home/${contaID}/${feira.id}`);
                                }}
                              />
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Row>
                  </Col>
                </Row>
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
                  <Col xs={24}>
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
                  </PieChart>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Row>
  );
}
