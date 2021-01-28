/**
 * @description Points orm
 */

import {
  CommonManager,
  ListFilterInterface,
  buildCommonListParams,
} from "@src/manager/interface/commonManager";
import {
  ManagerResponse,
  ManagerResponseSuccess,
  ListDataModel,
  ResponseMsg,
  ManagerResponseFailure,
} from "@src/manager/response";
import { PointsDb } from "@src/db/models";
import sequelize from "@root/core/db";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import { PointsType } from "@src/db/models/v2/member/points";
import { RightPatternType } from "@src/db/models/v2/member/right";
import MemberPointsRelation from "./memberPointsRelation";
import {
  LevelGroupManager,
  MemberManager,
  MemberRightRelationManager,
} from ".";
const levelGroupManager = new LevelGroupManager();
const memberManager = new MemberManager();
const memberPointsRelationManager = new MemberPointsRelation();
const placeholder = "Points";
const responseMsg = ResponseMsg(placeholder);
class Points implements CommonManager {
  /**
   * 获取详情（私有）
   * @param id
   * @param config
   */
  async _getInfo(id: number, config?: { msg?: string }): Promise<any> {
    const item = await PointsDb.findOne({
      where: { id },
    });
    if (!item) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    return item;
  }

  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<ManagerResponse<any>> {
    return await sequelize.transaction(async (t: any) => {
      const { memberId, ...otherData } = data;
      // 保存记录下这次积分行为
      const result: any = await PointsDb.create(otherData, { transaction: t });
      if (result?.id) {
        // 查询上一次该会员的积分列表
        const relationList = await memberPointsRelationManager.getList({
          pageNo: 1,
          pageSize: 1,
          memberId,
        });
        let currentSum = 0;
        if (relationList.success && relationList.data.total > 0) {
          console.log(relationList.data.data[0]);
          // 获取会员的最新一条积分记录
          const preRelation = relationList.data.data[0];
          // 获取会员现有积分数量
          const preCurrentSum = preRelation.currentSum;
          const { type, num } = otherData;
          // 查更新会员的积分和成长值
          console.log(memberId);
          const memberInfo: any = (await memberManager.getInfo(memberId)).data;
          // 如果是积分增加
          if (type === PointsType.INCREASE) {
            currentSum = preCurrentSum + num;
            // 获取等级包

            // levelPackageData
            console.log(memberInfo);
            const preGrowthValue = memberInfo.growthValue;
            memberInfo.growthValue = preGrowthValue + num;
            // 判断成长值前后的变化是否附和某个等级
            const matchLevelResult = await levelGroupManager.matchLevel({
              id: 8,
              preValue: preGrowthValue,
              currentValue: memberInfo.growthValue,
            });
            // 如果刚好升级
            // 查询该等级下的权益，把其中消耗型的权益和member建立关系
            if (matchLevelResult.isUpgrading) {
              const consumableRights = matchLevelResult.currentLevel.Rights.filter(
                (r: any) => {
                  r.type === RightPatternType.CONSUMABLE;
                }
              );
              const memberRightRelationManager = new MemberRightRelationManager();
              await memberRightRelationManager.createForGroupData(
                consumableRights,
                { transaction: t }
              );
            }
          } else if (type === PointsType.REDUCE && preCurrentSum > num) {
            // 如果是积分减少
            currentSum = preCurrentSum - num;
          }
          memberInfo.points = currentSum;
          console.log(memberInfo, currentSum);
          const updateMemberResult = await memberManager.edit(memberInfo, {
            transaction: t,
          });
          if (updateMemberResult.success) {
          }
          // 然后去匹配等级 （通过等级要求分数的那一次积分）
          // 将匹配到的等级里的消耗型 在 MemberRightsRelation 里建立记录
          // 将匹配到的等级里的状态型 也添加？还是每次去检查？
          // 创建会员和积分的关系
          const memberPointsRelation = await memberPointsRelationManager.create(
            {
              memberId,
              pointId: result?.id,
              currentSum,
            },
            { transaction: t }
          );
          if (memberPointsRelation.success) {
            return new ManagerResponseSuccess({
              msg: responseMsg.CREATE_SUCCESS,
              data: result,
            });
          }
        }
      }
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    });
  }

  /**
   * 编辑
   * @param data
   */
  async edit(data: any): Promise<ManagerResponse<any>> {
    const { id } = data;
    const item = await this._getInfo(id);
    const updateData = global.util.lodash.omitNil({});
    const result = await PointsDb.update(updateData, {
      where: {
        id,
      },
    });
    if (result[0] > 0) {
      return new ManagerResponseSuccess({
        data: null,
        msg: responseMsg.EDIT_SUCCESS,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.EDIT_FAIL });
    }
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<ManagerResponse<any>> {
    const item = await await this._getInfo(id);
    return await sequelize.transaction(async (t: any) => {
      const result = await PointsDb.destroy({
        where: {
          id,
        },
      });
      if (result) {
        return new ManagerResponseSuccess({
          msg: responseMsg.DELETE_SUCCESS,
          data: true,
        });
      } else {
        return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL });
      }
    });
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<ManagerResponse<any>> {
    const item = await this._getInfo(id);
    return new ManagerResponseSuccess({
      msg: responseMsg.GET_DETAIL_SUCCESS,
      data: item,
    });
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(
    data: ListFilterInterface,
    config?: RequestConfigInterface
  ): Promise<ManagerResponse<any>> {
    const { pageSize = 10, pageNo = 1 } = data;
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize }, config);
      const result = await PointsDb.findAndCountAll({
        ...listParams,
      });
      const { count, rows } = result;
      const PointsList = rows.map((row: any) => {
        const data: any = row.toJSON();
        return data;
      });

      return new ManagerResponseSuccess({
        data: new ListDataModel({
          data: PointsList,
          total: count,
          pageNo,
          pageSize,
        }),
        msg: responseMsg.FETCH_LIST_SUCCESS,
      });
    });
  }
}

export default Points;
