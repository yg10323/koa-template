const logger = require('@src/utils/log4');
const $consts = require('@src/constants')
const { registerTable, generateModel } = require('@src/script')
const { errorEmitter } = require('@src/utils/common')
// const createUser = require('@src/service/test')

// const user = await createUser()
// console.log(user.id);

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
      if (JSON.stringify(modelNames) === JSON.stringify(tableNames)) {
        ctx.body = {
          IsSuccessfull: true,
          Data: {
            modelNames,
            message: '创建表成功'
          },
          MessageType: 200,
          totalCount: modelNames.length
        }
      } else return errorEmitter(ctx, $consts['ERROR/CREATE_TABLE_BY_EXCEL'])
    } catch (error) {
      logger.error('UploadController_createTableByExcel_', error);
    }
  }
}

module.exports = new UploadController()
