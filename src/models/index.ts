import type { Sequelize } from 'sequelize'
import { DataTypes } from 'sequelize'
import fs from 'fs'
import path from 'path'
import dnConfig from 'src/db'
import { $log } from 'src/plugins'

// 遍历当前目录, 初始化所有 model
const initModels = (sequelize: Sequelize) => {
  const models: any = {}
  const absPath = path.resolve(__dirname, '.')
  const modlues = fs.readdirSync(absPath)
  try {
    modlues.forEach((fileName: string) => {
      if (fileName === 'index.ts') return
      const modelName = fileName.split('.')[0]
      const modlue = require(`${absPath}/${fileName}`).default
      const model = modlue(sequelize, DataTypes)
      models[modelName] = model
    })

    return models
  } catch (error: any) {
    $log['error'].error('initModels', error)
  }
}

const models = initModels(dnConfig.sequelize)
export default models