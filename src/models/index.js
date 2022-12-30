const fs = require('fs')
const path = require('path')
const { without } = require('lodash')
const { sequelize } = require('@src/db')
const $consts = require('@src/plugins/consts')
const $log = require('@src/plugins/log')
const { firstToUpperCase } = require('@src/utils/tools')

// 遍历当前目录, 初始化所有 model
const initModels = (sequelize) => {
  const models = {}
  const absPath = path.resolve(__dirname, '.')
  const modlues = without(fs.readdirSync(absPath), `index.${$consts['CONFIG/MODEL_LANGUAGE']}`, `init-models.${$consts['CONFIG/MODEL_LANGUAGE']}`)
  try {
    modlues.forEach(fileName => {
      const modelName = fileName.split('.')[0]
      const modlueClass = require(`${absPath}/${fileName}`)
      const model = modlueClass[modelName].initModel(sequelize)
      models[firstToUpperCase(modelName)] = model
    })
    return models
  } catch (error) {
    $log['error'].error('initModels', error)
  }
}

module.exports = initModels(sequelize)