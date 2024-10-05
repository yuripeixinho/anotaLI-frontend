import CoreApiService from "./core-api.service";
import ContaSerializer from "./serializers/conta.serializer";

export default class ContaService extends CoreApiService {
  constructor() {
    super(undefined, "contas", new ContaSerializer());
  }
}