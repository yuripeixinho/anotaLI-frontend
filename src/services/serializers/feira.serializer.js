import moment from "moment-timezone";

export default class FeiraSerializer {
  fromJson(json) {
    const feira = {};

    Object.assign(
      feira,
      json.feiraID && { id: json.feiraID },
      json.nome && { title: json.nome },
      json.dataFim && {
        end: moment.utc(json.dataFim).toDate(), // Interpreta a data em UTC
      },
      json.dataInicio && {
        start: moment.utc(json.dataInicio).toDate(), // Interpreta a data em UTC
      }
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
      conta.dataFim && {
        dataFim: moment.utc(conta.dataFim).toISOString(), // Salva a data em UTC
      },
      conta.dataInicio && {
        dataInicio: moment.utc(conta.dataInicio).toISOString(), // Salva a data em UTC
      }
    );

    return contaToJson;
  }
}
