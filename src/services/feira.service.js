import CoreApiService from "./core-api.service";
import FeiraSerializer from "./serializers/feira.serializer";

export default class FeiraService extends CoreApiService {
  constructor() {
    super("contas", "feiras", new FeiraSerializer());
  }
}