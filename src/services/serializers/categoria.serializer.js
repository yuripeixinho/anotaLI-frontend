export default class CategoriaSerializer {

    fromJson(json) {
      const conta = {};
  
      Object.assign(
        conta,
        json.categoriaID && { categoriaID: json.categoriaID },
        json.nome && { nome: json.nome },

      );
  
      return conta;
    }
  
    toJson(conta) {
      debugger;
      const contaToJson = {};
  
      Object.assign(
        contaToJson,
     
      );
  
      return contaToJson;
    }
  }
  