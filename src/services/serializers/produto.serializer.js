import CategoriaSerializer from "./categoria.serializer";
import PerfilContaSerializer from "./perfiConta.serializer";

export default class ProdutoSerializer {
  constructor() {
    this._categoriaSerializer = new CategoriaSerializer();
  }

  fromJson(json) {
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
      json.perfilContaID && { perfilContaID: json.perfilContaID },
      json.perfilConta && {
        perfilConta: {
          perfilContaID: json.perfilConta.perfilContaID,
          nome: json.perfilConta.nome,
          value: json.perfilConta.perfilContaID,
          label: json.perfilConta.nome,
          imagemPerfil: {
            id: json.perfilConta.imagemPerfil?.id,
            caminhoImagem: json.perfilConta.imagemPerfil?.caminhoImagem,
          },
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
    const produtoToJson = {};
    debugger;
    Object.assign(
      produtoToJson,
      produto.id && { produtoID: produto.id },
      produto.nome && { nome: produto.nome },
      produto.descricao && { descricao: produto.descricao },
      produto.quantidade && { quantidade: produto.quantidade },
      produto.unidade && { unidade: produto.unidade },

      produto.perfilContaID && { perfilContaID: produto.perfilContaID },
      produto.categoriaID && { categoriaID: produto.categoriaID },

      produto.perfilConta && {
        perfilContaID: produto.perfilConta.perfilContaID,
      },

      produto.perfilID && { perfilContaID: produto.perfilID },

      produto.categoria && { categoriaID: produto.categoria.categoriaID },

      produto.feiraID && { feiraID: produto.feiraID }
    );

    return produtoToJson;
  }
}
