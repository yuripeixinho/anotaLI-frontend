import { Col, Row, Typography } from "antd";

export default function LoginFooter() {
  return (
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
            letterSpacing: "0.6px",
          }}
        >
          Ridae, 2024. Todos os direitos reservados.
        </Typography>
      </Col>
    </Row>
  );
}
