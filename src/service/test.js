const { sequelize } = require('@src/db')
const initModels = require('@src/model/init-models')

const Models = initModels(sequelize)

const createUser = async () => {
  const jane = await Models.users.create({ account: "Jane", password: "123456" });
  return jane
}


module.exports = createUser