
const logger = require('@src/utils/log4');
const BaseController = require('../base/base.controller')
const SellerService = require('@src/service/custom/seller.service')

class SellerController extends BaseController {
  constructor () {
    super()
  }

  // 实例方法
  async insMethod (ctx, next) {
    try {
      // your controller logic
    
      // use Service methods, such as
      const { payloads } = ctx.request.body
      const res = await SellerService.expService(payloads)
      ctx.body = {
        IsSuccessfull: true,
        Data: res,
        MessageType: 200,
        totalCount: res.length
      }
    } catch (error) {
      logger.error('SellerController_insMethod_', error)
    }
  }

  // 静态方法
  static async stcMethod (ctx, next) {
    // your controller logic
  }
}

// 导出的为class，使用实例方法时请实例化
// 使用见生成的对应的.router文件
module.exports = SellerController