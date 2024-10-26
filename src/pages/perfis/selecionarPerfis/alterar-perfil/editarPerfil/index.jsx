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
    <div className='editar-perfil-container'>
      <Row>
        <Col span={24}>
          <Flex justify="right">  
            <button
              style={{ cursor: "pointer" }}
              className="btn-gerenciar-perfil"
            >
              Voltar
            </button>
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Flex justify="space-between" align="center">
            <Flex gap={50}>
              <h1 className="titulo-editar-perfil">Escolha o avatar</h1>
            </Flex>

            <Flex justify="space-between" align="center" gap={10}>
              <Typography className="usuario-nome">Yago Peixinho</Typography>
              <Avatar src={userPicture} size={50} />
            </Flex>
          </Flex>
        </Col>

        <Col>
          <Col>
            <h2 className="subtitulo-avatares">Destaques</h2>
          </Col>

          <Col>
            <Carousel
              dots={false}
              slidesToShow={6}
              slidesToScroll={1}
              arrows={true}
              infinite
            >
              {fotos.map((foto, index) => (
                <div key={index}>
                  <Row justify="center">
                    <Col>
                      <Avatar
                        src={`/assets/predefinedUsersPictures/genericDesignSystem/${foto}`}
                        alt={`Foto ${index + 1}`}
                        size={320}
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
            <h2 className="subtitulo-avatares">Destaques</h2>
          </Col>
          <Col>
            <Carousel
              dots={false}
              slidesToShow={6}
              slidesToScroll={1}
              arrows={true}
              infinite
            >
              {fotos.map((foto, index) => (
                <div key={index}>
                  <Row justify="center">
                    <Col>
                      <Avatar
                        src={`/assets/predefinedUsersPictures/genericDesignSystem/${foto}`}
                        alt={`Foto ${index + 1}`}
                        size={320}
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
    </div>
  );
}
