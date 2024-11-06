import api from "./api.service";
import CoreApiService from "./core-api.service";
import FeiraSerializer from "./serializers/feira.serializer";

export default class FeiraService extends CoreApiService {
  constructor() {
    super("contas", "feiras", new FeiraSerializer());
  }

  async dragDataFeiraCalendario(id = null, item) {
    const ref = id ? id : item.id;
    const response = await api.put(
      `${this.parentEndpoint}/${ref}/${this.endpoint}/${item.id}`,
      this.serializer.toJson(item)
    );

    const data = response.data;
    return data.oret.map((item) => this.serializer.fromJson(item));
  }

  async atualizarFeira(item, idConta, idFeira) {
    const response = await api.put(
      `${this.parentEndpoint}/${idConta}/${this.endpoint}/${idFeira}`,
      this.serializer.toJson(item)
    );
    const data = response.data;

    return this.serializer.fromJson(data);
  }
}
