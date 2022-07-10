const { sequelize, Op } = require('@src/db')
const initModels = require('@src/model/init-models')
const logger = require('@src/utils/log4');

const Models = initModels(sequelize)


class SellerService {
  // 示例
  async expService (...args) {
    try {
      // your service logic, such as:
      return await Models['seller'].findAll({ raw: true });
    } catch (error) {
      logger.error('SellerService_exaService_', error)
    }
  }
}

// 导出的为SellerService的实例
// 使用见生成的对应的.controller文件
module.exports = new SellerService()