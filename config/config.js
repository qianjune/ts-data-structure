export default {
  environment: 'dev',
  database: {
    dbName: 'jblog',
    host: '121.43.158.38',
    port: 3311,
    user: 'root',
    password: 'Aa47896321'
  },
  REDIS_CONF: {
    port: 6379,
    host: '121.43.158.38',
    password: 'redis@47896321'
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24 * 15
  },
  refresh: {
    secretKey: 'hijklmn',
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appId: 'wx85f7c766573a5714',
    appSecret: '3da19983c1d8f35ff9097285e0fb0272',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  host: 'http://localhost:3000/',
  luosimao: {
    smsUrl: 'http://sms-api.luosimao.com/v1/send.json',
    password: '4d0c7a0330d9a97ba2417b166dace90a'
  },
  alipay: {
    private_key: 'MIIEpQIBAAKCAQEAjqPbNPqHTBuc54sE82umhzleR3FX/OBUpUNInOX3vNj8c9YiVgNirq+B2AB/euKglioAY+P1DTh4/+EXqLgN1StoYP6ydm2aRhLVdA+cOdGbyqei9yjYke3vEjCZFwHOzGCQvqUL65KBvqy4I9beia7njamsd5Kzluh+LjffGSUGfYPfLAqsO5UsXer0rvWlRHve7Uik/5EaZOw1ZA9b77g9XKqxv7I10rNqJY/a0TdtH14q4LmYpZIK8/U9G4fEQDjNcHBn+gYpNtlgHz2JnjUu1D/2PSYnX85LpZvT7K7uZmjCtQm3FhRqjxjwDbD48XGg1htUFGVwpjIqd9tGGwIDAQABAoIBAQCAxp/duZyycm96fwDOPs8OYBWkzEhSjbj9prwEon3B6egpMBa5rr7F1L+V4gU1TSsLxwmpJSGUePqMkIwKj3g1jsXiY698ycCxKMm6yWkSrhFHqYawOxkizju7IVLk+YXY8AldhKY5XIB0Q3zPJmqsxNJaC+gf37rxMB7S3TA2gtuoLlshBTy99Ck/KvDmKWoMWU8vn6WmS1BK+SFuhiiRMK4r7I7kvtbQo1CUmA/3fMEwntPSTkAlop8zhvxSWc0L/qvhrbwFUhsaHLIL61TGRale6dDJATEpdktoi5R4wZvMo/fEdRhtbsB14vs/uyXi5zaOxafpadJEW/k4dKV5AoGBAPBmmw+PhGkH3q3obiIWdrVGJgagrRMNQVnvypmEHuPOruvP9UweCP8kXv31eABDmVaTj/kbip+DJeJf+0UBA6D+Z96rllS3/hbzTQmBFX84Tq/qfzA2QcN1IT7BcILB8hmicybAv8tPOiNCAhvkLiKVh+6W8CJtfktFxBeKZLEtAoGBAJflTsKxye3quKOg5ZyQHjDUpmbwZaLbDRiLWOToQLVLa4eSFn+XMQKW3qFu3fSKoQOr2EhOwY6FFOxucg3V13gMjQikLZHOWw5qnGB656SOmrtYsa3KESZQas3j74Rk4CksuCegy9uTPzRVk4ml+gGG0zQzSV2bYuRcw6H0ZBFnAoGBAJr4GccrJhkq2JJU/gH9ZyKuCL9G/qsEZXdbi8fwkpUZ3ErpMOCTkAshYBboESZibUuRLkNQTMlNGrPWWbz+zV8QANda1zrfrO0QhD23N6teGeNvD/R9VWFxdS/mNOglrDJ4NTDrGfgup3SpDYD7U/45VHoqVLxsxvgxDhp6vTQ1AoGAc5FlXl6024710pFNgdRpFBAHV1Taj5EIor8K8IcBDK8IbkqpUYRwJp8xXjQjLbb4EPoDgehh/hSlOcpCfuJPoSgzefqoLUKLJynYNtPsQNi7Q4WVEjwm1jbjPCmLh/jUUJ+UsZn24OZkdWYS7ezZjaXONe47iLv7/vHRavyt0ksCgYEA4cH/VaNfem0V3OZu/IkJ5K5EEg7WrkshB2WUUsteGDXVHIP7flySoMLZPDw/Y7cvjStNKGbSZLIiXr08c6ymUXGjuT2M4PYP2dN0CNjLPWmYqII6X1YjPVO+JckXMKShFN15Yj/271/GblW82ys7SKcOmX2jYkN6GI7bGlZVMGE=',
    appId: 2019111969280433,
    AES: 'hAWZcL/1hlLVVxJDVZljZA==',
    alipay_public_key: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmOfbW8u8K9rHRyadcBRtx/qBN5khzKxBok44Of3qiEpjDghq8rU2Tb9eMi/JklEiUOpEOgWOUSjSRGlh7vkrXWycXdN+yNDd2wN8YYGTQeBWW1H46DoEbwci8ySCYDz0ONdrWLTzjEUhcr12T0gVSLHudjrhGNOq0Eb23+rn8TS696gkHcsJT5U9BKa93uVEIdmGLtPD4QBHhXDyBX/M64wSbYzPUv/OyKACnoJCDUKL6OWzgafGrjDrjvY++HjY+INU85ZhHRzE7Cds2xMyPy03E01D3vFOUNeV3czbRjVIIE67uiB/1rsq4+trbJseIqsStZ/cH/m+FOZoNlPZ8QIDAQAB'
  },
  spring: {
    baseUrl: 'http://localhost:8111/imooc/springboot/'
  }
}