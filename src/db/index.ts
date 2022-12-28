import type { AutoOptions } from 'sequelize-auto'
import fs from 'fs'
import { Sequelize, Op } from 'sequelize'
import SequelizeAuto from 'sequelize-auto'
import { $consts, $log } from 'src/plugins'
import { without, isEqual } from 'lodash'

// 根据数据表生成对应的 sequelize model
const generateModel = async () => {
  const options: AutoOptions = {
    host: $consts['CONFIG/DB_HOST'],
    dialect: $consts['CONFIG/DIALECT'],
    directory: $consts['CONFIG/MODEL_DIRECTORY'],
    port: $consts['CONFIG/DB_PORT'],
    additional: {
      // 关闭时间映射
      timestamps: false
    },
    singularize: true,
    useDefine: true,
    noInitModels: true,
    lang: $consts['CONFIG/MODEL_LANGUAGE']
  }
  if (dbConfig.sequelize) {
    const auto = new SequelizeAuto(dbConfig.sequelize, $consts['CONFIG/DB_USER'], $consts['CONFIG/DB_PASSWORD'], options)
    const res = await dbConfig.sequelize.query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='${$consts['CONFIG/DB_DATABASE']}';`)
    const tables = res[0]?.map((item: any) => item.TABLE_NAME) || []
    const models = without(fs.readdirSync($consts['CONFIG/MODEL_DIRECTORY']), 'index.ts', 'init-models.ts')?.map((item: string) => item.split('.')[0]) || []
    !isEqual(tables, models) && auto && auto.run()
  }
}

class DBInstance {
  sequelizeInstance: any
  static instance: any

  constructor () {
    // 存放sequelize连接, key为database + host + port, value为sequelize的实例
    this.sequelizeInstance = {}
  }

  // 单例
  static getInstance () {
    if (!DBInstance.instance) {
      DBInstance.instance = new DBInstance()
    }
    return DBInstance.instance
  }

  getSequelizeInstance () {
    if (!$consts['CONFIG/DB_HOST'] || !$consts['CONFIG/DB_PORT'] || !$consts['CONFIG/DB_DATABASE']) {
      $log['log'].error('数据库配置错误导致连接失败, 原因已保存至日志')
      $log['error'].error('数据库配置有误,请检plugin/service目录下config文件中的数据库配置')
      return false
    }
    const seqKey = '' + $consts['CONFIG/DB_DATABASE'] + $consts['CONFIG/DB_HOST'] + $consts['CONFIG/DB_PORT']
    if (this.sequelizeInstance[seqKey]) return this.sequelizeInstance[seqKey]
    if (!$consts['CONFIG/DB_USER'] || !$consts['CONFIG/DB_PASSWORD']) {
      $log['log'].error('数据库配置错误导致连接失败, 原因已保存至日志')
      $log['error'].error('数据库账号密码有误,请检plugin/service目录下config文件中的数据库配置')
      return false
    }

    this.sequelizeInstance[seqKey] = new Sequelize($consts['CONFIG/DB_DATABASE'], $consts['CONFIG/DB_USER'], $consts['CONFIG/DB_PASSWORD'], {
      host: $consts['CONFIG/DB_HOST'],
      dialect: $consts['CONFIG/DIALECT'],
      port: $consts['CONFIG/DB_PORT'],
      timezone: '+08:00', // 东八区时间
      logging: false, // 若想要终端打印执行的seq语句，请注释掉此行代码
      // 返回格式化之后的时间
      dialectOptions: {
        dateStrings: true,
        typeCast: true
      }
    })
    return this.sequelizeInstance[seqKey]
  }
}

const seqInstance = DBInstance.getInstance()
export const dbConfig = {
  Op,
  generateModel,
  sequelize: seqInstance.getSequelizeInstance()
}

export default dbConfig