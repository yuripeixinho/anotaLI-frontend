export default class PerfilContaSerializer {
  fromJson(json) {
    const conta = {};

    Object.assign(
      conta,
      json.perfilContaID && { id: json.perfilContaID },
      json.nome && { nome: json.nome },
      json.qtdProdutos && { qtdProdutos: json.qtdProdutos }
    );

    return conta;
  }

  toJson(conta) {
    const contaToJson = {};

    Object.assign(contaToJson, conta.nome && { nome: conta.nome });

    return contaToJson;
  }
}
