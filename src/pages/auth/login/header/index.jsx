import { Col, Row, Typography } from "antd";
import Title from "antd/es/typography/Title";

export default function LoginHeader() {
  return (
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
  );
}
