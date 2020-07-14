import joi from '@hapi/joi'
import Auth from '@root/middleware/auth'
import BaseRouter, { get, post, middleware, parameter, prefix, put } from '@src/lib/router-decorator'
import { MemberController } from '@src/controllers/member'
import { Context } from 'koa'

@prefix('/v2/member')
class MemberRouter extends BaseRouter {
  @post('/create')
  @parameter(joi.object({
    userId: joi.string().required()
  }), 'body')
  async createNewMember(ctx: Context): Promise<void> {
    console.log(ctx.request.body)
    const body = ctx.request.body
    const result = await MemberController.addNewMember(body)
    ctx.body = result
  }

  @post('/edit')
  @parameter(joi.object({
    nickName: joi.string(),
    sex: joi.number(),
    tel: joi.string().length(11),
    // realName: joi.string(),
    birthday: joi.string(),
    residence: joi.string(),
    // email: joi.string() // 绑定邮箱
  }), 'body')
  async editMemberInfo(ctx: Context): Promise<void> {
    const body = ctx.request.body
    console.log(body)
    // const result = await editInfo()
    // ctx.body = result
  }
}

const memberRouter = new MemberRouter()

export default memberRouter.init()