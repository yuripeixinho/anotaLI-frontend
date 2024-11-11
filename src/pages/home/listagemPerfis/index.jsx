import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PerfilContaService from "../../../services/perfilConta.service";
import { Avatar, Col, Row, Carousel, Flex } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import avatarGeneric from "../../../assets/predefinedUsersPictures/genericDesignSystem/avatar-veiaco-card-1.png";

import "./styles.scss";
import { useAuth } from "../../../context/anotaLiAuthContext";

export default function GraficoPerfis() {
  const { perfilId } = useAuth();
  const { contaID } = useParams();
  const [perfis, setPerfis] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const _perfilContaService = new PerfilContaService();

    async function init() {
      const perfilConta = await _perfilContaService.listSub(contaID);

      setPerfis(perfilConta);
    }

    init();
  }, [contaID]);

  return (
    <Row className="grafico-perfis" justify="center">
      {perfis.length > 4 ? (
        <Col
          span={24}
          className="carrossel-container"
          style={{ padding: "20px 6px" }}
        >
          <Carousel slidesToShow={3} arrows={true} dots={false}>
            {perfis.map(
              (perfil) =>
                perfil.id !== perfilId && (
                  <div key={perfil.id} className="carrossel-item">
                    <Col
                      className="perfil-item"
                      xs={24}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={4}
                    >
                      <Flex
                        vertical
                        justify="center"
                        style={{ width: "130px" }}
                      >
                        <Avatar
                          size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                            xxl: 80,
                          }}
                          icon={<AntDesignOutlined />}
                          src={avatarGeneric}
                          style={{ margin: "0 auto" }}
                          onClick={() =>
                            navigate(`/perfis/${contaID}/${perfil.id}`)
                          }
                        />
                        <Col
                          span={24}
                          className="grafico-perfis-texto-container"
                        >
                          <h3>{perfil.nome}</h3>
                        </Col>
                      </Flex>
                    </Col>
                  </div>
                )
            )}
          </Carousel>
        </Col>
      ) : (
        perfis.map(
          (perfil) =>
            perfil.id !== perfilId && (
              <Col
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={8}
                xxl={8}
                key={perfil.id}
                className="container-usuarios-sem-carrosel"
                onClick={() => navigate(`/perfis/${contaID}/${perfil.id}`)}
              >
                <Avatar
                  size={{
                    xs: 80,
                    sm: 110,
                    md: 110,
                    lg: 160,
                    xl: 100,
                    xxl: 100,
                  }}
                  icon={<AntDesignOutlined />}
                  src={perfil?.imagemPerfil?.caminhoImagem}
                  className="avatar-usuarios-sem-carrosel"
                />
                <Col span={24} className="grafico-perfis-texto-container">
                  <h3>{perfil.nome}</h3>
                </Col>
              </Col>
            )
        )
      )}
    </Row>
  );
}
