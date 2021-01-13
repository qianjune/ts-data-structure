/**
 * @description 权益 service
 * @author June
 */
import { Right, RightPackage, RightRelation } from '@src/db/models'
import { LevelService } from './level'

class RightService {
  /**
   * 创建权益
   * @param {*} data 
   */
  static async createRight(data) {
    const right = await Right.create(data)
    return right
  }

  /**
   * 更新权益
   * @param {*} data 
   */
  static async editRight(data) {
    const { id } = data
    const isExist = await RightService.isRightExist(id)
    if (!isExist) {
      return null
    }
    const result = await Right.update(data, {
      where: {
        id
      }
    })
    return result[0] > 0
  }

  /**
   * 创建 权益包
   * @param {*} data 
   */
  static async createPackage(data) {
    const rightGroup = data.rightGroup
    const levelId = data.levelId
    // 检查 是否有 等级
    if (levelId && !LevelService.isExist(levelId)) {
      return null
    }
    const rightPackage = await RightPackage.create(data)
    // 添加 权益包与权益关系
    if (rightPackage && rightGroup.length > 0) {
      await Promise.all(rightGroup.map((id, index) => RightRelation.create({
        rightId: id,
        packageId: rightPackage.id,
        weight: index
      })))
    }
    return rightPackage
  }

  /**
  * 更新 权益包
  * @param {*} data 
  */
  static async editPackage(data) {
    const { id } = data
    const isExist = await RightService.isRightPackageExist(id)
    if (!isExist) {
      return null
    }
    const result = await RightPackage(data, {
      where: {
        id
      }
    })
    const rightGroup = data.rightGroup
    // 删除 权益包与权益关系
    await RightRelation.destroy({
      where: {
        packageId: id
      }
    })
    // 添加 权益包与权益关系
    if (rightGroup.length > 0) {
      await Promise.all(rightGroup.map((rightId, index) => RightRelation.update({
        rightId,
        packageId: id,
      }, {
        where: {
          weight: index
        }
      })))
    }
    return result
  }

  /**
   * 权益是否存在
   * @param {*} id 
   */
  static async isRightExist(id) {
    const right = Right.findOne({
      where: {
        id
      }
    })
    if (right) {
      return true
    }
    return false
  }

  /**
   * 权益包是否存在
   * @param {*} id 
   */
  static async isRightPackageExist(id) {
    const rightPackage = RightPackage.findOne({
      where: {
        id
      }
    })
    if (rightPackage) {
      return true
    }
    return false
  }
}

export {
  RightService
}

