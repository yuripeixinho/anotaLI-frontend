import { Avatar, Col, Row } from "antd";
import DefaultRenderEmpty from "antd/es/config-provider/defaultRenderEmpty";
import { useEffect, useState } from "react";
import PerfilContaService from "../../services/perfilConta.service";
import { useNavigate, useParams } from "react-router-dom";

export default function SelecionarPerfis() {
  const { id } = useParams();
  const [perfisConta, setPerfisConta] = useState([]);

  let navigate = useNavigate();


  useEffect(() => {
    debugger;
    const _perfisContaService = new PerfilContaService();

    async function init() {
      const responsePerfilContaService = await _perfisContaService.listSub(id);
      setPerfisConta(responsePerfilContaService);
    }

    init();
  }, [id]);

  return (
    <div>
      {perfisConta.map((perfil) => (
        <Col span={6}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<DefaultRenderEmpty />}
            onClick={() => navigate(`/home/perfil-conta/${perfil.id}/produtos`)}
          />

          <span>{perfil.nome}</span>
        </Col>
      ))}
    </div>
  );
}
