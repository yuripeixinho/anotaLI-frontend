import {
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

export default function Login() {
  const { login } = useAuth(); // Usa o hook de autenticação para acessar a função login

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

        navigate(`/home/${res.contaID}`);
      })
      .catch((err) => {
        alert(err.msg);
      });
  };

  return (
    <Row className="login-container">
      <Col span={12}>
        <div className="login-form">
          <LoginHeader />

          <Row gutter={[0, 15]} style={{ flexDirection: "column" }}>
            <Col>
              <Flex gap={10}>
                <Button style={{ width: "100%" }} className="btn-social-media">
                  <Image
                    src={logoGoogle}
                    preview={false}
                    style={{
                      width: "24px",
                    }}
                  />
                  Entrar com o Google
                </Button>

                <Button style={{ width: "100%" }} className="btn-social-media">
                  <Image
                    src={logoMicrosoft}
                    preview={false}
                    style={{
                      width: "24px",
                    }}
                  />
                  Entrar com a Microsoft
                </Button>
              </Flex>
            </Col>

            <Col>
              <Divider orientation="horizontal">
                <Typography className="divisor-font">ou</Typography>
              </Divider>
            </Col>

            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                handleLogin(values);
              }}
            >
              {({ values }) => (
                <Form>
                  {JSON.stringify(values)}
                  <Col>
                    <Flex vertical gap={8}>
                      <label className="label-input" htmlFor="email">
                        Email
                      </label>

                      <Field
                        name="email"
                        type="email"
                        placeholder="Email@dominio.com.br"
                        className="input-text"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          paddingLeft: "18px",
                        }}
                      />
                    </Flex>
                  </Col>

                  <Col>
                    <Flex vertical gap={8}>
                      <label className="label-input" htmlFor="senha">
                        Senha
                      </label>
                      <Field
                        name="senha"
                        type="password"
                        placeholder="Senha"
                        className="input-text"
                        style={{
                          width: "100%",
                          marginBottom: "10px",
                          paddingLeft: "18px",
                        }}
                      />
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
                    <label style={{ marginLeft: "6px", fontFamilt: "Inter" }}>
                      Manter conectado
                    </label>
                  </Col>

                  <Col style={{ marginBottom: "10px" }}>
                    <Button
                      style={{ width: "100%" }}
                      className="login-submit"
                      htmlType="submit"
                    >
                      Entrar
                    </Button>
                  </Col>

                  <Col>
                    <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
                      Não tem uma conta?{" "}
                      <Link
                        to="/cadastro"
                        style={{ color: "#007BFF", cursor: "pointer" }}
                      >
                        Registre-se
                      </Link>
                    </label>
                  </Col>
                </Form>
              )}
            </Formik>
          </Row>
        </div>

        <LoginFooter />
      </Col>

      <Col span={12}>
        <Lottie
          loop={true}
          autoplay={true}
          style={{
            width: "125%",
            height: "100%",
            marginLeft: "-14%",
            marginTop: "-4%",
          }} // ajuste o valor da margem conforme necessário
          isClickToPauseDisabled={true}
          translate=""
          animationData={loginAnimation}
        />
      </Col>
    </Row>
  );
}
