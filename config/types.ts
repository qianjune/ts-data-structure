export interface Database {
  dbName: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface RedisConfig {
  port: number;
  host: string;
  password: string;
}

export interface SessionConfig {
  key: string;
  prefix: string;
}

export interface LuosimaoConfig {
  smsUrl: string;
  password: string;
}

export interface ServerConfig {
  environment: "dev" | "production";
  port: number;
  host: string;
}

export interface WxMiniConfig {
  appId: string;
  appSecret: string;
  loginUrl: string;
}

export interface AlipayMiniConfig {
  private_key: string;
  appId: number;
  AES: string;
  alipay_public_key: string;
}

export interface QiniuConfig {
  host: string;
}

export interface JwtConfig {
  security: {
    secretKey: string;
    expiresIn: number;
  };
  refresh: {
    secretKey: string;
    expiresIn: number;
  };
}

export interface IGlobalConfig {
  database: Database;
  REDIS_CONF: RedisConfig;
  JWT_CONF: JwtConfig;
  SERVER_CONF: ServerConfig;
  wx: WxMiniConfig;
  luosimao: LuosimaoConfig;
  alipay: AlipayMiniConfig;
  qiniu: QiniuConfig;
  SESSION: SessionConfig;
  spring: {
    baseUrl: string;
  };
}
