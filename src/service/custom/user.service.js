const { sequelize, Op } = require('@src/db')
const initModels = require('@src/model/init-models')
const logger = require('@src/utils/log4');

const Models = initModels(sequelize)


class UserService {
  // 示例
  async expService (...args) {
    try {
      // your service logic, such as:
      return await Models['user'].findAll({ raw: true });
    } catch (error) {
      logger.error('UserService_exaService_', error)
    }
  }
}

// 导出的为UserService的实例
// 使用见生成的对应的.controller文件
module.exports = new UserService()