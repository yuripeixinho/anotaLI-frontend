import CoreApiService from "./core-api.service";
import PerfilContaSerializer from "./serializers/perfiConta.serializer";

export default class PerfilContaService extends CoreApiService {
  constructor() {
    super("perfis", "contas", new PerfilContaSerializer());
  }
}