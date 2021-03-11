/**
 * @description 笔记和话题的关系 orm
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
  ListDataInterface,
} from "@src/manager/response";
import sequelize from "@root/core/db";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import { ResponseHandler } from "@src/utils/responseHandler";
import TopicNoteRelationDb from "@micro-services/social-service/src/db/topicNoteRelation";
import Topic from "./topic";
const topicManager = new Topic();
const placeholder = "TopicNoteRelation";
const responseMsg = ResponseMsg(placeholder);
class TopicNoteRelation implements CommonManager {
  /**
   * 获取详情（私有）
   * @param id
   * @param config
   */
  async _getInfo(
    where: { id: number },
    config?: { msg?: string }
  ): Promise<any> {
    const item = await TopicNoteRelationDb.findOne({
      where,
    });
    if (!item) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
      );
    }
    return item.toJSON();
  }

  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<ManagerResponse<any>> {
    const { noteId, topicGroup = [] } = data;
    // 查询topicGroup是否创建
    const topicIds = await topicManager._handleGroup(topicGroup);
    if (Array.isArray(topicIds) && topicIds.length > 0) {
      // 先去查topicId和noteId有没有做关联，如果有就不重复添加
      // 这里之后要考虑到修改后提交是否有营销策略可以加入

      // 将未创建的topicId筛选出来，再进行关系创建
      const relationReqGroup: any = [];
      topicIds.forEach((topicId) => {
        relationReqGroup.push(
          TopicNoteRelationDb.create({
            topicId,
            noteId,
          })
        );
      });
      Promise.all(relationReqGroup);
    } else {
      return new ManagerResponseFailure({
        msg: "未读取到有效主题，请稍后再试",
      });
    }
    // const item = await TopicNoteRelationDb.findOne({
    //   where: {},
    // });
    // if (item) {
    //   return new ManagerResponseFailure({
    //     msg: responseMsg.CREATE_FAIL_BY_EXISTED,
    //   });
    // }
    // const result = await TopicNoteRelationDb.create(data);
    // if (result) {
    //   return new ManagerResponseSuccess({
    //     msg: responseMsg.CREATE_SUCCESS,
    //     data: result,
    //   });
    // } else {
    return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    // }
  }

  /**
   * 编辑
   * @param data
   */
  async edit(data: any): Promise<ManagerResponse<any>> {
    const { id } = data;
    const item = await this._getInfo({ id });
    const updateData = global.util.lodash.omitNil({});
    const result = await TopicNoteRelationDb.update(updateData, {
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
    const item = await await this._getInfo({ id });
    return await sequelize.transaction(async (t: any) => {
      const result = await TopicNoteRelationDb.destroy({
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
    const item = await this._getInfo({ id });
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
  ): Promise<ManagerResponse<ListDataInterface>> {
    const { pageSize = 10, pageNo = 1 } = data;
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize }, config);
      const result = await TopicNoteRelationDb.findAndCountAll({
        ...listParams,
      });
      const { count, rows } = result;
      const TopicNoteRelationList = rows.map((row: any) => {
        const data: any = row.toJSON();
        return data;
      });

      return new ManagerResponseSuccess({
        data: new ListDataModel({
          data: TopicNoteRelationList,
          total: count,
          pageNo,
          pageSize,
        }),
        msg: responseMsg.FETCH_LIST_SUCCESS,
      });
    });
  }
}

export default TopicNoteRelation;
