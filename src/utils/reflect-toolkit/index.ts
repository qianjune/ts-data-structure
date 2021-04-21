/**
 * @description Reflect toolkit
 */

import { cloneDeep } from "lodash";

class ReflectToolkit {
  /**
   * Returns model attributes from class by restoring this
   * information from reflect metadata
   */
  static getAttributes(target: any, nameSymbol: symbol): any | undefined {
    const attributes = Reflect.getMetadata(nameSymbol, target);
    return cloneDeep(attributes);
    if (attributes) {
      return Object.keys(attributes).reduce((copy, key) => {
        const cloneCopy: { [keyName: string]: any } = cloneDeep(copy);
        cloneCopy[key] = { ...attributes[key] };

        return copy;
      }, {});
    }
  }

  /**
   * Sets attributes
   */
  static setAttributes(target: any, attributes: any, nameSymbol: symbol): void {
    Reflect.defineMetadata(nameSymbol, { ...attributes }, target);
  }

  /**
   * Adds model attribute by specified property name and
   * sequelize attribute options and stores this information
   * through reflect metadata
   */
  static addAttribute(conf: {
    target: any;
    propertyKey: string;
    options: any;
    nameSymbol: symbol;
  }): void {
    const { target, propertyKey, options, nameSymbol } = conf;
    let attributes = ReflectToolkit.getAttributes(target, nameSymbol);

    if (!attributes) {
      attributes = {};
    }
    attributes[propertyKey] = { ...options };
    // console.log(attributes);
    ReflectToolkit.setAttributes(target, attributes, nameSymbol);
  }
}

export { ReflectToolkit };
