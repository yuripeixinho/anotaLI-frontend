import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Image,
  Input,
  Row,
  Typography,
} from "antd";
import loginAnimation from "../../../assets/gifs/login-gif.json";
import Lottie from "lottie-react";
import Title from "antd/es/typography/Title";
import logoGoogle from "../../../assets/logo/logo-google.png";
import logoMicrosoft from "../../../assets/logo/logo-microsoft.png";
import "./styles.scss";

export default function Login() {
  return (
    <Row>
      <Col span={12}>
        <div className="login-form">
          <Row style={{ flexDirection: "column" }}>
            <Col>
              <Title level={2} className="login-title">
                Faça login na sua conta
              </Title>
            </Col>
            <Col>
              <Typography className="login-subtitle">
                Cadastre-se uma vez, se organize sempre.
              </Typography>
            </Col>
          </Row>

          <Row gutter={[0, 15]} style={{ flexDirection: "column" }}>
            <Col>
              <Flex gap={10}>
                <Button style={{ width: "100%" }} className="btn-social-media">
                  <Image
                    src={logoGoogle} // URL do logotipo do Google
                    preview={false} // Desabilita o preview ao clicar na imagem
                    style={{
                      width: "24px",
                    }}
                  />
                  Entrar com o Google
                </Button>

                {/* Botão com logotipo do Microsoft */}
                <Button style={{ width: "100%" }} className="btn-social-media">
                  <Image
                    src={logoMicrosoft} // URL do logotipo do Google
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

            <Col>
              <Flex vertical gap={8}>
                <label className="label-input">E-mail</label>
                <Input
                  type="text"
                  placeholder="Email@dominio.com.br"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    paddingLeft: "18px",
                  }}
                  className="input-text"
                />
              </Flex>
            </Col>

            <Col>
              <Flex vertical gap={8}>
                <label className="label-input">Senha</label>
                <Input
                  type="password"
                  placeholder="Senha"
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    paddingLeft: "18px",
                  }}
                  className="input-text"
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
              <Button style={{ width: "100%" }} className="login-submit">
                Entrar
              </Button>
            </Col>

            <Col>
              <label style={{ fontSize: "14px", fontFamily: "Inter" }}>
                Não tem uma conta?{" "}
                <span style={{ color: "#007BFF", cursor: "pointer" }}>
                  Registre-se
                </span>
              </label>
            </Col>
          </Row>
        </div>
        <Row>
          <Col
            style={{
              marginBottom: "20px",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="caption"
              style={{
                fontSize: "12px",
                color: "#888",
                justifyContent: "center",
                fontFamily: "Inter",
                letterSpacing: '0.6px'
              }}
            >
              Ridae, 2024. Todos os direitos reservados.
            </Typography>
          </Col>
        </Row>
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
