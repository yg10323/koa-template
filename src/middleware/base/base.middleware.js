const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const logger = require('@src/utils/log4');
const $consts = require('@src/constants');
const { errorEmitter } = require('@src/utils/common')

class BaseMiddleware {
  async baseDeal (ctx, next) {
    try {
      const pathName = ctx.request.path.split('/').pop()
      const { moduleName, params } = ctx.request.body
      ctx.baseParams = { pathName, moduleName, params }
      await next()
    } catch (error) {
      logger.error('BaseMiddleware_baseDeal_', error)
    }
  }

  // 密码加密
  encryption = (pwd) => {
    // update()不接收类型为number的参数
    let password = pwd.toString();
    const md5 = crypto.createHash('md5')
    // digest('hex') 结果是16进制, 为了可以表示16进制, 最终返回的结果是string
    const res = md5.update(password).digest('hex')
    return res;
  }

  // 生成token
  createToken = (payload) => {
    try {
      const token = jwt.sign({ ...payload }, $consts['KEYS/PRIVATE_KEY'], {
        // token有效期
        expiresIn: 60 * 60 * 3,
        // 加密算法
        algorithm: 'RS256'
      });
      return token;
    } catch (error) {
      logger.error('BaseMiddleware_createToken_' + error)
    }
  }

  // 验证token
  async verifyToken (ctx, next) {
    // 获取请求头中的token
    const authorization = ctx.headers.authorization
    if (!authorization) return errorEmitter(ctx, $consts['ERROR/UNAUTHORIZATION'])
    const token = authorization.replace('Bearer ', "")
    // 验证token
    try {
      const result = jwt.verify(token, PUBLIC_KEY, {
        algorithms: ["RS256"]
      })
      // 保存一下, 以后可能用到
      ctx.user = result
      await next()
    } catch (err) {
      logger.error('BaseMiddleware_verifyToken_' + error)
    }
  }
}

module.exports = new BaseMiddleware()