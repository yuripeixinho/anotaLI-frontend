import React, { useEffect, useRef, useState } from "react";
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
  Flex,
  List,
} from "antd";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import FeiraService from "../../../../services/feira.service";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";
import ProdutoService from "../../../../services/produto.service";
import "./styles.scss";

const { RangePicker } = DatePicker;

export default function ModalCriarFeira({
  aoSalvarNovaFeira,
  modalCriarFeiraAberto,
  setModalCriarFeiraAberto,
  selectedDate, // Nova prop recebida
}) {
  const [errorMsg, setErrorMsg] = useState(null);
  const { contaID } = useParams();
  const [isDiaInteiro, setIsDiaInteiro] = useState(false);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [produtosRecomendados, setProdutosRecomendados] = useState([]);

  const formikRef = useRef(); // Crie uma referência para o Formik

  useEffect(() => {
    const _produtoService = new ProdutoService();

    async function init() {
      const responsePerfilContaService = await _produtoService.listByConta(
        contaID
      );

      setProdutosRecomendados(responsePerfilContaService);
    }

    init();
  }, [contaID]);

  const initialValues = {
    nome: "",
    dataInicio: selectedDate ? moment(selectedDate) : null,
    dataFim: selectedDate ? moment(selectedDate) : null,
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

    initialValues = { teste: "" };

    if (formikRef.current) {
      formikRef.current.resetForm();
    }
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
      title={
        <h1
          style={{
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: 40,
          }}
        >
          Criando nova feira
        </h1>
      }
      open={modalCriarFeiraAberto}
      footer={false}
      onCancel={handleCancel}
      width="90%"
      style={{ height: "800px" }} // Definindo a altura aqui
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
        {/* {JSON.stringify(produtosSelecionados)} */}
        <Col span={6}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOk}
            innerRef={formikRef} // Passa a referência do Formik
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Row gutter={[0, 40]} style={{ marginTop: "12px" }}>
                  <Col>
                    <Row
                      gutter={[0, 14]}
                      justify="space-between"
                      align={"middle"}
                    >
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Typography className="label-input">
                          Nome da Feira
                        </Typography>
                        <Field
                          name="nome"
                          placeholder="Quinzenal"
                          className="input-text"
                          style={{ width: "100%", padding: "0 0 0 14px" }}
                        />
                        <ErrorMessage
                          name="nome"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Col>
                      <Col xs={8} sm={8} md={8} lg={8} xl={12} xxl={16}>
                        <Typography className="label-input">
                          Período da Feira
                        </Typography>
                        <RangePicker
                          format="DD-MM-YYYY"
                          className="input-text"
                          placeholder={["Data Início", "Data Fim"]}
                          value={
                            values.dataInicio && values.dataFim
                              ? [
                                  moment(values.dataInicio),
                                  moment(values.dataFim),
                                ]
                              : null
                          }
                          onChange={(dates) => {
                            setFieldValue(
                              "dataInicio",
                              dates ? dates[0] : null
                            );
                            setFieldValue("dataFim", dates ? dates[1] : null);
                          }}
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
                      <Col
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        xl={12}
                        xxl={7}
                        style={{ marginTop: "28px" }}
                      >
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
                      <Col
                        xs={24}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        xxl={24}
                        style={{ paddingRight: "8px" }}
                      >
                        {!isDiaInteiro && (
                          <Col xs={8} sm={8} md={8} lg={8} xl={12} xxl={16}>
                            <Typography className="label-input">
                              Horário
                            </Typography>
                            <TimePicker.RangePicker
                              className="input-text"
                              placeholder={["Hora Início", "Hora Fim"]}
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
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={8} sm={8} md={8} lg={8} xl={24} xxl={24}>
                    {produtosSelecionados.length > 0 && (
                      <Col xs={8} sm={8} md={8} lg={8} xl={24} xxl={24}>
                        <Typography className="label-input-produtos-selecionados">
                          Produtos selecionados
                        </Typography>
                        <ul>
                          <List
                            style={{
                              height: "340px",
                              overflow: "auto",
                            }}
                            dataSource={produtosSelecionados}
                            renderItem={(produto) => (
                              <List.Item
                                key={produto.id}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "8px 0",
                                }}
                              >
                                <Card
                                  bordered={false}
                                  cover={
                                    <img
                                      alt={produto.nome}
                                      src="https://via.placeholder.com/150"
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  }
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    marginRight: "10px",
                                  }}
                                />
                                <div style={{ flexGrow: 1 }}>
                                  <label
                                    style={{
                                      fontFamily: "Poppins",
                                      fontWeight: 400,
                                    }}
                                  >
                                    {produto.nome}
                                  </label>
                                  <br />
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
                                <Button
                                  type="link"
                                  onClick={() => removerProduto(produto)}
                                  icon={<DeleteOutlined />}
                                  style={{ color: "red" }}
                                />
                              </List.Item>
                            )}
                          />
                        </ul>
                      </Col>
                    )}
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>

        {/* Carrossel de Produtos Recomendados */}
        <Col span={18}>
          <Row gutter={[0, 30]} align={"middle"} justify={"center"}>
            <Col span={20}>
              <Typography.Title
                level={1}
                style={{ fontFamily: "Poppins", fontWeight: 400 }}
              >
                Produtos que podem te interessar...
              </Typography.Title>
              <Carousel
                dots={false}
                arrows={true}
                className="carousel-produtos"
                slidesToShow={5}
                slidesToScroll={1}
                autoplay={true} // Desabilita o autoplay
              >
                {produtosRecomendados.map((produto, index) => (
                  <div key={index} style={{ padding: "0 10px" }}>
                    <Card
                      onClick={() => adicionarProduto(produto)}
                      bordered={false}
                      cover={
                        <img
                          alt={produto.nome}
                          src={"https://via.placeholder.com/150"}
                        />
                      }
                      style={{ marginRight: "20px" }} // Define o espaçamento entre os cartões
                    >
                      <Flex vertical>
                        <label
                          style={{ fontFamily: "Poppins", fontWeight: 400 }}
                        >
                          {produto.nome}
                        </label>
                        <label
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "600",
                            color: "#ABABAB",
                            fontSize: 12,
                          }}
                        >
                          {produto.unidade}
                        </label>
                      </Flex>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </Col>

            <Col span={20}>
              <Typography.Title
                level={1}
                style={{ fontFamily: "Poppins", fontWeight: 400 }}
              >
                Outros produtos...
              </Typography.Title>
              <Carousel
                dots={false}
                arrows={true}
                className="carousel-produtos"
                slidesToShow={5}
                slidesToScroll={1}
                autoplay={true} // Desabilita o autoplay
              >
                {produtosRecomendados.map((produto, index) => (
                  <div key={index} style={{ padding: "0 10px" }}>
                    <Card
                      onClick={() => adicionarProduto(produto)}
                      bordered={false}
                      cover={
                        <img
                          alt={produto.nome}
                          src={"https://via.placeholder.com/150"}
                        />
                      }
                      style={{ marginRight: "20px" }} // Define o espaçamento entre os cartões
                    >
                      <Flex vertical>
                        <label
                          style={{ fontFamily: "Poppins", fontWeight: 400 }}
                        >
                          {produto.nome}
                        </label>
                        <label
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "600",
                            color: "#ABABAB",
                            fontSize: 12,
                          }}
                        >
                          {produto.unidade}
                        </label>
                      </Flex>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
          <Flex justify="right" gap={6}>
            <Button
              color="danger"
              htmlType="button"
              className="btn-cancelar-feira"
              onClick={() => {
                setModalCriarFeiraAberto(false);
              }}
            >
              Cancelar
            </Button>

            <Button
              className="btn-modal-feira"
              type="primary"
              htmlType="submit"
              onClick={() => formikRef.current.submitForm()} // Acessa a função submitForm do Formik
            >
              Criar Feira
            </Button>
          </Flex>
        </Col>
      </Row>
    </Modal>
  );
}
