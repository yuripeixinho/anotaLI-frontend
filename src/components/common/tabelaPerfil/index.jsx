import { UserOutlined } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-components";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";

export default function TabelaPerfil({ data }) {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(data || []);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const columns = [
    {
      title: "Feira",
      key: "feira",
      dataIndex: "feiraNome",
      readonly: true,
      editable: (text, record, index) => {
        return false;
      },

      render: (nome) => <span className="nome-feira">{nome}</span>,
    },
    {
      title: "Produto",
      key: "nome",
      dataIndex: "nome",
      render: (nome) => (
        <div className="produto-container">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="produto-info">
            <span className="nome-produto">{nome}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      render: (descricao) => (
        <span className="descricao-produto">{descricao}</span>
      ),
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
      render: (quantidade) => (
        <div className="unidade-container">{quantidade}</div>
      ),
    },
    {
      title: "Unidade",
      dataIndex: "unidade",
      key: "unidade",
      render: (unidade) => <div className="unidade-container">{unidade}</div>,
    },
    {
      title: "Categoria",
      key: "categoria",
      dataIndex: "categoria",
      render: (categoria) => (
        <div className="unidade-container">
          {categoria ? categoria.nome : "N/A"}
        </div>
      ),
    },
  ];

  return (
    <EditableProTable
      className="tabela-feira"
      rowKey="id"
      scroll={{ x: 960, y: 600 }}
      recordCreatorProps={{
        style: { display: "none" },
      }}
      loading={false}
      columns={columns}
      value={dataSource}
      onChange={(props, data) => {
        console.log(props, data);
      }}
      editable={{
        type: "multiple",
        editableKeys,
        onChange: setEditableRowKeys,
      }}
    />
  );
}
