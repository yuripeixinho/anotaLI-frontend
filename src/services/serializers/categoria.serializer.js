export default class CategoriaSerializer {
  fromJson(json) {
    const conta = {};

    Object.assign(
      conta,
      json.categoriaID && { categoriaID: json.categoriaID },
      json.nome && { nome: json.nome },
      json.categoriaID && { value: json.categoriaID },
      json.nome && { label: json.nome }
    );

    return conta;
  }

  toJson(conta) {
    const contaToJson = {};

    Object.assign(contaToJson);

    return contaToJson;
  }
}
