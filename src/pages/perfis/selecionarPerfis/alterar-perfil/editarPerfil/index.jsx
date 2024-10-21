import { Col, Row, Button, Avatar, Carousel } from "antd";
import { useParams } from "react-router-dom";
// import "./styles.scss";

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
  ];

  return (
    <>
      <h1 className="titulo">Editar Perfil - {perfilId}</h1>

      <Row style={{ padding: "20px" }}>
        <Row>
          <Col>
            <Col>
              <h2>Nossos genéricos</h2>
            </Col>
            <Col>
              <Carousel
                autoplay
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
                          size={300}
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
              <h2>Escolha sua foto de perfil</h2>
            </Col>
            <Col>
              <Carousel
                autoplay
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
                          size={300}
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
        </Row>
      </Row>

      <Button type="primary">Salvar Alterações</Button>
    </>
  );
}
