import { UserOutlined } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-components";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./styles.scss";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default function TabelaFeira({ data }) {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(data || []);

  // Atualiza o dataSource quando a prop "data" mudar
  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const columns = [
    {
      title: "Produto",
      dataIndex: "nome",
      width: "25%",
      render: (produto) => (
        <div className="produto-container">
          <Avatar size="large" icon={<UserOutlined />} />

          <div className="produto-info">
            <span className="nome-produto">{produto}</span>
            <span className="descricao-produto">preto e carioca</span>
          </div>
        </div>
      ),
    },
    {
      title: "Unidade",
      key: "action",
      render: (record) => (
        <div className="unidade-container">
          {record.quantidade} {record.unidade}
        </div>
      ),
      width: "15%",
    },
    {
      title: "Categoria",
      key: "categoria",
      dataIndex: "categoria",
      render: (categoria) => (
        <div className="categoria-wrapper">
          <span className="categoria-tag">{categoria?.nome}</span>

          <MoreVertIcon className="more-vert-icon categoria-more-icon" />
        </div>
      ),
    },
  ];

  return (
    <EditableProTable
      className="tabela-feira"
      rowKey="id"
      maxLength={5}
      scroll={{ x: 960 }}
      recordCreatorProps={{
        position: "bottom",
        creatorButtonText: "Novo Produto",
        className: "botao-adicionar",
        record: () => ({ id: Date.now() }),
      }}
      loading={false}
      columns={columns}
      value={dataSource}
      onChange={setDataSource}
      editable={{
        type: "multiple",
        editableKeys,
        onSave: async (rowKey, data, row) => {
          await waitTime(2000);
        },
        onChange: setEditableRowKeys,
        saveText: "Salvar",
        cancelText: "Cancelar",
        deleteText: "Deletar",
      }}
    />
  );
}
