export default class AuthSerializer {
  fromJson(json) {
    const conta = {};

    Object.assign(
      conta,
      json.id && { contaID: json.id },
      json.email && { email: json.email },
      json.token && { token: json.token }
    );

    return conta;
  }

  toJson(conta) {
    const contaToJson = {};
    debugger;
    Object.assign(
      contaToJson,
      conta.id && { contaID: conta.id },
      conta.email && { email: conta.email },
      conta.senha && { senha: conta.senha },
      conta?.perfilConta?.nome && { perfilConta: conta.perfilConta }
    );

    return contaToJson;
  }
}
