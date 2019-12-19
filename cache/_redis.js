/**
 * @description 连接redis的方法 get/set
 * @author June_end
 */

const redis = require('redis')
import config from '../config/config'
const { REDIS_CONF } = config
// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error('redis error', err)
})

/**
 *
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间，单位秒
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  console.log(key,val)
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}

/**
 *
 * @param {string} key key
 */
function get(key) {
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
