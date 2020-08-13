import { CommonService } from "../interface/common";
import ProductManager from "@src/manager/v2/product";
import { ResponseHandler } from "@src/utils/responseHandler";
import { omit } from "lodash";

const productManager = new ProductManager

class ProductService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await productManager.create(data)
    ResponseHandler.send(result)
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }
  async getList(data: any): Promise<void> {
    const result = await productManager.getList(data)
    ResponseHandler.send(result)
  }
  async getListForApp(data: any): Promise<void> {
    const result = await productManager.getList(data)
    const cloneResult = { ...result }
    const { data: { data: realData } } = cloneResult
    if (realData) {
      const cloneRealData = [...realData]
      cloneRealData.forEach((crd: any, index: number) => {
        if (crd.skuGroup) {
          crd.skuGroup = crd.skuGroup.filter((sg: any) => sg.enabled === 1).map((sg: any, j: number) => {
            const attributeGroup = omit(sg, ['enabled', 'salePrice'])
            const attributeKeys = Object.keys(attributeGroup)
            const attributeLen = attributeKeys.length
            let attributeCode = ''
            if (attributeLen > 0) {
              attributeKeys.forEach((key, keyIndex) => {
                attributeCode += `${key}|${attributeGroup[key]}`
                if (keyIndex < attributeLen - 1)
                  attributeCode += '-'
              })
            }
            sg.code = attributeCode
            sg = omit(sg, [...attributeKeys, 'enabled'])
            return sg
          })
        }

      })
      // cloneResult.data.data = cloneRealData
    }

    ResponseHandler.send(cloneResult)
  }

}

export default ProductService