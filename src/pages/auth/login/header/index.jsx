import { Col, Row } from "antd";
import "./styles.scss";

export default function LoginHeader() {
  return (
    <Row style={{ flexDirection: "column" }}>
      <Col>
        <h1 className="login-title">Faça login na sua conta</h1>
      </Col>
      <Col>
        <span className="login-subtitle">
          Cadastre-se uma vez, se organize sempre
        </span>
      </Col>
    </Row>
  );
}
