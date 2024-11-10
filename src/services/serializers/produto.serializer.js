import CategoriaSerializer from "./categoria.serializer";
import PerfilContaSerializer from "./perfiConta.serializer";

export default class ProdutoSerializer {
  constructor() {
    this._categoriaSerializer = new CategoriaSerializer();
    // this._perfilContaSerializer = new PerfilContaSerializer();
  }

  fromJson(json) {
    debugger;
    const produto = {};
    Object.assign(
      produto,
      json.produtoID && { id: json.produtoID },
      json.nome && { nome: json.nome },
      json.descricao && { descricao: json.descricao },
      json.quantidade && { quantidade: json.quantidade },
      json.quantidadeUnidade && { quantidadeUnidade: json.quantidadeUnidade },
      json.unidade && { unidade: json.unidade },
      json.feiraID && { feiraID: json.feiraID },
      json.categoriaID && {
        categoriaID: json?.categoriaID,
      },
      json.feiraID && { feiraID: json.feiraID },
      json.categoria && {
        categoria: this._categoriaSerializer.fromJson(json.categoria),
      },
      json.perfilConta && { perfilConta: json.perfilContaID },
      json.perfilConta && {
        perfilConta: {
          perfilContaID: json.perfilConta.perfilContaID,
          nome: json.perfilConta.nome,
          value: json.perfilConta.perfilContaID,
          label: json.perfilConta.nome,
        },
      },

      json?.feira?.nome && {
        feiraNome: json.feira.nome,
      },
      json.feira && {
        feira: json.feira,
      }
    );

    return produto;
  }

  toJson(produto) {
    debugger;
    const produtoToJson = {};

    Object.assign(
      produtoToJson,
      produto.id && { produtoID: produto.id },
      produto.nome && { nome: produto.nome },
      produto.descricao && { descricao: produto.descricao },
      produto.quantidade && { quantidade: produto.quantidade },
      produto.unidade && { unidade: produto.unidade },

      produto.perfilConta && { perfilContaID: produto.perfilConta },

      produto.categoria && { categoriaID: produto.categoria },
      produto.categoriaID && { categoriaID: produto.categoriaID },

      produto.feiraID && { feiraID: produto.feiraID }
    );

    return produtoToJson;
  }
}
