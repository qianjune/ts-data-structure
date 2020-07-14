/**
 * @description 店铺 orm
 */
import { ShopModel } from '@src/db/models'
import { CommonManager } from "../interface/commonManager";
import { ManagerResponse } from '../response';
import ShopUserRelation from '@src/db/models/v2/shopUserRelation';
import sequelize from '@root/core/db';

class ShopManager implements CommonManager {
  async create(data: any): Promise<ManagerResponse> {
    console.log('data', data)

    const shopInfo = await ShopModel.findOne({
      where: {
        name: data.name
      }
    })
    if (shopInfo) {
      return new ManagerResponse({ success: false, msg: '创建店铺失败，店铺名已被占用' })
    }
    return await sequelize.transaction(async (t: any) => {
      const result = await ShopModel.create(data, { transaction: t })
      console.log('result', result)
      const bindRelation = await ShopUserRelation.create({
        uid: global.state.userInfo.id,
        shopId: result.getDataValue("id")
      }, { transaction: t })
      if (bindRelation) {
        return new ManagerResponse({ success: true, msg: '创建店铺成功', data: result })
      } else {
        return new ManagerResponse({ success: true, msg: '创建店铺失败，请稍后再试', data: result })
      }
    })
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  del(id: number): void {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }

}

export default ShopManager