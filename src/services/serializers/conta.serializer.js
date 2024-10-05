export default class ContaSerializer {

    fromJson(json) {
      const conta = {};
      
      Object.assign(
        conta,
        json.contaID && { id: json.contaID },
        json.email && { email: json.email },
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