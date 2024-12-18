import { Col, Row, Avatar, Carousel, Flex, Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./styles.scss";
import { useAuth } from "../../../../../context/anotaLiAuthContext";
import PerfilContaService from "../../../../../services/perfilConta.service";
import { useEffect, useState } from "react";

export default function EditarPerfil() {
  const { perfilId } = useParams();
  const { usuario } = useAuth();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nome = query.get("nome");
  const [perfilConta, setPerfilConta] = useState({});

  useEffect(() => {
    const _perfilContaService = new PerfilContaService();

    async function init() {
      const responsePerfilConta = await _perfilContaService.read(perfilId);
      setPerfilConta(responsePerfilConta);
    }

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleSelecionarFoto = async (foto) => {
    try {
      const _perfilContaService = new PerfilContaService();

      await _perfilContaService
        .atualizarPerfilConta(
          { nome: nome, imagemPerfilID: foto.id },
          usuario.id,
          perfilId
        )
        .then((res) => {
          navigate(`/${usuario.id}/perfis`);
        });
    } catch (err) {
      // Lida com o erro
      const message =
        err?.response?.data?.Message ||
        "Credenciais inválidas. Tente novamente";
      console.error(message);
    }
  };

  const avatarAnotali = [
    { id: 1, imagem: "anotaliperfil1.png" },
    { id: 2, imagem: "anotaliperfil2.png" },
    { id: 3, imagem: "anotaliperfil3.png" },
    { id: 4, imagem: "anotaliperfil4.png" },
    { id: 5, imagem: "anotaliperfil5.png" },
    { id: 6, imagem: "anotaliperfil6.png" },
    { id: 7, imagem: "anotaliperfil7.png" },
  ];

  const avatarAnimal = [
    { id: 8, imagem: "animalprofile1.png" },
    { id: 9, imagem: "animalprofile2.png" },
    { id: 10, imagem: "animalprofile3.png" },
    { id: 11, imagem: "animalprofile4.png" },
    { id: 12, imagem: "animalprofile5.png" },
    { id: 13, imagem: "animalprofile6.png" },
    { id: 14, imagem: "animalprofile7.png" },
    { id: 15, imagem: "animalprofile8.png" },
    { id: 16, imagem: "animalprofile9.png" },
  ];

  return (
    <div className="editar-perfil-container">
      <Row>
        <Col span={24}>
          <Flex justify="right">
            <button
              style={{ cursor: "pointer" }}
              className="btn-gerenciar-perfil"
              onClick={() => {
                navigate(`/${usuario?.id}/perfis`);
              }}
            >
              Voltar
            </button>
          </Flex>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ paddingBottom: "16px" }}>
          <Row justify={"space-between"} align={"middle"}>
            <Col>
              <h1 className="titulo-editar-perfil">Escolha o avatar</h1>
            </Col>
            <Col>
              <Flex justify="space-between" align="center" gap={10}>
                <Typography className="usuario-nome">{nome}</Typography>
                <Avatar
                  src={
                    perfilConta?.imagemPerfil?.caminhoImagem ||
                    "/assets/imagens/perfis/default/defaultAvatar.png"
                  }
                  size={50}
                />
              </Flex>
            </Col>
          </Row>
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
              draggable={true}
              infinite
              responsive={[
                {
                  breakpoint: 1750, // Large screens
                  settings: { slidesToShow: 5 },
                },
                {
                  breakpoint: 1460, // Large screens
                  settings: { slidesToShow: 4 },
                },
                {
                  breakpoint: 1160, // Medium screens
                  settings: { slidesToShow: 3 },
                },
                {
                  breakpoint: 888, // Small screens
                  settings: { slidesToShow: 2 },
                },
                {
                  breakpoint: 576, // Extra small screens
                  settings: { slidesToShow: 1 },
                },
                {
                  breakpoint: 480, // Extra extra small screens
                  settings: { slidesToShow: 1 },
                },
              ]}
            >
              {avatarAnotali.map((item, index) => (
                <div key={index}>
                  <Row justify="center">
                    <Col>
                      <Avatar
                        src={`/assets/imagens/perfis/anotali/${item.imagem}`}
                        alt={`Foto ${index + 1}`}
                        size={320}
                        className="profile-photo"
                        onClick={() => handleSelecionarFoto(item)}
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
            <h2 className="subtitulo-avatares">Nossos avatares</h2>
          </Col>
          <Col>
            <Carousel
              dots={false}
              slidesToShow={6}
              slidesToScroll={1}
              arrows={true}
              infinite
              draggable={true}
              responsive={[
                {
                  breakpoint: 1750, // Large screens
                  settings: { slidesToShow: 5 },
                },
                {
                  breakpoint: 1460, // Large screens
                  settings: { slidesToShow: 4 },
                },
                {
                  breakpoint: 1160, // Medium screens
                  settings: { slidesToShow: 3 },
                },
                {
                  breakpoint: 888, // Small screens
                  settings: { slidesToShow: 2 },
                },
                {
                  breakpoint: 576, // Extra small screens
                  settings: { slidesToShow: 1 },
                },
                {
                  breakpoint: 480, // Extra extra small screens
                  settings: { slidesToShow: 1 },
                },
              ]}
            >
              {avatarAnimal.map((item, index) => (
                <div key={index}>
                  <Row justify="center">
                    <Col>
                      <Avatar
                        src={`/assets/imagens/perfis/animals/${item.imagem}`}
                        alt={`Foto ${index + 1}`}
                        size={320}
                        className="profile-photo"
                        onClick={() => handleSelecionarFoto(item)}
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
