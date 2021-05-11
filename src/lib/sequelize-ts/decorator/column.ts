/**
 * @description @Column 装饰器
 */

import { ReflectToolkit } from "@src/utils/reflect-toolkit";
import { ModelAttributeColumnOptions } from "sequelize/types";
export const ATTRIBUTES_KEY = Symbol("sequelize:attributes");

const Column = (options: ModelAttributeColumnOptions) => (
  target: any,
  propertyKey: string
) => {
  ReflectToolkit.addAttribute({
    nameSymbol: ATTRIBUTES_KEY,
    target,
    propertyKey,
    options,
  });
};

export { Column };
