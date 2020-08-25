/**
 * @description comment service
 */
import { CommonService } from "@src/services/interface/common";
import CommentManager from "@src/manager/v2/comment";
import { ResponseHandler } from "@src/utils/responseHandler";
const commentManager = new CommentManager()
class CommentService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await commentManager.create(data)
    ResponseHandler.send(result)
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: any): Promise<void> {
    const result = await commentManager.getList(data)
    ResponseHandler.send(result)
  }

}

export default CommentService