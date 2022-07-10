const logger = require('@src/utils/log4');
const $consts = require('@src/constants')
const { errorEmitter } = require('@src/utils/common')
const BaseService = require('@src/service/base/base.service')

class BaseController {
  async baseControl (ctx, next) {
    try {
      const { pathName, moduleName, params } = ctx.baseParams
      const res = await BaseService[pathName](moduleName, params)
      ctx.body = {
        IsSuccessfull: true,
        Data: res,
        MessageType: 200,
        totalCount: res.length
      }
    } catch (error) {
      logger.error('BaseController_baseControl_', error)
    }
  }
}

module.exports = BaseController