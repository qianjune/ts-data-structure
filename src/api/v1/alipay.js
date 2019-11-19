import BaseRouter, { get, prefix,parameter } from '../../lib/router-decorator'
import joi from '@hapi/joi'

@prefix('/v1/alipay')
class AliPayApi extends BaseRouter{
  @get('/userInfo')
  getUserInfo(ctx){
    ctx.body={
      data:'alipay_userInfo'
    }
  }
}

const aliPayApi = new AliPayApi()
export default aliPayApi.init()