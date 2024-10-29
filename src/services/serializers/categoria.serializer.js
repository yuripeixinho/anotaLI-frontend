export default class CategoriaSerializer {

    fromJson(json) {
    debugger;
      const conta = {};
  
      Object.assign(
        conta,
        json.categoriaID && { categoriaID: json.categoriaID },
        json.nome && { nome: json.nome },

      );
  
      return conta;
    }
  
    toJson(conta) {
      const contaToJson = {};
  
      Object.assign(
        contaToJson,
     
      );
  
      return contaToJson;
    }
  }
  