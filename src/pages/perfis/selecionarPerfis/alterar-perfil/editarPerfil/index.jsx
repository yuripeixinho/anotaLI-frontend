import { Col, Row, Button } from "antd";
import { useParams } from "react-router-dom";
// import "./styles.scss";

export default function EditarPerfil() {
  const { perfilId } = useParams();

  const handleSelecionarFoto = (foto) => {
    // Função para salvar a foto selecionada (você pode integrar com uma API aqui)
    console.log(`Foto ${foto} selecionada para o perfil ${perfilId}`);
  };

  return (
    <>
      <h1 className="titulo">Editar Perfil - {perfilId}</h1>
      <h2>Escolha sua foto de perfil</h2>
      <Row justify={"space-between"} className="profile-photo-gallery">
        {/* Aqui você renderizaria as imagens de perfil */}
        {["foto1.jpg", "foto2.jpg", "foto3.jpg"].map((foto, index) => (
          <Col key={index} xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
            <img
              src={`/path/to/${foto}`}
              alt={`Foto ${index + 1}`}
              className="profile-photo"
              onClick={() => handleSelecionarFoto(foto)}
              style={{ cursor: "pointer" }}
            />
          </Col>
        ))}
      </Row>
      <Button type="primary">Salvar Alterações</Button>
    </>
  );
}
