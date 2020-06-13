/**
 * @description 权限 工具 类
 */

 /**
  * 权限key 组
  */
enum AuthorityKeyGroup {
    ADMIN,  // 管理员
    VISITOR, // 游客
    NORMAL_USER, // 普通用户
    FORZEN // 冻结
}

class AuthorityUtil {
    authCheck(key: AuthorityKeyGroup): boolean {
        // 根据传进来的key，去检查改用户的权限是否存在
        return false
    }
}

export default AuthorityUtil