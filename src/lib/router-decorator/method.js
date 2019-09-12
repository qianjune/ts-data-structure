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
const put = methodBuilder('put')

export {
  get,
  post,
  put
}