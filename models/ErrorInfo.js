/**
 * @description 失败信息集合，包括 error 和 message
 * @author June_end
 */

export default {
  // 用户名已存在
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名已存在'
  },
  // 注册失败
  registerFailInfo: {
    errno: 10002,
    message: '注册失败，请重试'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用户名未存在'
  },
  // 登录失败
  loginFailInfo: {
    errno: 10004,
    message: '登录失败，用户名或密码错误'
  },
  // 未登录
  loginCheckFailInfo: {
    errno: 10005,
    message: '您尚未登录'
  },
  // 修改密码失败
  changePasswordFailInfo: {
    errno: 10006,
    message: '修改密码失败，请重试'
  },
  // 上传文件过大
  uploadFileSizeFailInfo: {
    errno: 10007,
    message: '上传文件尺寸过大'
  },
  // 修改基本信息失败
  changeInfoFailInfo: {
    errno: 10008,
    message: '修改基本信息失败'
  },
  // json schema 校验失败
  jsonSchemaFileInfo: {
    errno: 10009,
    message: '数据格式校验错误'
  },
  // 删除用户失败
  deleteUserFailInfo: {
    errno: 10010,
    message: '删除用户失败'
  },
  // 添加关注失败
  addFollowerFailInfo: {
    errno: 10011,
    message: '添加关注失败'
  },
  // 取消关注失败
  deleteFollowerFailInfo: {
    errno: 10012,
    message: '取消关注失败'
  },
  // 创建微博失败
  createBlogFailInfo: {
    errno: 11001,
    message: '创建微博失败，请重试'
  },
  // 删除微博失败
  deleteBlogFailInfo: {
    errno: 11002,
    message: '删除微博失败，请重试'
  },

  // 自定义
  // 会员 11
  addMemberFailInfo: {
    errno: 11001,
    message: '创建用户失败，请稍后重试'
  },
  addMemberGrowthValueInfo: {
    errno: 11002,
    message: '用户成长值增加失败'
  },
  // 积分 12
  addPointsFailInfo: {
    errno: 12001,
    message: '添加积分失败，请稍后重试'
  },
  pointsPatternInvalid:{
    errno: 12002,
    message: '积分模式不合法'
  },
  // 权益 相关 13
  createRightFailInfo:{
    errno: 13001,
    message: '创建权益失败'
  },
  editRightFailInfo:{
    errno: 13002,
    message: '修改权益失败'
  },
  createRightPackageFailInfo:{
    errno: 13003,
    message: '创建权益包失败'
  },
  editRightPackageFailInfo:{
    errno: 13004,
    message: '修改权包失败'
  },
  // 等级 相关 14xxx
  createLevelFailInfo:{
    errno:14001,
    message:'创建等级失败'
  },
  editLevelFailInfo:{
    errno:14002,
    message:'修改等级失败'
  },
}
