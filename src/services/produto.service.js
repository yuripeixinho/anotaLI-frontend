import api from "./api.service";
import CoreApiService from "./core-api.service";
import ProdutoSerializer from "./serializers/produto.serializer";

export default class ProdutoService extends CoreApiService {
  constructor() {
    super(undefined, "produtos", new ProdutoSerializer());
  }

  async listByConta(parentId, queryOptions = null, isListView = null) {
    const response = await api.get(
      `contas/${parentId}/produtos?${
        (queryOptions && queryOptions.toQueryString()) || ""
      }`
    );

    const data = response.data;

    if (data.hasOwnProperty("items") && isListView) {
      return this.convertData(data, data._meta);
    } else if (data.hasOwnProperty("items")) {
      return this.convertData(data.items);
    } else {
      return this.convertData(data);
    }
  }

  async listByPerfilConta(parentId, queryOptions = null, isListView = null) {
    const response = await api.get(
      `perfilcontas/${parentId}/produtos?${
        (queryOptions && queryOptions.toQueryString()) || ""
      }`
    );

    const data = response.data;

    if (data.hasOwnProperty("items") && isListView) {
      return this.convertData(data, data._meta);
    } else if (data.hasOwnProperty("items")) {
      return this.convertData(data.items);
    } else {
      return this.convertData(data);
    }
  }

  
  async listByFeira(contaID, feiraID, parentId, queryOptions = null, isListView = null) {
    const response = await api.get(
      `contas/${contaID}/feiras/${feiraID}/produtos?${
        (queryOptions && queryOptions.toQueryString()) || ""
      }`
    );

    const data = response.data;

    if (data.hasOwnProperty("items") && isListView) {
      return this.convertData(data, data._meta);
    } else if (data.hasOwnProperty("items")) {
      return this.convertData(data.items);
    } else {
      return this.convertData(data);
    }
  }

  async criarProduto(item, contaID, isFormData = false) {
    debugger
    const response = await api.post(
      `contas/${contaID}/${this.endpoint}`,
      isFormData
        ? this.serializer.toFormData(item)
        : this.serializer.toJson(item)
    );
    debugger

    const data = response.data;

    return this.serializer.fromJson(data);
  }

}
