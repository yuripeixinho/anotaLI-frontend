import { UserOutlined } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-components";
import { Avatar, Dropdown, Input, InputNumber, Menu, Select } from "antd";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./styles.scss";
import CategoriaService from "../../../services/categoria.service";
import ProdutoService from "../../../services/produto.service";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../context/anotaLiAuthContext";

export default function TabelaFeira({ data }) {
  const { perfilId } = useAuth();
  const { contaID, feiraID } = useParams();
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(data || []);
  const [categoriaSelect, setCategoriaSelect] = useState([]);

  const _produtoService = new ProdutoService();

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

  async function handleCriarProduto(values) {
    values.perfilID = perfilId;
    values.feiraID = feiraID;

    await _produtoService
      .criarProduto(values, contaID)
      .then((res) => {
        setDataSource((prevData) => [
          ...prevData,
          {
            ...values,
            id: res.id,
            categoria: categoriaSelect.find(
              (cat) => cat.categoriaID === values.categoriaID
            ),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleEditarProduto(values) {
    values.perfilID = perfilId;
    values.feiraID = feiraID;

    delete values.categoria;

    await _produtoService
      .editarProduto(contaID, values.id, values)
      .then((res) => {
        setDataSource((prevData) =>
          prevData.map((item) =>
            item.id === res.id
              ? {
                  ...item,
                  ...values,
                  categoria: categoriaSelect.find(
                    (cat) => cat.categoriaID === values.categoriaID
                  ),
                }
              : item
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = (record) => {
    _produtoService
      .deleteProduto(record.id, contaID)
      .then((res) => {
        setDataSource((prevData) =>
          prevData.filter((item) => item.id !== record.id)
        );
      })
      .catch((err) => {
        console.error("Erro ao deletar o produto:", err);
      });
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
      key: "nome",
      dataIndex: "nome",
      width: "20%",
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: [
            { required: true, message: "Campo obrigatório" },
            { max: 30, message: "Campo deve ter no máximo 30 caracteres" },
          ],
        };
      },
      render: (nome) => (
        <div className="produto-container">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="produto-info">
            <span className="nome-produto">{nome}</span>
          </div>
        </div>
      ),
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Nome do produto"
          />
        );
      },
    },

    {
      title: "Usuário",
      key: "usuario",
      dataIndex: "nome",
      width: "20%",
      render: (nome) => (
        <div className="produto-container">
          <Avatar size="large" icon={<UserOutlined />} />
          <div className="produto-info">
            <span>Yuri Peixinho</span>
          </div>
        </div>
      ),
      renderFormItem: (item, { value, onChange }) => (
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Nome do produto"
        />
      ),
    },

    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      render: (descricao) => (
        <span className="descricao-produto">{descricao}</span>
      ),
      width: "15%",
      formItemProps: () => ({
        rules: [{ max: 60, message: "Campo deve ter no máximo 60 caracteres" }],
      }),
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Input
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Descrição"
          />
        );
      },
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      key: "quantidade",
      render: (quantidade) => (
        <div className="unidade-container">{quantidade}</div>
      ),
      width: "10%",
      formItemProps: () => ({
        rules: [
          { required: true, message: "Campo obrigatório" },
          {
            type: "number",
            min: 1,
            message: "A quantidade deve ser maior que zero",
          },
        ],
      }),
      renderFormItem: (item, { value, onChange }) => {
        return (
          <InputNumber
            style={{
              width: "100%",
            }}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder="Quantidade"
          />
        );
      },
    },
    {
      title: "Unidade",
      dataIndex: "unidade",
      key: "unidade",
      render: (unidade) => <div className="unidade-container">{unidade}</div>,
      width: "10%",
      formItemProps: () => ({
        rules: [{ max: 10, message: "Campo deve ter no máximo 10 caracteres" }],
      }),
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
      render: (categoria) => (
        <div className="unidade-container">
          {categoria ? categoria.nome : "N/A"}
        </div>
      ),
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Select
            showSearch
            value={value ? value.categoriaID : undefined} // Use o ID da categoria
            optionFilterProp="label"
            onChange={(val) => onChange?.(val)}
            placeholder="Selecione a categoria"
            options={categoriaSelect}
          />
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      width: "5%",
      render: (text, record, _, action) => {
        return (
          <Dropdown overlay={menu(text, record, _, action)} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <MoreVertIcon className="more-vert-icon categoria-more-icon" />
            </a>
          </Dropdown>
        );
      },
      renderFormItem: (item, { value, onChange }) => {
        return null;
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
        // style: { display: "none" },
        record: () => ({ id: Date.now() }),
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
        deletePopconfirmMessage: "Deletar este item?",

        onDelete: async (row, data) => {
          handleDelete(data);
        },
        onSave: async (rowKey, data, row) => {
          if (data.categoria) {
            return handleEditarProduto(data);
          } else {
            handleCriarProduto(data);
          }
        },
        onChange: setEditableRowKeys,
        saveText: "Salvar",
        cancelText: "Cancelar",
        deleteText: "Deletar",
      }}
    />
  );
}
