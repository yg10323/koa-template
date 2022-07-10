const logger = require('@src/utils/log4');
const $consts = require('@src/constants')
const { registerTable, generateModel, templateCreate } = require('@src/script')
const { errorEmitter } = require('@src/utils/common')

class UploadController {
  // 通过excel创建表
  async createTableByExcel (ctx, next) {
    try {
      let tableNames = []
      for (const [tableName, config] of Object.entries(ctx.seqConfig)) {
        tableNames = await registerTable(tableName, config)
        if (!tableNames.includes(tableName)) return errorEmitter(ctx, $consts['ERROR/CREATE_TABLE_BY_EXCEL'], tableName)
      }
      const modelNames = generateModel()
      // 生成对应的router service middleware controller文件
      templateCreate(tableNames)
      // 判断是否生成对应的model
      if (JSON.stringify(modelNames) === JSON.stringify(tableNames) || modelNames.length ===0) {
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
}

module.exports = new UploadController()
