import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Image,
  Row,
  Typography,
} from "antd";
import loginAnimation from "../../../assets/gifs/login-gif.json";
import Lottie from "lottie-react";
import logoGoogle from "../../../assets/logo/logo-google.png";
import logoMicrosoft from "../../../assets/logo/logo-microsoft.png";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { useState } from "react";
import { cadastroValidationSchema } from "../../../validations/cadastroValidation";
import ContaService from "../../../services/conta.service";
import { useAuth } from "../../../context/anotaLiAuthContext";
import CadastroHeader from "./header";
import CadastroFooter from "./footer";

export default function Cadastro() {
  const { login } = useAuth();

  const [errorMsg, setErrorMsg] = useState(null);

  const initialValues = {
    email: "",
    senha: "",
  };

  const navigate = useNavigate();

  const handleCadastro = async (values) => {
    const _contaService = new ContaService();

    await _contaService
      .cadastro(values)
      .then((res) => {
        const usuario = {
          id: res.contaID,
          email: res.email,
        };

        login(res.token, usuario);

        navigate(`/${res.contaID}/perfis`);
      })
      .catch((err) => {
        const message =
          err?.response?.data?.Message ||
          "Credenciais inválidas. Tente novamente";

        setErrorMsg(message);
      });
  };

  return (
    <>
      <Row className="cadastro-container">
        <Col span={24} lg={10} xl={12} xxl={14} className="lottie-container">
          <Lottie
            loop={true}
            autoplay={true}
            style={{
              width: "100%",
              height: "100vh",
            }}
            isClickToPauseDisabled={true}
            translate=""
            animationData={loginAnimation}
          />
        </Col>

        <Col
          span={24}
          lg={14}
          xl={12}
          xxl={10}
          className="left-container-login"
        >
          <div className="auth-left-container">
            <CadastroHeader />

            <Row
              gutter={[0, 15]}
              className="auth-form-container"
              style={{ flexDirection: "column" }}
            >
              <Col className="fast-acess-container">
                <Flex gap={10} justify="space-between">
                  <Button className="btn-social-media">
                    <Image
                      src={logoGoogle}
                      preview={false}
                      style={{
                        width: "20px",
                      }}
                    />
                    Entrar com Google
                  </Button>

                  <Button className="btn-social-media">
                    <Image
                      src={logoMicrosoft}
                      preview={false}
                      style={{
                        width: "20px",
                      }}
                    />
                    Entrar com Microsoft
                  </Button>
                </Flex>
              </Col>

              <Col>
                <Divider orientation="horizontal">
                  <Typography className="divisor-font">ou</Typography>
                </Divider>
              </Col>

              {errorMsg && (
                <Col style={{ marginBottom: "15px" }}>
                  <Alert
                    message={errorMsg}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setErrorMsg(null)}
                  />
                </Col>
              )}

              <Formik
                initialValues={initialValues}
                validationSchema={cadastroValidationSchema}
                onSubmit={async (values) => {
                  handleCadastro(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="auth-form">
                    <Col>
                      <Flex vertical gap={8}>
                        <label className="label-input">Email</label>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Email@dominio.com.br"
                          className="input-text"
                          style={{
                            paddingLeft: "18px",
                          }}
                        />
                        {errors.email && touched.email && (
                          <div className="error-message">{errors.email}</div>
                        )}
                      </Flex>
                    </Col>

                    <Col>
                      <Flex vertical gap={8}>
                        <label className="label-input">Senha</label>
                        <Field
                          name="senha"
                          type="password"
                          placeholder="Senha"
                          style={{
                            paddingLeft: "18px",
                          }}
                          className="input-text"
                        />
                        {errors.senha && touched.senha && (
                          <span className="error-message">{errors.senha}</span>
                        )}
                      </Flex>
                    </Col>

                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                        marginTop: "15px",
                      }}
                    >
                      <Checkbox />
                      <label
                        style={{ marginLeft: "6px", fontFamilt: "Poppins" }}
                      >
                        Concordo com os <a href="/">Termos & Privacidade</a>
                      </label>
                    </Col>

                    <Col>
                      <Button
                        style={{ width: "100%" }}
                        className="login-submit"
                        htmlType="submit"
                      >
                        Cadastrar
                      </Button>

                      <div
                        style={{
                          fontSize: "14px",
                          fontFamily: "Poppins",
                          marginTop: "15px",
                        }}
                      >
                        <label>
                          Já possui uma conta?{" "}
                          <Link
                            to="/login"
                            style={{ color: "#007BFF", cursor: "pointer" }}
                          >
                            Login
                          </Link>
                        </label>
                      </div>
                    </Col>
                  </Form>
                )}
              </Formik>
            </Row>
          </div>
        </Col>
      </Row>

      <CadastroFooter />
    </>
  );
}
