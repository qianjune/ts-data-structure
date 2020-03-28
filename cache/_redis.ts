/**
 * @description 连接redis的方法 get/set
 * @author June_end
 */

import redis from 'redis'
import config from '../config/config'
const { REDIS_CONF } = config
// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, {
  password: REDIS_CONF.password
})
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 *
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间，单位秒
 */
const set = (key: string, val: string | number, timeout = 60 * 60): void => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  console.log(key, val)
  redisClient.set(key, val.toString())
  redisClient.expire(key, timeout)
}

/**
 *
 * @param {string} key key
 */
const get = (key: string): Promise<unknown> => {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(
          JSON.parse(val)
        )
      } catch (error) {
        resolve(val)
      }
    })
  })

  return promise
}

export {
  set,
  get
}