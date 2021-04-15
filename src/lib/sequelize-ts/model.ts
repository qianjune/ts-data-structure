import { Model } from "sequelize";
import { ATTRIBUTES_KEY, INIT_OPTIONS_KEY } from ".";
class JModel extends Model {
  static register() {
    const initOptions = Reflect.getMetadata(INIT_OPTIONS_KEY, JModel.prototype);
    console.log(initOptions, "initOptions...");
    const attributes = Reflect.getMetadata(ATTRIBUTES_KEY, JModel.prototype);
    console.log(attributes, "attributes...");
  }
}

export { JModel as Model };
