export default class PerfilContaSerializer {

    fromJson(json) {
      debugger;
      const conta = {};
      
      Object.assign(
        conta,
        json.perfilContaID && { id: json.perfilContaID },
        json.nome && { nome: json.nome },
        json.qtdProdutos && { qtdProdutos: json.qtdProdutos },

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