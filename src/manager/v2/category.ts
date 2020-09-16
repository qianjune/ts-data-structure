import { CommonManager, ListFilterInterface } from "../interface/commonManager";
import { ProductCategory } from "@src/db/models";
import { ManagerResponseSuccess, ManagerResponseFailure, ResponseMsg, ManagerResponse, ListDataModel } from "../response";
import sequelize from "@root/core/db";
/**
 * @description 
 * 1. 没有shopId的是公共分类
 * 2. 公共分类的顶层为parentId = 0
 * 3. 分类为逐级增加，店铺分类不继承公共分类的level，重新计算
 * 4. 公共分类运营商统一创建，计划至少3到4层
 */
export interface CategoryItemInterface {
  name: string,
  parentId?: number
}
export interface CategoryListParamsInterface extends ListFilterInterface {
  parentId?: number
}
const placeholder = '分类'
const responseMsg = ResponseMsg(placeholder)
class CategoryManager implements CommonManager {
  async create(data: CategoryItemInterface): Promise<import("../response").ManagerResponse> {
    const { name, parentId = 0 } = data
    const category = await ProductCategory.findOne({
      where: {
        name,
        parentId
      }
    })
    if (category) {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED })
    }
    return await sequelize.transaction(async (t: any) => {
      console.log('data...', data)
      // 分类第一级
      if (global.util.lodash.isNil(data.parentId)) {
        data.parentId = 0
      }
      const result = await ProductCategory.create(data, { transaction: t })
      console.log(result)
      if (result) {
        return new ManagerResponseSuccess({ msg: responseMsg.CREATE_SUCCESS, data: result })
      } else {
        return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL })
      }
    })
  }
  async edit(data: { id: number }): Promise<ManagerResponse> {
    const { id } = data
    const category = await ProductCategory.findOne({
      where: {
        id
      }
    })
    if (!category) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
  }
  async del(id: number): Promise<ManagerResponse> {
    const category = await ProductCategory.findOne({
      where: {
        id
      }
    })
    if (!category) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
    const list = await ProductCategory.findAndCountAll({
      where: {
        parentId: id
      }
    })
    if (list.count > 0) {
      return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL_BY_HAVE_LINKED_CHILD })
    }
    return await sequelize.transaction(async (t: any) => {
      const result = await ProductCategory.destroy({
        where:{
          id
        }
      })
      console.log(result, 'result')
      if (result) {
        return new ManagerResponseSuccess({ msg: responseMsg.DELETE_SUCCESS, data: true })
      } else {
        return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL })
      }
    })
  }
  getInfo(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: CategoryListParamsInterface): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1, parentId = 0 } = data
    return await sequelize.transaction(async (t: any) => {
      const result = await ProductCategory.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (pageNo - 1),
        where: {
          parentId
        },
        order: [
          ['id', 'desc']
        ],
      })
      const { count, rows } = result
      const categoryList = rows.map(row => {
        const data: any = row.toJSON()
        // data.shopName = data.shopModel.name
        // delete data.shopModel
        return data
      })

      return new ManagerResponseSuccess({
        data: new ListDataModel({ data: categoryList, total: count, pageNo, pageSize }),
        msg: responseMsg.FETCH_LIST_SUCCESS
      })
    })
  }

}

export default CategoryManager