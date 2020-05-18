import request from 'supertest'
import server from '../app'

export default request(server.callback())