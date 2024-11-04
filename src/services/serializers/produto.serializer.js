import CategoriaSerializer from "./categoria.serializer";
import PerfilContaSerializer from "./perfiConta.serializer";

export default class ProdutoSerializer {
  constructor() {
    this._categoriaSerializer = new CategoriaSerializer();
    this._perfilContaSerializer = new PerfilContaSerializer();
  }

  fromJson(json) {
    const produto = {};
    debugger;
    Object.assign(
      produto,
      json.produtoID && { id: json.produtoID },
      json.nome && { nome: json.nome },
      json.descricao && { descricao: json.descricao },
      json.quantidade && { quantidade: json.quantidade },
      json.quantidadeUnidade && { quantidadeUnidade: json.quantidadeUnidade },
      json.unidade && { unidade: json.unidade },
      json.feiraID && { feiraID: json.feiraID },
      json.perfilContaID && { perfilID: json.perfilContaID },
      json.categoriaID && { categoriaID: json.categoriaID },
      json.feiraID && { feiraID: json.feiraID },
      json.categoria && {
        categoria: this._categoriaSerializer.fromJson(json.categoria),
      },
      json.perfilConta && {
        perfilConta: this._perfilContaSerializer.fromJson(json.perfilConta),
      }
    );
    debugger;

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
      produto.perfilID && { perfilContaID: produto.perfilID },
      produto.categoriaID && { categoriaID: produto.categoriaID },
      produto.feiraID && { feiraID: produto.feiraID }
    );

    return produtoToJson;
  }
}
