/**
 * @description 话题 orm
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
import TopicDb from "@micro-services/social-service/src/db/topic";
import Sequelize from "sequelize";
const placeholder = "Topic";
const responseMsg = ResponseMsg(placeholder);
class Topic implements CommonManager {
  /**
   * 获取详情（私有）
   * @param id
   * @param config
   */
  async _getInfo(
    where: { id: number },
    config?: { msg?: string }
  ): Promise<any> {
    const item = await TopicDb.findOne({
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
   * 分解出content中的主题,去掉多余的空格和#
   * @param data
   */
  _analysisTopic(data: string): string[] {
    if (/#[\u4e00-\u9fa5_a-zA-Z0-9]+\s/.test(data)) {
      const result: string[] = data.match(/#[\u4e00-\u9fa5_a-zA-Z0-9]+\s/g);

      return result.map((topic) => {
        let cloneTopic = topic;
        cloneTopic = cloneTopic.trim();
        cloneTopic = cloneTopic.replace("#", "");
        return cloneTopic;
      });
    }
    return [];
  }
  async _handleGroup(topicGroup: string[]): Promise<string[]> {
    const searchGroup = topicGroup.map((topic: string) => {
      return TopicDb.findOne({
        where: { name: topic },
      });
    });
    const searchResult = await Promise.all(searchGroup);
    console.log(searchResult, "searchResult...");
    const topicIds: string[] = [];
    const needCreateTopicRequestGroup: Promise<any>[] = [];
    searchResult.forEach((sr: any, i) => {
      if (!sr) {
        needCreateTopicRequestGroup.push(
          TopicDb.create({ name: topicGroup[i] })
        );
      } else {
        topicIds.push(sr.toJSON().id);
      }
    });
    console.log(needCreateTopicRequestGroup, "needCreateTopicRequestGroup...");
    const groupCreateResult = await Promise.all(needCreateTopicRequestGroup);
    groupCreateResult.forEach((sr: any) => {
      topicIds.push(sr.toJSON().id);
    });
    console.log(groupCreateResult, "groupCreateResult...");
    console.log(topicIds, "topicIds...");
    return topicIds;
  }
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<ManagerResponse<any>> {
    const { name } = data;
    const item = await TopicDb.findOne({
      where: { name },
    });
    if (item) {
      // 如果发现是已有的主题，就不需要重新创建，而是将主题和内容做个表关联
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_EXISTED,
      });
    }
    const result = await TopicDb.create(data);
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }

  /**
   * 编辑
   * @param data
   */
  async edit(data: any): Promise<ManagerResponse<any>> {
    const { id } = data;
    const item = await this._getInfo({ id });
    const updateData = global.util.lodash.omitNil({});
    const result = await TopicDb.update(updateData, {
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
      const result = await TopicDb.destroy({
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
    const { pageSize = 10, pageNo = 1, keywords = "" } = data;
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize }, config);
      let where = {};
      if (keywords) {
        const Op = Sequelize.Op;
        where = {
          name: {
            [Op.like]: `%${keywords}%`,
          },
        };
      }
      const result = await TopicDb.findAndCountAll({
        ...listParams,
        where,
      });
      const { count, rows } = result;
      const TopicList = rows.map((row: any) => {
        const data: any = row.toJSON();
        return data;
      });

      return new ManagerResponseSuccess({
        data: new ListDataModel({
          data: TopicList,
          total: count,
          pageNo,
          pageSize,
        }),
        msg: responseMsg.FETCH_LIST_SUCCESS,
      });
    });
  }
}

export default Topic;
