/**
 * @description 连接redis的方法 get/set/del
 * @author June_end
 */

import redis from "redis";
import config from "@root/config/config";
const { REDIS_CONF } = config;
// 创建客户端
// const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, {
//   password: REDIS_CONF.password
// })
// redisClient.on('error', err => {
//   console.error('redis error', err)
// })
const createClient = () => {
  const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, {
    password: REDIS_CONF.password,
  });
  redisClient.on("error", (err) => {
    console.error("redis error", err);
  });
  return redisClient;
};
// 查一个处理退出
/**
 *
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间，单位秒
 */
const set = (key: string, val: string | number, timeout = 60 * 60): void => {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  const redisClient = createClient();
  redisClient.set(key, val.toString());
  redisClient.expire(key, timeout);
};
const del = (key: string): void => {
  const redisClient = createClient();
  redisClient.del(key);
};
/**
 *
 * @param {string} key key
 */
const get = (key: string): Promise<unknown> => {
  const redisClient = createClient();
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });

  return promise;
};

export { set, get, del };
