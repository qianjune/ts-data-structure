function prefix(path) {
  return function (target) {
    target.prototype.prefix = path
  }
}

export {
  prefix
}