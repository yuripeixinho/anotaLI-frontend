import { UserOutlined } from "@ant-design/icons";
import { EditableProTable } from "@ant-design/pro-components";
import { Avatar, Dropdown, Input, InputNumber, Menu, Select } from "antd";
import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./styles.scss";
import CategoriaService from "../../../services/categoria.service";
import PerfilContaService from "../../../services/perfilConta.service";
import ProdutoService from "../../../services/produto.service";
import { useParams } from "react-router-dom";

export default function TabelaFeira({ data }) {
  const { contaID, feiraID } = useParams();
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState(data || []);
  const [categoriaSelect, setCategoriaSelect] = useState([]);
  const [perfilSelect, setPerfilSelect] = useState([]);

  const _produtoService = new ProdutoService();

  useEffect(() => {
    const _categoriaService = new CategoriaService();
    const _perfilContaService = new PerfilContaService();

    async function init() {
      const responseCategoriaService =
        await _categoriaService.listCategoriasNaoVinculadas();
      setCategoriaSelect(responseCategoriaService);

      const responsePerfilContaService = await _perfilContaService.listSub(
        contaID
      );
      setPerfilSelect(responsePerfilContaService);
    }

    init();
    setDataSource(data);
  }, [data]);

  console.log(perfilSelect);

  async function handleCriarProduto(values) {
    values.feiraID = feiraID;
    delete values.id;

    const perfilConta = {
      id: values.perfilConta,
    };

    values.perfilConta = perfilConta;

    await _produtoService
      .criarProduto(values, contaID)
      .then((res) => {
        setDataSource((prevData) => [
          ...prevData,
          {
            ...values,
            id: res.id,
            categoria: categoriaSelect.find(
              (cat) => cat.categoriaID === values.categoria
            ),
            perfilConta: perfilSelect.find(
              (pc) => pc.id === values.perfilConta.id
            ),
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleEditarProduto(values) {
    debugger;
    values.feiraID = feiraID;

    let perfilConta;

    if (typeof values.perfilConta === "object") {
      perfilConta = values.perfilContaID = values.perfilConta.id;
    } else {
      perfilConta = values.perfilConta;
    }

    // quando nao troca seleciona a categoria, ele retorna como um objeto
    if (typeof values.categoria === "object") {
      const categoriaID = (values.categoriaID = values.categoria.categoriaID);

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
                      (cat) => cat.categoriaID === categoriaID
                    ),
                    perfilConta: perfilSelect.find(
                      (pc) => pc.id === perfilConta
                    ),
                  }
                : item
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      values.categoriaID = values.categoria;

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
                    perfilConta: perfilSelect.find(
                      (pc) => pc.id === perfilConta
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
      title: "Usuário",
      key: "perfilConta",
      dataIndex: "perfilConta",
      render: (perfilConta) => (
        <div className="produto-container">
          {console.log(perfilConta)}
          <Avatar
            size="large"
            src={perfilConta?.imagemPerfil?.caminhoImagem}
          />
          <div className="produto-info">
            <span className="nome-produto">
              {perfilConta ? perfilConta.nome : "N/A"}
            </span>
          </div>
        </div>
      ),
      renderFormItem: (item, { value, onChange }) => {
        return (
          <Select
            showSearch
            value={value ? value.perfilContaID : undefined}
            optionFilterProp="label"
            onChange={(val) => onChange?.(val)}
            placeholder="Selecione o perfil"
            options={perfilSelect}
          />
        );
      },
    },
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
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
      render: (descricao) => <span>{descricao}</span>,
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
      key: "categoria",
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
            value={value ? value.categoriaID : undefined}
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
            <span onClick={(e) => e.preventDefault()}>
              <MoreVertIcon className="more-vert-icon categoria-more-icon" />
            </span>
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

  const handleSave = async (rowKey, data, row) => {
    const quantidadeItens = Object.keys(row).length;

    if (quantidadeItens > 2) {
      handleEditarProduto(data);
    } else {
      handleCriarProduto(data);
    }
  };

  return (
    <EditableProTable
      className="tabela-feira"
      rowKey="id"
      scroll={{ x: 960, y: 600 }}
      recordCreatorProps={{
        position: "top",
        creatorButtonText: "Novo Produto",
        className: "botao-adicionar",
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
        onSave: handleSave, // Usa o método handleSave
        onChange: setEditableRowKeys,
        saveText: "Salvar",
        cancelText: "Cancelar",
        deleteText: "Deletar",
      }}
    />
  );
}
