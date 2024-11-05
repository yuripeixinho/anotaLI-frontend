import moment from "moment-timezone";
import ProdutoSerializer from "./produto.serializer";

export default class FeiraSerializer {
  constructor() {
    this._produtoSerializer = new ProdutoSerializer();
  }

  fromJson(json) {
    const feira = {};
    debugger;
    Object.assign(
      feira,
      json.feiraID && { id: json.feiraID },
      json.nome && { title: json.nome },
      json.dataFim && {
        end: moment.utc(json.dataFim).toDate(), // Interpreta a data em UTC
      },
      json.dataInicio && {
        start: moment.utc(json.dataInicio).toDate(), // Interpreta a data em UTC
      },
      json.produtos && {
        produtos: json.produtos.map((item) =>
          this._produtoSerializer.fromJson(item)
        ),
      },
      json.feiraID && { feiraID: json.feiraID },
      json.nome && { nome: json.nome }
    );
    return feira;
  }

  toJson(conta) {
    const contaToJson = {};
    debugger;
    Object.assign(
      contaToJson,
      conta.id && { contaID: conta.id },
      conta.email && { email: conta.email },
      conta.senha && { senha: conta.senha },
      conta.nome && { nome: conta.nome },
      conta.categoriaID && { categoriaID: conta.categoriaID },
      conta.perfilContaID && { perfilContaID: conta.perfilContaID },
      conta.dataFim && {
        dataFim: moment.utc(conta.dataFim).toISOString(), // Salva a data em UTC
      },
      conta.dataInicio && {
        dataInicio: moment.utc(conta.dataInicio).toISOString(), // Salva a data em UTC
      },
      conta.produtos
        ? {
            produto: conta.produtos.map((item) =>
              this._produtoSerializer.toJson(item)
            ),
          }
        : []
    );

    return contaToJson;
  }
}
