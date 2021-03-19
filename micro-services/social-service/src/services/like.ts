/**
 * @description 点赞 service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import LikeManager from "@micro-services/social-service/src/manager/like";
const likeManager = new LikeManager();
class LikeService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await likeManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await likeManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await likeManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await likeManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await likeManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default LikeService;
