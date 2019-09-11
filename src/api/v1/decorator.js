import joi from '@hapi/joi'
import Router from 'koa-router'
import Auth from '../../../middleware/auth'
function prefix(path) {
  return function (target) {
    target.prototype.prefix = path
  }
}

const methodBuilder = (method = 'get') => (path = '/') => (target, key, descriptor) => {
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  if (!target.apis) {
    target.apis = {}
  }
  if (!target.apis[key]) {
    target.apis[key] = {}
  }
  target.apis[key].method = method
  target.apis[key].path = path
}


const get = methodBuilder('get')
const post = methodBuilder('post')

const registerMiddleware = (target, key, middleware) => {
  if (!target.apis) {
    target.apis = {}
  }
  if (!target.apis[key]) {
    target.apis[key] = {}
  }
  if (!target.apis[key].middleware) {
    target.apis[key].middleware = []
  }
  if (target.apis[key].middleware.length === 0) {
    target.apis[key].middleware.push(target[key])
  }
  target.apis[key].middleware.unshift(middleware)
  console.log(target.apis[key])
}

const parameter = (name, joiScheme, location) => (target, key, descriptor) => {
  console.log('1')
  const joiValiate = async (ctx, next) => {
    try {
      const result = await joiScheme.validate(ctx[location][name])
      if (result.error) {
        throw new global.errs.HttpException(result.error)
      }
      await next()
    } catch (err) {
      throw new global.errs.HttpException(err)
    }
  }
  registerMiddleware(target, key, joiValiate)
}

const middleware = (middleware) => (target, key) => {
  if (Array.isArray(middleware)) {
    middleware.forEach(mw => {
      registerMiddleware(target, key, mw)
    })
  } else {
    registerMiddleware(target, key, middleware)
  }
}

class BaseRouter {
  constructor() {
    this.router = new Router({ prefix: this.prefix })
  }
  init() {
    Object.keys(this.apis).forEach(key => {
      const api = this.apis[key]
      console.log(api)
      this.router[api.method](api.path, ...(api.middleware || []))
    })
    return this.router
  }
}

@prefix('/v1/decorator')
class TestApi extends BaseRouter {
  constructor() {
    super()
  }
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
  createData(ctx) {
    ctx.body = {
      data: 'create'
    }
  }
}

const testApi = new TestApi()

export default testApi.init()


