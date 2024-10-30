import api from "./api.service";
import CoreApiService from "./core-api.service";
import CategoriaSerializer from "./serializers/categoria.serializer";

export default class CategoriaService extends CoreApiService {
  constructor() {
    super(undefined, "categorias", new CategoriaSerializer());
  }

  async listCategoriasNaoVinculadas(queryOptions = null, isListView = null) {
    const response = await api.get(
      `categorias-nao-vinculadas?${(queryOptions && queryOptions.toQueryString()) || ""}`
    );

    const data = response.data;

    if (data && isListView) {
      return this.convertData(data, data._meta);
    } else {
      return this.convertData(data);
    }
  }

}
