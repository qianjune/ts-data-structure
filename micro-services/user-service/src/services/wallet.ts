/**
 * @description 钱包服务 service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import WalletManager, {
  enoughToPayParams,
} from "@micro-services/user-service/src/manager/wallet";
import { ManagerResponse, ManagerResponseFailure } from "@src/manager/response";
const walletManager = new WalletManager();
class WalletService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: { userId: number }): Promise<void> {
    const result = await walletManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await walletManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await walletManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await walletManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await walletManager.getList(data);
    ResponseHandler.send(result);
  }

  /**
   * 钱包充值
   * @param data
   */
  async recharge<T>(data: { userId: number; amount: number }): Promise<void> {
    const { userId, amount } = data;
    // 根据userId查找到钱包
    // （从第三方转账到自己公司账户）
    // 将金额累加上amount
    const result = await walletManager.changeAmount({
      userId,
      amount,
      type: "increase",
    });
    ResponseHandler.send(result);
  }
  /**
   * 修改支付密码
   * @param data
   */
  async modifyPassword<T>(data: {
    userId: number;
    password: number;
    confirmPassword: number;
  }): Promise<void> {
    const { userId, password, confirmPassword } = data;
    let msg = "";
    // 根据userId查找到钱包详情
    const item = await walletManager._getInfo({ userId });
    if (item.password === "NO_SET_PASSWORD") {
      if (password === confirmPassword) {
        ResponseHandler.send(
          await walletManager.edit(
            { id: item.id, password },
            { noFetchDetail: true }
          )
        );
      } else {
        msg = "密码不一致";
      }
      const result = await walletManager.edit(data);
      ResponseHandler.send(result);
    } else {
      msg = "密码已经初始化，无法再次初始化";
    }
    ResponseHandler.send(new ManagerResponseFailure({ msg }));
    // 查看密码是否匹配
    // 修改成新密码
  }
  /**
   * 钱包支付
   * @param data
   */
  async pay<T>(data: enoughToPayParams): Promise<ManagerResponse<any>> {
    const { amount, password, userId } = data;
    // 根据userId查询钱包详情
    // 检查输入的密码和支付密码是否匹配
    const isEnoughPay = await walletManager._isEnoughToPay({
      amount,
      password,
      userId,
    });
    if (isEnoughPay) {
      // 检查钱包里的金额是否大于等于传入的金额
      // 检查成功后，将钱包金额扣除
      const result = await walletManager.changeAmount({
        userId,
        amount,
        type: "decrease",
      });
      return result;
    } else {
      return new ManagerResponseFailure({ msg: "钱包金额少于需支付金额" });
    }
  }
}

export default WalletService;
