const fs = require('fs')
const path = require('path')
const sequelize = require('@src/db')
const SequelizeAuto = require('sequelize-auto');
const $consts = require('@src/constants')
const logger = require('@src/utils/log4');


/**
 * seq创建表
 * @param {表名} tableName 
 * @param {seq的配置项} seqConfig 
 * @param {强制表名} freezeTableName 
 */
const registerTable = async (tableName, seqConfig, freezeTableName = true) => {
  tableName = sequelize.define(tableName, seqConfig, { freezeTableName });
  //执行并写入数据库，{ force: true }如果存在,则删除
  await tableName.sync()
  const [res] = await sequelize.query(`select table_name from information_schema.tables where table_schema='${$consts['CONFIG/DB_DATABASE']}';`)
  return res.map(item => item.TABLE_NAME)
}

/**
 * 根据数据表生成对应的seqModel
 */
const generateModel = () => {
  const options = {
    host: $consts['CONFIG/DB_HOST'],
    dialect: $consts['CONFIG/DIALECT'],
    // 指定输出 models 文件的目录
    directory: $consts['CONFIG/DIRECTORY'],
    port: $consts['CONFIG/DB_PORT'],
    additional: {
      // 将seq生成的时间戳也映射出来
      timestamps: false
    }
  }
  const auto = new SequelizeAuto(sequelize, null, null, options);
  auto.run(err => {
    if (err) {
      logger.error('generateModel_', err)
      throw err
    }
  })
  // 遍历model名称
  const modelNames = []
  fs.readdirSync(path.join(__dirname, '../model')).forEach(file => {
    if (file === 'init-models.js') return
    modelNames.push(file.split('.')[0])
  })
  return modelNames
}


module.exports = {
  registerTable,
  generateModel
}