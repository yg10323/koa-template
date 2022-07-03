const xlsx = require('node-xlsx');
const { omit } = require('lodash');
const logger = require('@src/utils/log4');
const $consts = require('@src/constants');
const { checkSheetName } = require('@src/utils/tools');
const { errorEmitter, transTableType } = require('@src/utils/common')

class UploadMiddleware {
  // 上传mysql配置相关的excel的通用验证
  async uploadExcel (ctx, next) {
    try {
      // 指定file字段, 前端必须以file为字段名请求
      const file = ctx.request.files.file;
      // 一次只允许上传一份excel
      if (!file?.length) {
        const ext = file.originalFilename.split('.').pop()
        // 是否是excel文件
        if (ext !== 'xlsx' && ext !== 'xls') return errorEmitter(ctx, $consts['ERROR/FILE_TYPE_ERROR'])
        const filePath = file.filepath.split('\\').join('/')
        const sheetDataList = xlsx.parse(filePath);
        sheetDataList?.forEach(sheetData => {
          const sheetNameIsCorrect = checkSheetName(sheetData.name)
          // sheet名不允许有中文且不允许数字开头
          if (!sheetNameIsCorrect) return errorEmitter(ctx, $consts['ERROR/SHEET_NAME_IS_WRONG'])
        })
        ctx.sheetDataList = sheetDataList
        await next()
      } else {
        return errorEmitter(ctx, $consts['ERROR/MAX_FILE_COUNT'])
      }
    } catch (error) {
      logger.error('UploadMiddleware_uploadExcel_', error)
    }
  }

  // excel转成seq支持的配置项
  async sheetDataToSeq (ctx, next) {
    try {
      const primaryArr = []
      ctx.sheetDataList.forEach(sheetData => {
        const tableTitles = sheetData.data[0]
        const tableConfigs = [...sheetData.data].slice(1)
        const tableArr = []
        // 获取table的配置数据
        tableConfigs.forEach(config => {
          const filedConfig = {}
          config.forEach((config, index) => {
            filedConfig[tableTitles[index]] = config
          })
          tableArr.push(filedConfig)
        })
        // 转换成seq的配置格式
        const seqConfig = {}
        tableArr.forEach(config => {
          const filedName = config.filedName
          const length = config.length
          config = omit(config, [$consts['TABLE/FILED_NAME'], $consts['TABLE/FILED_LENGTH']])
          // 转换type
          config.type = transTableType(config.type, length)
          // 将0 1转换成对应的布尔值
          config.allowNull = config.allowNull ? true : false
          config.primaryKey && (config.primaryKey = config.primaryKey ? true : false)
          if (config.primaryKey === 0) config = omit(config, $consts['TABLE/PRIMARY_KEY'])
          primaryArr.push(config.primaryKey)
          seqConfig[filedName] = config
        })
        ctx.tableName = sheetData.name
        ctx.seqConfig = seqConfig
      })
      // 判断是否设置多个主键
      if (primaryArr.filter(item => item).length >= 2) return errorEmitter(ctx, $consts['ERROR/PRIMARY_KEY_REPEAT'])
      await next()
    } catch (error) {
      logger.error('UploadMiddleware_sheetDataToSeq_', error)
    }
  }
}


module.exports = new UploadMiddleware()