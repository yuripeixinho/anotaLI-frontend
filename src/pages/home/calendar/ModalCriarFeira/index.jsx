import React, { useState } from "react";
import { Button, Col, Divider, Modal, Alert, Typography } from "antd";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import FeiraService from "../../../../services/feira.service";
import { useParams } from "react-router-dom";

export default function ModalCriarFeira({
  aoSalvarNovaFeira,
  modalCriarFeiraAberto,
  setModalCriarFeiraAberto,
}) {
  const [errorMsg, setErrorMsg] = useState(null);
  const { contaID } = useParams();

  const initialValues = {
    nome: "",
    dataInicio: null,
    dataFim: null,
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
  });

  const handleOk = async (values) => {
    const _feiraService = new FeiraService();
    values.parentId = contaID;

    // Converte as datas para o formato ISO 8601
    values.dataInicio = new Date(values.dataInicio).toISOString();
    values.dataFim = new Date(values.dataFim).toISOString();

    await _feiraService
      .createSub(values)
      .then((res) => {
        setModalCriarFeiraAberto(false);
        aoSalvarNovaFeira(res); // Passa a nova feira para o componente pai
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

  return (
    <Modal
      title="Nova Feira"
      open={modalCriarFeiraAberto}
      onCancel={handleCancel}
      footer={null}
      width="60%"
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOk}
      >
        {() => (
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
              <Typography className="label-input">Data de Início</Typography>
              <Field
                name="dataInicio"
                type="datetime-local"
                className="input-text"
              />
              <ErrorMessage
                name="dataInicio"
                component="div"
                style={{ color: "red" }}
              />
            </Col>
            <Col>
              <Typography className="label-input">Data de Fim</Typography>
              <Field
                name="dataFim"
                type="datetime-local"
                className="input-text"
              />
              <ErrorMessage
                name="dataFim"
                component="div"
                style={{ color: "red" }}
              />
            </Col>
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
    </Modal>
  );
}
