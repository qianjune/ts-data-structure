/**
 * @description @Table 装饰器
 */

import { InitOptions } from "sequelize/types";
import { ClassType } from "type-graphql";
export const INIT_OPTIONS_KEY = Symbol("sequelize:attributes");

const Table = (config: InitOptions) => (target: ClassType) => {
  Reflect.defineMetadata(INIT_OPTIONS_KEY, { ...config }, target.prototype);
};

export { Table };
