import joi from '@hapi/joi'
import Auth from '../../../middleware/auth'
import BaseRouter, { get, post, middleware, parameter, prefix, put } from '../../lib/router-decorator'

  // const path = ctx.params
  // const query = ctx.request.query
  // const header = ctx.request.header
  // const body = ctx.request.body
@prefix('/v1/decorator')
class TestApi extends BaseRouter {
  @get('/:id')
  @parameter('id', joi.number().required(), 'params')
  @middleware(new Auth().m)
  getBaseData(ctx) {
    // console.log(ctx.params.id)
    ctx.body = {
      data: 'test',
      status: 'success'
    }
  }

  @post('/create')
  @parameter(joi.object({
    username:joi.string().min(6).required(),
    password:joi.string().min(6).required(),
    name:joi.string().default('mock_name'),
    age:joi.number().min(0).max(100)
  }),'body')
  @middleware(new Auth().m)
  createData(ctx) {
    ctx.body = {
      data: 'create'
    }
  }

  @put('/:id/edit')
  @parameter('id', joi.number().required(), 'params')
  @parameter(joi.object({
    password:joi.string().min(6).required(),
    name:joi.string().default('mock_name'),
    age:joi.number().min(0).max(100)
  }),'body')
  @middleware(new Auth().m)
  editData(ctx) {
    ctx.body = {
      data: 'edit'
    }
  }
}

const testApi = new TestApi()

export default testApi.init()


