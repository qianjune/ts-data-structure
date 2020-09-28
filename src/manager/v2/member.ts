import { ErrorModel, SuccessModel } from "@root/models/ResModel"
import ErrorInfo from "@root/models/ErrorInfo"
import { buildCommonListParams, CommonManager, ListFilterInterface } from "../interface/commonManager"
import { ListDataModel, ManagerResponse, ManagerResponseFailure, ManagerResponseSuccess, ResponseMsg } from "../response"
import MemberService from "@src/services/v2/member"
import { Member } from "@src/db/models"
import { v1 } from 'uuid'
/**
 * @description 会员 controller
 * @author June
 */

const placeholder = '会员'
const responseMsg = ResponseMsg(placeholder)
class MemberManager implements CommonManager {
  async create(data: any): Promise<ManagerResponse> {

    const { userId } = data
    const member = await Member.findOne({
      where: {
        userId
      }
    })
    if (member) {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL_BY_EXISTED })
    }
    const memberCardCode = v1()
    data.memberCardCode = memberCardCode
    const result = await Member.create(data)
    if (result) {
      return new ManagerResponseSuccess({ msg: responseMsg.CREATE_SUCCESS, data: result })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL })
    }
  }
  async edit(data: any): Promise<ManagerResponse> {
    const { num, type, id, userId, nickName, sex, tel, birthday } = data
    console.log('开始更新成长值')
    const updateData = global.util.lodash.omitNil({
      nickName, sex, tel, birthday
    })
    const member = await Member.findOne({
      where: {
        userId
      }
    })
    if (!member) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
    // let growthValue = member.getDataValue('growthValue')
    // switch (type) {
    //   case 'increase':
    //     growthValue += num
    //     break
    //   case 'decrease':
    //     growthValue -= num
    //     break
    //   default:
    //     break
    // }
    const result = await Member.update(updateData, {
      where: {
        id
      }
    })
    console.log(result)
    if (result[0] > 0) {
      return new ManagerResponseSuccess({ data: null, msg: responseMsg.EDIT_SUCCESS })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.EDIT_FAIL })
    }
  }
  del(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.")
  }
  async getInfo(id: number): Promise<ManagerResponse> {
    const info = await Member.findOne({
      where: {
        userId: id
      }
    })
    if (info) {
      return new ManagerResponseSuccess({ data: info, msg: responseMsg.GET_DETAIL_SUCCESS })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    const { pageNo, pageSize } = data
    const res = await Member.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize })
    })
    if (res) {
      const { count, rows } = res
      return new ManagerResponseSuccess({ msg: responseMsg.FETCH_LIST_SUCCESS, data: new ListDataModel({ pageNo, pageSize, data: rows, total: count }) })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.FETCH_LIST_FAIL })
    }
  }
  // static async addNewMember(data: any) {
  //   const result = await MemberService.create(data)
  //   if (!result) {
  //     return new ErrorModel(ErrorInfo.addMemberFailInfo)
  //   }
  //   return new SuccessModel(result)
  // }
  /**
   * 
   * @param {*} param0 num:增加的数值
   */
  // static async addGrowthValueAndPoints({ id, num }: { id: number, num: number }) {
  //   console.log('memberId', id)
  //   const growthValueResult = await MemberService.updateGrowthValue({
  //     id,
  //     num,
  //     type: 'increase'
  //   })
  //   const pointsResult = await MemberService.updatePoints({
  //     id,
  //     num,
  //     type: 'increase'
  //   })
  //   if (growthValueResult && pointsResult) {
  //     return new SuccessModel()
  //   }
  //   return new ErrorModel(ErrorInfo.addMemberGrowthValueInfo)
  //   // if(!result){
  //   //   return ErrorModel(ErrorInfo.addMemberGrowthValueInfo)
  //   // }
  //   // return SuccessModel(result)
  // }
}

export default MemberManager