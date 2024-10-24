import { Col, Row } from "antd";

export default function CadastroHeader() {
  return (
    <Row style={{ flexDirection: "column" }}>
      <Col>
        <h1 className="login-title">Comece agora mesmo!</h1>
      </Col>

      <Col>
        <span className="login-subtitle">
          Insira os seus dados e crie sua conta.
        </span>
      </Col>
    </Row>
  );
}
