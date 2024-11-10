import CoreApiService from "./core-api.service";
import PerfilContaSerializer from "./serializers/perfiConta.serializer";
import api from "./api.service";

export default class PerfilContaService extends CoreApiService {
  constructor() {
    super("contas", "perfis", new PerfilContaSerializer());
  }

  async atualizarPerfilConta(item, idConta, idPerfilConta) {
    const response = await api.put(
      `${this.parentEndpoint}/${idConta}/${this.endpoint}/${idPerfilConta}`,
      this.serializer.toJson(item)
    );
    const data = response.data;

    return this.serializer.fromJson(data);
  }

  async deletarPerfilConta(idConta, idPerfilConta) {
    const response = await api.delete(
      `contas/${idConta}/perfis/${idPerfilConta}`
    );

    return response;
  }
}
