import api from "./api.service";
import CoreApiService from "./core-api.service";
import ContaSerializer from "./serializers/conta.serializer";

export default class ContaService extends CoreApiService {
  constructor() {
    super(undefined, "contas", new ContaSerializer());
  }

  async login(item) {
    // debugger;
    const response = await api.post("login", this.serializer.toJson(item));

    const data = response.data;

    return this.serializer.fromJson(data);
  }

  async cadastro(item) {
    const response = await api.post("registrar", this.serializer.toJson(item));

    const data = response.data;

    return this.serializer.fromJson(data);
  }
}
