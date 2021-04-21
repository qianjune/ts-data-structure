import { saveConvertData } from "@src/utils/trantor/saveConvertData";
import { cloneDeep } from "lodash";
import { Model } from "sequelize/types";
import { ATTRIBUTES_KEY } from "./decorator/column";
import { INIT_OPTIONS_KEY } from "./decorator/table";

export * from "./decorator/index";
export * from "./model";

export const init = (Db: any) => {
  const initOptions = Reflect.getMetadata(INIT_OPTIONS_KEY, Db.prototype);
  // console.log(initOptions, "INIT_OPTIONS_KEY...");
  const attributes = Reflect.getMetadata(ATTRIBUTES_KEY, Db.prototype);

  const cloneAttributes = cloneDeep(attributes);
  console.log(Db.name, cloneAttributes);
  saveConvertData(Db.name, cloneAttributes);

  // console.log(attributes, "ATTRIBUTES_KEY...");
  Db.init(attributes, initOptions);
};
