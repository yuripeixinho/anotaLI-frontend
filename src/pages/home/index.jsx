import { useEffect, useState } from "react";
import { Col, Flex, Row, Typography } from "antd";
import "./styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import MeuCalendario from "./calendar";
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
import { CalendarMonth } from "@mui/icons-material";
import GraficoPerfis from "./listagemPerfis";
import StatusSemDados from "../../components/common/StatusSemDados";

export default function Home() {
  const { contaID } = useParams();
  const [feiras, setFeiras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const _feiraService = new FeiraService();

    async function init() {
      const responseFeiraService = await _feiraService.listSub(contaID);
      setFeiras(responseFeiraService);
    }

    init();
  }, [contaID]);

  const calcularDadosCategorias = (dados) => {
    const categorias = {};

    if (dados) {
      dados.forEach((evento) => {
        if (evento.produtos) {
          evento.produtos.forEach((produto) => {
            const { categoria } = produto;
            const categoriaID = categoria.categoriaID;
            const nomeCategoria = categoria.nome;

            // Inicializa a categoria caso não exista ainda
            if (!categorias[categoriaID]) {
              categorias[categoriaID] = { nome: nomeCategoria, quantidade: 0 };
            }

            // Incrementa a quantidade de produtos dessa categoria
            categorias[categoriaID].quantidade += 1;
          });
        }
      });
    }

    return Object.values(categorias); // Converte o objeto para um array
  };

  const COLORS = [
    "#74bade", // Azul principal
    "#9bc9d6", // Azul claro
    "#6a98b4", // Azul escuro
    "#82ca9d", // Verde suave
    "#ffbc5c", // Amarelo suave
    "#ffd580", // Laranja claro
  ];

  const dadosCategorias = calcularDadosCategorias(feiras);

  return (
    <Row justify={"space-between"} gutter={[24]} className="container-home">
      <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={18}>
        <h1>Calendário</h1>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24} xl={17} xxl={18}>
        <Row gutter={[0, 4]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <MeuCalendario feiras={feiras} setFeiras={setFeiras} />
          </Col>
        </Row>
      </Col>

      <Col md={24} lg={24} xl={7} xxl={6}>
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
                {feiras.length > 0 ? (
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
                ) : (
                  <StatusSemDados msg="Não existe feira agendadas. Cadastre uma nova feira no calendário lado." />
                )}
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

              {dadosCategorias.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart width={400} height={250} margin={{ bottom: 40 }}>
                    <Pie
                      isAnimationActive={false}
                      data={dadosCategorias} // Usando os dados agregados
                      cx="50%"
                      cy="50%"
                      outerRadius={"100%"}
                      dataKey="quantidade"
                      nameKey="nome"
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
              ) : (
                <StatusSemDados msg="Não existe produtos para métricas" />
              )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
