/**
 * @description comment orm
 */

import { CommonManager, ListFilterInterface } from "@src/manager/interface/commonManager";
import sequelize from "@root/core/db";
import { CommentModel } from "@src/db/models";
import ProductManager from "./product";
import { ResponseMsg, ManagerResponseFailure, ManagerResponseSuccess, ListDataModel, ManagerResponse } from "../response";
import { UserManager } from "../user";

const placeholder = '评论'
const responseMsg = ResponseMsg(placeholder)
const productManager = new ProductManager()
const userManager = new UserManager()
interface CommentData {
  underWhich?: number
  userId?: number
  parentId?: number
  content?: string
  id?: number
  children?: CommentData[]
}
class CommentManager implements CommonManager {
  async create(data: CommentData): Promise<import("../../../src/manager/response").ManagerResponse> {
    const cloneData = { ...data }
    const parentId = data.parentId
    if (!parentId || parentId === -1) {
      cloneData.parentId = -1
    } else {
      const parentComment = await CommentModel.findOne({
        where: {
          id: cloneData.parentId
        }
      })
      if (!parentComment) {
        return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
      }
    }
    const user = await userManager.getValidateData({ id: data.userId })
    if (!(user as ManagerResponse).success) {
      return user
    }
    const goods = await productManager.getInfo(cloneData.underWhich)
    if (!goods.success) {
      return goods
    }
    // 找用户
    return await sequelize.transaction(async (t: any) => {
      const result = await CommentModel.create(cloneData, { transaction: t })
      if (result) {
        return new ManagerResponseSuccess({ msg: responseMsg.CREATE_SUCCESS, data: result })
      } else {
        return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL })
      }
    })
  }
  edit(data: any): Promise<import("../../../src/manager/response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<import("../../../src/manager/response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<import("../../../src/manager/response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async _findChildren(parentId: number): Promise<CommentData[]> {
    const list = await CommentModel.findAndCountAll({
      limit: 100,
      offset: 0,
      order: [
        ['id', 'desc']
      ],
      where: {
        parentId
      }
    })

    const { rows, count } = list

    return rows.map(row => row.toJSON())
  }
  async _loopComment(rows: CommentData[]): Promise<CommentData[]> {
    for (const row of rows) {
      const index = rows.findIndex(r => r.id = row.id)

      const { id } = row
      const children = await this._findChildren(id)
      if (children.length > 0) {
        rows[index]['children'] = await this._loopComment(children)
      }
    }
    return rows
  }
  async getList?(data: ListFilterInterface & { underWhich: number }): Promise<import("../../../src/manager/response").ManagerResponse> {
    const { pageNo, pageSize, underWhich } = data
    const list = await CommentModel.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (pageNo - 1),
      order: [
        ['id', 'desc']
      ],
      where: {
        underWhich,
        parentId: -1
      }
    })
    const { rows, count } = list
    const result = await this._loopComment(rows.map(row => row.toJSON()))
    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: result,
        total: count,
        pageNo,
        pageSize
      }),
      msg: responseMsg.FETCH_LIST_SUCCESS
    })
  }

}

export default CommentManager