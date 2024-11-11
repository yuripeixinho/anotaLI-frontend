import ProdutoSerializer from "./produto.serializer";

export default class PerfilContaSerializer {
  constructor() {
    this._produtoSerializer = new ProdutoSerializer();
  }

  fromJson(json) {
    const conta = {};

    Object.assign(
      conta,
      json.perfilContaID && { id: json.perfilContaID },
      json.nome && { nome: json.nome },
      json.qtdProdutos && { qtdProdutos: json.qtdProdutos },
      json?.imagemPerfil && { imagemPerfil: json.imagemPerfil },
      json?.imagemPerfil && { imagemPerfilID: json.imagemPerfil.id },
      json.produtos && {
        produtos: json.produtos.map(
          (item) => this._produtoSerializer.fromJson(item)
        ),
      },

      json.perfilContaID && { value: json.perfilContaID },
      json.nome && { label: json.nome }
    );

    return conta;
  }

  toJson(conta) {
    const contaToJson = {};
    Object.assign(
      contaToJson,
      conta.nome && { nome: conta.nome },
      conta.imagemPerfilID && { imagemPerfilID: conta.imagemPerfilID }
    );

    return contaToJson;
  }
}
