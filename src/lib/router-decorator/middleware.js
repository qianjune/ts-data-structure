/**
 * 注册中间件
 * @param {Object} target 类
 * @param {String} key 方法名
 * @param {Function} middleware 中间件
 */
const registerMiddleware = (target, key, middleware) => {
  if (!target.apis) {
    target.apis = {};
  }
  if (!target.apis[key]) {
    target.apis[key] = {};
  }
  if (!target.apis[key].middleware) {
    target.apis[key].middleware = [];
  }
  // 初始化方法作为中间件的最后一项
  if (target.apis[key].middleware.length === 0) {
    target.apis[key].middleware.push(target[key]);
  }
  if (middleware) {
    target.apis[key].middleware.unshift(middleware);
  }
};

/**
 * 注册多个验证的middleware
 * @param {*} middleware
 */
const middleware = (middleware) => (target, key) => {
  if (Array.isArray(middleware)) {
    middleware.forEach((mw) => {
      registerMiddleware(target, key, mw);
    });
  } else {
    registerMiddleware(target, key, middleware);
  }
};

export { registerMiddleware, middleware };
