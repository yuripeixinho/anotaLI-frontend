export default class FeiraSerializer {
  fromJson(json) {
    const feira = {};

    Object.assign(
      feira,
      json.feiraID && { id: json.feiraID },
      json.nome && { title: json.nome },
      json.dataFim && { start: new Date(json.dataFim) },
      json.dataInicio && { end: new Date(json.dataInicio) }
    );

    return feira;
  }

  toJson(conta) {
    const contaToJson = {};

    Object.assign(
      contaToJson,
      conta.id && { contaID: conta.id },
      conta.email && { email: conta.email },
      conta.senha && { senha: conta.senha },
      conta.nome && { nome: conta.nome },
      conta.dataFim && { dataFim: new Date(conta.dataFim) },
      conta.dataInicio && { dataInicio: new Date(conta.dataInicio) }
    );

    return contaToJson;
  }
}
