function prefix(path) {
  return function (target) {
    target.prototype.prefix = path;
  };
}

function tag(tagData) {
  return function (target) {
    target.prototype.tag = tagData;
  };
}

export { prefix, tag };
