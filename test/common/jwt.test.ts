import server from '../server'

const jwtObj = {
    "data":{
		"id":"1",
		"name":"jim"
	}
}
test('jwt 加解密测试', async () => {
    const res = await server.post('/api/jwt/sign').send(jwtObj)
    const data = await server.post('/api/jwt/verify').send(res.body)
    expect(data.body.id).toBe(jwtObj.data.id)
    expect(data.body.name).toBe(jwtObj.data.name)
})