const fs = require('fs')
const path = require('path')
const ejs = require('ejs');
const { sequelize } = require('@src/db')
const SequelizeAuto = require('sequelize-auto');
const $consts = require('@src/constants')
const logger = require('@src/utils/log4');
const { clearFile } = require('@src/utils/common')
const BaseService = require('@src/service/base/base.service')

/**
 * seq创建表
 * @param {表名} tableName 
 * @param {seq的配置项} seqConfig 
 * @param {强制表名} freezeTableName 
 */
const registerTable = async (tableName, seqConfig, timestamps = true, freezeTableName = true) => {
  // 设置时间戳
  // if (seqConfig.createTime) {
  //   seqConfig.createTime.defaultValue = sequelize.literal('CURRENT_TIMESTAMP')
  // }
  // if (seqConfig.updateTime) {
  //   seqConfig.updateTime.defaultValue = sequelize.literal('CURRENT_TIMESTAMP')
  //   seqConfig.updateTime.onUpdate = 'CURRENT_TIMESTAMP'

  // }
  console.log(seqConfig);
  tableName = sequelize.define(tableName, seqConfig, { timestamps, freezeTableName });
  //执行并写入数据库，{ force: true }如果存在,则删除
  await tableName.sync()
  // 查询数据库中所有的表名
  const tables = await BaseService.getAllTablesName()
  return tables
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
      timestamps: true
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
    if (file === 'init-models.js' || file.toLocaleLowerCase() === 'readme.md') return
    modelNames.push(file.split('.')[0])
  })
  return modelNames
}

/**
 * 使用ejs模板生成对应代码文件
 */
const templateCreate = (tableNames) => {
  try {
    console.log(tableNames)
    tableNames.forEach(tableName => {
      fs.readdirSync(path.join(__dirname, '../template')).forEach(file => {
        if ($consts['COMMON/TEMPLATE_FILTER_FILE_NAMES'].includes(file)) return
        const template = ejs.fileLoader(path.join(__dirname, `../template/${file}`))
        const pathName = file.split('.')[0]
        const res = ejs.render(template.toString(), {
          config: { tableName },
          filename: path.join(__dirname, '../template/functions.ejs')
        })
        // 如果router controller service middleware目录下包含与数据表名称不一样的文件名，如：base.controller.js
        // 请在constants/services/common.js中的BASE_FILE_NAMES对应的value数组中添加对应的名称，如：base
        // 如果不添加则会导致router controller service middleware目录下所有与表名同名的文件内容被初始化为模板内容
        fs.readdirSync(path.join(__dirname, `../${pathName}`)).forEach(file => {
          // 判断是不是已经存在对应的文件，存在则跳过
          if (tableNames.includes(file.split('.')[0])) return
          fs.writeFileSync(path.join(__dirname, `../${pathName}/custom/${tableName}.${pathName}.js`), res)
        })
      })
    })
  } catch (error) {
    logger.error('templateCreate_', error)
  }
}

/**
 * 根据tableName删除对应的router service controller middleware文件
 * @param {} tableNames 
 */
const deleteTemplateCreate = (tableNames) => {
  tableNames.forEach(tableName => {
    fs.readdirSync(path.join(__dirname, '../template')).forEach(file => {
      if ($consts['COMMON/TEMPLATE_FILTER_FILE_NAMES'].includes(file)) return
      const pathName = file.split('.')[0]
      fs.readdirSync(path.join(__dirname, `../${pathName}`)).forEach(file => {
        if (file === 'base' || file === 'index.js') return
        fs.readdirSync(path.join(__dirname, `../${pathName}/${file}`)).forEach(file => {
          if (file.split('.')[0] === tableName) clearFile(path.join(__dirname, `../${pathName}/custom/${file}`))
        })
      })
    })
  })
}

module.exports = {
  registerTable,
  generateModel,
  templateCreate,
  deleteTemplateCreate
}