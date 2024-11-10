import ProdutoSerializer from "./produto.serializer";

export default class PerfilContaSerializer {
  constructor() {
    this._produtoSerializer = new ProdutoSerializer();
  }

  fromJson(json) {
    debugger;
    const conta = {};

    Object.assign(
      conta,
      json.perfilContaID && { id: json.perfilContaID },
      json.nome && { nome: json.nome },
      json.qtdProdutos && { qtdProdutos: json.qtdProdutos },

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

    Object.assign(contaToJson, conta.nome && { nome: conta.nome });

    return contaToJson;
  }
}
