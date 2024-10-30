import React, { useState } from "react";
import {
  Button,
  Col,
  Divider,
  Modal,
  Alert,
  Typography,
  DatePicker,
  TimePicker,
  Checkbox,
  Carousel,
  Card,
  Row,
} from "antd";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import FeiraService from "../../../../services/feira.service";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Meta } = Card;

export default function ModalCriarFeira({
  aoSalvarNovaFeira,
  modalCriarFeiraAberto,
  setModalCriarFeiraAberto,
}) {
  const [errorMsg, setErrorMsg] = useState(null);
  const { contaID } = useParams();
  const [isDiaInteiro, setIsDiaInteiro] = useState(false);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  const produtosRecomendados = [
    {
      nome: "Produto A",
      preco: "R$ 10,00",
      unidade: "kg",
      quantidade: 10,
      imagem: "https://via.placeholder.com/150",
      perfilID: "m3Fz6kQp1W",
      categoriaID: 9,
    },
    {
      nome: "Produto B",
      preco: "R$ 5,00",
      quantidade: 10,
      unidade: "unidade",
      imagem: "https://via.placeholder.com/150",
      perfilID: "m3Fz6kQp1W",
      categoriaID: 9,
    },
    {
      nome: "Produto C",
      preco: "R$ 7,50",
      quantidade: 10,
      unidade: "litro",
      perfilID: "m3Fz6kQp1W",
      imagem: "https://via.placeholder.com/150",
      categoriaID: 9,
    },
    // Adicione mais produtos conforme necessário
  ];

  const initialValues = {
    nome: "",
    dataInicio: null,
    dataFim: null,
    horaInicio: null,
    horaFim: null,
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("Nome da feira é obrigatório")
      .min(3, "O nome deve ter pelo menos 3 caracteres"),
    dataInicio: Yup.date().required("Data de início é obrigatória").nullable(),
    dataFim: Yup.date()
      .required("Data de fim é obrigatória")
      .nullable()
      .min(Yup.ref("dataInicio"), "Data de fim deve ser após a data de início"),
    horaInicio: Yup.string()
      .nullable()
      .when("isDiaInteiro", {
        is: false,
        then: Yup.string().required("Hora de início é obrigatória"),
      }),
    horaFim: Yup.string()
      .nullable()
      .when("isDiaInteiro", {
        is: false,
        then: Yup.string()
          .required("Hora de fim é obrigatória")
          .test(
            "horaFimAfterHoraInicio",
            "Hora de fim deve ser após a hora de início",
            function (value) {
              const { horaInicio } = this.parent;
              return moment(value, "HH:mm").isAfter(
                moment(horaInicio, "HH:mm")
              );
            }
          ),
      }),
  });
  const handleOk = async (values) => {
    const _feiraService = new FeiraService();
    values.parentId = contaID;

    // Converte as datas conforme necessário
    if (isDiaInteiro) {
      values.dataInicio = values.dataInicio.toISOString();
      values.dataFim = values.dataFim.toISOString();
    } else {
      const dataInicioComHora = moment(values.dataInicio)
        .set({
          hour: moment(values.horaInicio, "HH:mm").hour(),
          minute: moment(values.horaInicio, "HH:mm").minute(),
        })
        .toISOString();

      const dataFimComHora = moment(values.dataFim)
        .set({
          hour: moment(values.horaFim, "HH:mm").hour(),
          minute: moment(values.horaFim, "HH:mm").minute(),
        })
        .toISOString();

      values.dataInicio = dataInicioComHora;
      values.dataFim = dataFimComHora;
    }

    // Mapeia os produtos selecionados para o formato esperado
    const produtosParaAdicionar = produtosSelecionados.map((produto) => ({
      nome: produto.nome,
      quantidade: produto.quantidade, // Aqui você pode ajustar a lógica para capturar a quantidade que deseja
      unidade: produto.unidade,
      // categoria: { categoriaID: produto.categoriaID },
      categoriaID: produto.categoriaID, // Ajuste conforme sua lógica de categorias
      perfilID: produto.perfilID, // Presumindo que seja o ID do perfil
      // feiraID: perfilId, // Ou ajuste conforme necessário
    }));

    // Adiciona os produtos ao objeto de feira
    const novaFeira = {
      ...values,
      produtos: produtosParaAdicionar, // Adiciona a lista de produtos
    };

    await _feiraService
      .createSub(novaFeira)
      .then((res) => {
        setModalCriarFeiraAberto(false);
        aoSalvarNovaFeira(res);
      })
      .catch((err) => {
        const message =
          err?.response?.data?.Message ||
          "Erro interno. Tente novamente mais tarde.";
        setErrorMsg(message);
      });
  };

  const handleCancel = () => {
    setModalCriarFeiraAberto(false);
    setErrorMsg(null);
  };

  const adicionarProduto = (produto) => {
    setProdutosSelecionados((prev) => [...prev, produto]);
  };

  const removerProduto = (produtoParaRemover) => {
    setProdutosSelecionados((prev) =>
      prev.filter((produto) => produto.nome !== produtoParaRemover.nome)
    );
  };

  return (
    <Modal
      title="Nova Feira"
      open={modalCriarFeiraAberto}
      onCancel={handleCancel}
      footer={null}
      width="90%"
    >
      {errorMsg && (
        <Alert
          message={errorMsg}
          type="error"
          showIcon
          closable
          onClose={() => setErrorMsg(null)}
          style={{ marginBottom: "15px" }}
        />
      )}
      <Row gutter={24}>
        {JSON.stringify(produtosSelecionados)}
        <Col span={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOk}
          >
            {({ setFieldValue }) => (
              <Form>
                <Col>
                  <Typography className="label-input">Nome da Feira</Typography>
                  <Field
                    name="nome"
                    placeholder="Nome da feira"
                    className="input-text"
                  />
                  <ErrorMessage
                    name="nome"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Col>

                <Col>
                  <Typography className="label-input">
                    Período da Feira
                  </Typography>
                  <RangePicker
                    format="YYYY-MM-DD"
                    onChange={(dates) => {
                      setFieldValue("dataInicio", dates ? dates[0] : null);
                      setFieldValue("dataFim", dates ? dates[1] : null);
                    }}
                    style={{ width: "100%" }}
                  />
                  <ErrorMessage
                    name="dataInicio"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <ErrorMessage
                    name="dataFim"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Col>

                <Col>
                  <Checkbox
                    checked={isDiaInteiro}
                    onChange={(e) => {
                      setIsDiaInteiro(e.target.checked);
                      setFieldValue("horaInicio", null);
                      setFieldValue("horaFim", null);
                    }}
                  >
                    Dia Inteiro
                  </Checkbox>
                </Col>

                {!isDiaInteiro && (
                  <Col>
                    <Typography className="label-input">Horário</Typography>
                    <TimePicker.RangePicker
                      format="HH:mm"
                      onChange={(times) => {
                        setFieldValue(
                          "horaInicio",
                          times ? times[0].format("HH:mm") : null
                        );
                        setFieldValue(
                          "horaFim",
                          times ? times[1].format("HH:mm") : null
                        );
                      }}
                      style={{ width: "100%" }}
                    />
                    <ErrorMessage
                      name="horaInicio"
                      component="div"
                      style={{ color: "red" }}
                    />
                    <ErrorMessage
                      name="horaFim"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </Col>
                )}

                <Divider />
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Criar Feira
                  </Button>
                </Col>
              </Form>
            )}
          </Formik>
        </Col>

        {/* Carrossel de Produtos Recomendados */}
        <Col span={16}>
          <Typography.Title level={4}>Produtos Recomendados</Typography.Title>
          <Carousel
            autoplay
            dotPosition="bottom"
            className="carousel-produtos"
            slidesToShow={4} // Ajuste para mostrar múltiplos itens
            slidesToScroll={1}
            style={{ gap: "20px" }} // Espaçamento entre os cartões
          >
            {produtosRecomendados.map((produto, index) => (
              <div key={index} style={{ padding: "0 10px" }}>
                <Card
                  cover={<img alt={produto.nome} src={produto.imagem} />}
                  actions={[
                    <Button
                      type="link"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => adicionarProduto(produto)}
                    >
                      Adicionar ao Carrinho
                    </Button>,
                  ]}
                >
                  <Meta
                    title={produto.nome}
                    description={`Preço: ${produto.preco} / Unidade: ${produto.unidade}`}
                  />
                </Card>
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Lista de Produtos Selecionados */}
      {produtosSelecionados.length > 0 && (
        <div>
          <Typography.Title level={4}>Produtos Selecionados</Typography.Title>
          <ul>
            {produtosSelecionados.map((produto, index) => (
              <li key={index}>
                {produto.nome}{" "}
                <Button
                  type="link"
                  onClick={() => removerProduto(produto)}
                  style={{ color: "red" }}
                >
                  Remover
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
}
