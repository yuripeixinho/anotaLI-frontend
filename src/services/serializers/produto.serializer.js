import CategoriaSerializer from "./categoria.serializer";

export default class ProdutoSerializer {
  constructor() {
    this._categoriaSerializer = new CategoriaSerializer();
  }

  fromJson(json) {
    const conta = {};

    Object.assign(
      conta,
      json.produtoID && { id: json.produtoID },
      json.nome && { nome: json.nome },
      json.quantidade && { quantidade: json.quantidade },
      json.unidade && { unidade: json.unidade },

      json.categoria && {
        categoria: this._categoriaSerializer.fromJson(json.categoria),
      }
    );

    return conta;
  }

  toJson(conta) {
    const contaToJson = {};

    Object.assign(contaToJson);

    return contaToJson;
  }
}
