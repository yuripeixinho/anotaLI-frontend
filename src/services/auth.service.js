import api from "./api.service";
import CoreApiService from "./core-api.service";
import AuthSerializer from "./serializers/auth.serializer";

export default class AuthService extends CoreApiService {
  constructor() {
    super(undefined, "contas", new AuthSerializer());
  }

  async login(item) {
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
