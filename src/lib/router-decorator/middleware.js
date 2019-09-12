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

export {
  registerMiddleware,
  middleware
}