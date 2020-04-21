/**
 * @description jwt相关处理
 */
import jwt from 'jsonwebtoken'

 class JwtHandler {
     // 解密
    static decode(){
        jwt.decode
    }
    // 加密
    static encrypt(){
        jwt.sign
    }
 }

 export default JwtHandler