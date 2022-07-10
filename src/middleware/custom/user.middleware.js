
const logger = require('@src/utils/log4');
const $consts = require('@src/constants');
const { errorEmitter } = require('@src/utils/common')

class UserMiddleware {
  // 示例
  async expMiddle (ctx, next) {
    try {
      // your middleware logic, such as
      await next()
    } catch (error) {
      logger.error('UserMiddleware_expMiddle_', error)
    }
  }
}

// 导出的为UserMiddleware的实例
// 使用见生成的对应的.router文件
module.exports = new UserMiddleware()