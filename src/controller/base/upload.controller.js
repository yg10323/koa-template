const logger = require('@src/utils/log4');
const $consts = require('@src/constants')
const { registerTable, generateModel, templateCreate } = require('@src/script')
const { errorEmitter } = require('@src/utils/common')
const BaseService = require('@src/service/base/base.service')

class UploadController {
  // 通过excel创建表
  async createTableByExcel (ctx, next) {
    try {
      // 查询数据库中所有的表名
      const tableNames = await BaseService.getAllTablesName()
      for (const [tableName, config] of Object.entries(ctx.seqConfig)) {
        // 判断是否已经存在对应的表
        if (tableNames.includes(tableName)) return errorEmitter(ctx, $consts['ERROR/CREATE_TABLE_BY_EXCEL'], tableName)
        await registerTable(tableName, config)
      }
      const modelNames = generateModel()
      // 生成对应的router service middleware controller文件
      templateCreate(tableNames)
      // 判断是否生成对应的model
      if (JSON.stringify(modelNames) === JSON.stringify(tableNames) || modelNames.length === 0) {
        ctx.body = {
          IsSuccessfull: true,
          Data: {
            modelNames,
            message: '创建表成功'
          },
          MessageType: 200,
          totalCount: modelNames.length
        }
      } else return errorEmitter(ctx, $consts['ERROR/GENERRATE_MODEL'])
    } catch (error) {
      logger.error('UploadController_createTableByExcel_', error);
    }
  }

  // 通过jsonConfig创建表
  async createTableByConfig (ctx, next) {
    try {
      const { tableName, seqConfig, options } = ctx.request.body
      // 查询数据库中所有的表名
      const tableNames = await BaseService.getAllTablesName()
      // 判断是否已经存在对应的表
      if (tableNames.includes(tableName)) return errorEmitter(ctx, $consts['ERROR/CREATE_TABLE_BY_EXCEL'], tableName)
      await registerTable(tableName, seqConfig, true, options)
      const modelNames = generateModel()
      // 生成对应的router service middleware controller文件
      templateCreate(tableNames)
      // 判断是否生成对应的model
      if (JSON.stringify(modelNames) === JSON.stringify(tableNames) || modelNames.length === 0) {
        ctx.body = {
          IsSuccessfull: true,
          Data: {
            modelNames,
            message: '创建表成功'
          },
          MessageType: 200,
          totalCount: modelNames.length
        }
      } else return errorEmitter(ctx, $consts['ERROR/GENERRATE_MODEL'])
    } catch (error) {
      logger.error('UploadController_createTableByConfig_', error)
    }
  }
}

module.exports = new UploadController()
