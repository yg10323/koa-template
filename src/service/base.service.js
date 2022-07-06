const sequelize = require('@src/db')
const initModels = require('@src/model/init-models')

const Models = initModels(sequelize)

class BaseService {
  static async create (modelName, params) {
    return await Models[modelName].create(params);
  }
}

module.exports = BaseService