import { registerMiddleware } from "./middleware"

/**
 * method注解
 * @param {*} method 
 */
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
  registerMiddleware(target, key)
}


const get = methodBuilder('get')
const post = methodBuilder('post')
const put = methodBuilder('put')
const del = methodBuilder('delete')

export {
  get,
  post,
  put,
  del
}