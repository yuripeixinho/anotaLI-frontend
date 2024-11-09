import { useEffect, useState } from "react";
import { Col, Flex, Row, Typography } from "antd";
import ProdutoService from "../../services/produto.service";

import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import MeuCalendario from "./calendar";
import GraficoPerfis from "./graficos/GraficoPerfis";
import PerfilContaService from "../../services/perfilConta.service";
import FeiraService from "../../services/feira.service";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatarDataDDMMYY } from "../../utils/converterDataParaDDMMYY";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { CalendarMonth } from "@mui/icons-material";

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

  const dadosCategorias = calcularDadosCategorias(feiras);

  return (
    <Row gutter={[0, 30]} style={{ flexDirection: "column", width: "100%" }}>
      <h1>Calendário</h1>
      <Row gutter={[0, 20]}>
        <Row justify={"space-between"} gutter={[24]} className="container-home">
          <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={18}>
            <Row gutter={[0, 4]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <MeuCalendario  feiras={feiras} setFeiras={setFeiras}/>
              </Col>
            </Row>
          </Col>

          <Col md={24} lg={24} xl={7} xxl={6} className="right-container">
            <Row gutter={[0, 16]} justify="space-between">
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <GraficoPerfis />
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
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
                        <div
                          key={feira.id}
                          className="proximas-feiras-card"
                          onClick={() => {
                            navigate(`/home/${contaID}/${feira.id}`);
                          }}
                        >
                          <Row align="middle">
                            <Col span={14}>
                              <Flex align="center" gap={10}>
                                <Typography className="titulo-proximas-feiras">
                                  {feira.title}
                                </Typography>
                              </Flex>
                            </Col>
                            <Col span={10} className="icon-container">
                              <CalendarMonth className="icon-feiras" />
                              <Typography className="data-feira">
                                {formatarDataDDMMYY(feira.start)}
                              </Typography>
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
                lg={11}
                xl={24}
                className="grafico-proximas-feiras"
                style={{ padding: "20px " }}
              >
                <Row
                  align={"middle"}
                  justify={"center"}
                  className="grafico-item-por-categoria-container-home"
                >
                  <Col xs={24}>
                    <Typography className="proximas-feiras-title">
                      Categorias
                    </Typography>
                  </Col>

                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart width={400} height={250} margin={{ bottom: 40 }}>
                      <Pie
                        isAnimationActive={false}
                        data={dadosCategorias}
                        cx="50%"
                        cy="50%"
                        outerRadius={"100%"}
                        fill="#376bdb"
                        dataKey="quantidade"
                        nameKey="nome"
                      />

                      <Legend
                        layout="vertical"
                        align="left"
                        verticalAlign="top"
                        className="custom-legend"
                      />

                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Row>
  );
}
