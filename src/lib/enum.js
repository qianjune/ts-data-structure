function isThisType(val) {
  for (let key in this) {
    if (this[key] == val) {
      return true
    }
  }
  return false
}

const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 300,
  isThisType
}
const BlogType = {
  MARKDOWN: 10,
  HTML: 11,
  isThisType
}
module.exports = {
  LoginType,
  BlogType
}