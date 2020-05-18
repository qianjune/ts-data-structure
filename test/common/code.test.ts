/**
 * @description 验证码服务 测试
 */
import server from '../server'

const email = '418694294@qq.com'
const baseUrl = '/api/common'
test('邮箱验证码测试', async () => {
    const res = await server.post(`${baseUrl}/email/send/code`)
})