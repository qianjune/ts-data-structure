import { CommonManager, ListFilterInterface } from "../interface/commonManager";
import AttributeKey from "@src/db/models/v2/product/attribute_key";
import { ManagerResponse, ResponseMsg, ManagerResponseFailure, ManagerResponseSuccess } from "../response";
import sequelize from "@root/core/db";
import AttributeValue from "@src/db/models/v2/product/attribute_value";

export interface AttributeItemInterface {
  key: string
  values: (string | number)[]
}
const placeholder = '属性名'
const responseMsg = ResponseMsg(placeholder)
class AttributeManager implements CommonManager {
  async create(data: AttributeItemInterface): Promise<import("../response").ManagerResponse> {
    const { key, values } = data
    console.log(data)
    const attributeKey = await AttributeKey.findOne({
      where: {
        name: key
      }
    })
    if (attributeKey) {
      return new ManagerResponse({ success: false, msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED })
    }
    return await sequelize.transaction(async (t: any) => {
      const newAttributeKey = await AttributeKey.create({
        name: key
      }, { transaction: t })
      if (newAttributeKey) {
        const { id } = newAttributeKey.toJSON() as any
        const valuesData = values.map(v => { return { value: v, keyId: id } })
        const valuesResult = await AttributeValue.bulkCreate(valuesData, { transaction: t })
        console.log('valuesResult', valuesResult)
        if (valuesResult && valuesResult.length === values.length) {
          const result = attributeKey.toJSON() as any
          result.values = valuesResult.map(v => v.toJSON())
          return new ManagerResponseSuccess({ msg: responseMsg.CREATE_SUCCESS, data: result })
        }
      } else {
        return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL })
      }
    })
  }
  edit(data: any): Promise<import("../response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<import("../response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }
  getList?(data: ListFilterInterface): Promise<import("../response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }

}

export default AttributeManager