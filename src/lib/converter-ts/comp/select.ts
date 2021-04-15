/**
 * @description Select组件注解
 */
import { ReflectToolkit } from "@src/utils/reflect-toolkit";
import { FormItemInterface } from "../interface";
export const ATTRIBUTES_KEY = Symbol("formItem:conf");
const Select = (conf: FormItemInterface) => (
  target: any,
  propertyKey: string
) => {
  ReflectToolkit.addAttribute({
    nameSymbol: ATTRIBUTES_KEY,
    target,
    propertyKey,
    options: { ...conf, type: "select" },
  });
};

export { Select };
