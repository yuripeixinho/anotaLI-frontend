export default class ProdutoSerializer {

    fromJson(json) {
      const conta = {};
      
      Object.assign(
        conta,
        json.produtoID && { id: json.produtoID },
        json.nome && { nome: json.nome },
        json.quantidade && { quantidade: json.quantidade },
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
