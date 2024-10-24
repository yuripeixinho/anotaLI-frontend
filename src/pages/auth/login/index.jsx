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
import LoginHeader from "./header";
import LoginFooter from "./footer";
import { Field, Form, Formik } from "formik";
import ContaService from "../../../services/conta.service";
import { useAuth } from "../../../context/anotaLiAuthContext";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState(null);

  const initialValues = {
    email: "",
    senha: "",
  };

  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const _contaService = new ContaService();

    await _contaService
      .login(values)
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
      <Row className="login-container">
        <Col
          span={24}
          lg={14}
          xl={12}
          xxl={10}
          className="left-container-login"
        >
          <div className="auth-left-container">
            <LoginHeader />

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
                onSubmit={async (values) => {
                  handleLogin(values);
                }}
              >
                {(props) => (
                  <Form className="auth-form">
                    <Col>
                      <Flex vertical gap={8}>
                        <label
                          className="label-input label-input-text-field"
                          htmlFor="email"
                        >
                          E-mail
                        </label>

                        <Field
                          name="email"
                          type="email"
                          placeholder="Email@dominio.com.br"
                          className="input-text input-text-field-auth"
                        />
                      </Flex>
                    </Col>

                    <Col>
                      <Flex vertical gap={8}>
                        <label
                          className="label-input label-input-text-field"
                          htmlFor="senha"
                        >
                          Senha
                        </label>
                        <Field
                          name="senha"
                          type="password"
                          placeholder="Senha"
                          className="input-text input-text-field-auth"
                        />
                      </Flex>
                    </Col>

                    <Col
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <Checkbox />
                      <label style={{ marginLeft: "6px" }}>
                        Manter conectado
                      </label>
                    </Col>

                    <Col>
                      <Button
                        style={{ width: "100%" }}
                        className="login-submit"
                        htmlType="submit"
                      >
                        Entrar
                      </Button>
                      <div
                        style={{
                          fontSize: "14px",
                          marginTop: "15px",
                        }}
                      >
                        <label>
                          Não tem uma conta?{" "}
                          <Link
                            to="/cadastro"
                            style={{ color: "#007BFF", cursor: "pointer" }}
                          >
                            Registre-se
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

        <Col span={24} lg={10} xl={12} xxl={14} className="lottie-container">
          <Lottie
            loop={true}
            autoplay={true}
            isClickToPauseDisabled={true}
            translate=""
            animationData={loginAnimation}
            style={{
              width: "100%",
              height: "100vh",
            }}
          />
        </Col>
      </Row>

      <LoginFooter />
    </>
  );
}
