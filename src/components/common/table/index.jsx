import { SmileOutlined, UserOutlined } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-components";
import {
  Avatar,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Select,
  Space,
  Tag,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./styles.scss";
import CategoriaService from "../../../services/categoria.service";
import ProdutoService from "../../../services/produto.service";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/anotaLiAuthContext";

export default function TabelaFeira({ data }) {
  const { perfilId  } = useAuth();
  const { contaID, feiraID } = useParams();
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(data || []);
  const [categoriaSelect, setCategoriaSelect] = useState([]);

  useEffect(() => {
    const _categoriaService = new CategoriaService();

    async function init() {
      const responseCategoriaService =
        await _categoriaService.listCategoriasNaoVinculadas();
      setCategoriaSelect(responseCategoriaService);
    }

    init();
    setDataSource(data);
  }, [data]);

  const handleEdit = (record) => {
    console.log("Editar item:", record);
  };

  async function handleCriarProduto(values) {
    debugger;
    const _produtoService = new ProdutoService();

    values.perfilID = perfilId;
    values.feiraID = feiraID;

    await _produtoService
      .criarProduto(values, contaID)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  // Função de deleção
  const handleDelete = (record) => {
    console.log("Deletar item:", record);
    setDataSource(dataSource.filter((item) => item.id !== record.id));
  };

  const menu = (text, record, _, action, categoria) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              onClick={() => {
                action?.startEditable?.(record.id);
              }}
            >
              Editar
            </a>
          ),
        },
        {
          key: "2",
          danger: true,
          label: <a onClick={() => handleDelete(record)}>Deletar</a>,
        },
      ]}
    />
  );

  const columns = [
    {
      title: "Produto",
      dataIndex: "nome",
      width: "25%",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: "obrigatorio" }] : [],
        };
      },
      // editable: (text, record, index) => {
      //   return console.log(text);
      // },
      render: (produto) => (
        <div className="produto-container">
          <Avatar size="large" icon={<UserOutlined />} />

          <div className="produto-info">
            <span className="nome-produto">{produto}</span>
            <span className="descricao-produto">preto e carioca</span>
          </div>
        </div>
      ),

      renderFormItem: (item, { value, onChange }) => {
        return (
          <Input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Digite o nome"
          />
        );
      },
    },
    {
      title: "Detalhes",
      dataIndex: "quantidade",
      key: "quantidade",
      render: (quantidade) => (
        <div className="unidade-container">{quantidade}</div>
      ),
      width: "10%",

      renderFormItem: (item, { value, onChange }) => {
        return (
          <InputNumber
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Quantidade"
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "unidade",
      key: "unidade",
      render: (unidade) => <div className="unidade-container">{unidade}</div>,
      width: "15%",

      renderFormItem: (item, { value, onChange }) => {
        return (
          <Input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Unidade"
          />
        );
      },
    },
    {
      title: "Categoria",
      key: "categoriaID",
      dataIndex: "categoria",
      render: (text, record, _, action) => (
        <div className="categoria-wrapper">
          <span className="categoria-tag">{record?.categoria?.nome}</span>

          <Dropdown overlay={menu(text, record, _, action)} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <MoreVertIcon className="more-vert-icon categoria-more-icon" />
            </a>
          </Dropdown>
        </div>
      ),

      renderFormItem: (item, { value, onChange }) => {
        return (
          <Select
            value={value}
            onChange={(val) => onChange?.(val)}
            placeholder="Selecione a categoria"
            options={categoriaSelect.map((cat) => ({
              label: cat.nome,
              value: cat.categoriaID,
            }))}
          />
        );
      },
    },
    {
      title: "",
      valueType: "option",
    },
  ];

  return (
    <EditableProTable
      className="tabela-feira"
      rowKey="id"
      scroll={{ x: 960, y: 600 }}
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
          handleCriarProduto(data);
        },
        onChange: setEditableRowKeys,
        saveText: "Salvar",
        cancelText: "Cancelar",
        deleteText: "Deletar",
      }}
    />
  );
}
