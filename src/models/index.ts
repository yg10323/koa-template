import type { Sequelize } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dnConfig from 'src/db'
import { without } from 'lodash'
import { $log, $consts } from 'src/plugins'
import { firstToUpperCase } from 'src/utils/tools'

// 遍历当前目录, 初始化所有 model
const initModels = (sequelize: Sequelize) => {
  const models: any = {}
  const absPath = path.resolve(__dirname, '.')
  const modlues = without(fs.readdirSync(absPath), `index.${$consts['CONFIG/MODEL_LANGUAGE']}`, `init-models.${$consts['CONFIG/MODEL_LANGUAGE']}`)
  try {
    modlues.forEach((fileName: string) => {
      const modelName = fileName.split('.')[0]
      const modlueClass = require(`${absPath}/${fileName}`)
      const model = modlueClass[modelName].initModel(sequelize)
      models[firstToUpperCase(modelName)] = model
    })
    return models
  } catch (error: any) {
    $log['error'].error('initModels', error)
  }
}

const models = initModels(dnConfig.sequelize)
export default models