/**
 * @description swagger 相关注解
 */

import { registerMiddleware } from './middleware'

const summary = (content) => (target, key, descriptor) => {
  if (!target.apis) {
    target.apis = {}
  }
  if (!target.apis[key]) {
    target.apis[key] = {}
  }
  if (!target.apis[key].swagger) {
    target.apis[key].swagger = {}
  }
  target.apis[key].swagger.summary = content
  registerMiddleware(target, key)
}


export {
  summary
}