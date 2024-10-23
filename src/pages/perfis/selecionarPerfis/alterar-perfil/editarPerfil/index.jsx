import { LeftCircleOutlined } from "@ant-design/icons";
import { Col, Row, Button, Avatar, Carousel, Flex, Typography } from "antd";
import { useParams } from "react-router-dom";
import userPicture from "../../../../../assets/predefinedUsersPictures/genericDesignSystem/avatar-veiaco-card-1.png";
import "./styles.scss";

export default function EditarPerfil() {
  const { perfilId } = useParams();

  const handleSelecionarFoto = (foto) => {
    console.log(`Foto ${foto} selecionada para o perfil ${perfilId}`);
  };

  const fotos = [
    "avatar-veiaco-card-1.png",
    "avatar-veiaco-card-2.png",
    "avatar-veiaco-card-3.png",
    "avatar-veiaco-card-4.png",
    "avatar-veiaco-card-5.png",
    "avatar-veiaco-card-6.png",
  ];

  return (
    <div style={{ padding: "14px 40px" }}>
      <Row gutter={[40, 40]}>
        <Col span={24}>
          <Flex justify="space-between" align="center">
            <Flex gap={50}>
              <LeftCircleOutlined
                style={{ fontSize: "40px", cursor: "pointer" }}
              />
              <h1 className="titulo">Escolha o avatar</h1>
            </Flex>

            <Flex justify="space-between" align="center" gap={10}>
              <Avatar src={userPicture} size={50} />
              <Typography className="usuario-nome">Yago Peixinho</Typography>
            </Flex>
          </Flex>
        </Col>
      </Row>

      <Row style={{ padding: "24px 0" }}>
        <Row>
          <Col>
            <Col>
              <h2>Destaques</h2>
            </Col>
            <Col>
              <Carousel
                dots={false}
                slidesToShow={6}
                slidesToScroll={1}
                arrows={true}
                infinite
                style={{ marginBottom: "20px" }}
              >
                {fotos.map((foto, index) => (
                  <div key={index}>
                    <Row justify="center">
                      <Col>
                        <Avatar
                          src={`/assets/predefinedUsersPictures/genericDesignSystem/${foto}`}
                          alt={`Foto ${index + 1}`}
                          size={260}
                          className="profile-photo"
                          onClick={() => handleSelecionarFoto(foto)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Col>

          <Col>
            <Col>
              <h2>Nossos avatares </h2>
            </Col>
            <Col>
              <Carousel
                dots={false}
                slidesToShow={6}
                slidesToScroll={1}
                arrows={true}
                infinite
                style={{ marginBottom: "20px" }}
              >
                {fotos.map((foto, index) => (
                  <div key={index}>
                    <Row justify="center">
                      <Col>
                        <Avatar
                          src={`/assets/predefinedUsersPictures/genericDesignSystem/${foto}`}
                          alt={`Foto ${index + 1}`}
                          size={260}
                          className="profile-photo"
                          onClick={() => handleSelecionarFoto(foto)}
                          style={{ cursor: "pointer" }}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
              </Carousel>
            </Col>
          </Col>
          <Col span={24} style={{ textAlign: "center" }}>
            <Button className="btn-editar-perfil" type="primary">
              Salvar Alterações
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
}
